'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BOOKING_STATUSES, STATUS_LABEL, type BookingStatusValue } from '@/lib/admin-bookings';
import { updateBookingStatus } from './actions';

export default function StatusSelect({ id, value }: { id: string; value: BookingStatusValue }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      defaultValue={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        startTransition(async () => {
          await updateBookingStatus(id, next);
          toast.success('Ամրագրման կարգավիճակը թարմացվեց');
          router.refresh();
        });
      }}
      className={`hb-in w-auto px-2.5 py-1.5 text-[13px] ${pending ? 'opacity-60' : ''}`}
    >
      {BOOKING_STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}
