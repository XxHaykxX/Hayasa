// Site content: editable key/value config (client-safe).
// Non-localized keys use value_ru as the single source; localized keys use
// value_hy/ru/en.
export type ContentField = {
  key: string;
  label: string;
  group: 'contacts' | 'hero';
  localized?: boolean;
  placeholder?: string;
};

export const CONTENT_FIELDS: ContentField[] = [
  { key: 'contact_phone', label: 'Հեռախոս (ցուցադրում)', group: 'contacts', placeholder: '+374 98 70 60 54' },
  { key: 'contact_whatsapp', label: 'WhatsApp (հղում)', group: 'contacts', placeholder: 'https://wa.me/37498706054' },
  { key: 'contact_telegram', label: 'Telegram (հղում)', group: 'contacts', placeholder: 'https://t.me/hayasatours' },
  { key: 'contact_email', label: 'Էլ. փոստ', group: 'contacts', placeholder: 'hello@hayasatours.am' },
  { key: 'office_address', label: 'Գրասենյակի հասցե (խմբի հավաք)', group: 'contacts', placeholder: 'Նալբանդյան 96, Երևան' },
  { key: 'hero_title', label: 'Hero վերնագիր', group: 'hero', localized: true, placeholder: 'Բացահայտեք' },
  { key: 'hero_subtitle', label: 'Hero ենթավերնագիր', group: 'hero', localized: true },
];

export const CONTENT_KEYS = CONTENT_FIELDS.map((f) => f.key);
export const LOCALIZED_KEYS = CONTENT_FIELDS.filter((f) => f.localized).map((f) => f.key);

export type Contact = {
  phoneDisplay: string;
  whatsapp: string;
  telegram: string;
  email: string;
  address: string;
};
