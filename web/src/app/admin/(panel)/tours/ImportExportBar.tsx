'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AdminButton } from '@/components/admin/AdminButton';
import { importToursCsv, type ImportState } from './import-actions';

const initial: ImportState = { ok: false };

function ImportButton() {
  const { pending } = useFormStatus();
  return (
    <AdminButton type="submit" variant="secondary" disabled={pending}>
      {pending ? 'Ներմուծվում է…' : 'Ներմուծել CSV'}
    </AdminButton>
  );
}

export default function ImportExportBar() {
  const router = useRouter();
  const [state, action] = useFormState(importToursCsv, initial);
  const [errors, setErrors] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      toast.success(`Ստեղծվեց՝ ${state.created ?? 0}, բաց թողնվեց՝ ${state.skipped ?? 0}`);
      setErrors(state.errors ?? []);
      formRef.current?.reset();
      router.refresh();
    } else if (state.error) {
      toast.error(state.error);
      setErrors(state.errors ?? []);
    }
  }, [state, router]);

  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2.5">
        <AdminButton href="/admin/tours/export" variant="secondary">
          Արտահանել (JSON)
        </AdminButton>
        <AdminButton href="/admin/tours/template" variant="secondary">
          Ներբեռնել ձևանմուշ (CSV)
        </AdminButton>
        <form ref={formRef} action={action} className="flex items-center gap-2.5">
          <input
            type="file"
            name="file"
            accept=".csv,text/csv"
            className="block max-w-[260px] text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-teal file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-dark"
          />
          <ImportButton />
        </form>
      </div>
      {errors.length > 0 && (
        <ul className="rounded-xl border border-[#F1C9C3] bg-[#FCEDEB] px-4 py-2.5 text-[13px] text-amber">
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
