import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const content = readFileSync("src/content.ts", "utf8");
const css = readFileSync("src/styles.css", "utf8");
const mobileCss = css.slice(
  css.indexOf("@media (max-width: 820px)"),
  css.indexOf("@media (max-width: 520px)"),
);
const phoneCss = css.slice(
  css.indexOf("@media (max-width: 520px)"),
  css.indexOf("@media (max-width: 400px)"),
);

describe("multilingual hero eyebrow", () => {
  it("uses the approved short copy in every language", () => {
    expect(content).toContain('eyebrow: "SINCE 1970 · VAKE, TBILISI"');
    expect(content).toContain('eyebrow: "1970 წლიდან · ვაკე, თბილისი"');
    expect(content).toContain('eyebrow: "С 1970 ГОДА · ВАКЕ, ТБИЛИСИ"');
    expect(content).not.toMatch(/eyebrow: "TELA ·/);
  });
});

describe("mobile header and eyebrow layout", () => {
  it("bottom-aligns the header content without shrinking the mark", () => {
    expect(mobileCss).toMatch(/\.header \{[^}]*align-items: end;/);
    expect(mobileCss).toMatch(
      /\.language-switcher button \{[^}]*display: grid;[^}]*align-items: end;/,
    );
    expect(mobileCss).toContain(".logo-header { width: 52px; }");
    expect(css).toMatch(
      /@media \(max-width: 400px\)[\s\S]*?\.logo-header \{ width: 46px; \}/,
    );
    expect(css).toMatch(
      /@media \(max-width: 360px\)[\s\S]*?\.logo-header \{ width: 42px; \}/,
    );
  });

  it("keeps the phone eyebrow on one responsive line", () => {
    expect(phoneCss).toMatch(
      /\.hero \.eyebrow \{[^}]*white-space: nowrap;[^}]*font-size: clamp\(/,
    );
    expect(phoneCss).toMatch(
      /\.hero-meta \.eyebrow \{[^}]*flex: 1 1 auto;/,
    );
    expect(css).toMatch(
      /@media \(max-width: 400px\)[\s\S]*?\.hero \.eyebrow::before \{ display: none; \}/,
    );
    expect(css).toMatch(
      /@media \(max-width: 400px\)[\s\S]*?\.hero \.eyebrow \{[^}]*font-size: clamp\([^}]*letter-spacing: clamp\(/,
    );
  });
});
