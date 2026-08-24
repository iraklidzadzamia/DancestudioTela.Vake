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
