// Server-only read helpers for bookings.
import 'server-only';
import { createServiceSupabase, createServerSupabase } from './supabase-server';
import type { BookingRow, BookingStatusValue } from './admin-bookings';

function db() {
  return createServiceSupabase() ?? createServerSupabase();
}

export type BookingFilters = { status?: string; q?: string };

export async function listBookings(filters: BookingFilters = {}): Promise<BookingRow[]> {
  const client = db();
  if (!client) return [];

  let query = client
    .from('bookings')
    .select('id, tour_id, seats, status, full_name, phone, notes, source, created_at, tours(title_ru)')
    .order('created_at', { ascending: false });

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status as BookingStatusValue);
  }
  if (filters.q?.trim()) {
    const q = filters.q.trim();
    query = query.or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.warn('[admin-bookings] list failed:', error.message);
    return [];
  }
  return (data ?? []) as unknown as BookingRow[];
}
