'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Stop } from '@/lib/tours';

const CORAL = '#E2685E';

// Numbered teardrop marker (no image assets → no broken-icon issues).
function pinHtml(n: number): string {
  return `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${CORAL};box-shadow:0 4px 10px rgba(226,104,94,0.4);display:flex;align-items:center;justify-content:center;border:2px solid #fff">
    <span style="transform:rotate(45deg);color:#fff;font-weight:700;font-size:12px;font-family:monospace">${n}</span>
  </div>`;
}

export function WebMap({ stops, route }: { stops: Stop[]; route?: [number, number][] | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!ref.current) return;
      const L = (await import('leaflet')).default;
      if (cancelled || !ref.current) return;

      // Guard against double-init (StrictMode / re-render).
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }

      const map = L.map(ref.current, { scrollWheelZoom: false });
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const stopLatLng = stops.map((s) => [s.lat, s.lng] as [number, number]);
      const hasRoad = Array.isArray(route) && route.length > 1;
      const line = hasRoad ? (route as [number, number][]) : stopLatLng;

      L.polyline(line, {
        color: CORAL,
        weight: 5,
        opacity: 0.9,
        ...(hasRoad ? {} : { dashArray: '6 10' }),
      }).addTo(map);

      stops.forEach((s, i) => {
        L.marker([s.lat, s.lng], {
          icon: L.divIcon({ html: pinHtml(i + 1), className: '', iconSize: [28, 28], iconAnchor: [14, 28] }),
        }).addTo(map);
      });

      map.fitBounds(L.latLngBounds(line), { padding: [40, 40] });
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, [stops, route]);

  return <div ref={ref} className="h-[300px] rounded-[14px] overflow-hidden border border-edge" style={{ background: '#e9f4f1' }} />;
}
