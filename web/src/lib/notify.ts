// Server-only booking notifications. Each channel is a no-op until its env
// vars are set, so it is safe to ship now.
// - Telegram: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
// - Email (Resend): RESEND_API_KEY + BOOKING_EMAIL_TO (+ optional BOOKING_EMAIL_FROM)
import 'server-only';

export type BookingNotice = {
  tour: string;
  name: string;
  phone: string;
  seats: number;
  /** Per-seat tour price in AMD, or null if unknown. */
  unit?: number | null;
  /** Total booking price in AMD (per-seat price × seats), or null if unknown. */
  total?: number | null;
  /** Free-text customer note, or null/empty. */
  notes?: string | null;
};

// Compact E.164 (e.g. +37491234567) → tappable phone in Telegram / email.
function phoneE164(phone: string): string {
  const digits = phone.replace(/[^\d]/g, '');
  return digits ? `+${digits}` : phone;
}

// Drop the internal "tour: <slug>" marker some bookings carry in notes.
function cleanNotes(notes: string | null | undefined): string {
  return (notes ?? '')
    .split(' · ')
    .filter((s) => s.trim() && !/^tour:/i.test(s.trim()))
    .join(' · ')
    .trim();
}

const amd = (n: number) => `${n.toLocaleString('hy-AM')} ֏`;

// Ordered [label, value] rows shared by every channel.
function bookingRows(b: BookingNotice): [string, string][] {
  const rows: [string, string][] = [
    ['Ուղղությունը', b.tour],
    ['Անուն', b.name],
    ['Հեռախոս', phoneE164(b.phone)],
    ['Տեղեր', String(b.seats)],
  ];
  if (b.unit && b.unit > 0) rows.push(['Գին (1 տեղ)', amd(b.unit)]);
  if (b.total && b.total > 0) rows.push(['Ընդհանուրը', amd(b.total)]);
  const note = cleanNotes(b.notes);
  if (note) rows.push(['Նշում', note]);
  return rows;
}

/** Send a "new booking" alert to the admin Telegram chat, if configured. */
export async function notifyNewBooking(b: BookingNotice): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false; // not configured — silently skip

  const text = `🆕 *Նոր ամրագրում*\n` + bookingRows(b).map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: 'Markdown' }),
    });
    return res.ok;
  } catch (e) {
    console.warn('[notify] telegram send failed:', e);
    return false;
  }
}

/** Notify the admin Telegram chat of a new newsletter subscriber, if configured. */
export async function notifyNewSubscriber(email: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;

  const text = `📧 *Նոր բաժանորդ*\nЭл. почта: ${email}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: 'Markdown' }),
    });
    return res.ok;
  } catch (e) {
    console.warn('[notify] telegram subscriber send failed:', e);
    return false;
  }
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/**
 * Email a "new booking" alert via Resend, if configured. Recipients are passed
 * in (e.g. the customer's profile email + the admin contact email); each is
 * emailed separately so addresses are never exposed to one another. Extra
 * always-on recipients can be set via BOOKING_EMAIL_TO (comma-separated).
 *
 * Sender defaults to the Resend sandbox address, which only delivers to the
 * Resend account owner until a domain is verified — set BOOKING_EMAIL_FROM to a
 * verified address for real delivery to customers/admins.
 */
export async function notifyBookingEmail(b: BookingNotice, recipients: (string | null | undefined)[] = []): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false; // not configured — silently skip

  const envTo = (process.env.BOOKING_EMAIL_TO ?? '').split(',');
  const to = Array.from(
    new Set([...recipients, ...envTo].map((s) => (s ?? '').trim().toLowerCase()).filter(isEmail)),
  );
  if (to.length === 0) return false;

  const from = process.env.BOOKING_EMAIL_FROM || 'Hayasa Tours <onboarding@resend.dev>';
  const rows = bookingRows(b)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6A8A88;font:14px sans-serif;white-space:nowrap">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0;color:#1A3A5C;font:600 14px sans-serif">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  const html =
    `<div style="max-width:520px;margin:0 auto;padding:24px;border:1px solid #E3EDEC;border-radius:14px;font-family:sans-serif">` +
    `<h2 style="margin:0 0 16px;color:#1A3A5C;font-size:18px">🆕 Նոր ամրագրում</h2>` +
    `<table style="border-collapse:collapse">${rows}</table></div>`;

  const send = async (addr: string): Promise<boolean> => {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({ from, to: [addr], subject: `🆕 Նոր ամրագրում — ${b.tour}`, html }),
      });
      if (!res.ok) console.warn('[notify] resend email failed:', addr, res.status, await res.text().catch(() => ''));
      return res.ok;
    } catch (e) {
      console.warn('[notify] resend email error:', addr, e);
      return false;
    }
  };

  const results = await Promise.all(to.map(send));
  return results.some(Boolean);
}
