# SEO and Domain Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce crawlable localized static HTML, discovery files, local-business metadata, privacy pages, brand icons, and a permanent domain handoff without changing the current visual identity.

**Architecture:** Keep the React/Vite client and add a shared pure route/SEO model plus a React server-rendering entry. A post-build script renders supported routes into `dist`, generates robots/sitemap/404 output, and takes the public origin from one validated environment setting with the current Vercel URL as the fallback.

**Tech Stack:** React 19, TypeScript, Vite, React DOM server rendering, Vitest, Testing Library, Node.js build scripts, Vercel static hosting, Playwright CLI.

## Global Constraints

- The intended permanent domain is `tela-vake.ge`, but it must not become canonical until it is purchased and connected.
- The current production fallback remains `https://dancestudio-tela-vake.vercel.app`.
- The public address is `2/5 Ateni Street, Vake, Tbilisi, Georgia`.
- Use the current hero/header dancer logo for favicon assets without redrawing it.
- Do not redesign the interface or change Google Ads during this implementation.
- Preserve unrelated user changes, especially `docs/plans/2026-08-25-google-ads-search-campaign-design.md`.

---

### Task 1: Shared route and SEO model

**Files:**
- Create: `src/site.ts`
- Create: `src/site.test.ts`
- Modify: `.env.example`

**Interfaces:**
- Produces: `DEFAULT_SITE_ORIGIN`, `SITE_ADDRESS`, `languagePaths`, `programSlugs`, `normalizeSiteOrigin(value?: string): string`, `getSiteRoutes(): SiteRoute[]`, `matchSiteRoute(pathname: string): SiteRoute`, `getSeoData(pathname: string, origin?: string): SeoData`, and `getLocalBusinessJsonLd(origin?: string): object`.
- Consumes: localized titles and descriptions from `siteCopy` in `src/content.ts`.

- [ ] **Step 1: Write failing route-model tests**

```ts
import { describe, expect, it } from "vitest";
import { getSeoData, getSiteRoutes, matchSiteRoute, normalizeSiteOrigin, SITE_ADDRESS } from "./site";

describe("site route and SEO configuration", () => {
  it("normalizes the future production origin", () => {
    expect(normalizeSiteOrigin("https://tela-vake.ge/")).toBe("https://tela-vake.ge");
    expect(() => normalizeSiteOrigin("javascript:alert(1)")).toThrow("http or https");
  });

  it("builds localized canonical and equivalent-language alternates", () => {
    const seo = getSeoData("/ru/adults/ballet/", "https://tela-vake.ge");
    expect(seo.canonical).toBe("https://tela-vake.ge/ru/adults/ballet/");
    expect(seo.alternates).toEqual({
      en: "https://tela-vake.ge/en/adults/ballet/",
      ka: "https://tela-vake.ge/ka/adults/ballet/",
      ru: "https://tela-vake.ge/ru/adults/ballet/",
      "x-default": "https://tela-vake.ge/en/adults/ballet/",
    });
  });

  it("lists home, program, and privacy routes but not the 404 page", () => {
    const paths = getSiteRoutes().map((route) => route.path);
    expect(paths).toContain("/en/");
    expect(paths).toContain("/ka/kids/georgian-dance/");
    expect(paths).toContain("/ru/privacy/");
    expect(paths).not.toContain("/404/");
  });

  it("marks unsupported paths as not found", () => {
    expect(matchSiteRoute("/not-a-real-page/").kind).toBe("not-found");
    expect(SITE_ADDRESS.streetAddress).toBe("2/5 Ateni Street");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test src/site.test.ts`

Expected: FAIL because `src/site.ts` does not exist.

- [ ] **Step 3: Implement the minimal pure route model**

Create typed route records for `/`, the three localized homes, five adult program routes, three child program routes, and one privacy route per language. Program-page metadata must use `"<localized program> classes in Vake — <localized studio>"`; privacy pages must use localized privacy titles. Normalize paths with a leading and trailing slash, and throw for non-HTTP origins.

Add to `.env.example`:

```dotenv
VITE_SITE_ORIGIN=https://dancestudio-tela-vake.vercel.app
```

- [ ] **Step 4: Run the focused and full tests**

Run: `pnpm test src/site.test.ts && pnpm test`

Expected: PASS with zero failed tests.

- [ ] **Step 5: Commit**

```bash
git add src/site.ts src/site.test.ts .env.example
git commit -m "Add shared SEO route model"
```

---

