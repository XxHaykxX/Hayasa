import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { CONTACT } from '@/lib/contact';

export function Footer() {
  const t = useTranslations('Footer');
  const links: { href: string; label: string }[] = [
    { href: '/tours', label: t('allTours') },
    { href: '/#about', label: t('aboutUs') },
    { href: '/#contact', label: t('contact') },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr] sm:grid-cols-2 grid-cols-1">
        <div>
          <div className="font-display text-2xl font-bold mb-3">HAYASA TOURS</div>
          <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">{t('tagline')}</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="font-body text-xs font-bold tracking-widest text-white/40 mb-1">{t('explore')}</div>
          {links.map((l, i) => (
            <Link key={i} href={l.href} className="text-left font-body text-sm text-white/75 hover:text-yellow transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-body text-xs font-bold tracking-widest text-white/40 mb-1">{t('getInTouch')}</div>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-bold text-white" style={{ background: '#25D366' }}>
            <Icon name="phone" size={16} color="#fff" />WhatsApp
          </a>
          <a href={CONTACT.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-bold text-white" style={{ background: '#0088CC' }}>
            <Icon name="send" size={15} color="#fff" />Telegram
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-6 py-5 flex flex-wrap items-center justify-between gap-2 font-body text-xs text-white/40">
          <span>{t('rights')}</span>
          <Link href="/privacy" className="text-white/60 hover:text-yellow transition-colors">
            {t('privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
