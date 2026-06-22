import { listTours } from '@/lib/admin-tours-data';
import {
  CATEGORY_LABEL,
  COUNTRY_LABEL,
  TOUR_CATEGORIES,
  TOUR_COUNTRIES,
} from '@/lib/admin-tours';
import { PageHeader } from '@/components/admin/Page';
import { AdminButton } from '@/components/admin/AdminButton';
import ToursTableClient from './ToursTableClient';

export const dynamic = 'force-dynamic';

const SORTS: { value: string; label: string }[] = [
  { value: 'date_asc', label: 'Дата ↑' },
  { value: 'date_desc', label: 'Дата ↓' },
  { value: 'price_asc', label: 'Цена ↑' },
  { value: 'price_desc', label: 'Цена ↓' },
  { value: 'name_asc', label: 'Название А→Я' },
];

export default async function AdminToursPage({
  searchParams,
}: {
  searchParams: { q?: string; country?: string; category?: string; status?: string; sort?: string };
}) {
  const q = searchParams.q ?? '';
  const country = searchParams.country ?? 'all';
  const category = searchParams.category ?? 'all';
  const status = searchParams.status ?? 'all';
  const sort = searchParams.sort ?? 'date_asc';

  const tours = await listTours({ q, country, category, status, sort });
  const filtered = !!(q || country !== 'all' || category !== 'all' || status !== 'all');

  return (
    <div>
      <PageHeader
        title="Туры"
        subtitle={`${filtered ? 'Найдено' : 'Всего'}: ${tours.length}`}
        action={<AdminButton href="/admin/tours/new">+ Новый тур</AdminButton>}
      />

      {/* Filters */}
      <form method="get" className="mb-[18px] flex flex-wrap items-center gap-2.5">
        <input name="q" defaultValue={q} placeholder="Поиск по названию или локации" className="hb-in max-w-[260px]" />
        <select name="country" defaultValue={country} className="hb-in w-auto">
          <option value="all">Все страны</option>
          {TOUR_COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {COUNTRY_LABEL[c]}
            </option>
          ))}
        </select>
        <select name="category" defaultValue={category} className="hb-in w-auto">
          <option value="all">Все категории</option>
          {TOUR_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status} className="hb-in w-auto">
          <option value="all">Все статусы</option>
          <option value="active">Активные</option>
          <option value="hidden">Скрытые</option>
        </select>
        <select name="sort" defaultValue={sort} className="hb-in w-auto">
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <AdminButton type="submit">Применить</AdminButton>
        {filtered && (
          <AdminButton variant="ghost" href="/admin/tours">
            Сбросить
          </AdminButton>
        )}
      </form>

      {tours.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-edge bg-white p-10 text-center text-muted">
          {filtered ? 'Туры по фильтру не найдены.' : 'Туров пока нет. Создайте первый или засейте из mock-данных.'}
        </div>
      ) : (
        <ToursTableClient tours={tours} />
      )}
    </div>
  );
}
