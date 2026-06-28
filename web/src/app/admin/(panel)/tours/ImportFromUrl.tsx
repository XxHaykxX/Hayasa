'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { AdminButton } from '@/components/admin/AdminButton';
import { importTourFromUrl } from './actions';
import type { ActionState } from './actions';

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <AdminButton type="submit" disabled={pending}>
      {pending ? 'Ներմուծում…' : 'Ներմուծել'}
    </AdminButton>
  );
}

// Paste a competitor tour URL → Firecrawl extracts fields → a draft tour is
// created and opened for review. Speeds up content entry dramatically.
export function ImportFromUrl() {
  const [state, action] = useFormState<ActionState, FormData>(importTourFromUrl, { ok: true });
  return (
    <form action={action} className="mb-6 rounded-2xl border border-edge bg-aqua p-5">
      <div className="mb-1 text-sm font-bold text-navy">Ներմուծում URL-ից</div>
      <p className="mb-3 text-xs text-muted">
        Տեղադրեք տուրի էջի հղումը — սևագիրը կլրացնենք ավտոմատ. Հետո ստուգեք, ավելացրեք կանգառների կոորդինատներն ու լուսանկարները և պահպանեք.
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          name="url"
          type="url"
          required
          placeholder="https://onewaytour.com/hy/group-tours/..."
          className="hb-in max-w-[460px]"
        />
        <SubmitBtn />
      </div>
      {state.ok === false && state.error && <p className="mt-2 text-sm text-amber">{state.error}</p>}
    </form>
  );
}
