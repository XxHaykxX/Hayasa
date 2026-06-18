'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';
import { stopSchema } from '@/lib/admin-stops';

export type StopActionState = { ok: boolean; error?: string };

const BUCKET = 'tour-photos';

function parseStop(formData: FormData) {
  return stopSchema.safeParse({
    name_ru: formData.get('name_ru'),
    name_hy: formData.get('name_hy') ?? '',
    name_en: formData.get('name_en') ?? '',
    description_ru: formData.get('description_ru') ?? '',
    description_hy: formData.get('description_hy') ?? '',
    description_en: formData.get('description_en') ?? '',
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
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
    order_index: input.order_index,
  };
}

const revalidate = (tourId: string) => revalidatePath(`/admin/tours/${tourId}/edit`);

export async function createStop(tourId: string, _prev: StopActionState, formData: FormData): Promise<StopActionState> {
  await requireAdmin();
  const parsed = parseStop(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Проверьте поля.' };
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };
  const { error } = await db.from('stops').insert({ tour_id: tourId, ...toStopRow(parsed.data) });
  if (error) return { ok: false, error: error.message };
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
  revalidate(tourId);
  return { ok: true };
}

export async function deleteStop(stopId: string, tourId: string): Promise<void> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;
  await db.from('stops').delete().eq('id', stopId); // cascade removes stop_photos rows
  revalidate(tourId);
}

export async function addStopPhoto(
  stopId: string,
  tourId: string,
  _prev: StopActionState,
  formData: FormData,
): Promise<StopActionState> {
  await requireAdmin();
  const file = formData.get('photo');
  if (!file || typeof file === 'string' || !(file as File).size) {
    return { ok: false, error: 'Выберите файл.' };
  }
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };
  const f = file as File;
  const ext = f.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `stops/${stopId}/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await db.storage
    .from(BUCKET)
    .upload(path, f, { contentType: f.type || 'image/jpeg', upsert: false });
  if (upErr) return { ok: false, error: upErr.message };
  const url = db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  const { count } = await db.from('stop_photos').select('*', { count: 'exact', head: true }).eq('stop_id', stopId);
  const { error } = await db.from('stop_photos').insert({ stop_id: stopId, photo_url: url, order_index: count ?? 0 });
  if (error) return { ok: false, error: error.message };
  revalidate(tourId);
  return { ok: true };
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
