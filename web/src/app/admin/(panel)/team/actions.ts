'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase } from '@/lib/supabase-server';

export type TeamState = { ok: boolean; error?: string; created?: boolean };

const CreateSchema = z.object({
  email: z.string().email('Սխալ էլ. փոստ'),
  password: z.string().min(8, 'Գաղտնաբառ: նվազագույնը 8 նիշ'),
});

/**
 * Creates a new admin account (email + password, email pre-confirmed) and
 * grants it admin rights. Service-role only.
 */
export async function createAdmin(_prev: TeamState, formData: FormData): Promise<TeamState> {
  await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return { ok: false, error: 'Տվյալների բազան հասանելի չէ (service key)։' };

  const parsed = CreateSchema.safeParse({
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    password: String(formData.get('password') ?? ''),
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Մուտքագրման սխալ' };
  const { email, password } = parsed.data;

  const { data, error } = await db.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) {
    const msg = /already.*registered|exists/i.test(error.message)
      ? 'Այս էլ. փոստով օգտատեր արդեն գոյություն ունի'
      : error.message;
    return { ok: false, error: msg };
  }

  const uid = data.user?.id;
  if (uid) {
    // The on_auth_user_created trigger creates the profile row; flip it to admin.
    const { error: pErr } = await db.from('profiles').update({ is_admin: true }).eq('id', uid);
    if (pErr) return { ok: false, error: pErr.message };
  }

  revalidatePath('/admin/team');
  return { ok: true, created: true };
}

/**
 * Grants or revokes admin rights for an existing user. You cannot revoke your
 * own admin rights (lockout guard). Plain form action.
 */
export async function setAdmin(formData: FormData): Promise<void> {
  const me = await requireAdmin();
  const db = createServiceSupabase();
  if (!db) return;

  const id = String(formData.get('id') ?? '');
  const makeAdmin = String(formData.get('makeAdmin') ?? '') === 'true';
  if (!id) return;
  if (!makeAdmin && id === me.id) return; // never lock yourself out

  await db.from('profiles').update({ is_admin: makeAdmin }).eq('id', id);
  revalidatePath('/admin/team');
}
