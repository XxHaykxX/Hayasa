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
    <div className="max-w-[720px]">
      <h1 className="mb-5 text-[26px] font-bold text-navy">Редактирование тура</h1>
      <TourForm action={action} initial={tour} />

      <div className="mt-9 border-t-2 border-[#E3EEEC] pt-7">
        <StopsManager tourId={tour.id} stops={stops} />
      </div>
    </div>
  );
}
