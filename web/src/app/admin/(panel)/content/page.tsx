import { getContentMapAdmin } from '@/lib/site-content-data';
import ContentForm from './ContentForm';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const values = await getContentMapAdmin();
  return (
    <div>
      <h1 className="mb-1.5 text-[26px] font-bold text-navy">Контент сайта</h1>
      <p className="mb-6 text-sm text-muted">Пусто = используется значение по умолчанию.</p>
      <ContentForm values={values} />
    </div>
  );
}
