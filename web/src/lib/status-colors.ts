// Single source of truth for status colours, shared by the admin panel
// (bookings table, dashboard) and the public StatusBadge. Client-safe.
export type StatusColor = { bg: string; fg: string };

export const STATUS_COLOR: Record<'pending' | 'confirmed' | 'paid' | 'cancelled', StatusColor> = {
  pending: { bg: '#FFF3DC', fg: '#9A7B2E' },
  confirmed: { bg: '#E3F4F1', fg: '#1A7A8A' },
  paid: { bg: '#E4F2E6', fg: '#3C8A4E' },
  cancelled: { bg: '#F2EDED', fg: '#9A8E8E' },
};

// Tour active/hidden pill (admin tours list).
export const TOUR_BADGE: Record<'active' | 'hidden', StatusColor> = {
  active: { bg: '#E3F4F1', fg: '#1A7A8A' },
  hidden: { bg: '#F2EDED', fg: '#9A8E8E' },
};
