'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { CONTENT_FIELDS } from '@/lib/site-content';
import { saveContent, type ContentState } from './actions';

const label: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 };

function SaveButton() {
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
      <div style={{ background: '#fff', border: '1px solid #D0E8E4', borderRadius: 16, padding: 24, marginBottom: 20, maxWidth: 560 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Контакты</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          {CONTENT_FIELDS.filter((f) => f.group === 'contacts').map((f) => (
            <div key={f.key}>
              <label style={label}>{f.label}</label>
              <input name={f.key} className="hb-in" defaultValue={values[f.key]?.ru ?? ''} placeholder={f.placeholder} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #D0E8E4', borderRadius: 16, padding: 24, marginBottom: 20, maxWidth: 560 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Главный экран (Hero)</h2>
        <p style={{ fontSize: 12, color: '#6B8585', marginBottom: 16 }}>Пусто = текст по умолчанию из переводов сайта.</p>
        <div style={{ display: 'grid', gap: 16 }}>
          {CONTENT_FIELDS.filter((f) => f.group === 'hero').map((f) => (
            <div key={f.key}>
              <label style={label}>{f.label}</label>
              <div style={{ display: 'grid', gap: 8 }}>
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
        <div style={{ fontSize: 14, color: '#C0564B', background: '#FCEDEB', borderRadius: 10, padding: '12px 14px', marginBottom: 16, maxWidth: 560 }}>
          {state.error}
        </div>
      )}

      <SaveButton />
    </form>
  );
}
