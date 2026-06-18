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
