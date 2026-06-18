create table if not exists public.site_content (
  key        text primary key,
  value_ru   text,
  value_hy   text,
  value_en   text,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "site_content public read" on public.site_content
  for select using (true);
create policy "site_content admin write" on public.site_content
  for all using (public.is_admin()) with check (public.is_admin());

-- Seed contact values from the current hardcoded lib/contact.ts (value_ru = canonical).
insert into public.site_content (key, value_ru) values
  ('contact_phone',    '+374 91 23 45 67'),
  ('contact_whatsapp', 'https://wa.me/37491234567'),
  ('contact_telegram', 'https://t.me/hayasatours'),
  ('contact_email',    'hello@hayasatours.am')
on conflict (key) do nothing;
