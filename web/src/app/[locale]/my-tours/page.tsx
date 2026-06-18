'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Scenery } from '@/components/ui/Scenery';
import { Countdown } from '@/components/ui/Countdown';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { L } from '@/lib/tours';
import { getMyBookings, type MyBooking } from '@/lib/my-bookings';

export default function MyToursPage() {
  const t = useTranslations('MyTours');
  const locale = useLocale();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);
  const [all, setAll] = useState<MyBooking[]>([]);

  useEffect(() => {
    let active = true;
    getMyBookings().then((res) => {
      if (!active) return;
      if (res === null) setAuthed(false);
      else setAll(res);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const tabs: ['upcoming' | 'past', string][] = [
    ['upcoming', t('upcoming')],
    ['past', t('past')],
  ];
  const bookings = all.filter((b) => b.when === tab);

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
        {loading && <p className="font-body text-muted py-12 text-center">…</p>}

        {!loading && !authed && (
          <div className="py-12 text-center">
            <p className="font-body text-muted mb-4">{t('empty')}</p>
            <Link href="/auth" className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 font-body text-sm font-bold text-white">
              <Icon name="arrowRight" size={16} color="#fff" />
              {t('title')}
            </Link>
          </div>
        )}

        {!loading && authed && bookings.length === 0 && (
          <p className="font-body text-muted py-12 text-center">{t('empty')}</p>
        )}

        {!loading &&
          authed &&
          bookings.map((b) => (
            <div key={b.bookingId} className="flex gap-5 bg-white rounded-[14px] border border-edge overflow-hidden hover:shadow-[0_12px_30px_rgba(26,58,92,0.1)] transition-shadow">
              <div className="relative w-[200px] flex-none">
                {b.cover ? (
                  <Image src={b.cover} alt="" fill sizes="200px" className="object-cover" />
                ) : (
                  <Scenery variant={b.variant} />
                )}
              </div>
              <div className="flex-1 py-5 pr-6 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display text-2xl font-bold text-navy leading-tight truncate min-w-0">{L(b.name, locale)}</h3>
                  <StatusBadge status={b.status} />
                </div>
                <div className="flex items-center gap-5 text-muted mb-4">
                  <span className="inline-flex items-center gap-1.5 font-body text-sm">
                    <Icon name="calendar" size={14} color="#6A8A88" />
                    {b.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm">
                    <Icon name="pin" size={14} color="#6A8A88" />
                    {L(b.loc, locale)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Countdown target={b.target} size="sm" />
                  {b.tourId && (
                    <Link href={`/tours/${b.tourId}`} className="inline-flex items-center gap-1 font-body text-sm font-bold text-teal hover:gap-2 transition-all">
                      {t('viewDetails')}
                      <Icon name="chevronRight" size={15} color="#1A7A8A" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Shell>
  );
}
