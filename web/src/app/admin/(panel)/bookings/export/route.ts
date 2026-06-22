import { requireAdmin } from '@/lib/admin-auth';
import { createServiceSupabase, createServerSupabase } from '@/lib/supabase-server';
import { STATUS_LABEL } from '@/lib/admin-bookings';

export const dynamic = 'force-dynamic';

// CSV export of bookings honouring the current status/search filters.
// Semicolon-separated + UTF-8 BOM so Excel (RU locale) opens it cleanly.
export async function GET(req: Request) {
  await requireAdmin();
  const db = createServiceSupabase() ?? createServerSupabase();
  if (!db) return new Response('no db', { status: 500 });

  const url = new URL(req.url);
  const status = url.searchParams.get('status') ?? 'all';
  const q = url.searchParams.get('q') ?? '';

  let query = db
    .from('bookings')
    .select('created_at, full_name, phone, seats, status, notes, tours(title_ru, title_hy)')
    .order('created_at', { ascending: false });
  if (status !== 'all') query = query.eq('status', status);
  if (q.trim()) query = query.or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`);

  const { data } = await query;

  const esc = (v: unknown) => {
    const s = String(v ?? '');
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = ['Дата', 'Тур', 'Имя', 'Телефон', 'Мест', 'Статус', 'Заметки'];
  const rows = ((data ?? []) as Array<Record<string, unknown>>).map((b) => {
    const tours = b.tours as { title_ru?: string; title_hy?: string } | null;
    const tour = tours?.title_hy || tours?.title_ru || (b.notes as string) || '';
    return [
      new Date(b.created_at as string).toLocaleString('ru-RU'),
      tour,
      b.full_name,
      b.phone,
      b.seats,
      STATUS_LABEL[b.status as keyof typeof STATUS_LABEL] ?? b.status,
      b.notes ?? '',
    ]
      .map(esc)
      .join(';');
  });
  const csv = '﻿' + [header.join(';'), ...rows].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bookings.csv"',
    },
  });
}
