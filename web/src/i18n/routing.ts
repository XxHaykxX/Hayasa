import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Site is Armenian-only. (en/ru dictionaries are kept in /messages but no
  // longer routed.) Locale prefix stays — public URLs live under /hy.
  locales: ['hy'],
  defaultLocale: 'hy',
});

export type Locale = (typeof routing.locales)[number];
