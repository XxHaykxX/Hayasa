'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Scenery } from '@/components/ui/Scenery';
import { Countdown } from '@/components/ui/Countdown';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getTour, MY_BOOKINGS, L } from '@/lib/tours';

export default function MyToursPage() {
  const t = useTranslations('MyTours');
  const locale = useLocale();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const tabs: ['upcoming' | 'past', string][] = [
    ['upcoming', t('upcoming')],
    ['past', t('past')],
  ];
  const bookings = MY_BOOKINGS.filter((b) => b.when === tab);

  return (
    <Shell>
      <div className="bg-aqua border-b border-edge">
        <div className="mx-auto max-w-[1100px] px-6 py-10">
          <h1 className="font-display text-[42px] font-bold text-navy leading-none mb-5">{t('title')}</h1>
          <div className="flex gap-2">
            {tabs.map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-full px-5 py-2 font-body text-sm font-bold transition-colors ${tab === k ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] px-6 py-8 grid gap-5">
        {bookings.length === 0 && <p className="font-body text-muted py-12 text-center">{t('empty')}</p>}
        {bookings.map(({ id, status }) => {
          const tour = getTour(id);
          return (
            <div key={id} className="flex gap-5 bg-white rounded-[14px] border border-edge overflow-hidden hover:shadow-[0_12px_30px_rgba(26,58,92,0.1)] transition-shadow">
              <div className="relative w-[200px] flex-none">
                <Scenery variant={tour.variant} />
              </div>
              <div className="flex-1 py-5 pr-6 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display text-2xl font-bold text-navy leading-tight truncate min-w-0">{L(tour.name, locale)}</h3>
                  <StatusBadge status={status} />
                </div>
                <div className="flex items-center gap-5 text-muted mb-4">
                  <span className="inline-flex items-center gap-1.5 font-body text-sm">
                    <Icon name="calendar" size={14} color="#6A8A88" />
                    {tour.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm">
                    <Icon name="pin" size={14} color="#6A8A88" />
                    {L(tour.loc, locale)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Countdown target={tour.target} size="sm" />
                  <Link href={`/tours/${id}`} className="inline-flex items-center gap-1 font-body text-sm font-bold text-teal hover:gap-2 transition-all">
                    {t('viewDetails')}
                    <Icon name="chevronRight" size={15} color="#1A7A8A" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
