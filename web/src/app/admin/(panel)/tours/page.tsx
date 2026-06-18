import Link from 'next/link';
import { listTours } from '@/lib/admin-tours-data';
import { CATEGORY_LABEL, COUNTRY_LABEL } from '@/lib/admin-tours';
import TourActions from './TourActions';

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
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function AdminToursPage() {
  const tours = await listTours();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Туры</h1>
          <p style={{ color: '#6B8585', fontSize: 14 }}>Всего: {tours.length}</p>
        </div>
        <Link
          href="/admin/tours/new"
          style={{
            background: '#1A7A8A',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: 12,
            padding: '11px 18px',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          + Новый тур
        </Link>
      </div>

      {tours.length === 0 ? (
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
          Туров пока нет. Создайте первый или засейте из mock-данных.
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #D0E8E4', borderRadius: 16, padding: 16, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead>
              <tr>
                <th style={th}>Название</th>
                <th style={th}>Страна</th>
                <th style={th}>Категория</th>
                <th style={th}>Дата</th>
                <th style={th}>Цена</th>
                <th style={th}>Места</th>
                <th style={th}>Статус</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {tours.map((t) => (
                <tr key={t.id}>
                  <td style={td}>
                    <Link href={`/admin/tours/${t.id}/edit`} style={{ color: '#1A3A5C', fontWeight: 600, textDecoration: 'none' }}>
                      {t.title_ru}
                    </Link>
                  </td>
                  <td style={td}>{COUNTRY_LABEL[t.country as 'am' | 'ge'] ?? t.country}</td>
                  <td style={td}>{t.category ? CATEGORY_LABEL[t.category as keyof typeof CATEGORY_LABEL] ?? t.category : '—'}</td>
                  <td style={td}>{fmtDate(t.date_start)}</td>
                  <td style={td}>
                    {t.price.toLocaleString('ru-RU')} {t.currency}
                  </td>
                  <td style={td}>
                    {t.booked_seats}/{t.max_seats}
                  </td>
                  <td style={td}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: t.is_active ? '#E3F4F1' : '#F2EDED',
                        color: t.is_active ? '#1A7A8A' : '#9A8E8E',
                      }}
                    >
                      {t.is_active ? 'Активен' : 'Скрыт'}
                    </span>
                  </td>
                  <td style={td}>
                    <TourActions id={t.id} isActive={t.is_active} title={t.title_ru} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
