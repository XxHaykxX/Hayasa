import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { OG_IMAGE, altLanguages } from '@/lib/seo';
import { getRates } from '@/lib/rates-data';
import { CurrencyProvider } from '@/components/currency/CurrencyProvider';
import '../globals.css';

const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hayasatours.am';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const title = t('title');
  const description = t('description');
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: '%s — Hayasa Tours' },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: altLanguages(''),
    },
    openGraph: {
      type: 'website',
      siteName: 'Hayasa Tours',
      url: `/${locale}`,
      locale,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Hayasa Tours — Armenia' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();
  const rates = await getRates();

  return (
    <html lang={locale} className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <CurrencyProvider rates={rates}>{children}</CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
