'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { Btn } from '@/components/ui/Btn'
import { Typewriter } from '@/components/ui/typewriter'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { TOURS, L } from '@/lib/tours'

export function HeroSection() {
    const t = useTranslations('Home')
    const tn = useTranslations('Nav')
    const locale = useLocale()
    const places = TOURS.map((tour) => L(tour.loc, locale))

    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

    return (
        <section ref={ref} className="relative -mt-[68px] min-h-[100svh] w-full overflow-hidden flex items-center">
            {/* photo background (Khor Virap & Mount Ararat) — parallax */}
            <motion.div className="absolute inset-0 -top-[12%] h-[124%] will-change-transform" style={{ y: bgY }}>
                <Image
                    src="/hero-ararat.jpg"
                    alt="Khor Virap monastery with Mount Ararat at sunset"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </motion.div>
            {/* readability overlays */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(95deg, rgba(20,40,64,0.88) 0%, rgba(20,40,64,0.55) 42%, rgba(20,40,64,0.12) 100%)' }}
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/70 to-transparent" />

            {/* content */}
            <div className="relative z-10 w-full mx-auto max-w-[1240px] px-5 sm:px-6 pt-[68px] pb-24">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 font-body text-[11px] sm:text-xs font-bold text-white tracking-wide mb-5 sm:mb-6">
                    🇦🇲 🇷🇺 <span className="tracking-widest">EN</span>
                </span>
                <h1 className="font-display text-white font-bold leading-[1.04] text-[38px] sm:text-[56px] xl:text-[72px] max-w-[760px] mb-4 sm:mb-5 [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
                    {t('heroTitle1')}
                    <br />
                    <Typewriter
                        text={places}
                        speed={90}
                        deleteSpeed={45}
                        waitTime={1600}
                        loop
                        className="text-yellow"
                        cursorClassName="text-yellow"
                    />
                </h1>
                <p className="font-body text-white/90 text-base sm:text-lg leading-relaxed max-w-[460px] mb-7 sm:mb-9 [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]">
                    {t('heroSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <Btn variant="amber" size="lg" icon="arrowRight" href="/tours" className="justify-center">
                        {t('viewTours')}
                    </Btn>
                    <Link
                        href="/auth"
                        className="inline-flex items-center justify-center gap-1.5 font-body font-bold text-white/90 hover:text-white px-2 py-2 transition-colors"
                    >
                        {tn('bookNow')}
                        <Icon name="chevronRight" size={18} color="currentColor" />
                    </Link>
                </div>
            </div>

            {/* destinations strip */}
            <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/15 bg-navy/35 backdrop-blur-sm">
                <div className="mx-auto max-w-[1240px] px-5 sm:px-6 py-3.5 flex items-center gap-5">
                    <p className="hidden sm:block font-body text-xs font-bold tracking-widest text-white/60 whitespace-nowrap border-r border-white/15 pr-5">
                        {t('departingSoon')}
                    </p>
                    <InfiniteSlider duration={42} durationOnHover={120} gap={56} className="w-full">
                        {places.map((p, i) => (
                            <span key={i} className="font-display text-base sm:text-lg font-bold text-white/70 whitespace-nowrap">
                                {p}
                            </span>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>
        </section>
    )
}
