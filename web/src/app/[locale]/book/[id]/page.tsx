import { notFound } from 'next/navigation';
import { getPublicTour } from '@/lib/db';
import { getContact } from '@/lib/site-content-data';
import BookingClient from './BookingClient';

export const dynamic = 'force-dynamic';

export default async function BookingPage({ params: { id, locale } }: { params: { locale: string; id: string } }) {
  const tour = await getPublicTour(id, locale);
  if (!tour) notFound();
  const contact = await getContact();
  return <BookingClient tour={tour} office={contact.address} />;
}
