// Admin tours: shared Zod schema, row type, labels. Client-safe (no server
// imports). Server-only read helpers live in `admin-tours-data.ts`.
import { z } from 'zod';

export const TOUR_CATEGORIES = [
  'classic',
  'gastro',
  'premium',
  'group',
  'cultural',
  'nature',
  'border',
] as const;
export const TOUR_COUNTRIES = ['am', 'ge'] as const;
export const TOUR_LANGUAGES = ['all', 'hy', 'ru', 'en'] as const;
// Selectable per-tour languages (multi-select in the admin form).
export const TOUR_LANG_OPTIONS = ['hy', 'ru', 'en'] as const;
export type TourLangOption = (typeof TOUR_LANG_OPTIONS)[number];
export const TOUR_LANG_LABEL: Record<TourLangOption, string> = {
  hy: 'Հայերեն',
  ru: 'Ռուսերեն',
  en: 'Անգլերեն',
};

export const CATEGORY_LABEL: Record<(typeof TOUR_CATEGORIES)[number], string> = {
  classic: 'Դասական',
  gastro: 'Գաստրո',
  premium: 'Պրեմիում',
  group: 'Խմբակային',
  cultural: 'Մշակութային',
  nature: 'Բնություն',
  border: 'Անդրսահմանային',
};
export const COUNTRY_LABEL: Record<(typeof TOUR_COUNTRIES)[number], string> = {
  am: 'Հայաստան',
  ge: 'Վրաստան',
};
export const LANGUAGE_LABEL: Record<(typeof TOUR_LANGUAGES)[number], string> = {
  all: 'Բոլոր լեզուները',
  hy: 'Հայերեն',
  ru: 'Ռուսերեն',
  en: 'Անգլերեն',
};

export type LocalizedList = { hy?: string[]; ru?: string[]; en?: string[] };

export type TourRow = {
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
  currency: string;
  duration_days: number;
  duration_nights: number;
  max_seats: number;
  booked_seats: number;
  language: string;
  languages: string[] | null;
  cover_image_url: string | null;
  is_active: boolean;
  inclusions: LocalizedList | null;
  exclusions: LocalizedList | null;
  created_at: string;
};

// Form input validation. Dates arrive as <input type="datetime-local"> strings.
export const tourSchema = z.object({
  // HY is the primary language (site runs in Armenia); RU/EN are optional.
  title_hy: z.string().trim().min(1, 'Անվանումը (HY) պարտադիր է'),
  title_ru: z.string().trim().optional().default(''),
  title_en: z.string().trim().optional().default(''),
  description_hy: z.string().trim().optional().default(''),
  description_ru: z.string().trim().optional().default(''),
  description_en: z.string().trim().optional().default(''),
  location_hy: z.string().trim().optional().default(''),
  location_ru: z.string().trim().optional().default(''),
  location_en: z.string().trim().optional().default(''),
  category: z.enum(TOUR_CATEGORIES),
  country: z.enum(TOUR_COUNTRIES),
  region: z.string().trim().optional().default(''),
  date_start: z.string().min(1, 'Ամսաթիվը պարտադիր է'),
  price: z.coerce.number().int().min(0, 'Գինը չի կարող բացասական լինել'),
  duration_days: z.coerce.number().int().min(1).default(1),
  duration_nights: z.coerce.number().int().min(0).default(0),
  max_seats: z.coerce.number().int().min(1, 'Նվազագույնը 1 տեղ'),
  booked_seats: z.coerce.number().int().min(0).default(0),
  // One or more guide languages. At least one required.
  languages: z
    .array(z.enum(TOUR_LANG_OPTIONS))
    .min(1, 'Ընտրեք գոնե մեկ լեզու')
    .default(['hy']),
  is_active: z.coerce.boolean().default(true),
});

// Map a selected language set onto the legacy single `language` column.
export function legacyLanguage(langs: readonly TourLangOption[]): (typeof TOUR_LANGUAGES)[number] {
  return langs.length === 1 ? langs[0] : 'all';
}

export type TourInput = z.infer<typeof tourSchema>;

// Shared image-upload limits (mirrors the tour-photos bucket config).
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

/** Returns an error message for an invalid image file, or null when ok. */
export function validateImage(f: File): string | null {
  if (f.size > MAX_IMAGE_BYTES) return 'Ֆայլը 5 ՄԲ-ից մեծ է։';
  if (f.type && !ALLOWED_IMAGE_TYPES.includes(f.type)) return 'Թույլատրվում են միայն JPG, PNG, WebP, AVIF։';
  return null;
}
