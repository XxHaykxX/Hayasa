// Bookings: shared constants/labels (client-safe).
export { STATUS_COLOR } from './status-colors';

export const BOOKING_STATUSES = ['pending', 'confirmed', 'paid', 'cancelled'] as const;
export type BookingStatusValue = (typeof BOOKING_STATUSES)[number];

export const STATUS_LABEL: Record<BookingStatusValue, string> = {
  pending: 'Սպասման մեջ',
  confirmed: 'Հաստատված',
  paid: 'Վճարված',
  cancelled: 'Չեղարկված',
};

export type BookingRow = {
  id: string;
  tour_id: string | null;
  seats: number;
  status: BookingStatusValue;
  full_name: string;
  phone: string;
  notes: string | null;
  source: string;
  created_at: string;
  tours: { title_hy: string | null; title_ru: string | null; price: number | null } | null;
};
