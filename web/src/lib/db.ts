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

export type BookingResult = { ok: true; persisted: boolean; id?: string } | { ok: false; error: string };

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
    // Insert via a SECURITY DEFINER RPC. A direct insert with `.select()` adds
    // `RETURNING id`, which Postgres checks against the SELECT policy
    // (auth.uid() = user_id); for anonymous bookings user_id is null, so the
    // returned row is invisible and the insert fails with 42501 and is lost.
    // The RPC inserts + returns the id without tripping that check and attaches
    // the logged-in user (auth.uid()) on the server side when present.
    const { data, error } = await supabase.rpc('create_booking_request', {
      p_tour_id: isUuid ? input.tourId : null,
      p_seats: input.seats,
      p_full_name: input.fullName,
      p_phone: input.phone,
      p_notes: notes,
      p_source: 'web',
    });
    // Bookings are confirmed offline, so a DB failure (e.g. schema not applied
    // yet) must never block the customer — degrade to an offline request.
    if (error) {
      console.warn('[booking] Supabase insert failed, treating as offline request:', error.message);
      return { ok: true, persisted: false };
    }
    return { ok: true, persisted: true, id: (data as string) ?? undefined };
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

const LANG_TO_TOURLANG: Record<string, TourLang> = { hy: 'AM', ru: 'RU', en: 'EN' };

// Build the displayed language badges. Prefer the multi-select `languages[]`
// array; fall back to the legacy single `language` column for older rows.
function langsFromRow(languages: string[] | null | undefined, language: string): TourLang[] {
  if (languages && languages.length > 0) {
    const out = languages.map((l) => LANG_TO_TOURLANG[l]).filter(Boolean) as TourLang[];
    if (out.length > 0) return out;
  }
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
  duration: string | null;
  destination_slug: string | null;
  stop_photos?: { photo_url: string; order_index: number }[] | null;
};

type DbList = { hy?: string[]; ru?: string[]; en?: string[] } | null;

// Normalize a jsonb list column into a full per-locale shape.
function normList(v: DbList): { en: string[]; ru: string[]; hy: string[] } {
  return { en: v?.en ?? [], ru: v?.ru ?? [], hy: v?.hy ?? [] };
}

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
  region: string | null;
  date_start: string;
  price: number;
  max_seats: number;
  booked_seats: number;
  language: string;
  languages: string[] | null;
  cover_image_url: string | null;
  route_path: [number, number][] | null;
  inclusions: DbList;
  exclusions: DbList;
  duration_days: number | null;
  duration_nights: number | null;
  tour_photos?: { photo_url: string; order_index: number }[] | null;
  stops?: DbStop[] | null;
};

function mapTour(row: DbTour, variant: number, locale = 'en'): Tour {
  const d = new Date(row.date_start);
  const dateStr = formatTourDate(row.date_start, locale);
  const stops = (row.stops ?? [])
    .slice()
    .sort((a, b) => a.order_index - b.order_index)
    .map((s) => ({
      name: loc(s.name_hy, s.name_ru, s.name_en, ''),
      desc: loc(s.description_hy, s.description_ru, s.description_en, ''),
      lat: s.latitude ?? 0,
      lng: s.longitude ?? 0,
      duration: s.duration,
      destinationSlug: s.destination_slug,
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
    langs: langsFromRow(row.languages, row.language),
    variant: variant % 6,
    tag: CATEGORY_TAG[row.category ?? 'classic'] ?? CATEGORY_TAG.classic,
    description: loc(row.description_hy, row.description_ru, row.description_en, ''),
    stops,
    region: row.region ?? null,
    cover: row.cover_image_url ?? null,
    photos: (row.tour_photos ?? [])
      .slice()
      .sort((a, b) => a.order_index - b.order_index)
      .map((p) => p.photo_url),
    routePath: row.route_path ?? null,
    inclusions: normList(row.inclusions),
    exclusions: normList(row.exclusions),
    durationDays: row.duration_days ?? 1,
    durationNights: row.duration_nights ?? 0,
  };
}

const TOUR_SELECT =
  'id,title_hy,title_ru,title_en,description_hy,description_ru,description_en,location_hy,location_ru,location_en,category,country,region,date_start,price,max_seats,booked_seats,language,languages,cover_image_url,route_path,inclusions,exclusions,duration_days,duration_nights,tour_photos(photo_url,order_index),stops(order_index,name_hy,name_ru,name_en,description_hy,description_ru,description_en,latitude,longitude,duration,destination_slug,stop_photos(photo_url,order_index))';

/** All active tours for the public site. Falls back to mock TOURS. */
export async function getPublicTours(locale = 'en'): Promise<Tour[]> {
  const supabase = getSupabase();
  if (!supabase) return TOURS;
  try {
    const { data, error } = await supabase
      .from('tours')
      .select(TOUR_SELECT)
      .eq('is_active', true)
      .order('date_start', { ascending: true });
    if (error || !data || data.length === 0) return TOURS;
    return (data as unknown as DbTour[]).map((row, i) => mapTour(row, i, locale));
  } catch {
    return TOURS;
  }
}

/** A single tour by id. Falls back to the mock tour with the same id. */
export async function getPublicTour(id: string, locale = 'en'): Promise<Tour | null> {
  const supabase = getSupabase();
  const fallback = TOURS.find((t) => t.id === id) ?? null;
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase.from('tours').select(TOUR_SELECT).eq('id', id).single();
    if (error || !data) return fallback;
    return mapTour(data as unknown as DbTour, 0, locale);
  } catch {
    return fallback;
  }
}
