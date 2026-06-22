import { getTranslations } from 'next-intl/server';
import { Shell } from '@/components/layout/Shell';
import { PageHero } from '@/components/layout/PageHero';
import { Btn } from '@/components/ui/Btn';
import { Icon, type IconName } from '@/components/ui/Icon';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { CountUp } from '@/components/motion/CountUp';
import { TEAM } from '@/lib/team';
import { L } from '@/lib/tours';

const ACCENT: Record<string, string> = {
  teal: '#1A7A8A',
  amber: '#E2685E',
  navy: '#1A3A5C',
  success: '#2A9D6A',
};

const initials = (name: string) =>
  name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'About' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('About');
  const tt = await getTranslations('Team');

  const stats: [number, string, string][] = [
    [2500, '+', t('stat1')],
    [60, '+', t('stat2')],
    [8, '', t('stat3')],
  ];
  const values: [IconName, string, string][] = [
    ['users', t('v1Title'), t('v1Body')],
    ['languages', t('v2Title'), t('v2Body')],
    ['award', t('v3Title'), t('v3Body')],
  ];

  return (
    <Shell>
      <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />

      {/* story + stats */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16 grid gap-12 md:grid-cols-2 grid-cols-1 items-center">
          <Reveal direction="right">
            <div className="font-body text-xs font-bold tracking-widest text-teal mb-2">{t('storyKicker')}</div>
            <h2 className="font-display text-[32px] font-bold text-navy leading-tight mb-4">{t('storyTitle')}</h2>
            <p className="font-body text-[15px] text-muted leading-relaxed mb-4">{t('storyBody1')}</p>
            <p className="font-body text-[15px] text-muted leading-relaxed">{t('storyBody2')}</p>
          </Reveal>
          <Stagger className="grid grid-cols-3 gap-4" itemClassName="h-full">
            {stats.map(([value, suffix, label]) => (
              <div key={label} className="h-full rounded-2xl bg-aqua border border-edge px-3 py-7 text-center">
                <div className="font-display text-3xl font-bold text-teal mb-1">
                  <CountUp value={value} suffix={suffix} />
                </div>
                <div className="font-body text-xs text-muted leading-snug">{label}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* values */}
      <section className="bg-navy">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <Reveal className="text-center mb-12">
            <div className="font-body text-xs font-bold tracking-widest text-white/50 mb-2">{t('valuesKicker')}</div>
            <h2 className="font-display text-[32px] font-bold text-white leading-tight">{t('valuesTitle')}</h2>
          </Reveal>
          <Stagger className="grid gap-8 md:grid-cols-3 grid-cols-1" itemClassName="h-full">
            {values.map(([ic, title, desc]) => (
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
          </Stagger>
        </div>
      </section>

      {/* team */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <Reveal className="text-center mb-12">
            <div className="font-body text-xs font-bold tracking-widest text-teal mb-2">{tt('kicker')}</div>
            <h2 className="font-display text-[32px] font-bold text-navy leading-tight">{tt('title')}</h2>
            <p className="font-body text-[15px] text-muted leading-relaxed mt-3 max-w-[480px] mx-auto">{tt('subtitle')}</p>
          </Reveal>
          <Stagger className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1" itemClassName="h-full">
            {TEAM.map((m) => {
              const name = L(m.name, locale);
              return (
                <div
                  key={m.id}
                  className="h-full rounded-2xl border border-edge bg-white p-6 text-center transition-all hover:border-teal hover:shadow-[0_8px_28px_rgba(26,58,92,0.10)]"
                >
                  <div
                    className="mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center font-display text-2xl font-bold text-white"
                    style={{ background: ACCENT[m.accent] }}
                    aria-hidden
                  >
                    {initials(name)}
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">{name}</h3>
                  <p className="font-body text-sm text-teal font-medium mb-3">{L(m.role, locale)}</p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {m.langs.map((lng) => (
                      <span key={lng} className="rounded-full bg-aqua border border-edge px-2.5 py-0.5 font-body text-[11px] font-bold tracking-wide text-muted">
                        {lng}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* cta */}
      <section className="bg-aqua">
        <Reveal className="mx-auto max-w-[760px] px-6 py-16 text-center">
          <h2 className="font-display text-[32px] font-bold text-navy leading-tight mb-3">{t('ctaTitle')}</h2>
          <p className="font-body text-[15px] text-muted leading-relaxed mb-7 max-w-[480px] mx-auto">{t('ctaBody')}</p>
          <Btn variant="amber" size="lg" icon="arrowRight" href="/tours">
            {t('ctaBtn')}
          </Btn>
        </Reveal>
      </section>
    </Shell>
  );
}
