import { listBookings } from '@/lib/admin-bookings-data';
import { STATUS_LABEL, BOOKING_STATUSES } from '@/lib/admin-bookings';
import { PageHeader, AdminCard } from '@/components/admin/Page';
import { AdminButton } from '@/components/admin/AdminButton';
import StatusSelect from './StatusSelect';

export const dynamic = 'force-dynamic';

const th = 'px-3 pb-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted';
const td = 'border-t border-[#EAF2F1] px-3 py-3 align-middle text-sm';

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
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
        title="Брони"
        subtitle={`Всего: ${total} · стр. ${page}/${totalPages} · мест на странице: ${seatsTotal}`}
        action={
          <a
            href={exportHref}
            className="inline-flex items-center gap-2 rounded-xl border border-edge bg-white px-[18px] py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Экспорт CSV
          </a>
        }
      />

      {/* Filters */}
      <form method="get" className="mb-[18px] flex flex-wrap items-center gap-2.5">
        <input name="q" defaultValue={q} placeholder="Поиск по имени или телефону" className="hb-in max-w-[280px]" />
        <select name="status" defaultValue={status} className="hb-in w-auto">
          <option value="all">Все статусы</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <AdminButton type="submit">Применить</AdminButton>
      </form>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-edge bg-white p-10 text-center text-muted">
          Броней не найдено.
        </div>
      ) : (
        <AdminCard className="overflow-x-auto p-4">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr>
                <th className={th}>Дата</th>
                <th className={th}>Тур</th>
                <th className={th}>Имя</th>
                <th className={th}>Телефон</th>
                <th className={th}>Мест</th>
                <th className={th}>Статус</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className={td}>{fmtDate(b.created_at)}</td>
                    <td className={td}>{b.tours?.title_ru ?? <span className="text-[#9DB6B4]">{b.notes ?? '—'}</span>}</td>
                    <td className={td}>{b.full_name}</td>
                    <td className={td}>
                      <a href={`tel:${b.phone}`} className="text-teal no-underline">
                        {b.phone}
                      </a>
                    </td>
                    <td className={td}>{b.seats}</td>
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
              ← Назад
            </AdminButton>
          ) : (
            <AdminButton variant="secondary" size="sm" disabled>
              ← Назад
            </AdminButton>
          )}
          <span className="text-sm text-muted">
            {page} / {totalPages}
          </span>
          {page < totalPages ? (
            <AdminButton variant="secondary" size="sm" href={qs(page + 1)}>
              Вперёд →
            </AdminButton>
          ) : (
            <AdminButton variant="secondary" size="sm" disabled>
              Вперёд →
            </AdminButton>
          )}
        </div>
      )}
    </div>
  );
}
