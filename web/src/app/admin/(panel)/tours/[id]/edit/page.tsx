import { notFound } from 'next/navigation';
import { getTourRow } from '@/lib/admin-tours-data';
import { listStops } from '@/lib/admin-stops-data';
import { updateTour } from '../../actions';
import TourForm from '../../TourForm';
import StopsManager from './StopsManager';

export const dynamic = 'force-dynamic';

export default async function EditTourPage({ params }: { params: { id: string } }) {
  const tour = await getTourRow(params.id);
  if (!tour) notFound();

  const action = updateTour.bind(null, tour.id);
  const stops = await listStops(tour.id);

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Редактирование тура</h1>
      <TourForm action={action} initial={tour} />

      <div style={{ marginTop: 36, paddingTop: 28, borderTop: '2px solid #E3EEEC' }}>
        <StopsManager tourId={tour.id} stops={stops} />
      </div>
    </div>
  );
}
