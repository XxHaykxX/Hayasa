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
  { key: 'contact_phone', label: 'Телефон (отображение)', group: 'contacts', placeholder: '+374 91 23 45 67' },
  { key: 'contact_whatsapp', label: 'WhatsApp (ссылка)', group: 'contacts', placeholder: 'https://wa.me/37491234567' },
  { key: 'contact_telegram', label: 'Telegram (ссылка)', group: 'contacts', placeholder: 'https://t.me/hayasatours' },
  { key: 'contact_email', label: 'Email', group: 'contacts', placeholder: 'hello@hayasatours.am' },
  { key: 'hero_title', label: 'Заголовок Hero', group: 'hero', localized: true, placeholder: 'Откройте для себя' },
  { key: 'hero_subtitle', label: 'Подзаголовок Hero', group: 'hero', localized: true },
];

export const CONTENT_KEYS = CONTENT_FIELDS.map((f) => f.key);
export const LOCALIZED_KEYS = CONTENT_FIELDS.filter((f) => f.localized).map((f) => f.key);

export type Contact = {
  phoneDisplay: string;
  whatsapp: string;
  telegram: string;
  email: string;
};
