'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { AdminButton } from '@/components/admin/AdminButton';
import { FileInput } from '@/components/admin/FileInput';
import { ListEditor } from '@/components/admin/ListEditor';
import { REGIONS } from '@/lib/regions';
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
    <AdminButton type="submit" disabled={pending}>
      {pending ? 'Сохранение…' : 'Сохранить'}
    </AdminButton>
  );
}

export default function TourForm({ action, initial }: { action: Action; initial?: TourRow | null }) {
  const [state, formAction] = useFormState(action, { ok: true });

  return (
    <form action={formAction}>
      {/* Content — Armenian only (site language) */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Основное</h2>
        <div className="grid gap-3.5">
          <div>
            <label className={labelCls}>Название *</label>
            <input name="title_hy" className="hb-in" defaultValue={initial?.title_hy ?? ''} required />
          </div>
          <div>
            <label className={labelCls}>Описание</label>
            <textarea name="description_hy" className="hb-in" rows={3} defaultValue={initial?.description_hy ?? ''} />
          </div>
          <div>
            <label className={labelCls}>Локация · подзаголовок карточки</label>
            <input name="location_hy" className="hb-in" defaultValue={initial?.location_hy ?? ''} placeholder="Գեղարդ · Գառնի" />
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
            <label className={labelCls}>Регион (марз)</label>
            <select name="region" className="hb-in" defaultValue={initial?.region ?? ''}>
              <option value="">— не указан —</option>
              {REGIONS.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label.ru}
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
            <label className={labelCls}>Дней</label>
            <input type="number" name="duration_days" className="hb-in" min={1} defaultValue={initial?.duration_days ?? 1} />
          </div>
          <div>
            <label className={labelCls}>Ночей</label>
            <input type="number" name="duration_nights" className="hb-in" min={0} defaultValue={initial?.duration_nights ?? 0} />
          </div>
          <div>
            <label className={labelCls}>Всего мест *</label>
            <input type="number" name="max_seats" className="hb-in" min={1} defaultValue={initial?.max_seats ?? 18} required />
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" defaultChecked={initial?.is_active ?? true} />
          Тур активен (виден на сайте)
        </label>
      </div>

      {/* Inclusions / Exclusions */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Что входит / не входит</h2>
        <p className="mb-4 text-xs text-muted">Добавляйте пункты по одному — Enter или «+».</p>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <div className="mb-2 text-[13px] font-bold text-teal">✓ Входит в тур</div>
            <ListEditor name="inclusions_hy" initial={initial?.inclusions?.hy ?? []} placeholder="Добавить пункт" />
          </div>
          <div>
            <div className="mb-2 text-[13px] font-bold text-amber">✕ Не входит</div>
            <ListEditor name="exclusions_hy" initial={initial?.exclusions?.hy ?? []} placeholder="Добавить пункт" />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Фото тура</h2>
        <FileInput
          name="photos"
          multiple
          label="Перетащите фото сюда или выберите"
          hint={`Можно выбрать несколько — они идут в карусель карточки. Первое фото становится обложкой. PNG/JPG/WebP, до 5 МБ каждое.${
            initial ? ' Уже загруженные фото — ниже, под формой.' : ''
          }`}
        />
      </div>

      <p className="mb-3 text-xs text-muted">Поля со знаком * обязательны.</p>

      {!state.ok && state.error && (
        <div className="mb-4 rounded-[10px] bg-[#FCEDEB] px-3.5 py-3 text-sm text-[#C0564B]">{state.error}</div>
      )}

      {/* Sticky action bar — keeps Save reachable on the long edit page. */}
      <div className="sticky bottom-0 z-30 -mx-1 mt-2 flex items-center gap-3 rounded-t-xl border-t border-edge bg-white/95 px-1 py-3 backdrop-blur">
        <SubmitButton />
        <AdminButton variant="ghost" href="/admin/tours">
          Отмена
        </AdminButton>
      </div>
    </form>
  );
}
