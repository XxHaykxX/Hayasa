'use client';

import { useEffect, useRef } from 'react';
import type { Stop } from '@/lib/tours';

const YANDEX_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;
const PIN = '#E0322B'; // red map pin
const ROUTE = '#E2685E'; // brand coral route line

export function WebMap({ stops, route }: { stops: Stop[]; route?: [number, number][] | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!YANDEX_KEY || !ref.current) return;
    const id = 'yandex-maps-js';
    const init = () => {
      const ymaps = (window as unknown as { ymaps?: any }).ymaps;
      if (!ymaps || !ref.current) return;
      ymaps.ready(() => {
        const map = new ymaps.Map(ref.current, {
          center: [stops[0].lat, stops[0].lng],
          zoom: 9,
          controls: ['zoomControl'],
        });

        // Custom red teardrop pin with a white number (matches design ref).
        const PinLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="position:relative;width:30px;height:40px;transform:translate(-50%,-100%);filter:drop-shadow(0 3px 5px rgba(20,40,64,0.35));">' +
            '<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.716 23.284 0 15 0z" fill="' +
            PIN +
            '"/></svg>' +
            '<div style="position:absolute;top:5px;left:0;width:30px;text-align:center;color:#fff;font:700 13px/1 var(--font-body),sans-serif;">$[properties.iconContent]</div>' +
            '</div>',
        );

        stops.forEach((s, i) => {
          map.geoObjects.add(
            new ymaps.Placemark(
              [s.lat, s.lng],
              { iconContent: String(i + 1) },
              { iconLayout: PinLayout, iconShape: { type: 'Circle', coordinates: [0, -26], radius: 14 } },
            ),
          );
        });

        // Draw the precomputed road geometry (OSRM); straight dashed fallback.
        const hasRoad = Array.isArray(route) && route.length > 1;
        const line: [number, number][] = hasRoad ? (route as [number, number][]) : stops.map((s) => [s.lat, s.lng]);
        map.geoObjects.add(
          new ymaps.Polyline(
            line,
            {},
            hasRoad
              ? { strokeColor: ROUTE, strokeWidth: 5 }
              : { strokeColor: ROUTE, strokeWidth: 4, strokeStyle: 'dash' },
          ),
        );

        try {
          map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 50 });
        } catch {
          /* ignore */
        }
      });
    };
    if (document.getElementById(id)) {
      init();
    } else {
      const s = document.createElement('script');
      s.id = id;
      s.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_KEY}&lang=en_US`;
      s.onload = init;
      document.head.appendChild(s);
    }
  }, [stops, route]);

  if (!YANDEX_KEY) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-[14px] border border-dashed border-edge bg-aqua text-sm text-muted">
        Карта появится после настройки Yandex Maps (NEXT_PUBLIC_YANDEX_MAPS_KEY).
      </div>
    );
  }
  return <div ref={ref} className="webmap-mono h-[300px] rounded-[14px] overflow-hidden border border-edge" />;
}
