'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const FLAGS: Record<string, string> = { hy: '🇦🇲', ru: '🇷🇺', en: '🇬🇧' };
// Display order matches the kit: Armenian / Russian / English.
const ORDER = ['hy', 'ru', 'en'] as const;

export function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: string) => {
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-1 text-[15px]" title="Հայերեն / Русский / English">
      {ORDER.filter((l) => routing.locales.includes(l)).map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`px-1 transition-all ${l === locale ? 'scale-110' : 'opacity-50 hover:opacity-100'}`}
          aria-label={l}
        >
          {FLAGS[l]}
        </button>
      ))}
    </div>
  );
}
