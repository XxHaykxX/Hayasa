// Server-only read helpers for the admin team (auth users + profiles).
import 'server-only';
import { createServiceSupabase } from './supabase-server';

export type TeamMember = {
  id: string;
  email: string | null;
  is_admin: boolean;
  created_at: string | null;
};

/**
 * Lists all auth users merged with their `profiles.is_admin` flag. Service-role
 * only (reads auth.users via the admin API). Admins are listed first.
 */
export async function listTeam(): Promise<TeamMember[]> {
  const db = createServiceSupabase();
  if (!db) return [];

  const { data: list, error } = await db.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (error || !list) {
    console.warn('[admin-team] listUsers failed:', error?.message);
    return [];
  }

  const ids = list.users.map((u) => u.id);
  const { data: profiles } = await db.from('profiles').select('id, is_admin').in('id', ids);
  const adminById = new Map((profiles ?? []).map((p) => [p.id as string, Boolean(p.is_admin)]));

  return list.users
    .map((u) => ({
      id: u.id,
      email: u.email ?? null,
      is_admin: adminById.get(u.id) ?? false,
      created_at: u.created_at ?? null,
    }))
    .sort((a, b) => Number(b.is_admin) - Number(a.is_admin) || (a.email ?? '').localeCompare(b.email ?? ''));
}
