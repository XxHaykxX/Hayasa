'use client';

import { useState } from 'react';
import { Scenery } from '@/components/ui/Scenery';
import { Icon } from '@/components/ui/Icon';

// Fallback slider shown when a tour/stop has no real photos yet. Pages through
// a few Scenery art variants so the carousel is still visible; uploaded photos
// (TourGallery / StopGallery) take over automatically once present.
export function SceneryGallery({ variant, size }: { variant: number; size: 'hero' | 'stop' }) {
  const variants = size === 'hero'
    ? [variant % 6, (variant + 1) % 6, (variant + 2) % 6, (variant + 3) % 6]
    : [variant % 6, (variant + 2) % 6, (variant + 4) % 6];
  const n = variants.length;
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + n) % n);

  const isHero = size === 'hero';

  return (
    <div className={isHero ? 'mb-8' : ''}>
      <div
        className={`group relative overflow-hidden outline-none ${
          isHero ? 'h-[360px] rounded-[14px] mb-3' : 'aspect-[16/10] w-full max-w-[440px] rounded-xl border border-edge'
        }`}
        role="group"
        aria-roledescription="карусель"
      >
        <Scenery variant={variants[i]} />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Предыдущее"
          className={`absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow backdrop-blur transition-opacity hover:bg-white ${
            isHero ? 'left-3 h-10 w-10' : 'left-2 h-8 w-8 opacity-0 group-hover:opacity-100 max-md:opacity-100'
          }`}
        >
          <Icon name="chevronLeft" size={isHero ? 18 : 16} color="#1A3A5C" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Следующее"
          className={`absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow backdrop-blur transition-opacity hover:bg-white ${
            isHero ? 'right-3 h-10 w-10' : 'right-2 h-8 w-8 opacity-0 group-hover:opacity-100 max-md:opacity-100'
          }`}
        >
          <Icon name="chevronRight" size={isHero ? 18 : 16} color="#1A3A5C" />
        </button>
        <div className={`absolute left-1/2 z-10 flex -translate-x-1/2 gap-1.5 ${isHero ? 'bottom-3' : 'bottom-2'}`}>
          {variants.map((_, d) => (
            <button
              key={d}
              type="button"
              onClick={() => setI(d)}
              aria-label={`Слайд ${d + 1}`}
              className={`h-1.5 rounded-full transition-all ${d === i ? (isHero ? 'w-5' : 'w-4') + ' bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90'}`}
            />
          ))}
        </div>
      </div>
      {isHero && (
        <div className="flex gap-3">
          {variants.map((v, d) => (
            <button
              key={d}
              type="button"
              onClick={() => setI(d)}
              aria-label={`Слайд ${d + 1}`}
              aria-current={d === i}
              className={`relative h-[72px] flex-1 overflow-hidden rounded-lg transition-all ${d === i ? 'ring-2 ring-amber' : 'opacity-70 hover:opacity-100'}`}
            >
              <Scenery variant={v} sun={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
