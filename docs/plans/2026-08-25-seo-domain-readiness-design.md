# SEO and Domain Readiness Design

## Goal

Prepare the existing DanceStudio Tela Vake website for reliable crawling, indexing, local discovery, and a later move to `tela-vake.ge` without redesigning the interface or changing the live advertising destination before the domain is purchased.

## Confirmed decisions

- Keep the current Vite, React, and Vercel stack.
- Keep the current visual design and public contact channels.
- Use the existing dancer logo shown in the hero/header for every favicon and touch-icon size; do not redraw the mark.
- Use `2/5 Ateni Street, Vake, Tbilisi, Georgia` as the public branch address.
- Continue using `https://dancestudio-tela-vake.vercel.app` until the permanent domain is purchased.
- Treat `tela-vake.ge` as the intended permanent domain, but do not publish canonical URLs for an unowned domain.
- Preserve the user's existing unrelated working-tree change in `docs/plans/2026-08-25-google-ads-search-campaign-design.md`.

## Chosen approach

Add static generation to the current Vite application instead of applying metadata-only patches or migrating frameworks. A client build remains responsible for the interactive site. A small server-rendering entry and post-build generator will render each supported route into complete HTML, add route-specific metadata and structured data, and generate discovery files.

This keeps the current site behavior while ensuring that crawlers receive useful HTML without waiting for client-side JavaScript. The future origin will be controlled through one validated site configuration value.

## Architecture

### Shared site configuration

A focused configuration module will own:

- the current public origin with a Vercel fallback;
- the public studio name, address, and phone;
- language routes and program routes;
- canonical and alternate URL construction;
- route-specific titles and descriptions;
- LocalBusiness structured data.

Browser metadata updates and static generation will consume the same functions so their output cannot drift apart.

### Static route generation

The production build will:

1. build the browser application;
2. build a temporary React server-rendering entry;
3. render the home, program, privacy, and not-found routes;
4. write complete route HTML under `dist`;
5. generate `robots.txt`, `sitemap.xml`, and `404.html`;
6. remove only the explicit temporary server-build directory.

The broad Vercel rewrite will be removed. Existing generated paths will resolve as static pages, and unknown paths will receive an actual 404 response instead of the home page with HTTP 200.

### Public pages and metadata

The site will gain localized privacy pages at `/en/privacy/`, `/ka/privacy/`, and `/ru/privacy/`. All public pages will have:

- a unique title and description;
- a self-referencing canonical URL;
- equivalent-language `hreflang` URLs;
- matching Open Graph and Twitter metadata;
- LocalBusiness JSON-LD with the confirmed branch address and phone;
- indexable static page content.

The not-found page will use `noindex` and will not be listed in the sitemap.

### Content cleanup

Public wording that says schedules, ages, teachers, archive content, or class details are still being confirmed will be replaced with durable language. The replacement copy will remain truthful: visitors will be asked to contact the studio for the most suitable group before their first visit, without implying that the website is unfinished.

The full public address and a localized privacy link will be added to the footer.

### Brand icons

The existing hero/header dancer logo will be center-cropped mechanically to a square, without generative changes, and exported as browser-friendly favicon and Apple touch-icon sizes. The original source asset remains untouched.

## Error handling

- Invalid or unsupported routes render a localized not-found page rather than silently rendering the home page.
- Site origins are normalized and must use `http` or `https`; invalid build-time values fail the build with a clear error.
- Sitemap and canonical generation use only the supported route manifest.
- Missing route metadata is treated as a test/build failure rather than falling back silently.

## Testing and verification

- Pure SEO route/configuration functions will be developed test-first with Vitest.
- App tests will cover localized privacy, address/footer output, not-found behavior, metadata, and alternate-language URLs.
- Production-build assertions will inspect generated route HTML, sitemap, robots, favicon references, JSON-LD, and 404 output.
- The final production preview will be navigated through Playwright at desktop and mobile viewport sizes.
- The existing full Vitest suite, TypeScript build, and Vite production build must pass before completion is reported.

## Deferred until `tela-vake.ge` is purchased

The repository will contain a dedicated handoff checklist covering:

- domain registration and ownership details;
- Vercel domain connection and DNS records;
- `VITE_SITE_ORIGIN=https://tela-vake.ge` in production;
- redirect and canonical verification;
- Google Ads final URL replacement and ad review;
- Google Analytics, Google Business Profile, and social profile URL updates;
- Search Console DNS verification, sitemap submission, URL inspection, and indexing checks.

These steps are not executed before ownership of the permanent domain is confirmed.
