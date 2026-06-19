import type { Metadata } from 'next';
import { getPublicTours } from '@/lib/db';
import { JsonLd } from '@/components/seo/JsonLd';
import { L } from '@/lib/tours';
import { SITE_URL, OG_IMAGE, altLanguages, clampDescription } from '@/lib/seo';
import ToursClient from './ToursClient';

export const revalidate = 300;

const T = {
  title: { en: 'Tours in Armenia from Yerevan', ru: 'Туры по Армении из Еревана', hy: 'Տուրեր Հայաստանում Երևանից' },
  desc: {
    en: 'Browse group and private tours across Armenia — day trips from Yerevan to Garni-Geghard, Tatev, Khor Virap, Lake Sevan and more, with prices and dates.',
    ru: 'Групповые и индивидуальные туры по Армении — однодневные экскурсии из Еревана в Гарни-Гегард, Татев, Хор Вирап, на Севан и другие, с ценами и датами.',
    hy: 'Խմբակային և անհատական տուրեր Հայաստանում — միօրյա էքսկուրսիաներ Երևանից դեպի Գառնի-Գեղարդ, Տաթև, Խոր Վիրապ, Սևան և այլն, գներով և ամսաթվերով։',
  },
};
const tl = (v: { en: string; ru: string; hy: string }, l: string) => v[l as 'en' | 'ru' | 'hy'] ?? v.en;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const title = tl(T.title, locale);
  const description = clampDescription(tl(T.desc, locale));
  const path = `/${locale}/tours`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: altLanguages('/tours') },
    openGraph: { type: 'website', title: `${title} — Hayasa Tours`, description, url: path, images: [{ url: OG_IMAGE }] },
    twitter: { card: 'summary_large_image', title: `${title} — Hayasa Tours`, description, images: [OG_IMAGE] },
  };
}

export default async function ToursPage({ params: { locale } }: { params: { locale: string } }) {
  const tours = await getPublicTours(locale);

  // ItemList schema → tour carousel rich-result eligibility on the list page.
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: tours.map((tour, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/tours/${tour.id}`,
      name: L(tour.name, locale),
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <ToursClient tours={tours} />
    </>
  );
}
