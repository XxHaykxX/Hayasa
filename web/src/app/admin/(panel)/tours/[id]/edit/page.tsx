import { notFound } from 'next/navigation';
import { getTourRow, listTourPhotos } from '@/lib/admin-tours-data';
import { listStops } from '@/lib/admin-stops-data';
import { updateTour } from '../../actions';
import { PageHeader } from '@/components/admin/Page';
import TourForm from '../../TourForm';
import TourPhotosManager from './TourPhotosManager';
import StopsManager from './StopsManager';

export const dynamic = 'force-dynamic';

export default async function EditTourPage({ params }: { params: { id: string } }) {
  const tour = await getTourRow(params.id);
  if (!tour) notFound();

  const action = updateTour.bind(null, tour.id);
  const [stops, photos] = await Promise.all([listStops(tour.id), listTourPhotos(tour.id)]);
  const name = tour.title_hy || tour.title_ru || 'Без названия';

  return (
    <div className="max-w-[720px]">
      <PageHeader
        title="Редактирование тура"
        subtitle={name}
        action={
          <nav className="flex gap-3 text-sm font-medium">
            <a href="#photos" className="text-teal hover:text-teal-dark">Фото</a>
            <a href="#stops" className="text-teal hover:text-teal-dark">Остановки</a>
          </nav>
        }
      />
      <TourForm action={action} initial={tour} />

      <div id="photos" className="scroll-mt-6">
        <TourPhotosManager tourId={tour.id} photos={photos} />
      </div>

      <div id="stops" className="mt-9 scroll-mt-6 border-t-2 border-[#E3EEEC] pt-7">
        <StopsManager tourId={tour.id} stops={stops} />
      </div>
    </div>
  );
}
