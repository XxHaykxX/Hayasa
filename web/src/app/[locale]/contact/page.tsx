import { getTranslations } from 'next-intl/server';
import { Shell } from '@/components/layout/Shell';
import { PageHero } from '@/components/layout/PageHero';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { CONTACT } from '@/lib/contact';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('Contact');

  const channels: { icon: IconName; title: string; desc: string; value: string; href: string; bg: string }[] = [
    { icon: 'phone', title: 'WhatsApp', desc: t('whatsappDesc'), value: CONTACT.phoneDisplay, href: CONTACT.whatsapp, bg: '#25D366' },
    { icon: 'send', title: 'Telegram', desc: t('telegramDesc'), value: '@hayasatours', href: CONTACT.telegram, bg: '#0088CC' },
    { icon: 'phone', title: t('phoneTitle'), desc: t('phoneDesc'), value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneDisplay.replace(/\s/g, '')}`, bg: '#1A7A8A' },
    { icon: 'send', title: t('emailTitle'), desc: t('emailDesc'), value: CONTACT.email, href: `mailto:${CONTACT.email}`, bg: '#1A3A5C' },
  ];

  return (
    <Shell>
      <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16 grid gap-8 lg:grid-cols-[1.4fr_1fr] grid-cols-1">
          {/* channels */}
          <div>
            <div className="font-body text-xs font-bold tracking-widest text-teal mb-5">{t('chatTitle')}</div>
            <Stagger className="grid gap-4 sm:grid-cols-2 grid-cols-1" itemClassName="h-full">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group h-full flex items-start gap-4 rounded-2xl border border-edge bg-white p-5 transition-all hover:border-teal hover:shadow-[0_8px_28px_rgba(26,58,92,0.10)]"
                >
                  <span className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: c.bg }}>
                    <Icon name={c.icon} size={20} color="#fff" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold text-navy">{c.title}</span>
                    <span className="block font-body text-xs text-muted mb-1">{c.desc}</span>
                    <span className="block font-body text-sm font-medium text-teal truncate">{c.value}</span>
                  </span>
                </a>
              ))}
            </Stagger>
          </div>

          {/* office + hours */}
          <Reveal direction="left">
            <div className="h-full rounded-2xl bg-aqua border border-edge p-7 flex flex-col gap-7">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="pin" size={18} color="#1A7A8A" />
                  <h2 className="font-display text-xl font-bold text-navy">{t('officeTitle')}</h2>
                </div>
                <p className="font-body text-[15px] text-muted leading-relaxed mb-3">{CONTACT.address}</p>
                <a
                  href={CONTACT.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-bold text-teal hover:text-teal-dark"
                >
                  {t('mapBtn')}
                  <Icon name="arrowRight" size={15} color="currentColor" />
                </a>
              </div>
              <div className="h-px bg-edge" />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="clock" size={18} color="#1A7A8A" />
                  <h2 className="font-display text-xl font-bold text-navy">{t('hoursTitle')}</h2>
                </div>
                <p className="font-body text-[15px] text-muted">{t('hoursWeekdays')}</p>
                <p className="font-body text-[15px] text-muted">{t('hoursSunday')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
