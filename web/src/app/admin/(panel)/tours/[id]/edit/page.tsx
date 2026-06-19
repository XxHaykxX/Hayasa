import { notFound } from 'next/navigation';
import { getTourRow, listTourPhotos } from '@/lib/admin-tours-data';
import { listStops } from '@/lib/admin-stops-data';
import { updateTour } from '../../actions';
import TourForm from '../../TourForm';
import TourPhotosManager from './TourPhotosManager';
import StopsManager from './StopsManager';

export const dynamic = 'force-dynamic';

export default async function EditTourPage({ params }: { params: { id: string } }) {
  const tour = await getTourRow(params.id);
  if (!tour) notFound();

  const action = updateTour.bind(null, tour.id);
  const [stops, photos] = await Promise.all([listStops(tour.id), listTourPhotos(tour.id)]);

  return (
    <div className="max-w-[720px]">
      <h1 className="mb-5 text-[26px] font-bold text-navy">Редактирование тура</h1>
      <TourForm action={action} initial={tour} />

      <TourPhotosManager tourId={tour.id} photos={photos} />

      <div className="mt-9 border-t-2 border-[#E3EEEC] pt-7">
        <StopsManager tourId={tour.id} stops={stops} />
      </div>
    </div>
  );
}
