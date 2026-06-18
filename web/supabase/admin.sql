-- Hayasa Tours — admin additions.
-- Run AFTER schema.sql, in the Supabase SQL editor.

-- 1) Admin flag on profiles.
alter table public.profiles
  add column if not exists is_admin boolean not null default false;

-- 2) Auto-create a profile row when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3) Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- 4) Admin full access (RLS). Service-role key bypasses RLS anyway; these
--    cover the case of acting via a user's admin JWT.
create policy "admin all tours" on public.tours
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all stops" on public.stops
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all stop_photos" on public.stop_photos
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all bookings" on public.bookings
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin read profiles" on public.profiles
  for select using (public.is_admin());

-- 5) Storage bucket for tour/stop photos: public read, admin write.
insert into storage.buckets (id, name, public)
  values ('tour-photos', 'tour-photos', true)
  on conflict (id) do nothing;

create policy "tour-photos public read" on storage.objects
  for select using (bucket_id = 'tour-photos');
create policy "tour-photos admin write" on storage.objects
  for insert with check (bucket_id = 'tour-photos' and public.is_admin());
create policy "tour-photos admin update" on storage.objects
  for update using (bucket_id = 'tour-photos' and public.is_admin());
create policy "tour-photos admin delete" on storage.objects
  for delete using (bucket_id = 'tour-photos' and public.is_admin());
