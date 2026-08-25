import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles.css", "utf8");

describe("desktop hero split", () => {
  it("uses a clean shared desktop split without changing the mobile video", () => {
    expect(css).toContain("--hero-split: 48vw;");
    expect(css).toContain("--hero-media-width: 52vw;");
    expect(css).toContain("left: var(--hero-split);");
    expect(css).toContain(
      "width: calc(var(--hero-split) - max(2rem, calc((100vw - 1320px) / 2)));",
    );
    expect(css).toContain(".language-en .reassurance li:last-child");
    expect(css).toContain("justify-self: end;");
    expect(css).toMatch(
      /@media \(max-width: 820px\)[\s\S]*?--hero-media-width: 100vw;[\s\S]*?\.hero-video::after \{ display: none; \}/,
    );
    expect(css).not.toContain(
      'background: #151113 url("/media/hero-tela-poster.webp")',
    );
  });

  it("keeps the copy anchored to the split at intermediate desktop widths", () => {
    expect(css).toMatch(
      /@media \(max-width: 1120px\)[\s\S]*?--hero-split: 55vw; --hero-media-width: 45vw;[\s\S]*?\.hero-copy \{ width: calc\(var\(--hero-split\) - max\(2rem, calc\(\(100vw - 1320px\) \/ 2\)\)\); \}/,
    );
  });
});
