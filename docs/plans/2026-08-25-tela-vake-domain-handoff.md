# Передача сайта на `telavake.ge`

## Зачем была нужна эта работа

Сайт уже работает на временном адресе Vercel. Сейчас мы подготовили его так, чтобы Google мог читать отдельные английские, грузинские и русские страницы, а будущий домен подключался без переделки сайта.

Покупка домена сама по себе не улучшит позиции в Google. Она даст постоянный адрес бренда. Индексация начинается после подключения домена, подтверждения владения в Google Search Console и отправки sitemap.

## Уже сделано в коде

- Созданы статические индексируемые HTML-страницы для трёх языков и всех программ.
- Для каждой страницы настроены собственные `title`, description, canonical и `hreflang`.
- Добавлены `sitemap.xml`, `robots.txt` и настоящая страница 404 с `noindex`.
- Добавлены структурированные данные `DanceSchool` / `LocalBusiness` с адресом `2/5 Ateni Street, Vake, Tbilisi, Georgia`, телефоном и публичными ссылками.
- Адрес показан в footer; добавлена локализованная privacy policy.
- Из текущей фигуры танцоров сделаны favicon, Apple Touch Icon и web app icons.
- Убран SPA catch-all, из-за которого сервер отдавал одну страницу по любому URL.
- Основной адрес сайта управляется одной переменной: `VITE_SITE_ORIGIN`.

## Текущее состояние домена

- Домен `telavake.ge` куплен и активен до 26.08.2027.
- В Domenebi.ge установлены собственные nameserver `ns1.vercel-dns.com` и `ns2.vercel-dns.com`.
- `telavake.ge` и `www.telavake.ge` имеют статус Valid Configuration в Vercel.
- `telavake.ge` подключён к Production, а `www.telavake.ge` перенаправляется на него кодом 308.
- Публичные DNS-серверы Google и Cloudflare уже видят Vercel; локальные DNS-кэши могут обновляться позже.

## Оставшиеся действия

Выполнять по порядку:

1. В Vercel → Project Settings → Environment Variables установить для Production, если переменная существует:

   ```text
   VITE_SITE_ORIGIN=https://telavake.ge
   ```

2. Выполнить новый production deploy с canonical, sitemap, robots и Open Graph на новом домене.
3. Проверить страницы `/en/`, `/ka/`, `/ru/`, одну программу каждого языка, `/privacy/`, `robots.txt`, `sitemap.xml` и несуществующий URL.
4. Создать Domain property `telavake.ge` в Google Search Console и подтвердить её DNS TXT-записью.
5. Отправить `https://telavake.ge/sitemap.xml` в Search Console и запросить индексацию `/en/`, `/ka/` и `/ru/`.
6. Обновить Website URL в Google Business Profile, GA4 Web stream, Google Ads final URLs, Instagram и Facebook.

## Google Analytics и Google Ads после появления данных

- Отметить как key events только действия с явным намерением: `contact_whatsapp`, `contact_instagram`, `contact_facebook`, `contact_phone`, `get_directions`.
- Не делать key events из `page_view`, `section_view`, `scroll_depth` и `booking_modal_open`.
- Звонки не обязаны быть целью кампании. Если они нужны только для наблюдения, держать `Calls from ads` как Secondary или не добавлять Phone call lead в кампанию.
- Основную оптимизацию рекламы лучше строить на реально желательных контактах и подтверждённых записях, а не на каждом клике по номеру.

## Что ещё потребует решения владельца

- Подтвердить расписание, возрастные группы, имена и профили преподавателей перед публикацией конкретных обещаний.
- Когда появятся реальные фотографии балета, заменить временное изображение на странице взрослого балета.
- После накопления данных проверить поисковые запросы Google Ads, географию кликов и качество обращений до расширения радиусов или бюджета.

## Финальная проверка после миграции

- Все основные URL возвращают `200`, неизвестный URL — `404`.
- Canonical, Open Graph, sitemap и JSON-LD используют только `https://telavake.ge`.
- `www` и HTTP перенаправляются на `https://telavake.ge` одним постоянным redirect.
- Favicon виден во вкладке браузера и в результате мобильного добавления на экран.
- Search Console не показывает проблем с индексацией, sitemap или structured data.
- GA4 Realtime продолжает получать события после смены домена.
