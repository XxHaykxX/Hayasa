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
- [!] Включить Email provider в Supabase Auth.
- [!] Добавить `SUPABASE_SERVICE_ROLE_KEY` в `web/.env.local` (server-only, НЕ NEXT_PUBLIC).
- [!] Создать первого админа: зарегистрировать email, выставить `is_admin = true`.
- [x] Сид туров: 6 mock-туров + 18 остановок в `tours`/`stops` (миграции `seed_tours`, `seed_stops`). Доп. колонки `location_hy/ru/en`.

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
- [x] Единый стиль (teal/coral/navy), отдельный root-layout (RU, noindex).
- [ ] Тосты (sonner) на действия — добавить при CRUD.

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
- [ ] Редактор текстов Hero/секций — отложено (тексты идут через next-intl; крупный рефактор, низкий приоритет).

## Часть 8. Публичный сайт → реальная БД  ✅
- [x] `lib/db.ts`: `getPublicTours()`/`getPublicTour(id)` — чтение туров+остановок из Supabase, маппинг в публичную `Tour` форму, фолбэк на mock.
- [x] `/tours` (server-обёртка + `ToursClient`), `/tours/[id]` (async + `getTranslations`), `/book/[id]` (`BookingClient`), главная (async), `sitemap.ts` — все читают из БД (фолбэк на mock).
- [x] Бронь пишет реальный `tour_id` (uuid из БД). Проверено HTTP-рендером: /tours=6 туров, деталь/бронь/sitemap 200.
- Прим.: `my-tours` оставлен на mock (демо-данные пользователя).

## Часть 9. Прочие TODO (из памяти проекта)
- [ ] Сжать `public/hero-ararat.jpg` (~1.97 МБ) — нужен инструмент (sharp/внешний); отложено.
- [x] Починить множественное «1 departures» на `/tours` — ICU plural в en/ru subtitle + en seatsLeft (проверено).
- [ ] Sonner-тосты на действия админки — опционально (сейчас inline-сообщения об ошибках).
- [!] Ротация Magic MCP ключа (21st.dev) — был засвечен в чате.
- [!] Ротация Supabase service_role ключа — был засвечен в чате.

---

## Порядок выполнения
1. Часть 1 (схема + admin SQL + бакет) — частично требует действий пользователя.
2. Часть 2 (авторизация) и Часть 3 (каркас) — параллельно после env.
3. Часть 4 → 5 → 6 → 7.
4. Часть 8 после сида данных.
5. Часть 9 в конце.

## Нужно от пользователя (блокеры)
- [!] Применить `schema.sql` + `admin.sql` в Supabase.
- [!] Включить Email provider в Supabase Auth.
- [!] Дать `SUPABASE_SERVICE_ROLE_KEY` (в `.env.local`).
- [!] Назначить первого админа (`is_admin = true`).
