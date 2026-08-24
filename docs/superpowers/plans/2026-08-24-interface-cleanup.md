# Tela Interface Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove unexplained numbering and initial play flashes, replace the boxed heritage logo, move film captions above frames, and rebalance affected responsive compositions.

**Architecture:** Extend the existing `AutoPlayVideo` state model so visible UI follows manual intent rather than raw playback state. Keep internal program identifiers untouched while simplifying only rendered markup. Reuse one SVG dancer-mark component for header and heritage, then use responsive CSS and browser inspection to finish the composition.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library, Vite, Playwright CLI.

## Global Constraints

- Preserve poster-first media, near-viewport source loading, 35%/300 ms autoplay, resume position, one-active-film behavior, Reduced Motion, Save Data, hidden-tab handling, and WebM/MP4 fallbacks.
- The hero still loads and autoplays immediately.
- A play affordance is visible only after a manual pause.
- Program numbers remain available internally for routing and keys.
- Journey and FAQ sequence numbers remain visible.
- Captions sit immediately above their film frame.
- No CTA may separate a caption from its film.

---

### Task 1: Manual-only play affordance

**Files:**
- Modify: `src/AutoPlayVideo.test.tsx`
- Modify: `src/AutoPlayVideo.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Preserves: `AutoPlayVideo(props: AutoPlayVideoProps)`
- Adds internal state: `isManuallyPaused: boolean`

- [ ] **Step 1: Write failing component assertions**

In the initial-poster test, assert `.media-play-affordance` is absent. In the manual-pause test, assert it appears after clicking the playing frame and disappears after clicking again.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `pnpm test src/AutoPlayVideo.test.tsx`

Expected: FAIL because the affordance currently renders whenever `isPlaying` is false.

- [ ] **Step 3: Implement manual-only state**

Add `isManuallyPaused` state. Set it to `true` only in the explicit pause branch of `togglePlayback`, set it to `false` in the explicit resume branch, and render `.media-play-affordance` only when it is true. Do not change automatic pause handlers.

- [ ] **Step 4: Add and verify hero coverage**

In `src/App.test.tsx`, render the homepage, assert `.hero-play-affordance` is absent initially, dispatch a `play` event, click the hero video, and assert the affordance appears. Add matching `heroManuallyPausedVisible` state in `HomePage` and update it only in `toggleHeroPlayback`.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `pnpm test src/AutoPlayVideo.test.tsx src/App.test.tsx`

Expected: all focused tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/AutoPlayVideo.test.tsx src/AutoPlayVideo.tsx src/App.test.tsx src/App.tsx
git commit -m "Show play affordance only after manual pause"
```

---

### Task 2: Heritage mark and public-number cleanup

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces: `DancerMark({ className }: { className: string })`
- Preserves: internal `Program["number"]` values

- [ ] **Step 1: Write failing integration assertions**

Assert that `.heritage-emblem img`, `.program-row-number`, `.programs-count`, `.audience-switch button > span`, `.schedule-panel-title i`, and `.related-grid a > span` are absent. Assert `.heritage-mark` exists.

- [ ] **Step 2: Run App tests and verify RED**

Run: `pnpm test src/App.test.tsx`

Expected: FAIL on current logo image and rendered numbers.

- [ ] **Step 3: Implement the reusable dancer mark**

Create `DancerMark` in `src/App.tsx` using `useId()`-derived unique filter and mask IDs and `/tela-logo-header.jpg` as the luminance-mask source. Use it in the header and heritage section. Remove the `full` logo branch and obsolete `.logo-full` styles.

- [ ] **Step 4: Remove public number markup**

Remove the number span from `ProgramList`, the `01`/`02` spans from audience buttons, the `.programs-count` block, the schedule title count, and related-card number spans. Update grid templates and spacing without changing internal data.

- [ ] **Step 5: Run App tests and verify GREEN**

Run: `pnpm test src/App.test.tsx`

Expected: all App tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/App.test.tsx src/App.tsx src/styles.css
git commit -m "Simplify heritage and public numbering"
```

---

### Task 3: Captions above films and responsive composition

**Files:**
- Modify: `src/AutoPlayVideo.test.tsx`
- Modify: `src/AutoPlayVideo.tsx`
- Modify: `src/styles.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Preserves: `caption?: { title: string; note: string }`
- Produces DOM order: `figcaption` before `.cinematic-video-frame`

- [ ] **Step 1: Write the failing DOM-order test**

Render a captioned film and assert:

```ts
const figure = container.querySelector("figure")!;
expect(figure.firstElementChild?.tagName).toBe("FIGCAPTION");
expect(figure.children[1]).toHaveClass("cinematic-video-frame");
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `pnpm test src/AutoPlayVideo.test.tsx`

Expected: FAIL because the button currently precedes the caption.

- [ ] **Step 3: Move and restyle captions**

Render `figcaption` before the button. Replace `padding-top`/`border-top` with `padding-bottom`/`border-bottom`, keep title/note hierarchy, and add a small bottom gap so the caption reads as the film label rather than a detached footer.

- [ ] **Step 4: Lock the children title to two lines on phones**

At `max-width: 520px`, apply a dedicated `.kids-film .editorial-copy h2` font size and max width that keeps the English title on two lines at 373–478 px without clipping. Do not insert language-specific hard line breaks.

- [ ] **Step 5: Run component tests and verify GREEN**

Run: `pnpm test src/AutoPlayVideo.test.tsx`

Expected: all component tests PASS.

- [ ] **Step 6: Reorder the mobile children and Georgian CTAs**

Move `.kids-program-links` and the Georgian `.text-link` into dedicated grid items. On desktop, keep each action beneath its corresponding copy column. At `max-width: 820px`, place the labelled film immediately after the introductory copy and the action after the film. DOM order must match this mobile reading order; use desktop grid areas to restore the side-by-side composition rather than CSS visual order that conflicts with keyboard navigation.

- [ ] **Step 7: Inspect all compositions in a real browser**

At 390 px and at a desktop width, inspect Pro-Am, children, both tango films, Georgian dance, closing reel, and a program detail page. Verify each caption is immediately adjacent to its video, no CTA sits between caption and frame, children and Georgian actions follow their media on phones, and section rhythm remains balanced.

- [ ] **Step 8: Run regression verification**

Run:

```bash
pnpm test
pnpm build
git diff --check
```

Expected: all tests PASS, production build succeeds, and diff check emits no output.

- [ ] **Step 9: Commit**

```bash
git add src/AutoPlayVideo.test.tsx src/AutoPlayVideo.tsx src/App.tsx src/styles.css
git commit -m "Move film captions above media"
```
