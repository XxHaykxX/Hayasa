import { listMedia, listFolders } from '@/lib/admin-media-data';
import { PageHeader } from '@/components/admin/Page';
import GalleryClient from './GalleryClient';

export const dynamic = 'force-dynamic';

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string; folder?: string };
}) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const q = searchParams.q ?? '';
  const folder = searchParams.folder ?? ''; // '' = all, 'none' = root, '<uuid>'
  const [{ rows, total, pageSize }, folders] = await Promise.all([
    listMedia(page, q, folder || undefined),
    listFolders(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <PageHeader title="Պատկերասրահ" subtitle={`${q || folder ? 'Գտնվեց' : 'Ընդամենը'}՝ ${total} լուսանկար`} />
      <GalleryClient
        rows={rows}
        page={page}
        totalPages={totalPages}
        q={q}
        folder={folder}
        folders={folders.folders}
        counts={folders.counts}
        noneCount={folders.noneCount}
        totalAll={folders.total}
      />
    </div>
  );
}
