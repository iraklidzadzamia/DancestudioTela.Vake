# Hero geometry refinement design

## Goal

Make the desktop hero split feel geometrically deliberate in every language and make the header brand mark align cleanly with its wordmark on desktop and mobile.

## Approved navigation geometry

- Keep the existing four navigation links and their order.
- Split the navigation structurally into two two-link groups.
- On the homepage desktop hero, anchor the right edge of the first group and the left edge of the second group to the video divider with equal half-gaps.
- The divider therefore passes through the exact centre of the whitespace between the second and third links for English, Georgian, and Russian without language-specific offsets.
- Preserve the existing navigation treatment, link spacing inside each group, language switcher, and booking button.
- Keep the standard centred navigation on internal pages.

## Approved hero boundary spacing

- Keep the rightmost WhatsApp icon aligned to the video divider.
- Give the reassurance list a shared 16px safe area before the divider on desktop.
- Apply the same containment rule to English, Georgian, and Russian; no text may touch or cross into the video.
- Preserve natural wrapping for Georgian and Russian.
- Keep the current full-width mobile hero unchanged.

## Approved brand alignment

- Align the visible brand mark and the `Dance Studio Tela` wordmark to one lower horizontal guide.
- Use bottom-edge layout alignment instead of viewport-specific vertical nudges.
- Preserve the SVG aspect ratio and tune the mark size only for optical balance.
- Apply the same rule at desktop, mobile, 400px, and 360px breakpoints.
- If the SVG crop contains internal whitespace, correct the crop/viewBox rather than compensating with arbitrary margins.

## Responsive behaviour

- The split navigation geometry is active only while the desktop navigation is visible above `1120px`.
- At and below `1120px`, the navigation remains hidden as it is now.
- At and below `820px`, the video remains full-width and the reassurance list returns to its existing mobile layout.
- The brand lower-edge alignment remains consistent at every breakpoint.

## Verification

- At representative desktop widths, measure the divider and confirm it equals the midpoint between navigation links two and three for EN, KA, and RU.
- Confirm every desktop reassurance item ends at least 16px before the divider.
- Confirm the WhatsApp icon still ends at the divider.
- Confirm the visible lower points of the brand mark and wordmark share one horizontal guide on desktop and mobile.
- Confirm internal-page navigation remains centred.
- Run focused regression tests, the full test suite, and the production build.
