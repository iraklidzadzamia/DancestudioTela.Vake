# DanceStudio Tela, Vake

Premium mobile-first website for DanceStudio Tela in Vake, Tbilisi.

## Current product decisions

- English is the default language, with Georgian and Russian switchers.
- The existing Tela logo is preserved.
- The first lesson is free.
- Pro-Am Ballroom & Latin is the primary adult proposition.
- Instagram, Facebook, and WhatsApp will receive booking enquiries once final links are supplied.
- The hero video, teacher profiles, exact public class names, age groups, address, and direct contact links remain pending owner confirmation.

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
- Main layout and interactions: `src/App.tsx`
- Visual system and responsive behavior: `src/styles.css`

Do not commit source videos from `media/originals`. Final approved web video derivatives should be copied into `public/media` when the video-selection task is complete.
