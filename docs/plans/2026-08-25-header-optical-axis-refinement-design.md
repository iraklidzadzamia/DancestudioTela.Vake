# Header optical axis refinement

## Goal

Refine the header typography without moving or resizing the dancer mark:

- on desktop, align `Dance Studio Tela` with the visual axis of the main navigation;
- on mobile, raise `Dance Studio Tela` and the visible `EN / KA / RU` labels slightly above the mark's lower edge.

## Approved desktop treatment

- Keep the dancer mark in its current position and at its current size.
- Keep the header, navigation, language switcher, and booking control in their current positions.
- Independently raise the wordmark by `0.4rem` so its visible text centre matches `Programs / Pro-Am / Schedule / Our Story`.
- Do not move the whole brand group and do not use a transform.

## Approved mobile treatment

- Keep the dancer mark in its current position and at every existing responsive size.
- Raise the wordmark approximately `6–8px`, about 15% of the mobile mark height.
- Raise the visible language labels by the same optical amount.
- Keep the language buttons' existing touch-target rectangles in place; only their internal label alignment changes.
- Preserve the current one-line gold eyebrow treatment and all other hero geometry.

## Responsive behaviour

- All widths use the same controlled `0.4rem` wordmark offset; this keeps the visible desktop text axis aligned with the navigation and gives the approved mobile lift.
- At `820px` and below, apply the same `0.4rem` optical offset inside each language button while leaving its touch target fixed.
- The existing mark widths at `52px`, `46px`, and `42px` remain unchanged.
- No language-specific offsets are introduced.

## Verification

- On desktop, compare the vertical centre of the wordmark with the visible main-navigation link text, not the zero-height navigation anchor.
- On mobile, confirm the mark does not move while the wordmark and language labels rise together by roughly `6–8px`.
- Verify at 360, 390, and 430 CSS pixels, plus a representative desktop viewport.
- Confirm all language buttons retain their existing hit areas and language switching still works.
- Run focused regression tests, the full test suite, and the production build.
