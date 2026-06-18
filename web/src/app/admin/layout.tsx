import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

// Admin panel is RU-only and lives outside next-intl. This is a separate
// root layout (the localized site has its own under [locale]).
const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Админ — Hayasa Tours',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="bg-[#F4F8F8] font-body text-navy antialiased">{children}</body>
    </html>
  );
}
