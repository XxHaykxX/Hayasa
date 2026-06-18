import type { ReactNode } from 'react';

export function Field({ label, children, error }: { label: string; children: ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="block font-body text-sm font-bold text-navy mb-2">{label}</span>
      {children}
      {error && <span className="mt-1.5 block font-body text-[13px] text-amber-dark">{error}</span>}
    </label>
  );
}
