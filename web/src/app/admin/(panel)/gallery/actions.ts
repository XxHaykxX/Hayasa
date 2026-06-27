'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';
import { validateImage } from '@/lib/admin-tours';
import { recordMedia, isMediaReferenced } from '@/lib/admin-media-data';
import { processImage } from '@/lib/image-process';

export type MediaActionState = { ok: boolean; error?: string; uploaded?: number };

const BUCKET = 'tour-photos';

// Mass-upload images into the shared library (bucket folder `library/`).
export async function uploadMedia(_prev: MediaActionState, formData: FormData): Promise<MediaActionState> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա (service key).' };

  const rawFolder = String(formData.get('folder') ?? '').trim();
  const folderId = /^[0-9a-f-]{36}$/i.test(rawFolder) ? rawFolder : null;
  const files = formData.getAll('files');
  const items: { url: string; path: string; name: string; folder_id: string | null }[] = [];
  for (const file of files) {
    if (!file || typeof file === 'string') continue;
    const f = file as File;
    if (!f.size) continue;
    const invalid = validateImage(f);
    if (invalid) return { ok: false, error: `${f.name}: ${invalid}` };
    // Optimize + normalize proportions (16:10 WebP) before storing.
    const img = await processImage(f);
    const path = `library/${crypto.randomUUID()}.${img.ext}`;
    const { error } = await db.storage.from(BUCKET).upload(path, img.buffer, {
      contentType: img.contentType,
      upsert: false,
    });
    if (error) return { ok: false, error: 'Չհաջողվեց վերբեռնել. ' + error.message };
    items.push({ url: db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl, path, name: f.name, folder_id: folderId });
  }
  if (items.length === 0) return { ok: false, error: 'Ֆայլեր չեն ընտրվել.' };

  await recordMedia(db, items);
  revalidatePath('/admin/gallery');
  return { ok: true, uploaded: items.length };
}

// Remove a library asset. Refuses if the file is still used by a tour/stop, so
// deleting from the gallery can never break a live tour.
export async function deleteMedia(id: string): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա.' };

  const { data: asset } = await db.from('media_assets').select('url, path').eq('id', id).single();
  if (!asset) return { ok: false, error: 'Չգտնվեց.' };

  if (await isMediaReferenced(db, asset.url as string)) {
    return { ok: false, error: 'Օգտագործվում է տուրում — չի կարելի ջնջել.' };
  }

  if (asset.path) await db.storage.from(BUCKET).remove([asset.path as string]);
  await db.from('media_assets').delete().eq('id', id);
  revalidatePath('/admin/gallery');
  return { ok: true };
}

// Attach selected library photos to a tour's gallery (append after the last).
export async function attachGalleryToTour(
  tourId: string,
  urls: string[],
): Promise<{ ok: boolean; error?: string; added?: number }> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա.' };
  const clean = Array.from(new Set(urls.filter(Boolean)));
  if (clean.length === 0) return { ok: false, error: 'Լուսանկար չի ընտրվել.' };

  // Skip URLs already attached to this tour.
  const { data: existing } = await db.from('tour_photos').select('photo_url').eq('tour_id', tourId);
  const have = new Set((existing ?? []).map((r) => r.photo_url as string));
  const fresh = clean.filter((u) => !have.has(u));
  if (fresh.length === 0) return { ok: true, added: 0 };

  const { data: last } = await db
    .from('tour_photos')
    .select('order_index')
    .eq('tour_id', tourId)
    .order('order_index', { ascending: false })
    .limit(1);
  const start = ((last?.[0]?.order_index as number | undefined) ?? -1) + 1;

  await db.from('tour_photos').insert(fresh.map((u, i) => ({ tour_id: tourId, photo_url: u, order_index: start + i })));

  // Cover follows the first gallery photo.
  const { data: first } = await db
    .from('tour_photos')
    .select('photo_url')
    .eq('tour_id', tourId)
    .order('order_index', { ascending: true })
    .limit(1);
  await db.from('tours').update({ cover_image_url: (first?.[0]?.photo_url as string | undefined) ?? null }).eq('id', tourId);

  revalidatePath(`/admin/tours/${tourId}/edit`);
  revalidatePath('/[locale]/tours/[id]', 'page');
  return { ok: true, added: fresh.length };
}

// ───────────────────────── folders (virtual file manager) ─────────────────────────

type SimpleResult = { ok: boolean; error?: string };

export async function createFolder(name: string): Promise<SimpleResult> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա.' };
  const clean = name.trim();
  if (!clean) return { ok: false, error: 'Անունը դատարկ է.' };
  const { error } = await db.from('media_folders').insert({ name: clean });
  if (error) return { ok: false, error: error.message.includes('duplicate') ? 'Այդ անունով պանակ արդեն կա.' : error.message };
  revalidatePath('/admin/gallery');
  return { ok: true };
}

export async function renameFolder(id: string, name: string): Promise<SimpleResult> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա.' };
  const clean = name.trim();
  if (!clean) return { ok: false, error: 'Անունը դատարկ է.' };
  const { error } = await db.from('media_folders').update({ name: clean }).eq('id', id);
  if (error) return { ok: false, error: error.message.includes('duplicate') ? 'Այդ անունով պանակ արդեն կա.' : error.message };
  revalidatePath('/admin/gallery');
  return { ok: true };
}

// Deleting a folder only removes the folder row; its photos fall back to the
// root (FK ON DELETE SET NULL) — no files are touched, no tour links break.
export async function deleteFolder(id: string): Promise<SimpleResult> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա.' };
  const { error } = await db.from('media_folders').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/gallery');
  return { ok: true };
}

// Move photos into a folder (folderId = null → back to root).
export async function moveMediaToFolder(ids: string[], folderId: string | null): Promise<SimpleResult> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա.' };
  if (ids.length === 0) return { ok: false, error: 'Ոչինչ չի ընտրվել.' };
  const { error } = await db.from('media_assets').update({ folder_id: folderId }).in('id', ids);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/gallery');
  return { ok: true };
}

// Rename a photo's display name (search/label only — the URL never changes).
export async function renameMedia(id: string, name: string): Promise<SimpleResult> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'ԲԴ հասանելիություն չկա.' };
  const { error } = await db.from('media_assets').update({ name: name.trim() || null }).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/gallery');
  return { ok: true };
}

// Paged fetch for the in-editor gallery picker (client calls this). Optional
// name search.
export async function fetchMediaPage(
  page: number,
  q = '',
): Promise<{ rows: { id: string; url: string }[]; hasMore: boolean }> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { rows: [], hasMore: false };
  const pageSize = 60;
  const from = (Math.max(1, page) - 1) * pageSize;
  let query = db.from('media_assets').select('id, url', { count: 'exact' });
  if (q.trim()) query = query.ilike('name', `%${q.trim()}%`);
  const { data, count } = await query.order('created_at', { ascending: false }).range(from, from + pageSize - 1);
  const rows = (data ?? []) as { id: string; url: string }[];
  return { rows, hasMore: (count ?? 0) > from + rows.length };
}
