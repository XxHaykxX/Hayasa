'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLocale } from 'next-intl';
import type { Stop } from '@/lib/tours';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const STYLE = process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/streets-v12';
const CORAL = '#E2685E';

function pinEl(n: number): HTMLDivElement {
  const el = document.createElement('div');
  el.style.cssText = `width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${CORAL};box-shadow:0 4px 10px rgba(226,104,94,0.4);display:flex;align-items:center;justify-content:center;border:2px solid #fff`;
  el.innerHTML = `<span style="transform:rotate(45deg);color:#fff;font-weight:700;font-size:12px;font-family:monospace">${n}</span>`;
  return el;
}

// Switch map labels to the site language (best-effort; falls back to local name).
function setLanguage(map: mapboxgl.Map, lang: string) {
  try {
    const field = ['coalesce', ['get', `name_${lang}`], ['get', 'name']];
    for (const layer of map.getStyle().layers ?? []) {
      if (layer.type === 'symbol' && (layer.layout as Record<string, unknown> | undefined)?.['text-field']) {
        map.setLayoutProperty(layer.id, 'text-field', field as unknown as mapboxgl.Expression);
      }
    }
  } catch {
    /* ignore */
  }
}

export function WebMap({ stops, route }: { stops: Stop[]; route?: [number, number][] | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    if (!TOKEN || !ref.current) return;
    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: ref.current,
      style: STYLE,
      scrollZoom: false,
      attributionControl: true,
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-left');

    map.on('load', () => {
      setLanguage(map, locale);

      const hasRoad = Array.isArray(route) && route.length > 1;
      const latlng = hasRoad ? (route as [number, number][]) : stops.map((s) => [s.lat, s.lng] as [number, number]);
      const coords = latlng.map(([lat, lng]) => [lng, lat]);

      map.addSource('route', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } },
      });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': CORAL, 'line-width': 5, ...(hasRoad ? {} : { 'line-dasharray': [1, 2] }) },
      });

      stops.forEach((s, i) => new mapboxgl.Marker({ element: pinEl(i + 1) }).setLngLat([s.lng, s.lat]).addTo(map));

      const b = new mapboxgl.LngLatBounds();
      coords.forEach((c) => b.extend(c as [number, number]));
      map.fitBounds(b, { padding: 50, duration: 0 });
    });

    return () => map.remove();
  }, [stops, route, locale]);

  if (!TOKEN) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-[14px] border border-dashed border-edge bg-aqua text-sm text-muted">
        Карта появится после настройки Mapbox (NEXT_PUBLIC_MAPBOX_TOKEN).
      </div>
    );
  }
  return <div ref={ref} className="h-[300px] rounded-[14px] overflow-hidden border border-edge" />;
}
