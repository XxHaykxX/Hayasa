'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteTourPhoto, reorderTourPhotos } from '../../actions';
import type { TourPhotoRow } from '@/lib/admin-tours-data';

export default function TourPhotosManager({ tourId, photos }: { tourId: string; photos: TourPhotoRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [items, setItems] = useState(photos);
  const dragIndex = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // Keep local order in sync when the server sends a fresh list (after save/delete).
  useEffect(() => setItems(photos), [photos]);

  if (items.length === 0) return null;

  const onDelete = (id: string) => {
    if (!confirm('Удалить фото?')) return;
    startTransition(async () => {
      await deleteTourPhoto(id, tourId);
      toast.success('Фото удалено');
      router.refresh();
    });
  };

  const persist = (next: TourPhotoRow[]) => {
    startTransition(async () => {
      await reorderTourPhotos(tourId, next.map((p) => p.id));
      toast.success('Порядок сохранён');
      router.refresh();
    });
  };

  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= items.length) return;
    const next = items.slice();
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setItems(next);
    persist(next);
  };

  const onDrop = (to: number) => {
    const from = dragIndex.current;
    dragIndex.current = null;
    setOverIndex(null);
    if (from === null) return;
    move(from, to);
  };

  return (
    <div className="mb-6 rounded-2xl border border-edge bg-white p-5">
      <h2 className="mb-1 text-base font-bold text-navy">Фото тура ({items.length})</h2>
      <p className="mb-3 text-xs text-muted">Перетащите, чтобы поменять порядок. Первое фото — обложка.</p>
      <div className="flex flex-wrap gap-3">
        {items.map((p, i) => (
          <div
            key={p.id}
            draggable={!pending}
            onDragStart={() => (dragIndex.current = i)}
            onDragOver={(e) => {
              e.preventDefault();
              if (overIndex !== i) setOverIndex(i);
            }}
            onDragEnd={() => {
              dragIndex.current = null;
              setOverIndex(null);
            }}
            onDrop={() => onDrop(i)}
            className={`relative cursor-grab rounded-lg transition active:cursor-grabbing ${
              overIndex === i ? 'ring-2 ring-teal' : ''
            } ${pending ? 'opacity-60' : ''}`}
            title="Перетащите для сортировки"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.photo_url} alt="" draggable={false} className="h-[90px] w-[130px] select-none rounded-lg object-cover" />
            {i === 0 && (
              <span className="absolute left-1 top-1 rounded bg-navy/80 px-1.5 py-0.5 text-[10px] font-bold text-white">Обложка</span>
            )}
            <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded bg-black/55 text-[11px] font-bold text-white">
              {i + 1}
            </span>
            <div className="absolute bottom-1 right-1 flex gap-0.5">
              <button
                type="button"
                onClick={() => move(i, i - 1)}
                disabled={pending || i === 0}
                title="Влево"
                className="flex h-5 w-5 items-center justify-center rounded bg-white/85 text-[12px] leading-none text-navy disabled:opacity-30"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => move(i, i + 1)}
                disabled={pending || i === items.length - 1}
                title="Вправо"
                className="flex h-5 w-5 items-center justify-center rounded bg-white/85 text-[12px] leading-none text-navy disabled:opacity-30"
              >
                ›
              </button>
            </div>
            <button
              type="button"
              onClick={() => onDelete(p.id)}
              disabled={pending}
              title="Удалить фото"
              className="absolute right-1 top-1 h-[22px] w-[22px] rounded-full bg-[#C0564Bee] text-[13px] leading-[22px] text-white disabled:opacity-60"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
