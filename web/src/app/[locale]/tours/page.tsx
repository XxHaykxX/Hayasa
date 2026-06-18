import { getPublicTours } from '@/lib/db';
import ToursClient from './ToursClient';

export const revalidate = 300;

export default async function ToursPage() {
  const tours = await getPublicTours();
  return <ToursClient tours={tours} />;
}
