'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';
import { stopSchema } from '@/lib/admin-stops';
import { validateImage } from '@/lib/admin-tours';
import { fetchRoutePath } from '@/lib/osrm';

export type StopActionState = { ok: boolean; error?: string };

const BUCKET = 'tour-photos';

function parseStop(formData: FormData) {
  return stopSchema.safeParse({
    name_ru: formData.get('name_ru') ?? '',
    name_hy: formData.get('name_hy') ?? '',
    name_en: formData.get('name_en') ?? '',
    description_ru: formData.get('description_ru') ?? '',
    description_hy: formData.get('description_hy') ?? '',
    description_en: formData.get('description_en') ?? '',
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
    duration: formData.get('duration') ?? '',
    destination_slug: formData.get('destination_slug') ?? '',
    order_index: formData.get('order_index') ?? 0,
  });
}

function toStopRow(input: ReturnType<typeof stopSchema.parse>) {
  return {
    name_ru: input.name_ru,
    name_hy: input.name_hy || null,
    name_en: input.name_en || null,
    description_ru: input.description_ru || null,
    description_hy: input.description_hy || null,
    description_en: input.description_en || null,
    latitude: input.latitude,
    longitude: input.longitude,
    duration: input.duration || null,
    destination_slug: input.destination_slug || null,
    order_index: input.order_index,
  };
}

const revalidate = (tourId: string) => {
  revalidatePath(`/admin/tours/${tourId}/edit`);
  revalidatePath('/[locale]/tours/[id]', 'page'); // public detail shows stop photos
};

// Recompute the cached road geometry from the tour's stops (best-effort).
async function recomputeRoute(db: ReturnType<typeof createServiceSupabase>, tourId: string) {
  if (!db) return;
  const { data } = await db
    .from('stops')
    .select('latitude,longitude')
    .eq('tour_id', tourId)
    .order('order_index', { ascending: true });
  const pts = (data ?? [])
    .filter((s) => s.latitude != null && s.longitude != null)
    .map((s) => [s.latitude as number, s.longitude as number] as [number, number]);
  if (pts.length < 2) {
    await db.from('tours').update({ route_path: null }).eq('id', tourId);
    return;
  }
  const path = await fetchRoutePath(pts);
  if (path) await db.from('tours').update({ route_path: path }).eq('id', tourId);
}

export async function createStop(tourId: string, _prev: StopActionState, formData: FormData): Promise<StopActionState> {
  await requireAdmin();
  const parsed = parseStop(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Проверьте поля.' };
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };
  const { error } = await db.from('stops').insert({ tour_id: tourId, ...toStopRow(parsed.data) });
  if (error) return { ok: false, error: error.message };
  await recomputeRoute(db, tourId);
  revalidate(tourId);
  return { ok: true };
}

export async function updateStop(
  stopId: string,
  tourId: string,
  _prev: StopActionState,
  formData: FormData,
): Promise<StopActionState> {
  await requireAdmin();
  const parsed = parseStop(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Проверьте поля.' };
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };
  const { error } = await db.from('stops').update(toStopRow(parsed.data)).eq('id', stopId);
  if (error) return { ok: false, error: error.message };
  await recomputeRoute(db, tourId);
  revalidate(tourId);
  return { ok: true };
}

export async function reorderStops(tourId: string, orderedIds: string[]): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  for (let i = 0; i < orderedIds.length; i++) {
    await db.from('stops').update({ order_index: i }).eq('id', orderedIds[i]).eq('tour_id', tourId);
  }
  await recomputeRoute(db, tourId);
  revalidate(tourId);
}

export async function deleteStop(stopId: string, tourId: string): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  await db.from('stops').delete().eq('id', stopId); // cascade removes stop_photos rows
  await recomputeRoute(db, tourId);
  revalidate(tourId);
}

export async function addStopPhoto(
  stopId: string,
  tourId: string,
  _prev: StopActionState,
  formData: FormData,
): Promise<StopActionState> {
  await requireAdmin();
  const files = formData
    .getAll('photo')
    .filter((f): f is File => typeof f !== 'string' && (f as File).size > 0);
  if (files.length === 0) return { ok: false, error: 'Выберите файл.' };
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };

  // Validate all before uploading any (fail fast on a bad file).
  for (const f of files) {
    const invalid = validateImage(f);
    if (invalid) return { ok: false, error: `${f.name}: ${invalid}` };
  }

  const { count } = await db.from('stop_photos').select('*', { count: 'exact', head: true }).eq('stop_id', stopId);
  let idx = count ?? 0;
  for (const f of files) {
    const ext = f.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `stops/${stopId}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await db.storage
      .from(BUCKET)
      .upload(path, f, { contentType: f.type || 'image/jpeg', upsert: false });
    if (upErr) return { ok: false, error: upErr.message };
    const url = db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    const { error } = await db.from('stop_photos').insert({ stop_id: stopId, photo_url: url, order_index: idx++ });
    if (error) return { ok: false, error: error.message };
  }
  revalidate(tourId);
  return { ok: true };
}

export async function reorderStopPhotos(stopId: string, tourId: string, orderedIds: string[]): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  await Promise.all(
    orderedIds.map((id, i) => db.from('stop_photos').update({ order_index: i }).eq('id', id).eq('stop_id', stopId)),
  );
  revalidate(tourId);
}

export async function deleteStopPhoto(photoId: string, tourId: string): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  // Best-effort: remove the storage object too (path derived from public URL).
  const { data: row } = await db.from('stop_photos').select('photo_url').eq('id', photoId).single();
  await db.from('stop_photos').delete().eq('id', photoId);
  if (row?.photo_url) {
    const marker = `/${BUCKET}/`;
    const idx = row.photo_url.indexOf(marker);
    if (idx !== -1) {
      const objectPath = row.photo_url.slice(idx + marker.length);
      await db.storage.from(BUCKET).remove([objectPath]);
    }
  }
  revalidate(tourId);
}
