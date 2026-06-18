import { notFound } from 'next/navigation';
import { getPublicTour } from '@/lib/db';
import BookingClient from './BookingClient';

export const dynamic = 'force-dynamic';

export default async function BookingPage({ params: { id } }: { params: { locale: string; id: string } }) {
  const tour = await getPublicTour(id);
  if (!tour) notFound();
  return <BookingClient tour={tour} />;
}
