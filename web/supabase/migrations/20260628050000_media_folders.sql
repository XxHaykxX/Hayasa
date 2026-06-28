-- Virtual folders for the media library (file-manager-lite).
create table if not exists public.media_folders (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

alter table public.media_folders enable row level security;
-- Admin-only via service-role client; no public policies.

-- ON DELETE SET NULL → deleting a folder moves its photos back to the root,
-- never deletes files / breaks tour links.
alter table public.media_assets
  add column if not exists folder_id uuid references public.media_folders(id) on delete set null;

create index if not exists media_assets_folder_idx on public.media_assets (folder_id);
