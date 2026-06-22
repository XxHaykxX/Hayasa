// Tour content. Locale-keyed fields mirror the Supabase columns
// (title_hy/ru/en …) so swapping the mock for the DB is a 1:1 mapping.
// Targets are fixed timestamps (Yerevan, +04:00) so SSR and client agree.

export type Locale = 'en' | 'ru' | 'hy';
export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;
export type TourLang = 'AM' | 'RU' | 'EN';
export type Country = 'am' | 'ge';

export type Stop = {
  name: Localized;
  desc: Localized;
  lat: number;
  lng: number;
  photos?: string[];
  duration?: string | null; // e.g. "50–60 мин" — shown with a clock icon
  destinationSlug?: string | null; // links to a /destinations/[slug] landing page
};

export type Tour = {
  id: string;
  name: Localized;
  loc: Localized;
  country: Country;
  region?: string | null; // marz key (e.g. 'Lori') for the home map filter
  date: string;
  target: number; // epoch ms
  seats: number; // seats left
  maxSeats: number;
  price: string;
  priceAmd: number;
  langs: TourLang[];
  variant: number;
  tag: Localized;
  description: Localized;
  stops: Stop[];
  cover?: string | null;
  photos?: string[]; // tour-level gallery (cover + extra images) for the card/detail
  routePath?: [number, number][] | null; // precomputed road geometry [lat,lng]
  inclusions?: LocalizedList; // "what's included" bullet list per locale
  exclusions?: LocalizedList; // "not included" bullet list per locale
  durationDays?: number; // tour length for the listing badge (default 1)
  durationNights?: number; // overnight count (0 = day trip)
};

const at = (iso: string) => new Date(iso).getTime();

const TAG = {
  cultural: { en: 'Cultural', ru: 'Культурный', hy: 'Մշակութային' },
  classic: { en: 'Classic', ru: 'Классический', hy: 'Դասական' },
  premium: { en: 'Premium', ru: 'Премиум', hy: 'Պրեմիում' },
  nature: { en: 'Nature', ru: 'Природа', hy: 'Բնություն' },
  border: { en: 'Cross-border', ru: 'Межгранич.', hy: 'Անդրսահման' },
} satisfies Record<string, Localized>;

