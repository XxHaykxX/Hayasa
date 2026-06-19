'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
  none: {},
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fade/blur/slide an element in when it scrolls into view.
 * Respects prefers-reduced-motion (renders statically, no transform).
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  blur = true,
  delay = 0,
  duration = 0.55,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  blur?: boolean;
  delay?: number;
  duration?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const o = OFFSET[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...o, filter: blur ? 'blur(10px)' : undefined }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: blur ? 'blur(0px)' : undefined }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
