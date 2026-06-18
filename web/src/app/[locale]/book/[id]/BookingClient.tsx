'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Shell } from '@/components/layout/Shell';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { Scenery } from '@/components/ui/Scenery';
import { Btn } from '@/components/ui/Btn';
import { Field } from '@/components/ui/Field';
import { L, type Tour } from '@/lib/tours';
import { createBooking } from '@/lib/db';

type Errors = { firstName?: string; lastName?: string; phone?: string };

export default function BookingClient({ tour }: { tour: Tour }) {
  const t = useTranslations('Booking');
  const locale = useLocale();
  const tourName = L(tour.name, locale);
  const [firstName, setFirstName] = useState('Areg');
  const [lastName, setLastName] = useState('Petrosyan');
  const [phone, setPhone] = useState('91 23 45 67');
  const [notes, setNotes] = useState('');
  const [seats, setSeats] = useState(2);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const unit = parseInt(tour.price.replace(/\s/g, ''), 10);
  const total = (unit * seats).toLocaleString('ru-RU');

  function validate(): Errors {
    const next: Errors = {};
    if (!firstName.trim()) next.firstName = t('errFirstName');
    if (!lastName.trim()) next.lastName = t('errLastName');
    if (phone.replace(/\D/g, '').length < 6) next.phone = t('errPhone');
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSending(true);
    setSubmitError('');
    // Writes to Supabase when configured; otherwise resolves as an offline
    // request (persisted=false) and we still confirm to the user.
    const res = await createBooking({
      tourId: tour.id,
      seats,
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      phone: `+374 ${phone.trim()}`,
      notes: notes.trim() || undefined,
    });
    setSending(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setSubmitError(t('errSubmit'));
    }
  }

  if (submitted) {
    return (
      <Shell>
        <div className="mx-auto max-w-[680px] px-6 py-20">
          <div className="rounded-[14px] border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.1)] p-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal">
              <Icon name="check" size={32} color="#fff" />
            </div>
            <h1 className="font-display text-[32px] font-bold text-navy leading-tight mb-3">{t('successTitle')}</h1>
            <p className="font-body text-[15px] text-muted leading-relaxed mb-8">
              {t('successBody', { name: firstName, phone: `+374 ${phone}`, seats, tour: tourName })}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Btn variant="amber" size="lg" icon="chevronRight" href="/my-tours">
                {t('viewMyTours')}
              </Btn>
              <Btn variant="outline" size="lg" href="/tours">
                {t('browseTours')}
              </Btn>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-[1100px] px-6 py-10">
        <Link href={`/tours/${tour.id}`} className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-teal mb-6">
          <Icon name="chevronLeft" size={16} color="currentColor" />
          {t('back')}
        </Link>
        <h1 className="font-display text-[40px] font-bold text-navy leading-none mb-8">{t('title')}</h1>
        <div className="grid lg:grid-cols-[1fr_380px] grid-cols-1 gap-10 items-start">
          {/* form */}
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
              <Field label={t('firstName')} error={errors.firstName}>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="hb-in" />
              </Field>
              <Field label={t('lastName')} error={errors.lastName}>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="hb-in" />
              </Field>
            </div>
            <Field label={t('phone')} error={errors.phone}>
              <div className="flex items-center rounded-xl border border-edge bg-white focus-within:border-teal">
                <span className="font-mono text-sm text-muted px-3.5 border-r border-edge">+374</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" className="flex-1 bg-transparent px-3 py-3 font-body text-[15px] text-navy outline-none" />
              </div>
            </Field>
            <Field label={t('seats')}>
              <div className="flex items-center justify-between rounded-xl border border-edge bg-white px-4 py-2.5 max-w-xs">
                <span className="font-body text-sm text-muted">{t('travellers')}</span>
                <div className="flex items-center gap-5">
                  <button type="button" onClick={() => setSeats((s) => Math.max(1, s - 1))} className="w-9 h-9 rounded-lg bg-teal text-white flex items-center justify-center active:scale-90 transition-transform">
                    <Icon name="minus" size={18} color="#fff" />
                  </button>
                  <span className="font-mono text-xl font-bold text-navy w-6 text-center">{seats}</span>
                  <button type="button" onClick={() => setSeats((s) => Math.min(tour.seats, s + 1))} className="w-9 h-9 rounded-lg bg-teal text-white flex items-center justify-center active:scale-90 transition-transform">
                    <Icon name="plus" size={18} color="#fff" />
                  </button>
                </div>
              </div>
            </Field>
            <Field label={t('notes')}>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder={t('notesPlaceholder')} className="hb-in resize-none" />
            </Field>
          </div>

          {/* summary */}
          <aside className="lg:sticky lg:top-[88px] rounded-[14px] border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.1)] overflow-hidden">
            <div className="relative h-[120px]">
              <Scenery variant={tour.variant} />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-navy leading-tight mb-1">{tourName}</h3>
              <div className="inline-flex items-center gap-1.5 font-body text-sm text-muted mb-5">
                <Icon name="calendar" size={14} color="#6A8A88" />
                {tour.date}
              </div>
              <div className="flex justify-between font-body text-sm text-navy mb-2">
                <span className="text-muted">{seats} × {tour.price} ֏</span>
                <span className="font-mono">{total} ֏</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 mt-1 border-t border-edge mb-5">
                <span className="font-body font-bold text-navy">{t('total')}</span>
                <span className="font-mono text-2xl font-bold text-navy">
                  {total} <span className="text-base text-muted">֏</span>
                </span>
              </div>
              <div className="rounded-xl bg-aqua px-4 py-3 mb-5 font-body text-[13px] text-muted leading-snug">{t('offlineNote')}</div>
              <Btn variant="amber" size="lg" full icon="check" type="submit">
                {sending ? t('sending') : t('sendRequest')}
              </Btn>
              {submitError && <p className="mt-3 font-body text-[13px] text-amber-dark text-center">{submitError}</p>}
            </div>
          </aside>
        </div>
      </form>
    </Shell>
  );
}
