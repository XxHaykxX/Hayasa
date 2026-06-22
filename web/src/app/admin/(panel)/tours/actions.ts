'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';
import { tourSchema, validateImage } from '@/lib/admin-tours';

export type ActionState = { ok: boolean; error?: string };

const BUCKET = 'tour-photos';

/** Invalidate the public (ISR-cached) tour pages across all locales. */
function revalidatePublic() {
  revalidatePath('/[locale]', 'page');
  revalidatePath('/[locale]/tours', 'page');
  revalidatePath('/[locale]/tours/[id]', 'page');
}

// One textarea per locale, one bullet per line → { ru:[], hy:[], en:[] } jsonb.
function listFrom(formData: FormData, base: string) {
  const lines = (v: FormDataEntryValue | null) =>
    String(v ?? '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  return {
    ru: lines(formData.get(`${base}_ru`)),
    hy: lines(formData.get(`${base}_hy`)),
    en: lines(formData.get(`${base}_en`)),
  };
}

function parseForm(formData: FormData) {
  return tourSchema.safeParse({
    title_hy: formData.get('title_hy'),
    title_ru: formData.get('title_ru'),
    title_en: formData.get('title_en'),
    description_hy: formData.get('description_hy') ?? '',
    description_ru: formData.get('description_ru') ?? '',
    description_en: formData.get('description_en') ?? '',
    location_hy: formData.get('location_hy') ?? '',
    location_ru: formData.get('location_ru') ?? '',
    location_en: formData.get('location_en') ?? '',
    category: formData.get('category'),
    country: formData.get('country'),
    date_start: formData.get('date_start'),
    price: formData.get('price'),
    duration_days: formData.get('duration_days') ?? 1,
    duration_nights: formData.get('duration_nights') ?? 0,
    max_seats: formData.get('max_seats'),
    booked_seats: formData.get('booked_seats') ?? 0,
    language: formData.get('language'),
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  });
}

type DB = NonNullable<ReturnType<typeof createServiceSupabase>>;

/** Upload many images to storage; returns their public URLs. Validates each. */
async function uploadMany(db: DB, files: FormDataEntryValue[]): Promise<string[]> {
  const out: string[] = [];
  for (const file of files) {
    if (!file || typeof file === 'string') continue;
    const f = file as File;
    if (!f.size) continue;
    const invalid = validateImage(f);
    if (invalid) throw new Error(`${f.name}: ${invalid}`);
    const ext = f.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `covers/${crypto.randomUUID()}.${ext}`;
    const { error } = await db.storage
      .from(BUCKET)
      .upload(path, f, { contentType: f.type || 'image/jpeg', upsert: false });
    if (error) throw new Error('Не удалось загрузить фото: ' + error.message);
    out.push(db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }
  return out;
}

/** Append photos to a tour's gallery after the current max order_index. */
async function appendTourPhotos(db: DB, tourId: string, urls: string[]) {
  if (urls.length === 0) return;
  const { data } = await db
    .from('tour_photos')
    .select('order_index')
    .eq('tour_id', tourId)
    .order('order_index', { ascending: false })
    .limit(1);
  const start = ((data?.[0]?.order_index as number | undefined) ?? -1) + 1;
  await db.from('tour_photos').insert(urls.map((u, i) => ({ tour_id: tourId, photo_url: u, order_index: start + i })));
}

/** Keep cover_image_url in sync with the first gallery photo. */
async function recomputeCover(db: DB, tourId: string) {
  const { data } = await db
    .from('tour_photos')
    .select('photo_url')
    .eq('tour_id', tourId)
    .order('order_index', { ascending: true })
    .limit(1);
  await db.from('tours').update({ cover_image_url: (data?.[0]?.photo_url as string | undefined) ?? null }).eq('id', tourId);
}

function toRow(input: ReturnType<typeof tourSchema.parse>) {
  return {
    title_hy: input.title_hy,
    title_ru: input.title_ru,
    title_en: input.title_en,
    description_hy: input.description_hy || null,
    description_ru: input.description_ru || null,
    description_en: input.description_en || null,
    location_hy: input.location_hy || null,
    location_ru: input.location_ru || null,
    location_en: input.location_en || null,
    category: input.category,
    country: input.country,
    date_start: new Date(input.date_start).toISOString(),
    price: input.price,
    duration_days: input.duration_days,
    duration_nights: input.duration_nights,
    max_seats: input.max_seats,
    // booked_seats is maintained automatically by the sync_booked_seats trigger.
    language: input.language,
    is_active: input.is_active,
  };
}

export async function createTour(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Проверьте поля формы.' };
  }
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };

  let urls: string[] = [];
  try {
    urls = await uploadMany(db, formData.getAll('photos'));
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
  const { data: inserted, error } = await db
    .from('tours')
    .insert({
      ...toRow(parsed.data),
      cover_image_url: urls[0] ?? null,
      inclusions: listFrom(formData, 'inclusions'),
      exclusions: listFrom(formData, 'exclusions'),
    })
    .select('id')
    .single();
  if (error) return { ok: false, error: error.message };
  await appendTourPhotos(db, inserted.id as string, urls);

  revalidatePath('/admin/tours');
  revalidatePublic();
  redirect('/admin/tours');
}

