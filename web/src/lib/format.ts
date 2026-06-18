// Shared formatting helpers used by the public data layer and account pages.
import type { Localized } from './tours';

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Format a timestamptz ISO string as "Jun 20, 2026" (UTC, deterministic SSR/client). */
export function formatTourDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** Build a Localized value from nullable per-locale columns with a shared fallback. */
export function loc(hy: string | null, ru: string | null, en: string | null, fb: string): Localized {
  return { hy: hy || fb, ru: ru || fb, en: en || fb };
}
