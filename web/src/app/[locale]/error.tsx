'use client';

import { useTranslations } from 'next-intl';
import { Btn } from '@/components/ui/Btn';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('System');
  return (
    <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
      <h1 className="font-display text-[32px] font-bold text-navy leading-tight mb-3">{t('errorTitle')}</h1>
      <p className="font-body text-[15px] text-muted mb-7">{t('errorBody')}</p>
      <Btn variant="amber" size="lg" icon="arrowRight" onClick={reset}>
        {t('retry')}
      </Btn>
    </div>
  );
}
