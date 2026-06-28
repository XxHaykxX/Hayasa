'use client';

import { useCurrency } from './CurrencyProvider';

// Renders an AMD amount in the user's selected currency. Drop-in for any place
// that used to print "{price} ֏".
export function Price({ amd, className }: { amd: number; className?: string }) {
  const { format } = useCurrency();
  return <span className={className}>{format(amd)}</span>;
}
