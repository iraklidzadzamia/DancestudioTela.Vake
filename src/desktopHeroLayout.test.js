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

  it("adds a static atmospheric treatment only to the desktop copy panel", () => {
    expect(css).toMatch(
      /@media \(min-width: 821px\)[\s\S]*?\.hero::before \{[\s\S]*?width: var\(--hero-split\);[\s\S]*?radial-gradient\([\s\S]*?pointer-events: none;/,
    );
    expect(css).toMatch(
      /@media \(min-width: 821px\)[\s\S]*?\.hero::after \{[\s\S]*?width: var\(--hero-split\);[\s\S]*?feTurbulence[\s\S]*?mix-blend-mode: soft-light;/,
    );
    expect(css).not.toMatch(/@keyframes hero-(?:glow|gradient|atmosphere)/);
    expect(css).toMatch(
      /@media \(max-width: 820px\)[\s\S]*?--hero-split: 0; --hero-media-width: 100vw;/,
    );
  });

  it("uses one multilingual navigation axis and safe hero boundary", () => {
    expect(css).toContain(".desktop-nav-group { display: flex;");
    expect(css).toContain(".hero .desktop-nav { position: absolute;");
    expect(css).toContain("right: calc(var(--nav-gap) / 2);");
    expect(css).toContain("left: calc(var(--nav-gap) / 2);");
    expect(css).toContain("max-width: calc(100% - 1rem);");
    expect(css).toContain(".brand { display: inline-flex; align-items: flex-end;");
    expect(css).toMatch(/\.logo-header \{[\s\S]*?width: 58px;[\s\S]*?height: auto;/);
    expect(css).toContain(".header-actions { grid-column: 3;");
    expect(css).toMatch(/@media \(max-width: 1120px\)[\s\S]*?\.header-actions \{ grid-column: 2;/);
    expect(css).not.toMatch(/\.language-(?:en|ka|ru) \.desktop-nav/);
  });
});
