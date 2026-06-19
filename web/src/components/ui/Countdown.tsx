'use client';

import { Fragment, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

function useCountdown(target: number) {
  // null until mounted → server and first client render match (no hydration mismatch).
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  if (now === null) return { d: '--', h: '--', m: '--', s: '--' };

  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const d = Math.floor(diff / 86400);
  diff -= d * 86400;
  const h = Math.floor(diff / 3600);
  diff -= h * 3600;
  const m = Math.floor(diff / 60);
  const s = diff - m * 60;
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
}

export function Countdown({ target, size = 'xl' }: { target: number; size?: 'xl' | 'sm' }) {
  const t = useCountdown(target);
  const tr = useTranslations('Countdown');
  const units: [string, string][] = [
    [t.d, tr('days')],
    [t.h, tr('hrs')],
    [t.m, tr('min')],
    [t.s, tr('sec')],
  ];

  if (size === 'sm') {
    return (
      <div className="flex items-center gap-1.5">
        {units.map(([val, label], i) => (
          <Fragment key={label}>
            <div className="flex flex-col items-center">
              <span className="font-mono font-bold text-amber text-[15px] leading-none">{val}</span>
              <span className="font-body text-[7px] font-bold tracking-wider text-muted mt-0.5">{label}</span>
            </div>
            {i < 3 && <span className="font-mono font-bold text-amber/40 text-[13px] leading-none">:</span>}
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="inline-flex items-stretch gap-2 rounded-xl bg-navy px-4 py-3">
      {units.map(([val, label], i) => (
        <Fragment key={label}>
          <div className="flex flex-col items-center min-w-[44px]">
            <span className="font-mono font-bold text-yellow text-[34px] leading-none" style={{ textShadow: '0 0 16px rgba(255,226,11,0.4)' }}>{val}</span>
            <span className="font-body text-[9px] font-bold tracking-[0.15em] text-white/55 mt-1.5">{label}</span>
          </div>
          {i < 3 && <span className="font-mono font-bold text-yellow/40 text-[28px] leading-none self-start mt-0.5">:</span>}
        </Fragment>
      ))}
    </div>
  );
}
