import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Scenery } from '@/components/ui/Scenery';
import { Countdown } from '@/components/ui/Countdown';
import { Btn } from '@/components/ui/Btn';
import { WebMap } from '@/components/tours/WebMap';
import { getTour, langLabel, L } from '@/lib/tours';

export function generateMetadata({ params: { id, locale } }: { params: { locale: string; id: string } }): Metadata {
  const tour = getTour(id);
  const title = L(tour.name, locale);
  const description = L(tour.description, locale).slice(0, 160);
  const path = `/${locale}/tours/${id}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: `/en/tours/${id}`, ru: `/ru/tours/${id}`, hy: `/hy/tours/${id}` },
    },
    openGraph: { type: 'article', title, description, url: path },
  };
}

export default function TourDetailPage({ params: { id, locale } }: { params: { locale: string; id: string } }) {
  const t = useTranslations('Detail');
  const tour = getTour(id);

  return (
    <Shell>
      <div className="mx-auto max-w-[1200px] px-6 py-8 pb-28 lg:pb-8">
        <Link href="/tours" className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-teal mb-6">
          <Icon name="chevronLeft" size={16} color="currentColor" />
          {t('back')}
        </Link>
        <div className="grid lg:grid-cols-[1fr_360px] grid-cols-1 gap-10 items-start">
          {/* left */}
          <div>
            <div className="relative h-[360px] rounded-[14px] overflow-hidden mb-3">
              <Scenery variant={tour.variant} />
            </div>
            <div className="flex gap-3 mb-8">
              {[tour.variant, (tour.variant + 1) % 6, (tour.variant + 2) % 6, (tour.variant + 3) % 6].map((v, i) => (
                <div key={i} className={`relative h-[72px] flex-1 rounded-lg overflow-hidden cursor-pointer ${i === 0 ? 'ring-2 ring-amber' : 'opacity-70 hover:opacity-100'}`}>
                  <Scenery variant={v} sun={false} />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-aqua px-3 py-1 font-body text-xs font-bold text-teal">{L(tour.tag, locale)}</span>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-muted">
                <Icon name="globe" size={14} color="#6A8A88" />
                {langLabel(tour.langs)}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-muted">
                <Icon name="users" size={14} color="#6A8A88" />
                {t('seatsAvailable', { count: tour.seats })}
              </span>
            </div>
            <h1 className="font-display text-[44px] font-bold text-navy leading-[1.05] mb-2">{L(tour.name, locale)}</h1>
            <div className="inline-flex items-center gap-1.5 font-body text-muted mb-6">
              <Icon name="calendar" size={16} color="#1A7A8A" />
              {t('departs', { date: tour.date })}
            </div>
            <p className="font-body text-[15px] text-navy/80 leading-[1.7] mb-10 max-w-[640px]">{L(tour.description, locale)}</p>

            {/* roadmap */}
            <div className="font-body text-xs font-bold tracking-widest text-amber mb-5">{t('route')}</div>
            <div className="mb-10">
              {tour.stops.map((s, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center w-9 flex-none">
                    <div className="w-9 h-9 rounded-full bg-amber text-white flex items-center justify-center font-mono font-bold text-sm shadow-[0_4px_10px_rgba(226,104,94,0.32)] z-10">{i + 1}</div>
                    {i < tour.stops.length - 1 && <div className="w-0.5 flex-1 my-1" style={{ background: 'repeating-linear-gradient(180deg,#1A7A8A 0 6px,transparent 6px 12px)' }} />}
                  </div>
                  <div className={i < tour.stops.length - 1 ? 'pb-7' : 'pb-1'}>
                    <h3 className="font-display text-2xl font-bold text-navy leading-tight mb-1.5">{L(s.name, locale)}</h3>
                    <p className="font-body text-[15px] text-muted leading-relaxed mb-3 max-w-[520px]">{L(s.desc, locale)}</p>
                    <div className="flex gap-2.5">
                      {[0, 1, 2].map((p) => (
                        <div key={p} className="relative w-20 h-14 rounded-lg overflow-hidden">
                          <Scenery variant={(tour.variant + i + p) % 6} sun={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* map */}
            <div className="font-body text-xs font-bold tracking-widest text-amber mb-4">{t('routeMap')}</div>
            <WebMap stops={tour.stops} />
          </div>

          {/* right sticky */}
          <aside className="lg:sticky lg:top-[88px]">
            <div className="rounded-[14px] border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.1)] p-6">
              <h3 className="font-display text-2xl font-bold text-navy leading-tight mb-1">{L(tour.name, locale)}</h3>
              <div className="inline-flex items-center gap-1.5 font-body text-sm text-muted mb-5">
                <Icon name="calendar" size={14} color="#6A8A88" />
                {tour.date}
              </div>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-mono text-3xl font-bold text-navy">{tour.price}</span>
                <span className="font-body text-muted">{t('perPerson')}</span>
              </div>
              <div className="font-body text-[11px] font-bold tracking-widest text-muted mb-2">{t('departsIn')}</div>
              <div className="mb-5">
                <Countdown target={tour.target} size="xl" />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-aqua px-4 py-3 mb-5">
                <span className="font-body text-sm text-muted">{t('seatsRemaining')}</span>
                <span className="font-mono font-bold text-navy">{tour.seats} / {tour.maxSeats}</span>
              </div>
              <Btn variant="amber" size="lg" full icon="arrowRight" href={`/book/${tour.id}`}>
                {t('bookTour')}
              </Btn>
            </div>
          </aside>
        </div>
      </div>

      {/* mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-edge bg-white/95 backdrop-blur px-5 py-3 flex items-center justify-between gap-4 shadow-[0_-6px_20px_rgba(26,58,92,0.1)]">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-xl font-bold text-navy">{tour.price}</span>
          <span className="font-body text-sm text-muted">{t('perPerson')}</span>
        </div>
        <Btn variant="amber" size="md" icon="arrowRight" href={`/book/${tour.id}`}>
          {t('bookTour')}
        </Btn>
      </div>
    </Shell>
  );
}
