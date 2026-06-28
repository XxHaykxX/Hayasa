'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AdminButton } from './AdminButton';

// Styled, promise-based replacement for window.confirm(). Mount <ConfirmProvider>
// once (admin panel layout); call `const confirm = useConfirm()` in any client
// component and `await confirm({ ... })` — resolves true/false on user choice.
type ConfirmOptions = {
  title: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

type ConfirmFn = (opts: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within <ConfirmProvider>');
  return ctx;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((v: boolean) => void) | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const confirm = useCallback<ConfirmFn>((o) => {
    setOpts(o);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const close = useCallback((value: boolean) => {
    resolver.current?.(value);
    resolver.current = null;
    setOpts(null);
  }, []);

  // Focus the dialog on open + close on Escape.
  useEffect(() => {
    if (!opts) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [opts, close]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {opts && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm"
          onClick={() => close(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={opts.title}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[400px] rounded-2xl border border-edge bg-white p-6 shadow-[0_20px_60px_rgba(26,58,92,0.25)] outline-none"
          >
            <h2 className="mb-1.5 text-lg font-bold text-navy">{opts.title}</h2>
            {opts.body && <p className="mb-5 text-sm leading-relaxed text-muted">{opts.body}</p>}
            <div className="flex justify-end gap-2.5">
              <AdminButton variant="secondary" size="sm" onClick={() => close(false)}>
                {opts.cancelLabel ?? 'Չեղարկել'}
              </AdminButton>
              <AdminButton
                variant={opts.destructive ? 'destructive' : 'primary'}
                size="sm"
                onClick={() => close(true)}
              >
                {opts.confirmLabel ?? 'Հաստատել'}
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
