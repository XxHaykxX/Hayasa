import { useTranslations } from 'next-intl';
import type { BookingStatus } from '@/lib/tours';
import { STATUS_COLOR } from '@/lib/status-colors';

export function StatusBadge({ status }: { status: BookingStatus }) {
  const t = useTranslations('Status');
  const s = STATUS_COLOR[status] ?? STATUS_COLOR.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold font-body"
      style={{ background: s.bg, color: s.fg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.fg }} />
      {t(status)}
    </span>
  );
}
