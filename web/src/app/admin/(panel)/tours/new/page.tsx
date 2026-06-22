import { createTour } from '../actions';
import { PageHeader } from '@/components/admin/Page';
import TourForm from '../TourForm';

export const dynamic = 'force-dynamic';

export default function NewTourPage() {
  return (
    <div className="max-w-[720px]">
      <PageHeader title="Новый тур" />
      <TourForm action={createTour} />
    </div>
  );
}