### Task 2: Localized privacy, address, durable copy, and not-found UI

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/content.ts`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `matchSiteRoute`, `getSeoData`, `languagePaths`, and `programSlugs` from `src/site.ts`.
- Produces: `App({ initialPath?, staticRender? })`, localized `PrivacyPage`, localized `NotFoundPage`, full footer address, privacy links, and browser metadata synchronized from the shared route model.

- [ ] **Step 1: Write failing UI and metadata tests**

Add tests that assert:

```ts
it("shows the confirmed address and localized privacy link", () => {
  window.history.replaceState({}, "", "/en/");
  const { container } = render(<App />);
  expect(container.querySelector(".footer-address")).toHaveTextContent("2/5 Ateni Street");
  expect(container.querySelector('a[href="/en/privacy/"]')).toHaveTextContent("Privacy policy");
});

it("renders a localized privacy page", () => {
  window.history.replaceState({}, "", "/ru/privacy/");
  const { getByRole, getByText } = render(<App />);
  expect(getByRole("heading", { level: 1 })).toHaveTextContent("Конфиденциальность");
  expect(getByText(/Google Analytics/)).toBeInTheDocument();
});

it("renders an indexed-route-safe not-found page", () => {
  window.history.replaceState({}, "", "/ru/not-real/");
  const { getByRole } = render(<App />);
  expect(getByRole("heading", { level: 1 })).toHaveTextContent("Страница не найдена");
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
});

