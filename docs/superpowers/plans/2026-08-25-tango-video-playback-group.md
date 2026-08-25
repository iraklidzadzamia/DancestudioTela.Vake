# Tango Video Playback Group Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let both Women's Tango films play concurrently when each is visible while preserving the existing exclusive playback behavior everywhere else.

**Architecture:** Extend `AutoPlayVideo` with an optional playback identity. The existing global film-play event continues to coordinate all players, but two players sharing one identity no longer pause each other; their individual IntersectionObservers still decide whether each player is visible enough to run.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, native `IntersectionObserver` and HTML media APIs.

## Global Constraints

- Do not synchronise video timelines or frames.
- Do not add viewport-width branching or new dependencies.
- Preserve the 35% playback visibility threshold.
- Preserve manual pause, page visibility, autoplay retry, and poster behavior.
- All non-Tango films must remain mutually exclusive.

---

### Task 1: Shared playback identity

**Files:**
- Modify: `src/AutoPlayVideo.tsx`
- Test: `src/AutoPlayVideo.test.tsx`

**Interfaces:**
- Consumes: existing `AutoPlayVideoProps.base: string` and `tela:film-play` event.
- Produces: optional `AutoPlayVideoProps.playbackGroup?: string`; event detail is `playbackGroup ?? base`.

- [ ] **Step 1: Write the failing same-group test**

Render two players with distinct bases and `playbackGroup="tango-chapter"`. Trigger both load and playback observers, then assert that both frames expose the `Pause film` label after both play events:

```tsx
render(<>
  <AutoPlayVideo base="tango-on-bars" playbackGroup="tango-chapter" playLabel="Play film" pauseLabel="Pause film" />
  <AutoPlayVideo base="tango-group" playbackGroup="tango-chapter" playLabel="Play film" pauseLabel="Pause film" />
</>);

act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
act(() => TestIntersectionObserver.instances[2].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
act(() => TestIntersectionObserver.instances[3].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));

expect(screen.getAllByRole("button", { name: "Pause film" })).toHaveLength(2);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `pnpm test -- src/AutoPlayVideo.test.tsx`

Expected: FAIL because `playbackGroup` does not exist and the second player pauses the first.

- [ ] **Step 3: Implement the minimal shared identity**

Extend the props and derive one identity inside the component:

```tsx
export type AutoPlayVideoProps = {
  base: string;
  playbackGroup?: string;
  // existing props unchanged
};

const playbackIdentity = playbackGroup ?? base;
```

Use that identity in both the listener and dispatcher:

```tsx
if ((event as CustomEvent<string>).detail !== playbackIdentity) videoRef.current?.pause();
window.dispatchEvent(new CustomEvent("tela:film-play", { detail: playbackIdentity }));
```

Update effect dependencies to use `playbackIdentity`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `pnpm test -- src/AutoPlayVideo.test.tsx`

Expected: all `AutoPlayVideo` tests pass.

---

### Task 2: Assign the Tango films to one group

**Files:**
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `AutoPlayVideoProps.playbackGroup?: string` from Task 1.
- Produces: the home-page Tango films both use `playbackGroup="tango-chapter"`.

- [ ] **Step 1: Write the failing home-page integration test**

Store the existing pause spy and make it dispatch a pause event. Render the English home page, fire `play` on both Tango videos, and assert both frames remain pressed:

```tsx
const tangoVideos = container.querySelectorAll<HTMLVideoElement>(".tango-films video");
fireEvent.play(tangoVideos[0]);
fireEvent.play(tangoVideos[1]);

const tangoFrames = container.querySelectorAll<HTMLButtonElement>(".tango-films .cinematic-video-frame");
expect(Array.from(tangoFrames).map((frame) => frame.getAttribute("aria-pressed"))).toEqual(["true", "true"]);
```

- [ ] **Step 2: Run the integration test and verify RED**

Run: `pnpm test -- src/App.test.tsx`

Expected: FAIL with the first frame returning to `aria-pressed="false"` after the second film plays.

- [ ] **Step 3: Wire the shared group**

Pass the same group to both existing Tango players in `src/App.tsx`:

```tsx
<AutoPlayVideo base="tango-on-bars" playbackGroup="tango-chapter" ... />
<AutoPlayVideo base="tango-group" playbackGroup="tango-chapter" ... />
```

- [ ] **Step 4: Run the integration test and verify GREEN**

Run: `pnpm test -- src/App.test.tsx`

Expected: all application tests pass.

---

### Task 3: Regression and visual verification

**Files:**
- Verify: `src/AutoPlayVideo.tsx`
- Verify: `src/App.tsx`

**Interfaces:**
- Consumes: completed shared playback identity and Tango wiring.
- Produces: verified production behavior with no additional code interface.

- [ ] **Step 1: Run all tests**

Run: `pnpm test`

Expected: all test files and tests pass with zero failures.

- [ ] **Step 2: Run the production build**

Run: `pnpm build`

Expected: TypeScript, client, SSR, and prerender stages exit successfully.

- [ ] **Step 3: Verify desktop behavior**

At a 1440×1000 viewport, scroll the Women's Tango chapter until both films are at least 35% visible. Confirm both play and neither shows the manual play affordance.

- [ ] **Step 4: Verify mobile behavior**

At a 390×844 viewport, confirm each vertically stacked Tango film starts and stops according to its own visibility and that a manually paused film does not restart when its partner plays.

- [ ] **Step 5: Commit the implementation**

```bash
git add src/AutoPlayVideo.tsx src/AutoPlayVideo.test.tsx src/App.tsx src/App.test.tsx
git commit -m "Let visible Tango films play together"
```
