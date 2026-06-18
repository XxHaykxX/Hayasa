'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { Btn } from '@/components/ui/Btn'
import { Scenery } from '@/components/ui/Scenery'
import { Typewriter } from '@/components/ui/typewriter'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { TOURS, L } from '@/lib/tours'

export function HeroSection() {
    const t = useTranslations('Home')
    const tn = useTranslations('Nav')
    const locale = useLocale()
    const places = TOURS.map((tour) => L(tour.loc, locale))

    return (
        <section className="relative -mt-[68px] min-h-[100svh] w-full overflow-hidden flex items-center">
            {/* full-screen brand background */}
            <div className="absolute inset-0">
                <Scenery variant={0} />
            </div>
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(95deg, rgba(26,58,92,0.82) 0%, rgba(26,58,92,0.5) 48%, rgba(26,58,92,0.12) 100%)' }}
            />

            {/* content */}
            <div className="relative z-10 w-full mx-auto max-w-[1200px] px-6 pt-[68px]">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 font-body text-xs font-bold text-white tracking-wide mb-6">
                    🇦🇲 🇷🇺 🇬🇧 &nbsp;{t('badge')}
                </span>
                <h1 className="font-display text-white font-bold leading-[1.02] text-[46px] sm:text-[64px] xl:text-[76px] max-w-[760px] mb-5">
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
                <p className="font-body text-white/85 text-lg leading-relaxed max-w-[480px] mb-9">
                    {t('heroSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Btn variant="amber" size="lg" icon="arrowRight" href="/tours">
                        {t('viewTours')}
                    </Btn>
                    <Link
                        href="/auth"
                        className="inline-flex items-center gap-1.5 font-body font-bold text-white/90 hover:text-white px-2 py-2 transition-colors"
                    >
                        {tn('bookNow')}
                        <Icon name="chevronRight" size={18} color="currentColor" />
                    </Link>
                </div>
            </div>

            {/* destinations strip pinned to the bottom of the banner */}
            <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/15 bg-navy/30 backdrop-blur-sm">
                <div className="mx-auto max-w-[1200px] px-6 py-4 flex items-center gap-5">
                    <p className="hidden sm:block font-body text-xs font-bold tracking-widest text-white/60 whitespace-nowrap border-r border-white/15 pr-5">
                        {t('departingSoon')}
                    </p>
                    <InfiniteSlider duration={42} durationOnHover={120} gap={56} className="w-full">
                        {places.map((p, i) => (
                            <span key={i} className="font-display text-lg font-bold text-white/70 whitespace-nowrap">
                                {p}
                            </span>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>
        </section>
    )
}
