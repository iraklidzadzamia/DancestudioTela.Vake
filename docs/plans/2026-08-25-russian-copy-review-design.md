# Russian Copy Review Design

## Goal

Replace the current Russian website copy with the owner-approved native editorial version without changing layout, routing, analytics, or contact behavior.

## Editorial rules

- Address the visitor consistently with the informal singular `ты` where the interface speaks directly to them.
- Keep the brand in Latin script as `Tela`; never use `«Тела»`, `«Телы»`, or `«Теле»`.
- Use `Женское танго` instead of `Women’s Tango` in connected Russian copy.
- Use `файлы cookie` and `аналитические файлы cookie` consistently.
- Keep standalone international names such as `Ballroom & Latin`, `Pro-Am`, `Google Maps`, and `WhatsApp` unchanged.
- Keep the approved WhatsApp prefill exactly: `Здравствуйте! Хочу записаться на первый бесплатный урок.`
- Preserve the English source meaning while preferring natural Russian phrasing over literal translation.

## Scope

- `src/content.ts`: Russian page metadata, hero, Pro-Am, journey, programs, schedule, heritage, FAQ, contact, and footer copy.
- `src/App.tsx`: Russian interface, video, booking-dialog, and privacy-policy copy.
- `src/ConsentBanner.tsx`: Russian consent copy and cookie terminology.
- `src/contacts.ts`: Russian WhatsApp prefill.
- Tests: add exact copy assertions, informal-address audits, brand-spelling audits, rendered-page assertions, and WhatsApp URL verification.

## Out of scope

- No visual or layout changes.
- No changes to English or Georgian copy.
- No analytics, routing, SEO architecture, contact destination, or deployment changes.

## Verification

The change is complete only when focused Russian-copy tests fail before implementation and pass afterward, the complete test suite passes, the production build succeeds, prerendered Russian pages contain the approved copy, and searches find no rejected formal-address or Cyrillic-brand variants.
