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
import ImportExportBar from './ImportExportBar';

export const dynamic = 'force-dynamic';

const SORTS: { value: string; label: string }[] = [
  { value: 'created_desc', label: 'Սկզբում նորերը' },
  { value: 'created_asc', label: 'Սկզբում հները' },
  { value: 'date_asc', label: 'Տուրի ամսաթիվ ↑' },
  { value: 'date_desc', label: 'Տուրի ամսաթիվ ↓' },
  { value: 'price_asc', label: 'Գին ↑' },
  { value: 'price_desc', label: 'Գին ↓' },
  { value: 'name_asc', label: 'Անվանումն Ա→Ֆ' },
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
  const sort = searchParams.sort ?? 'created_desc';

  const tours = await listTours({ q, country, category, status, sort });
  const filtered = !!(q || country !== 'all' || category !== 'all' || status !== 'all');

  return (
    <div>
      <PageHeader
        title="Տուրեր"
        subtitle={`${filtered ? 'Գտնվեց' : 'Ընդամենը'}: ${tours.length}`}
        action={<AdminButton href="/admin/tours/new">+ Նոր տուր</AdminButton>}
      />

      <ImportExportBar />

      {/* Filters */}
      <form method="get" className="mb-[18px] flex flex-wrap items-center gap-2.5">
        <input name="q" defaultValue={q} placeholder="Որոնում ըստ անվան կամ վայրի" className="hb-in max-w-[260px]" />
        <select name="country" defaultValue={country} className="hb-in w-auto">
          <option value="all">Բոլոր երկրները</option>
          {TOUR_COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {COUNTRY_LABEL[c]}
            </option>
          ))}
        </select>
        <select name="category" defaultValue={category} className="hb-in w-auto">
          <option value="all">Բոլոր կատեգորիաները</option>
          {TOUR_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status} className="hb-in w-auto">
          <option value="all">Բոլոր կարգավիճակները</option>
          <option value="active">Ակտիվ</option>
          <option value="hidden">Թաքնված</option>
        </select>
        <select name="sort" defaultValue={sort} className="hb-in w-auto">
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <AdminButton type="submit">Կիրառել</AdminButton>
        {filtered && (
          <AdminButton variant="ghost" href="/admin/tours">
            Զրոյացնել
          </AdminButton>
        )}
      </form>

      {tours.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-edge bg-white p-10 text-center text-muted">
          {filtered ? 'Զտիչով տուրեր չեն գտնվել.' : 'Տուրեր դեռ չկան. Ստեղծեք առաջինը կամ լրացրեք mock-տվյալներից.'}
        </div>
      ) : (
        <ToursTableClient tours={tours} />
      )}
    </div>
  );
}
