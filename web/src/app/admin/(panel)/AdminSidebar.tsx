'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Calendar, Settings, Users, Image as ImageIcon, PanelLeftClose, PanelLeftOpen, LogOut, Menu, X } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Վահանակ', Icon: Home, exact: true },
  { href: '/admin/tours', label: 'Տուրեր', Icon: Map, exact: false },
  { href: '/admin/gallery', label: 'Պատկերասրահ', Icon: ImageIcon, exact: false },
  { href: '/admin/bookings', label: 'Ամրագրումներ', Icon: Calendar, exact: false },
  { href: '/admin/content', label: 'Բովանդակություն', Icon: Settings, exact: false },
  { href: '/admin/team', label: 'Թիմ', Icon: Users, exact: false },
];

export function AdminSidebar({ email, signOut }: { email: string; signOut: () => void | Promise<void> }) {
  const [open, setOpen] = useState(true); // desktop expanded/collapsed
  const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar with hamburger */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-edge bg-white px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Բացել մենյուն"
          className="rounded-lg border border-edge p-2 text-navy"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-display text-lg font-bold text-navy">
          Hayasa <span className="text-teal">Admin</span>
        </span>
      </div>

      {/* Backdrop (mobile, when drawer open) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} aria-hidden />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col bg-navy text-white transition-transform duration-300 md:sticky md:top-0 md:z-auto md:translate-x-0 md:transition-[width] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } w-60 ${open ? 'md:w-60' : 'md:w-[68px]'}`}
      >
        <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-[18px]">
          <div className="grid size-9 flex-none place-content-center rounded-lg bg-teal font-display text-lg font-bold">H</div>
          {open && (
            <span className="whitespace-nowrap font-display text-lg font-bold">
              Hayasa <span className="text-[#5FD0DE]">Admin</span>
            </span>
          )}
          {/* Close button (mobile only) */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Փակել մենյուն"
            className="ml-auto rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map(({ href, label, Icon, exact }) => {
            const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                title={label}
                onClick={() => setMobileOpen(false)}
                className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                  open ? '' : 'md:justify-center'
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
              title="Ելք"
              className={`flex w-full items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm transition-colors hover:bg-white/20 ${
                open ? '' : 'md:justify-center'
              }`}
            >
              <LogOut className="h-[18px] w-[18px] flex-none" />
              {open && 'Ելք'}
            </button>
          </form>
          {/* Desktop collapse toggle (hidden on mobile — drawer is full width there) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            title={open ? 'Ծալել մենյուն' : 'Բացել մենյուն'}
            className={`mt-2 hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#9FB8C0] transition-colors hover:bg-white/10 hover:text-white md:flex ${
              open ? '' : 'md:justify-center'
            }`}
          >
            {open ? <PanelLeftClose className="h-[18px] w-[18px] flex-none" /> : <PanelLeftOpen className="h-[18px] w-[18px] flex-none" />}
            {open && 'Ծալել'}
          </button>
        </div>
      </aside>
    </>
  );
}
