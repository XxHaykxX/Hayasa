import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hayasatours.am';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin', '/*/my-tours', '/*/profile', '/*/auth'],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
