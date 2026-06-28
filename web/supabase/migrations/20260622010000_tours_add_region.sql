-- Add a region (marz) column to tours so the home map can filter tours by
-- marz exactly (values match the ArmeniaMap group keys, e.g. 'Lori', 'Syunik').
alter table public.tours add column if not exists region text;
create index if not exists tours_region_idx on public.tours (region);
