// Data layer. Reads from Supabase when configured, otherwise falls back to the
// mock tours in `lib/tours.ts`. Pages keep using the mock TOURS directly for
// now; this layer is the seam where the DB plugs in (booking writes use it).
import { getSupabase, isSupabaseConfigured } from './supabase';

export type NewBooking = {
  tourId: string;
  seats: number;
  fullName: string;
  phone: string;
  notes?: string;
};

export type BookingResult = { ok: true; persisted: boolean } | { ok: false; error: string };

/**
 * Create a booking request. Writes to Supabase when configured; otherwise
 * returns ok with persisted=false so the UI can still confirm (offline flow).
 */
export async function createBooking(input: NewBooking): Promise<BookingResult> {
  const supabase = getSupabase();
  if (!supabase) {
    return { ok: true, persisted: false };
  }
  // Mock tours use slug ids ('geghard'); the DB column is a UUID FK. Until
  // tours are seeded in Supabase, send tour_id=null and keep the slug in notes.
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input.tourId);
  const notes = [input.notes, isUuid ? null : `tour: ${input.tourId}`].filter(Boolean).join(' · ') || null;
  try {
    const { error } = await supabase.from('bookings').insert({
      tour_id: isUuid ? input.tourId : null,
      seats: input.seats,
      full_name: input.fullName,
      phone: input.phone,
      notes,
      status: 'pending',
      source: 'web',
    });
    // Bookings are confirmed offline, so a DB failure (e.g. schema not applied
    // yet) must never block the customer — degrade to an offline request.
    if (error) {
      console.warn('[booking] Supabase insert failed, treating as offline request:', error.message);
      return { ok: true, persisted: false };
    }
    return { ok: true, persisted: true };
  } catch (e) {
    console.warn('[booking] Supabase unreachable, treating as offline request:', e);
    return { ok: true, persisted: false };
  }
}

export { isSupabaseConfigured };
