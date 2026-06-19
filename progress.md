# Hayasa Tours — План работ (progress)

Дата: 2026-06-18. Стек: Next.js 14 (App Router), TS, Tailwind, next-intl (en/ru/hy), Supabase.
Главная цель сейчас: **админ-панель для управления сайтом** + реальная БД.

Решения (согласованы):
- Объём админки: **Туры (CRUD)**, **Брони**, **Остановки и фото**, **Контент сайта**.
- Вход админа: **Supabase email/пароль + роль `admin`**.
- Бэкенд: **применить схему Supabase сейчас**, админка пишет в реальную БД.

Язык интерфейса админки: русский.
Маршрут админки: `/admin` (вне i18n-локализации).

Легенда: `[ ]` не сделано · `[~]` в работе · `[x]` готово · `[!]` нужно действие пользователя.

---

## Часть 0. Быстрые правки UI  ✅
- [x] Hero: убрать текст бейджа («Խմբակային…»), оставить только языки.
- [x] Hero/LangSwitcher: заменить 🇬🇧 на `EN`.

## Часть 1. БД и схема Supabase
- [x] Применить `web/supabase/schema.sql` (применено через Supabase MCP, миграция `hayasa_core_schema`).
- [x] Миграция `web/supabase/admin.sql`: `profiles.is_admin` + триггеры (миграция `hayasa_admin_additions`).
- [x] Admin-политики RLS: чтение/запись `tours`, `stops`, `stop_photos`, `bookings` для админов.
- [x] Storage-бакет `tour-photos` (публичное чтение, запись только админ).
- [x] Email provider включён (пользователь, 2026-06-18).
- [x] `SUPABASE_SERVICE_ROLE_KEY` в `web/.env.local` (есть; **подлежит ротации** — был засвечен).
- [x] Первый админ создан: `karapetyanhaykoooo@gmail.com`, `is_admin = true` (сверено в БД).
- [x] Сид туров: 6 туров + 18 остановок (миграции `seed_tours`, `seed_stops`). Доп. колонки `location_hy/ru/en`.

## Часть 2. Авторизация админа
- [x] `lib/supabase-server.ts`: серверный клиент (cookies) + service-role клиент.
- [x] `lib/supabase-browser.ts`: browser-клиент (@supabase/ssr) для входа.
- [x] `lib/admin-auth.ts`: `requireAdmin()` + `getAdminUser()` — проверка сессии и `is_admin`.
- [x] Страница входа `/admin/login` (Supabase email/пароль + проверка is_admin).
- [x] Защита всех `/admin/*` через route group `(panel)` + `requireAdmin()`.
- [x] Исключить `/admin` из next-intl middleware (matcher).
- [x] Кнопка выхода (server action `signOutAction`).

## Часть 3. Каркас админ-панели
- [x] `app/admin/(panel)/layout.tsx`: сайдбар (Дашборд/Туры/Брони/Контент) + email + выход.
- [x] Дашборд `/admin`: счётчики (туры, активные, брони, pending).
- [x] Единый стиль на **Tailwind** (navy/teal/edge/muted), отдельный root-layout (RU, noindex).
- [x] Тосты (sonner) на действия CRUD.

## Часть 4. Туры — CRUD  ✅
- [x] Список `/admin/tours`: таблица (название, страна, категория, дата, цена, места, статус).
- [x] Создание `/admin/tours/new`: форма (3 языка, категория, страна, дата, цена, места, язык, обложка, активность).
- [x] Редактирование `/admin/tours/[id]/edit`.
- [x] Удаление (confirm) / переключатель активности (`TourActions`).
- [x] Server actions (`createTour/updateTour/deleteTour/toggleTourActive`) + `requireAdmin()` + Zod (`zod@4`).
- [x] Загрузка обложки в Storage `tour-photos` (через service-клиент в server action).
- Примечание: client-safe константы/схема в `lib/admin-tours.ts`, server-read в `lib/admin-tours-data.ts` (server-only).

