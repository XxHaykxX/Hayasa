import { createTour } from '../actions';
import TourForm from '../TourForm';

export const dynamic = 'force-dynamic';

export default function NewTourPage() {
  return (
    <div className="max-w-[720px]">
      <h1 className="mb-5 text-[26px] font-bold text-navy">Новый тур</h1>
      <TourForm action={createTour} />
    </div>
  );
}
