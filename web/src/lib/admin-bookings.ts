// Bookings: shared constants/labels (client-safe).
export const BOOKING_STATUSES = ['pending', 'confirmed', 'paid', 'cancelled'] as const;
export type BookingStatusValue = (typeof BOOKING_STATUSES)[number];

export const STATUS_LABEL: Record<BookingStatusValue, string> = {
  pending: 'Ожидает',
  confirmed: 'Подтверждена',
  paid: 'Оплачена',
  cancelled: 'Отменена',
};

export const STATUS_COLOR: Record<BookingStatusValue, { bg: string; fg: string }> = {
  pending: { bg: '#FFF3DC', fg: '#9A7B2E' },
  confirmed: { bg: '#E3F4F1', fg: '#1A7A8A' },
  paid: { bg: '#E4F2E6', fg: '#3C8A4E' },
  cancelled: { bg: '#F2EDED', fg: '#9A8E8E' },
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
  tours: { title_ru: string } | null;
};
