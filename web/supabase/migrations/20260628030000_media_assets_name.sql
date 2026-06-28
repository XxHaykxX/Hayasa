-- Searchable display name for media assets.
alter table public.media_assets add column if not exists name text;

update public.media_assets
set name = regexp_replace(coalesce(path, url), '^.*/', '')
where name is null;

create index if not exists media_assets_name_idx on public.media_assets (lower(name));
