import { createTour } from '../actions';
import { PageHeader } from '@/components/admin/Page';
import { ImportFromUrl } from '../ImportFromUrl';
import TourForm from '../TourForm';

export const dynamic = 'force-dynamic';

export default function NewTourPage() {
  return (
    <div className="max-w-[720px]">
      <PageHeader title="Новый тур" />
      <ImportFromUrl />
      <TourForm action={createTour} />
    </div>
  );
}
