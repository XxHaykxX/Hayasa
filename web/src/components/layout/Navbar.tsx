'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Btn } from '@/components/ui/Btn';
import { LangSwitcher } from '@/components/ui/LangSwitcher';

const LINKS = [
  { key: 'home', href: '/' },
  { key: 'tours', href: '/tours' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export function Navbar() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/90 border-b border-edge shadow-[0_4px_24px_rgba(26,58,92,0.08)]'
          : 'bg-white/40 border-b border-white/20'
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 h-[68px] flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-navy tracking-tight whitespace-nowrap">
          HAYASA <span className="text-teal">TOURS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={`font-body text-[15px] font-medium transition-colors ${isActive(l.href) ? 'text-teal' : 'text-navy hover:text-teal'}`}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher />
          <Btn variant="amber" size="sm" href="/tours">
            {t('bookNow')}
          </Btn>
        </div>
        <button className="md:hidden text-navy" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <Icon name={open ? 'x' : 'menu'} size={24} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-edge bg-white/95 backdrop-blur px-6 py-4 flex flex-col gap-3">
          {LINKS.map((l) => (
            <Link key={l.key} href={l.href} onClick={() => setOpen(false)} className="text-left font-body text-navy font-medium py-1">
              {t(l.key)}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2">
            <LangSwitcher />
            <Btn variant="amber" size="sm" href="/tours">
              {t('bookNow')}
            </Btn>
          </div>
        </div>
      )}
    </header>
  );
}
