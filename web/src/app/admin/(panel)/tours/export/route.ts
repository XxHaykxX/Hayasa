import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase, createServerSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

// Full JSON backup of every tour with its nested stops (and their photos),
// gallery photos, localized fields, languages and lists. Photos are kept as
// URLs — this export is for backup/migration, not the import template.
export async function GET() {
  await requireAdmin();
  const db = createServiceSupabase() ?? createServerSupabase();
  if (!db) return new Response('no db', { status: 500 });

  const { data, error } = await db
    .from('tours')
    .select('*, tour_photos(photo_url,order_index), stops(*, stop_photos(photo_url,order_index))')
    .order('created_at', { ascending: true });

  if (error) return new Response(`export failed: ${error.message}`, { status: 500 });

  const tours = data ?? [];
  const payload = {
    exported_at: new Date().toISOString(),
    count: tours.length,
    tours,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="hayasa-tours-export.json"',
    },
  });
}