export const TOURS: Tour[] = [
  {
    id: 'geghard',
    name: { en: 'Monasteries of the Cliffs', ru: 'Монастыри в скалах', hy: 'Ժայռափոր վանքեր' },
    loc: { en: 'Geghard · Garni', ru: 'Гегард · Гарни', hy: 'Գեղարդ · Գառնի' },
    country: 'am',
    date: 'Jun 20, 2026',
    target: at('2026-06-20T08:00:00+04:00'),
    seats: 4,
    maxSeats: 18,
    price: '18 500',
    priceAmd: 18500,
    langs: ['AM', 'RU', 'EN'],
    variant: 0,
    tag: TAG.cultural,
    description: {
      en: 'A full day through the Azat valley, tracing two thousand years of Armenian history — from a Hellenistic temple to chambers carved deep into living rock. Comfortable transport, an expert guide, and lunch in a mountain village are included.',
      ru: 'Полный день по долине Азат через две тысячи лет армянской истории — от эллинистического храма до залов, высеченных в живой скале. Комфортный транспорт, опытный гид и обед в горном селе включены.',
      hy: 'Ամբողջ օր Ազատ գետի հովտով՝ հայոց երկու հազարամյա պատմության հետքերով — հելլենիստական տաճարից մինչև ժայռի մեջ փորված դահլիճներ. Հարմարավետ տրանսպորտ, փորձառու ուղեկցորդ և լեռնային գյուղում ճաշ ներառված են.',
    },
    stops: [
      {
        name: { en: 'Garni Temple', ru: 'Храм Гарни', hy: 'Գառնիի տաճար' },
        desc: { en: 'The only standing Greco-Roman colonnaded temple in the region, perched above the Azat gorge.', ru: 'Единственный сохранившийся греко-римский колоннадный храм в регионе, над ущельем Азат.', hy: 'Տարածաշրջանի միակ կանգուն հունահռոմեական սյունազարդ տաճարը՝ Ազատի կիրճի վրա.' },
        lat: 40.1122, lng: 44.7300, duration: '50–60 мин', destinationSlug: 'garni-geghard',
      },
      {
        name: { en: 'Symphony of Stones', ru: 'Симфония камней', hy: 'Քարերի սիմֆոնիա' },
        desc: { en: 'A short walk down the canyon to towering hexagonal basalt columns.', ru: 'Короткая прогулка по каньону к гигантским шестигранным базальтовым колоннам.', hy: 'Կարճ զբոսանք կիրճով դեպի վեցանկյուն բազալտե հսկա սյուները.' },
        lat: 40.1156, lng: 44.7228, duration: '30–40 мин',
      },
      {
        name: { en: 'Geghard Monastery', ru: 'Монастырь Гегард', hy: 'Գեղարդի վանք' },
        desc: { en: 'Rock-hewn churches carved into the cliff — a UNESCO World Heritage site. Lunch in the village.', ru: 'Вырубленные в скале церкви — объект ЮНЕСКО. Обед в селе.', hy: 'Ժայռի մեջ փորված եկեղեցիներ՝ ՅՈՒՆԵՍԿՕ-ի ժառանգություն. Ճաշ գյուղում.' },
        lat: 40.1408, lng: 44.8181, duration: '60–70 мин', destinationSlug: 'garni-geghard',
      },
    ],
    inclusions: {
      ru: ['Профессиональный гид (RU + EN)', 'Транспорт с кондиционером', 'Вода и выпечка', 'Входные билеты', 'Wi-Fi в транспорте', 'Страховка'],
      en: ['Professional guide (RU + EN)', 'Air-conditioned vehicle', 'Bottled water & pastries', 'Admission tickets', 'Wi-Fi in the vehicle', 'Insurance'],
      hy: ['Պրոֆեսիոնալ ուղեկցորդ (RU + EN)', 'Լավորակ տրանսպորտ', 'Ջուր և թխվածք', 'Մուտքի տոմսեր', 'Wi-Fi տրանսպորտում', 'Ապահովագրություն'],
    },
    exclusions: {
      ru: ['Обед (3 900 – 4 900 драм)', 'Трансфер в отель (финиш — наш офис)'],
      en: ['Lunch (3,900 – 4,900 AMD)', 'Hotel drop-off (final stop: our office)'],
      hy: ['Ճաշ (3 900 – 4 900 դրամ)', 'Հյուրանոց հասցնելը (վերջին կանգառը՝ մեր գրասենյակը)'],
    },
  },
  {
    id: 'sevan',
    name: { en: 'Lake Sevan & Sevanavank', ru: 'Озеро Севан и Севанаванк', hy: 'Սևանա լիճ և Սևանավանք' },
    loc: { en: 'Gegharkunik', ru: 'Гехаркуник', hy: 'Գեղարքունիք' },
    country: 'am',
    date: 'Jun 26, 2026',
    target: at('2026-06-26T08:00:00+04:00'),
    seats: 6,
    maxSeats: 18,
    price: '14 000',
    priceAmd: 14000,
    langs: ['RU', 'EN'],
    variant: 1,
    tag: TAG.classic,
    description: {
      en: 'The blue heart of Armenia — a day on the shores of the highland lake, with a peninsula monastery and fresh Sevan trout for lunch.',
      ru: 'Голубое сердце Армении — день на берегу высокогорного озера, монастырь на полуострове и свежая севанская форель на обед.',
      hy: 'Հայաստանի կապույտ սիրտը — օր բարձրլեռնային լճի ափին, թերակղզու վանք և թարմ սևանի իշխան ճաշին.',
    },
    stops: [
      {
        name: { en: 'Sevanavank', ru: 'Севанаванк', hy: 'Սևանավանք' },
        desc: { en: 'Ninth-century monastery on a peninsula with sweeping lake views.', ru: 'Монастырь IX века на полуострове с панорамой озера.', hy: '9-րդ դարի վանք թերակղզու վրա՝ լճի համայնապատկերով.' },
        lat: 40.5667, lng: 45.0119,
      },
      {
        name: { en: 'Sevan Shore', ru: 'Берег Севана', hy: 'Սևանի ափ' },
        desc: { en: 'Free time on the beach and a lakeside lunch.', ru: 'Свободное время на пляже и обед у воды.', hy: 'Ազատ ժամանակ լողափին և ճաշ ջրի ափին.' },
        lat: 40.5500, lng: 45.0200,
      },
      {
        name: { en: 'Hayravank', ru: 'Айраванк', hy: 'Հայրավանք' },
        desc: { en: 'A quiet medieval church above the western shore.', ru: 'Тихая средневековая церковь над западным берегом.', hy: 'Հանգիստ միջնադարյան եկեղեցի արևմտյան ափի վրա.' },
        lat: 40.3611, lng: 45.1042,
      },
    ],
  },
  {
    id: 'tatev',
    name: { en: 'Tatev & the Wings', ru: 'Татев и Крылья', hy: 'Տաթև և Թևեր' },
    loc: { en: 'Syunik · cable car', ru: 'Сюник · канатка', hy: 'Սյունիք · ճոպանուղի' },
    country: 'am',
    date: 'Jul 3, 2026',
    target: at('2026-07-03T08:00:00+04:00'),
    seats: 11,
    maxSeats: 18,
    price: '24 000',
    priceAmd: 24000,
    langs: ['AM', 'EN'],
    variant: 2,
    tag: TAG.premium,
    description: {
      en: "The deep south of Armenia: a ride on the world's longest reversible cable car to a cliff-edge monastery above the Vorotan gorge.",
      ru: 'Глубокий юг Армении: поездка на самой длинной в мире реверсивной канатной дороге к монастырю на краю ущелья Воротан.',
      hy: 'Հայաստանի խորը հարավը՝ ուղևորություն աշխարհի ամենաերկար ճոպանուղով դեպի Որոտանի կիրճի եզրին գտնվող վանք.',
    },
    stops: [
      {
        name: { en: 'Wings of Tatev', ru: 'Крылья Татева', hy: 'Տաթևի թևեր' },
        desc: { en: '5.7 km cable car gliding over the Vorotan gorge.', ru: 'Канатная дорога 5,7 км над ущельем Воротан.', hy: '5,7 կմ ճոպանուղի Որոտանի կիրճի վրայով.' },
        lat: 39.4117, lng: 46.2406,
      },
      {
        name: { en: 'Tatev Monastery', ru: 'Монастырь Татев', hy: 'Տաթևի վանք' },
        desc: { en: 'Ninth-century monastic complex on a basalt plateau.', ru: 'Монастырский комплекс IX века на базальтовом плато.', hy: '9-րդ դարի վանական համալիր բազալտե սարահարթին.' },
        lat: 39.3793, lng: 46.2503,
      },
      {
        name: { en: "Devil's Bridge", ru: 'Чёртов мост', hy: 'Սատանի կամուրջ' },
        desc: { en: 'Natural travertine bridge and warm mineral springs.', ru: 'Природный травертиновый мост и тёплые минеральные источники.', hy: 'Բնական տրավերտինե կամուրջ և տաք հանքային աղբյուրներ.' },
        lat: 39.4019, lng: 46.2486,
      },
    ],
  },
  {
    id: 'dilijan',
    name: { en: 'Dilijan Forest Trails', ru: 'Лесные тропы Дилижана', hy: 'Դիլիջանի անտառային արահետներ' },
    loc: { en: 'Tavush', ru: 'Тавуш', hy: 'Տավուշ' },
    country: 'am',
    date: 'Jul 11, 2026',
    target: at('2026-07-11T08:00:00+04:00'),
    seats: 3,
    maxSeats: 18,
    price: '16 500',
    priceAmd: 16500,
    langs: ['AM', 'RU'],
    variant: 3,
    tag: TAG.nature,
    description: {
      en: 'Armenia\'s "little Switzerland": forested hills, a still lake and an 11th-century monastery hidden in the beech woods.',
      ru: 'Армянская «маленькая Швейцария»: лесистые холмы, тихое озеро и монастырь XI века в буковом лесу.',
      hy: 'Հայկական «փոքրիկ Շվեյցարիան»՝ անտառապատ բլուրներ, հանգիստ լիճ և 11-րդ դարի վանք հաճարենու անտառում.',
    },
    stops: [
      {
        name: { en: 'Dilijan Old Town', ru: 'Старый Дилижан', hy: 'Հին Դիլիջան' },
        desc: { en: 'Restored Sharambeyan street of craft workshops.', ru: 'Восстановленная улица ремёсел Шарамбеян.', hy: 'Վերականգնված Շարամբեյան արհեստների փողոցը.' },
        lat: 40.7406, lng: 44.8628,
      },
      {
        name: { en: 'Parz Lake', ru: 'Озеро Парз', hy: 'Պարզ լիճ' },
        desc: { en: 'A clear forest lake, perfect for a walk and a picnic.', ru: 'Прозрачное лесное озеро для прогулки и пикника.', hy: 'Մաքուր անտառային լիճ՝ զբոսանքի և բացօթյա ճաշի համար.' },
        lat: 40.7831, lng: 44.9519,
      },
      {
        name: { en: 'Haghartsin Monastery', ru: 'Монастырь Агарцин', hy: 'Հաղարծին վանք' },
        desc: { en: '11th–13th-century monastery deep in the beech forest.', ru: 'Монастырь XI–XIII веков в глубине букового леса.', hy: '11–13-րդ դարերի վանք հաճարենու անտառի խորքում.' },
        lat: 40.7939, lng: 44.9286,
      },
    ],
  },
  {
    id: 'tbilisi',
    name: { en: 'Tbilisi Old Town', ru: 'Старый Тбилиси', hy: 'Թբիլիսիի հին քաղաք' },
    loc: { en: 'Georgia · 2 days', ru: 'Грузия · 2 дня', hy: 'Վրաստան · 2 օր' },
    country: 'ge',
    date: 'Jul 18, 2026',
    target: at('2026-07-18T08:00:00+04:00'),
    seats: 8,
    maxSeats: 18,
    price: '42 000',
    priceAmd: 42000,
    langs: ['RU', 'EN'],
    variant: 4,
    tag: TAG.border,
    durationDays: 2,
    durationNights: 1,
    description: {
      en: 'A two-day cross-border escape to the Georgian capital: sulphur baths, balconied old streets and Georgian wine. Bring your passport — we cross the Bagratashen–Sadakhlo border together.',
      ru: 'Двухдневная поездка через границу в столицу Грузии: серные бани, старые улочки с балконами и грузинское вино. Возьмите паспорт — границу Баграташен–Садахло проходим вместе.',
      hy: 'Երկօրյա անդրսահմանային ճանապարհորդություն Վրաստանի մայրաքաղաք՝ ծծմբային բաղնիքներ, պատշգամբներով հին փողոցներ և վրացական գինի. Վերցրե՛ք անձնագիրը — Բագրատաշեն–Սադախլո սահմանն անցնում ենք միասին.',
    },
    stops: [
      {
        name: { en: 'Narikala Fortress', ru: 'Крепость Нарикала', hy: 'Նարիկալա ամրոց' },
        desc: { en: 'Hilltop fortress with the best view over old Tbilisi.', ru: 'Крепость на холме с лучшим видом на старый Тбилиси.', hy: 'Բլրի ամրոց՝ հին Թբիլիսիի լավագույն տեսարանով.' },
        lat: 41.6877, lng: 44.8092,
      },
      {
        name: { en: 'Abanotubani Baths', ru: 'Бани Абанотубани', hy: 'Աբանոթուբանի բաղնիքներ' },
        desc: { en: 'Historic domed sulphur bathhouses in the old quarter.', ru: 'Исторические купольные серные бани в старом квартале.', hy: 'Պատմական գմբեթավոր ծծմբային բաղնիքներ հին թաղամասում.' },
        lat: 41.6892, lng: 44.8089,
      },
      {
        name: { en: 'Bridge of Peace', ru: 'Мост Мира', hy: 'Խաղաղության կամուրջ' },
        desc: { en: 'Glass footbridge over the Kura, then a wine-tasting dinner.', ru: 'Стеклянный мост через Куру и ужин с дегустацией вина.', hy: 'Ապակե կամուրջ Մթկվարիի վրայով և ընթրիք գինու համտեսով.' },
        lat: 41.6916, lng: 44.8089,
      },
    ],
  },
  {
    id: 'khor',
    name: { en: 'Khor Virap & Ararat View', ru: 'Хор Вирап и вид на Арарат', hy: 'Խոր Վիրապ և Արարատի տեսարան' },
    loc: { en: 'Ararat plain', ru: 'Араратская долина', hy: 'Արարատյան դաշտ' },
    country: 'am',
    date: 'Jul 25, 2026',
    target: at('2026-07-25T08:00:00+04:00'),
    seats: 9,
    maxSeats: 18,
    price: '12 000',
    priceAmd: 12000,
    langs: ['AM', 'RU', 'EN'],
    variant: 5,
    tag: TAG.classic,
    description: {
      en: 'The postcard view of Armenia: a monastery on the plain with Mount Ararat filling the sky, finished with a tasting at a family winery.',
      ru: 'Открыточный вид Армении: монастырь на равнине на фоне Арарата, в завершение — дегустация на семейной винодельне.',
      hy: 'Հայաստանի բացիկային տեսարանը՝ վանք դաշտում Արարատի ֆոնին, ավարտը՝ համտես ընտանեկան գինետանը.',
    },
    stops: [
      {
        name: { en: 'Khor Virap Monastery', ru: 'Монастырь Хор Вирап', hy: 'Խոր Վիրապ վանք' },
        desc: { en: 'The closest point to Ararat, with the famous deep pit.', ru: 'Ближайшая к Арарату точка, со знаменитой глубокой ямой.', hy: 'Արարատին ամենամոտ կետը՝ հայտնի խոր փոսով.' },
        lat: 39.8783, lng: 44.5747,
      },
      {
        name: { en: 'Ararat Viewpoint', ru: 'Смотровая на Арарат', hy: 'Արարատի դիտակետ' },
        desc: { en: 'Open plain with an unobstructed view of the twin peaks.', ru: 'Открытая равнина с видом на двуглавую вершину.', hy: 'Բաց դաշտ՝ երկգագաթ լեռան անարգել տեսարանով.' },
        lat: 39.8850, lng: 44.5800,
      },
      {
        name: { en: 'Family Winery', ru: 'Семейная винодельня', hy: 'Ընտանեկան գինետուն' },
        desc: { en: 'Tasting of Areni wines with the host family.', ru: 'Дегустация вин Арени с принимающей семьёй.', hy: 'Արենիի գինիների համտես հյուրընկալ ընտանիքի հետ.' },
        lat: 39.9000, lng: 44.6000,
      },
    ],
  },
];

export const getTour = (id: string): Tour => TOURS.find((t) => t.id === id) ?? TOURS[0];

// Pick a locale-keyed string. HY is the primary language, so empty values fall
// back to HY first (then ru/en).
export function L(v: Localized, locale: string): string {
  return v[locale as Locale] || v.hy || v.ru || v.en || '';
}

export const langLabel = (langs: TourLang[]) => langs.join(' · ');

export type BookingStatus = 'pending' | 'confirmed' | 'paid' | 'cancelled';

export const MY_BOOKINGS: { id: string; status: BookingStatus; when: 'upcoming' | 'past' }[] = [
  { id: 'geghard', status: 'confirmed', when: 'upcoming' },
  { id: 'sevan', status: 'pending', when: 'upcoming' },
  { id: 'tatev', status: 'paid', when: 'past' },
  { id: 'dilijan', status: 'cancelled', when: 'past' },
];
