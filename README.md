# DanceStudio Tela, Vake

Premium mobile-first website for DanceStudio Tela in Vake, Tbilisi.

## Current product decisions

- English is the default language, with Georgian and Russian switchers.
- The existing Tela logo is preserved.
- The first lesson is free.
- Pro-Am Ballroom & Latin is the primary adult proposition.
- Instagram Direct, Facebook Messenger, WhatsApp, phone, and Google Maps are connected to the approved public destinations.
- The real vertical studio film is used in the hero.
- Six additional approved content videos are prepared for Pro-Am, kids, Women's Tango, Georgian dance, and the emotional closing section.
- Program pages reuse the matching approved films; adult ballet temporarily uses an AI-generated photograph based on the real Tela interior and should be replaced when authentic ballet media is supplied.
- The public address is confirmed as 2/5 Ateni Street, Vake, Tbilisi. Teacher profiles, exact public class names, and age groups remain pending owner confirmation.

## Continue on another computer

```bash
git clone https://github.com/iraklidzadzamia/DancestudioTela.Vake.git
cd DancestudioTela.Vake
pnpm install
pnpm dev
```

The repository contains the complete website source and all web-ready media. The large camera originals are intentionally not required for development or deployment.

## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

The project is configured for Vercel. The production build pre-renders the `/en/`, `/ka/`, and `/ru/` language and program paths, then generates `sitemap.xml`, `robots.txt`, and `404.html`.

Production: https://telavake.ge

The permanent domain is `telavake.ge`; `www.telavake.ge` redirects to it permanently. Keep `VITE_SITE_ORIGIN=https://telavake.ge` for production. The domain migration record and remaining external-service steps are in [`docs/plans/2026-08-25-tela-vake-domain-handoff.md`](docs/plans/2026-08-25-tela-vake-domain-handoff.md).

## Google Analytics and Google Ads measurement

The current verified tracking state, approved advertising decisions, and exact
resume sequence for another computer or agent are in
[`docs/plans/2026-08-25-google-ads-search-launch-strategy.md`](docs/plans/2026-08-25-google-ads-search-launch-strategy.md).

Copy `.env.example` to `.env.local` for local testing, or add the same public values to the Vercel project environment:

- `VITE_GA_MEASUREMENT_ID`: optional GA4 web stream override. Production defaults to Tela's `G-YZREYM9M7W` stream.
- `VITE_GOOGLE_ADS_ID`: optional Google Ads tag destination (`AW-...`). Import the GA4 key events rather than sending duplicate direct conversion labels.
- `VITE_INSTAGRAM_DM_URL`, `VITE_FACEBOOK_MESSENGER_URL`, `VITE_GOOGLE_MAPS_URL`, `VITE_WHATSAPP_NUMBER`, `VITE_PHONE_NUMBER`: optional public contact overrides. The approved Instagram Direct, Facebook Messenger, Maps, WhatsApp, and phone defaults live in `src/contacts.ts`.

The site loads the Google tag only when at least one Google ID is configured. Consent Mode defaults advertising and analytics storage to denied, shows a localized consent banner, and stores the visitor's choice locally.

Measurement events:

- `page_view`: manual page views for language and program routes.
- `booking_modal_open`: a visitor opens the free-lesson contact chooser; diagnostic only.
- `contact_whatsapp`, `contact_instagram`, `contact_facebook`, `contact_phone`, `get_directions`: high-intent outbound actions. Each includes `placement`, `page_path`, and `language`; booking-dialog choices also include `booking_source`, so the CTA that opened the dialog remains attributable.
- `scroll_depth`: emitted once per route at 25%, 50%, 75%, and 90%.
- `section_view`: emitted when a visitor reaches the main homepage sections.
- `generate_lead`: reserved for a future successfully submitted website form or confirmed lead.

Recommended Google Ads setup: link GA4 to Google Ads, enable auto-tagging, and import the five high-intent contact events as separate conversion actions. Keep `booking_modal_open`, `page_view`, `scroll_depth`, and `section_view` as diagnostic-only events. Choose Primary versus Secondary contact actions deliberately after checking which channels produce qualified conversations and enrollments. `placement` and `booking_source` are registered as event-scoped GA4 custom dimensions; page path remains available as a standard dimension. Because page views and scroll depth are sent manually, disable browser-history page views and Scrolls in GA4 Enhanced Measurement to avoid duplicate events.

## Content

- Site copy and translations: `src/content.ts`
- Working timetable and confirmation notes: `content/schedule.md`
- Video mapping, source checksums, placement decisions, and generated assets: `content/media-library.md`
- Main layout and interactions: `src/App.tsx`
- Program-page media mapping: `src/programMedia.ts`
- Shared poster-first and resilient mobile-autoplay behavior: `src/AutoPlayVideo.tsx`, `src/videoPlayback.ts`
- Visual system and responsive behavior: `src/styles.css`

Keep camera originals outside the regular Git history. Approved web derivatives live in `public/media` so a normal clone contains everything required to run the site.
