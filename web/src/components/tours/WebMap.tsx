'use client';

import { useEffect, useRef } from 'react';
import type { Stop } from '@/lib/tours';

const YANDEX_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;

// Project a list of lat/lng into the SVG viewbox (900×300) with padding,
// so the static placeholder traces the real route shape.
function project(stops: Stop[]) {
  const pad = 80;
  const W = 900;
  const H = 300;
  const lats = stops.map((s) => s.lat);
  const lngs = stops.map((s) => s.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const spanLat = maxLat - minLat || 1;
  const spanLng = maxLng - minLng || 1;
  return stops.map((s) => ({
    x: pad + ((s.lng - minLng) / spanLng) * (W - 2 * pad),
    y: pad + ((maxLat - s.lat) / spanLat) * (H - 2 * pad), // invert: north = up
  }));
}

export function WebMap({ stops }: { stops: Stop[] }) {
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
        const coords: [number, number][] = stops.map((s) => [s.lat, s.lng]);

        // Numbered stop markers.
        stops.forEach((s, i) => {
          map.geoObjects.add(
            new ymaps.Placemark([s.lat, s.lng], { iconContent: String(i + 1) }, { preset: 'islands#redCircleIcon' }),
          );
        });

        // Ultimate fallback: straight dashed line when no road route exists.
        let settled = false;
        const straight = () => {
          if (settled) return;
          settled = true;
          map.geoObjects.add(
            new ymaps.Polyline(coords, {}, { strokeColor: '#E2685E', strokeWidth: 4, strokeStyle: 'dash' }),
          );
          try {
            map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 40 });
          } catch {
            /* ignore */
          }
        };

        // Road-following route through the stops in order (like a navigator).
        const tryRoute = (mode: 'auto' | 'pedestrian', onFail: () => void) => {
          let route: any;
          try {
            route = new ymaps.multiRouter.MultiRoute(
              { referencePoints: coords, params: { routingMode: mode } },
              {
                wayPointVisible: false, // keep our own numbered markers
                viaPointVisible: false,
                routeActiveStrokeColor: 'E2685E',
                routeActiveStrokeWidth: 5,
                routeStrokeColor: 'E2685E',
                routeStrokeWidth: 5,
                boundsAutoApply: true,
              },
            );
          } catch {
            onFail();
            return;
          }
          route.model.events.add('requestsuccess', () => {
            if (route.getRoutes().getLength() === 0) {
              try {
                map.geoObjects.remove(route);
              } catch {
                /* ignore */
              }
              onFail();
            } else {
              settled = true; // road route drawn — cancel any pending fallback
            }
          });
          route.model.events.add('requesterror', () => {
            try {
              map.geoObjects.remove(route);
            } catch {
              /* ignore */
            }
            onFail();
          });
          map.geoObjects.add(route);
        };

        // Car route first; if no driveable road, try walking; else straight line.
        if (ymaps.multiRouter) {
          tryRoute('auto', () => tryRoute('pedestrian', straight));
          // Safety net: if routing never responds (e.g. key without Router API),
          // draw the straight line so the map is never just dots.
          setTimeout(straight, 6000);
        } else {
          straight();
        }
      });
    };
    if (document.getElementById(id)) {
      init();
    } else {
      const s = document.createElement('script');
      s.id = id;
      s.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_KEY}&lang=en_US&load=package.full`;
      s.onload = init;
      document.head.appendChild(s);
    }
  }, [stops]);

  // Real Yandex map mounts here when a key is configured.
  if (YANDEX_KEY) {
    return <div ref={ref} className="h-[300px] rounded-[14px] overflow-hidden border border-edge" />;
  }

  // Static placeholder tracing the real coordinates.
  const pts = project(stops);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  return (
    <div className="relative h-[300px] rounded-[14px] overflow-hidden border border-edge" style={{ background: '#e9f4f1' }}>
      <svg width="100%" height="100%" viewBox="0 0 900 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
        <rect width="900" height="300" fill="#e6f3ef" />
        {[60, 120, 180, 240].map((y) => (
          <line key={'h' + y} x1="0" y1={y} x2="900" y2={y} stroke="#d2e8e2" strokeWidth="1" />
        ))}
        {[150, 300, 450, 600, 750].map((x) => (
          <line key={'v' + x} x1={x} y1="0" x2={x} y2="300" stroke="#d2e8e2" strokeWidth="1" />
        ))}
        <path d={path} stroke="#a9dcd6" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path} stroke="#E2685E" strokeWidth="3.5" fill="none" strokeDasharray="2 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {pts.map((p, i) => (
        <div key={i} className="absolute" style={{ left: (p.x / 900) * 100 + '%', top: (p.y / 300) * 100 + '%', transform: 'translate(-50%,-100%)' }}>
          <div className="w-7 h-7 flex items-center justify-center" style={{ borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: '#E2685E', boxShadow: '0 4px 10px rgba(226,104,94,0.4)' }}>
            <span className="font-mono font-bold text-xs text-white" style={{ transform: 'rotate(45deg)' }}>{i + 1}</span>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 right-3 rounded-lg bg-white/85 px-2.5 py-1 font-body text-[10px] font-bold tracking-wide text-muted">YANDEX MAPS</div>
    </div>
  );
}
