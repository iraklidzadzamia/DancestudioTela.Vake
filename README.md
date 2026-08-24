# DanceStudio Tela, Vake

Premium mobile-first website for DanceStudio Tela in Vake, Tbilisi.

## Current product decisions

- English is the default language, with Georgian and Russian switchers.
- The existing Tela logo is preserved.
- The first lesson is free.
- Pro-Am Ballroom & Latin is the primary adult proposition.
- Instagram, Facebook, and WhatsApp will receive booking enquiries once final links are supplied.
- The real vertical studio film is used in the hero.
- Six additional approved content videos are prepared for Pro-Am, kids, Women's Tango, Georgian dance, and the emotional closing section.
- Program pages reuse the matching approved films; adult ballet temporarily uses an AI-generated photograph based on the real Tela interior and should be replaced when authentic ballet media is supplied.
- Teacher profiles, exact public class names, age groups, address, and direct contact links remain pending owner confirmation.

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

The project is configured for Vercel. `vercel.json` preserves direct access to the `/en/`, `/ka/`, and `/ru/` language paths.

Production: https://dancestudio-tela-vake.vercel.app

## Google Analytics and Google Ads measurement

Copy `.env.example` to `.env.local` for local testing, or add the same public values to the Vercel project environment:

- `VITE_GA_MEASUREMENT_ID`: GA4 web stream ID (`G-...`).
- `VITE_GOOGLE_ADS_ID` and `VITE_GOOGLE_ADS_LEAD_LABEL`: optional direct Google Ads website conversion destination (`AW-.../label`). Leave these blank when importing the same GA4 `generate_lead` event as the Primary Google Ads conversion.
- `VITE_WHATSAPP_URL`, `VITE_INSTAGRAM_URL`, `VITE_FACEBOOK_URL`, `VITE_PHONE_NUMBER`: final public contact destinations.

The site loads the Google tag only when at least one Google ID is configured. Consent Mode defaults advertising and analytics storage to denied, shows a localized consent banner, and stores the visitor's choice locally.

Measurement events:

- `page_view`: manual page views for language and program routes.
- `begin_lead`: a visitor opens the contact journey from a CTA; diagnostic only.
- `contact_channel_click`: any connected social/contact destination; diagnostic only.
- `generate_lead`: WhatsApp, phone, or a future successfully submitted website form; use as the Primary GA4 key event.

Recommended Google Ads setup: link GA4 to Google Ads, enable auto-tagging, mark `generate_lead` as a GA4 key event, then import it into Google Ads as a Primary conversion. Keep calls from ads as a separate Primary conversion. Do not make `page_view`, `begin_lead`, or social profile visits Primary conversions.

## Content

- Site copy and translations: `src/content.ts`
- Working timetable and confirmation notes: `content/schedule.md`
- Video mapping, source checksums, placement decisions, and generated assets: `content/media-library.md`
- Main layout and interactions: `src/App.tsx`
- Program-page media mapping: `src/programMedia.ts`
- Shared poster-first and resilient mobile-autoplay behavior: `src/AutoPlayVideo.tsx`, `src/videoPlayback.ts`
- Visual system and responsive behavior: `src/styles.css`

Keep camera originals outside the regular Git history. Approved web derivatives live in `public/media` so a normal clone contains everything required to run the site.
