create index if not exists idx_bookings_user_id on public.bookings(user_id);
create index if not exists idx_bookings_status on public.bookings(status);
create index if not exists idx_bookings_tour_id on public.bookings(tour_id);
create index if not exists idx_bookings_created_at on public.bookings(created_at desc);
create index if not exists idx_tours_is_active on public.tours(is_active);
create index if not exists idx_tours_date_start on public.tours(date_start);
create index if not exists idx_stops_tour_id on public.stops(tour_id);
create index if not exists idx_stop_photos_stop_id on public.stop_photos(stop_id);
