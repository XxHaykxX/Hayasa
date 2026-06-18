import { createTour } from '../actions';
import TourForm from '../TourForm';

export const dynamic = 'force-dynamic';

export default function NewTourPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Новый тур</h1>
      <TourForm action={createTour} />
    </div>
  );
}
