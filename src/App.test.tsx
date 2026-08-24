import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

class PassiveIntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly scrollMargin = "0px";
  readonly thresholds = [0];
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
}

describe("program hero media", () => {
  let play: ReturnType<typeof vi.spyOn>;
  let matchMediaMatches = false;

  beforeEach(() => {
    matchMediaMatches = false;
    vi.stubGlobal("IntersectionObserver", PassiveIntersectionObserver);
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
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("uses the generated adult ballet photograph instead of a placeholder", () => {
    window.history.replaceState({}, "", "/ru/adults/ballet/");

    const { container } = render(<App />);

    expect(container.querySelector(".program-hero-image img")).toHaveAttribute("src", "/media/adult-ballet-hero-v1.webp");
    expect(container.querySelector(".portrait-media-poster")).not.toBeInTheDocument();
  });

  it("reuses the approved Women’s Tango film on its program page", () => {
    window.history.replaceState({}, "", "/ru/adults/womens-tango/");

    const { container } = render(<App />);

    expect(container.querySelector(".program-hero-film video")).toHaveAttribute("poster", "/media/sections/tango-on-bars-poster.webp");
    expect(container.querySelector(".portrait-media-poster")).not.toBeInTheDocument();
    expect(container.querySelector(".related-grid a > span")).not.toBeInTheDocument();
  });

  it("uses the dancer mark and removes unexplained public numbers", () => {
    window.history.replaceState({}, "", "/en/");

    const { container } = render(<App />);

    expect(container.querySelector(".heritage-mark")).toBeInTheDocument();
    expect(container.querySelector(".heritage-emblem img")).not.toBeInTheDocument();
    expect(container.querySelector(".program-row-number")).not.toBeInTheDocument();
    expect(container.querySelector(".programs-count")).not.toBeInTheDocument();
    expect(container.querySelector(".audience-switch button > span")).not.toBeInTheDocument();
    expect(container.querySelector(".schedule-panel-title i")).not.toBeInTheDocument();
    expect(container.querySelector(".orientation-facts dt")).not.toBeInTheDocument();
    expect(container.querySelector(".editorial-facts > div > span")).not.toBeInTheDocument();
  });

  it("keeps children and Georgian actions after their films in reading order", () => {
    window.history.replaceState({}, "", "/en/");

    const { container } = render(<App />);
    const kidsItems = Array.from(container.querySelector(".kids-film .editorial-split")!.children);
    const georgianItems = Array.from(container.querySelector(".georgian-film .editorial-split")!.children);
    const closingItems = Array.from(container.querySelector(".closing-reel-stage")!.children);

    expect(kidsItems[0]).toHaveClass("editorial-copy");
    expect(kidsItems[1]).toHaveClass("cinematic-video");
    expect(kidsItems[2]).toHaveClass("kids-program-links");
    expect(georgianItems[0]).toHaveClass("editorial-copy");
    expect(georgianItems[1]).toHaveClass("cinematic-video");
    expect(georgianItems[2]).toHaveClass("editorial-cta");
    expect(closingItems[0]).toHaveClass("closing-reel-copy");
    expect(closingItems[1]).toHaveClass("cinematic-video");
    expect(closingItems[2]).toHaveClass("closing-reel-cta");
  });

  it("keeps non-sequential detail facts free of decorative numbers", () => {
    window.history.replaceState({}, "", "/en/adults/pro-am/");

    const { container } = render(<App />);

    expect(container.querySelector(".detail-proof i")).not.toBeInTheDocument();
    expect(container.querySelector(".detail-proam .proam-point > span")).not.toBeInTheDocument();
  });

  it("shows the hero play affordance only after a manual pause", () => {
    window.history.replaceState({}, "", "/en/");

    const { container } = render(<App />);
    const heroVideo = container.querySelector(".hero-video video") as HTMLVideoElement;

    expect(container.querySelector(".hero-play-affordance")).not.toBeInTheDocument();

    Object.defineProperty(heroVideo, "paused", { configurable: true, value: false });
    fireEvent.play(heroVideo);
    fireEvent.click(heroVideo);
    expect(container.querySelector(".hero-play-affordance")).toBeInTheDocument();

    Object.defineProperty(heroVideo, "paused", { configurable: true, value: true });
    fireEvent.click(heroVideo);
    expect(container.querySelector(".hero-play-affordance")).not.toBeInTheDocument();
  });

  it("keeps the hero poster visible until the first video frame is presented", () => {
    window.history.replaceState({}, "", "/en/");

    const { container } = render(<App />);
    const heroVideo = container.querySelector(".hero-video video") as HTMLVideoElement;
    let presentFrame: (() => void) | undefined;
    Object.defineProperty(heroVideo, "requestVideoFrameCallback", {
      configurable: true,
      value: vi.fn((callback: VideoFrameRequestCallback) => {
        presentFrame = () => callback(0, {} as VideoFrameCallbackMetadata);
        return 1;
      }),
    });

    expect(container.querySelector(".hero-video .video-poster-frame")).toHaveAttribute("src", "/media/hero-tela-poster.webp");
    expect(container.querySelector(".hero-video .video-poster-frame")).not.toHaveClass("is-hidden");

    fireEvent.playing(heroVideo);
    expect(container.querySelector(".hero-video .video-poster-frame")).not.toHaveClass("is-hidden");

    act(() => presentFrame?.());
    expect(container.querySelector(".hero-video .video-poster-frame")).toHaveClass("is-hidden");
  });

  it("uses native muted inline autoplay for the hero", () => {
    window.history.replaceState({}, "", "/en/");

    const { container } = render(<App />);
    const hero = container.querySelector(".hero-video video") as HTMLVideoElement;

    expect(hero).toHaveAttribute("autoplay");
    expect(hero).toHaveAttribute("playsinline");
    expect(hero.muted).toBe(true);
  });

  it("autoplays the hero even when reduced motion is requested", () => {
    matchMediaMatches = true;
    window.history.replaceState({}, "", "/en/");

    render(<App />);

    expect(play).toHaveBeenCalled();
  });

  it("retries a blocked hero on the first page gesture", async () => {
    play
      .mockRejectedValueOnce(new DOMException("blocked", "NotAllowedError"))
      .mockResolvedValue(undefined);
    window.history.replaceState({}, "", "/en/");

    const { container } = render(<App />);
    await act(async () => Promise.resolve());

    expect(container.querySelector(".hero-play-affordance")).toBeInTheDocument();

    fireEvent.pointerDown(document.body);

    expect(play).toHaveBeenCalledTimes(2);
  });

  it("connects the hero icons to directions and every approved direct conversation", () => {
    window.history.replaceState({}, "", "/en/");

    const { container } = render(<App />);
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>(".hero-meta-icons a"));

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "https://maps.app.goo.gl/5v5F8D6VXWXjL9tk7",
      "https://ig.me/m/dancestudiotela.vake",
      "https://m.me/Dancestudiotelavake",
      expect.stringContaining("https://wa.me/995505051614?text="),
    ]);
    expect(container.querySelector('.hero-meta-icons [aria-label="Messenger"]')).toBeInTheDocument();
  });

  it("opens booking choices in place with WhatsApp, Instagram Direct and phone", () => {
    window.history.replaceState({}, "", "/ru/");

    const { container } = render(<App />);
    fireEvent.click(container.querySelector(".hero-actions .button-secondary")!);

    const dialog = container.querySelector<HTMLDialogElement>(".booking-dialog")!;
    const options = Array.from(dialog.querySelectorAll<HTMLAnchorElement>(".booking-option"));
    expect(dialog).toHaveAttribute("open");
    expect(document.body).toHaveClass("booking-open");
    expect(options.map((option) => option.getAttribute("href"))).toEqual([
      expect.stringContaining("https://wa.me/995505051614?text="),
      "https://ig.me/m/dancestudiotela.vake",
      "https://m.me/Dancestudiotelavake",
      "tel:+995505051614",
    ]);
    expect(dialog.textContent).toContain("Messenger");

    fireEvent.click(dialog.querySelector(".booking-close")!);
    expect(dialog).not.toHaveAttribute("open");
  });
});
