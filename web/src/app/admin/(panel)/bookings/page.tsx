import { listBookings } from '@/lib/admin-bookings-data';
import { STATUS_LABEL, BOOKING_STATUSES } from '@/lib/admin-bookings';
import { PageHeader, AdminCard } from '@/components/admin/Page';
import { AdminButton } from '@/components/admin/AdminButton';
import StatusSelect from './StatusSelect';

export const dynamic = 'force-dynamic';

const th = 'px-3 pb-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted';
const td = 'border-t border-[#EAF2F1] px-3 py-3 align-middle text-sm';

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString('hy-AM', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// Booking total = per-seat tour price × seats. Tours booked by slug (tour_id
// null) carry no DB price, so show a dash.
function fmtPrice(unit: number | null | undefined, seats: number): string {
  if (!unit || unit <= 0) return '—';
  return `${(unit * seats).toLocaleString('hy-AM')} ֏`;
}

// Bookings store one `full_name` ("Имя Фамилия"). Split on the first space:
// first token is the name, the rest is the surname.
function splitName(full: string): { first: string; last: string } {
  const trimmed = (full ?? '').trim();
  const i = trimmed.indexOf(' ');
  if (i === -1) return { first: trimmed, last: '' };
  return { first: trimmed.slice(0, i), last: trimmed.slice(i + 1).trim() };
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string; page?: string };
}) {
  const status = searchParams.status ?? 'all';
  const q = searchParams.q ?? '';
  const page = Math.max(1, Number(searchParams.page) || 1);
  const { rows: bookings, total, pageSize } = await listBookings({ status, q, page });
  const seatsTotal = bookings.reduce((sum, b) => sum + (b.seats || 0), 0);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const exportParams = new URLSearchParams();
  if (q) exportParams.set('q', q);
  if (status !== 'all') exportParams.set('status', status);
  const exportHref = `/admin/bookings/export${exportParams.toString() ? `?${exportParams}` : ''}`;
  const qs = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (status !== 'all') sp.set('status', status);
    sp.set('page', String(p));
    return `?${sp.toString()}`;
  };

  return (
    <div>
      <PageHeader
        title="Ամրագրումներ"
        subtitle={`Ընդամենը: ${total} · էջ ${page}/${totalPages} · տեղեր էջում: ${seatsTotal}`}
        action={
          <a
            href={exportHref}
            className="inline-flex items-center gap-2 rounded-xl border border-edge bg-white px-[18px] py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Արտահանել CSV
          </a>
        }
      />

      {/* Filters */}
      <form method="get" className="mb-[18px] flex flex-wrap items-center gap-2.5">
        <input name="q" defaultValue={q} placeholder="Որոնում ըստ անվան կամ հեռախոսի" className="hb-in max-w-[280px]" />
        <select name="status" defaultValue={status} className="hb-in w-auto">
          <option value="all">Բոլոր կարգավիճակները</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <AdminButton type="submit">Կիրառել</AdminButton>
      </form>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-edge bg-white p-10 text-center text-muted">
          Ամրագրումներ չեն գտնվել։
        </div>
      ) : (
        <AdminCard className="overflow-x-auto p-4">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr>
                <th className={th}>Ամսաթիվ</th>
                <th className={th}>Տուր</th>
                <th className={th}>Անուն</th>
                <th className={th}>Ազգանուն</th>
                <th className={th}>Հեռախոս</th>
                <th className={th}>Տեղեր</th>
                <th className={th}>Գին</th>
                <th className={th}>Կարգավիճակ</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className={td}>{fmtDate(b.created_at)}</td>
                    <td className={td}>{(b.tours?.title_hy || b.tours?.title_ru) ?? <span className="text-[#9DB6B4]">{b.notes ?? '—'}</span>}</td>
                    <td className={td}>{splitName(b.full_name).first || '—'}</td>
                    <td className={td}>{splitName(b.full_name).last || '—'}</td>
                    <td className={td}>
                      <a href={`tel:${b.phone}`} className="text-teal no-underline">
                        {b.phone}
                      </a>
                    </td>
                    <td className={td}>{b.seats}</td>
                    <td className={`${td} whitespace-nowrap font-mono`}>{fmtPrice(b.tours?.price, b.seats)}</td>
                    <td className={td}>
                      <StatusSelect id={b.id} value={b.status} />
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          {page > 1 ? (
            <AdminButton variant="secondary" size="sm" href={qs(page - 1)}>
              ← Հետ
            </AdminButton>
          ) : (
            <AdminButton variant="secondary" size="sm" disabled>
              ← Հետ
            </AdminButton>
          )}
          <span className="text-sm text-muted">
            {page} / {totalPages}
          </span>
          {page < totalPages ? (
            <AdminButton variant="secondary" size="sm" href={qs(page + 1)}>
              Առաջ →
            </AdminButton>
          ) : (
            <AdminButton variant="secondary" size="sm" disabled>
              Առաջ →
            </AdminButton>
          )}
        </div>
      )}
    </div>
  );
}
