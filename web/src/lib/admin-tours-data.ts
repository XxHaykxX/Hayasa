// Server-only read helpers for admin tours. Imports next/headers via
// supabase-server, so never import this from a client component.
import 'server-only';
import { createServiceSupabase, createServerSupabase } from './supabase-server';
import type { TourRow } from './admin-tours';

function db() {
  return createServiceSupabase() ?? createServerSupabase();
}

export async function listTours(): Promise<TourRow[]> {
  const client = db();
  if (!client) return [];
  const { data, error } = await client
    .from('tours')
    .select('*')
    .order('date_start', { ascending: true });
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
