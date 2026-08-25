# Desktop Hero Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the desktop hero into a clean left-copy/right-video split while preserving the current video, header, and mobile presentation.

**Architecture:** Keep the existing React markup and playback logic. Express the composition through shared CSS split variables, anchor the hero copy to the same viewport guide as the video edge, and use English-only grid alignment for the final reassurance phrase while allowing Russian and Georgian to wrap naturally.

**Tech Stack:** React 19, TypeScript, CSS, Vitest, Vite

## Global Constraints

- Do not replace or edit `/media/hero-tela.webm`, `/media/hero-tela.mp4`, or `/media/hero-tela-poster.webp`.
- Do not change header navigation, language controls, booking controls, or video playback behaviour.
- Do not change the hero layout at widths at or below `820px`.
- The WhatsApp icon remains an icon; no visible `WhatsApp` label is added.
- On the reference English desktop layout, the right edge of the WhatsApp icon and the end of `program` share the video split guide.

---

### Task 1: Add a desktop hero layout regression contract

**Files:**
- Create: `src/desktopHeroLayout.test.js`
- Test: `src/desktopHeroLayout.test.js`

**Interfaces:**
- Consumes: CSS selectors in `src/styles.css`
- Produces: A regression test for the desktop split variable, clean background, shared anchors, and mobile override

- [ ] **Step 1: Write the failing test**

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

describe("desktop hero split", () => {
  it("uses a clean shared desktop split without changing the mobile video", () => {
    expect(css).toContain("--hero-split: 48vw;");
    expect(css).toContain("--hero-media-width: 52vw;");
    expect(css).toContain("left: var(--hero-split);");
    expect(css).toContain("width: calc(var(--hero-split) - max(2rem, calc((100vw - 1320px) / 2)));");
    expect(css).toContain(".language-en .reassurance li:last-child");
    expect(css).toContain("justify-self: end;");
    expect(css).toMatch(/@media \(max-width: 820px\)[\s\S]*?--hero-media-width: 100vw;[\s\S]*?\.hero-video::after \{ display: none; \}/);
    expect(css).not.toContain("background: #151113 url(\"/media/hero-tela-poster.webp\")");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test src/desktopHeroLayout.test.js`

Expected: FAIL because the current CSS uses a blurred poster fill and does not define the approved split anchors.

### Task 2: Implement the clean desktop split

**Files:**
- Modify: `src/styles.css:157-255`
- Modify: `src/styles.css:600-645`
- Test: `src/desktopHeroLayout.test.js`

**Interfaces:**
- Consumes: Existing `.hero`, `.hero-video`, `.hero-copy`, `.hero-meta`, and `.reassurance` markup
- Produces: `--hero-split` and `--hero-media-width` CSS variables shared by the video edge and copy anchors

- [ ] **Step 1: Define the desktop split and clean background**

Add desktop variables to `.hero`, replace the media-derived `.hero-video` background with `#151113`, remove the blurred poster pseudo-element, and create a one-pixel `.hero-video::after` divider at `left: var(--hero-split)`.

```css
.hero {
  --hero-split: 48vw;
  --hero-media-width: 52vw;
}
.hero-video { background: #151113; }
.hero-video::after {
  content: "";
  width: 1px;
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: var(--hero-split);
  background: rgba(208, 173, 107, 0.26);
  pointer-events: none;
}
```

- [ ] **Step 2: Anchor the video and left copy to the shared guide**

Use `var(--hero-media-width)` for the video and poster. Set `.hero-copy` to the viewport split minus the existing wrap margin, and remove the old `52%`/`44rem` cap. Let `.hero-meta` fill that width so its final WhatsApp icon ends on the same guide.

```css
.hero-copy {
  width: calc(var(--hero-split) - max(2rem, calc((100vw - 1320px) / 2)));
  max-width: none;
}
.hero-meta { width: 100%; max-width: none; }
```

- [ ] **Step 3: Align the English reassurance ending**

Keep the general wrapping layout for Russian and Georgian. For English only, use a three-column grid and right-align the last item so the end of `program` lands on the shared guide.

```css
.language-en .reassurance {
  grid-template-columns: max-content max-content minmax(0, 1fr);
  display: grid;
}
.language-en .reassurance li:last-child { justify-self: end; }
```

- [ ] **Step 4: Preserve the intermediate and mobile layouts**

At `max-width: 1120px`, use a `55vw`/`45vw` split to preserve copy room. At `max-width: 820px`, restore a full-width `100vw` video, hide the divider, and retain the existing `width: 100%` mobile copy rule.

```css
@media (max-width: 1120px) {
  .hero { --hero-split: 55vw; --hero-media-width: 45vw; }
}
@media (max-width: 820px) {
  .hero { --hero-split: 0; --hero-media-width: 100vw; }
  .hero-video::after { display: none; }
}
```

- [ ] **Step 5: Run the focused tests**

Run: `pnpm test src/desktopHeroLayout.test.js src/App.test.tsx`

Expected: PASS.

### Task 3: Verify the rendered result

**Files:**
- Verify: `src/styles.css`
- Verify: `dist/en/index.html`

**Interfaces:**
- Consumes: The completed CSS split
- Produces: Evidence that desktop alignment, mobile preservation, tests, and build are healthy

- [ ] **Step 1: Render the English page at the reference desktop viewport**

Run the local Vite server, open `/en/` at `1280 × 832`, and confirm the video begins at the shared vertical guide, the WhatsApp icon ends on that guide, and `program` does not cross into the video.

- [ ] **Step 2: Render the mobile page**

Open `/en/` at `390 × 844` and confirm the video remains full-width with the existing mobile gradient and stacking.

- [ ] **Step 3: Run all automated verification**

Run: `pnpm test`

Expected: all test files and tests pass.

Run: `pnpm build`

Expected: TypeScript, client build, SSR build, and prerender all succeed.

- [ ] **Step 4: Check and commit the implementation**

Run: `git diff --check`

Expected: no output.

```bash
git add src/styles.css src/desktopHeroLayout.test.js docs/superpowers/plans/2026-08-25-desktop-hero-split.md
git commit -m "Refine desktop hero split"
```
