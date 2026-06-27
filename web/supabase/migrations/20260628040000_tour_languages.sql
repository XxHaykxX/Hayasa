-- Multi-select guide languages per tour (legacy single `language` kept in sync).
alter table public.tours
  add column if not exists languages text[] not null default '{hy,ru,en}';

update public.tours
set languages = case
  when language = 'all' then array['hy','ru','en']
  when language in ('hy','ru','en') then array[language]
  else array['hy','ru','en']
end;
