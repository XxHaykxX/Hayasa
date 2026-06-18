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
    max_seats: formData.get('max_seats'),
    booked_seats: formData.get('booked_seats') ?? 0,
    language: formData.get('language'),
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  });
}

/** Upload a cover image to storage; returns its public URL, or null if no file. */
async function uploadCover(file: FormDataEntryValue | null): Promise<string | null> {
  if (!file || typeof file === 'string') return null;
  const f = file as File;
  if (!f.size) return null;
  const invalid = validateImage(f);
  if (invalid) throw new Error(invalid);
  const db = createServiceSupabase();
  if (!db) return null;
  const ext = f.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `covers/${crypto.randomUUID()}.${ext}`;
  const { error } = await db.storage
    .from(BUCKET)
    .upload(path, f, { contentType: f.type || 'image/jpeg', upsert: false });
  if (error) throw new Error('Не удалось загрузить обложку: ' + error.message);
  return db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
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

  let cover: string | null = null;
  try {
    cover = await uploadCover(formData.get('cover'));
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
  const { error } = await db
    .from('tours')
    .insert({ ...toRow(parsed.data), cover_image_url: cover });
  if (error) return { ok: false, error: error.message };

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

  let cover: string | null = null;
  try {
    cover = await uploadCover(formData.get('cover'));
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
  const patch: Record<string, unknown> = toRow(parsed.data);
  if (cover) patch.cover_image_url = cover; // keep existing cover if none uploaded

  const { error } = await db.from('tours').update(patch).eq('id', id);
  if (error) return { ok: false, error: error.message };

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