## Часть 5. Остановки и фото  ✅
- [x] В редакторе тура: список остановок (`StopsManager`) — порядок, координаты, названия/описания 3 языка.
- [x] Добавить/изменить/удалить остановку (`createStop/updateStop/deleteStop`).
- [x] Фото-галерея остановки: загрузка в `tour-photos/stops/`, удаление (storage+row), порядок по `order_index`.
- [x] Координаты — ручной ввод lat/lng (number). Карта Yandex — опционально позже.

## Часть 6. Брони  ✅
- [x] Список `/admin/bookings`: дата, тур, имя, телефон, места, источник, статус.
- [x] Смена статуса (pending/confirmed/paid/cancelled) — `StatusSelect` + `updateBookingStatus`.
- [x] Поиск по телефону/имени (ilike), фильтр по статусу (searchParams GET-форма).
- [x] Подсчёт суммы мест по выборке.

## Часть 7. Контент сайта  ✅ (контакты)
- [x] Таблица `site_content` (key, value_ru/hy/en) + RLS (public read, admin write).
- [x] Редактор контактов `/admin/content` (`ContentForm` + `saveContent` upsert) — заменяет хардкод `lib/contact.ts`.
- [x] Публичные страницы читают из БД с фолбэком: `getContact()` → секция контактов главной (проверено: email/whatsapp из БД).
- [x] Редактор текстов Hero (3 языка) — `getContentLocalized()`, hero на главной читает из БД с фолбэком на next-intl.

## Часть 8. Публичный сайт → реальная БД  ✅
- [x] `lib/db.ts`: `getPublicTours()`/`getPublicTour(id)` — чтение туров+остановок из Supabase, маппинг в публичную `Tour` форму, фолбэк на mock.
- [x] `/tours` (server-обёртка + `ToursClient`), `/tours/[id]` (async + `getTranslations`), `/book/[id]` (`BookingClient`), главная (async), `sitemap.ts` — все читают из БД (фолбэк на mock).
- [x] Бронь пишет реальный `tour_id` (uuid из БД). Проверено HTTP-рендером: /tours=6 туров, деталь/бронь/sitemap 200.
- [x] `my-tours`/`profile` читают реальные брони/профиль юзера из БД (`lib/my-bookings.ts`).

## Часть 9. Прочие TODO (из памяти проекта)
- [x] Сжать `public/hero-ararat.jpg` — 1.92 → 0.58 МБ (sharp, resize≤2400 q80).
- [x] Починить множественное «1 departures» на `/tours` — ICU plural en/ru subtitle + en seatsLeft.
- [x] Sonner-тосты на действия админки.
- [!] Ротация Magic MCP ключа (21st.dev) — был засвечен в чате.
- [!] Ротация Supabase service_role ключа + пароля админа — были засвечены в чате.

---

## Часть 10. Пост-MVP (сделано автономно 2026-06-19)
- [x] **Фото на витрине:** `cover_image_url` + фото остановок (`stop_photos`) показываются на `/tours`, детали (hero+миниатюры+роадмап), бронировании; фолбэк на `Scenery` если фото нет. Типы `Tour.cover`/`Stop.photos`, маппинг в `lib/db.ts`.
- [x] **Аккаунты:** бронь привязывается к `user_id` залогиненного; `/my-tours` и `/profile` читают реальные брони/профиль из БД (`lib/my-bookings.ts`), профиль редактируется (upsert). Ключи i18n firstName/lastName/save/loginPrompt.
- [x] **Безопасность:** RLS вставки броней ужесточена (`status=pending`, `source in web/app`, `seats 1..20`, `user_id null|own`); снят листинг бакета `tour-photos`. Остаются (твоё, dashboard): leaked-password protection.
- [x] **Уведомления о брони админу** — механизм готов: `lib/notify.ts` (Telegram) + роут `/api/notify-booking` (сверяет бронь по id + свежесть) + вызов из `BookingClient`. **Активируется** при `TELEGRAM_BOT_TOKEN`+`TELEGRAM_CHAT_ID` в env (без них — тихий no-op). Уведомление клиенту (email) — отдельно, нужен Resend/SMTP.

