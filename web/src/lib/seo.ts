// Central SEO constants. The canonical site origin and business identity used
// by metadata, sitemap, robots and JSON-LD. Real NAP values come from env /
// site_content so we never hardcode a fake address into structured data
// (Google penalises inconsistent/fake NAP).

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://hayasatours.com').replace(/\/$/, '');

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const ORG_NAME = 'Hayasa Tours';

// Default Open Graph image — must be a real, deployed asset (never localhost).
// public/hero-ararat.jpg exists in the repo.
export const OG_IMAGE = `${SITE_URL}/hero-ararat.jpg`;

// Optional precise NAP — set in env only when confirmed. Omitted from schema
// when empty, so we publish only true facts.
export const BUSINESS = {
  street: process.env.NEXT_PUBLIC_BUSINESS_STREET || '', // e.g. "Northern Ave 1"
  postalCode: process.env.NEXT_PUBLIC_BUSINESS_POSTAL || '',
  locality: process.env.NEXT_PUBLIC_BUSINESS_CITY || 'Yerevan',
  country: 'AM',
  lat: process.env.NEXT_PUBLIC_BUSINESS_LAT || '', // e.g. "40.1772"
  lng: process.env.NEXT_PUBLIC_BUSINESS_LNG || '',
};

// Social / listing profiles for sameAs. Fill the real URLs as accounts open.
export const SAME_AS = [
  process.env.NEXT_PUBLIC_FACEBOOK_URL,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_TRIPADVISOR_URL,
].filter(Boolean) as string[];

export const LOCALES = ['en', 'ru', 'hy'] as const;

/** Build the hreflang alternates map for a path suffix (e.g. "/tours/abc"). */
export function altLanguages(pathSuffix: string): Record<string, string> {
  const s = pathSuffix.startsWith('/') || pathSuffix === '' ? pathSuffix : `/${pathSuffix}`;
  return {
    en: `${SITE_URL}/en${s}`,
    ru: `${SITE_URL}/ru${s}`,
    hy: `${SITE_URL}/hy${s}`,
    'x-default': `${SITE_URL}/en${s}`,
  };
}

/** "+374 91 23 45 67" -> "+37491234567" for schema telephone. */
export function telDigits(display: string): string {
  const d = display.replace(/[^\d+]/g, '');
  return d.startsWith('+') ? d : `+${d}`;
}

/**
 * Trim a meta description to <= max chars at a word boundary (never mid-word),
 * adding an ellipsis only if truncated. Keeps SERP snippets readable.
 */
export function clampDescription(text: string, max = 155): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[.,;:!?-]+$/, '')}…`;
}
