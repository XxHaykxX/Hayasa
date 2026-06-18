'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';
import { BOOKING_STATUSES, type BookingStatusValue } from '@/lib/admin-bookings';

export async function updateBookingStatus(id: string, status: string): Promise<void> {
  await requireAdmin();
  if (!BOOKING_STATUSES.includes(status as BookingStatusValue)) return;
  const db = createServiceSupabase();
  if (!db) return;
  await db
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  revalidatePath('/admin/bookings');
}
