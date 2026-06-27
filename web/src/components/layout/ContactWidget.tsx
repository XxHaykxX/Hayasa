'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { BrandIcon, type BrandName } from '@/components/ui/BrandIcon';
import { CONTACT } from '@/lib/contact';

type Channel = { name: BrandName; href: string; label: string; bg: string };

const CHANNELS: Channel[] = [
  { name: 'messenger', href: CONTACT.messenger, label: 'Messenger', bg: '#0084FF' },
  { name: 'whatsapp', href: CONTACT.whatsapp, label: 'WhatsApp', bg: '#25D366' },
  { name: 'viber', href: CONTACT.viber, label: 'Viber', bg: '#7360F2' },
  { name: 'telegram', href: CONTACT.telegram, label: 'Telegram', bg: '#0088CC' },
];

// Floating "Կապ" contact widget, bottom-right on every public page. Tap to fan
// out the messengers. Sits above the mobile booking CTA bar (bottom offset).
export function ContactWidget() {
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} className="fixed right-4 bottom-24 z-[45] flex flex-col items-end gap-3 lg:bottom-6">
      {/* channel buttons */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        {CHANNELS.filter((c) => c.href).map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.label}
            title={c.label}
            className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_6px_18px_rgba(26,58,92,0.28)] transition-transform hover:scale-110"
            style={{ background: c.bg }}
          >
            <BrandIcon name={c.name} size={24} />
          </a>
        ))}
      </div>

      {/* main toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('contact')}
        aria-expanded={open}
        className="group flex flex-col items-center justify-center gap-0.5 rounded-full bg-amber text-white shadow-[0_8px_24px_rgba(226,104,94,0.45)] transition-all hover:bg-amber-dark active:scale-95 h-16 w-16"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {open ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          )}
        </svg>
        <span className="font-body text-[10px] font-bold leading-none">{t('contact')}</span>
      </button>
    </div>
  );
}