export async function updateTour(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Проверьте поля формы.' };
  }
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };

  let urls: string[] = [];
  try {
    urls = await uploadMany(db, formData.getAll('photos'));
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
  const patch: Record<string, unknown> = {
    ...toRow(parsed.data),
    inclusions: listFrom(formData, 'inclusions'),
    exclusions: listFrom(formData, 'exclusions'),
  };

  const { error } = await db.from('tours').update(patch).eq('id', id);
  if (error) return { ok: false, error: error.message };
  if (urls.length > 0) {
    await appendTourPhotos(db, id, urls);
    await recomputeCover(db, id); // cover follows the first gallery photo
  }

  revalidatePath('/admin/tours');
  revalidatePath(`/admin/tours/${id}/edit`);
  revalidatePublic();
  redirect('/admin/tours');
}

export async function deleteTour(id: string): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  await db.from('tours').delete().eq('id', id);
  revalidatePath('/admin/tours');
  revalidatePublic();
}

export async function toggleTourActive(id: string, next: boolean): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  await db.from('tours').update({ is_active: next }).eq('id', id);
  revalidatePath('/admin/tours');
  revalidatePublic();
}

/** Bulk show/hide selected tours. */
export async function bulkSetActive(ids: string[], next: boolean): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db || ids.length === 0) return;
  await db.from('tours').update({ is_active: next }).in('id', ids);
  revalidatePath('/admin/tours');
  revalidatePublic();
}

/** Bulk delete selected tours. */
export async function bulkDeleteTours(ids: string[]): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db || ids.length === 0) return;
  await db.from('tours').delete().in('id', ids);
  revalidatePath('/admin/tours');
  revalidatePublic();
}

/** Clone a tour (row + gallery photo rows + stops) as a hidden draft copy. */
export async function duplicateTour(id: string): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;

  const { data: src } = await db.from('tours').select('*').eq('id', id).single();
  if (!src) return;

  const s = src as Record<string, unknown>;
  // Drop server-managed columns; the trigger maintains booked_seats.
  delete s.id;
  delete s.created_at;
  delete s.updated_at;
  s.booked_seats = 0;
  s.is_active = false;
  s.title_hy = `${(src.title_hy as string) ?? 'Тур'} (копия)`;
  if (src.title_ru) s.title_ru = `${src.title_ru} (копия)`;

  const { data: inserted, error } = await db.from('tours').insert(s).select('id').single();
  if (error || !inserted) return;
  const newId = inserted.id as string;

  // Clone gallery photo rows (reuse the same public URLs).
  const { data: photos } = await db
    .from('tour_photos')
    .select('photo_url, order_index')
    .eq('tour_id', id);
  if (photos?.length) {
    await db.from('tour_photos').insert(
      photos.map((p) => ({ tour_id: newId, photo_url: p.photo_url, order_index: p.order_index })),
    );
  }

  // Clone stops (route points; stop photos are skipped). Best-effort.
  try {
    const { data: stops } = await db.from('stops').select('*').eq('tour_id', id);
    if (stops?.length) {
      const rows = stops.map((row) => {
        const r = row as Record<string, unknown>;
        delete r.id;
        delete r.created_at;
        r.tour_id = newId;
        return r;
      });
      await db.from('stops').insert(rows);
    }
  } catch {
    /* stops clone is best-effort */
  }

  revalidatePath('/admin/tours');
}

/** Persist a new photo order (array of photo ids, first = cover). */
export async function reorderTourPhotos(tourId: string, orderedIds: string[]): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  await Promise.all(
    orderedIds.map((id, i) => db.from('tour_photos').update({ order_index: i }).eq('id', id).eq('tour_id', tourId)),
  );
  await recomputeCover(db, tourId); // cover follows the new first photo
  revalidatePath(`/admin/tours/${tourId}/edit`);
  revalidatePublic();
}

export async function deleteTourPhoto(photoId: string, tourId: string): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  const { data: row } = await db.from('tour_photos').select('photo_url').eq('id', photoId).single();
  await db.from('tour_photos').delete().eq('id', photoId);
  if (row?.photo_url) {
    const marker = `/${BUCKET}/`;
    const idx = (row.photo_url as string).indexOf(marker);
    if (idx !== -1) await db.storage.from(BUCKET).remove([(row.photo_url as string).slice(idx + marker.length)]);
  }
  await recomputeCover(db, tourId);
  revalidatePath(`/admin/tours/${tourId}/edit`);
  revalidatePublic();
}
