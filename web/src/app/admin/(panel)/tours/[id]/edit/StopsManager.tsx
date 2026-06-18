'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { StopRow } from '@/lib/admin-stops';
import { createStop, updateStop, deleteStop, addStopPhoto, deleteStopPhoto } from './stops-actions';

const label: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 };
const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #D0E8E4',
  borderRadius: 14,
  padding: 18,
  marginBottom: 14,
};
const errBox: React.CSSProperties = {
  fontSize: 13,
  color: '#C0564B',
  background: '#FCEDEB',
  borderRadius: 8,
  padding: '8px 10px',
  marginTop: 10,
};

function StopFields({ stop }: { stop?: StopRow }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
        <div>
          <label style={label}>Название RU *</label>
          <input name="name_ru" className="hb-in" defaultValue={stop?.name_ru ?? ''} required />
        </div>
        <div>
          <label style={label}>HY</label>
          <input name="name_hy" className="hb-in" defaultValue={stop?.name_hy ?? ''} />
        </div>
        <div>
          <label style={label}>EN</label>
          <input name="name_en" className="hb-in" defaultValue={stop?.name_en ?? ''} />
        </div>
      </div>
      <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
        <textarea name="description_ru" className="hb-in" rows={2} placeholder="Описание RU" defaultValue={stop?.description_ru ?? ''} />
        <textarea name="description_hy" className="hb-in" rows={2} placeholder="Описание HY" defaultValue={stop?.description_hy ?? ''} />
        <textarea name="description_en" className="hb-in" rows={2} placeholder="Описание EN" defaultValue={stop?.description_en ?? ''} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginTop: 10 }}>
        <div>
          <label style={label}>Широта (lat) *</label>
          <input name="latitude" type="number" step="any" className="hb-in" defaultValue={stop?.latitude ?? ''} required />
        </div>
        <div>
          <label style={label}>Долгота (lng) *</label>
          <input name="longitude" type="number" step="any" className="hb-in" defaultValue={stop?.longitude ?? ''} required />
        </div>
        <div>
          <label style={label}>Порядок</label>
          <input name="order_index" type="number" min={0} className="hb-in" defaultValue={stop?.order_index ?? 0} />
        </div>
      </div>
    </>
  );
}

function StopCard({ stop, tourId }: { stop: StopRow; tourId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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
    <div style={card}>
      <form onSubmit={onSave}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <strong style={{ fontSize: 14 }}>
            #{stop.order_index + 1} · {stop.name_ru}
          </strong>
          <button type="button" onClick={onDelete} disabled={pending} style={{ border: '1px solid #F1C9C3', color: '#C0564B', background: '#fff', borderRadius: 8, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}>
            Удалить остановку
          </button>
        </div>
        <StopFields stop={stop} />
        <button type="submit" disabled={pending} style={{ marginTop: 12, background: '#1A7A8A', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: pending ? 0.6 : 1 }}>
          {pending ? 'Сохранение…' : 'Сохранить остановку'}
        </button>
      </form>

      {/* Photos */}
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #EAF2F1' }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Фото остановки</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
          {stop.stop_photos.length === 0 && <span style={{ fontSize: 13, color: '#9DB6B4' }}>Фото нет.</span>}
          {stop.stop_photos.map((p) => (
            <div key={p.id} style={{ position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photo_url} alt="" style={{ width: 110, height: 74, objectFit: 'cover', borderRadius: 8 }} />
              <button
                type="button"
                onClick={() => onDeletePhoto(p.id)}
                disabled={pending}
                title="Удалить фото"
                style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'rgba(192,86,75,0.92)', color: '#fff', fontSize: 13, lineHeight: '22px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={onAddPhoto} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="file" name="photo" accept="image/*" required />
          <button type="submit" disabled={pending} style={{ border: '1px solid #D0E8E4', background: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer' }}>
            Загрузить фото
          </button>
        </form>
      </div>

      {error && <div style={errBox}>{error}</div>}
    </div>
  );
}

function AddStopForm({ tourId, nextIndex }: { tourId: string; nextIndex: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!fd.get('order_index')) fd.set('order_index', String(nextIndex));
    setError(null);
    startTransition(async () => {
      const res = await createStop(tourId, { ok: true }, fd);
      if (res.ok) {
        form.reset();
        setOpen(false);
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
      <button type="button" onClick={() => setOpen(true)} style={{ background: '#1A3A5C', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        + Добавить остановку
      </button>
    );
  }

  return (
    <div style={{ ...card, borderStyle: 'dashed' }}>
      <form onSubmit={onCreate}>
        <strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>Новая остановка</strong>
        <StopFields />
        <input type="hidden" name="order_index" defaultValue={nextIndex} />
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button type="submit" disabled={pending} style={{ background: '#1A7A8A', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: pending ? 0.6 : 1 }}>
            {pending ? 'Добавление…' : 'Добавить'}
          </button>
          <button type="button" onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#6B8585', fontSize: 13, cursor: 'pointer' }}>
            Отмена
          </button>
        </div>
        {error && <div style={errBox}>{error}</div>}
      </form>
    </div>
  );
}

export default function StopsManager({ tourId, stops }: { tourId: string; stops: StopRow[] }) {
  const nextIndex = stops.length ? Math.max(...stops.map((s) => s.order_index)) + 1 : 0;
  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Остановки маршрута ({stops.length})</h2>
      {stops.map((s) => (
        <StopCard key={s.id} stop={s} tourId={tourId} />
      ))}
      <AddStopForm tourId={tourId} nextIndex={nextIndex} />
    </div>
  );
}
