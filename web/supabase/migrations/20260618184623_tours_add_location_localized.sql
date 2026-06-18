alter table public.tours
  add column if not exists location_hy text,
  add column if not exists location_ru text,
  add column if not exists location_en text;
