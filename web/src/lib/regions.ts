import type { Localized } from './tours';

// Armenian marzes used by the home ArmeniaMap. `key` matches the SVG group
// data-name. `kw` are lowercase keywords (region name in hy/ru/en + signature
// towns/sights) matched against a tour's text to filter tours by region —
// tours have no region column, so this keyword match is the bridge.
export type Region = { key: string; label: Localized; kw: string[] };

export const REGIONS: Region[] = [
  {
    key: 'Shirak',
    label: { hy: 'Շիրակ', ru: 'Ширак', en: 'Shirak' },
    kw: ['շիրակ', 'ширак', 'shirak', 'գյումրի', 'гюмри', 'gyumri', 'մարմաշեն', 'мармашен', 'marmashen', 'հառիճ', 'харич', 'harich', 'արթիկ'],
  },
  {
    key: 'Armavir',
    label: { hy: 'Արմավիր', ru: 'Армавир', en: 'Armavir' },
    kw: ['արմավիր', 'армавир', 'armavir', 'էջմիածին', 'эчмиадзин', 'etchmiatsin', 'echmiadzin', 'զվարթնոց', 'звартноц', 'zvartnots', 'սարդարապատ', 'сардарапат', 'мецамор', 'metsamor'],
  },
  {
    key: 'Aragatsotn',
    label: { hy: 'Արագածոտն', ru: 'Арагацотн', en: 'Aragatsotn' },
    kw: ['արագածոտն', 'арагацотн', 'aragatsotn', 'արագած', 'арагац', 'aragats', 'սաղմոսավանք', 'сагмосаванк', 'saghmosavank', 'հովհաննավանք', 'ованаванк', 'hovhannavank', 'ամբերդ', 'амберд', 'amberd', 'բյուրական', 'бюракан', 'дендропарк', 'դենդրոպարկ', 'мугни', 'մուղնի'],
  },
  {
    key: 'Yerevan',
    label: { hy: 'Երևան', ru: 'Ереван', en: 'Yerevan' },
    kw: ['երևան', 'ереван', 'yerevan', 'կասկադ', 'каскад', 'cascade', 'մատենադարան', 'матенадаран', 'matenadaran', 'ծիծեռնակաբերդ', 'цицернакаберд'],
  },
  {
    key: 'Lori',
    label: { hy: 'Լոռի', ru: 'Лори', en: 'Lori' },
    kw: ['լոռի', 'лори', 'lori', 'սանահին', 'санаин', 'sanahin', 'հաղպատ', 'ахпат', 'haghpat', 'ալավերդի', 'алаверди', 'alaverdi', 'դսեղ', 'дсех', 'dsegh', 'ստեփանավան', 'степанаван', 'օձուն', 'одзун', 'кобайр', 'քոբայր', 'ахтала', 'ախթալա', 'лоре', 'լոռե', 'հնեվանք', 'хневанк'],
  },
  {
    key: 'Kotayq',
    label: { hy: 'Կոտայք', ru: 'Котайк', en: 'Kotayk' },
    kw: ['կոտայք', 'котайк', 'kotayq', 'kotayk', 'գառնի', 'гарни', 'garni', 'գեղարդ', 'гегард', 'geghard', 'ծաղկաձոր', 'цахкадзор', 'tsaghkadzor', 'քարերի սիմֆոնիա', 'симфония камней', 'symphony of stones', 'բջնի', 'бжни'],
  },
  {
    key: 'Ararat',
    label: { hy: 'Արարատ', ru: 'Арарат', en: 'Ararat' },
    kw: ['արարատ', 'арарат', 'ararat', 'խոր վիրապ', 'хор вирап', 'khor virap', 'хосров', 'хосровский'],
  },
  {
    key: 'Tavush',
    label: { hy: 'Տավուշ', ru: 'Тавуш', en: 'Tavush' },
    kw: ['տավուշ', 'тавуш', 'tavush', 'դիլիջան', 'дилижан', 'dilijan', 'հաղարծին', 'агарцин', 'haghartsin', 'գոշավանք', 'гошаванк', 'goshavank', 'իջևան', 'иджеван', 'ijevan', 'լաստիվեր', 'ластивер', 'lastiver', 'պարզ լիճ', 'парз', 'parz', 'մաթոսավանք', 'хоранашат', 'խորանաշատ'],
  },
  {
    key: 'Gegharkunik',
    label: { hy: 'Գեղարքունիք', ru: 'Гегаркуник', en: 'Gegharkunik' },
    kw: ['գեղարքունիք', 'гегаркуник', 'gegharkunik', 'սևան', 'севан', 'sevan', 'սևանավանք', 'севанаванк', 'sevanavank', 'հայրավանք', 'айраванк', 'hayravank', 'նորատուս', 'норатус', 'ванэван', 'վանեվան'],
  },
  {
    key: 'Vayots Dzor',
    label: { hy: 'Վայոց ձոր', ru: 'Вайоц дзор', en: 'Vayots Dzor' },
    kw: ['վայոց', 'вайоц', 'vayots', 'նորավանք', 'нораванк', 'noravank', 'արենի', 'арени', 'areni', 'ջերմուկ', 'джермук', 'jermuk', 'եղեգնաձոր', 'ехегнадзор', 'գնդեվանք', 'гндеванк', 'смбатаберд', 'սմբատաբերդ'],
  },
  {
    key: 'Syunik',
    label: { hy: 'Սյունիք', ru: 'Сюник', en: 'Syunik' },
    kw: ['սյունիք', 'сюник', 'syunik', 'տաթև', 'татев', 'tatev', 'խնձորեսկ', 'хндзореск', 'khndzoresk', 'գորիս', 'горис', 'goris', 'կապան', 'капан', 'սիսիան', 'сисиан', 'sisian', 'շաքի', 'шаки', 'воротан', 'որոտան', 'карахундж', 'քարահունջ', 'зорац', 'сатани'],
  },
];

export const regionByKey = (key: string | null | undefined): Region | undefined =>
  key ? REGIONS.find((r) => r.key === key) : undefined;
