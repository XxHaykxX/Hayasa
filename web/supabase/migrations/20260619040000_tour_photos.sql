-- Tour-level photo gallery (used by the card carousel + detail gallery).
create table if not exists public.tour_photos (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references public.tours(id) on delete cascade,
  photo_url text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists tour_photos_tour_id_idx on public.tour_photos(tour_id, order_index);

alter table public.tour_photos enable row level security;

drop policy if exists "tour_photos public read" on public.tour_photos;
create policy "tour_photos public read" on public.tour_photos for select using (true);

drop policy if exists "tour_photos admin write" on public.tour_photos;
create policy "tour_photos admin write" on public.tour_photos for all using (public.is_admin()) with check (public.is_admin());
