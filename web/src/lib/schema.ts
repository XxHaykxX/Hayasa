// JSON-LD schema builders. Pure functions: data in, schema.org object out.
// No competitor in the market ships per-tour TouristTrip/Offer schema — this is
// our main technical-SEO edge (price + rich results eligibility in Google).
import {
  SITE_URL, ORG_ID, WEBSITE_ID, ORG_NAME, OG_IMAGE, BUSINESS, SAME_AS, telDigits,
} from './seo';
import { L, type Tour } from './tours';
import type { Contact } from './site-content';

type Json = Record<string, unknown>;

/** TravelAgency / LocalBusiness for the homepage. Publishes only true NAP. */
export function organizationSchema(contact: Contact): Json {
  const address: Json = {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.locality,
    addressCountry: BUSINESS.country,
  };
  if (BUSINESS.street) address.streetAddress = BUSINESS.street;
  if (BUSINESS.postalCode) address.postalCode = BUSINESS.postalCode;

  const org: Json = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': ORG_ID,
    name: ORG_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: `${SITE_URL}/icon.png`,
    description:
      'Tour operator in Yerevan: group and private tours across Armenia, day trips and transfers. Туроператор в Ереване — туры по Армении.',
    telephone: telDigits(contact.phoneDisplay),
    email: contact.email,
    address,
    areaServed: { '@type': 'Country', name: 'Armenia' },
    knowsLanguage: ['hy', 'ru', 'en'],
    priceRange: '$$',
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: process.env.NEXT_PUBLIC_BUSINESS_OPENS || '09:00',
      closes: process.env.NEXT_PUBLIC_BUSINESS_CLOSES || '21:00',
    }],
  };
  if (BUSINESS.lat && BUSINESS.lng) {
    org.geo = { '@type': 'GeoCoordinates', latitude: BUSINESS.lat, longitude: BUSINESS.lng };
  }
  const sameAs = [...SAME_AS, contact.whatsapp, contact.telegram].filter(Boolean);
  if (sameAs.length) org.sameAs = sameAs;
  return org;
}

/** WebSite node with a SearchAction (sitelinks search box eligibility). */
export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: ORG_NAME,
    inLanguage: ['en', 'ru', 'hy'],
    publisher: { '@id': ORG_ID },
  };
}

/** BreadcrumbList from [{name, url}] items (urls already absolute). */
export function breadcrumbSchema(items: { name: string; url: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** FAQPage from [{q, a}] items. */
export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/**
 * TouristTrip + Offer for a tour. Price is real (AMD). aggregateRating is
 * intentionally omitted until genuine reviews exist (faking it risks a Google
 * manual action).
 */
export function tourSchema(tour: Tour, locale: string): Json {
  const url = `${SITE_URL}/${locale}/tours/${tour.id}`;
  const itinerary = tour.stops.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'TouristAttraction', name: L(s.name, locale) },
  }));
  const schema: Json = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: L(tour.name, locale),
    description: L(tour.description, locale).slice(0, 300),
    url,
    touristType: [L(tour.tag, locale)],
    provider: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: String(tour.priceAmd),
      priceCurrency: 'AMD',
      availability:
        tour.seats > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: `${SITE_URL}/${locale}/book/${tour.id}`,
      validThrough: new Date(tour.target).toISOString().slice(0, 10),
    },
  };
  if (tour.cover) schema.image = tour.cover;
  if (itinerary.length) schema.itinerary = { '@type': 'ItemList', itemListElement: itinerary };
  return schema;
}

/**
 * Auto-generated booking-intent FAQ for a tour page, built from the tour's own
 * data (price, date, languages, route). Gives AI engines extractable Q&A and a
 * FAQPage block — high-intent queries no competitor answers on tour pages.
 */
export function tourFaqItems(tour: Tour, locale: string): { q: string; a: string }[] {
  const price = `${tour.price} AMD`;
  const langs = tour.langs.map((l) => ({ AM: 'Armenian', RU: 'Russian', EN: 'English' }[l] ?? l)).join(', ');
  const langsRu = tour.langs.map((l) => ({ AM: 'армянском', RU: 'русском', EN: 'английском' }[l] ?? l)).join(', ');
  const langsHy = tour.langs.map((l) => ({ AM: 'հայերեն', RU: 'ռուսերեն', EN: 'անգլերեն' }[l] ?? l)).join(', ');
  const route = tour.stops.map((s) => L(s.name, locale)).join(' · ');
  const name = L(tour.name, locale);

  const sets: Record<string, { q: string; a: string }[]> = {
    en: [
      { q: `How much does the ${name} tour cost?`, a: `The ${name} tour costs from ${price} per person. The price includes transport and a guide; book online or via WhatsApp.` },
      { q: `What does the tour include?`, a: `The route covers: ${route}. Comfortable transport and an expert guide are included.` },
      { q: `In which languages is the tour guided?`, a: `This tour is guided in ${langs}.` },
      { q: `When does the tour depart?`, a: `The next departure is ${tour.date}. ${tour.seats} of ${tour.maxSeats} seats are currently available.` },
      { q: `How do I book this tour?`, a: `Reserve online on this page or message us on WhatsApp — confirmation is fast and you pay on the day.` },
    ],
    ru: [
      { q: `Сколько стоит тур «${name}»?`, a: `Тур «${name}» — от ${price} с человека. В цену входят транспорт и гид; бронирование онлайн или через WhatsApp.` },
      { q: `Что входит в тур?`, a: `Маршрут: ${route}. Комфортный транспорт и опытный гид включены.` },
      { q: `На каких языках проводится тур?`, a: `Тур проводится на ${langsRu} языке.` },
      { q: `Когда отправление?`, a: `Ближайшее отправление — ${tour.date}. Свободно ${tour.seats} из ${tour.maxSeats} мест.` },
      { q: `Как забронировать тур?`, a: `Забронируйте на этой странице или напишите нам в WhatsApp — подтверждение быстрое, оплата в день тура.` },
    ],
    hy: [
      { q: `Որքա՞ն արժե «${name}» տուրը։`, a: `«${name}» տուրը ${price}-ից է մեկ անձի համար։ Գինը ներառում է տրանսպորտ և ուղեկցորդ; ամրագրումը՝ առցանց կամ WhatsApp-ով։` },
      { q: `Ի՞նչ է ներառում տուրը։`, a: `Երթուղին՝ ${route}։ Հարմարավետ տրանսպորտ և փորձառու ուղեկցորդ ներառված են։` },
      { q: `Ի՞նչ լեզուներով է անցկացվում տուրը։`, a: `Տուրն անցկացվում է ${langsHy}։` },
      { q: `Ե՞րբ է մեկնումը։`, a: `Մոտակա մեկնումը՝ ${tour.date}։ Ազատ է ${tour.maxSeats}-ից ${tour.seats} տեղ։` },
      { q: `Ինչպե՞ս ամրագրել տուրը։`, a: `Ամրագրե՛ք այս էջում կամ գրե՛ք մեզ WhatsApp-ով — հաստատումն արագ է, վճարումը՝ տուրի օրը։` },
    ],
  };
  return sets[locale] ?? sets.en;
}
