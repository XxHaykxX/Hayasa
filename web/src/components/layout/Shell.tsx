import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ContactWidget } from './ContactWidget';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-[68px]">{children}</main>
      <Footer />
      <ContactWidget />
    </div>
  );
}
