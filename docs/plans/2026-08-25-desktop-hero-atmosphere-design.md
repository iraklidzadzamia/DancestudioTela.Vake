# Desktop Hero Atmosphere Design

## Goal

Give the desktop hero's left copy panel more visual depth without changing its established dark plum-brown palette, competing with the video, or affecting the mobile hero.

## Approved direction

Use a static, layered cinematic background on the desktop copy side only:

- keep the existing `#181214` base colour;
- add a restrained plum-lilac radial bloom behind the headline area;
- add a much softer warm brown-gold glow near the split with the video;
- replace the current barely visible diagonal pattern with subtle organic film grain;
- preserve the existing dark top and bottom falloff for text contrast;
- keep the right-hand video, copy, layout, and interaction unchanged.

The background will remain static. The video already supplies motion, so an animated mesh or liquid gradient would create competing movement and make the hero feel more like a technology landing page than an editorial dance-studio identity.

## Responsive behaviour

The atmospheric layers apply only above the existing `820px` mobile breakpoint. At `820px` and below, the hero remains a full-width video with its existing shade treatment. No new background layer should be visible on mobile.

## Implementation constraints

- CSS-only; no new image assets, JavaScript, WebGL, or dependencies.
- Decorative layers must stay behind all interactive content and ignore pointer input.
- The effect must not reduce text contrast or alter the gold split line.
- Existing video autoplay, poster, controls, and Analytics events remain untouched.
- Respect the existing desktop split values at default and compact desktop widths.

## Verification

- Add a focused CSS regression test for the desktop-only atmospheric layers.
- Run the full automated test suite and production build.
- Visually inspect the live hero at representative desktop widths and confirm the mobile hero is unchanged.

