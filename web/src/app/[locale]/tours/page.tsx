import { getPublicTours } from '@/lib/db';
import ToursClient from './ToursClient';

export const dynamic = 'force-dynamic';

export default async function ToursPage() {
  const tours = await getPublicTours();
  return <ToursClient tours={tours} />;
}
