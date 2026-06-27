'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { FALLBACK_RATES, formatMoney, normalizeCurrency, type Currency, type Rates } from '@/lib/currency';

type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: Rates;
  format: (amd: number) => string;
};

const CurrencyContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'hayasa_currency';

export function CurrencyProvider({ rates, children }: { rates: Rates; children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('AMD');

  // Restore the saved choice on mount (SSR always renders AMD, so this avoids a
  // hydration mismatch — the switch happens client-side after paint).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCurrencyState(normalizeCurrency(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({ currency, setCurrency, rates, format: (amd: number) => formatMoney(amd, currency, rates) }),
    [currency, setCurrency, rates],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyContext);
  if (ctx) return ctx;
  // Defensive fallback when used outside the provider (e.g. isolated previews):
  // render AMD with the offline rates.
  return {
    currency: 'AMD',
    setCurrency: () => {},
    rates: FALLBACK_RATES,
    format: (amd: number) => formatMoney(amd, 'AMD', FALLBACK_RATES),
  };
}
