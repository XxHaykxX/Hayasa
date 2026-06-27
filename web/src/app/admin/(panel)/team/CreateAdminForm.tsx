'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { AdminButton } from '@/components/admin/AdminButton';
import { createAdmin, type TeamState } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <AdminButton type="submit" disabled={pending}>
      {pending ? 'Ստեղծում…' : 'Ստեղծել ադմին'}
    </AdminButton>
  );
}

export default function CreateAdminForm() {
  const [state, formAction] = useFormState<TeamState, FormData>(createAdmin, { ok: true });
  const formRef = useRef<HTMLFormElement>(null);
  const lastState = useRef(state);

  useEffect(() => {
    if (state === lastState.current) return;
    lastState.current = state;
    if (state.created) {
      toast.success('Ադմինը ստեղծվեց');
      formRef.current?.reset();
    } else if (state.ok === false && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-3.5 sm:max-w-[420px]">
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold text-navy">Էլ. փոստ</label>
        <input name="email" type="email" autoComplete="off" required className="hb-in" placeholder="name@hayasatours.am" />
      </div>
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold text-navy">Գաղտնաբառ</label>
        <input name="password" type="text" autoComplete="new-password" required minLength={8} className="hb-in" placeholder="նվազագույնը 8 նիշ" />
        <p className="mt-1 text-xs text-muted">Փոխանցեք գաղտնաբառը աշխատակցին — նա կկարողանա այն փոխել ավելի ուշ։</p>
      </div>
      {state.ok === false && state.error && (
        <div className="rounded-[10px] bg-[#FCEDEB] px-3.5 py-3 text-sm text-[#C0564B]">{state.error}</div>
      )}
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
