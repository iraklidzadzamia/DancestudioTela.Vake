import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AutoPlayVideo } from "./AutoPlayVideo";

type ObserverEntry = Pick<IntersectionObserverEntry, "isIntersecting" | "intersectionRatio">;

class TestIntersectionObserver implements IntersectionObserver {
  static instances: TestIntersectionObserver[] = [];

  readonly root = null;
  readonly rootMargin: string;
  readonly scrollMargin = "0px";
  readonly thresholds: readonly number[];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback;
    this.rootMargin = options.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold ?? 0];
    TestIntersectionObserver.instances.push(this);
  }

  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();

  trigger(entry: ObserverEntry) {
    this.callback([entry as IntersectionObserverEntry], this);
  }
}

function renderFilm() {
  return render(
    <AutoPlayVideo
      base="proam-story"
      playLabel="Play film"
      pauseLabel="Pause film"
      caption={{ title: "Pro-Am in motion", note: "Professional partner" }}
    />,
  );
}

describe("AutoPlayVideo", () => {
  let play: ReturnType<typeof vi.spyOn>;
  let pause: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    TestIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
    vi.stubGlobal("matchMedia", vi.fn(() => ({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: false },
    });
    play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    });
    pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) {
      this.dispatchEvent(new Event("pause"));
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("shows a poster before adding video sources", () => {
    const { container } = renderFilm();

    expect(screen.getByRole("button", { name: "Play film" })).toBeInTheDocument();
    expect(container.querySelector("video")).toHaveAttribute("poster", "/media/sections/proam-story-poster.webp");
    expect(container.querySelectorAll("source")).toHaveLength(0);
    expect(container.querySelector(".media-play-affordance")).not.toBeInTheDocument();
  });

  it("adds WebM and MP4 sources only when the frame approaches the viewport", () => {
    const { container } = renderFilm();

    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));

    const sources = Array.from(container.querySelectorAll("source"));
    expect(sources.map((source) => source.getAttribute("src"))).toEqual([
      "/media/sections/proam-story.webm",
      "/media/sections/proam-story.mp4",
    ]);
    expect(sources.map((source) => source.getAttribute("type"))).toEqual(["video/webm", "video/mp4"]);
  });

  it("waits 300 milliseconds of stable visibility before autoplaying", () => {
    renderFilm();
    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));

    act(() => vi.advanceTimersByTime(299));
    expect(play).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(play).toHaveBeenCalledTimes(1);
  });

  it("keeps a manual pause when the film leaves and re-enters the viewport", () => {
    renderFilm();
    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
    act(() => vi.advanceTimersByTime(300));

    fireEvent.click(screen.getByRole("button", { name: "Pause film" }));
    expect(pause).toHaveBeenCalled();
    expect(document.querySelector(".media-play-affordance")).toBeInTheDocument();

    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: false, intersectionRatio: 0 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
    act(() => vi.advanceTimersByTime(300));

    expect(play).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Play film" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play film" }));
    expect(document.querySelector(".media-play-affordance")).not.toBeInTheDocument();
  });
});
