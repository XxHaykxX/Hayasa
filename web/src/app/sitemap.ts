import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getPublicTours } from '@/lib/db';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hayasatours.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['', '/tours', '/my-tours', '/profile', '/auth', '/privacy'];
  const tours = await getPublicTours();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${SITE}/${locale}${p}`,
        changeFrequency: 'weekly',
        priority: p === '' ? 1 : 0.7,
      });
    }
    for (const tour of tours) {
      entries.push({
        url: `${SITE}/${locale}/tours/${tour.id}`,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }
  return entries;
}
