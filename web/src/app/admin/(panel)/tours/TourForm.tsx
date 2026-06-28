'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { AdminButton } from '@/components/admin/AdminButton';
import { FileInput } from '@/components/admin/FileInput';
import { ListEditor } from '@/components/admin/ListEditor';
import { REGIONS } from '@/lib/regions';
import {
  TOUR_CATEGORIES,
  TOUR_COUNTRIES,
  TOUR_LANG_OPTIONS,
  TOUR_LANG_LABEL,
  CATEGORY_LABEL,
  COUNTRY_LABEL,
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
      {pending ? 'Պահպանում…' : 'Պահպանել'}
    </AdminButton>
  );
}

export default function TourForm({ action, initial }: { action: Action; initial?: TourRow | null }) {
  const [state, formAction] = useFormState(action, { ok: true });

  // Pre-check the language boxes from the saved array, falling back to the
  // legacy single `language` column ('all' → all three) for older tours.
  const initialLangs: readonly string[] =
    initial?.languages && initial.languages.length > 0
      ? initial.languages
      : initial?.language === 'hy' || initial?.language === 'ru' || initial?.language === 'en'
        ? [initial.language]
        : ['hy', 'ru', 'en'];

  return (
    <form action={formAction}>
      {/* Content — Armenian only (site language) */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Հիմնական</h2>
        <div className="grid gap-3.5">
          <div>
            <label className={labelCls}>Անվանում *</label>
            <input name="title_hy" className="hb-in" defaultValue={initial?.title_hy ?? ''} required />
          </div>
          <div>
            <label className={labelCls}>Նկարագրություն</label>
            <textarea name="description_hy" className="hb-in" rows={3} defaultValue={initial?.description_hy ?? ''} />
          </div>
          <div>
            <label className={labelCls}>Վայր · քարտի ենթավերնագիր</label>
            <input name="location_hy" className="hb-in" defaultValue={initial?.location_hy ?? ''} placeholder="Գեղարդ · Գառնի" />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Պարամետրեր</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
          <div>
            <label className={labelCls}>Կատեգորիա</label>
            <select name="category" className="hb-in" defaultValue={initial?.category ?? 'classic'}>
              {TOUR_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABEL[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Երկիր</label>
            <select name="country" className="hb-in" defaultValue={initial?.country ?? 'am'}>
              {TOUR_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {COUNTRY_LABEL[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Մարզ</label>
            <select name="region" className="hb-in" defaultValue={initial?.region ?? ''}>
              <option value="">— նշված չէ —</option>
              {REGIONS.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label.hy}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Տուրի լեզու</label>
            <div className="flex flex-wrap gap-2">
              {TOUR_LANG_OPTIONS.map((l) => {
                const checked = initialLangs.includes(l);
                return (
                  <label
                    key={l}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-edge bg-white px-3.5 py-2.5 text-sm font-medium text-navy has-[:checked]:border-teal has-[:checked]:bg-teal/5"
                  >
                    <input type="checkbox" name="languages" value={l} defaultChecked={checked} className="accent-teal" />
                    {TOUR_LANG_LABEL[l]}
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <label className={labelCls}>Մեկնման ամսաթիվ և ժամ *</label>
            <input type="datetime-local" name="date_start" className="hb-in" defaultValue={toLocalInput(initial?.date_start)} required />
          </div>
          <div>
            <label className={labelCls}>Գին (AMD) *</label>
            <input type="number" name="price" className="hb-in" min={0} defaultValue={initial?.price ?? 0} required />
          </div>
          <div>
            <label className={labelCls}>Օր</label>
            <input type="number" name="duration_days" className="hb-in" min={1} defaultValue={initial?.duration_days ?? 1} />
          </div>
          <div>
            <label className={labelCls}>Գիշեր</label>
            <input type="number" name="duration_nights" className="hb-in" min={0} defaultValue={initial?.duration_nights ?? 0} />
          </div>
          <div>
            <label className={labelCls}>Ընդամենը տեղեր *</label>
            <input type="number" name="max_seats" className="hb-in" min={1} defaultValue={initial?.max_seats ?? 18} required />
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" defaultChecked={initial?.is_active ?? true} />
          Տուրն ակտիվ է (ցուցադրվում է կայքում)
        </label>
      </div>

      {/* Inclusions / Exclusions */}
      <div className={cardCls}>
        <h2 className={h2Cls}>Ինչ է ներառված / չներառված</h2>
        <p className="mb-4 text-xs text-muted">Ավելացրեք կետերը մեկ առ մեկ — Enter կամ «+».</p>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <div className="mb-2 text-[13px] font-bold text-teal">✓ Ներառված է տուրում</div>
            <ListEditor name="inclusions_hy" initial={initial?.inclusions?.hy ?? []} placeholder="Ավելացնել կետ" />
          </div>
          <div>
            <div className="mb-2 text-[13px] font-bold text-amber">✕ Ներառված չէ</div>
            <ListEditor name="exclusions_hy" initial={initial?.exclusions?.hy ?? []} placeholder="Ավելացնել կետ" />
          </div>
        </div>
      </div>

      {/* Photos — only in the CREATE form (no tour id yet to attach gallery
          picks to). In EDIT, photos are managed below via the gallery picker
          (upload to / pick from the shared gallery). */}
      {!initial && (
        <div className={cardCls}>
          <h2 className={h2Cls}>Տուրի լուսանկարներ</h2>
          <FileInput
            name="photos"
            multiple
            label="Քաշեք լուսանկարներն այստեղ կամ ընտրեք"
            hint="Կարող եք ընտրել մի քանիսը — դրանք գնում են քարտի կարուսել. Առաջին լուսանկարը դառնում է շապիկ. PNG/JPG/WebP, յուրաքանչյուրը մինչև 5 ՄԲ. Պահպանելուց հետո կբացվի խմբագրիչը՝ պատկերասրահից լուսանկարներ ավելացնելու համար."
          />
        </div>
      )}

      <p className="mb-3 text-xs text-muted">Աստղանիշով * դաշտերը պարտադիր են.</p>

      {!state.ok && state.error && (
        <div className="mb-4 rounded-[10px] bg-[#FCEDEB] px-3.5 py-3 text-sm text-[#C0564B]">{state.error}</div>
      )}

      {/* Sticky action bar — keeps Save reachable on the long edit page. */}
      <div className="sticky bottom-0 z-30 -mx-1 mt-2 flex items-center gap-3 rounded-t-xl border-t border-edge bg-white/95 px-1 py-3 backdrop-blur">
        <SubmitButton />
        <AdminButton variant="ghost" href="/admin/tours">
          Չեղարկել
        </AdminButton>
      </div>
    </form>
  );
}
