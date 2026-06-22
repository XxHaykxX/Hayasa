import type { ReactNode } from 'react';

// Presentational admin primitives (server-safe — no client hooks).

// Page header: title + optional subtitle on the left, optional action on the
// right. One consistent rhythm across every admin page.
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="mb-1 text-[26px] font-bold text-navy">{title}</h1>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// Card shell: border + surface + radius + shadow. Caller controls padding via
// `className` (admin cards legitimately vary: p-4 tables, p-5 panels, p-6 forms).
export function AdminCard({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`rounded-2xl border border-edge bg-white shadow-sm ${className}`}>{children}</div>;
}
