// Server-only read helper for stops + their photos.
import 'server-only';
import { createServiceSupabase, createServerSupabase } from './supabase-server';
import type { StopRow } from './admin-stops';

function db() {
  return createServiceSupabase() ?? createServerSupabase();
}

export async function listStops(tourId: string): Promise<StopRow[]> {
  const client = db();
  if (!client) return [];
  const { data, error } = await client
    .from('stops')
    .select(
      'id,tour_id,order_index,name_hy,name_ru,name_en,description_hy,description_ru,description_en,latitude,longitude,stop_photos(id,stop_id,photo_url,order_index)',
    )
    .eq('tour_id', tourId)
    .order('order_index', { ascending: true });
  if (error) {
    console.warn('[admin-stops] list failed:', error.message);
    return [];
  }
  const rows = (data ?? []) as unknown as StopRow[];
  // Sort each stop's photos by order_index.
  for (const r of rows) {
    r.stop_photos = (r.stop_photos ?? []).slice().sort((a, b) => a.order_index - b.order_index);
  }
  return rows;
}
