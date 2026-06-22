'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { CONTENT_FIELDS } from '@/lib/site-content';
import { AdminButton } from '@/components/admin/AdminButton';
import { saveContent, type ContentState } from './actions';

const labelCls = 'mb-1.5 block text-[13px] font-semibold text-navy';
const cardCls = 'mb-5 max-w-[560px] rounded-2xl border border-edge bg-white p-6';

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <AdminButton type="submit" disabled={pending}>
      {pending ? 'Сохранение…' : 'Сохранить'}
    </AdminButton>
  );
}

export default function ContentForm({
  values,
}: {
  values: Record<string, { ru: string; hy: string; en: string }>;
}) {
  const [state, formAction] = useFormState<ContentState, FormData>(saveContent, { ok: true });
  const lastState = useRef(state);
  useEffect(() => {
    if (state === lastState.current) return;
    lastState.current = state;
    if (state.saved) toast.success('Контент сохранён');
    else if (state.ok === false && state.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction}>
      <div className={cardCls}>
        <h2 className="mb-4 text-base font-bold text-navy">Контакты</h2>
        <div className="grid gap-3.5">
          {CONTENT_FIELDS.filter((f) => f.group === 'contacts').map((f) => (
            <div key={f.key}>
              <label className={labelCls}>{f.label}</label>
              <input name={f.key} className="hb-in" defaultValue={values[f.key]?.ru ?? ''} placeholder={f.placeholder} />
            </div>
          ))}
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="mb-1 text-base font-bold text-navy">Главный экран (Hero)</h2>
        <p className="mb-4 text-xs text-muted">Пусто = текст по умолчанию из переводов сайта.</p>
        <div className="grid gap-4">
          {CONTENT_FIELDS.filter((f) => f.group === 'hero').map((f) => (
            <div key={f.key}>
              <label className={labelCls}>{f.label}</label>
              <div className="grid gap-2">
                {(['ru', 'hy', 'en'] as const).map((lng) => (
                  <input
                    key={lng}
                    name={`${f.key}_${lng}`}
                    className="hb-in"
                    defaultValue={values[f.key]?.[lng] ?? ''}
                    placeholder={lng.toUpperCase()}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {state.ok === false && state.error && (
        <div className="mb-4 max-w-[560px] rounded-[10px] bg-[#FCEDEB] px-3.5 py-3 text-sm text-[#C0564B]">
          {state.error}
        </div>
      )}

      <SaveButton />
    </form>
  );
}
