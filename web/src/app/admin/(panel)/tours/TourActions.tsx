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

  const btn: React.CSSProperties = {
    border: '1px solid #D0E8E4',
    background: '#fff',
    borderRadius: 8,
    padding: '6px 10px',
    fontSize: 13,
    cursor: pending ? 'default' : 'pointer',
    opacity: pending ? 0.6 : 1,
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button type="button" onClick={onToggle} disabled={pending} style={btn}>
        {isActive ? 'Скрыть' : 'Показать'}
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        style={{ ...btn, color: '#C0564B', borderColor: '#F1C9C3' }}
      >
        Удалить
      </button>
    </div>
  );
}
