// Server-only read/helpers for the admin media library.
import 'server-only';
import { createServiceSupabase } from './supabase-server';
import { MEDIA_PAGE_SIZE, type MediaAsset, type MediaFolder } from './admin-media';

type Client = NonNullable<ReturnType<typeof createServiceSupabase>>;

export type MediaPage = { rows: MediaAsset[]; total: number; page: number; pageSize: number };

// folder: undefined = all, 'none' = no folder (root), '<uuid>' = that folder.
export async function listMedia(
  page = 1,
  q = '',
  folder?: string,
  pageSize = MEDIA_PAGE_SIZE,
): Promise<MediaPage> {
  const client = createServiceSupabase();
  const safePage = page > 0 ? page : 1;
  if (!client) return { rows: [], total: 0, page: safePage, pageSize };

  const from = (safePage - 1) * pageSize;
  let query = client.from('media_assets').select('*', { count: 'exact' });
  if (q.trim()) query = query.ilike('name', `%${q.trim()}%`);
  if (folder === 'none') query = query.is('folder_id', null);
  else if (folder) query = query.eq('folder_id', folder);
  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, from + pageSize - 1);
  if (error) {
    console.warn('[admin-media] list failed:', error.message);
    return { rows: [], total: 0, page: safePage, pageSize };
  }
  return { rows: (data ?? []) as MediaAsset[], total: count ?? 0, page: safePage, pageSize };
}

export type FoldersInfo = {
  folders: MediaFolder[];
  counts: Record<string, number>; // folder_id -> count
  noneCount: number; // assets with no folder
  total: number;
};

// All folders + per-folder asset counts (tallied in JS; the library is small).
export async function listFolders(): Promise<FoldersInfo> {
  const client = createServiceSupabase();
  if (!client) return { folders: [], counts: {}, noneCount: 0, total: 0 };
  const [{ data: folders }, { data: assets }] = await Promise.all([
    client.from('media_folders').select('*').order('name', { ascending: true }),
    client.from('media_assets').select('folder_id'),
  ]);
  const counts: Record<string, number> = {};
  let noneCount = 0;
  for (const a of assets ?? []) {
    const fid = (a as { folder_id: string | null }).folder_id;
    if (fid) counts[fid] = (counts[fid] ?? 0) + 1;
    else noneCount += 1;
  }
  return {
    folders: (folders ?? []) as MediaFolder[],
    counts,
    noneCount,
    total: (assets ?? []).length,
  };
}

// Record uploaded URLs in the library (idempotent on url). Called by every
// upload path (gallery, tour gallery, stop photos) so the library stays whole.
export async function recordMedia(
  client: Client,
  items: { url: string; path?: string | null; name?: string | null; folder_id?: string | null }[],
): Promise<void> {
  if (items.length === 0) return;
  const rows = items.map((i) => ({ url: i.url, path: i.path ?? null, name: i.name ?? null, folder_id: i.folder_id ?? null }));
  const { error } = await client.from('media_assets').upsert(rows, { onConflict: 'url', ignoreDuplicates: true });
  if (error) console.warn('[admin-media] record failed:', error.message);
}

// True when a URL is still used by any tour/stop (so its file must not be deleted).
export async function isMediaReferenced(client: Client, url: string): Promise<boolean> {
  const [tp, sp, cov] = await Promise.all([
    client.from('tour_photos').select('id', { count: 'exact', head: true }).eq('photo_url', url),
    client.from('stop_photos').select('id', { count: 'exact', head: true }).eq('photo_url', url),
    client.from('tours').select('id', { count: 'exact', head: true }).eq('cover_image_url', url),
  ]);
  return (tp.count ?? 0) + (sp.count ?? 0) + (cov.count ?? 0) > 0;
}
