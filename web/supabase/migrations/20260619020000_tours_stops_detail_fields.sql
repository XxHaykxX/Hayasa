-- Per-stop duration + destination link; per-tour inclusions/exclusions (i18n jsonb).
alter table public.stops add column if not exists duration text;
alter table public.stops add column if not exists destination_slug text;
alter table public.tours add column if not exists inclusions jsonb not null default '{}'::jsonb;
alter table public.tours add column if not exists exclusions jsonb not null default '{}'::jsonb;
