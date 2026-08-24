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

## Content

- Site copy and translations: `src/content.ts`
- Working timetable and confirmation notes: `content/schedule.md`
- Video mapping, source checksums, placement decisions, and generated assets: `content/media-library.md`
- Main layout and interactions: `src/App.tsx`
- Visual system and responsive behavior: `src/styles.css`

Keep camera originals outside the regular Git history. Approved web derivatives live in `public/media` so a normal clone contains everything required to run the site.
