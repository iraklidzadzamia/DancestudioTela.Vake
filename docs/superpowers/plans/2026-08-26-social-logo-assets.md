# Social Logo Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a reusable square logo and a crop-safe Open Graph image from the exact existing Tela logo.

**Architecture:** A small Node script writes a temporary SVG atmosphere and uses the installed `ffmpeg` binary to composite the untouched center-cropped source logo onto deterministic 1200×1200 and 1200×630 canvases. The existing `/og.png` URL remains unchanged; a lightweight PNG-header test guards both output dimensions.

**Tech Stack:** Node.js built-ins, SVG filters/gradients, `ffmpeg`, Vitest, PNG assets.

## Global Constraints

- Use `public/tela-logo.png` as the only logo source.
- Do not redraw, stretch, regenerate, or alter the logo's proportions or colors.
- Create `public/tela-logo-square.png` at exactly 1200×1200 pixels.
- Replace `public/og.png` at exactly 1200×630 pixels.
- Keep the complete Open Graph logo inside the centered 630×630 safe zone.
- Keep existing `og:image` and `twitter:image` URLs at `/og.png`.
- Add no runtime or package dependency.

---

### Task 1: Asset-dimension regression test

**Files:**
- Create: `src/socialAssets.test.js`
- Verify: `public/og.png`
- Verify: `public/tela-logo-square.png`

**Interfaces:**
- Consumes: the PNG IHDR fields at byte offsets 16 and 20.
- Produces: `readPngSize(path): { width: number; height: number }` inside the test file.

- [ ] **Step 1: Write the failing test**

```js
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readPngSize(path) {
  const png = readFileSync(new URL(path, import.meta.url));
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}

describe("social image assets", () => {
  it("keeps reusable square and Open Graph assets at their required sizes", () => {
    expect(readPngSize("../public/tela-logo-square.png")).toEqual({ width: 1200, height: 1200 });
    expect(readPngSize("../public/og.png")).toEqual({ width: 1200, height: 630 });
  });
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `pnpm test -- src/socialAssets.test.js`

Expected: FAIL with `ENOENT` for `public/tela-logo-square.png`.

---

### Task 2: Deterministic social asset generator

**Files:**
- Create: `scripts/generate-social-assets.mjs`
- Create: `public/tela-logo-square.png`
- Modify: `public/og.png`
- Test: `src/socialAssets.test.js`

**Interfaces:**
- Consumes: `public/tela-logo.png` and the local `ffmpeg` executable.
- Produces: square and wide PNG assets with the exact dimensions from Task 1.

- [ ] **Step 1: Add the generator**

Create a Node script that:

1. Resolves the repository root from `import.meta.url`.
2. Creates a temporary directory with `mkdtempSync(join(tmpdir(), "tela-social-"))`.
3. Writes an SVG background containing:
   - base `#150f13`;
   - a restrained plum radial glow centered behind the logo;
   - a very soft warm glow near the right edge;
   - low-opacity `feTurbulence` grain.
4. Runs `ffmpeg` twice using `spawnSync` with argument arrays, not a shell string.
5. Center-crops the source from 4000×2828 to 2828×2828 at `x=586`, preserving proportions.
6. Scales the cropped logo to 1000×1000 for the square asset and 520×520 for the Open Graph asset with Lanczos filtering.
7. Centers the logo on each canvas and writes PNG files atomically through temporary output names before `renameSync`.
8. Removes the temporary directory in `finally`.

The `ffmpeg` filter for each output must follow this structure:

```text
[1:v]crop=2828:2828:586:0,scale=<logoSize>:<logoSize>:flags=lanczos[logo];[0:v][logo]overlay=(W-w)/2:(H-h)/2:format=auto
```

- [ ] **Step 2: Generate both assets**

Run: `node scripts/generate-social-assets.mjs`

Expected: `public/tela-logo-square.png` and `public/og.png` are written successfully.

- [ ] **Step 3: Run the focused test and verify GREEN**

Run: `pnpm test -- src/socialAssets.test.js`

Expected: both required dimensions pass.

---

### Task 3: Visual, crop, and project verification

**Files:**
- Verify: `public/tela-logo-square.png`
- Verify: `public/og.png`
- Verify: `index.html`
- Verify: `scripts/prerender.mjs`

**Interfaces:**
- Consumes: the final generated assets and existing social meta URLs.
- Produces: verified reusable and deployed social images.

- [ ] **Step 1: Inspect both final images**

Open both PNG files at original resolution and verify the logo remains exact, centered, undistorted, and readable.

- [ ] **Step 2: Inspect the Instagram-safe crop**

Create a temporary centered 630×630 crop of `public/og.png` with `ffmpeg`, inspect it, and verify the complete logo remains inside the crop.

- [ ] **Step 3: Verify metadata references**

Run: `rg -n 'og\.png' index.html scripts/prerender.mjs`

Expected: Open Graph and Twitter tags continue to reference `/og.png`.

- [ ] **Step 4: Run all tests and the production build**

Run: `pnpm test`

Expected: all tests pass with zero failures.

Run: `pnpm build`

Expected: TypeScript, client, SSR, and prerender stages exit successfully.

- [ ] **Step 5: Copy the reusable square asset to Desktop**

```bash
cp public/tela-logo-square.png /Users/iraklidzadzamia/Desktop/Tela-Square-Logo-1200.png
```

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-social-assets.mjs src/socialAssets.test.js public/tela-logo-square.png public/og.png
git commit -m "Create crop-safe social logo assets"
```

- [ ] **Step 7: Deploy and verify**

Push `main`, wait for the Vercel production deployment to reach `Ready`, confirm `https://telavake.ge/og.png` has the new content hash, and note that Instagram may continue showing a cached preview until it refreshes the URL.
