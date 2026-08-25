# Передача сайта на `tela-vake.ge`

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

## До покупки домена

- Продолжать использовать `https://dancestudio-tela-vake.vercel.app`.
- Не ставить `tela-vake.ge` в canonical, рекламу или профили, пока домен не куплен и не подключён.
- После публикации текущих изменений проверить живой Vercel deployment.
- По желанию подтвердить временный Vercel URL в Search Console, но это не обязательно, если домен будет куплен скоро.

## После покупки `tela-vake.ge`

Выполнять по порядку:

1. Добавить `tela-vake.ge` и `www.tela-vake.ge` в тот же проект Vercel.
2. У регистратора домена установить DNS-записи, которые покажет Vercel, и дождаться статуса Valid Configuration / SSL active.
3. Сделать `tela-vake.ge` основным доменом, а `www.tela-vake.ge` перенаправлять на него.
4. В Vercel → Project Settings → Environment Variables установить для Production:

   ```text
   VITE_SITE_ORIGIN=https://tela-vake.ge
   ```

5. Выполнить новый production deploy. Не менять эту переменную до подключения домена: иначе sitemap и canonical будут вести на неработающий адрес.
6. Проверить страницы `/en/`, `/ka/`, `/ru/`, одну программу каждого языка, `/privacy/`, `robots.txt`, `sitemap.xml` и несуществующий URL.
7. Создать Domain property `tela-vake.ge` в Google Search Console и подтвердить её DNS TXT-записью.
8. Отправить `https://tela-vake.ge/sitemap.xml` в Search Console и запросить индексацию `/en/`, `/ka/` и `/ru/`.
9. Обновить Website URL в Google Business Profile, GA4 Web stream, Google Ads final URLs, Instagram и Facebook.
10. После проверки нового домена при необходимости обновить fallback в `.env.example` и `src/site.ts`; production уже будет работать через `VITE_SITE_ORIGIN`.

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
- Canonical, Open Graph, sitemap и JSON-LD используют только `https://tela-vake.ge`.
- `www` и HTTP перенаправляются на `https://tela-vake.ge` одним постоянным redirect.
- Favicon виден во вкладке браузера и в результате мобильного добавления на экран.
- Search Console не показывает проблем с индексацией, sitemap или structured data.
- GA4 Realtime продолжает получать события после смены домена.

