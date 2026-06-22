'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';
import { CONTENT_FIELDS } from '@/lib/site-content';

export type ContentState = { ok: boolean; error?: string; saved?: boolean };

const clean = (v: FormDataEntryValue | null) => ((v as string) ?? '').trim() || null;

export async function saveContent(_prev: ContentState, formData: FormData): Promise<ContentState> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Нет доступа к БД (service key).' };

  const now = new Date().toISOString();
  const rows = CONTENT_FIELDS.map((f) =>
    f.localized
      ? {
          // HY-only entry: only HY is collected. value_ru/value_en go null
          // (public read falls back to value_hy).
          key: f.key,
          value_hy: clean(formData.get(`${f.key}_hy`)),
          updated_at: now,
        }
      : { key: f.key, value_ru: clean(formData.get(f.key)), updated_at: now },
  );

  const { error } = await db.from('site_content').upsert(rows, { onConflict: 'key' });
  if (error) return { ok: false, error: error.message };

  revalidatePath('/admin/content');
  revalidatePath('/[locale]', 'page'); // home reads hero + contacts
  return { ok: true, saved: true };
}
