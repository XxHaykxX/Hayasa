import type { Metadata } from 'next';
import TravelConnectSignIn from '@/components/ui/travel-connect-signin-1';

// Sign-in page — no SEO value, keep out of the index.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AuthPage() {
  return <TravelConnectSignIn />;
}
