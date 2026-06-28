import { requireAdmin } from '@/lib/admin-auth';
import { toCsv } from '@/lib/csv';

export const dynamic = 'force-dynamic';

// CSV import template (no photos, no stops). One example row shows the expected
// values; fill more rows and upload via "Импорт CSV" on the tours page.
const HEADER = [
  'title_hy',
  'description_hy',
  'location_hy',
  'category',
  'country',
  'region',
  'date_start',
  'price',
  'duration_days',
  'duration_nights',
  'max_seats',
  'languages',
  'is_active',
];

const EXAMPLE = [
  'Գառնի — Գեղարդ',
  'Միօրյա մշակութային տուր Արարատյան դաշտով, ներառում է գիդ և տրանսպորտ։',
  'Կոտայք',
  'classic',
  'am',
  'Kotayk',
  '2026-08-01 08:00',
  '18500',
  '1',
  '0',
  '18',
  'hy;ru',
  'true',
];

export async function GET() {
  await requireAdmin();
  const csv = '﻿' + toCsv([HEADER, EXAMPLE]);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="hayasa-tours-template.csv"',
    },
  });
}
