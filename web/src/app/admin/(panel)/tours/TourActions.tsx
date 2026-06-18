'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteTour, toggleTourActive } from './actions';

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

  function onToggle() {
    startTransition(async () => {
      await toggleTourActive(id, !isActive);
      toast.success(isActive ? 'Тур скрыт' : 'Тур показан');
      router.refresh();
    });
  }

  function onDelete() {
    if (!confirm(`Удалить тур «${title}»? Действие необратимо.`)) return;
    startTransition(async () => {
      await deleteTour(id);
      toast.success('Тур удалён');
      router.refresh();
    });
  }

  const btn =
    'rounded-lg border border-edge bg-white px-2.5 py-1.5 text-[13px] disabled:opacity-60';

  return (
    <div className="flex gap-2">
      <button type="button" onClick={onToggle} disabled={pending} className={btn}>
        {isActive ? 'Скрыть' : 'Показать'}
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        className={`${btn} border-[#F1C9C3] text-[#C0564B]`}
      >
        Удалить
      </button>
    </div>
  );
}
