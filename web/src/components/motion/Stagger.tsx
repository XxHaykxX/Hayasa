'use client';

import { Children, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
};

/**
 * Reveals each direct child with a staggered fade/blur/rise on scroll-in.
 * Put grid/flex classes on `className`; each child is wrapped in an item.
 * Respects prefers-reduced-motion.
 */
export function Stagger({
  children,
  className,
  itemClassName,
  inView = true,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  /**
   * true (default): reveal once on scroll-in — for static content.
   * false: always animate to "show" on mount — for dynamic lists (e.g. a
   * filtered grid) where children come and go. A scroll-gated container only
   * fires once, so children that mount AFTER it fired stay opacity:0; keeping
   * the container permanently "show" makes every newly mounted child animate in.
   */
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  // amount: 'some' so a tall grid (taller than the viewport) still triggers.
  const gate = inView
    ? ({ whileInView: 'show', viewport: { once: true, amount: 'some' } } as const)
    : ({ animate: 'show' } as const);

  return (
    <motion.div className={className} variants={container} initial="hidden" {...gate}>
      {Children.map(children, (child) => (
        <motion.div className={itemClassName} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
