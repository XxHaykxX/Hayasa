// Server-only booking notifications. No-op until TELEGRAM_BOT_TOKEN +
// TELEGRAM_CHAT_ID are set in the environment, so it is safe to ship now.
import 'server-only';

export type BookingNotice = {
  tour: string;
  name: string;
  phone: string;
  seats: number;
};

/** Send a "new booking" alert to the admin Telegram chat, if configured. */
export async function notifyNewBooking(b: BookingNotice): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false; // not configured — silently skip

  const text =
    `🆕 *Новая бронь*\n` +
    `Тур: ${b.tour}\n` +
    `Имя: ${b.name}\n` +
    `Телефон: ${b.phone}\n` +
    `Мест: ${b.seats}`;

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
