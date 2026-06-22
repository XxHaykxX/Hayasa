import type { Localized } from './tours';

// Placeholder team roster. Names are localized (transliteration differs per
// locale); roles too. Avatars render as initials on a brand-colour tile until
// real photos are added — no stock photography. Edit freely.
export type TeamMember = {
  id: string;
  name: Localized;
  role: Localized;
  langs: string[]; // shown as a small caption, e.g. ['AM', 'RU', 'EN']
  accent: 'teal' | 'amber' | 'navy' | 'success';
};

export const TEAM: TeamMember[] = [
  {
    id: 'armine',
    name: { hy: 'Արմինե', ru: 'Армине', en: 'Armine' },
    role: { hy: 'Գիդ-պատմաբան', ru: 'Гид-историк', en: 'History guide' },
    langs: ['AM', 'RU', 'EN'],
    accent: 'teal',
  },
  {
    id: 'edgar',
    name: { hy: 'Էդգար', ru: 'Эдгар', en: 'Edgar' },
    role: { hy: 'Գիդ-բնագետ', ru: 'Гид-натуралист', en: 'Nature guide' },
    langs: ['AM', 'RU', 'EN'],
    accent: 'success',
  },
  {
    id: 'norayr',
    name: { hy: 'Նորայր', ru: 'Норайр', en: 'Norayr' },
    role: { hy: 'Վարորդ', ru: 'Водитель', en: 'Driver' },
    langs: ['AM', 'RU'],
    accent: 'navy',
  },
  {
    id: 'knarik',
    name: { hy: 'Քնարիկ', ru: 'Кнарик', en: 'Knarik' },
    role: { hy: 'Գիդ-պատմաբան', ru: 'Гид-историк', en: 'History guide' },
    langs: ['AM', 'EN'],
    accent: 'amber',
  },
  {
    id: 'grisha',
    name: { hy: 'Գրիշա', ru: 'Гриша', en: 'Grisha' },
    role: { hy: 'Վարորդ', ru: 'Водитель', en: 'Driver' },
    langs: ['AM', 'RU'],
    accent: 'navy',
  },
  {
    id: 'narek',
    name: { hy: 'Նարեկ', ru: 'Нарек', en: 'Narek' },
    role: { hy: 'Համակարգող', ru: 'Координатор туров', en: 'Tour coordinator' },
    langs: ['AM', 'RU', 'EN'],
    accent: 'teal',
  },
];
