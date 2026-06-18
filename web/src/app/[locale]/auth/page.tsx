'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Btn } from '@/components/ui/Btn';
import { Field } from '@/components/ui/Field';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AuthPage() {
  const t = useTranslations('Auth');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function magicLink(e: FormEvent) {
    e.preventDefault();
    setError('');
    const supabase = getSupabase();
    if (!supabase) {
      setError(t('notConfigured'));
      return;
    }
    if (!email.includes('@')) {
      setError(t('errEmail'));
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  async function oauth(provider: 'google' | 'apple') {
    const supabase = getSupabase();
    if (!supabase) {
      setError(t('notConfigured'));
      return;
    }
    await supabase.auth.signInWithOAuth({ provider });
  }

  return (
    <Shell>
      <div className="mx-auto max-w-[440px] px-6 py-16">
        <div className="rounded-[14px] border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.1)] p-8">
          <h1 className="font-display text-[34px] font-bold text-navy leading-tight mb-1">{t('title')}</h1>
          <p className="font-body text-[15px] text-muted mb-7">{t('subtitle')}</p>

          {!isSupabaseConfigured && (
            <div className="rounded-xl bg-aqua px-4 py-3 mb-6 font-body text-[13px] text-muted leading-snug">{t('notConfigured')}</div>
          )}

          {sent ? (
            <div className="rounded-xl bg-aqua px-4 py-4 font-body text-[14px] text-navy leading-snug text-center">{t('sent')}</div>
          ) : (
            <form onSubmit={magicLink} noValidate className="grid gap-4">
              <Field label={t('email')} error={error || undefined}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" placeholder="you@example.com" className="hb-in" />
              </Field>
              <Btn variant="amber" size="lg" full icon="send" type="submit">
                {busy ? t('sending') : t('magic')}
              </Btn>
            </form>
          )}

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-edge" />
            <span className="font-body text-xs text-muted">{t('or')}</span>
            <div className="h-px flex-1 bg-edge" />
          </div>

          <div className="grid gap-3">
            <button onClick={() => oauth('google')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-edge bg-white px-5 py-3 font-body text-sm font-bold text-navy hover:border-teal transition-colors">
              <Icon name="globe" size={16} color="#1A7A8A" />
              {t('google')}
            </button>
            <button onClick={() => oauth('apple')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-edge bg-white px-5 py-3 font-body text-sm font-bold text-navy hover:border-teal transition-colors">
              <Icon name="star" size={16} color="#1A3A5C" />
              {t('apple')}
            </button>
          </div>

          <p className="mt-7 text-center font-body text-[13px] text-muted">
            {t('guestNote')}{' '}
            <Link href="/tours" className="font-medium text-teal hover:underline">
              {t('browse')}
            </Link>
          </p>
        </div>
      </div>
    </Shell>
  );
}
