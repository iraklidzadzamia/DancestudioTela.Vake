# Video and Program Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace intrusive video controls and placeholders with poster-first, viewport-aware media, and repair the mobile schedule selector.

**Architecture:** Move reusable playback behavior into `AutoPlayVideo`, keep program-media selection in a pure mapping module, and let `App.tsx` compose those pieces for homepage and detail routes. Existing WebM-first/MP4-fallback delivery remains unchanged; CSS supplies the paused affordance, detail-card treatment, and mobile schedule layout.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, jsdom, CSS, Playwright CLI for final browser verification.

## Global Constraints

- The hero loads and autoplays immediately; do not add a Save Data fallback to the hero.
- All other films remain poster-first and load only near their viewport.
- Autoplay begins after 35% visibility remains stable for 300 ms.
- Scroll-away pauses and scroll-return resumes from the same time unless the visitor manually paused.
- Only one film plays at a time.
- No persistent square play/pause controls and no `01`–`06` labels on films.
- The entire film frame is the pointer and keyboard playback control; show a centered play affordance only while paused.
- Preserve Reduced Motion, Save Data, hidden-tab, WebM-first, MP4 fallback, and non-looping closing-film behavior.
- Adult ballet uses optimized `public/media/adult-ballet-hero-v1.webp`, with the PNG retained as its source, and must not be described as documentary footage.
- Mobile schedule day pairs use one full-width row per option.

---

### Task 1: Test tooling and program-media mapping

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/programMedia.ts`
- Test: `src/programMedia.test.ts`

**Interfaces:**
- Produces: `getProgramMedia(audience: "adults" | "kids", slug: string): ProgramMedia | null`
- Produces: `ProgramMedia = { kind: "video"; base: string } | { kind: "image"; src: string }`

- [ ] **Step 1: Install the test dependencies and add the test script**

Run:

```bash
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

Add to `package.json` scripts:

```json
"test": "vitest run"
```

Create `vitest.config.ts` with jsdom and `src/test/setup.ts` as the setup file; import `@testing-library/jest-dom/vitest` in the setup file.

- [ ] **Step 2: Write the failing mapping tests**

Create `src/programMedia.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getProgramMedia } from "./programMedia";

describe("getProgramMedia", () => {
  it("maps adult programs to honest approved media", () => {
    expect(getProgramMedia("adults", "ballroom-latin")).toEqual({ kind: "video", base: "proam-story" });
    expect(getProgramMedia("adults", "womens-tango")).toEqual({ kind: "video", base: "tango-on-bars" });
    expect(getProgramMedia("adults", "georgian-dance")).toEqual({ kind: "video", base: "georgian-dance" });
    expect(getProgramMedia("adults", "ballet")).toEqual({ kind: "image", src: "/media/adult-ballet-hero-v1.webp" });
    expect(getProgramMedia("adults", "pro-am")).toEqual({ kind: "video", base: "proam-story" });
  });

  it("maps kids programs to the approved shared films", () => {
    expect(getProgramMedia("kids", "ballroom-latin")).toEqual({ kind: "video", base: "kids-coaching" });
    expect(getProgramMedia("kids", "ballet")).toEqual({ kind: "video", base: "kids-coaching" });
    expect(getProgramMedia("kids", "georgian-dance")).toEqual({ kind: "video", base: "georgian-dance" });
  });

  it("returns null for an unknown route", () => {
    expect(getProgramMedia("adults", "unknown")).toBeNull();
  });
});
```

- [ ] **Step 3: Run the mapping test and verify RED**

Run:

```bash
pnpm test src/programMedia.test.ts
```

Expected: FAIL because `src/programMedia.ts` does not exist.

- [ ] **Step 4: Implement the minimal mapping**

Create `src/programMedia.ts` with the exact discriminated union and route-key map required by the test. Return `null` for keys not present in the map.

- [ ] **Step 5: Run the mapping test and verify GREEN**

Run:

```bash
pnpm test src/programMedia.test.ts
```

Expected: all three tests PASS.

- [ ] **Step 6: Commit the mapping and test foundation**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/test/setup.ts src/programMedia.ts src/programMedia.test.ts public/media/adult-ballet-hero-v1.png public/media/adult-ballet-hero-v1.webp
git commit -m "Add program media mapping and test foundation"
```

---

### Task 2: Poster-first reusable autoplay video

**Files:**
- Create: `src/AutoPlayVideo.tsx`
- Test: `src/AutoPlayVideo.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces: `AutoPlayVideo(props: AutoPlayVideoProps): JSX.Element`
- Consumes: section asset base names such as `proam-story`; sources resolve to `/media/sections/<base>.webm`, `/media/sections/<base>.mp4`, and `/media/sections/<base>-poster.webp`.

- [ ] **Step 1: Write failing component tests**

Create controllable `IntersectionObserver` and `matchMedia` test doubles in `src/AutoPlayVideo.test.tsx`. Render `AutoPlayVideo` and assert:

```tsx
expect(screen.getByRole("button", { name: "Play film" })).toBeInTheDocument();
expect(container.querySelector("video")).toHaveAttribute("poster", "/media/sections/proam-story-poster.webp");
expect(container.querySelectorAll("source")).toHaveLength(0);
```

Trigger the load observer near the viewport and assert two sources appear in WebM/MP4 order. Trigger 35% visibility, advance fake timers by 299 ms, and assert `HTMLMediaElement.prototype.play` has not run; advance one more millisecond and assert it runs once. Click the frame while playing and assert `pause` runs; leave and re-enter visibility and assert a manually paused film does not restart.

