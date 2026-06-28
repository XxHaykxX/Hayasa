'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { LogOut } from 'lucide-react';
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
  const [avatarUrl, setAvatarUrl] = useState('');
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
        .select('first_name,last_name,phone,preferred_lang,avatar_url')
        .eq('id', user.id)
        .single();
      const bk = await getMyBookings();
      if (!active) return;
      const meta = (user.user_metadata ?? {}) as Record<string, string>;
      setEmail(user.email ?? '');
      setFirstName(profile?.first_name ?? '');
      setLastName(profile?.last_name ?? '');
      setPhone(profile?.phone ?? '');
      setLang(profile?.preferred_lang ?? locale);
      // Google sign-in supplies the avatar in user_metadata (avatar_url/picture).
      setAvatarUrl(profile?.avatar_url || meta.avatar_url || meta.picture || '');
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
      avatar_url: avatarUrl || null,
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

  if (loading) {
    return (
      <Shell>
        <div className="mx-auto flex max-w-[900px] justify-center px-6 py-32">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-edge border-t-teal" />
        </div>
      </Shell>
    );
  }

  if (!authed) {
    return (
      <Shell>
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center">
          <Link href="/auth" className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-teal-dark">
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
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center gap-6 px-6 py-12">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={displayName}
              referrerPolicy="no-referrer"
              className="h-24 w-24 flex-none rounded-full border-4 border-white object-cover shadow-[0_8px_24px_rgba(26,58,92,0.12)]"
            />
          ) : (
            <div className="flex h-24 w-24 flex-none items-center justify-center rounded-full border-4 border-white bg-white font-display text-4xl font-bold text-teal shadow-[0_8px_24px_rgba(26,58,92,0.12)]">
              {initials || '?'}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="mb-1.5 truncate font-display text-4xl font-bold leading-none text-navy">{displayName}</h1>
            <span className="font-body text-muted">{email}</span>
          </div>
          <button
            onClick={signOut}
            className="ml-auto inline-flex items-center gap-2 rounded-xl border border-[#F1C9C3] bg-white px-4 py-2.5 font-body text-sm font-bold text-[#C0564B] transition-colors hover:bg-[#FCEDEB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2685E] focus-visible:ring-offset-2"
          >
            <LogOut className="h-[18px] w-[18px]" />
            {t('signOut')}
          </button>
        </div>
      </div>
      <div className="mx-auto grid max-w-[900px] gap-10 px-6 py-10">
        <div className="rounded-2xl border border-edge bg-white p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label={t('firstName')}>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t('firstName')} className="hb-in" />
            </Field>
            <Field label={t('lastName')}>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t('lastName')} className="hb-in" />
            </Field>
            <Field label={t('phone')}>
              <div className="flex items-center rounded-xl border border-edge bg-white focus-within:border-teal">
                <span className="border-r border-edge px-3.5 font-mono text-sm text-muted">+374</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="91234567"
                  className="flex-1 bg-transparent px-3 py-3 font-body text-[15px] text-navy outline-none"
                />
              </div>
            </Field>
            <div>
              <span className="mb-2 block font-body text-sm font-bold text-navy">{t('language')}</span>
              <div className="flex gap-2">
                {langs.map(([k, f, label]) => (
                  <button
                    key={k}
                    onClick={() => setLang(k)}
                    className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-3 font-body text-sm font-bold transition-colors ${lang === k ? 'bg-navy text-white' : 'border border-edge bg-white text-navy hover:border-teal'}`}
                  >
                    <span className="text-base">{f}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-[#EAF2F1] pt-6">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
            >
              <Icon name="check" size={16} color="#fff" />
              {saving ? '…' : t('save')}
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-teal">
                <Icon name="check" size={15} color="currentColor" />
              </span>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">{t('bookingHistory')}</h2>
          <div className="grid gap-3">
            {bookings.length === 0 && <p className="font-body text-sm text-muted">—</p>}
            {bookings.map((b) => (
              <div key={b.bookingId} className="flex items-center gap-4 bg-white rounded-xl border border-edge px-4 py-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-none">
                  {b.cover ? (
                    <Image src={b.cover} alt="" fill sizes="56px" className="object-cover" />
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
      </div>
    </Shell>
  );
}
