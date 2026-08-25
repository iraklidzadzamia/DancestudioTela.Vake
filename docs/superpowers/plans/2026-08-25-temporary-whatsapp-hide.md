# Temporary WhatsApp Hiding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide WhatsApp from every actionable contact surface without removing its URL or GA4 event path, and raise the mobile language labels by one additional optical pixel.

**Architecture:** Keep WhatsApp as a supported `ContactChannel` and add a single `WHATSAPP_ENABLED` availability flag in `src/contacts.ts`. Derive all three rendered channel arrays from that flag, leaving `contactHref`, click handlers, and the `contact_whatsapp` analytics mapping untouched. Refine only the mobile language button's inner bottom padding so its outer hit box and the rest of the header remain fixed.

**Tech Stack:** React 19, TypeScript, CSS, Vitest, Testing Library, Vite

## Global Constraints

- WhatsApp must not render in the hero, booking dialog, or contact section while disabled.
- The WhatsApp type, URL generation, localized prefilled messages, click handlers, and GA4 event mapping must remain in the code.
- Re-enabling one flag must restore the existing `contact_whatsapp` tracking path.
- Instagram, Messenger, Google Maps, and phone behaviour must not change.
- The dancer mark, wordmark, language-button rectangles, and other header geometry must not move.

---

### Task 1: Reversible WhatsApp availability

**Files:**
- Modify: `src/contacts.ts:22-26`
- Modify: `src/App.test.tsx:194-230`
- Create: `src/contactAvailability.test.ts`

**Interfaces:**
- Consumes: `ContactChannel`, `contactHref`, the three channel arrays, and `trackContactIntent`
- Produces: `WHATSAPP_ENABLED: boolean` and channel arrays that omit WhatsApp only while the flag is false

- [ ] **Step 1: Write the failing availability and UI tests**

Create `src/contactAvailability.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  WHATSAPP_ENABLED,
  bookingContactChannels,
  contactHref,
  heroContactChannels,
  sectionContactChannels,
} from "./contacts";

describe("temporary WhatsApp availability", () => {
  it("hides WhatsApp from rendered channel lists without deleting its integration", () => {
    expect(WHATSAPP_ENABLED).toBe(false);
    expect(heroContactChannels).not.toContain("WhatsApp");
    expect(bookingContactChannels).not.toContain("WhatsApp");
    expect(sectionContactChannels).not.toContain("WhatsApp");
    expect(contactHref("WhatsApp", "RU")).toContain("https://wa.me/");
  });

  it("keeps the GA4 event and click-tracking path ready for restoration", () => {
    const analytics = readFileSync("src/analytics.ts", "utf8");
    const app = readFileSync("src/App.tsx", "utf8");
    expect(analytics).toContain('WhatsApp: "contact_whatsapp"');
    expect(app).toMatch(/trackContactIntent\(channel, "hero", language\)/);
    expect(app).toMatch(/trackContactIntent\(channel, "booking_modal", language/);
    expect(app).toMatch(/trackContactIntent\(channel, "contact_section", language\)/);
  });
});
```

Update the existing hero and booking assertions in `src/App.test.tsx` to expect only the remaining channels. Add a contact-section assertion that no rendered link has the WhatsApp label or `wa.me` URL.

- [ ] **Step 2: Run tests to verify the availability test fails**

Run:

```bash
pnpm test src/contactAvailability.test.ts src/App.test.tsx
```

Expected: FAIL because `WHATSAPP_ENABLED` does not exist and all three channel arrays still contain WhatsApp.

- [ ] **Step 3: Implement the single availability flag**

In `src/contacts.ts`, retain all existing WhatsApp data and functions, and replace only the rendered lists:

```ts
export const WHATSAPP_ENABLED = false;

const optionalFacebook: ContactChannel[] = facebookMessenger ? ["Facebook"] : [];
const optionalWhatsApp: ContactChannel[] = WHATSAPP_ENABLED ? ["WhatsApp"] : [];
export const heroContactChannels: ContactChannel[] = ["Google Maps", "Instagram", ...optionalFacebook, ...optionalWhatsApp];
export const bookingContactChannels: ContactChannel[] = [...optionalWhatsApp, "Instagram", ...optionalFacebook, "Phone"];
export const sectionContactChannels: ContactChannel[] = ["Google Maps", "Instagram", ...optionalFacebook, ...optionalWhatsApp, "Phone"];
```

Do not edit `contactHref`, `trackContactIntent`, `contactEventNames`, or the existing render-time click callbacks.

- [ ] **Step 4: Run the focused tests to verify they pass**

Run:

```bash
pnpm test src/contactAvailability.test.ts src/App.test.tsx
```

Expected: PASS with WhatsApp absent from rendered UI and the integration guards intact.

---

### Task 2: Mobile language-label optical correction

**Files:**
- Modify: `src/mobileHeaderEyebrow.test.js:28-40`
- Modify: `src/styles.css:630-638`

**Interfaces:**
- Consumes: the current `0.4rem` mobile label lift and fixed `44px` language-button target
- Produces: a `0.46rem` inner label lift without changing the button rectangle

- [ ] **Step 1: Write the failing CSS regression assertion**

Change the existing assertion to require the additional optical pixel:

```js
expect(mobileCss).toMatch(
  /\.language-switcher button \{[^}]*padding-block: 0 0\.46rem;/,
);
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
pnpm test src/mobileHeaderEyebrow.test.js
```

Expected: FAIL because the current value is `0.4rem`.

- [ ] **Step 3: Apply the minimal CSS change**

At `max-width: 820px`, change only the inner bottom padding:

```css
.language-switcher button { display: grid; align-items: end; justify-items: center; padding-block: 0 0.46rem; line-height: 1; }
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run:

```bash
pnpm test src/mobileHeaderEyebrow.test.js
```

Expected: PASS.

---

### Task 3: Browser verification and publication

**Files:**
- Verify: `src/contacts.ts`
- Verify: `src/styles.css`
- Verify: `src/App.tsx`

- [ ] **Step 1: Verify the local UI in a real browser**

At desktop and 360px mobile widths, confirm that no WhatsApp link appears in the hero, booking dialog, or contact section. At 360, 390, and 430px, confirm that the language-button rectangles and logo are unchanged while label text rises by about `0.96px`.

- [ ] **Step 2: Run the full verification gate**

Run:

```bash
pnpm test
pnpm build
git diff --check
```

Expected: all tests pass, the production build exits 0, and the diff check prints no errors.

- [ ] **Step 3: Commit and publish**

```bash
git add src/contacts.ts src/App.test.tsx src/contactAvailability.test.ts src/mobileHeaderEyebrow.test.js src/styles.css
git commit -m "Temporarily hide WhatsApp contact actions"
git push origin main
```

After Vercel deploys, repeat the WhatsApp and mobile-header checks on `https://telavake.ge/`.
