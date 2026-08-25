# Header Optical Axis Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the dancer mark fixed while aligning the desktop wordmark with the navigation and raising the mobile wordmark and language labels by about 6–8px.

**Architecture:** Preserve the existing header markup and use optical offsets inside the current brand and language-button boxes. The logo remains the size-defining child, the wordmark keeps its lower-edge alignment and rises by `0.4rem` at every width, and the mobile breakpoint applies the same `0.4rem` offset only to the visible language labels inside their fixed touch targets.

**Tech Stack:** React 19, TypeScript, CSS, Vitest, Vite

## Global Constraints

- Do not move or resize the dancer mark at any breakpoint.
- Do not move the desktop navigation, language switcher, or booking button.
- Do not use `transform` or language-specific offsets.
- Raise the mobile wordmark and visible language labels by approximately `6–8px`.
- Keep the language buttons' existing touch-target rectangles and behaviour.
- Preserve the one-line multilingual hero eyebrow and all other hero geometry.

---

### Task 1: Independent desktop and mobile text alignment

**Files:**
- Modify: `src/styles.css:104-132`
- Modify: `src/styles.css:630-636`
- Test: `src/mobileHeaderEyebrow.test.js`

**Interfaces:**
- Consumes: `.brand`, `.brand-type`, `.logo-header`, and `.language-switcher button`
- Produces: a `0.4rem` wordmark lift and matching mobile language-label lift without changing the logo or element hit boxes

- [ ] **Step 1: Write the failing CSS regression test**

Extend `src/mobileHeaderEyebrow.test.js` with a dedicated source slice and assertions:

```js
const desktopHeaderCss = css.slice(
  css.indexOf(".brand {"),
  css.indexOf(".desktop-nav {"),
);

it("keeps the mark fixed while independently aligning header text", () => {
  expect(desktopHeaderCss).toMatch(/\.brand \{[^}]*align-items: flex-end;/);
  expect(desktopHeaderCss).toMatch(
    /\.brand-type \{[^}]*align-self: flex-end;[^}]*margin-bottom: 0\.4rem;/,
  );
  expect(mobileCss).toMatch(
    /\.language-switcher button \{[^}]*padding-block: 0 0\.4rem;/,
  );
  expect(css).not.toMatch(/\.brand-type \{[^}]*transform:/);
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `pnpm test src/mobileHeaderEyebrow.test.js`

Expected: FAIL because `.brand-type` has no independent optical offset and the language label has no `0.4rem` bottom padding.

- [ ] **Step 3: Implement the minimal CSS alignment**

Keep the wordmark flex-end aligned and add the measured `0.4rem` optical offset while leaving the brand and logo rules unchanged:

```css
.brand-type {
  align-self: flex-end;
  margin-bottom: 0.4rem;
  color: rgba(255, 255, 255, 0.92);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.34rem;
  font-weight: 400;
  letter-spacing: 0.018em;
  line-height: 1;
  white-space: nowrap;
  text-shadow: 0 0.35rem 1.2rem rgba(0, 0, 0, 0.72);
}
```

At `max-width: 820px`, adjust only the language-label interiors:

```css
.language-switcher button {
  display: grid;
  align-items: end;
  justify-items: center;
  padding-block: 0 0.4rem;
  line-height: 1;
}
```

Do not modify `.logo-header`, `.header`, `.desktop-nav`, `.header-actions`, or the button minimum dimensions.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `pnpm test src/mobileHeaderEyebrow.test.js`

Expected: PASS.

---

### Task 2: Verify measured geometry and publish

**Files:**
- Verify: `src/styles.css`
- Verify: `src/mobileHeaderEyebrow.test.js`

- [ ] **Step 1: Measure a representative desktop viewport**

Run the site at `1280x832` and measure the current homepage header before and after the CSS change. Confirm:

- the logo rectangle has the same `top`, `bottom`, and `width` as the baseline measurement;
- the vertical-centre difference between `.brand-type` and an actual `.desktop-nav a` link is at most `1px`;
- the main navigation, language switcher, and booking button rectangles do not move.

- [ ] **Step 2: Measure representative mobile viewports**

At 360x800, 390x844, and 430x932, confirm:

- the logo rectangle stays at its existing `top`, `bottom`, and breakpoint width;
- the wordmark and visible language-label bottoms rise by `6.4px` relative to the previous lower guide;
- the wordmark and language labels remain within `1px` of each other's optical bottom;
- every language button keeps its previous width and height;
- the gold eyebrow remains one line with no overlap in EN, KA, and RU.

- [ ] **Step 3: Run fresh project verification**

Run:

```bash
pnpm test
pnpm build
git diff --check
```

Expected: all tests pass, the production build exits 0, and `git diff --check` prints no errors.

- [ ] **Step 4: Commit and publish**

```bash
git add src/styles.css src/mobileHeaderEyebrow.test.js
git commit -m "Refine header text alignment"
git push origin main
```

After the Vercel deployment completes, verify the same desktop and 360px Russian measurements on `https://telavake.ge/`.
