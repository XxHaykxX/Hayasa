import { useTranslations } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { CONTACT } from '@/lib/contact';

export default function PrivacyPage() {
  const t = useTranslations('Privacy');
  const sections: [string, string][] = [
    [t('collectTitle'), t('collectBody')],
    [t('useTitle'), t('useBody')],
    [t('rightsTitle'), t('rightsBody')],
  ];
  return (
    <Shell>
      <div className="mx-auto max-w-[760px] px-6 py-14">
        <h1 className="font-display text-[40px] font-bold text-navy leading-tight mb-1">{t('title')}</h1>
        <p className="font-body text-sm text-muted mb-8">{t('updated')}</p>
        <p className="font-body text-[15px] text-navy/80 leading-relaxed mb-8">{t('intro')}</p>
        <div className="grid gap-7">
          {sections.map(([title, body]) => (
            <div key={title}>
              <h2 className="font-display text-2xl font-bold text-navy mb-2">{title}</h2>
              <p className="font-body text-[15px] text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <p className="font-body text-[15px] text-navy/80 mt-10">
          {t('contactLine')}{' '}
          <a href={`mailto:${CONTACT.email}`} className="font-medium text-teal hover:underline">
            {CONTACT.email}
          </a>
        </p>
      </div>
    </Shell>
  );
}
