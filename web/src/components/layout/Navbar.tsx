'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Btn } from '@/components/ui/Btn';
import { CurrencySwitcher } from '@/components/currency/CurrencySwitcher';
import { getSupabase } from '@/lib/supabase';

const LINKS = [
  { key: 'home', href: '/' },
  { key: 'tours', href: '/tours' },
  { key: 'school', href: '/school-tours' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export function Navbar() {
  const t = useTranslations('Nav');
  const tAuth = useTranslations('Auth');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reflect the auth session so the header shows Sign in / Sign up for guests
  // and an account link once signed in.
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    let active = true;
    const apply = (session: { user?: { user_metadata?: Record<string, string> } } | null) => {
      setSignedIn(!!session);
      const meta = session?.user?.user_metadata ?? {};
      setAvatarUrl(meta.avatar_url || meta.picture || '');
    };
    sb.auth.getSession().then(({ data }) => {
      if (active) apply(data.session);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => apply(session));
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
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
        <div className="hidden md:flex items-center gap-3">
          <CurrencySwitcher />
          {signedIn ? (
            <Link
              href="/profile"
              aria-label={tAuth('welcome')}
              className="grid size-9 place-content-center overflow-hidden rounded-full border border-edge text-navy transition-colors hover:border-teal hover:text-teal"
            >
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              ) : (
                <Icon name="users" size={18} />
              )}
            </Link>
          ) : (
            <>
              <Btn variant="ghost" size="sm" href="/auth">
                {tAuth('signIn')}
              </Btn>
              <Btn variant="teal" size="sm" href="/auth?mode=signup">
                {tAuth('signUp')}
              </Btn>
            </>
          )}
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
          <div className="flex flex-col gap-2 pt-2">
            <CurrencySwitcher full />
            {signedIn ? (
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2.5 rounded-xl border border-edge bg-white px-3 py-2.5 font-body text-sm font-bold text-navy transition-colors hover:border-teal"
              >
                <span className="grid size-7 flex-none place-content-center overflow-hidden rounded-full border border-edge">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  ) : (
                    <Icon name="users" size={15} />
                  )}
                </span>
                {tAuth('welcome')}
              </Link>
            ) : (
              <div className="flex gap-2">
                <Btn variant="outline" size="sm" full href="/auth">
                  {tAuth('signIn')}
                </Btn>
                <Btn variant="teal" size="sm" full href="/auth?mode=signup">
                  {tAuth('signUp')}
                </Btn>
              </div>
            )}
            <Btn variant="amber" size="sm" full href="/tours">
              {t('bookNow')}
            </Btn>
          </div>
        </div>
      )}
    </header>
  );
}
