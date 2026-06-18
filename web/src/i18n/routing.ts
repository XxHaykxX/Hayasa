import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Full dictionaries for all three locales live under /messages.
  locales: ['en', 'ru', 'hy'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];
