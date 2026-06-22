import { getContentMapAdmin } from '@/lib/site-content-data';
import { PageHeader } from '@/components/admin/Page';
import ContentForm from './ContentForm';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const values = await getContentMapAdmin();
  return (
    <div>
      <PageHeader title="Контент сайта" subtitle="Пусто = используется значение по умолчанию." />
      <ContentForm values={values} />
    </div>
  );
}
