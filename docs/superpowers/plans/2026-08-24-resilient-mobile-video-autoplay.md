# Resilient Mobile Video Autoplay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Максимизировать беззвучный автозапуск hero и видимых секционных видео на телефонах, включая Android Chrome и встроенные браузеры приложений.

**Architecture:** Общая функция запуска централизует обработку `play()` и отличает нормальный `AbortError` от настоящего отказа браузера. Hero и `AutoPlayVideo` сохраняют собственные viewport/manual-pause состояния, используют нативный `autoplay`, повторяют запуск при готовности медиа и после первого пользовательского жеста. Ленивая загрузка секционных источников сохраняется, но `Save Data` и reduced motion больше не блокируют воспроизведение.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, HTML5 Video API, IntersectionObserver.

## Global Constraints

- Все видео остаются без звука и используют `playsInline`.
- Секционные источники подключаются только в пределах `600px` от viewport.
- Автозапуск не блокируется `navigator.connection.saveData` или `prefers-reduced-motion`.
- Ручная пауза всегда имеет приоритет над повторными попытками.
- Одновременно играет не более одного ролика.
- Poster остаётся до фактически представленного видеокадра.
- Иконка play отсутствует при нормальной загрузке и появляется только после ручной паузы или настоящего отказа `play()`.

---

### Task 1: Общая обработка попытки воспроизведения

**Files:**
- Create: `src/videoPlayback.ts`
- Create: `src/videoPlayback.test.ts`

**Interfaces:**
- Consumes: `HTMLVideoElement.play(): Promise<void>`.
- Produces: `attemptVideoPlayback(video: HTMLVideoElement, onBlocked: (blocked: boolean) => void): void`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it, vi } from "vitest";
import { attemptVideoPlayback } from "./videoPlayback";

