import { getTranslations } from 'next-intl/server';
import { Shell } from '@/components/layout/Shell';
import { Btn } from '@/components/ui/Btn';
import { Icon, type IconName } from '@/components/ui/Icon';
import { TourCard } from '@/components/tours/TourCard';
import { GlowCard } from '@/components/ui/spotlight-card';
import { HeroSection } from '@/components/blocks/hero-section-5';
import { getPublicTours } from '@/lib/db';
import { getContact } from '@/lib/site-content-data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const t = await getTranslations('Home');
  const tours = await getPublicTours();
  const CONTACT = await getContact();
  const features: [IconName, string, string][] = [
    ['users', t('f1Title'), t('f1Body')],
    ['languages', t('f2Title'), t('f2Body')],
    ['award', t('f3Title'), t('f3Body')],
  ];

  return (
    <Shell>
      {/* hero */}
      <HeroSection />

      {/* upcoming tours */}
      <section className="bg-aqua">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="flex items-end justify-between mb-9">
            <div>
              <div className="font-body text-xs font-bold tracking-widest text-teal mb-2">{t('departingSoon')}</div>
              <h2 className="font-display text-[38px] font-bold text-navy leading-none">{t('upcomingTours')}</h2>
            </div>
            <Btn variant="outline" size="sm" icon="arrowRight" href="/tours">
              {t('allTours')}
            </Btn>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {tours.slice(0, 3).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* why hayasa */}
      <section className="bg-navy">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="text-center mb-12">
            <div className="font-body text-xs font-bold tracking-widest text-white/50 mb-2">{t('whyKicker')}</div>
            <h2 className="font-display text-[38px] font-bold text-white leading-none">{t('whyTitle')}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 grid-cols-1">
            {features.map(([ic, title, desc]) => (
              <GlowCard key={title} glowColor="teal" customSize className="h-full p-7 text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-5 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Icon name={ic} size={26} color="#7FD4CE" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{title}</h3>
                  <p className="font-body text-[15px] text-white/70 leading-relaxed">{desc}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* about */}
      <section id="about" className="bg-aqua scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-6 py-16 grid gap-10 md:grid-cols-2 grid-cols-1 items-center">
          <div>
            <div className="font-body text-xs font-bold tracking-widest text-teal mb-2">{t('aboutKicker')}</div>
            <h2 className="font-display text-[38px] font-bold text-navy leading-tight mb-4">{t('aboutTitle')}</h2>
            <p className="font-body text-[15px] text-muted leading-relaxed">{t('aboutBody')}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[['2 500+', t('stat1Label')], ['60+', t('stat2Label')], ['8', t('stat3Label')]].map(([num, label]) => (
              <div key={label} className="rounded-2xl bg-white border border-edge px-3 py-6 text-center">
                <div className="font-display text-3xl font-bold text-teal mb-1">{num}</div>
                <div className="font-body text-xs text-muted leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="bg-white scroll-mt-20">
        <div className="mx-auto max-w-[760px] px-6 py-16 text-center">
          <div className="font-body text-xs font-bold tracking-widest text-teal mb-2">{t('contactKicker')}</div>
          <h2 className="font-display text-[38px] font-bold text-navy leading-tight mb-3">{t('contactTitle')}</h2>
          <p className="font-body text-[15px] text-muted leading-relaxed mb-7 max-w-[520px] mx-auto">{t('contactBody')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white" style={{ background: '#25D366' }}>
              <Icon name="phone" size={16} color="#fff" />WhatsApp
            </a>
            <a href={CONTACT.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white" style={{ background: '#0088CC' }}>
              <Icon name="send" size={15} color="#fff" />Telegram
            </a>
          </div>
          <a href={`mailto:${CONTACT.email}`} className="font-body text-sm text-muted hover:text-teal">
            {t('emailLabel')}: <span className="font-medium text-navy">{CONTACT.email}</span>
          </a>
        </div>
      </section>
    </Shell>
  );
}
