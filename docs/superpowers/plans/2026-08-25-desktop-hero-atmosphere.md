# Desktop Hero Atmosphere Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a subtle, cinematic desktop-only background treatment to the hero copy panel while leaving the video and mobile hero unchanged.

**Architecture:** Keep the existing hero DOM and split variables. Add one desktop-only `::before` layer for plum and warm radial light, and override the existing `::after` texture only on desktop with lightweight static SVG grain embedded in CSS. Preserve the current mobile `::after` rule by scoping all new treatment to `@media (min-width: 821px)`.

**Tech Stack:** CSS, Vitest, Vite, React 19

## Global Constraints

- Keep the existing `#181214` hero base colour.
- Apply the new atmosphere only at widths of `821px` and above.
- Do not add JavaScript, WebGL, dependencies, or external image requests.
- Do not alter copy, layout, video playback, poster behaviour, controls, or Analytics events.
- Decorative layers must remain non-interactive and behind the header and hero copy.

---

### Task 1: Desktop-only atmospheric background

**Files:**
- Modify: `src/desktopHeroLayout.test.js`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: existing `--hero-split` desktop layout variable and `.hero` stacking context.
- Produces: `.hero::before` atmospheric lighting and desktop `.hero::after` organic grain, both clipped to `var(--hero-split)`.

- [ ] **Step 1: Write the failing regression test**

Add the following test to `src/desktopHeroLayout.test.js`:

```js
it("adds a static atmospheric treatment only to the desktop copy panel", () => {
  expect(css).toMatch(
    /@media \(min-width: 821px\)[\s\S]*?\.hero::before \{[\s\S]*?width: var\(--hero-split\);[\s\S]*?radial-gradient\([\s\S]*?pointer-events: none;/,
  );
  expect(css).toMatch(
    /@media \(min-width: 821px\)[\s\S]*?\.hero::after \{[\s\S]*?width: var\(--hero-split\);[\s\S]*?feTurbulence[\s\S]*?mix-blend-mode: soft-light;/,
  );
  expect(css).not.toMatch(/@keyframes hero-(?:glow|gradient|atmosphere)/);
  expect(css).toMatch(
    /@media \(max-width: 820px\)[\s\S]*?--hero-split: 0; --hero-media-width: 100vw;/,
  );
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
pnpm test -- src/desktopHeroLayout.test.js
```

Expected: FAIL because the desktop `::before` atmosphere and SVG grain override do not exist yet.

- [ ] **Step 3: Add the minimal desktop CSS implementation**

Add the following block after the base `.hero::after` rule in `src/styles.css`:

```css
@media (min-width: 821px) {
  .hero::before {
    content: "";
    width: var(--hero-split);
    position: absolute;
    z-index: 1;
    inset: 0 auto 0 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 78% 56% at 36% 55%, rgba(184, 144, 204, 0.13) 0%, rgba(119, 66, 99, 0.075) 38%, transparent 72%),
      radial-gradient(ellipse 56% 80% at 100% 42%, rgba(208, 173, 107, 0.075) 0%, rgba(121, 82, 59, 0.035) 42%, transparent 74%),
      linear-gradient(145deg, rgba(91, 38, 63, 0.12) 0%, transparent 42%),
      linear-gradient(180deg, rgba(8, 6, 7, 0.2) 0%, transparent 24%, transparent 70%, rgba(8, 6, 7, 0.32) 100%);
  }

  .hero::after {
    width: var(--hero-split);
    inset: 0 auto 0 0;
    opacity: 0.12;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.58'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    mix-blend-mode: soft-light;
  }
}
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```bash
pnpm test -- src/desktopHeroLayout.test.js
```

Expected: PASS.

- [ ] **Step 5: Run the full automated verification**

Run:

```bash
pnpm test
pnpm build
```

Expected: all Vitest tests pass and the prerendered production build completes successfully.

- [ ] **Step 6: Visually verify desktop and mobile rendering**

Start the local production preview and inspect `/en/` at `1440px`, `1024px`, and `390px` widths. Confirm:

- the left desktop panel has restrained plum depth and fine grain;
- the warm seam glow does not visibly tint the video;
- the split line, header, headline, body, buttons, and reassurance remain readable;
- the mobile hero remains full-video with its existing shading and no desktop background layer.

- [ ] **Step 7: Commit the implementation**

```bash
git add src/desktopHeroLayout.test.js src/styles.css
git commit -m "Refine desktop hero atmosphere"
```

