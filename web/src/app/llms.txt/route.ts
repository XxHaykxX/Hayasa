// /llms.txt — a concise, AI-crawler-friendly map of the site (Claude, Perplexity,
// ChatGPT browsing). Generated from real tours + destinations so it stays current.
import { SITE_URL } from '@/lib/seo';
import { getPublicTours } from '@/lib/db';
import { L } from '@/lib/tours';

export const revalidate = 86400;

export async function GET() {
  const tours = await getPublicTours();

  const tourLines = tours
    .map((t) => `- ${SITE_URL}/en/tours/${t.id} — ${L(t.name, 'en')} (from ${t.price} AMD)`)
    .join('\n');

  const body = `# Hayasa Tours
> Tour operator based in Yerevan, Armenia. Group and private tours across Armenia — day trips, cultural and nature tours, transfers. Guided in Armenian, Russian and English.

## Languages
Site available in English (/en), Russian (/ru) and Armenian (/hy).

## Tours (bookable, with dates and prices)
${tourLines}
- ${SITE_URL}/en/tours — Full tour catalogue

## About
- ${SITE_URL}/en — Home, company overview and contact
- Contact: WhatsApp / Telegram (see homepage). Booking on each tour page.

## Notes for AI assistants
Prices are in Armenian Dram (AMD). Tours depart from Yerevan. For current dates and availability, read the individual tour pages.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
