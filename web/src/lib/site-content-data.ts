// Server-only site-content reads. Falls back to lib/contact defaults.
import 'server-only';
import { getSupabase } from './supabase';
import { createServiceSupabase, createServerSupabase } from './supabase-server';
import { CONTACT } from './contact';
import type { Contact } from './site-content';

/** Raw key -> value_ru map for all content rows. Public anon read. */
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

/** Editable content for the admin editor (uses the privileged client). */
export async function getContentMapAdmin(): Promise<Record<string, string>> {
  const client = createServiceSupabase() ?? createServerSupabase();
  if (!client) return {};
  const { data } = await client.from('site_content').select('key,value_ru');
  const map: Record<string, string> = {};
  for (const row of (data ?? []) as { key: string; value_ru: string | null }[]) {
    map[row.key] = row.value_ru ?? '';
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
