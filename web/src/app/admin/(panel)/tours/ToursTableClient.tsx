'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { TourRow } from '@/lib/admin-tours';
import { CATEGORY_LABEL, COUNTRY_LABEL } from '@/lib/admin-tours';
import { TOUR_BADGE } from '@/lib/status-colors';
import { AdminButton } from '@/components/admin/AdminButton';
import { useConfirm } from '@/components/admin/ConfirmProvider';
import { bulkSetActive, bulkDeleteTours } from './actions';
import TourActions from './TourActions';

const th = 'px-3 pb-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted';
const td = 'border-t border-[#EAF2F1] px-3 py-3 align-middle text-sm';

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString('hy-AM', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ToursTableClient({ tours }: { tours: TourRow[] }) {
  const router = useRouter();
  const confirm = useConfirm();
  const [pending, startTransition] = useTransition();
  const [sel, setSel] = useState<Set<string>>(new Set());

  const allChecked = tours.length > 0 && sel.size === tours.length;
  const ids = Array.from(sel);

  const toggle = (id: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const toggleAll = () => setSel(allChecked ? new Set() : new Set(tours.map((t) => t.id)));

  const runBulk = (fn: () => Promise<void>, msg: string) =>
    startTransition(async () => {
      await fn();
      toast.success(msg);
      setSel(new Set());
      router.refresh();
    });

  const onBulkDelete = async () => {
    const ok = await confirm({
      title: `Ջնջել ընտրված տուրերը (${ids.length})?`,
      body: 'Գործողությունն անշրջելի է.',
      confirmLabel: 'Ջնջել',
      destructive: true,
    });
    if (ok) runBulk(() => bulkDeleteTours(ids), 'Տուրերը ջնջվեցին');
  };

  return (
    <div>
      {/* Bulk action bar */}
      {sel.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2.5 rounded-xl border border-edge bg-aqua px-4 py-2.5">
          <span className="text-sm font-semibold text-navy">Ընտրված: {sel.size}</span>
          <div className="ml-auto flex flex-wrap gap-2">
            <AdminButton variant="secondary" size="sm" disabled={pending} onClick={() => runBulk(() => bulkSetActive(ids, true), 'Ցուցադրվեց')}>
              Ցուցադրել
            </AdminButton>
            <AdminButton variant="secondary" size="sm" disabled={pending} onClick={() => runBulk(() => bulkSetActive(ids, false), 'Թաքցվեց')}>
              Թաքցնել
            </AdminButton>
            <AdminButton variant="destructive" size="sm" disabled={pending} onClick={onBulkDelete}>
              Ջնջել
            </AdminButton>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-edge bg-white p-4 shadow-sm">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr>
              <th className={`${th} w-8`}>
                <input type="checkbox" checked={allChecked} onChange={toggleAll} aria-label="Ընտրել բոլորը" />
              </th>
              <th className={th}>Անվանում</th>
              <th className={th}>Երկիր</th>
              <th className={th}>Կատեգորիա</th>
              <th className={th}>Ամսաթիվ</th>
              <th className={th}>Գին</th>
              <th className={th}>Տեղեր</th>
              <th className={th}>Կարգավիճակ</th>
              <th className={th}></th>
            </tr>
          </thead>
          <tbody>
            {tours.map((t) => {
              const name = t.title_hy || t.title_ru || '—';
              const badge = t.is_active ? TOUR_BADGE.active : TOUR_BADGE.hidden;
              return (
                <tr key={t.id} className={sel.has(t.id) ? 'bg-[#F3FAF9]' : ''}>
                  <td className={td}>
                    <input
                      type="checkbox"
                      checked={sel.has(t.id)}
                      onChange={() => toggle(t.id)}
                      aria-label={`Ընտրել «${name}»`}
                    />
                  </td>
                  <td className={td}>
                    <Link href={`/admin/tours/${t.id}/edit`} className="font-semibold text-navy no-underline">
                      {name}
                    </Link>
                  </td>
                  <td className={td}>{COUNTRY_LABEL[t.country as 'am' | 'ge'] ?? t.country}</td>
                  <td className={td}>
                    {t.category ? CATEGORY_LABEL[t.category as keyof typeof CATEGORY_LABEL] ?? t.category : '—'}
                  </td>
                  <td className={td}>{fmtDate(t.date_start)}</td>
                  <td className={td}>
                    {t.price.toLocaleString('hy-AM')} {t.currency}
                  </td>
                  <td className={td}>
                    {t.booked_seats}/{t.max_seats}
                  </td>
                  <td className={td}>
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{ background: badge.bg, color: badge.fg }}
                    >
                      {t.is_active ? 'Ակտիվ' : 'Թաքնված'}
                    </span>
                  </td>
                  <td className={td}>
                    <TourActions id={t.id} isActive={t.is_active} title={name} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
