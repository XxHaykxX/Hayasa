'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

// Per-stop photo slider. Single image when there is one photo; a compact
// carousel (arrows + dots + swipe + keyboard) when there are several.
export function StopGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const n = photos.length;
  const startX = useRef(0);
  const go = (d: number) => setState(([p]) => [(p + d + n) % n, d]);
  const jump = (to: number) => setState(([p]) => [to, to > p ? 1 : -1]);

  if (n === 1) {
    return (
      <div className="relative aspect-[16/10] w-full max-w-[440px] overflow-hidden rounded-xl border border-edge">
        <Image src={photos[0]} alt={alt} fill sizes="440px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className="group relative aspect-[16/10] w-full max-w-[440px] cursor-grab overflow-hidden rounded-xl border border-edge outline-none active:cursor-grabbing"
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
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, x: dir * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -30 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={photos[i]} alt={alt} fill sizes="440px" className="object-cover" />
        </motion.div>
      </AnimatePresence>
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
