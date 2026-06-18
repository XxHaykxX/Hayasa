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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-60 flex-shrink-0 flex-col bg-navy px-4 py-6 text-white">
        <div className="px-2 pb-6 text-xl font-bold">
          Hayasa <span className="text-[#5FD0DE]">Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#CDE3E6] transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="break-all px-2 pb-2.5 text-xs text-[#9FB8C0]">{admin.email}</div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full rounded-xl bg-white/10 px-3 py-2.5 text-sm transition-colors hover:bg-white/20"
            >
              Выйти
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="max-w-[1200px] flex-1 px-10 py-8">{children}</main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