- [ ] **Step 2: Run the component test and verify RED**

Run:

```bash
pnpm test src/AutoPlayVideo.test.tsx
```

Expected: FAIL because `AutoPlayVideo` does not exist.

- [ ] **Step 3: Implement `AutoPlayVideo` minimally**

Create `src/AutoPlayVideo.tsx` with:

```ts
export type AutoPlayVideoProps = {
  base: string;
  playLabel: string;
  pauseLabel: string;
  className?: string;
  loop?: boolean;
  caption?: { title: string; note: string };
  autoplayDelayMs?: number;
};
```

Use two observers: `rootMargin: "600px 0px"` for source insertion and threshold `0.35` for playback. Use a cancellable `window.setTimeout` with a default of `300` ms before automatic play. Keep `manuallyPaused` and `userActivated` refs, pause on hidden tabs and custom `tela:film-play` events, and preserve Save Data/Reduced Motion behavior. Render the frame as an accessible button with the video marked `aria-hidden="true"`; render only a centered play affordance while `isPlaying` is false. Do not render a sequence number or persistent corner control.

- [ ] **Step 4: Run the component test and verify GREEN**

Run:

```bash
pnpm test src/AutoPlayVideo.test.tsx
```

Expected: all component behavior tests PASS.

- [ ] **Step 5: Replace homepage `CinematicVideo` usage**

Import `AutoPlayVideo` in `src/App.tsx`, remove the local `CinematicVideo` implementation, and replace each homepage film with `AutoPlayVideo`. Preserve all six asset bases, localized captions, per-language labels, CSS classes, and `loop={false}` for `closing-emotional`. Remove every film `number` prop.

For the hero, keep the existing observer and immediate autoplay. Make the actual hero video pointer/keyboard operable without a visible square control, show the centered play affordance only when manually paused, and preserve resume-from-current-time behavior after scrolling away and back.

- [ ] **Step 6: Update film CSS**

Remove `.hero-media-control`, `.cinematic-video-control`, and `.cinematic-video-number`. Reset button styling on `.cinematic-video-frame`, add pointer/focus-visible treatment to the full frame, and add a restrained circular `.media-play-affordance` centered over paused media. Add hero hit-testing so links and copy remain interactive while uncovered video areas can toggle playback.

- [ ] **Step 7: Run tests and build**

Run:

```bash
pnpm test
pnpm build
```

Expected: all tests PASS and the Vite production build completes with no TypeScript errors.

- [ ] **Step 8: Commit playback behavior**

```bash
git add src/AutoPlayVideo.tsx src/AutoPlayVideo.test.tsx src/App.tsx src/styles.css
git commit -m "Refine poster-first video playback"
```

---

### Task 3: Program hero media and mobile schedule

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Test: `src/programMedia.test.ts`

**Interfaces:**
- Consumes: `getProgramMedia(audience, slug)` from Task 1.
- Consumes: `AutoPlayVideo` from Task 2.
- Produces: detail-route hero media with class names `program-hero-film` or `program-hero-image`.

- [ ] **Step 1: Extend the mapping test for complete route coverage**

Add a table-driven test containing all eight public audience/slug pairs and assert every one returns non-null media. Run the test before integration and verify it fails if any public route is missing.

- [ ] **Step 2: Integrate mapped detail media**

In `ProgramPage`, resolve `const programMedia = getProgramMedia(audience, slug)`. For video media, render `AutoPlayVideo` with `className="program-hero-film"`, no external caption, and localized play/pause labels. For image media, render:

```tsx
<figure className="program-hero-image">
  <img src={programMedia.src} alt={title} />
</figure>
```

Remove the public `Tela` placeholder, reserved-film copy, and decorative media number from program heroes. Keep `PortraitMedia` only where it still has a real image consumer; delete it if no consumer remains.

- [ ] **Step 3: Style detail media**

Give `program-hero-film` and `program-hero-image` the established `4 / 5` card ratio, arched top corners, subtle border, shadow, and `object-fit: cover`. Apply a neutral focal position to video and a centered focal position to the ballet image. Ensure the mobile card fits within `72svh` without cropping the caption because detail media has no external caption.

- [ ] **Step 4: Repair mobile schedule spacing**

At `max-width: 520px`, change `.schedule-tabs` to `grid-template-columns: 1fr`, remove odd-child divider rules, apply `padding: 0.9rem 1rem`, keep markers aligned right, set a readable line-height, and reduce `.schedule-layout` margin/gap so the selector and panel read as one interaction.

- [ ] **Step 5: Run automated verification**

Run:

```bash
pnpm test
pnpm build
```

Expected: all tests PASS and production build succeeds.

- [ ] **Step 6: Run browser verification**

Use a 373 px mobile viewport and verify:

- initial homepage requests include the hero film and posters but no editorial `.webm`/`.mp4`;
- Pro-Am video starts only after its stable visibility threshold;
- scrolling away pauses and returning resumes unless manually paused;
- program routes show mapped media and `/ru/adults/ballet/` shows `adult-ballet-hero-v1.webp`;
- no film sequence numbers or square corner controls are visible;
- schedule day pairs are four full-width readable rows.

- [ ] **Step 7: Commit the integrated result**

```bash
git add src/App.tsx src/styles.css src/programMedia.test.ts
git commit -m "Use real media on program pages"
```
