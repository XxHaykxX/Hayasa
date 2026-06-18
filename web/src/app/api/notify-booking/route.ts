import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-server';
import { notifyNewBooking } from '@/lib/notify';

// Best-effort booking alert. The client calls this after a successful booking
// insert. To prevent abuse we re-read the booking by id with the service client
// and only notify for a genuine, recent (<5 min) row.
export async function POST(req: Request) {
  let bookingId: string | undefined;
  try {
    ({ bookingId } = await req.json());
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!bookingId) return NextResponse.json({ ok: false }, { status: 400 });

  const db = createServiceSupabase();
  if (!db) return NextResponse.json({ ok: false });

  const { data } = await db
    .from('bookings')
    .select('full_name, phone, seats, created_at, tours(title_ru)')
    .eq('id', bookingId)
    .single();
  if (!data) return NextResponse.json({ ok: false }, { status: 404 });

  if (Date.now() - new Date(data.created_at as string).getTime() > 5 * 60 * 1000) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const tour = (data as { tours?: { title_ru?: string } | null }).tours?.title_ru ?? '—';
  const sent = await notifyNewBooking({
    tour,
    name: data.full_name as string,
    phone: data.phone as string,
    seats: data.seats as number,
  });
  return NextResponse.json({ ok: true, sent });
}