it("updates equivalent-language program alternates", () => {
  window.history.replaceState({}, "", "/ru/adults/ballet/");
  render(<App />);
  expect(document.querySelector('link[hreflang="ka"]')).toHaveAttribute(
    "href",
    "https://dancestudio-tela-vake.vercel.app/ka/adults/ballet/",
  );
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `pnpm test src/App.test.tsx`

Expected: FAIL on missing privacy/not-found routes, address, and alternate URL behavior.

- [ ] **Step 3: Implement route-aware App rendering**

Refactor `App` to accept `initialPath` for server rendering, derive the language and page type from `matchSiteRoute`, and use `getSeoData` in the browser effect. Add or update canonical, description, robots, Open Graph, Twitter, and all four alternate links through a small idempotent DOM helper.

Render dedicated privacy and not-found views through the existing header/footer visual system. Privacy copy must explain necessary storage, optional Google Analytics/Ads measurement after consent, outbound contact links, retention controlled by Google services, and the studio contact address/phone. Do not claim that the site collects form submissions.

- [ ] **Step 4: Replace unfinished public copy**

Use durable localized meaning equivalent to:

```text
Current schedule: choose a day pair to view classes. Contact us before your first visit and we will recommend the most suitable group for your age, experience, and goals.
```

Replace the archive/final-film future tense with copy describing the existing history and film. Remove every public occurrence matched by:

Run: `rg -n "being confirmed|confirmation in progress|will be added|will hold|уточня|появятся|ზუსტდება|დაემატება|აჩვენებს" src/App.tsx src/content.ts`

Expected: no unfinished-public-copy matches after the intentional replacements.

- [ ] **Step 5: Run focused and full tests**

Run: `pnpm test src/App.test.tsx && pnpm test`

Expected: PASS with zero failed tests.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/content.ts src/styles.css
git commit -m "Add local trust and privacy pages"
```

---

### Task 3: Server-rendered static route generation

**Files:**
- Create: `src/entry-server.tsx`
- Create: `scripts/prerender.mjs`
- Create: `scripts/prerender.test.ts`
- Modify: `src/AutoPlayVideo.tsx`
- Modify: `package.json`
- Modify: `tsconfig.node.json`

**Interfaces:**
- Produces: `render(pathname: string): string` from `src/entry-server.tsx`; `injectDocument(template, page): string`, `buildSitemap(routes: Array<{ path: string }>, origin: string): string`, and `buildRobots(origin): string` from `scripts/prerender.mjs`.
- Consumes: `App`, `getSeoData`, `getSiteRoutes`, and `getLocalBusinessJsonLd`.

- [ ] **Step 1: Write failing document-generation tests**

```ts
import { describe, expect, it } from "vitest";
import { buildRobots, buildSitemap, injectDocument } from "../scripts/prerender.mjs";

describe("static SEO document generation", () => {
  it("injects route HTML, metadata, alternates, and JSON-LD", () => {
    const html = injectDocument(
      '<html lang="en"><head><title>Old</title></head><body><div id="root"></div></body></html>',
      {
        lang: "ru",
        title: "Балет в Ваке",
        description: "Балетные занятия в Ваке.",
        canonical: "https://tela-vake.ge/ru/adults/ballet/",
        alternates: { en: "https://tela-vake.ge/en/adults/ballet/", ka: "https://tela-vake.ge/ka/adults/ballet/", ru: "https://tela-vake.ge/ru/adults/ballet/", "x-default": "https://tela-vake.ge/en/adults/ballet/" },
        body: "<main><h1>Балет</h1></main>",
        jsonLd: { "@type": ["LocalBusiness", "DanceSchool"] },
        robots: "index, follow",
      },
    );
    expect(html).toContain('<html lang="ru">');
    expect(html).toContain("<h1>Балет</h1>");
    expect(html).toContain("application/ld+json");
    expect(html).toContain("hreflang=\"ka\"");
  });

  it("generates absolute sitemap URLs and a root robots reference", () => {
    const sitemap = buildSitemap([{ path: "/en/" }], "https://tela-vake.ge");
    expect(sitemap).toContain("https://tela-vake.ge/en/");
    expect(buildRobots("https://tela-vake.ge")).toContain("Sitemap: https://tela-vake.ge/sitemap.xml");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test scripts/prerender.test.ts`

Expected: FAIL because `scripts/prerender.mjs` does not exist.

- [ ] **Step 3: Implement server rendering and document generation**

`src/entry-server.tsx` must call `renderToString(<App initialPath={pathname} staticRender />)`. During static rendering, `App` must omit browser-only engagement trackers, booking-dialog state, and the consent banner. `AutoPlayVideo` must initialize page visibility without reading `document` when `document` is unavailable. The existing client entry keeps `createRoot`, which replaces the pre-rendered markup with the interactive application after crawlers and non-JavaScript clients have already received the complete static document.

The generator must write route HTML as `dist/<path>/index.html`, write `dist/index.html` for `/`, generate `dist/sitemap.xml`, `dist/robots.txt`, and a `dist/404.html` carrying `noindex, follow`. It must HTML-escape metadata and JSON-escape structured data so user-facing content cannot break the document.

Add package scripts with the following flow:

```json
{
  "build:client": "vite build",
  "build:ssr": "vite build --ssr src/entry-server.tsx --outDir .seo-ssr",
  "build": "tsc -b && pnpm build:client && pnpm build:ssr && node scripts/prerender.mjs"
}
```

The generator removes only `.seo-ssr` after a successful run.

- [ ] **Step 4: Run focused tests and production build**

Run: `pnpm test scripts/prerender.test.ts && pnpm build`

Expected: PASS; `dist/en/index.html`, `dist/ru/privacy/index.html`, `dist/404.html`, `dist/robots.txt`, and `dist/sitemap.xml` exist.

- [ ] **Step 5: Commit**

```bash
git add src/entry-server.tsx src/AutoPlayVideo.tsx scripts/prerender.mjs scripts/prerender.test.ts package.json tsconfig.node.json
git commit -m "Generate crawlable static site routes"
```

---

### Task 4: Proper 404 hosting and brand icon set

**Files:**
- Modify: `vercel.json`
- Modify: `index.html`
- Create: `public/favicon.ico`
- Create: `public/favicon-48.png`
- Create: `public/apple-touch-icon.png`
- Create: `public/site.webmanifest`
- Create: `scripts/check-public-assets.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: square brand icon assets and a manifest; Vercel static routing without a catch-all 200 rewrite.
- Consumes: the existing hero/header source `public/tela-logo.png`.

- [ ] **Step 1: Add a failing public-asset check**

`scripts/check-public-assets.mjs` must inspect PNG dimensions from the IHDR header and fail unless `favicon-48.png` is `48×48`, `apple-touch-icon.png` is `180×180`, the manifest references both icons, and `vercel.json` has no catch-all rewrite to `/index.html`.

Run: `node scripts/check-public-assets.mjs`

Expected: FAIL because the new assets do not exist and the catch-all rewrite remains.

- [ ] **Step 2: Produce exact-logo icon derivatives**

Mechanically center-crop the existing `public/tela-logo.png` to a square and resize it to 48×48 and 180×180. Create `favicon.ico` from the same square source. Do not alter the original logo or generate a new mark.

`site.webmanifest` must contain:

```json
{
  "name": "DanceStudio Tela, Vake",
  "short_name": "Tela Vake",
  "start_url": "/en/",
  "display": "standalone",
  "background_color": "#21191a",
  "theme_color": "#21191a",
  "icons": [
    { "src": "/favicon-48.png", "sizes": "48x48", "type": "image/png" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
```

- [ ] **Step 3: Link icons and remove the broad rewrite**

Replace the single non-square icon link in `index.html` with `favicon.ico`, `favicon-48.png`, `apple-touch-icon.png`, and `site.webmanifest` links. Remove only the `rewrites` block from `vercel.json`; preserve cache headers.

- [ ] **Step 4: Run asset check and build**

Run: `node scripts/check-public-assets.mjs && pnpm build`

Expected: PASS, and unknown deployed routes can use Vercel's static 404 behavior.

- [ ] **Step 5: Commit**

```bash
git add public/favicon.ico public/favicon-48.png public/apple-touch-icon.png public/site.webmanifest scripts/check-public-assets.mjs index.html vercel.json package.json
git commit -m "Add Tela brand favicon and static 404 hosting"
```

---

### Task 5: Permanent-domain handoff record

**Files:**
- Create: `docs/plans/2026-08-25-tela-vake-domain-handoff.md`
- Modify: `README.md`

**Interfaces:**
- Produces: the human continuation checklist requested by the user.

- [ ] **Step 1: Write the handoff checklist**

The document must contain unchecked items in this exact phase order:

1. confirm and register `tela-vake.ge` under the intended long-term owner;
2. add the domain to Vercel and apply the exact DNS records Vercel displays;
3. wait for HTTPS to become valid;
4. set `VITE_SITE_ORIGIN=https://tela-vake.ge` in Vercel Production and redeploy;
5. verify canonical, `hreflang`, Open Graph, JSON-LD, robots, sitemap, and 404 on the new host;
6. update every Google Ads final URL before redirecting the old host and expect ad review;
7. update Google Analytics web-stream URL and Google Business Profile website;
8. verify a Search Console Domain property through DNS and submit `/sitemap.xml`;
9. request indexing for `/en/`, `/ka/`, `/ru/`, and the primary program pages;
10. configure the old Vercel hostname to redirect only after Ads URLs and the new domain are confirmed;
11. review indexing, search queries, conversions, and location results after 7–14 days.

Also record the confirmed address, phone, current/future origins, and which GA events should later become key events.

- [ ] **Step 2: Link the handoff from README**

Add a “Permanent domain continuation” section pointing to the new document and state that `VITE_SITE_ORIGIN` is the only SEO-origin setting.

- [ ] **Step 3: Verify the record contains only concrete instructions**

Run: `rg -n "fill in|decide later" docs/plans/2026-08-25-tela-vake-domain-handoff.md README.md`

Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git add docs/plans/2026-08-25-tela-vake-domain-handoff.md README.md
git commit -m "Document tela-vake.ge launch handoff"
```

---

### Task 6: Production verification and browser QA

**Files:**
- Verify only; no source changes unless a failing check reveals a defect.
- Store optional Playwright artifacts under `output/playwright/`.

**Interfaces:**
- Consumes the complete production build.
- Produces fresh evidence for completion claims.

- [ ] **Step 1: Run all automated checks**

Run:

```bash
pnpm test
node scripts/check-public-assets.mjs
pnpm build
```

Expected: all commands exit 0 with zero failed tests.

- [ ] **Step 2: Inspect generated SEO output**

Run:

```bash
rg -n "canonical|hreflang|application/ld\+json|2/5 Ateni Street" dist/en/index.html dist/ru/adults/ballet/index.html dist/ka/privacy/index.html
rg -n "Sitemap:|User-agent:" dist/robots.txt
rg -n "<loc>" dist/sitemap.xml
rg -n "noindex, follow" dist/404.html
```

Expected: route-specific canonical/alternate values, structured address data, sitemap reference, supported URL entries, and a noindex 404.

- [ ] **Step 3: Check Playwright prerequisite and start preview**

Run: `command -v npx >/dev/null 2>&1`

Expected: exit 0.

Run: `pnpm preview --host 127.0.0.1`

Expected: Vite preview stays running and reports a local URL.

- [ ] **Step 4: Navigate generated pages through Playwright CLI**

Using `/Users/iraklidzadzamia/.codex/skills/playwright/scripts/playwright_cli.sh`, open and snapshot:

- `/en/`
- `/ru/adults/ballet/`
- `/ka/privacy/`
- `/not-a-real-page/`

Verify visible H1 content, footer address, privacy navigation, program-page language switching, and not-found content at desktop and mobile viewport sizes.

- [ ] **Step 5: Review the final diff and requirements**

Run:

```bash
git diff --check
git status --short
git log --oneline -8
```

Expected: no whitespace errors; only intentional work plus the preserved pre-existing user modification remain.
