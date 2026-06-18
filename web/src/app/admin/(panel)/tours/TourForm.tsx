'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import {
  TOUR_CATEGORIES,
  TOUR_COUNTRIES,
  TOUR_LANGUAGES,
  CATEGORY_LABEL,
  COUNTRY_LABEL,
  LANGUAGE_LABEL,
  type TourRow,
} from '@/lib/admin-tours';
import type { ActionState } from './actions';

type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

const label: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 };
const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #D0E8E4',
  borderRadius: 16,
  padding: 24,
  marginBottom: 20,
};

// ISO -> value for <input type="datetime-local"> (local time).
function toLocalInput(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes(),
  )}`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: '#1A7A8A',
        color: '#fff',
        border: 'none',
        borderRadius: 12,
        padding: '12px 24px',
        fontSize: 15,
        fontWeight: 600,
        cursor: pending ? 'default' : 'pointer',
        opacity: pending ? 0.7 : 1,
      }}
    >
      {pending ? 'Сохранение…' : 'Сохранить'}
    </button>
  );
}

export default function TourForm({ action, initial }: { action: Action; initial?: TourRow | null }) {
  const [state, formAction] = useFormState(action, { ok: true });

  return (
    <form action={formAction}>
      {/* Titles */}
      <div style={card}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Название (3 языка)</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <label style={label}>Русский *</label>
            <input name="title_ru" className="hb-in" defaultValue={initial?.title_ru ?? ''} required />
          </div>
          <div>
            <label style={label}>Armenian (HY) *</label>
            <input name="title_hy" className="hb-in" defaultValue={initial?.title_hy ?? ''} required />
          </div>
          <div>
            <label style={label}>English (EN) *</label>
            <input name="title_en" className="hb-in" defaultValue={initial?.title_en ?? ''} required />
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div style={card}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Описание (3 языка)</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <label style={label}>Русский</label>
            <textarea name="description_ru" className="hb-in" rows={3} defaultValue={initial?.description_ru ?? ''} />
          </div>
          <div>
            <label style={label}>Armenian (HY)</label>
            <textarea name="description_hy" className="hb-in" rows={3} defaultValue={initial?.description_hy ?? ''} />
          </div>
          <div>
            <label style={label}>English (EN)</label>
            <textarea name="description_en" className="hb-in" rows={3} defaultValue={initial?.description_en ?? ''} />
          </div>
        </div>
      </div>

      {/* Location subtitle */}
      <div style={card}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Локация (подзаголовок карточки)</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <label style={label}>Русский</label>
            <input name="location_ru" className="hb-in" defaultValue={initial?.location_ru ?? ''} placeholder="Гегард · Гарни" />
          </div>
          <div>
            <label style={label}>Armenian (HY)</label>
            <input name="location_hy" className="hb-in" defaultValue={initial?.location_hy ?? ''} />
          </div>
          <div>
            <label style={label}>English (EN)</label>
            <input name="location_en" className="hb-in" defaultValue={initial?.location_en ?? ''} placeholder="Geghard · Garni" />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div style={card}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Параметры</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          <div>
            <label style={label}>Категория</label>
            <select name="category" className="hb-in" defaultValue={initial?.category ?? 'classic'}>
              {TOUR_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABEL[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={label}>Страна</label>
            <select name="country" className="hb-in" defaultValue={initial?.country ?? 'am'}>
              {TOUR_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {COUNTRY_LABEL[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={label}>Язык тура</label>
            <select name="language" className="hb-in" defaultValue={initial?.language ?? 'all'}>
              {TOUR_LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {LANGUAGE_LABEL[l]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={label}>Дата и время старта *</label>
            <input
              type="datetime-local"
              name="date_start"
              className="hb-in"
              defaultValue={toLocalInput(initial?.date_start)}
              required
            />
          </div>
          <div>
            <label style={label}>Цена (AMD) *</label>
            <input type="number" name="price" className="hb-in" min={0} defaultValue={initial?.price ?? 0} required />
          </div>
          <div>
            <label style={label}>Всего мест *</label>
            <input
              type="number"
              name="max_seats"
              className="hb-in"
              min={1}
              defaultValue={initial?.max_seats ?? 18}
              required
            />
          </div>
          <div>
            <label style={label}>Занято мест</label>
            <input
              type="number"
              name="booked_seats"
              className="hb-in"
              min={0}
              defaultValue={initial?.booked_seats ?? 0}
            />
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 14 }}>
          <input type="checkbox" name="is_active" defaultChecked={initial?.is_active ?? true} />
          Тур активен (виден на сайте)
        </label>
      </div>

      {/* Cover */}
      <div style={card}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Обложка</h2>
        {initial?.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={initial.cover_image_url}
            alt="Текущая обложка"
            style={{ width: 220, height: 130, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }}
          />
        )}
        <input type="file" name="cover" accept="image/*" />
        <p style={{ fontSize: 12, color: '#6B8585', marginTop: 8 }}>
          {initial ? 'Загрузите новый файл, чтобы заменить обложку. Иначе останется текущая.' : 'PNG/JPG, до ~3 МБ.'}
        </p>
      </div>

      {!state.ok && state.error && (
        <div
          style={{
            fontSize: 14,
            color: '#C0564B',
            background: '#FCEDEB',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 16,
          }}
        >
          {state.error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <SubmitButton />
        <Link href="/admin/tours" style={{ color: '#6B8585', fontSize: 14, textDecoration: 'none' }}>
          Отмена
        </Link>
      </div>
    </form>
  );
}
