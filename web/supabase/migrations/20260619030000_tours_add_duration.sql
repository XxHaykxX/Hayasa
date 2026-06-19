-- Tour-level duration (days / nights) for the listing badge.
alter table public.tours add column if not exists duration_days int not null default 1;
alter table public.tours add column if not exists duration_nights int not null default 0;
