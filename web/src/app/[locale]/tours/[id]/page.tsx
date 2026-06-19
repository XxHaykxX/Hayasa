import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Shell } from '@/components/layout/Shell';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Countdown } from '@/components/ui/Countdown';
import { Btn } from '@/components/ui/Btn';
import { WebMap } from '@/components/tours/WebMap';
import { TourGallery } from '@/components/tours/TourGallery';
import { StopGallery } from '@/components/tours/StopGallery';
import { SceneryGallery } from '@/components/tours/SceneryGallery';
import { Reveal } from '@/components/motion/Reveal';
import { langLabel, L } from '@/lib/tours';
import { getPublicTour } from '@/lib/db';
import { JsonLd } from '@/components/seo/JsonLd';
import { tourSchema, breadcrumbSchema, faqSchema, tourFaqItems } from '@/lib/schema';
import { SITE_URL, OG_IMAGE, altLanguages, clampDescription } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata({
  params: { id, locale },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const tour = await getPublicTour(id, locale);
  if (!tour) return {};
  const title = L(tour.name, locale);
  const description = clampDescription(L(tour.description, locale));
  const path = `/${locale}/tours/${id}`;
  const image = tour.cover || OG_IMAGE;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: altLanguages(`/tours/${id}`),
    },
    openGraph: { type: 'article', title: `${title} — Hayasa Tours`, description, url: path, images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title: `${title} — Hayasa Tours`, description, images: [image] },
  };
}

export default async function TourDetailPage({ params: { id, locale } }: { params: { locale: string; id: string } }) {
  const t = await getTranslations('Detail');
  const tour = await getPublicTour(id, locale);
  if (!tour) notFound();

  // Real photos when present (cover + stop photos), else fall back to Scenery art.
  const gallery = Array.from(
    new Set([tour.cover, ...(tour.photos ?? []), ...tour.stops.flatMap((s) => s.photos ?? [])].filter(Boolean)),
  ) as string[];

  const lc = locale as 'en' | 'ru' | 'hy';
  const inc = tour.inclusions?.[lc] ?? tour.inclusions?.en ?? [];
  const exc = tour.exclusions?.[lc] ?? tour.exclusions?.en ?? [];

  const toursLabel = { en: 'Tours', ru: 'Туры', hy: 'Տուրեր' }[locale as 'en' | 'ru' | 'hy'] ?? 'Tours';
  const breadcrumb = breadcrumbSchema([
    { name: 'Hayasa Tours', url: `${SITE_URL}/${locale}` },
    { name: toursLabel, url: `${SITE_URL}/${locale}/tours` },
    { name: L(tour.name, locale), url: `${SITE_URL}/${locale}/tours/${tour.id}` },
  ]);
  const faqItems = tourFaqItems(tour, locale);
  const faqLabel = { en: 'Frequently asked questions', ru: 'Частые вопросы', hy: 'Հաճախ տրվող հարցեր' }[locale as 'en' | 'ru' | 'hy'] ?? 'FAQ';

  return (
    <Shell>
      <JsonLd data={[tourSchema(tour, locale), breadcrumb, faqSchema(faqItems)]} />
      <div className="mx-auto max-w-[1200px] px-6 py-8 pb-28 lg:pb-8">
        <Link href="/tours" className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-teal mb-6">
          <Icon name="chevronLeft" size={16} color="currentColor" />
          {t('back')}
        </Link>
        <div className="grid lg:grid-cols-[1fr_360px] grid-cols-1 gap-10 items-start">
          {/* left */}
          <div>
            {gallery.length > 0 ? (
              <Reveal blur={false} direction="none">
                <TourGallery images={gallery} alt={L(tour.name, locale)} />
              </Reveal>
            ) : (
              <SceneryGallery variant={tour.variant} size="hero" />
            )}

            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-aqua px-3 py-1 font-body text-xs font-bold text-teal">{L(tour.tag, locale)}</span>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-muted">
                <Icon name="globe" size={14} color="#6A8A88" />
                {langLabel(tour.langs)}
              </span>
            </div>
            <h1 className="font-display text-[44px] font-bold text-navy leading-[1.05] mb-2">{L(tour.name, locale)}</h1>
            <div className="inline-flex items-center gap-1.5 font-body text-muted mb-6">
              <Icon name="calendar" size={16} color="#1A7A8A" />
              {t('departs', { date: tour.date })}
            </div>
            <p className="font-body text-[15px] text-navy/80 leading-[1.7] mb-10 max-w-[640px]">{L(tour.description, locale)}</p>

            {/* roadmap */}
            <Reveal>
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
                    {s.duration && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                        <span className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted">
                          <Icon name="clock" size={13} color="#6A8A88" />
                          {s.duration}
                        </span>
                      </div>
                    )}
                    <p className="font-body text-[15px] text-muted leading-relaxed mb-3 max-w-[520px]">{L(s.desc, locale)}</p>
                    {s.photos && s.photos.length > 0 ? (
                      <StopGallery photos={s.photos} alt={L(s.name, locale)} />
                    ) : (
                      <SceneryGallery variant={tour.variant + i} size="stop" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            </Reveal>

            {/* map */}
            <Reveal>
            <div className="font-body text-xs font-bold tracking-widest text-amber mb-4">{t('routeMap')}</div>
            <WebMap stops={tour.stops} route={tour.routePath} />
            </Reveal>

            {/* FAQ */}
            <Reveal>
            <div className="font-body text-xs font-bold tracking-widest text-amber mt-12 mb-4">{faqLabel}</div>
            <div className="space-y-3">
              {faqItems.map((f, i) => (
                <details key={i} className="group rounded-xl border border-edge bg-white p-4">
                  <summary className="cursor-pointer list-none font-body font-bold text-navy flex items-center justify-between gap-4">
                    {f.q}
                    <Icon name="chevronDown" size={18} color="#6A8A88" />
                  </summary>
                  <p className="mt-3 font-body text-[15px] text-muted leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
            </Reveal>

            {/* inclusions / exclusions */}
            {(inc.length > 0 || exc.length > 0) && (
              <Reveal className="mt-12 grid gap-8 sm:grid-cols-2">
                {inc.length > 0 && (
                  <div>
                    <div className="font-body text-xs font-bold tracking-widest text-amber mb-4">{t('included')}</div>
                    <ul className="space-y-2.5">
                      {inc.map((x, i) => (
                        <li key={i} className="flex items-start gap-2.5 font-body text-[15px] text-navy/80">
                          <span className="mt-0.5 flex-none">
                            <Icon name="check" size={18} color="#1A7A8A" />
                          </span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {exc.length > 0 && (
                  <div>
                    <div className="font-body text-xs font-bold tracking-widest text-amber mb-4">{t('excluded')}</div>
                    <ul className="space-y-2.5">
                      {exc.map((x, i) => (
                        <li key={i} className="flex items-start gap-2.5 font-body text-[15px] text-navy/80">
                          <span className="mt-0.5 flex-none">
                            <Icon name="x" size={18} color="#C0564B" />
                          </span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            )}
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
