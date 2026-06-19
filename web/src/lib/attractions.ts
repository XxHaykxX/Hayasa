// Curated top attractions for the /tours filter. `label` is shown; `kw` is a
// short distinctive keyword matched (case-insensitive) against a tour's text
// (name + location + stop names/descriptions) to decide if the tour relates.
import type { Localized } from './tours';

export type Attraction = { label: Localized; kw: Localized };

export const ATTRACTIONS: Attraction[] = [
  { label: { ru: 'Дилижан', hy: 'Դիլիջան', en: 'Dilijan' }, kw: { ru: 'дилижан', hy: 'դիլիջան', en: 'dilijan' } },
  { label: { ru: 'Монастырь Гегард', hy: 'Գեղարդի վանք', en: 'Geghard Monastery' }, kw: { ru: 'гегард', hy: 'գեղարդ', en: 'geghard' } },
  { label: { ru: 'Монастырь Нораванк', hy: 'Նորավանք', en: 'Noravank Monastery' }, kw: { ru: 'нораванк', hy: 'նորավանք', en: 'noravank' } },
  { label: { ru: 'Монастырь Татев', hy: 'Տաթևի վանք', en: 'Tatev Monastery' }, kw: { ru: 'татев', hy: 'տաթև', en: 'tatev' } },
  { label: { ru: 'Монастырь Хор Вирап', hy: 'Խոր Վիրապ', en: 'Khor Virap Monastery' }, kw: { ru: 'хор вирап', hy: 'խոր վիրապ', en: 'khor virap' } },
  { label: { ru: 'Озеро Севан', hy: 'Սևանա լիճ', en: 'Lake Sevan' }, kw: { ru: 'севан', hy: 'սևան', en: 'sevan' } },
  { label: { ru: 'Храм Гарни', hy: 'Գառնիի տաճար', en: 'Garni Temple' }, kw: { ru: 'гарни', hy: 'գառնի', en: 'garni' } },
  { label: { ru: 'Храм Звартноц', hy: 'Զվարթնոց', en: 'Zvartnots Temple' }, kw: { ru: 'звартноц', hy: 'զվարթնոց', en: 'zvartnots' } },
  { label: { ru: 'Цахкадзор', hy: 'Ծաղկաձոր', en: 'Tsaghkadzor' }, kw: { ru: 'цахкадзор', hy: 'ծաղկաձոր', en: 'tsaghkadzor' } },
  { label: { ru: 'Эчмиадзинский кафедральный собор', hy: 'Էջմիածնի մայր տաճար', en: 'Etchmiadzin Cathedral' }, kw: { ru: 'эчмиадзин', hy: 'էջմիածին', en: 'echmiadzin' } },
];
