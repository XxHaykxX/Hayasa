'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Icon } from '@/components/ui/Icon';
import { TourCard } from '@/components/tours/TourCard';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { L, type Tour } from '@/lib/tours';
import { ATTRACTIONS } from '@/lib/attractions';
import { REGIONS, regionByKey } from '@/lib/regions';

// All-locale searchable text for region matching (data may be HY-only).
const regionText = (tour: Tour) =>
  [tour.name, tour.loc, ...tour.stops.flatMap((s) => [s.name, s.desc])]
    .flatMap((o) => [o.hy, o.ru, o.en])
    .join(' ')
    .toLowerCase();

const monthIndex = (ts: number) => {
  const d = new Date(ts);
  return d.getFullYear() * 12 + d.getMonth();
};

export default function ToursClient({ tours }: { tours: Tour[] }) {
  const t = useTranslations('Tours');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [region, setRegion] = useState<string | null>(searchParams.get('region'));
  const [query, setQuery] = useState('');
  const [dateF, setDateF] = useState('all');
  const [lang, setLang] = useState<'all' | 'AM' | 'RU' | 'EN'>('all');
  const [country, setCountry] = useState<'all' | 'am' | 'ge'>('all');
  const [locOpen, setLocOpen] = useState(false);
  const [attraction, setAttraction] = useState('');
  const [attrOpen, setAttrOpen] = useState(false);
  const [attrQuery, setAttrQuery] = useState('');
  const [regOpen, setRegOpen] = useState(false);
  const locRef = useRef<HTMLDivElement>(null);
  const attrRef = useRef<HTMLDivElement>(null);
  const regRef = useRef<HTMLDivElement>(null);

  // Keep the region filter in sync with the URL (clicking another marz on the map).
  useEffect(() => {
    setRegion(searchParams.get('region'));
  }, [searchParams]);

  const reg = regionByKey(region);

  // Close dropdowns when clicking outside them.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(e.target as Node)) setLocOpen(false);
      if (attrRef.current && !attrRef.current.contains(e.target as Node)) setAttrOpen(false);
      if (regRef.current && !regRef.current.contains(e.target as Node)) setRegOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const dateFilters: [string, string][] = [
    ['this', t('thisMonth')],
    ['next', t('nextMonth')],
    ['all', t('all')],
  ];
  const langFilters: ['all' | 'AM' | 'RU' | 'EN', string][] = [
    ['all', '🌐'],
    ['AM', 'HY'],
    ['RU', 'RU'],
    ['EN', 'EN'],
  ];
  const countries: ['all' | 'am' | 'ge', string][] = [
    ['all', t('allCountries')],
    ['am', t('armenia')],
    ['ge', t('georgia')],
  ];

  // Curated top attractions; match by keyword against the tour's text.
  const attrItems = ATTRACTIONS.map((a) => ({ label: L(a.label, locale), kw: L(a.kw, locale).toLowerCase() }));
  const attrQ = attrQuery.trim().toLowerCase();
  const attrList = attrQ ? attrItems.filter((a) => a.label.toLowerCase().includes(attrQ)) : attrItems;
  const attrKw = attrItems.find((a) => a.label === attraction)?.kw ?? '';

  const curMonth = monthIndex(Date.now());
  const q = query.trim().toLowerCase();
  const filtered = tours.filter((tour) => {
    if (q && !`${L(tour.name, locale)} ${L(tour.loc, locale)}`.toLowerCase().includes(q)) return false;
    if (lang !== 'all' && !tour.langs.includes(lang)) return false;
    if (country !== 'all' && tour.country !== country) return false;
    if (attrKw) {
      const txt = `${L(tour.name, locale)} ${L(tour.loc, locale)} ${tour.stops
        .map((s) => `${L(s.name, locale)} ${L(s.desc, locale)}`)
        .join(' ')}`.toLowerCase();
      if (!txt.includes(attrKw)) return false;
    }
    if (reg) {
      if (tour.region) {
        // Exact match once the region is set in admin…
        if (tour.region !== reg.key) return false;
      } else {
        // …falling back to keywords for tours without a region yet.
        const txt = regionText(tour);
        if (!reg.kw.some((k) => k && txt.includes(k))) return false;
      }
    }
    if (dateF === 'this' && monthIndex(tour.target) !== curMonth) return false;
    if (dateF === 'next' && monthIndex(tour.target) !== curMonth + 1) return false;
    return true;
  });

  const countryLabel = countries.find(([k]) => k === country)![1];

  return (
    <Shell>
      <div className="bg-aqua border-b border-edge">
        <Reveal className="mx-auto max-w-[1200px] px-6 py-10" blur={false}>
          <h1 className="font-display text-[42px] font-bold text-navy leading-none mb-2">{t('title')}</h1>
          <p className="font-body text-muted">{t('subtitle', { count: filtered.length })}</p>
        </Reveal>
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
            <div className="relative" ref={regRef}>
              <button
                onClick={() => setRegOpen((o) => !o)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors ${reg ? 'border-navy bg-navy text-white' : 'border-edge bg-white text-navy hover:border-teal'}`}
              >
                {reg ? L(reg.label, locale) : t('region')}
                <Icon name="chevronDown" size={15} color={reg ? '#fff' : '#6A8A88'} />
              </button>
              {regOpen && (
                <div className="absolute z-20 mt-2 w-52 overflow-hidden rounded-xl border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.14)]">
                  <div className="max-h-72 overflow-auto py-1">
                    {reg && (
                      <button
                        onClick={() => {
                          setRegion(null);
                          setRegOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left font-body text-sm text-muted hover:bg-mist"
                      >
                        — {t('all')} —
                      </button>
                    )}
                    {REGIONS.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => {
                          setRegion(r.key);
                          setRegOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left font-body text-sm transition-colors ${region === r.key ? 'bg-aqua font-bold text-teal' : 'text-navy hover:bg-mist'}`}
                      >
                        {L(r.label, locale)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
            <div className="relative" ref={locRef}>
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
            <div className="relative" ref={attrRef}>
              <button
                onClick={() => setAttrOpen((o) => !o)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors ${attraction ? 'border-navy bg-navy text-white' : 'border-edge bg-white text-navy hover:border-teal'}`}
              >
                {attraction || t('attractions')}
                <Icon name="chevronDown" size={15} color={attraction ? '#fff' : '#6A8A88'} />
              </button>
              {attrOpen && (
                <div className="absolute z-20 mt-2 w-72 overflow-hidden rounded-xl border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.14)]">
                  <div className="border-b border-edge p-2">
                    <input
                      value={attrQuery}
                      onChange={(e) => setAttrQuery(e.target.value)}
                      placeholder={t('attractionsSearch')}
                      className="w-full rounded-lg border border-edge px-3 py-2 font-body text-sm text-navy outline-none focus:border-teal"
                    />
                  </div>
                  <div className="max-h-60 overflow-auto py-1">
                    {attraction && (
                      <button
                        onClick={() => {
                          setAttraction('');
                          setAttrOpen(false);
                          setAttrQuery('');
                        }}
                        className="block w-full px-4 py-2 text-left font-body text-sm text-muted hover:bg-mist"
                      >
                        — {t('all')} —
                      </button>
                    )}
                    {attrList.length === 0 ? (
                      <div className="px-4 py-3 font-body text-sm text-muted">—</div>
                    ) : (
                      attrList.map((a) => (
                        <button
                          key={a.label}
                          onClick={() => {
                            setAttraction(a.label);
                            setAttrOpen(false);
                            setAttrQuery('');
                          }}
                          className={`block w-full px-4 py-2 text-left font-body text-sm transition-colors ${attraction === a.label ? 'bg-aqua font-bold text-teal' : 'text-navy hover:bg-mist'}`}
                        >
                          {a.label}
                        </button>
                      ))
                    )}
                  </div>
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
                    className={`rounded-full px-2.5 py-1 font-body text-[13px] font-bold transition-colors ${lang === k ? 'bg-teal text-white' : 'text-muted hover:text-navy'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {filtered.length > 0 ? (
          <Stagger inView={false} className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1" itemClassName="h-full">
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </Stagger>
        ) : (
          <p className="font-body text-muted py-16 text-center">{t('noResults')}</p>
        )}
      </div>
    </Shell>
  );
}