## Часть 11. Прод-готовность / разбор слабых мест (2026-06-19)
- [x] **Овербукинг:** триггер `sync_booked_seats` ведёт `tours.booked_seats` из реальных броней; ручное поле убрано из формы.
- [x] **Индексы БД** (8 шт.: bookings user_id/status/tour_id/created_at, tours is_active/date_start, stops tour_id, stop_photos stop_id).
- [x] **Миграции в репо:** `web/supabase/migrations/*.sql` (10 миграций + storage-config + README) — БД воспроизводима.
- [x] **Валидация загрузок:** размер (≤5 МБ) + mime в server actions; бакет `tour-photos` ограничен 5 МБ + image-mime.
- [x] **`next/image`** для обложек/фото (remotePatterns на Supabase host) + security-заголовки в `next.config`.
- [x] **Кэш:** `force-dynamic` → ISR `revalidate=300`; правки туров/остановок/контента инвалидируют публичные страницы через `revalidatePath`.
- [x] **UX брони:** офлайн-индикация (persisted=false).
- [x] **Дедуп** форматирования дат/loc в `lib/format.ts`.
- [ ] **Апгрейд Next** (audit: 1 high + 2 moderate) — **отложено**: фикс требует Next 15/16 = React 19 + async cookies/params + next-intl 4 (мульти-breaking, отдельный тестируемый заход). На Vercel часть DoS-CVE митигируется платформой.
- Прим.: SSR для `/my-tours` + сверка анонимных броней по телефону — отложено (требует унификации публичного auth на cookies).

### Сверка (verified 2026-06-19)
БД: tours=6, stops=18, bookings=0, site_content=6, триггер мест=1, custom-индексов=8, admin_flag=true, bucket_limit=5 МБ, RLS-политик(public)=14.
Код/репо: 12 файлов миграций; `lib/format.ts`/`my-bookings.ts`/`site-content-data.ts`/`next.config.mjs` на месте.
Git main: всё закоммичено и запушено. E2E 12/12 PASS после Tailwind-переписки, 0 console errors.

## Часть 12. Карта, поиск места, аккаунты, уведомления (2026-06-19)
- [x] **Карта маршрута:** рендер на **Yandex Maps** (`WebMap`), рисует precomputed дорогу `tours.route_path` + номерные маркеры (фолбэк — прямая). Роутинг-ключ Yandex НЕ нужен.
- [x] **Геометрия дорог:** бесплатный **OSRM** (`lib/osrm.ts`), сохраняется в `tours.route_path` (jsonb [lat,lng]). Пересчёт авто при add/edit/delete/reorder остановок.
- [x] **Поиск места в админке:** `PlaceSearch` — автокомплит через **Mapbox Geocoding** (fetch, токен `NEXT_PUBLIC_MAPBOX_TOKEN`, страны am/ge). Выбор → координаты подставляются сами. Проверено: «Гарни»→40.1139,44.7317.
- [x] **Drag-реордер остановок:** перетаскивание карточек → `reorderStops` → пересчёт маршрута.
- [x] **Регистрация юзера** на `/auth` (`signUp` + переключатель вход/регистрация, обработка подтверждения почты). i18n-ключи добавлены. Google авто-создаёт.
- [x] **Уведомление о брони админу:** `lib/notify.ts` (Telegram) + `/api/notify-booking` (сверка брони по id) + вызов из `BookingClient`. Активируется `TELEGRAM_BOT_TOKEN`+`TELEGRAM_CHAT_ID`.
- История карты: Yandex(straight)→multiRouter(только точки, роутинг-ключ платный)→Leaflet/OSM(не понравился вид)→Mapbox(не понравилось)→**Yandex + route_path** (финал). Mapbox-токен оставлен только для геокодинг-поиска в админке.
- ENV: `NEXT_PUBLIC_YANDEX_MAPS_KEY` (карта), `NEXT_PUBLIC_MAPBOX_TOKEN` (поиск). Оба в `.env.local` (есть).

## Нужно от пользователя (осталось)
- [ ] Реальный контент: настоящие туры/цены/контакты через `/admin`.
- [ ] Активировать уведомления: добавить `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` в `web/.env.local` (механизм уже в коде).
- [ ] Leaked-password protection — тумблер в Supabase Dashboard.
- [ ] Хостинг (Vercel) + домен.
- [!] Ротация засвеченных секретов: `service_role` ключ, пароль админа, Magic MCP ключ.
