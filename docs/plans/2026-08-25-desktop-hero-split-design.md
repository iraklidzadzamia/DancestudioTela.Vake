# Desktop hero split design

## Goal

Make the desktop hero read as an intentional split composition without replacing the existing hero video or changing the mobile layout.

## Approved composition

- Keep the current portrait hero video and all header controls.
- Keep the existing mobile hero unchanged.
- On desktop, replace the blurred poster fill beneath the video with a clean dark left panel.
- Keep the video full-height on the right and give its left edge a crisp vertical boundary.
- Use one shared vertical alignment guide for:
  - the rightmost point of the WhatsApp icon;
  - the end of the English reassurance phrase `First lesson free in every program`;
  - the start of the right-side video.
- Keep all hero copy, actions, social icons, and reassurance text inside the left panel.
- Let Russian and Georgian reassurance copy wrap naturally inside the same left boundary; the exact English word alignment must not force brittle spacing in other languages.

## Responsive behaviour

- Desktop and tablet widths above the existing mobile breakpoint use the split composition.
- Widths at or below `820px` retain the current full-width mobile video, gradients, spacing, and interactions.

## Visual treatment

- The left panel uses the existing dark hero colour rather than a media-derived blur.
- The boundary is a subtle one-pixel line so the split feels deliberate without competing with the copy.
- No changes are made to video sources, playback behaviour, navigation, language controls, or the booking button.

## Verification

- Confirm the alignment at the reference desktop viewport.
- Confirm that the English reassurance line does not cross into the video.
- Confirm that Russian and Georgian remain contained and readable.
- Confirm that the mobile screenshot/layout is unchanged.
- Run the full test suite and production build.
