# Hayasa Tours — Web (Next.js 14)

Marketing + booking site for group tours across **Armenia & Georgia**.
Ported from the **Lagoon Bungalow** design kit (`../Hayasa Tours Design System`).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — palette in `tailwind.config.ts`
- **next-intl** — full i18n, routes under `/[locale]` (`en` / `ru` / `hy`)
- **Supabase** — DB / Auth / Storage (optional; mock fallback when unset)
- **Yandex Maps JS API** — real route map (optional; SVG fallback when unset)
- Fonts via `next/font`: Cormorant Garamond / Inter / JetBrains Mono

## Run

```bash
npm install
cp .env.example .env.local   # fill in keys (all optional)
npm run dev                  # http://localhost:3000 → redirects to /en
```

## Environment (`.env.local`)

| Var | Purpose | Without it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | DB, Auth, bookings | Mock tours; booking confirms offline (not persisted) |
| `NEXT_PUBLIC_YANDEX_MAPS_KEY` | Real route map | Static SVG map tracing real coords |
| `NEXT_PUBLIC_SITE_URL` | SEO canonical / sitemap origin | Defaults to `https://hayasatours.am` |

## Pages

Home (with About + Contact sections), Tours (search + country + date + guide-language
filters), Tour detail (per-tour content, roadmap, map, mobile sticky CTA), Booking
(validated form → Supabase or offline), My Tours (Upcoming/Past), Profile, Auth,
Privacy. Localized `not-found` / `error` / `loading`. `sitemap.xml` + `robots.txt`.

## Supabase setup

1. Create a project, copy the URL + anon/publishable key into `.env.local`.
2. Run `supabase/schema.sql` in the Supabase SQL editor (or `supabase db push`
   after `supabase login && supabase link --project-ref <ref>`).
3. Seed `tours` / `stops` and switch the pages from the `lib/tours.ts` mock to
   `lib/db.ts` reads.

Until the schema is applied, booking inserts fail gracefully and are treated as
offline requests — the customer flow never breaks.

## Mock data

`src/lib/tours.ts` — 6 tours with locale-keyed content + stop coordinates,
mirroring the Supabase column layout for a 1:1 swap.
