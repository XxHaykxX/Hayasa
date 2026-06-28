import type { Metadata } from 'next';
import { Shell } from '@/components/layout/Shell';
import { Icon } from '@/components/ui/Icon';
import { Btn } from '@/components/ui/Btn';
import { Reveal } from '@/components/motion/Reveal';
import { Price } from '@/components/currency/Price';
import { CONTACT } from '@/lib/contact';
import { SCHOOL_TOURS, SCHOOL_TOURS_INTRO } from '@/lib/school-tours';
import { SITE_URL, altLanguages } from '@/lib/seo';

const TITLE = 'Դպրոցական տուրեր';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: TITLE,
    description: SCHOOL_TOURS_INTRO.heading,
    alternates: { canonical: `/${locale}/school-tours`, languages: altLanguages('/school-tours') },
    openGraph: { title: `${TITLE} — Hayasa Tours`, description: SCHOOL_TOURS_INTRO.heading, url: `${SITE_URL}/${locale}/school-tours` },
  };
}

export default function SchoolToursPage() {
  return (
    <Shell>
      {/* hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="font-body text-xs font-bold tracking-widest text-yellow mb-4">ԴՊՐՈՑԱԿԱՆ ՏՈՒՐԵՐ</div>
          <h1 className="font-display text-[40px] sm:text-[48px] font-bold leading-[1.05] max-w-[820px] mb-7">
            {SCHOOL_TOURS_INTRO.heading}
          </h1>
          <ul className="flex flex-col gap-2.5 max-w-[640px]">
            {SCHOOL_TOURS_INTRO.notes.map((n, i) => (
              <li key={i} className="flex items-start gap-2.5 font-body text-[15px] text-white/80">
                <span className="mt-0.5 flex-none">
                  <Icon name="check" size={18} color="#F4C430" />
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* price list */}
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCHOOL_TOURS.map((tour, i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-3 rounded-[14px] border border-edge bg-white p-5 transition-shadow hover:shadow-[0_12px_30px_rgba(26,58,92,0.10)]"
              >
                <p className="font-body text-[14px] leading-relaxed text-navy/85">{tour.title}</p>
                <div className="flex items-center justify-between border-t border-edge pt-3">
                  <Price amd={tour.priceAmd} className="font-mono text-lg font-bold text-teal-dark" />
                  <span className="font-body text-[11px] text-muted">/ մեկ աշակերտ</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-12 rounded-[14px] border border-edge bg-aqua p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Ամրագրե՛ք ձեր դասարանի ճանապարհորդությունը</h2>
            <p className="font-body text-[15px] text-navy/75 mb-6 max-w-[560px] mx-auto">
              Գրե՛ք մեզ ամսաթիվն ու երթուղին ընտրելու համար — կկազմենք ձեր դպրոցական խմբին հարմար ծրագիր.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white"
                style={{ background: '#25D366' }}
              >
                <Icon name="phone" size={16} color="#fff" />WhatsApp
              </a>
              <Btn variant="amber" size="lg" icon="arrowRight" href="/contact">
                Կապ մեզ հետ
              </Btn>
            </div>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}
