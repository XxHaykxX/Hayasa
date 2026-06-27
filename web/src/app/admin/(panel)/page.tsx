import Link from 'next/link';
import { Map, Compass, Calendar, Clock, Users, Plus } from 'lucide-react';
import { createServiceSupabase, createServerSupabase } from '@/lib/supabase-server';
import { STATUS_LABEL, STATUS_COLOR } from '@/lib/admin-bookings';
import { PageHeader } from '@/components/admin/Page';
import { AdminButton } from '@/components/admin/AdminButton';

export const dynamic = 'force-dynamic';

type Recent = {
  id: string;
  full_name: string;
  seats: number;
  status: keyof typeof STATUS_LABEL;
  created_at: string;
  tours: { title_ru: string | null; title_hy: string | null } | null;
};

async function getData() {
  const db = createServiceSupabase() ?? createServerSupabase();
  if (!db) return null;
  const [tours, activeTours, bookings, pending, seats, recent] = await Promise.all([
    db.from('tours').select('*', { count: 'exact', head: true }),
    db.from('tours').select('*', { count: 'exact', head: true }).eq('is_active', true),
    db.from('bookings').select('*', { count: 'exact', head: true }),
    db.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    db.from('bookings').select('seats'),
    db
      .from('bookings')
      .select('id,full_name,seats,status,created_at,tours(title_ru,title_hy)')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);
  const seatsTotal = (seats.data ?? []).reduce((s, b) => s + ((b.seats as number) || 0), 0);
  return {
    tours: tours.count ?? 0,
    activeTours: activeTours.count ?? 0,
    bookings: bookings.count ?? 0,
    pending: pending.count ?? 0,
    seatsTotal,
    recent: (recent.data ?? []) as unknown as Recent[],
  };
}

function StatCard({
  Icon,
  label,
  value,
  tint,
}: {
  Icon: typeof Map;
  label: string;
  value: number;
  tint: { bg: string; fg: string };
}) {
  return (
    <div className="rounded-2xl border border-edge bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 inline-flex rounded-xl p-2.5" style={{ background: tint.bg }}>
        <Icon className="h-5 w-5" style={{ color: tint.fg }} />
      </div>
      <div className="font-mono text-[28px] font-bold leading-none text-navy">{value.toLocaleString('hy-AM')}</div>
      <div className="mt-1.5 text-sm text-muted">{label}</div>
    </div>
  );
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleString('hy-AM', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

export default async function AdminDashboard() {
  const d = await getData();

  return (
    <div>
      <PageHeader
        title="Վահանակ"
        subtitle="Hayasa Tours կայքի ակնարկ։"
        action={
          <AdminButton href="/admin/tours/new">
            <Plus className="h-4 w-4" /> Նոր տուր
          </AdminButton>
        }
      />

      {!d ? (
        <div className="max-w-[520px] rounded-2xl border border-edge bg-white px-[22px] py-5 text-[#C0564B]">
          Չհաջողվեց ստանալ տվյալները։ Ստուգեք Supabase-ի կապը։
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-3">
            <StatCard Icon={Map} label="Ընդամենը տուրեր" value={d.tours} tint={{ bg: '#E3F4F1', fg: '#1A7A8A' }} />
            <StatCard Icon={Compass} label="Ակտիվ" value={d.activeTours} tint={{ bg: '#E4F4EC', fg: '#2A9D6A' }} />
            <StatCard Icon={Calendar} label="Ընդամենը ամրագրումներ" value={d.bookings} tint={{ bg: '#E7EFF6', fg: '#1A3A5C' }} />
            <StatCard Icon={Clock} label="Սպասման մեջ" value={d.pending} tint={{ bg: '#FCEDEB', fg: '#E2685E' }} />
            <StatCard Icon={Users} label="Ամրագրված տեղեր" value={d.seatsTotal} tint={{ bg: '#E3F4F1', fg: '#1A7A8A' }} />
          </div>

          <div className="rounded-2xl border border-edge bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-navy">Վերջին ամրագրումներ</h2>
              <Link href="/admin/bookings" className="text-sm font-medium text-teal hover:text-teal-dark">
                Բոլոր ամրագրումները
              </Link>
            </div>
            {d.recent.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">Ամրագրումներ դեռ չկան։</p>
            ) : (
              <div className="divide-y divide-[#EAF2F1]">
                {d.recent.map((b) => {
                  const color = STATUS_COLOR[b.status];
                  const tour = b.tours?.title_hy || b.tours?.title_ru || '—';
                  return (
                    <div key={b.id} className="flex items-center gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-navy">{b.full_name}</div>
                        <div className="truncate text-xs text-muted">{tour}</div>
                      </div>
                      <div className="hidden text-xs text-muted sm:block">տեղեր: {b.seats}</div>
                      <span
                        className="rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{ background: color.bg, color: color.fg }}
                      >
                        {STATUS_LABEL[b.status]}
                      </span>
                      <div className="w-[92px] flex-none text-right text-xs text-muted">{fmt(b.created_at)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
