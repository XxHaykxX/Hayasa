'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { subscribe, type SubscribeState } from './newsletter-actions';

const initial: SubscribeState = { ok: false };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={label}
      className="flex-none grid size-10 place-content-center rounded-lg bg-yellow text-navy transition-colors hover:bg-yellow/90 disabled:opacity-60"
    >
      <Icon name="arrowRight" size={18} color="currentColor" />
    </button>
  );
}

// Footer newsletter signup. Posts to the `subscribe` server action; on success
// the form is replaced by a thank-you line.
export function NewsletterForm() {
  const t = useTranslations('Newsletter');
  const locale = useLocale();
  const [state, action] = useFormState(subscribe, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  if (state.ok) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-body text-sm text-white">
        <Icon name="check" size={18} color="#F4C430" />
        {t('thanks')}
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder={t('placeholder')}
          className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 font-body text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow"
        />
        <input type="hidden" name="locale" value={locale} />
        <SubmitButton label={t('subscribe')} />
      </div>
      {state.error && <p className="font-body text-xs text-amber-dark">{t('error')}</p>}
    </form>
  );
}
