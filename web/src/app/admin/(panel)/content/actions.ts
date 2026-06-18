'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';
import { CONTENT_KEYS } from '@/lib/site-content';

export type ContentState = { ok: boolean; error?: string; saved?: boolean };

export async function saveContent(_prev: ContentState, formData: FormData): Promise<ContentState> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };

  const rows = CONTENT_KEYS.map((key) => ({
    key,
    value_ru: ((formData.get(key) as string) ?? '').trim() || null,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await db.from('site_content').upsert(rows, { onConflict: 'key' });
  if (error) return { ok: false, error: error.message };

  revalidatePath('/admin/content');
  revalidatePath('/', 'layout'); // refresh public pages that read contacts
  return { ok: true, saved: true };
}
