# Supabase migrations

Canonical, ordered SQL migrations for the Hayasa database. Apply in filename
order to rebuild the schema, RLS policies, storage bucket, triggers, indexes
and seed data from scratch.

```bash
# with the Supabase CLI (linked project)
supabase db push

# or run each file in order via the SQL editor / psql
```

Order:

1. `20260618180944_hayasa_core_schema` — tables (tours, stops, stop_photos, profiles, bookings) + base RLS
2. `20260618180958_hayasa_admin_additions` — profiles.is_admin, is_admin()/handle_new_user, admin RLS, tour-photos bucket
3. `20260618184623_tours_add_location_localized` — tours.location_hy/ru/en
4. `20260618184805_seed_tours` — 6 demo tours
5. `20260618185002_seed_stops` — 18 stops
6. `20260618191834_site_content` — editable site content (contacts)
7. `20260618214833_tighten_bookings_insert_rls` — constrained booking inserts
8. `20260618214914_tighten_tour_photos_listing` — drop public bucket listing
9. `20260618225617_sync_booked_seats_trigger` — auto-maintain tours.booked_seats
10. `20260618225624_add_indexes` — FK / query indexes
11. `20260619000000_storage_bucket_limits` — tour-photos size + mime limits

`../schema.sql` and `../admin.sql` are the original hand-written files and are
kept for reference only — these migrations supersede them.
