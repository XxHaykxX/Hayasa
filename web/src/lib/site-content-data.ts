// Server-only site-content reads. Falls back to lib/contact defaults.
import 'server-only';
import { getSupabase } from './supabase';
import { createServiceSupabase, createServerSupabase } from './supabase-server';
import { CONTACT } from './contact';
import type { Contact } from './site-content';

type ContentRow = { key: string; value_ru: string | null; value_hy: string | null; value_en: string | null };

/** Raw key -> value_ru map (non-localized values). Public anon read. */
export async function getContentMap(): Promise<Record<string, string>> {
  const client = getSupabase();
  if (!client) return {};
  try {
    const { data, error } = await client.from('site_content').select('key,value_ru');
    if (error || !data) return {};
    const map: Record<string, string> = {};
    for (const row of data as { key: string; value_ru: string | null }[]) {
      if (row.value_ru) map[row.key] = row.value_ru;
    }
    return map;
  } catch {
    return {};
  }
}

/** key -> value for the given locale (value_<locale> || value_ru fallback). */
export async function getContentLocalized(locale: string): Promise<Record<string, string>> {
  const client = getSupabase();
  if (!client) return {};
  try {
    const { data, error } = await client.from('site_content').select('key,value_ru,value_hy,value_en');
    if (error || !data) return {};
    const col = (['ru', 'hy', 'en'].includes(locale) ? `value_${locale}` : 'value_ru') as keyof ContentRow;
    const map: Record<string, string> = {};
    for (const row of data as ContentRow[]) {
      const v = (row[col] as string | null) || row.value_ru;
      if (v) map[row.key] = v;
    }
    return map;
  } catch {
    return {};
  }
}

/** Full per-locale values for the admin editor (privileged client). */
export async function getContentMapAdmin(): Promise<Record<string, { ru: string; hy: string; en: string }>> {
  const client = createServiceSupabase() ?? createServerSupabase();
  if (!client) return {};
  const { data } = await client.from('site_content').select('key,value_ru,value_hy,value_en');
  const map: Record<string, { ru: string; hy: string; en: string }> = {};
  for (const row of (data ?? []) as ContentRow[]) {
    map[row.key] = { ru: row.value_ru ?? '', hy: row.value_hy ?? '', en: row.value_en ?? '' };
  }
  return map;
}

/** Public contact info, DB-backed with fallback to the hardcoded defaults. */
export async function getContact(): Promise<Contact> {
  const map = await getContentMap();
  return {
    phoneDisplay: map.contact_phone || CONTACT.phoneDisplay,
    whatsapp: map.contact_whatsapp || CONTACT.whatsapp,
    telegram: map.contact_telegram || CONTACT.telegram,
    email: map.contact_email || CONTACT.email,
  };
}
