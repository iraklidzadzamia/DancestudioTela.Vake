import { cleanup, fireEvent, render } from "@testing-library/react";
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
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", PassiveIntersectionObserver);
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
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
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
});
