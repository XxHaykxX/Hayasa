'use client';

import { useState, type MouseEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Scenery } from '@/components/ui/Scenery';
import { Countdown } from '@/components/ui/Countdown';
import { L, pickList, type Tour } from '@/lib/tours';
import { Price } from '@/components/currency/Price';

// In-card photo carousel. Lives inside the card <Link>, so its controls call
// preventDefault to avoid navigating when you page through photos.
function CardMedia({ images, alt, variant }: { images: string[]; alt: string; variant: number }) {
  const [i, setI] = useState(0);
  const usingPhotos = images.length > 0;
  // No real photos yet → slide through a few Scenery art variants so the
  // carousel is still visible. Real uploaded photos take over automatically.
  const sceneryVariants = [variant % 6, (variant + 2) % 6, (variant + 4) % 6];
  const n = usingPhotos ? images.length : sceneryVariants.length;

  const block = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const go = (e: MouseEvent, d: number) => {
    block(e);
    setI((p) => (p + d + n) % n);
  };

  return (
    <>
      {usingPhotos ? (
        images.map((src, idx) => (
          // Stacked + opacity-cross-faded for instant switching; plain <img>
          // straight off the CDN (photos are already optimized 16:10 WebP).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={idx}
            src={src}
            alt={idx === i ? alt : ''}
            aria-hidden={idx !== i}
            loading="lazy"
            draggable={false}
            className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-300 ${
              idx === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))
      ) : (
        <Scenery variant={sceneryVariants[i]} />
      )}
      {n > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => go(e, -1)}
            aria-label="Предыдущее фото"
            className="absolute left-2 top-1/2 z-[4] flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 opacity-0 shadow backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100 max-md:opacity-100"
          >
            <Icon name="chevronLeft" size={15} color="#1A3A5C" />
          </button>
          <button
            type="button"
            onClick={(e) => go(e, 1)}
            aria-label="Следующее фото"
            className="absolute right-2 top-1/2 z-[4] flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 opacity-0 shadow backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100 max-md:opacity-100"
          >
            <Icon name="chevronRight" size={15} color="#1A3A5C" />
          </button>
          <div className="absolute bottom-2.5 left-1/2 z-[4] flex -translate-x-1/2 gap-1">
            {images.map((_, d) => (
              <button
                key={d}
                type="button"
                onClick={(e) => {
                  block(e);
                  setI(d);
                }}
                aria-label={`Фото ${d + 1}`}
                className={`h-1.5 rounded-full transition-all ${d === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export function TourCard({ tour }: { tour: Tour }) {
  const t = useTranslations('Tours');
  const locale = useLocale();

  const lc = locale as 'en' | 'ru' | 'hy';
  const images = Array.from(
    new Set([tour.cover, ...(tour.photos ?? []), ...tour.stops.flatMap((s) => s.photos ?? [])].filter(Boolean)),
  ) as string[];
  const inc = pickList(tour.inclusions, lc).slice(0, 4);
  const exc = pickList(tour.exclusions, lc).slice(0, 2);

  const days = tour.durationDays ?? 1;
  const nights = tour.durationNights ?? 0;
  const durationLabel = nights > 0 ? `${t('days', { count: days })} / ${t('nights', { count: nights })}` : t('days', { count: days });

  // Pointer position for the spotlight glow only (no tilt).
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Link
      href={`/tours/${tour.id}`}
      onMouseMove={onMove}
      className="spotlight-card group flex h-full cursor-pointer flex-col overflow-hidden rounded-[14px] border border-edge bg-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,58,92,0.13)] motion-reduce:transition-none"
    >
      <div className="relative z-[2] h-[180px]">
        <CardMedia images={images} alt={L(tour.name, locale)} variant={tour.variant} />
        <span className="absolute top-3 left-3 z-[3] rounded-full bg-white/90 px-3 py-1 font-body text-[11px] font-bold text-navy backdrop-blur">
          {durationLabel}
        </span>
      </div>
      <div className="relative z-[2] flex flex-1 flex-col p-5">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-muted">
            <Icon name="pin" size={12} color="#1A7A8A" />
            <span className="font-body text-xs font-medium">{L(tour.loc, locale)}</span>
          </div>
          <span className="flex-none rounded-full bg-aqua px-2.5 py-0.5 font-body text-[10px] font-bold text-teal">{L(tour.tag, locale)}</span>
        </div>
        <h3 className="mb-3 font-display text-[22px] font-bold leading-tight text-navy transition-colors group-hover:text-teal">{L(tour.name, locale)}</h3>
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-muted">
            <Icon name="calendar" size={13} color="#6A8A88" />
            {tour.date}
          </span>
          <Countdown target={tour.target} size="sm" />
        </div>
        {(inc.length > 0 || exc.length > 0) && (
          <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1.5">
            {inc.map((x, k) => (
              <span key={`i${k}`} className="inline-flex items-center gap-1 font-body text-[11px] text-navy/70">
                <Icon name="check" size={12} color="#1A7A8A" />
                {x}
              </span>
            ))}
            {exc.map((x, k) => (
              <span key={`e${k}`} className="inline-flex items-center gap-1 font-body text-[11px] text-navy/45">
                <Icon name="x" size={12} color="#C0564B" />
                {x}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-edge pt-4">
          <div>
            <Price amd={tour.priceAmd} className="font-mono text-lg font-bold text-navy" />
          </div>
          <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-4 py-2 font-body text-sm font-bold text-white shadow-[0_6px_16px_rgba(226,104,94,0.30)] transition-all group-hover:bg-amber-dark">
            {t('viewTour')}
            <Icon name="arrowRight" size={18} color="currentColor" />
          </span>
        </div>
      </div>
    </Link>
  );
}
