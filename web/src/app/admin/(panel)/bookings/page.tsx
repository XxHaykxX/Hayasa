import { listBookings } from '@/lib/admin-bookings-data';
import { STATUS_LABEL, STATUS_COLOR, BOOKING_STATUSES } from '@/lib/admin-bookings';
import StatusSelect from './StatusSelect';

export const dynamic = 'force-dynamic';

const th: React.CSSProperties = {
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 600,
  color: '#6B8585',
  textTransform: 'uppercase',
  letterSpacing: 0.4,
  padding: '0 12px 10px',
};
const td: React.CSSProperties = { padding: '12px', fontSize: 14, borderTop: '1px solid #EAF2F1', verticalAlign: 'middle' };

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
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Брони</h1>
        <p style={{ color: '#6B8585', fontSize: 14 }}>
          Найдено: {bookings.length} · мест суммарно: {seatsTotal}
        </p>
      </div>

      {/* Filters */}
      <form
        method="get"
        style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <input
          name="q"
          defaultValue={q}
          placeholder="Поиск по имени или телефону"
          className="hb-in"
          style={{ maxWidth: 280 }}
        />
        <select name="status" defaultValue={status} className="hb-in" style={{ width: 'auto' }}>
          <option value="all">Все статусы</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={{
            background: '#1A7A8A',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '11px 18px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Применить
        </button>
      </form>

      {bookings.length === 0 ? (
        <div
          style={{
            background: '#fff',
            border: '1px dashed #D0E8E4',
            borderRadius: 16,
            padding: 40,
            textAlign: 'center',
            color: '#6B8585',
          }}
        >
          Броней не найдено.
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #D0E8E4', borderRadius: 16, padding: 16, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
            <thead>
              <tr>
                <th style={th}>Дата</th>
                <th style={th}>Тур</th>
                <th style={th}>Имя</th>
                <th style={th}>Телефон</th>
                <th style={th}>Мест</th>
                <th style={th}>Источник</th>
                <th style={th}>Статус</th>
                <th style={th}>Изменить</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const color = STATUS_COLOR[b.status];
                return (
                  <tr key={b.id}>
                    <td style={td}>{fmtDate(b.created_at)}</td>
                    <td style={td}>{b.tours?.title_ru ?? <span style={{ color: '#9DB6B4' }}>{b.notes ?? '—'}</span>}</td>
                    <td style={td}>{b.full_name}</td>
                    <td style={td}>
                      <a href={`tel:${b.phone}`} style={{ color: '#1A7A8A', textDecoration: 'none' }}>
                        {b.phone}
                      </a>
                    </td>
                    <td style={td}>{b.seats}</td>
                    <td style={td}>{b.source}</td>
                    <td style={td}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: 999,
                          background: color.bg,
                          color: color.fg,
                        }}
                      >
                        {STATUS_LABEL[b.status]}
                      </span>
                    </td>
                    <td style={td}>
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
