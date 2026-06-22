'use client';

import { useEffect, useRef, useState } from 'react';

const KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;
// Free, keyless geocoder (OpenStreetMap/Photon). Yandex JS Suggest + geocode are
// removed for this key, and the Mapbox token was invalid — so search runs on Photon.
const PHOTON = 'https://photon.komoot.io';
const AM_GE_BBOX = '43.4,38.8,46.7,41.4'; // minLon,minLat,maxLon,maxLat (Armenia+Georgia)

export type PlacePatch = { name?: string; lat?: string; lng?: string };
type Feat = { name: string; lat: number; lng: number; label: string };

// Admin stop picker: Photon search autocomplete + a Yandex map you can click or
// drag a marker on to set the coordinates.
export default function StopPlacePicker({
  value,
  onChange,
}: {
  value: { name: string; lat: string; lng: string };
  onChange: (patch: PlacePatch) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapObj = useRef<any>(null);
  const pmRef = useRef<any>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const valRef = useRef(value);
  const cbRef = useRef(onChange);
  const inited = useRef(false);
  const touched = useRef(false);
  valRef.current = value;
  cbRef.current = onChange;

  const [q, setQ] = useState(value.name || '');
  const [results, setResults] = useState<Feat[]>([]);
  const [open, setOpen] = useState(false);

  // Place / move the draggable marker, optionally recentering the map.
  const placeOnMap = (lat: number, lng: number, center: boolean) => {
    const ymaps = (window as unknown as { ymaps?: any }).ymaps;
    const map = mapObj.current;
    if (!ymaps || !map) return;
    if (!pmRef.current) {
      pmRef.current = new ymaps.Placemark([lat, lng], {}, { draggable: true, preset: 'islands#redDotIcon' });
      map.geoObjects.add(pmRef.current);
      pmRef.current.events.add('dragend', () => {
        const c = pmRef.current.geometry.getCoordinates();
        cbRef.current({ lat: c[0].toFixed(5), lng: c[1].toFixed(5) });
      });
    } else {
      if (map.geoObjects.getLength() === 0) map.geoObjects.add(pmRef.current);
      pmRef.current.geometry.setCoordinates([lat, lng]);
    }
    if (center) map.setCenter([lat, lng], 13);
  };

  // Reverse-geocode a map click to a name (only fills if name is still empty).
  const reverse = async (lat: number, lng: number) => {
    try {
      const r = await fetch(`${PHOTON}/reverse?lat=${lat}&lon=${lng}&lang=en`);
      const d = await r.json();
      const p = d.features?.[0]?.properties;
      const nm = p?.name || p?.city || p?.street;
      if (nm && !valRef.current.name) {
        cbRef.current({ name: nm });
        setQ(nm);
      }
    } catch {
      /* offline / blocked — coords are already set from the click */
    }
  };

  // Init the Yandex map once.
  useEffect(() => {
    if (!KEY) return;
    const id = 'yandex-maps-js';
    const init = () => {
      const ymaps = (window as unknown as { ymaps?: any }).ymaps;
      if (!ymaps || !mapRef.current || inited.current) return;
      ymaps.ready(() => {
        if (inited.current || !mapRef.current) return;
        inited.current = true;
        const has = !!valRef.current.lat && !!valRef.current.lng;
        const lat = parseFloat(valRef.current.lat) || 40.1772;
        const lng = parseFloat(valRef.current.lng) || 44.5035;
        const map = new ymaps.Map(mapRef.current, { center: [lat, lng], zoom: has ? 13 : 7, controls: ['zoomControl'] });
        mapObj.current = map;
        if (has) placeOnMap(lat, lng, false);
        map.events.add('click', (e: any) => {
          const c = e.get('coords');
          cbRef.current({ lat: c[0].toFixed(5), lng: c[1].toFixed(5) });
          placeOnMap(c[0], c[1], false);
          reverse(c[0], c[1]);
        });
      });
    };
    if (document.getElementById(id)) {
      init();
    } else {
      const s = document.createElement('script');
      s.id = id;
      s.src = `https://api-maps.yandex.ru/2.1/?apikey=${KEY}&lang=ru_RU`;
      s.onload = init;
      document.head.appendChild(s);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Photon search autocomplete (debounced), biased to Armenia + Georgia.
  useEffect(() => {
    if (!touched.current || q.trim().length < 2) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const url = `${PHOTON}/api/?q=${encodeURIComponent(q)}&limit=6&lang=en&bbox=${AM_GE_BBOX}`;
        const r = await fetch(url, { signal: ctrl.signal });
        const d = await r.json();
        const feats: Feat[] = (d.features ?? []).map((f: any) => {
          const p = f.properties ?? {};
          const [lng, lat] = f.geometry.coordinates;
          const label = [p.name, p.city, p.state, p.country].filter(Boolean).join(', ');
          return { name: p.name || label, lat, lng, label };
        });
        setResults(feats);
        setOpen(true);
      } catch {
        /* aborted / failed */
      }
    }, 300);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  // Close dropdown on outside click.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const pick = (f: Feat) => {
    cbRef.current({ name: f.name, lat: f.lat.toFixed(5), lng: f.lng.toFixed(5) });
    setQ(f.label);
    setOpen(false);
    placeOnMap(f.lat, f.lng, true);
  };

  // Manual coordinate entry — fallback when search/map aren't enough. Moves the
  // marker and recenters once both values parse as numbers.
  const onManual = (which: 'lat' | 'lng', v: string) => {
    cbRef.current({ [which]: v });
    const lat = parseFloat(which === 'lat' ? v : valRef.current.lat);
    const lng = parseFloat(which === 'lng' ? v : valRef.current.lng);
    if (Number.isFinite(lat) && Number.isFinite(lng)) placeOnMap(lat, lng, true);
  };

  if (!KEY) {
    return <div className="text-[13px] text-[#C0564B]">Карта недоступна — нет NEXT_PUBLIC_YANDEX_MAPS_KEY.</div>;
  }

  return (
    <div>
      <div className="relative" ref={boxRef}>
        <input
          className="hb-in"
          value={q}
          onChange={(e) => {
            touched.current = true;
            setQ(e.target.value);
          }}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Найти место: Гарни, Гегард, Хор Вирап…"
          autoComplete="off"
        />
        {open && results.length > 0 && (
          <ul className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-edge bg-white shadow-lg">
            {results.map((f, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm text-navy hover:bg-aqua"
                  onClick={() => pick(f)}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={mapRef} className="mt-2 h-[220px] w-full overflow-hidden rounded-xl border border-edge" />
      <p className="mt-1.5 text-[12px] text-muted">Кликните по карте, перетащите метку или введите координаты вручную.</p>
      <div className="mt-2 grid grid-cols-2 gap-2.5">
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted">Широта (lat)</label>
          <input
            type="number"
            step="any"
            inputMode="decimal"
            className="hb-in"
            value={value.lat}
            onChange={(e) => onManual('lat', e.target.value)}
            placeholder="40.11220"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted">Долгота (lng)</label>
          <input
            type="number"
            step="any"
            inputMode="decimal"
            className="hb-in"
            value={value.lng}
            onChange={(e) => onManual('lng', e.target.value)}
            placeholder="44.73000"
          />
        </div>
      </div>
    </div>
  );
}
