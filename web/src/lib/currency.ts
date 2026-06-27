// Client-safe currency model. Prices are stored in AMD (the base); other
// currencies are derived at display time from live rates (lib/rates-data.ts),
// with a hardcoded fallback so the UI always works offline.

export type Currency = 'AMD' | 'USD' | 'EUR' | 'RUB';

export const CURRENCIES: Currency[] = ['AMD', 'USD', 'EUR', 'RUB'];

export const CURRENCY_META: Record<Currency, { symbol: string; label: string; prefix: boolean }> = {
  AMD: { symbol: '֏', label: 'AMD', prefix: false },
  USD: { symbol: '$', label: 'USD', prefix: true },
  EUR: { symbol: '€', label: 'EUR', prefix: true },
  RUB: { symbol: '₽', label: 'RUB', prefix: false },
};

// Multipliers: 1 AMD → x units of the target currency.
export type Rates = Record<Currency, number>;

// Sensible fallback (~mid-2026) used when the live fetch fails.
export const FALLBACK_RATES: Rates = { AMD: 1, USD: 0.0026, EUR: 0.0024, RUB: 0.205 };

const DEFAULT: Currency = 'AMD';

export function isCurrency(v: unknown): v is Currency {
  return typeof v === 'string' && (CURRENCIES as string[]).includes(v);
}

export function normalizeCurrency(v: unknown): Currency {
  return isCurrency(v) ? v : DEFAULT;
}

function convert(amd: number, cur: Currency, rates: Rates): number {
  const rate = rates[cur] ?? FALLBACK_RATES[cur];
  return amd * rate;
}

// "18 500" grouping with a regular space (matches the AMD mock formatting).
const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Format an AMD amount in the chosen currency, e.g. "18 500 ֏" or "$48". */
export function formatMoney(amd: number, cur: Currency, rates: Rates): string {
  const v = convert(amd, cur, rates);
  const meta = CURRENCY_META[cur];
  // AMD stays whole; foreign currencies round to whole units (amounts are large
  // enough that decimals add noise).
  const rounded = Math.round(v);
  const num = group(rounded);
  return meta.prefix ? `${meta.symbol}${num}` : `${num} ${meta.symbol}`;
}
