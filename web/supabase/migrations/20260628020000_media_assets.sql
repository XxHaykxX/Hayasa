-- Shared media library (admin gallery). Admin-only via service-role client.
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  url text not null unique,
  path text,
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;

create index if not exists media_assets_created_idx on public.media_assets (created_at desc);

-- Derive the storage object path from a public URL (for deletes).
create or replace function public.media_path_from_url(p_url text) returns text
language sql immutable as $$
  select case
    when position('/tour-photos/' in p_url) > 0
    then split_part(p_url, '/tour-photos/', 2)
    else null
  end;
$$;

-- Backfill every existing photo (tour gallery + stop photos + tour covers).
insert into public.media_assets (url, path, created_at)
select s.url, public.media_path_from_url(s.url), s.created_at
from (
  select photo_url as url, created_at from public.tour_photos
  union all
  select photo_url as url, now() as created_at from public.stop_photos
  union all
  select cover_image_url as url, now() as created_at from public.tours where cover_image_url is not null
) s
where s.url is not null
on conflict (url) do nothing;
