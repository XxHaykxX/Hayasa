'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Calendar, Settings, PanelLeftClose, PanelLeftOpen, LogOut } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Дашборд', Icon: Home, exact: true },
  { href: '/admin/tours', label: 'Туры', Icon: Map, exact: false },
  { href: '/admin/bookings', label: 'Брони', Icon: Calendar, exact: false },
  { href: '/admin/content', label: 'Контент', Icon: Settings, exact: false },
];

export function AdminSidebar({ email, signOut }: { email: string; signOut: () => void | Promise<void> }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-shrink-0 flex-col bg-navy text-white transition-[width] duration-300 ${
        open ? 'w-60' : 'w-[68px]'
      }`}
    >
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-[18px]">
        <div className="grid size-9 flex-none place-content-center rounded-lg bg-teal font-display text-lg font-bold">H</div>
        {open && (
          <span className="whitespace-nowrap font-display text-lg font-bold">
            Hayasa <span className="text-[#5FD0DE]">Admin</span>
          </span>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map(({ href, label, Icon, exact }) => {
          const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                open ? '' : 'justify-center'
              } ${active ? 'bg-teal text-white shadow-sm' : 'text-[#CDE3E6] hover:bg-white/10 hover:text-white'}`}
            >
              <Icon className="h-[18px] w-[18px] flex-none" />
              {open && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        {open && <div className="break-all px-2 pb-2 text-xs text-[#9FB8C0]">{email}</div>}
        <form action={signOut}>
          <button
            type="submit"
            title="Выйти"
            className={`flex w-full items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm transition-colors hover:bg-white/20 ${
              open ? '' : 'justify-center'
            }`}
          >
            <LogOut className="h-[18px] w-[18px] flex-none" />
            {open && 'Выйти'}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          title={open ? 'Свернуть меню' : 'Развернуть меню'}
          className={`mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#9FB8C0] transition-colors hover:bg-white/10 hover:text-white ${
            open ? '' : 'justify-center'
          }`}
        >
          {open ? <PanelLeftClose className="h-[18px] w-[18px] flex-none" /> : <PanelLeftOpen className="h-[18px] w-[18px] flex-none" />}
          {open && 'Свернуть'}
        </button>
      </div>
    </aside>
  );
}
