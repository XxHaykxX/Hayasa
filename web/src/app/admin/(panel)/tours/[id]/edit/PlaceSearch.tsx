'use client';

import { useEffect, useRef, useState } from 'react';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export type Place = { name: string; lat: number; lng: number };

type Feature = { id: string; text: string; place_name: string; center: [number, number] };

// Geocoding autocomplete biased to Armenia + Georgia. On pick, returns the
// place name + coordinates so the caller can fill the stop fields.
export default function PlaceSearch({
  defaultValue = '',
  onSelect,
}: {
  defaultValue?: string;
  onSelect: (p: Place) => void;
}) {
  const [q, setQ] = useState(defaultValue);
  const [results, setResults] = useState<Feature[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!TOKEN || q.trim().length < 2) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const id = setTimeout(async () => {
      setLoading(true);
      try {
        const url =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
          `?access_token=${TOKEN}&autocomplete=true&limit=6&country=am,ge&language=ru`;
        const res = await fetch(url, { signal: ctrl.signal });
        const data = await res.json();
        setResults(data.features ?? []);
        setOpen(true);
      } catch {
        /* aborted or failed */
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      clearTimeout(id);
      ctrl.abort();
    };
  }, [q]);

  // Close the dropdown on outside click.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  if (!TOKEN) {
    return <div className="text-[13px] text-[#C0564B]">Поиск недоступен — нет NEXT_PUBLIC_MAPBOX_TOKEN.</div>;
  }

  return (
    <div className="relative" ref={boxRef}>
      <input
        className="hb-in"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
        placeholder="Найти место: Гарни, Гегард…"
        autoComplete="off"
      />
      {loading && <span className="absolute right-3 top-3 text-xs text-muted">…</span>}
      {open && results.length > 0 && (
        <ul className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-edge bg-white shadow-lg">
          {results.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm text-navy hover:bg-aqua"
                onClick={() => {
                  const [lng, lat] = f.center;
                  onSelect({ name: f.text, lat, lng });
                  setQ(f.place_name);
                  setOpen(false);
                }}
              >
                {f.place_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
