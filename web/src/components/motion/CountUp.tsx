'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const NNBSP = ' '; // narrow no-break space — matches the original "2 500+" look

function group(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP);
}

/**
 * Counts up from 0 to `value` when scrolled into view.
 * Respects prefers-reduced-motion (shows the final value immediately).
 */
export function CountUp({
  value,
  suffix = '',
  duration = 1.2,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {group(display)}
      {suffix}
    </span>
  );
}
