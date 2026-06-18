'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Icon } from '@/components/ui/Icon';
import { TourCard } from '@/components/tours/TourCard';
import { TOURS, L } from '@/lib/tours';

const monthIndex = (ts: number) => {
  const d = new Date(ts);
  return d.getFullYear() * 12 + d.getMonth();
};

export default function ToursPage() {
  const t = useTranslations('Tours');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [dateF, setDateF] = useState('all');
  const [lang, setLang] = useState<'all' | 'AM' | 'RU' | 'EN'>('all');
  const [country, setCountry] = useState<'all' | 'am' | 'ge'>('all');
  const [locOpen, setLocOpen] = useState(false);

  const dateFilters: [string, string][] = [
    ['this', t('thisMonth')],
    ['next', t('nextMonth')],
    ['all', t('all')],
  ];
  const langFilters: ['all' | 'AM' | 'RU' | 'EN', string][] = [
    ['all', '🌐'],
    ['AM', '🇦🇲'],
    ['RU', '🇷🇺'],
    ['EN', '🇬🇧'],
  ];
  const countries: ['all' | 'am' | 'ge', string][] = [
    ['all', t('allCountries')],
    ['am', t('armenia')],
    ['ge', t('georgia')],
  ];

  const curMonth = monthIndex(Date.now());
  const q = query.trim().toLowerCase();
  const filtered = TOURS.filter((tour) => {
    if (q && !`${L(tour.name, locale)} ${L(tour.loc, locale)}`.toLowerCase().includes(q)) return false;
    if (lang !== 'all' && !tour.langs.includes(lang)) return false;
    if (country !== 'all' && tour.country !== country) return false;
    if (dateF === 'this' && monthIndex(tour.target) !== curMonth) return false;
    if (dateF === 'next' && monthIndex(tour.target) !== curMonth + 1) return false;
    return true;
  });

  const countryLabel = countries.find(([k]) => k === country)![1];

  return (
    <Shell>
      <div className="bg-aqua border-b border-edge">
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <h1 className="font-display text-[42px] font-bold text-navy leading-none mb-2">{t('title')}</h1>
          <p className="font-body text-muted">{t('subtitle', { count: filtered.length })}</p>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex flex-col gap-4 mb-9">
          <div className="relative max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <Icon name="search" size={18} color="#6A8A88" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-xl border border-edge bg-white pl-11 pr-4 py-3 font-body text-[15px] text-navy outline-none focus:border-teal"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              {dateFilters.map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setDateF(k)}
                  className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${dateF === k ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative">
              <button
                onClick={() => setLocOpen((o) => !o)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors ${country !== 'all' ? 'bg-navy text-white border-navy' : 'bg-white border-edge text-navy hover:border-teal'}`}
              >
                {country === 'all' ? t('location') : countryLabel}
                <Icon name="chevronDown" size={15} color={country !== 'all' ? '#fff' : '#6A8A88'} />
              </button>
              {locOpen && (
                <div className="absolute z-20 mt-2 w-44 rounded-xl border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.14)] overflow-hidden">
                  {countries.map(([k, label]) => (
                    <button
                      key={k}
                      onClick={() => {
                        setCountry(k);
                        setLocOpen(false);
                      }}
                      className={`block w-full px-4 py-2.5 text-left font-body text-sm transition-colors ${country === k ? 'bg-aqua text-teal font-bold' : 'text-navy hover:bg-mist'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="font-body text-sm text-muted">{t('guideLanguage')}</span>
              <div className="inline-flex items-center gap-1 rounded-full bg-white border border-edge px-3 py-1.5">
                {langFilters.map(([k, f]) => (
                  <button
                    key={k}
                    onClick={() => setLang(k)}
                    aria-label={k}
                    className={`px-1.5 text-base rounded-full transition-all ${lang === k ? 'scale-110' : 'opacity-45 hover:opacity-90'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {filtered.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <p className="font-body text-muted py-16 text-center">{t('noResults')}</p>
        )}
      </div>
    </Shell>
  );
}
