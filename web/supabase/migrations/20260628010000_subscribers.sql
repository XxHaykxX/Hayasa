-- Newsletter subscribers + idempotent subscribe RPC (anon-callable).
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text,
  source text not null default 'web',
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
-- No direct client access; inserts go through the SECURITY DEFINER RPC below,
-- reads are admin-only via the service-role client (which bypasses RLS).

create or replace function public.subscribe_email(
  p_email text,
  p_locale text default null,
  p_source text default 'web'
) returns void language plpgsql security definer set search_path = public as $$
declare v_email text := lower(btrim(p_email));
begin
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid email: %', p_email;
  end if;
  if p_source is null or p_source not in ('web','app') then p_source := 'web'; end if;
  insert into public.subscribers (email, locale, source)
  values (v_email, nullif(btrim(p_locale), ''), p_source)
  on conflict (email) do nothing;
end; $$;

revoke all on function public.subscribe_email(text, text, text) from public;
grant execute on function public.subscribe_email(text, text, text) to anon, authenticated;
