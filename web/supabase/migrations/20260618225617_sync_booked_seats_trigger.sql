-- Keep tours.booked_seats in sync with real bookings (active statuses only).
create or replace function public.sync_booked_seats()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  tids uuid[];
begin
  tids := array_remove(array[NEW.tour_id, OLD.tour_id], null);
  update public.tours t
  set booked_seats = coalesce((
    select sum(b.seats)
    from public.bookings b
    where b.tour_id = t.id
      and b.status in ('pending', 'confirmed', 'paid')
  ), 0)
  where t.id = any(tids);
  return null;
end;
$$;

drop trigger if exists trg_sync_booked_seats on public.bookings;
create trigger trg_sync_booked_seats
  after insert or update or delete on public.bookings
  for each row execute function public.sync_booked_seats();

revoke all on function public.sync_booked_seats() from anon, authenticated, public;
