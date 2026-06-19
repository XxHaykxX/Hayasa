'use client';

import { useEffect, useRef } from 'react';
import type { Stop } from '@/lib/tours';

const YANDEX_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;
const CORAL = '#E2685E';

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

        // Numbered stop markers.
        stops.forEach((s, i) => {
          map.geoObjects.add(
            new ymaps.Placemark([s.lat, s.lng], { iconContent: String(i + 1) }, { preset: 'islands#redCircleIcon' }),
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
              ? { strokeColor: CORAL, strokeWidth: 5 }
              : { strokeColor: CORAL, strokeWidth: 4, strokeStyle: 'dash' },
          ),
        );

        try {
          map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 40 });
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
  return <div ref={ref} className="h-[300px] rounded-[14px] overflow-hidden border border-edge" />;
}
