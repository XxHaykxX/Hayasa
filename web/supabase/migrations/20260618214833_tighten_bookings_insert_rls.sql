-- Replace the permissive "always true" insert policy with constrained checks:
-- new bookings must be pending/web|app, sane seat count, and may only set
-- user_id to null (anonymous) or the caller's own id.
drop policy if exists "bookings insert" on public.bookings;
create policy "bookings insert" on public.bookings
  for insert with check (
    status = 'pending'
    and source in ('web', 'app')
    and seats between 1 and 20
    and (user_id is null or user_id = auth.uid())
  );
