'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';
import { parseCsv } from '@/lib/csv';
import { TOUR_CATEGORIES, TOUR_COUNTRIES, TOUR_LANG_OPTIONS, legacyLanguage, type TourLangOption } from '@/lib/admin-tours';

export type ImportState = { ok: boolean; created?: number; skipped?: number; errors?: string[]; error?: string };

const TRUTHY = new Set(['true', '1', 'да', 'yes', 'այո', 'on']);

function revalidatePublic() {
  revalidatePath('/[locale]', 'page');
  revalidatePath('/[locale]/tours', 'page');
  revalidatePath('/[locale]/tours/[id]', 'page');
}

// Bulk-create tours from a CSV (tour-level fields only — no stops, no photos).
// Imported tours land as drafts (is_active=false) unless the row says otherwise.
export async function importToursCsv(_prev: ImportState, formData: FormData): Promise<ImportState> {
  await requireAdmin();
  const file = formData.get('file');
  if (!file || typeof file === 'string' || !(file as File).size) {
    return { ok: false, error: 'Ընտրեք CSV ֆայլ.' };
  }
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա (service key).' };

  const text = await (file as File).text();
  const grid = parseCsv(text);
  if (grid.length < 2) return { ok: false, error: 'Ֆայլը դատարկ է կամ չունի տվյալներ.' };

  const header = grid[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const idx = {
    title_hy: col('title_hy'),
    description_hy: col('description_hy'),
    location_hy: col('location_hy'),
    category: col('category'),
    country: col('country'),
    region: col('region'),
    date_start: col('date_start'),
    price: col('price'),
    duration_days: col('duration_days'),
    duration_nights: col('duration_nights'),
    max_seats: col('max_seats'),
    languages: col('languages'),
    is_active: col('is_active'),
  };
  if (idx.title_hy < 0) return { ok: false, error: 'Բացակայում է «title_hy» սյունակը.' };

  const errors: string[] = [];
  const toInsert: Record<string, unknown>[] = [];

  for (let r = 1; r < grid.length; r++) {
    const line = r + 1; // human-friendly CSV line number
    const cells = grid[r];
    const get = (i: number) => (i >= 0 && i < cells.length ? String(cells[i] ?? '').trim() : '');

    const title = get(idx.title_hy);
    if (!title) {
      errors.push(`Տող ${line}: բացակայում է անվանումը — բաց թողնված.`);
      continue;
    }

    const rawDate = get(idx.date_start);
    const d = rawDate ? new Date(rawDate.replace(' ', 'T')) : new Date('invalid');
    if (!rawDate || isNaN(d.getTime())) {
      errors.push(`Տող ${line}: սխալ ամսաթիվ «${rawDate}» — բաց թողնված.`);
      continue;
    }

    const catRaw = get(idx.category).toLowerCase();
    const category = (TOUR_CATEGORIES as readonly string[]).includes(catRaw) ? catRaw : 'classic';
    const countryRaw = get(idx.country).toLowerCase();
    const country = (TOUR_COUNTRIES as readonly string[]).includes(countryRaw) ? countryRaw : 'am';

    const toInt = (v: string, def: number, min: number) => {
      const n = parseInt(v.replace(/\s/g, ''), 10);
      return Number.isFinite(n) && n >= min ? n : def;
    };
    const price = toInt(get(idx.price), 0, 0);
    const durationDays = toInt(get(idx.duration_days), 1, 1);
    const durationNights = toInt(get(idx.duration_nights), 0, 0);
    const maxSeats = toInt(get(idx.max_seats), 18, 1);

    const langs = (get(idx.languages)
      .split(/[;,]/)
      .map((s) => s.trim().toLowerCase())
      .filter((s): s is TourLangOption => (TOUR_LANG_OPTIONS as readonly string[]).includes(s)));
    const languages: TourLangOption[] = langs.length > 0 ? Array.from(new Set(langs)) : ['hy'];

    const isActive = idx.is_active >= 0 ? TRUTHY.has(get(idx.is_active).toLowerCase()) : false;

    const description = get(idx.description_hy);
    const location = get(idx.location_hy);
    const region = get(idx.region);

    toInsert.push({
      title_hy: title,
      title_ru: title, // RU/EN cols are NOT NULL → mirror HY (hy-only entry)
      title_en: title,
      description_hy: description || null,
      description_ru: description || null,
      description_en: description || null,
      location_hy: location || null,
      location_ru: location || null,
      location_en: location || null,
      category,
      country,
      region: region || null,
      date_start: d.toISOString(),
      price,
      duration_days: durationDays,
      duration_nights: durationNights,
      max_seats: maxSeats,
      languages,
      language: legacyLanguage(languages),
      is_active: isActive,
      inclusions: { hy: [], ru: [], en: [] },
      exclusions: { hy: [], ru: [], en: [] },
    });
  }

  let created = 0;
  if (toInsert.length > 0) {
    const { data, error } = await db.from('tours').insert(toInsert).select('id');
    if (error) return { ok: false, error: `Ներմուծման սխալ: ${error.message}`, errors };
    created = data?.length ?? 0;
  }

  const skipped = grid.length - 1 - created;
  revalidatePath('/admin/tours');
  revalidatePublic();
  return { ok: true, created, skipped, errors };
}