describe("attemptVideoPlayback", () => {
  it("clears the blocked state after a successful play request", async () => {
    const onBlocked = vi.fn();
    const video = { play: vi.fn().mockResolvedValue(undefined) } as unknown as HTMLVideoElement;
    attemptVideoPlayback(video, onBlocked);
    await Promise.resolve();
    expect(onBlocked).toHaveBeenCalledWith(false);
  });

  it("reports a real autoplay rejection", async () => {
    const onBlocked = vi.fn();
    const video = { play: vi.fn().mockRejectedValue(new DOMException("blocked", "NotAllowedError")) } as unknown as HTMLVideoElement;
    attemptVideoPlayback(video, onBlocked);
    await Promise.resolve();
    expect(onBlocked).toHaveBeenCalledWith(true);
  });

  it("ignores AbortError caused by a normal pause race", async () => {
    const onBlocked = vi.fn();
    const video = { play: vi.fn().mockRejectedValue(new DOMException("paused", "AbortError")) } as unknown as HTMLVideoElement;
    attemptVideoPlayback(video, onBlocked);
    await Promise.resolve();
    expect(onBlocked).not.toHaveBeenCalledWith(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/videoPlayback.test.ts`

Expected: FAIL because `./videoPlayback` does not exist.

- [ ] **Step 3: Write minimal implementation**

```ts
export function attemptVideoPlayback(
  video: HTMLVideoElement,
  onBlocked: (blocked: boolean) => void,
) {
  const request = video.play();
  if (!request) return;
  void request.then(
    () => onBlocked(false),
    (error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      onBlocked(true);
    },
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/videoPlayback.test.ts`

Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/videoPlayback.ts src/videoPlayback.test.ts
git commit -m "Handle mobile video autoplay attempts"
```

### Task 2: Максимальный автозапуск секционных видео

**Files:**
- Modify: `src/AutoPlayVideo.test.tsx`
- Modify: `src/AutoPlayVideo.tsx`

**Interfaces:**
- Consumes: `attemptVideoPlayback(video, setAutoplayBlocked)` from Task 1.
- Produces: viewport-aware `AutoPlayVideo` that retries on media readiness, page restoration, network restoration and the first pointer/touch gesture.

- [ ] **Step 1: Write failing tests for Android gates and immediate autoplay**

At the top of the suite add `let matchMediaMatches = false;`. Reset it in `beforeEach`, and return it from the existing `matchMedia` stub:

```ts
let matchMediaMatches = false;

beforeEach(() => {
  matchMediaMatches = false;
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches: matchMediaMatches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
});
```

```ts
it("loads and autoplays near-view video even when Save Data is enabled", () => {
  Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true } });
  const { container } = renderFilm();
  act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
  act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
  expect(container.querySelectorAll("source")).toHaveLength(2);
  expect(play).toHaveBeenCalledTimes(1);
});

it("autoplays even when reduced motion is requested", () => {
  matchMediaMatches = true;
  renderFilm();
  act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
  act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
  expect(play).toHaveBeenCalledTimes(1);
});
```

Replace the former 300 ms dwell assertion with an immediate attempt assertion.

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- src/AutoPlayVideo.test.tsx`

Expected: Save Data test has zero sources; reduced-motion test has zero `play()` calls; immediate test still waits for the timer.

- [ ] **Step 3: Write failing tests for fallback and gesture retry**

```ts
it("shows play only after a real autoplay rejection", async () => {
  play.mockRejectedValueOnce(new DOMException("blocked", "NotAllowedError"));
  renderFilm();
  act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
  act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
  await act(async () => Promise.resolve());
  expect(document.querySelector(".media-play-affordance")).toBeInTheDocument();
});

it("retries a blocked visible film on the first page gesture", async () => {
  play.mockRejectedValueOnce(new DOMException("blocked", "NotAllowedError")).mockResolvedValue(undefined);
  renderFilm();
  act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
  act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
  await act(async () => Promise.resolve());
  fireEvent.pointerDown(document.body);
  expect(play).toHaveBeenCalledTimes(2);
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `pnpm test -- src/AutoPlayVideo.test.tsx`

Expected: no fallback icon and no second `play()` request.

- [ ] **Step 5: Implement the minimal section behavior**

In `AutoPlayVideo.tsx`:

- remove `autoplayDelayMs`, `reduceMotion`, `userActivated`, `saveData` and the delay timer;
- set `shouldLoad` whenever the load observer intersects;
- add `autoplayBlocked` state;
- call `attemptVideoPlayback` immediately when `shouldLoad && inView && pageVisible && !manuallyPaused.current`;
- add `autoPlay={shouldLoad && inView && !isManuallyPaused}`;
- call the same guarded attempt from `onLoadedData`, `onCanPlay`, `online`, `pageshow`, `pointerdown` and `touchstart`;
- show `.media-play-affordance` when `isManuallyPaused || autoplayBlocked`;
- clear `autoplayBlocked` in `onPlay` and after explicit manual resume.

Core effect:

```ts
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;
  if (!shouldLoad || !inView || !pageVisible || manuallyPaused.current) {
    video.pause();
    return;
  }
  attemptVideoPlayback(video, setAutoplayBlocked);
}, [inView, pageVisible, playRequest, shouldLoad]);
```

Gesture retry effect:

```ts
useEffect(() => {
  const retry = () => {
    const video = videoRef.current;
    if (video && shouldLoad && inView && pageVisible && !manuallyPaused.current) {
      attemptVideoPlayback(video, setAutoplayBlocked);
    }
  };
  window.addEventListener("pointerdown", retry, { capture: true, passive: true });
  window.addEventListener("touchstart", retry, { capture: true, passive: true });
  window.addEventListener("online", retry);
  window.addEventListener("pageshow", retry);
  return () => {
    window.removeEventListener("pointerdown", retry, true);
    window.removeEventListener("touchstart", retry, true);
    window.removeEventListener("online", retry);
    window.removeEventListener("pageshow", retry);
  };
}, [inView, pageVisible, shouldLoad]);
```

- [ ] **Step 6: Run section tests to verify they pass**

Run: `pnpm test -- src/AutoPlayVideo.test.tsx`

Expected: all `AutoPlayVideo` tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/AutoPlayVideo.tsx src/AutoPlayVideo.test.tsx
git commit -m "Maximize section video autoplay"
```

### Task 3: Максимальный автозапуск hero и полная проверка

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Modify: `content/media-library.md`
- Include existing poster-first changes: `src/VideoPoster.tsx`, `src/styles.css`, `src/AutoPlayVideo.test.tsx`, `src/AutoPlayVideo.tsx`, `src/App.test.tsx`, `src/App.tsx`, `public/media/hero-tela-poster.webp`, `public/media/sections/*-poster.webp`.

**Interfaces:**
- Consumes: `attemptVideoPlayback(video, setHeroAutoplayBlocked)` from Task 1.
- Produces: hero with native and programmatic autoplay plus failure-only fallback.

- [ ] **Step 1: Write failing hero tests**

In the suite setup retain the existing media spies as variables and make the media-query result configurable:

```ts
let play: ReturnType<typeof vi.spyOn>;
let matchMediaMatches = false;

beforeEach(() => {
  matchMediaMatches = false;
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches: matchMediaMatches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
  play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
});
```

```ts
it("uses native muted inline autoplay for the hero", () => {
  window.history.replaceState({}, "", "/en/");
  const { container } = render(<App />);
  const hero = container.querySelector(".hero-video video");
  expect(hero).toHaveAttribute("autoplay");
  expect(hero).toHaveAttribute("playsinline");
  expect(hero).toHaveProperty("muted", true);
});

it("autoplays the hero even when reduced motion is requested", () => {
  matchMediaMatches = true;
  window.history.replaceState({}, "", "/en/");
  render(<App />);
  expect(play).toHaveBeenCalled();
});

it("retries a blocked hero on the first page gesture", async () => {
  play.mockRejectedValueOnce(new DOMException("blocked", "NotAllowedError")).mockResolvedValue(undefined);
  window.history.replaceState({}, "", "/en/");
  const { container } = render(<App />);
  await act(async () => Promise.resolve());
  expect(container.querySelector(".hero-play-affordance")).toBeInTheDocument();
  fireEvent.pointerDown(document.body);
  expect(play).toHaveBeenCalledTimes(2);
});
```

- [ ] **Step 2: Run hero tests to verify they fail**

Run: `pnpm test -- src/App.test.tsx`

Expected: missing `autoplay`, reduced motion pauses hero, and gesture does not retry.

- [ ] **Step 3: Implement hero behavior**

In `App.tsx`:

- add `heroAutoplayBlocked` state and `heroInView` ref;
- add native `autoPlay` to hero video;
- remove the reduced-motion condition and media-query listener from hero playback;
- route all attempts through `attemptVideoPlayback`;
- retry from `loadeddata`, `canplay`, `online`, `pageshow`, `pointerdown` and `touchstart` when hero is visible and not manually paused;
- show `.hero-play-affordance` only for manual pause or a real rejected attempt;
- clear failure state on successful `play` and explicit resume.

- [ ] **Step 4: Run hero and section tests**

Run: `pnpm test -- src/App.test.tsx src/AutoPlayVideo.test.tsx src/videoPlayback.test.ts`

Expected: all targeted tests PASS.

- [ ] **Step 5: Run full automated verification**

Run: `pnpm test && pnpm build && git diff --check`

Expected: all tests PASS, production build exits `0`, diff check is silent.

- [ ] **Step 6: Verify production-like mobile behavior**

Serve the local build and inspect at an Android-sized viewport:

```bash
pnpm dev --host 127.0.0.1
```

Confirm:

- hero `paused === false` and `currentTime > 0` after load;
- the same remains true with emulated reduced motion;
- first visible section video starts after scrolling without a tap;
- a rejected `play()` displays the fallback icon;
- returning to hero resumes playback with no initial play icon;
- browser console has no errors or warnings.

- [ ] **Step 7: Commit all remaining implementation and media changes**

```bash
git add content/media-library.md public/media src/App.tsx src/App.test.tsx src/AutoPlayVideo.tsx src/AutoPlayVideo.test.tsx src/VideoPoster.tsx src/styles.css
git commit -m "Make mobile video autoplay resilient"
```

- [ ] **Step 8: Push and verify branch synchronization**

```bash
git push origin main
git fetch origin main
test "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)"
```

Expected: push succeeds and local/remote SHAs match.
