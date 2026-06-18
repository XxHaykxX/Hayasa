// Server-side Supabase clients (admin panel).
// - `createServerSupabase()` is cookie-bound: respects the logged-in user's
//   session + RLS. Use it to read the session and `is_admin`.
// - `createServiceSupabase()` uses the service-role key and BYPASSES RLS.
//   Server-only, never expose to the client. Used for admin writes.
import { createServerClient } from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True once URL + anon key are present (cookie-bound client can run). */
export const isServerSupabaseConfigured = Boolean(url && anonKey);
/** True once the service-role key is present (admin writes can run). */
export const isServiceSupabaseConfigured = Boolean(url && serviceKey);

/**
 * Cookie-bound Supabase client for Server Components, Route Handlers and
 * Server Actions. Reads/writes the auth session via Next's cookie store.
 * Returns null when credentials are missing.
 */
export function createServerSupabase(): SupabaseClient | null {
  if (!isServerSupabaseConfigured) return null;
  const cookieStore = cookies();
  return createServerClient(url!, anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // In a Server Component the cookie store is read-only; the call throws.
        // Session refresh is handled in middleware/route handlers, so swallow.
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          /* read-only context — ignore */
        }
      },
    },
  });
}

let serviceClient: SupabaseClient | null = null;

/**
 * Service-role client — bypasses RLS. SERVER ONLY. Returns null until
 * SUPABASE_SERVICE_ROLE_KEY is set in the environment.
 */
export function createServiceSupabase(): SupabaseClient | null {
  if (!isServiceSupabaseConfigured) return null;
  if (!serviceClient) {
    serviceClient = createClient(url!, serviceKey!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return serviceClient;
}
