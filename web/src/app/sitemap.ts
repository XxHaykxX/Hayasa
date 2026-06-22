import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getPublicTours } from '@/lib/db';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://hayasatours.com').replace(/\/$/, '');

// hreflang alternates for a path suffix, so Google sees every language version.
function alts(suffix: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${SITE}/${l}${suffix}`;
  languages['x-default'] = `${SITE}/hy${suffix}`;
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only public, indexable pages. Account pages (/my-tours, /profile, /auth) are
  // auth-gated with no SEO value — excluded here and noindex'd at the page level.
  const staticPaths = ['', '/tours', '/about', '/contact', '/privacy'];
  const tours = await getPublicTours();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${SITE}/${locale}${p}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: p === '' ? 1 : 0.7,
        alternates: alts(p),
      });
    }
    for (const tour of tours) {
      entries.push({
        url: `${SITE}/${locale}/tours/${tour.id}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: alts(`/tours/${tour.id}`),
      });
    }
  }
  return entries;
}
