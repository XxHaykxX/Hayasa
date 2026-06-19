// Shared formatting helpers used by the public data layer and account pages.
import type { Localized } from './tours';

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Short month names per locale (RU/HY in genitive — "21 июня", "21 հունիսի").
const MONTHS_LOC: Record<string, string[]> = {
  en: MONTHS,
  ru: ['янв.', 'февр.', 'марта', 'апр.', 'мая', 'июня', 'июля', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
  hy: ['հունվ.', 'փետր.', 'մարտի', 'ապր.', 'մայիսի', 'հունիսի', 'հուլիսի', 'օգոստ.', 'սեպտ.', 'հոկտ.', 'նոյ.', 'դեկտ.'],
};

/**
 * Format a timestamptz ISO string for display (UTC, deterministic SSR/client).
 * EN → "Jun 20, 2026"; RU/HY → "20 июня 2026" / "20 հունիսի 2026".
 */
export function formatTourDate(iso: string, locale = 'en'): string {
  const d = new Date(iso);
  const day = d.getUTCDate();
  const mon = (MONTHS_LOC[locale] ?? MONTHS)[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return locale === 'en' ? `${mon} ${day}, ${year}` : `${day} ${mon} ${year}`;
}

/**
 * Build a Localized value from nullable per-locale columns. HY is the primary
 * language (always filled in admin); empty RU/EN fall back to HY, then to the
 * other languages, then to the shared fallback.
 */
export function loc(hy: string | null, ru: string | null, en: string | null, fb: string): Localized {
  const primary = hy || ru || en || fb;
  return { hy: hy || primary, ru: ru || primary, en: en || primary };
}
