# Header optical axis refinement

## Goal

Refine the header typography without moving or resizing the dancer mark:

- on desktop, align `Dance Studio Tela` with the visual axis of the main navigation;
- on mobile, raise `Dance Studio Tela` and the visible `EN / KA / RU` labels slightly above the mark's lower edge.

## Approved desktop treatment

- Keep the dancer mark in its current position and at its current size.
- Keep the header, navigation, language switcher, and booking control in their current positions.
- Independently centre the wordmark within the mark-height brand container so its visual text axis matches `Programs / Pro-Am / Schedule / Our Story`.
- Do not move the whole brand group and do not use a transform.

## Approved mobile treatment

- Keep the dancer mark in its current position and at every existing responsive size.
- Raise the wordmark approximately `6–8px`, about 15% of the mobile mark height.
- Raise the visible language labels by the same optical amount.
- Keep the language buttons' existing touch-target rectangles in place; only their internal label alignment changes.
- Preserve the current one-line gold eyebrow treatment and all other hero geometry.

## Responsive behaviour

- Desktop and tablet widths above the mobile breakpoint use the navigation-axis wordmark alignment.
- At `820px` and below, switch to the smaller, controlled upward offset instead of full centring.
- The existing mark widths at `52px`, `46px`, and `42px` remain unchanged.
- No language-specific offsets are introduced.

## Verification

- On desktop, compare the vertical centre of the wordmark with the main navigation text.
- On mobile, confirm the mark does not move while the wordmark and language labels rise together by roughly `6–8px`.
- Verify at 360, 390, and 430 CSS pixels, plus a representative desktop viewport.
- Confirm all language buttons retain their existing hit areas and language switching still works.
- Run focused regression tests, the full test suite, and the production build.
