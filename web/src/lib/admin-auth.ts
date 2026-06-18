// Admin authentication helpers. Server-only.
import { redirect } from 'next/navigation';
import { createServerSupabase } from './supabase-server';

export type AdminUser = { id: string; email: string | null };

/**
 * Returns the current admin user, or null if not signed in / not an admin.
 * Does NOT redirect — use in places that need to branch (e.g. the login page).
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = createServerSupabase();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  if (error || !profile?.is_admin) return null;

  return { id: user.id, email: user.email ?? null };
}

/**
 * Requires an authenticated admin. Redirects to /admin/login otherwise.
 * Use at the top of every protected admin page / layout.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');
  return admin;
}
