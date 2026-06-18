'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Icon } from '@/components/ui/Icon';
import { Scenery } from '@/components/ui/Scenery';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Field } from '@/components/ui/Field';
import { L } from '@/lib/tours';
import { CONTACT } from '@/lib/contact';
import { getSupabase } from '@/lib/supabase';
import { getMyBookings, type MyBooking } from '@/lib/my-bookings';
import { useRouter, Link } from '@/i18n/navigation';

export default function ProfilePage() {
  const t = useTranslations('Profile');
  const locale = useLocale();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [lang, setLang] = useState('en');
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const supabase = getSupabase();
      if (!supabase) {
        if (active) {
          setAuthed(false);
          setLoading(false);
        }
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (active) {
          setAuthed(false);
          setLoading(false);
        }
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name,last_name,phone,preferred_lang')
        .eq('id', user.id)
        .single();
      const bk = await getMyBookings();
      if (!active) return;
      setEmail(user.email ?? '');
      setFirstName(profile?.first_name ?? '');
      setLastName(profile?.last_name ?? '');
      setPhone(profile?.phone ?? '');
      setLang(profile?.preferred_lang ?? locale);
      setBookings(bk ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [locale]);

  async function save() {
    const supabase = getSupabase();
    if (!supabase) return;
    setSaving(true);
    setSaved(false);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      return;
    }
    await supabase.from('profiles').upsert({
      id: user.id,
      first_name: firstName.trim() || null,
      last_name: lastName.trim() || null,
      phone: phone.trim() || null,
      preferred_lang: lang,
    });
    setSaving(false);
    setSaved(true);
  }

  async function signOut() {
    await getSupabase()?.auth.signOut();
    router.push('/auth');
  }

  const langs: [string, string, string][] = [
    ['hy', '🇦🇲', t('armenian')],
    ['ru', '🇷🇺', t('russian')],
    ['en', '🇬🇧', t('english')],
  ];
  const displayName = `${firstName} ${lastName}`.trim() || email || '—';
  const initials =
    (firstName[0] ?? email[0] ?? '?').toUpperCase() + (lastName[0] ?? '').toUpperCase();

  if (!loading && !authed) {
    return (
      <Shell>
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center">
          <Link href="/auth" className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 font-body text-sm font-bold text-white">
            <Icon name="arrowRight" size={16} color="#fff" />
            {t('loginPrompt')}
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="bg-aqua border-b border-edge">
        <div className="mx-auto max-w-[900px] px-6 py-12 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-[0_8px_24px_rgba(26,58,92,0.12)] flex items-center justify-center font-display text-4xl font-bold text-teal">
            {initials || 'AP'}
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold text-navy leading-none mb-1.5 whitespace-nowrap">{displayName}</h1>
            <span className="font-body text-muted">{email}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[900px] px-6 py-10 grid gap-10">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <Field label={t('phone')}>
            <div className="flex items-center rounded-xl border border-edge bg-white">
              <span className="font-mono text-sm text-muted px-3.5 border-r border-edge">+374</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="91 23 45 67" className="flex-1 bg-transparent px-3 py-3 font-body text-[15px] text-navy outline-none" />
            </div>
          </Field>
          <div>
            <span className="block font-body text-sm font-bold text-navy mb-2">{t('language')}</span>
            <div className="flex gap-2">
              {langs.map(([k, f, label]) => (
                <button
                  key={k}
                  onClick={() => setLang(k)}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-3 font-body text-sm font-bold transition-colors ${lang === k ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`}
                >
                  <span className="text-base">{f}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <Field label={t('firstName')}>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t('firstName')} className="hb-in" />
          </Field>
          <Field label={t('lastName')}>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t('lastName')} className="hb-in" />
          </Field>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 font-body text-sm font-bold text-white disabled:opacity-60">
            <Icon name="check" size={16} color="#fff" />
            {saving ? '…' : t('save')}
          </button>
          {saved && <span className="font-body text-sm text-teal">✓</span>}
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">{t('bookingHistory')}</h2>
          <div className="grid gap-3">
            {bookings.length === 0 && <p className="font-body text-sm text-muted">—</p>}
            {bookings.map((b) => (
              <div key={b.bookingId} className="flex items-center gap-4 bg-white rounded-xl border border-edge px-4 py-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-none">
                  {b.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <Scenery variant={b.variant} sun={false} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg font-bold text-navy leading-tight">{L(b.name, locale)}</div>
                  <div className="font-body text-xs text-muted mt-0.5">{b.date}</div>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">{t('needHelp')}</h2>
          <div className="flex flex-wrap gap-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white" style={{ background: '#25D366' }}>
              <Icon name="phone" size={16} color="#fff" />WhatsApp
            </a>
            <a href={CONTACT.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white" style={{ background: '#0088CC' }}>
              <Icon name="send" size={15} color="#fff" />Telegram
            </a>
          </div>
        </div>

        <button onClick={signOut} className="font-body text-sm text-muted hover:text-navy underline underline-offset-4 justify-self-start">
          {t('signOut')}
        </button>
      </div>
    </Shell>
  );
}
