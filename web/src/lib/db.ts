// Data layer. Reads from Supabase when configured, otherwise falls back to the
// mock tours in `lib/tours.ts`. This layer is the seam where the DB plugs in.
import { getSupabase, isSupabaseConfigured } from './supabase';
import { TOURS, type Tour, type Localized, type TourLang } from './tours';
import { formatTourDate, loc } from './format';

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
    // Attach the logged-in user so the booking shows up in their My Tours.
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from('bookings').insert({
      tour_id: isUuid ? input.tourId : null,
      user_id: user?.id ?? null,
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

// ───────────────────────── public tour reads ─────────────────────────

// "18500" -> "18 500" (regular space groups, matches the mock formatting).
const priceFmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// Category → localized tag label (mirrors lib/tours TAG, extended to all cats).
const CATEGORY_TAG: Record<string, Localized> = {
  classic: { en: 'Classic', ru: 'Классический', hy: 'Դասական' },
  gastro: { en: 'Gastro', ru: 'Гастро', hy: 'Գաստրո' },
  premium: { en: 'Premium', ru: 'Премиум', hy: 'Պրեմիում' },
  group: { en: 'Group', ru: 'Групповой', hy: 'Խմբակային' },
  cultural: { en: 'Cultural', ru: 'Культурный', hy: 'Մշակութային' },
  nature: { en: 'Nature', ru: 'Природа', hy: 'Բնություն' },
  border: { en: 'Cross-border', ru: 'Межгранич.', hy: 'Անդրսահման' },
};

function langsFromColumn(language: string): TourLang[] {
  switch (language) {
    case 'hy':
      return ['AM'];
    case 'ru':
      return ['RU'];
    case 'en':
      return ['EN'];
    default:
      return ['AM', 'RU', 'EN'];
  }
}

type DbStop = {
  order_index: number;
  name_hy: string | null;
  name_ru: string | null;
  name_en: string | null;
  description_hy: string | null;
  description_ru: string | null;
  description_en: string | null;
  latitude: number | null;
  longitude: number | null;
  stop_photos?: { photo_url: string; order_index: number }[] | null;
};

type DbTour = {
  id: string;
  title_hy: string;
  title_ru: string;
  title_en: string;
  description_hy: string | null;
  description_ru: string | null;
  description_en: string | null;
  location_hy: string | null;
  location_ru: string | null;
  location_en: string | null;
  category: string | null;
  country: string;
  date_start: string;
  price: number;
  max_seats: number;
  booked_seats: number;
  language: string;
  cover_image_url: string | null;
  stops?: DbStop[] | null;
};

function mapTour(row: DbTour, variant: number): Tour {
  const d = new Date(row.date_start);
  const dateStr = formatTourDate(row.date_start);
  const stops = (row.stops ?? [])
    .slice()
    .sort((a, b) => a.order_index - b.order_index)
    .map((s) => ({
      name: loc(s.name_hy, s.name_ru, s.name_en, ''),
      desc: loc(s.description_hy, s.description_ru, s.description_en, ''),
      lat: s.latitude ?? 0,
      lng: s.longitude ?? 0,
      photos: (s.stop_photos ?? [])
        .slice()
        .sort((a, b) => a.order_index - b.order_index)
        .map((p) => p.photo_url),
    }));

  return {
    id: row.id,
    name: { hy: row.title_hy, ru: row.title_ru, en: row.title_en },
    loc: loc(row.location_hy, row.location_ru, row.location_en, row.country === 'ge' ? 'Georgia' : 'Armenia'),
    country: (row.country === 'ge' ? 'ge' : 'am'),
    date: dateStr,
    target: d.getTime(),
    seats: Math.max(0, row.max_seats - row.booked_seats),
    maxSeats: row.max_seats,
    price: priceFmt(row.price).replace(/ /g, ' '),
    priceAmd: row.price,
    langs: langsFromColumn(row.language),
    variant: variant % 6,
    tag: CATEGORY_TAG[row.category ?? 'classic'] ?? CATEGORY_TAG.classic,
    description: loc(row.description_hy, row.description_ru, row.description_en, ''),
    stops,
    cover: row.cover_image_url ?? null,
  };
}

const TOUR_SELECT =
  'id,title_hy,title_ru,title_en,description_hy,description_ru,description_en,location_hy,location_ru,location_en,category,country,date_start,price,max_seats,booked_seats,language,cover_image_url,stops(order_index,name_hy,name_ru,name_en,description_hy,description_ru,description_en,latitude,longitude,stop_photos(photo_url,order_index))';

/** All active tours for the public site. Falls back to mock TOURS. */
export async function getPublicTours(): Promise<Tour[]> {
  const supabase = getSupabase();
  if (!supabase) return TOURS;
  try {
    const { data, error } = await supabase
      .from('tours')
      .select(TOUR_SELECT)
      .eq('is_active', true)
      .order('date_start', { ascending: true });
    if (error || !data || data.length === 0) return TOURS;
    return (data as unknown as DbTour[]).map(mapTour);
  } catch {
    return TOURS;
  }
}

/** A single tour by id. Falls back to the mock tour with the same id. */
export async function getPublicTour(id: string): Promise<Tour | null> {
  const supabase = getSupabase();
  const fallback = TOURS.find((t) => t.id === id) ?? null;
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase.from('tours').select(TOUR_SELECT).eq('id', id).single();
    if (error || !data) return fallback;
    return mapTour(data as unknown as DbTour, 0);
  } catch {
    return fallback;
  }
}
