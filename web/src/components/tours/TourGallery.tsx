'use client';

import { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

// Hero gallery for the tour detail page: main image + clickable thumbnails,
// arrows, dots, swipe and keyboard nav. Use only when there is ≥1 photo.
// All frames are rendered stacked (preloaded) and cross-faded by opacity, so
// switching is instant — no per-click network fetch. Photos are already
// optimized (16:10 WebP), so we serve them straight from the CDN with a plain
// <img>, skipping the next/image optimizer round-trip.
export function TourGallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const n = images.length;
  const startX = useRef(0);

  const go = (d: number) => setI((p) => (p + d + n) % n);
  const jump = (to: number) => setI(to);

  return (
    <div className="mb-8">
      <div
        className={`group relative h-[360px] overflow-hidden rounded-[14px] mb-3 bg-[#EAF2F1] outline-none ${n > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
        tabIndex={0}
        role="group"
        aria-roledescription="карусель"
        aria-label={alt}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'ArrowRight') go(1);
        }}
        onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - startX.current;
          if (Math.abs(dx) > 40 && n > 1) go(dx < 0 ? 1 : -1);
        }}
      >
        {images.map((src, d) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={d}
            src={src}
            alt={d === i ? alt : ''}
            aria-hidden={d !== i}
            loading={d === 0 ? 'eager' : 'lazy'}
            draggable={false}
            className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-300 ${
              d === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur transition-colors hover:bg-white"
            >
              <Icon name="chevronLeft" size={18} color="#1A3A5C" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur transition-colors hover:bg-white"
            >
              <Icon name="chevronRight" size={18} color="#1A3A5C" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => jump(d)}
                  aria-label={`Фото ${d + 1}`}
                  className={`h-1.5 rounded-full transition-all ${d === i ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90'}`}
                />
              ))}
            </div>
          </>
        )}
        <span className="sr-only" aria-live="polite">
          Фото {i + 1} из {n}
        </span>
      </div>
      {n > 1 && (
        <div className="flex gap-3">
          {images.slice(0, 6).map((img, d) => (
            <button
              key={d}
              type="button"
              onClick={() => jump(d)}
              aria-label={`Открыть фото ${d + 1}`}
              aria-current={d === i}
              className={`relative h-[72px] flex-1 overflow-hidden rounded-lg transition-all ${d === i ? 'ring-2 ring-amber' : 'opacity-70 hover:opacity-100'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" loading="lazy" draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
