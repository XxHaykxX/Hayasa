'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { CURRENCIES, CURRENCY_META } from '@/lib/currency';
import { useCurrency } from './CurrencyProvider';

// Compact currency dropdown for the header. `full` makes it a full-width block
// for the mobile menu.
export function CurrencySwitcher({ full = false }: { full?: boolean }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const meta = CURRENCY_META[currency];

  return (
    <div ref={ref} className={`relative ${full ? 'w-full' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Currency"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-edge bg-white px-3 py-2 font-body text-sm font-bold text-navy transition-colors hover:border-teal hover:text-teal ${full ? 'w-full' : ''}`}
      >
        <span className="font-mono">{meta.symbol}</span>
        <span>{meta.label}</span>
        <Icon name="chevronDown" size={14} color="currentColor" />
      </button>
      {open && (
        <ul
          role="listbox"
          className={`absolute z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-edge bg-white py-1 shadow-[0_10px_30px_rgba(26,58,92,0.14)] ${full ? 'left-0 right-0' : 'right-0'}`}
        >
          {CURRENCIES.map((c) => {
            const m = CURRENCY_META[c];
            const active = c === currency;
            return (
              <li key={c}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setCurrency(c);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left font-body text-sm transition-colors hover:bg-aqua ${active ? 'font-bold text-teal' : 'text-navy'}`}
                >
                  <span className="w-5 font-mono text-base">{m.symbol}</span>
                  <span>{m.label}</span>
                  {active && <Icon name="check" size={15} color="#1A7A8A" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
