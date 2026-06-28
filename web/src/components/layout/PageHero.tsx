import { Reveal } from '@/components/motion/Reveal';

// Shared header band for standalone pages (about / contact / team).
// Signature: a dashed "route" line crossing the navy band, ending in a pin —
// the same travel motif as the tour route maps, used once and kept quiet.
export function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* route signature */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 280"
        fill="none"
      >
        <path
          d="M-20 232 C 240 232, 300 150, 560 150 S 960 70, 1240 70"
          stroke="#7FD4CE"
          strokeWidth="2"
          strokeDasharray="2 12"
          strokeLinecap="round"
        />
        <circle cx="560" cy="150" r="5" fill="#FFE20B" />
        <circle cx="560" cy="150" r="11" stroke="#FFE20B" strokeOpacity="0.4" strokeWidth="2" />
      </svg>

      <Reveal className="relative mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <div className="font-body text-xs font-bold tracking-widest text-[#7FD4CE] mb-3">{kicker}</div>
        <h1 className="font-display font-bold text-white leading-[1.05] text-[clamp(34px,5vw,52px)] max-w-[18ch]">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-[16px] text-white/70 leading-relaxed mt-4 max-w-[560px]">{subtitle}</p>
        )}
      </Reveal>
    </section>
  );
}
