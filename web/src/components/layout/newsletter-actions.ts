'use server';

import { z } from 'zod';
import { createServiceSupabase } from '@/lib/supabase-server';
import { getSupabase } from '@/lib/supabase';
import { notifyNewSubscriber } from '@/lib/notify';

export type SubscribeState = { ok: boolean; error?: string };

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  locale: z.string().trim().max(8).optional(),
});

// Newsletter signup. Validates the email, stores it via the SECURITY DEFINER
// `subscribe_email` RPC (idempotent — re-subscribe is a no-op), then fires a
// best-effort Telegram alert. Never throws to the client.
export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const parsed = schema.safeParse({
    email: formData.get('email'),
    locale: formData.get('locale') ?? undefined,
  });
  if (!parsed.success) return { ok: false, error: 'invalid' };

  const { email, locale } = parsed.data;
  // Prefer the service client (bypasses RLS); fall back to the anon client,
  // which can still call the RPC (granted to anon).
  const db = createServiceSupabase() ?? getSupabase();
  if (!db) return { ok: false, error: 'unavailable' };

  const { error } = await db.rpc('subscribe_email', {
    p_email: email,
    p_locale: locale ?? null,
    p_source: 'web',
  });
  if (error) {
    console.warn('[subscribe] failed:', error.message);
    return { ok: false, error: 'unavailable' };
  }

  await notifyNewSubscriber(email);
  return { ok: true };
}
