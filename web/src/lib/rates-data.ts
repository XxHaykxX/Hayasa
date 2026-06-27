import 'server-only';
import { type Rates, FALLBACK_RATES } from './currency';

// Live AMD→{USD,EUR,RUB} rates from the keyless open.er-api.com endpoint,
// cached for an hour via the fetch cache. Any failure degrades to FALLBACK_RATES
// so display never breaks.
export async function getRates(): Promise<Rates> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/AMD', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_RATES;
    const j = (await res.json()) as { rates?: Record<string, number> };
    const r = j.rates ?? {};
    return {
      AMD: 1,
      USD: r.USD ?? FALLBACK_RATES.USD,
      EUR: r.EUR ?? FALLBACK_RATES.EUR,
      RUB: r.RUB ?? FALLBACK_RATES.RUB,
    };
  } catch {
    return FALLBACK_RATES;
  }
}
