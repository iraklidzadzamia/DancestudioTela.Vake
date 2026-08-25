# Mobile Header and Hero Eyebrow Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the current mobile logo size, align the language labels with the lower edge of the logo/wordmark, and keep the shortened gold hero eyebrow on one line in English, Georgian, and Russian.

**Architecture:** Keep the existing React structure and solve the change through localized content strings and responsive CSS. Add focused source-level regression tests for multilingual copy, touch-target preservation, lower-guide alignment, and one-line mobile rendering; then verify the actual geometry in a browser at representative phone widths.

**Tech Stack:** React 19, TypeScript, CSS, Vitest, Vite

## Global Constraints

- Preserve the current dancer-mark sizes at every breakpoint.
- Preserve the existing lower-edge alignment between the dancer mark and wordmark.
- Do not use `transform` or language-specific pixel offsets to position the language labels.
- Keep the language controls usable as touch targets and preserve language-switching behaviour.
- Remove `TELA` only from the gold hero eyebrow; do not remove the brand elsewhere.
- Keep the eyebrow on one line at 360, 390, and 430 CSS pixels in all three languages.
- Preserve the social icons and the existing narrow-screen removal of the decorative eyebrow line.

---

### Task 1: Shorten the multilingual hero eyebrow

**Files:**
- Modify: `src/content.ts:84,191,298`
- Create: `src/mobileHeaderEyebrow.test.js`

**Interfaces:**
- Consumes: the existing `SiteCopy.hero.eyebrow` strings
- Produces: one shorter eyebrow string for each supported language

- [ ] **Step 1: Write the failing copy assertions**

Create a focused source regression test:

```js
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const content = readFileSync("src/content.ts", "utf8");

describe("multilingual hero eyebrow", () => {
  it("uses the approved short copy in every language", () => {
    expect(content).toContain('eyebrow: "SINCE 1970 · VAKE, TBILISI"');
    expect(content).toContain('eyebrow: "1970 წლიდან · ვაკე, თბილისი"');
    expect(content).toContain('eyebrow: "С 1970 ГОДА · ВАКЕ, ТБИЛИСИ"');
    expect(content).not.toMatch(/eyebrow: "TELA ·/);
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `pnpm test src/mobileHeaderEyebrow.test.js`

Expected: FAIL because all three eyebrow strings still begin with `TELA ·`.

- [ ] **Step 3: Replace the three eyebrow strings**

In `src/content.ts`, use exactly:

```ts
eyebrow: "SINCE 1970 · VAKE, TBILISI",
eyebrow: "1970 წლიდან · ვაკე, თბილისი",
eyebrow: "С 1970 ГОДА · ВАКЕ, ТБИЛИСИ",
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `pnpm test src/mobileHeaderEyebrow.test.js`

Expected: PASS.

---

### Task 2: Align mobile language labels and prevent eyebrow wrapping

**Files:**
- Modify: `src/styles.css:630-649`
- Modify: `src/styles.css:735-795`
- Test: `src/mobileHeaderEyebrow.test.js`

**Interfaces:**
- Consumes: `.header`, `.header-actions`, `.language-switcher button`, `.hero-meta .eyebrow`, and existing phone breakpoints
- Produces: a shared lower alignment guide and a one-line responsive eyebrow

- [ ] **Step 1: Add failing CSS regression assertions**

Extend the focused test:

```js
const css = readFileSync("src/styles.css", "utf8");

it("bottom-aligns mobile header content without shrinking the mark", () => {
  expect(css).toMatch(
    /@media \(max-width: 820px\)[\s\S]*?\.header \{[^}]*align-items: end;/,
  );
  expect(css).toMatch(
    /@media \(max-width: 820px\)[\s\S]*?\.language-switcher button \{[^}]*display: grid;[^}]*align-items: end;/,
  );
  expect(css).toMatch(/@media \(max-width: 820px\)[\s\S]*?\.logo-header \{ width: 52px; \}/);
  expect(css).toMatch(/@media \(max-width: 400px\)[\s\S]*?\.logo-header \{ width: 46px; \}/);
  expect(css).toMatch(/@media \(max-width: 360px\)[\s\S]*?\.logo-header \{ width: 42px; \}/);
});

it("keeps the mobile eyebrow on one line with responsive type", () => {
  expect(css).toMatch(
    /@media \(max-width: 520px\)[\s\S]*?\.hero \.eyebrow \{[^}]*white-space: nowrap;[^}]*font-size: clamp\(/,
  );
  expect(css).toMatch(
    /@media \(max-width: 520px\)[\s\S]*?\.hero-meta \.eyebrow \{[^}]*flex: 1 1 auto;/,
  );
  expect(css).toMatch(/@media \(max-width: 400px\)[\s\S]*?\.hero \.eyebrow::before \{ display: none; \}/);
});
```

- [ ] **Step 2: Run the focused test to verify the new assertions fail**

Run: `pnpm test src/mobileHeaderEyebrow.test.js`

Expected: FAIL because the shared lower alignment and nowrap rules are not present.

- [ ] **Step 3: Add the minimal responsive CSS**

At `max-width: 820px`, bottom-align the header grid and the visible label inside each unchanged touch target:

```css
.header { min-height: 84px; align-items: end; gap: 0.75rem; padding-bottom: 1rem; }
.language-switcher button { display: grid; align-items: end; justify-items: center; padding-block: 0; line-height: 1; }
```

At `max-width: 520px`, keep the copy on one line and allow it to use the available space next to the fixed social icons:

```css
.hero-meta .eyebrow { flex: 1 1 auto; }
.hero .eyebrow {
  white-space: nowrap;
  font-size: clamp(0.52rem, 2.1vw, 0.6rem);
  letter-spacing: clamp(0.06em, 0.32vw, 0.14em);
}
```

Retain the current logo widths and the existing `max-width: 400px` removal of `.hero .eyebrow::before`.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `pnpm test src/mobileHeaderEyebrow.test.js`

Expected: PASS.

---

### Task 3: Verify behaviour and visual geometry

**Files:**
- Verify: `src/content.ts`
- Verify: `src/styles.css`
- Verify: `src/mobileHeaderEyebrow.test.js`

- [ ] **Step 1: Run all automated checks**

Run:

```bash
pnpm test
pnpm build
git diff --check
```

Expected: all tests pass, the production build exits 0, and `git diff --check` prints no errors.

- [ ] **Step 2: Check representative phone widths in a real browser**

Run `pnpm dev --host 127.0.0.1`, then inspect `/en/`, `/ka/`, and `/ru/` at 360x800, 390x844, and 430x932.

For every language and viewport, confirm:

- `eyebrow.getBoundingClientRect().height` is no more than one computed line height;
- the eyebrow does not overlap the social icons;
- the visible bottoms of the wordmark and `EN / KA / RU` labels share the intended guide;
- the logo width remains 42px at 360px, 46px from 361-400px, and 52px above 400px;
- language switching and the hero contact links remain interactive.

- [ ] **Step 3: Commit the implementation**

```bash
git add src/content.ts src/styles.css src/mobileHeaderEyebrow.test.js
git commit -m "Polish mobile header and hero eyebrow"
```
