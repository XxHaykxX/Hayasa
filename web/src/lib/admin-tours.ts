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

export const CATEGORY_LABEL: Record<(typeof TOUR_CATEGORIES)[number], string> = {
  classic: 'Классический',
  gastro: 'Гастро',
  premium: 'Премиум',
  group: 'Групповой',
  cultural: 'Культурный',
  nature: 'Природа',
  border: 'Межграничный',
};
export const COUNTRY_LABEL: Record<(typeof TOUR_COUNTRIES)[number], string> = {
  am: 'Армения',
  ge: 'Грузия',
};
export const LANGUAGE_LABEL: Record<(typeof TOUR_LANGUAGES)[number], string> = {
  all: 'Все языки',
  hy: 'Армянский',
  ru: 'Русский',
  en: 'Английский',
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
  cover_image_url: string | null;
  is_active: boolean;
  inclusions: LocalizedList | null;
  exclusions: LocalizedList | null;
  created_at: string;
};

// Form input validation. Dates arrive as <input type="datetime-local"> strings.
export const tourSchema = z.object({
  // HY is the primary language (site runs in Armenia); RU/EN are optional.
  title_hy: z.string().trim().min(1, 'Название (HY) обязательно'),
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
  date_start: z.string().min(1, 'Дата обязательна'),
  price: z.coerce.number().int().min(0, 'Цена не может быть отрицательной'),
  duration_days: z.coerce.number().int().min(1).default(1),
  duration_nights: z.coerce.number().int().min(0).default(0),
  max_seats: z.coerce.number().int().min(1, 'Минимум 1 место'),
  booked_seats: z.coerce.number().int().min(0).default(0),
  language: z.enum(TOUR_LANGUAGES),
  is_active: z.coerce.boolean().default(true),
});

export type TourInput = z.infer<typeof tourSchema>;

// Shared image-upload limits (mirrors the tour-photos bucket config).
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

/** Returns an error message for an invalid image file, or null when ok. */
export function validateImage(f: File): string | null {
  if (f.size > MAX_IMAGE_BYTES) return 'Файл больше 5 МБ.';
  if (f.type && !ALLOWED_IMAGE_TYPES.includes(f.type)) return 'Допустимы только JPG, PNG, WebP, AVIF.';
  return null;
}
