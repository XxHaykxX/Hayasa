import { createServiceSupabase, createServerSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

async function getCounts() {
  const db = createServiceSupabase() ?? createServerSupabase();
  if (!db) return null;

  const [tours, activeTours, bookings, pending] = await Promise.all([
    db.from('tours').select('*', { count: 'exact', head: true }),
    db.from('tours').select('*', { count: 'exact', head: true }).eq('is_active', true),
    db.from('bookings').select('*', { count: 'exact', head: true }),
    db.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  return {
    tours: tours.count ?? 0,
    activeTours: activeTours.count ?? 0,
    bookings: bookings.count ?? 0,
    pending: pending.count ?? 0,
  };
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-edge bg-white px-[22px] py-5">
      <div className="text-[32px] font-bold text-teal">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="mb-1.5 text-[26px] font-bold text-navy">Дашборд</h1>
      <p className="mb-7 text-muted">Обзор сайта Hayasa Tours.</p>

      {counts ? (
        <div className="grid max-w-[760px] grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          <Stat label="Всего туров" value={counts.tours} />
          <Stat label="Активных туров" value={counts.activeTours} />
          <Stat label="Всего броней" value={counts.bookings} />
          <Stat label="Броней в ожидании" value={counts.pending} />
        </div>
      ) : (
        <div className="max-w-[520px] rounded-2xl border border-edge bg-white px-[22px] py-5 text-[#C0564B]">
          Не удалось получить данные. Проверьте подключение к Supabase.
        </div>
      )}
    </div>
  );
}
