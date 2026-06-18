import Link from 'next/link';
import { Toaster } from 'sonner';
import { requireAdmin } from '@/lib/admin-auth';
import { signOutAction } from './actions';

const NAV = [
  { href: '/admin', label: 'Дашборд' },
  { href: '/admin/tours', label: 'Туры' },
  { href: '/admin/bookings', label: 'Брони' },
  { href: '/admin/content', label: 'Контент' },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: '#1A3A5C',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px',
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, padding: '0 8px 24px' }}>
          Hayasa <span style={{ color: '#5FD0DE' }}>Admin</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: '#CDE3E6',
                textDecoration: 'none',
                padding: '10px 12px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 16, marginTop: 16 }}>
          <div style={{ fontSize: 12, color: '#9FB8C0', padding: '0 8px 10px', wordBreak: 'break-all' }}>
            {admin.email}
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Выйти
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '32px 40px', maxWidth: 1200 }}>{children}</main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
