'use client';

import { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

// Per-stop photo slider. Single image when there is one photo; a compact
// carousel (arrows + dots + swipe + keyboard) when there are several. Frames are
// preloaded stacked and cross-faded by opacity for instant switching; photos are
// already optimized (16:10 WebP), so a plain <img> straight off the CDN is used.
export function StopGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const n = photos.length;
  const startX = useRef(0);
  const go = (d: number) => setI((p) => (p + d + n) % n);
  const jump = (to: number) => setI(to);

  if (n === 1) {
    return (
      <div className="relative aspect-[16/10] w-full max-w-[440px] overflow-hidden rounded-xl border border-edge">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[0]} alt={alt} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" />
      </div>
    );
  }

  return (
    <div
      className="group relative aspect-[16/10] w-full max-w-[440px] cursor-grab overflow-hidden rounded-xl border border-edge bg-[#EAF2F1] outline-none active:cursor-grabbing"
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
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      {photos.map((src, d) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={d}
          src={src}
          alt={d === i ? alt : ''}
          aria-hidden={d !== i}
          loading="lazy"
          draggable={false}
          className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-300 ${
            d === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Предыдущее фото"
        className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 opacity-0 shadow backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
      >
        <Icon name="chevronLeft" size={16} color="#1A3A5C" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Следующее фото"
        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 opacity-0 shadow backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
      >
        <Icon name="chevronRight" size={16} color="#1A3A5C" />
      </button>
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {photos.map((_, d) => (
          <button
            key={d}
            type="button"
            onClick={() => jump(d)}
            aria-label={`Фото ${d + 1}`}
            className={`h-1.5 rounded-full transition-all ${d === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90'}`}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        Фото {i + 1} из {n}
      </span>
    </div>
  );
}
