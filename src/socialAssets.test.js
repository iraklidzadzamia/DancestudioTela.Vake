import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readPngSize(path) {
  const png = readFileSync(new URL(path, import.meta.url));

  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
  };
}

describe("social image assets", () => {
  it("keeps the reusable square and Open Graph assets at their required sizes", () => {
    expect(readPngSize("../public/tela-logo-square.png")).toEqual({
      width: 1200,
      height: 1200,
    });
    expect(readPngSize("../public/og.png")).toEqual({
      width: 1200,
      height: 630,
    });
  });
});
