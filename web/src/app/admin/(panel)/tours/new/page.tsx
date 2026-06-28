import { createTour } from '../actions';
import { PageHeader } from '@/components/admin/Page';
import { ImportFromUrl } from '../ImportFromUrl';
import TourForm from '../TourForm';

export const dynamic = 'force-dynamic';

export default function NewTourPage() {
  return (
    <div className="max-w-[720px]">
      <PageHeader
        title="Նոր տուր"
        subtitle="Լրացրեք հիմնականը և պահպանեք — անմիջապես կբացվի խմբագրիչը, որտեղ կավելացնեք կանգառներ, լուսանկարներ, կոորդինատներ և մարզ."
      />
      <ImportFromUrl />
      <TourForm action={createTour} />
    </div>
  );
}
