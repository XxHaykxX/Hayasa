import { useTranslations } from 'next-intl';
import type { BookingStatus } from '@/lib/tours';

const STATUS: Record<BookingStatus, { bg: string; fg: string }> = {
  pending: { bg: '#FFF8E0', fg: '#B8860B' },
  confirmed: { bg: '#E0F7EE', fg: '#1A6B4A' },
  paid: { bg: '#E0EBF7', fg: '#1A3A5C' },
  cancelled: { bg: '#FFE8E8', fg: '#CC3333' },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const t = useTranslations('Status');
  const s = STATUS[status] ?? STATUS.pending;
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
