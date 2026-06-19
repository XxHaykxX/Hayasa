-- Cached road geometry (array of [lat,lng]) for the public route map.
-- Populated from OSRM via the stops editor (see lib/osrm.ts).
alter table public.tours
  add column if not exists route_path jsonb;
