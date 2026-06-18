-- Hayasa Tours — Supabase schema (per TZ §4).
-- Run in the Supabase SQL editor. Shared by web (Next.js) and app (Expo).

-- ─────────────────────────── tours ───────────────────────────
create table if not exists public.tours (
  id              uuid primary key default gen_random_uuid(),
  title_hy        text not null,
  title_ru        text not null,
  title_en        text not null,
  description_hy  text,
  description_ru  text,
  description_en  text,
  category        text check (category in ('classic','gastro','premium','group','cultural','nature','border')),
  country         text check (country in ('am','ge')) default 'am',
  date_start      timestamptz not null,
  price           integer not null,            -- AMD
  currency        text not null default 'AMD',
  max_seats       integer not null default 18,
  booked_seats    integer not null default 0,
  language        text not null default 'all', -- 'hy'|'ru'|'en'|'all'
  cover_image_url text,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ─────────────────────────── stops ───────────────────────────
create table if not exists public.stops (
  id              uuid primary key default gen_random_uuid(),
  tour_id         uuid not null references public.tours(id) on delete cascade,
  order_index     integer not null default 0,
  name_hy         text,
  name_ru         text,
  name_en         text,
  description_hy  text,
  description_ru  text,
  description_en  text,
  latitude        double precision,
  longitude       double precision,
  created_at      timestamptz not null default now()
);

-- ────────────────────────── stop_photos ──────────────────────
create table if not exists public.stop_photos (
  id          uuid primary key default gen_random_uuid(),
  stop_id     uuid not null references public.stops(id) on delete cascade,
  photo_url   text not null,
  order_index integer not null default 0
);

-- ─────────────────────────── profiles ────────────────────────
create table if not exists public.profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  first_name     text,
  last_name      text,
  phone          text,
  avatar_url     text,
  preferred_lang text check (preferred_lang in ('hy','ru','en')) default 'en',
  created_at     timestamptz not null default now()
);

-- ─────────────────────────── bookings ────────────────────────
create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  tour_id     uuid references public.tours(id) on delete set null,
  user_id     uuid references auth.users(id) on delete set null,
  seats       integer not null default 1,
  status      text not null default 'pending' check (status in ('pending','confirmed','paid','cancelled')),
  full_name   text not null,
  phone       text not null,
  notes       text,
  source      text not null default 'web' check (source in ('web','app')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─────────────────────────── RLS ─────────────────────────────
alter table public.tours      enable row level security;
alter table public.stops      enable row level security;
alter table public.stop_photos enable row level security;
alter table public.bookings   enable row level security;
alter table public.profiles   enable row level security;

-- Public can read active tours / their stops / photos.
create policy "tours readable" on public.tours
  for select using (is_active = true);
create policy "stops readable" on public.stops
  for select using (true);
create policy "stop_photos readable" on public.stop_photos
  for select using (true);

-- A user reads/writes only their own bookings; anonymous web requests insert
-- with user_id null (admin reconciles by phone). Tighten before launch.
create policy "bookings insert" on public.bookings
  for insert with check (true);
create policy "own bookings readable" on public.bookings
  for select using (auth.uid() = user_id);

-- A user reads/updates only their own profile.
create policy "own profile readable" on public.profiles
  for select using (auth.uid() = id);
create policy "own profile upsert" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
