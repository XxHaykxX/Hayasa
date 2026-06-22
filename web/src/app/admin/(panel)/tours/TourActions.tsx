'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AdminButton } from '@/components/admin/AdminButton';
import { useConfirm } from '@/components/admin/ConfirmProvider';
import { deleteTour, toggleTourActive, duplicateTour } from './actions';

export default function TourActions({
  id,
  isActive,
  title,
}: {
  id: string;
  isActive: boolean;
  title: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const confirm = useConfirm();

  function onToggle() {
    startTransition(async () => {
      await toggleTourActive(id, !isActive);
      toast.success(isActive ? 'Тур скрыт' : 'Тур показан');
      router.refresh();
    });
  }

  async function onDelete() {
    const ok = await confirm({
      title: 'Удалить тур?',
      body: `«${title}» — действие необратимо.`,
      confirmLabel: 'Удалить',
      destructive: true,
    });
    if (!ok) return;
    startTransition(async () => {
      await deleteTour(id);
      toast.success('Тур удалён');
      router.refresh();
    });
  }

  function onDuplicate() {
    startTransition(async () => {
      await duplicateTour(id);
      toast.success('Создана копия (скрытая)');
      router.refresh();
    });
  }

  return (
    <div className="flex gap-2">
      <AdminButton variant="secondary" size="sm" onClick={onToggle} disabled={pending}>
        {isActive ? 'Скрыть' : 'Показать'}
      </AdminButton>
      <AdminButton variant="secondary" size="sm" onClick={onDuplicate} disabled={pending}>
        Дубликат
      </AdminButton>
      <AdminButton variant="destructive" size="sm" onClick={onDelete} disabled={pending}>
        Удалить
      </AdminButton>
    </div>
  );
}
