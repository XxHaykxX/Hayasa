'use client';
// Browser Supabase client (cookie-based) for the admin panel sign-in flow.
// Uses @supabase/ssr so the session lands in cookies the server can read.
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getBrowserSupabase(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error('Supabase env not configured (NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY).');
  }
  if (!client) client = createBrowserClient(url, anonKey);
  return client;
}
