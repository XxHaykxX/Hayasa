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

const labelCls = 'mb-1.5 block text-[13px] font-semibold text-navy';
const cardCls = 'mb-5 rounded-2xl border border-edge bg-white p-6';
const h2Cls = 'mb-4 text-base font-bold text-navy';

function toLocalInput(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-teal px-6 py-3 text-[15px] font-semibold text-white transition-opacity disabled:opacity-70"
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
      <div className={cardCls}>
        <h2 className={h2Cls}>Название (3 языка)</h2>
        <div className="grid gap-3.5">
          <div>
            <label className={labelCls}>Русский *</label>
            <input name="title_ru" className="hb-in" defaultValue={initial?.title_ru ?? ''} required />
          </div>
          <div>
            <label className={labelCls}>Armenian (HY) *</label>
            <input name="title_hy" className="hb-in" defaultValue={initial?.title_hy ?? ''} required />
          </div>
          <div>
            <label className={labelCls}>English (EN) *</label>
            <input name="title_en" className="hb-in" defaultValue={initial?.title_en ?? ''} required />
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Описание (3 языка)</h2>
        <div className="grid gap-3.5">
          <div>
            <label className={labelCls}>Русский</label>
            <textarea name="description_ru" className="hb-in" rows={3} defaultValue={initial?.description_ru ?? ''} />
          </div>
          <div>
            <label className={labelCls}>Armenian (HY)</label>
            <textarea name="description_hy" className="hb-in" rows={3} defaultValue={initial?.description_hy ?? ''} />
          </div>
          <div>
            <label className={labelCls}>English (EN)</label>
            <textarea name="description_en" className="hb-in" rows={3} defaultValue={initial?.description_en ?? ''} />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Локация (подзаголовок карточки)</h2>
        <div className="grid gap-3.5">
          <div>
            <label className={labelCls}>Русский</label>
            <input name="location_ru" className="hb-in" defaultValue={initial?.location_ru ?? ''} placeholder="Гегард · Гарни" />
          </div>
          <div>
            <label className={labelCls}>Armenian (HY)</label>
            <input name="location_hy" className="hb-in" defaultValue={initial?.location_hy ?? ''} />
          </div>
          <div>
            <label className={labelCls}>English (EN)</label>
            <input name="location_en" className="hb-in" defaultValue={initial?.location_en ?? ''} placeholder="Geghard · Garni" />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Параметры</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
          <div>
            <label className={labelCls}>Категория</label>
            <select name="category" className="hb-in" defaultValue={initial?.category ?? 'classic'}>
              {TOUR_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABEL[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Страна</label>
            <select name="country" className="hb-in" defaultValue={initial?.country ?? 'am'}>
              {TOUR_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {COUNTRY_LABEL[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Язык тура</label>
            <select name="language" className="hb-in" defaultValue={initial?.language ?? 'all'}>
              {TOUR_LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {LANGUAGE_LABEL[l]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Дата и время старта *</label>
            <input type="datetime-local" name="date_start" className="hb-in" defaultValue={toLocalInput(initial?.date_start)} required />
          </div>
          <div>
            <label className={labelCls}>Цена (AMD) *</label>
            <input type="number" name="price" className="hb-in" min={0} defaultValue={initial?.price ?? 0} required />
          </div>
          <div>
            <label className={labelCls}>Всего мест *</label>
            <input type="number" name="max_seats" className="hb-in" min={1} defaultValue={initial?.max_seats ?? 18} required />
          </div>
          {initial && (
            <div>
              <label className={labelCls}>Занято мест (авто)</label>
              <input type="number" className="hb-in" value={initial.booked_seats} disabled readOnly />
            </div>
          )}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" defaultChecked={initial?.is_active ?? true} />
          Тур активен (виден на сайте)
        </label>
      </div>

      {/* Cover */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Обложка</h2>
        {initial?.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={initial.cover_image_url} alt="Текущая обложка" className="mb-3 h-[130px] w-[220px] rounded-xl object-cover" />
        )}
        <input type="file" name="cover" accept="image/*" />
        <p className="mt-2 text-xs text-muted">
          {initial ? 'Загрузите новый файл, чтобы заменить обложку. Иначе останется текущая.' : 'PNG/JPG/WebP, до 5 МБ.'}
        </p>
      </div>

      {!state.ok && state.error && (
        <div className="mb-4 rounded-[10px] bg-[#FCEDEB] px-3.5 py-3 text-sm text-[#C0564B]">{state.error}</div>
      )}

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link href="/admin/tours" className="text-sm text-muted no-underline">
          Отмена
        </Link>
      </div>
    </form>
  );
}
