'use client';

import type { MouseEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Scenery } from '@/components/ui/Scenery';
import { Countdown } from '@/components/ui/Countdown';
import { L, type Tour } from '@/lib/tours';

export function TourCard({ tour }: { tour: Tour }) {
  const t = useTranslations('Tours');
  const locale = useLocale();

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
      className="spotlight-card group block cursor-pointer bg-white rounded-[14px] border border-edge overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,58,92,0.13)]"
    >
      <div className="relative z-[2] h-[180px]">
        {tour.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tour.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <Scenery variant={tour.variant} />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 font-body text-[11px] font-bold text-navy">{L(tour.tag, locale)}</span>
        <span className="absolute top-3 right-3 rounded-full px-3 py-1 font-body text-[11px] font-bold text-navy" style={{ background: '#FFE20B' }}>
          {t('seatsLeft', { count: tour.seats })}
        </span>
      </div>
      <div className="relative z-[2] p-5">
        <div className="flex items-center gap-1.5 text-muted mb-1.5">
          <Icon name="pin" size={12} color="#1A7A8A" />
          <span className="font-body text-xs font-medium">{L(tour.loc, locale)}</span>
        </div>
        <h3 className="font-display text-[22px] font-bold text-navy leading-tight mb-3 group-hover:text-teal transition-colors">{L(tour.name, locale)}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-muted">
            <Icon name="calendar" size={13} color="#6A8A88" />
            {tour.date}
          </span>
          <Countdown target={tour.target} size="sm" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-edge">
          <div>
            <span className="font-mono text-lg font-bold text-navy">{tour.price}</span>
            <span className="font-body text-sm text-muted"> ֏</span>
          </div>
          <span className="inline-flex items-center justify-center gap-2 rounded-xl font-body font-bold transition-all px-4 py-2 text-sm bg-amber text-white group-hover:bg-amber-dark shadow-[0_6px_16px_rgba(226,104,94,0.30)]">
            {t('viewTour')}
            <Icon name="arrowRight" size={18} color="currentColor" />
          </span>
        </div>
      </div>
    </Link>
  );
}
