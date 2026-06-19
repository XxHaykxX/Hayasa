'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { Btn } from '@/components/ui/Btn'
import { Typewriter } from '@/components/ui/typewriter'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { TOURS, L } from '@/lib/tours'

const EASE = [0.22, 1, 0.36, 1] as const

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const rise: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
}

export function HeroSection({ title, subtitle }: { title?: string; subtitle?: string } = {}) {
    const t = useTranslations('Home')
    const tn = useTranslations('Nav')
    const locale = useLocale()
    const places = TOURS.map((tour) => L(tour.loc, locale))

    const ref = useRef<HTMLElement>(null)
    const reduce = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

    // Multilayer parallax: background drifts down, content layers lift up at
    // different speeds for depth; content fades as the hero scrolls away.
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
    const titleY = useTransform(scrollYProgress, [0, 1], [0, -90])
    const frontY = useTransform(scrollYProgress, [0, 1], [0, -50])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

    const bgStyle = reduce ? undefined : { y: bgY }
    const titleStyle = reduce ? undefined : { y: titleY, opacity: contentOpacity }
    const frontStyle = reduce ? undefined : { y: frontY, opacity: contentOpacity }

    return (
        <section ref={ref} className="relative -mt-[68px] min-h-[100svh] w-full overflow-hidden flex items-center">
            {/* photo background (Khor Virap & Mount Ararat) — parallax */}
            <motion.div className="absolute inset-0 -top-[12%] h-[124%] will-change-transform" style={bgStyle}>
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
            <motion.div
                className="relative z-10 w-full mx-auto max-w-[1240px] px-5 sm:px-6 pt-[68px] pb-24"
                variants={container}
                initial={reduce ? false : 'hidden'}
                animate="show"
            >
                <motion.div style={titleStyle}>
                    <motion.h1
                        variants={rise}
                        className="font-display text-white font-bold leading-[1.04] text-[38px] sm:text-[56px] xl:text-[72px] max-w-[760px] mb-4 sm:mb-5 [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
                    >
                        {title || t('heroTitle1')}
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
                    </motion.h1>
                </motion.div>
                <motion.div style={frontStyle}>
                    <motion.p
                        variants={rise}
                        className="font-body text-white/90 text-base sm:text-lg leading-relaxed max-w-[460px] mb-7 sm:mb-9 [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]"
                    >
                        {subtitle || t('heroSubtitle')}
                    </motion.p>
                    <motion.div variants={rise} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
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
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* scroll cue */}
            <motion.div
                className="pointer-events-none absolute bottom-[68px] left-1/2 z-10 -translate-x-1/2 hidden sm:flex"
                style={reduce ? undefined : { opacity: contentOpacity }}
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? undefined : { opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
            >
                <motion.span
                    animate={reduce ? undefined : { y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-white/70"
                >
                    <Icon name="chevronDown" size={26} color="currentColor" />
                </motion.span>
            </motion.div>

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
