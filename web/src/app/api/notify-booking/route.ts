import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-server';
import { notifyNewBooking, notifyBookingEmail } from '@/lib/notify';

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
    .select('full_name, phone, seats, notes, user_id, created_at, tours(title_ru, title_hy, price)')
    .eq('id', bookingId)
    .single();
  if (!data) return NextResponse.json({ ok: false }, { status: 404 });

  if (Date.now() - new Date(data.created_at as string).getTime() > 5 * 60 * 1000) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const tours = (data as { tours?: { title_ru?: string; title_hy?: string; price?: number } | null }).tours;
  const tour = tours?.title_hy || tours?.title_ru || '—';
  const seats = data.seats as number;
  const unit = tours?.price ?? null;
  const total = unit ? unit * seats : null;
  const notice = {
    tour,
    name: data.full_name as string,
    phone: data.phone as string,
    seats,
    unit,
    total,
    notes: (data as { notes?: string | null }).notes ?? null,
  };
  // Email recipients: every admin (profiles.is_admin) + the customer who booked
  // (their account email), if the booking was made while signed in.
  const recipients = await bookingEmailRecipients(db, (data as { user_id?: string | null }).user_id ?? null);

  // Fire both channels; each is independently best-effort + env-gated.
  const [sent, emailed] = await Promise.all([
    notifyNewBooking(notice),
    notifyBookingEmail(notice, recipients),
  ]);
  return NextResponse.json({ ok: true, sent, emailed });
}

// Collects admin emails + the booking customer's email via the service client.
async function bookingEmailRecipients(
  db: NonNullable<ReturnType<typeof createServiceSupabase>>,
  customerUserId: string | null,
): Promise<string[]> {
  const emails: string[] = [];
  try {
    const { data: admins } = await db.from('profiles').select('id').eq('is_admin', true);
    const adminIds = new Set((admins ?? []).map((a) => a.id as string));
    if (customerUserId) adminIds.add(customerUserId);
    if (adminIds.size === 0) return emails;

    const { data: list } = await db.auth.admin.listUsers({ page: 1, perPage: 200 });
    for (const u of list?.users ?? []) {
      if (adminIds.has(u.id) && u.email) emails.push(u.email);
    }
  } catch (e) {
    console.warn('[notify] recipient lookup failed:', e);
  }
  return emails;
}
