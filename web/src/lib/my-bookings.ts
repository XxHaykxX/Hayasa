// Reads the logged-in user's own bookings (RLS: own bookings readable).
// Browser-side helper for /my-tours and /profile.
import { getSupabase } from './supabase';
import type { Localized, BookingStatus } from './tours';
import { formatTourDate, loc } from './format';

export type MyBooking = {
  bookingId: string;
  tourId: string | null;
  status: BookingStatus;
  when: 'upcoming' | 'past';
  name: Localized;
  loc: Localized;
  date: string;
  target: number;
  cover: string | null;
  variant: number;
};

type Row = {
  id: string;
  status: BookingStatus;
  tour_id: string | null;
  tours: {
    title_hy: string;
    title_ru: string;
    title_en: string;
    location_hy: string | null;
    location_ru: string | null;
    location_en: string | null;
    date_start: string;
    cover_image_url: string | null;
  } | null;
};

/** Returns the current user's bookings, or null when not logged in / no client. */
export async function getMyBookings(locale = 'en'): Promise<MyBooking[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id,status,tour_id,tours(title_hy,title_ru,title_en,location_hy,location_ru,location_en,date_start,cover_image_url)',
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error || !data) return [];

  const now = Date.now();
  return (data as unknown as Row[])
    .filter((r) => r.tours)
    .map((r, i) => {
      const tt = r.tours!;
      const d = new Date(tt.date_start);
      const target = d.getTime();
      return {
        bookingId: r.id,
        tourId: r.tour_id,
        status: r.status,
        when: target >= now ? 'upcoming' : 'past',
        name: { hy: tt.title_hy, ru: tt.title_ru, en: tt.title_en },
        loc: loc(tt.location_hy, tt.location_ru, tt.location_en, ''),
        date: formatTourDate(tt.date_start, locale),
        target,
        cover: tt.cover_image_url ?? null,
        variant: i % 6,
      };
    });
}
