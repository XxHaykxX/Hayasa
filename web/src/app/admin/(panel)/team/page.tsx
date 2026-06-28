import { requireAdmin } from '@/lib/admin-auth';
import { listTeam } from '@/lib/admin-users-data';
import { PageHeader, AdminCard } from '@/components/admin/Page';
import CreateAdminForm from './CreateAdminForm';
import { setAdmin } from './actions';

export const dynamic = 'force-dynamic';

const th = 'px-3 pb-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted';
const td = 'border-t border-[#EAF2F1] px-3 py-3 align-middle text-sm';

function fmtDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('hy-AM', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function TeamPage() {
  const me = await requireAdmin();
  const team = await listTeam();
  const adminCount = team.filter((m) => m.is_admin).length;

  return (
    <div>
      <PageHeader title="Թիմ" subtitle={`Ադմիններ: ${adminCount} · ընդամենը հաշիվներ: ${team.length}`} />

      <AdminCard className="mb-6 p-6">
        <h2 className="mb-1 text-base font-bold text-navy">Նոր ադմինիստրատոր</h2>
        <p className="mb-4 text-xs text-muted">Ստեղծում է վահանակի լրիվ հասանելիությամբ հաշիվ և անմիջապես տալիս ադմինի իրավունքներ։</p>
        <CreateAdminForm />
      </AdminCard>

      <AdminCard className="overflow-x-auto p-4">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className={th}>Էլ. փոստ</th>
              <th className={th}>Դեր</th>
              <th className={th}>Ստեղծվել է</th>
              <th className={`${th} text-right`}>Գործողություն</th>
            </tr>
          </thead>
          <tbody>
            {team.map((m) => {
              const isMe = m.id === me.id;
              return (
                <tr key={m.id}>
                  <td className={td}>
                    {m.email ?? '—'}
                    {isMe && <span className="ml-2 text-xs text-muted">(դուք)</span>}
                  </td>
                  <td className={td}>
                    {m.is_admin ? (
                      <span className="inline-flex items-center rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal-dark">
                        Ադմին
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-[#F1F5F4] px-2.5 py-1 text-xs font-semibold text-muted">
                        Օգտատեր
                      </span>
                    )}
                  </td>
                  <td className={`${td} whitespace-nowrap text-muted`}>{fmtDate(m.created_at)}</td>
                  <td className={`${td} text-right`}>
                    {m.is_admin && isMe ? (
                      <span className="text-xs text-muted">—</span>
                    ) : (
                      <form action={setAdmin} className="inline">
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="makeAdmin" value={m.is_admin ? 'false' : 'true'} />
                        <button
                          type="submit"
                          className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                            m.is_admin
                              ? 'border-[#F1C9C3] bg-white text-amber hover:bg-[#FCEDEB]'
                              : 'border-edge bg-white text-navy hover:border-teal hover:text-teal'
                          }`}
                        >
                          {m.is_admin ? 'Հեռացնել իրավունքները' : 'Դարձնել ադմին'}
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
            {team.length === 0 && (
              <tr>
                <td className={`${td} text-center text-muted`} colSpan={4}>
                  Հաշիվներ չկան։
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
