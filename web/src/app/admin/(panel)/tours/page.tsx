import Link from 'next/link';
import { listTours } from '@/lib/admin-tours-data';
import { CATEGORY_LABEL, COUNTRY_LABEL } from '@/lib/admin-tours';
import TourActions from './TourActions';

export const dynamic = 'force-dynamic';

const th = 'px-3 pb-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted';
const td = 'border-t border-[#EAF2F1] px-3 py-3 align-middle text-sm';

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
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-[26px] font-bold text-navy">Туры</h1>
          <p className="text-sm text-muted">Всего: {tours.length}</p>
        </div>
        <Link
          href="/admin/tours/new"
          className="rounded-xl bg-teal px-[18px] py-2.5 text-sm font-semibold text-white"
        >
          + Новый тур
        </Link>
      </div>

      {tours.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-edge bg-white p-10 text-center text-muted">
          Туров пока нет. Создайте первый или засейте из mock-данных.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-edge bg-white p-4">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr>
                <th className={th}>Название</th>
                <th className={th}>Страна</th>
                <th className={th}>Категория</th>
                <th className={th}>Дата</th>
                <th className={th}>Цена</th>
                <th className={th}>Места</th>
                <th className={th}>Статус</th>
                <th className={th}></th>
              </tr>
            </thead>
            <tbody>
              {tours.map((t) => (
                <tr key={t.id}>
                  <td className={td}>
                    <Link href={`/admin/tours/${t.id}/edit`} className="font-semibold text-navy no-underline">
                      {t.title_ru}
                    </Link>
                  </td>
                  <td className={td}>{COUNTRY_LABEL[t.country as 'am' | 'ge'] ?? t.country}</td>
                  <td className={td}>
                    {t.category ? CATEGORY_LABEL[t.category as keyof typeof CATEGORY_LABEL] ?? t.category : '—'}
                  </td>
                  <td className={td}>{fmtDate(t.date_start)}</td>
                  <td className={td}>
                    {t.price.toLocaleString('ru-RU')} {t.currency}
                  </td>
                  <td className={td}>
                    {t.booked_seats}/{t.max_seats}
                  </td>
                  <td className={td}>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        t.is_active ? 'bg-[#E3F4F1] text-teal' : 'bg-[#F2EDED] text-[#9A8E8E]'
                      }`}
                    >
                      {t.is_active ? 'Активен' : 'Скрыт'}
                    </span>
                  </td>
                  <td className={td}>
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
