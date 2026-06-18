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

const CARD: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #D0E8E4',
  borderRadius: 16,
  padding: '20px 22px',
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={CARD}>
      <div style={{ fontSize: 32, fontWeight: 700, color: '#1A7A8A' }}>{value}</div>
      <div style={{ fontSize: 14, color: '#6B8585', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Дашборд</h1>
      <p style={{ color: '#6B8585', marginBottom: 28 }}>Обзор сайта Hayasa Tours.</p>

      {counts ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
            maxWidth: 760,
          }}
        >
          <Stat label="Всего туров" value={counts.tours} />
          <Stat label="Активных туров" value={counts.activeTours} />
          <Stat label="Всего броней" value={counts.bookings} />
          <Stat label="Броней в ожидании" value={counts.pending} />
        </div>
      ) : (
        <div style={{ ...CARD, color: '#C0564B', maxWidth: 520 }}>
          Не удалось получить данные. Проверьте подключение к Supabase.
        </div>
      )}
    </div>
  );
}
