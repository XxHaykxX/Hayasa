// Server-only read helpers for bookings.
import 'server-only';
import { createServiceSupabase, createServerSupabase } from './supabase-server';
import type { BookingRow, BookingStatusValue } from './admin-bookings';

function db() {
  return createServiceSupabase() ?? createServerSupabase();
}

export type BookingFilters = { status?: string; q?: string; page?: number; pageSize?: number };

export type BookingsPage = { rows: BookingRow[]; total: number; page: number; pageSize: number };

export async function listBookings(filters: BookingFilters = {}): Promise<BookingsPage> {
  const pageSize = filters.pageSize && filters.pageSize > 0 ? filters.pageSize : 25;
  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const empty: BookingsPage = { rows: [], total: 0, page, pageSize };

  const client = db();
  if (!client) return empty;

  let query = client
    .from('bookings')
    .select('id, tour_id, seats, status, full_name, phone, notes, source, created_at, tours(title_hy, title_ru)', {
      count: 'exact',
    })
    .order('created_at', { ascending: false });

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status as BookingStatusValue);
  }
  if (filters.q?.trim()) {
    const q = filters.q.trim();
    query = query.or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  const from = (page - 1) * pageSize;
  query = query.range(from, from + pageSize - 1);

  const { data, error, count } = await query;
  if (error) {
    console.warn('[admin-bookings] list failed:', error.message);
    return empty;
  }
  return { rows: (data ?? []) as unknown as BookingRow[], total: count ?? 0, page, pageSize };
}
