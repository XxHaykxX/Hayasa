import { useTranslations } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Btn } from '@/components/ui/Btn';

export default function NotFound() {
  const t = useTranslations('System');
  return (
    <Shell>
      <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
        <div className="font-display text-[80px] font-bold text-teal/30 leading-none mb-2">404</div>
        <h1 className="font-display text-[32px] font-bold text-navy leading-tight mb-3">{t('notFoundTitle')}</h1>
        <p className="font-body text-[15px] text-muted mb-7">{t('notFoundBody')}</p>
        <Btn variant="amber" size="lg" icon="arrowRight" href="/">
          {t('backHome')}
        </Btn>
      </div>
    </Shell>
  );
}
