# Mobile header and hero eyebrow alignment

## Goal

Polish two details in the homepage hero without changing its established visual identity:

- align the mobile language switcher with the lower visual guide shared by the dancer mark and the `Dance Studio Tela` wordmark;
- simplify the gold hero eyebrow and keep it on one line on phones in English, Georgian, and Russian.

## Approved header treatment

- Preserve the current dancer-mark size at every breakpoint.
- Preserve the existing lower-edge alignment between the dancer mark and the wordmark.
- On mobile, align the brand and header actions to one shared lower guide.
- Align the visible language labels to the bottom of their existing touch targets, rather than moving them with a hard-coded transform.
- Keep the current 44-pixel minimum touch target where it applies and preserve all language-switching behaviour.
- Do not change the desktop navigation or booking controls.

## Approved eyebrow copy

Remove the redundant `TELA` prefix from the hero eyebrow in every language and at every viewport size:

- English: `SINCE 1970 · VAKE, TBILISI`
- Georgian: `1970 წლიდან · ვაკე, თბილისი`
- Russian: `С 1970 ГОДА · ВАКЕ, ТБИЛИСИ`

The brand name remains clearly visible in the header wordmark, so removing it from the eyebrow reduces repetition without weakening recognition.

## Responsive behaviour

- Keep the eyebrow on one line at phone widths.
- Use responsive font size and tracking for the eyebrow instead of allowing a second line.
- Preserve the current social icons and their touch targets.
- At the narrowest breakpoint, retain the existing removal of the decorative eyebrow line to free horizontal space.
- Do not force the desktop eyebrow into a smaller mobile treatment.

## Verification

- Confirm the brand wordmark and `EN / KA / RU` labels share one lower visual guide on representative phone widths.
- Confirm the logo remains the same size as before.
- Confirm all three approved eyebrow strings render on one line at 360, 390, and 430 CSS pixels.
- Confirm language switching, booking, and contact links still work.
- Run focused layout and copy tests, the full test suite, and the production build.
