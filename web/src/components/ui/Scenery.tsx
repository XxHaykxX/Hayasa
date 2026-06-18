import type { CSSProperties } from 'react';

// Light lagoon-lake landscape placeholder (stands in for tour photography).
const SCENERY_VARIANTS = [
  { sky: 'linear-gradient(180deg, #e6f5f2 0%, #f3faf8 55%)', r: ['polygon(0 58%,18% 42%,36% 56%,54% 38%,72% 52%,90% 40%,100% 50%,100% 70%,0 70%)', 'polygon(0 70%,24% 58%,46% 68%,66% 56%,84% 66%,100% 60%,100% 100%,0 100%)'], near: '#b6dcd6' },
  { sky: 'linear-gradient(180deg, #e3f3f0 0%, #f1f9f7 55%)', r: ['polygon(0 50%,22% 62%,42% 46%,60% 58%,80% 44%,100% 56%,100% 70%,0 70%)', 'polygon(0 72%,26% 60%,48% 70%,70% 58%,88% 68%,100% 62%,100% 100%,0 100%)'], near: '#abd4ce' },
  { sky: 'linear-gradient(180deg, #e9f4ee 0%, #f4faf6 55%)', r: ['polygon(0 56%,16% 44%,38% 58%,56% 40%,74% 54%,90% 42%,100% 52%,100% 70%,0 70%)', 'polygon(0 74%,24% 62%,46% 72%,66% 60%,84% 70%,100% 64%,100% 100%,0 100%)'], near: '#bdded6' },
  { sky: 'linear-gradient(180deg, #e4f2f4 0%, #f2f9fa 55%)', r: ['polygon(0 54%,22% 46%,42% 60%,60% 44%,80% 56%,100% 44%,100% 70%,0 70%)', 'polygon(0 72%,20% 64%,44% 72%,68% 62%,86% 70%,100% 64%,100% 100%,0 100%)'], near: '#aed6d3' },
  { sky: 'linear-gradient(180deg, #eaf3ec 0%, #f5faf6 55%)', r: ['polygon(0 60%,20% 48%,40% 60%,58% 46%,78% 58%,100% 48%,100% 70%,0 70%)', 'polygon(0 74%,22% 66%,46% 74%,68% 64%,86% 72%,100% 66%,100% 100%,0 100%)'], near: '#b9d9d1' },
  { sky: 'linear-gradient(180deg, #e5f4f1 0%, #f2faf8 55%)', r: ['polygon(0 52%,18% 60%,40% 48%,58% 58%,78% 46%,100% 54%,100% 70%,0 70%)', 'polygon(0 72%,26% 62%,48% 70%,70% 60%,88% 68%,100% 62%,100% 100%,0 100%)'], near: '#a9d2cd' },
];

export function Scenery({
  variant = 0,
  sun = true,
  className,
  style,
}: {
  variant?: number;
  sun?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const v = SCENERY_VARIANTS[variant % SCENERY_VARIANTS.length];
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: v.sky, ...style }}>
      {sun && (
        <div style={{ position: 'absolute', left: '74%', top: '20%', width: '22%', paddingBottom: '22%', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,226,11,0.55) 0%, rgba(255,226,11,0) 68%)' }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: '#9bc4cf', clipPath: v.r[0], opacity: 0.55 }} />
      <div style={{ position: 'absolute', inset: 0, background: v.near, clipPath: v.r[1] }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', background: 'linear-gradient(180deg, #7bc2c0 0%, #5bafb0 100%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', opacity: 0.22, backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 9px)' }} />
    </div>
  );
}
