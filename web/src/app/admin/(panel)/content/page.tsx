import { getContentMapAdmin } from '@/lib/site-content-data';
import ContentForm from './ContentForm';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const values = await getContentMapAdmin();
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Контент сайта</h1>
      <p style={{ color: '#6B8585', fontSize: 14, marginBottom: 24 }}>
        Контактные данные. Пусто = используется значение по умолчанию из кода.
      </p>
      <ContentForm values={values} />
    </div>
  );
}
