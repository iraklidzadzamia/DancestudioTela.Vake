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
  let matchMediaMatches = false;

  beforeEach(() => {
    vi.useFakeTimers();
    matchMediaMatches = false;
    TestIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
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
    expect(container.querySelector(".video-poster-frame")).toHaveAttribute("src", "/media/sections/proam-story-poster.webp");
    expect(container.querySelector(".video-poster-frame")).not.toHaveClass("is-hidden");
    expect(container.querySelectorAll("source")).toHaveLength(0);
    expect(container.querySelector(".media-play-affordance")).not.toBeInTheDocument();
  });

  it("keeps the poster over the film until the browser presents its first video frame", () => {
    const { container } = renderFilm();
    const video = container.querySelector("video") as HTMLVideoElement;
    let presentFrame: (() => void) | undefined;
    Object.defineProperty(video, "requestVideoFrameCallback", {
      configurable: true,
      value: vi.fn((callback: VideoFrameRequestCallback) => {
        presentFrame = () => callback(0, {} as VideoFrameCallbackMetadata);
        return 1;
      }),
    });

    fireEvent.playing(video);
    expect(container.querySelector(".video-poster-frame")).not.toHaveClass("is-hidden");

    act(() => presentFrame?.());
    expect(container.querySelector(".video-poster-frame")).toHaveClass("is-hidden");
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

  it("places the film caption immediately above the video frame", () => {
    const { container } = renderFilm();
    const figure = container.querySelector("figure") as HTMLElement;

    expect(figure.firstElementChild?.tagName).toBe("FIGCAPTION");
    expect(figure.children[1]).toHaveClass("cinematic-video-frame");
  });

  it("autoplays immediately when the film becomes visible", () => {
    const { container } = renderFilm();
    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));

    expect(play).toHaveBeenCalledTimes(1);
    expect(container.querySelector("video")).toHaveAttribute("autoplay");
  });

  it("keeps two visible films playing when they share a playback group", () => {
    render(<>
      <AutoPlayVideo base="tango-on-bars" playbackGroup="tango-chapter" playLabel="Play film" pauseLabel="Pause film" />
      <AutoPlayVideo base="tango-group" playbackGroup="tango-chapter" playLabel="Play film" pauseLabel="Pause film" />
    </>);

    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
    act(() => TestIntersectionObserver.instances[2].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[3].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));

    expect(screen.getAllByRole("button", { name: "Pause film" })).toHaveLength(2);
  });

  it("loads and autoplays near-view video even when Save Data is enabled", () => {
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: true },
    });
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

  it("shows play only after a real autoplay rejection", async () => {
    play.mockRejectedValueOnce(new DOMException("blocked", "NotAllowedError"));
    renderFilm();

    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
    await act(async () => Promise.resolve());

    expect(document.querySelector(".media-play-affordance")).toBeInTheDocument();
  });

  it("retries a blocked visible film on the first page gesture", async () => {
    play
      .mockRejectedValueOnce(new DOMException("blocked", "NotAllowedError"))
      .mockResolvedValue(undefined);
    renderFilm();

    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
    await act(async () => Promise.resolve());

    fireEvent.pointerDown(document.body);

    expect(play).toHaveBeenCalledTimes(2);
  });

  it("does not duplicate the unlock retry when the gesture targets the film itself", () => {
    renderFilm();
    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
    const frame = screen.getByRole("button", { name: "Pause film" });

    fireEvent.pointerDown(frame);

    expect(play).toHaveBeenCalledTimes(1);
  });

  it("starts a stopped film directly inside its click gesture", () => {
    renderFilm();
    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));
    const frame = screen.getByRole("button", { name: "Pause film" });

    fireEvent.click(frame);
    play.mockClear();

    let clickIsActive = false;
    let playedInsideClick = false;
    const beginClick = () => { clickIsActive = true; };
    const endClick = () => { clickIsActive = false; };
    frame.addEventListener("click", beginClick, { capture: true });
    document.addEventListener("click", endClick, { once: true });
    play.mockImplementation(() => {
      playedInsideClick = clickIsActive;
      return Promise.resolve();
    });

    fireEvent.click(frame);

    expect(playedInsideClick).toBe(true);
    expect(play).toHaveBeenCalledTimes(1);
  });

  it("keeps a manual pause when the film leaves and re-enters the viewport", () => {
    renderFilm();
    act(() => TestIntersectionObserver.instances[0].trigger({ isIntersecting: true, intersectionRatio: 0.01 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));

    fireEvent.click(screen.getByRole("button", { name: "Pause film" }));
    expect(pause).toHaveBeenCalled();
    expect(document.querySelector(".media-play-affordance")).toBeInTheDocument();

    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: false, intersectionRatio: 0 }));
    act(() => TestIntersectionObserver.instances[1].trigger({ isIntersecting: true, intersectionRatio: 0.35 }));

    expect(play).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Play film" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play film" }));
    expect(document.querySelector(".media-play-affordance")).not.toBeInTheDocument();
  });
});
