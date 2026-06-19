'use client';

import { useEffect, useRef, useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { StopRow } from '@/lib/admin-stops';
import { createStop, updateStop, deleteStop, addStopPhoto, deleteStopPhoto, reorderStops, reorderStopPhotos } from './stops-actions';
import type { StopPhotoRow } from '@/lib/admin-stops';
import StopPlacePicker from './StopPlacePicker';

const labelCls = 'mb-1.5 block text-xs font-semibold text-navy';
const cardCls = 'mb-3.5 rounded-2xl border border-edge bg-white p-[18px]';
const errCls = 'mt-2.5 rounded-lg bg-[#FCEDEB] px-2.5 py-2 text-[13px] text-[#C0564B]';

type PlaceState = { name: string; lat: string; lng: string };

function StopFields({ stop, place, setPlace }: { stop?: StopRow; place: PlaceState; setPlace: (p: PlaceState) => void }) {
  return (
    <>
      <div className="mb-3">
        <label className={labelCls}>Поиск места на карте (координаты заполнятся сами)</label>
        <StopPlacePicker value={place} onChange={(patch) => setPlace({ ...place, ...patch })} />
      </div>
      <input type="hidden" name="latitude" value={place.lat} />
      <input type="hidden" name="longitude" value={place.lng} />
      {place.lat && place.lng && (
        <p className="mb-3 text-[12px] text-muted">Координаты с карты: {place.lat}, {place.lng}</p>
      )}
      <div className="grid gap-2.5">
        <div>
          <label className={labelCls}>Название HY *</label>
          <input name="name_hy" className="hb-in" value={place.name} onChange={(e) => setPlace({ ...place, name: e.target.value })} required />
        </div>
        <textarea name="description_hy" className="hb-in" rows={2} placeholder="Описание HY" defaultValue={stop?.description_hy ?? ''} />
      </div>
      <div className="mt-2.5">
        <label className={labelCls}>Длительность (напр. «50–60 мин»)</label>
        <input name="duration" className="hb-in" defaultValue={stop?.duration ?? ''} placeholder="50–60 мин" />
      </div>
      <details className="mt-3 rounded-xl border border-edge bg-[#FAFCFC] p-3">
        <summary className="cursor-pointer list-none text-[13px] font-semibold text-navy">
          Переводы · RU / EN <span className="font-normal text-muted">(необязательно)</span>
        </summary>
        <div className="mt-3 grid gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className={labelCls}>Название RU</label>
              <input name="name_ru" className="hb-in" defaultValue={stop?.name_ru ?? ''} />
            </div>
            <div>
              <label className={labelCls}>Название EN</label>
              <input name="name_en" className="hb-in" defaultValue={stop?.name_en ?? ''} />
            </div>
          </div>
          <textarea name="description_ru" className="hb-in" rows={2} placeholder="Описание RU" defaultValue={stop?.description_ru ?? ''} />
          <textarea name="description_en" className="hb-in" rows={2} placeholder="Описание EN" defaultValue={stop?.description_en ?? ''} />
        </div>
      </details>
    </>
  );
}

function StopCard({ stop, index, tourId }: { stop: StopRow; index: number; tourId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [place, setPlace] = useState<PlaceState>({
    name: stop.name_hy ?? '',
    lat: stop.latitude != null ? String(stop.latitude) : '',
    lng: stop.longitude != null ? String(stop.longitude) : '',
  });
  const [photos, setPhotos] = useState<StopPhotoRow[]>(stop.stop_photos);
  const photoDrag = useRef<number | null>(null);
  const [photoOver, setPhotoOver] = useState<number | null>(null);

  // Sync photo order with the server list after upload/delete/reorder.
  useEffect(() => setPhotos(stop.stop_photos), [stop.stop_photos]);

  function movePhoto(from: number, to: number) {
    if (from === to || to < 0 || to >= photos.length) return;
    const next = photos.slice();
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setPhotos(next);
    startTransition(async () => {
      await reorderStopPhotos(stop.id, tourId, next.map((p) => p.id));
      toast.success('Порядок фото сохранён');
      router.refresh();
    });
  }

  function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('order_index', String(stop.order_index));
    setError(null);
    startTransition(async () => {
      const res = await updateStop(stop.id, tourId, { ok: true }, fd);
      if (res.ok) {
        toast.success('Остановка сохранена');
        router.refresh();
      } else {
        setError(res.error ?? 'Ошибка');
        toast.error(res.error ?? 'Ошибка');
      }
    });
  }

  function onDelete() {
    if (!confirm('Удалить остановку?')) return;
    startTransition(async () => {
      await deleteStop(stop.id, tourId);
      toast.success('Остановка удалена');
      router.refresh();
    });
  }

  function onAddPhoto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setError(null);
    startTransition(async () => {
      const res = await addStopPhoto(stop.id, tourId, { ok: true }, fd);
      if (res.ok) {
        form.reset();
        toast.success('Фото загружено');
        router.refresh();
      } else {
        setError(res.error ?? 'Ошибка загрузки');
        toast.error(res.error ?? 'Ошибка загрузки');
      }
    });
  }

  function onDeletePhoto(photoId: string) {
    startTransition(async () => {
      await deleteStopPhoto(photoId, tourId);
      toast.success('Фото удалено');
      router.refresh();
    });
  }

  return (
    <div className={cardCls}>
      <form onSubmit={onSave}>
        <div className="mb-3 flex items-center justify-between">
          <strong className="text-sm">
            <span className="mr-2 cursor-grab select-none text-muted" title="Перетащите для смены порядка">⠿</span>#{index + 1} · {place.name || '—'}
          </strong>
          <button type="button" onClick={onDelete} disabled={pending} className="rounded-lg border border-[#F1C9C3] bg-white px-2.5 py-1.5 text-xs text-[#C0564B] disabled:opacity-60">
            Удалить остановку
          </button>
        </div>
        <StopFields stop={stop} place={place} setPlace={setPlace} />
        <button type="submit" disabled={pending} className="mt-3 rounded-[10px] bg-teal px-4 py-2.5 text-[13px] font-semibold text-white disabled:opacity-60">
          {pending ? 'Сохранение…' : 'Сохранить остановку'}
        </button>
      </form>

      <div className="mt-4 border-t border-[#EAF2F1] pt-3.5">
        <div className="mb-2 text-xs font-semibold">Фото остановки {photos.length > 1 && <span className="font-normal text-muted">· перетащите для сортировки</span>}</div>
        <div data-stop-photos className="mb-2.5 flex flex-wrap gap-2.5">
          {photos.length === 0 && <span className="text-[13px] text-[#9DB6B4]">Фото нет.</span>}
          {photos.map((p, pi) => (
            <div
              key={p.id}
              draggable={!pending}
              onDragStart={(e) => {
                e.stopPropagation();
                photoDrag.current = pi;
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (photoOver !== pi) setPhotoOver(pi);
              }}
              onDrop={(e) => {
                e.stopPropagation();
                const from = photoDrag.current;
                photoDrag.current = null;
                setPhotoOver(null);
                if (from !== null) movePhoto(from, pi);
              }}
              onDragEnd={() => {
                photoDrag.current = null;
                setPhotoOver(null);
              }}
              className={`relative cursor-grab rounded-lg active:cursor-grabbing ${photoOver === pi ? 'ring-2 ring-teal' : ''} ${pending ? 'opacity-60' : ''}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photo_url} alt="" draggable={false} className="h-[74px] w-[110px] select-none rounded-lg object-cover" />
              <span className="absolute bottom-1 left-1 flex h-[18px] w-[18px] items-center justify-center rounded bg-black/55 text-[10px] font-bold text-white">
                {pi + 1}
              </span>
              <button type="button" onClick={() => onDeletePhoto(p.id)} disabled={pending} title="Удалить фото" className="absolute right-1 top-1 h-[22px] w-[22px] rounded-full border-none bg-[#C0564Bee] text-[13px] leading-[22px] text-white">
                ×
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={onAddPhoto} className="flex items-center gap-2">
          <input type="file" name="photo" accept="image/*" multiple required />
          <button type="submit" disabled={pending} className="rounded-lg border border-edge bg-white px-3 py-1.5 text-[13px]">
            {pending ? 'Загрузка…' : 'Загрузить фото'}
          </button>
        </form>
      </div>

      {error && <div className={errCls}>{error}</div>}
    </div>
  );
}

function AddStopForm({ tourId, nextIndex }: { tourId: string; nextIndex: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState<PlaceState>({ name: '', lat: '', lng: '' });

  function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('order_index', String(nextIndex));
    setError(null);
    startTransition(async () => {
      const res = await createStop(tourId, { ok: true }, fd);
      if (res.ok) {
        setOpen(false);
        setPlace({ name: '', lat: '', lng: '' });
        toast.success('Остановка добавлена');
        router.refresh();
      } else {
        setError(res.error ?? 'Ошибка');
        toast.error(res.error ?? 'Ошибка');
      }
    });
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="rounded-[10px] bg-navy px-[18px] py-2.5 text-sm font-semibold text-white">
        + Добавить остановку
      </button>
    );
  }

  return (
    <div className={`${cardCls} border-dashed`}>
      <form onSubmit={onCreate}>
        <strong className="mb-3 block text-sm">Новая остановка</strong>
        <StopFields place={place} setPlace={setPlace} />
        <div className="mt-3 flex gap-2.5">
          <button type="submit" disabled={pending} className="rounded-[10px] bg-teal px-4 py-2.5 text-[13px] font-semibold text-white disabled:opacity-60">
            {pending ? 'Добавление…' : 'Добавить'}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="text-[13px] text-muted">
            Отмена
          </button>
        </div>
        {error && <div className={errCls}>{error}</div>}
      </form>
    </div>
  );
}

export default function StopsManager({ tourId, stops }: { tourId: string; stops: StopRow[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [order, setOrder] = useState<string[]>(stops.map((s) => s.id));
  const dragId = useRef<string | null>(null);

  useEffect(() => {
    setOrder(stops.map((s) => s.id));
  }, [stops]);

  const byId = new Map(stops.map((s) => [s.id, s]));
  const ordered = order.map((id) => byId.get(id)).filter(Boolean) as StopRow[];

  function onDrop(targetId: string) {
    const from = order.indexOf(dragId.current ?? '');
    const to = order.indexOf(targetId);
    dragId.current = null;
    if (from < 0 || to < 0 || from === to) return;
    const next = [...order];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setOrder(next);
    startTransition(async () => {
      await reorderStops(tourId, next);
      toast.success('Порядок обновлён');
      router.refresh();
    });
  }

  return (
    <div>
      <h2 className="mb-3.5 text-lg font-bold text-navy">Остановки маршрута ({stops.length})</h2>
      {ordered.map((s, idx) => (
        <div
          key={s.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(s.id)}
          draggable
          onDragStart={(e) => {
            const t = e.target as HTMLElement;
            if (t.closest('input, textarea, button, select, a, ul, [data-stop-photos], [class*="ymaps"]')) {
              e.preventDefault();
              return;
            }
            dragId.current = s.id;
          }}
        >
          <StopCard stop={s} index={idx} tourId={tourId} />
        </div>
      ))}
      <AddStopForm tourId={tourId} nextIndex={stops.length} />
    </div>
  );
}
