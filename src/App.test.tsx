import { cleanup, render } from "@testing-library/react";
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
  });
});
