import { getContentMapAdmin } from '@/lib/site-content-data';
import { PageHeader } from '@/components/admin/Page';
import ContentForm from './ContentForm';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const values = await getContentMapAdmin();
  return (
    <div>
      <PageHeader title="Կայքի բովանդակություն" subtitle="Դատարկ = օգտագործվում է կանխադրված արժեքը։" />
      <ContentForm values={values} />
    </div>
  );
}
