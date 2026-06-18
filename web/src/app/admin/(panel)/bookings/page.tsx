import { listBookings } from '@/lib/admin-bookings-data';
import { STATUS_LABEL, STATUS_COLOR, BOOKING_STATUSES } from '@/lib/admin-bookings';
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
  searchParams: { status?: string; q?: string };
}) {
  const status = searchParams.status ?? 'all';
  const q = searchParams.q ?? '';
  const bookings = await listBookings({ status, q });
  const seatsTotal = bookings.reduce((sum, b) => sum + (b.seats || 0), 0);

  return (
    <div>
      <div className="mb-5">
        <h1 className="mb-1 text-[26px] font-bold text-navy">Брони</h1>
        <p className="text-sm text-muted">
          Найдено: {bookings.length} · мест суммарно: {seatsTotal}
        </p>
      </div>

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
        <button type="submit" className="rounded-xl bg-teal px-[18px] py-2.5 text-sm font-semibold text-white">
          Применить
        </button>
      </form>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-edge bg-white p-10 text-center text-muted">
          Броней не найдено.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-edge bg-white p-4">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr>
                <th className={th}>Дата</th>
                <th className={th}>Тур</th>
                <th className={th}>Имя</th>
                <th className={th}>Телефон</th>
                <th className={th}>Мест</th>
                <th className={th}>Источник</th>
                <th className={th}>Статус</th>
                <th className={th}>Изменить</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const color = STATUS_COLOR[b.status];
                return (
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
                    <td className={td}>{b.source}</td>
                    <td className={td}>
                      <span
                        className="rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{ background: color.bg, color: color.fg }}
                      >
                        {STATUS_LABEL[b.status]}
                      </span>
                    </td>
                    <td className={td}>
                      <StatusSelect id={b.id} value={b.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
