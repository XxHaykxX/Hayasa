// Server-only read helpers for admin tours. Imports next/headers via
// supabase-server, so never import this from a client component.
import 'server-only';
import { createServiceSupabase, createServerSupabase } from './supabase-server';
import type { TourRow } from './admin-tours';

function db() {
  return createServiceSupabase() ?? createServerSupabase();
}

export type TourFilters = {
  q?: string;
  country?: string;
  category?: string;
  status?: string; // 'all' | 'active' | 'hidden'
  sort?: string; // 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc' | 'name_asc'
};

export async function listTours(f: TourFilters = {}): Promise<TourRow[]> {
  const client = db();
  if (!client) return [];

  let query = client.from('tours').select('*');

  if (f.q?.trim()) {
    const q = f.q.trim();
    query = query.or(
      `title_hy.ilike.%${q}%,title_ru.ilike.%${q}%,location_hy.ilike.%${q}%,location_ru.ilike.%${q}%`,
    );
  }
  if (f.country && f.country !== 'all') query = query.eq('country', f.country);
  if (f.category && f.category !== 'all') query = query.eq('category', f.category);
  if (f.status === 'active') query = query.eq('is_active', true);
  else if (f.status === 'hidden') query = query.eq('is_active', false);

  // Default: newest-created first, so a tour you just added is at the top.
  const [col, dir] = (f.sort ?? 'created_desc').split('_');
  const column =
    col === 'price' ? 'price' : col === 'name' ? 'title_hy' : col === 'date' ? 'date_start' : 'created_at';
  query = query.order(column, { ascending: dir !== 'desc' });

  const { data, error } = await query;
  if (error) {
    console.warn('[admin-tours] list failed:', error.message);
    return [];
  }
  return (data ?? []) as TourRow[];
}

export async function getTourRow(id: string): Promise<TourRow | null> {
  const client = db();
  if (!client) return null;
  const { data, error } = await client.from('tours').select('*').eq('id', id).single();
  if (error) return null;
  return data as TourRow;
}

export type TourPhotoRow = { id: string; photo_url: string; order_index: number };

export async function listTourPhotos(tourId: string): Promise<TourPhotoRow[]> {
  const client = db();
  if (!client) return [];
  const { data } = await client
    .from('tour_photos')
    .select('id,photo_url,order_index')
    .eq('tour_id', tourId)
    .order('order_index', { ascending: true });
  return (data ?? []) as TourPhotoRow[];
}
