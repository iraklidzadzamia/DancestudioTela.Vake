# Social logo assets design

## Goal

Replace the current crop-sensitive photographic link preview with a durable logo-led social identity, while also preserving a reusable square logo asset for future services.

## Source invariant

Use `public/tela-logo.png` as the only logo source. Do not redraw, stretch, regenerate, or alter the emblem, lettering, colors, or proportions.

## Deliverables

### Reusable square logo

- File: `public/tela-logo-square.png`
- Canvas: 1200×1200 pixels
- Background: deep plum-black atmosphere matching the desktop hero
- Composition: the existing round logo centered with generous breathing room
- Use: Google Business Profile, social avatars, directory listings, and future brand integrations

### Link preview

- File: `public/og.png`
- Canvas: 1200×630 pixels, preserving the standard Open Graph ratio
- Composition: the same logo treatment centered inside the middle 630×630 safe zone
- Crop behavior: a centered square crop must keep the entire logo visible
- Copy: no additional text inside the image; platforms already show the page title below it

## Visual treatment

- Base color: near-black plum compatible with the website hero
- Depth: restrained plum glow and subtle warm edge light
- Texture: very light static grain, with no high-frequency pattern around the logo
- Contrast: keep the original lilac and white logo fully readable at small sizes

## Implementation constraints

- Compose deterministically from the exact source logo; do not use generative editing.
- Preserve the existing `og:image` and `twitter:image` URLs so cached integrations continue to use `/og.png` after refresh.
- Keep the square asset as a separate reusable project file.
- Copy the square version to the user's Desktop after verification.

## Verification

- Confirm exact output dimensions and file formats.
- Visually inspect both assets at original size and thumbnail scale.
- Verify the 630×630 center crop of `og.png` contains the complete logo.
- Run project tests and the production build.
- Deploy, verify `/og.png`, and account for social-platform cache refresh delay.
