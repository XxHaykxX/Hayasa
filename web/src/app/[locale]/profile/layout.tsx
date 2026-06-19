import type { Metadata } from 'next';

// Auth-gated, user-specific page — keep it out of the index.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
