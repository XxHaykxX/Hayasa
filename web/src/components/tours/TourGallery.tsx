'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

// Hero gallery for the tour detail page: main image + clickable thumbnails,
// arrows, dots, swipe and keyboard nav. Use only when there is ≥1 photo.
export function TourGallery({ images, alt }: { images: string[]; alt: string }) {
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const n = images.length;
  const startX = useRef(0);

  const go = (d: number) => setState(([p]) => [(p + d + n) % n, d]);
  const jump = (to: number) => setState(([p]) => [to, to > p ? 1 : -1]);

  return (
    <div className="mb-8">
      <div
        className={`group relative h-[360px] overflow-hidden rounded-[14px] mb-3 outline-none ${n > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
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
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={images[i]} alt={alt} fill priority={i === 0} sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
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
              <Image src={img} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
