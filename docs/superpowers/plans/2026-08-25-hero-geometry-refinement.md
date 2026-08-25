# Hero Geometry Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the desktop navigation divide exactly around the hero video edge in every language, keep hero reassurance text 16px away from that edge, and align the header mark with the wordmark along one lower guide at every breakpoint.

**Architecture:** Keep the existing `Header` API and add two semantic navigation groups around the existing four links. Use the homepage hero split variable as the only desktop positioning axis, while standard internal headers keep their existing centred flex navigation. Express boundary spacing and brand alignment as shared CSS rules instead of language-specific offsets.

**Tech Stack:** React 19, TypeScript, CSS, Vitest, Testing Library, Playwright CLI

## Global Constraints

- Apply the navigation geometry to English, Georgian, and Russian without per-language pixel offsets.
- Keep the WhatsApp icon aligned to the video divider.
- Keep all reassurance text at least 16px inside the left panel on desktop.
- Do not change the mobile hero video, language switcher, or booking button.
- Preserve the existing internal-page header composition.

---

### Task 1: Structural navigation groups

**Files:**
- Modify: `src/App.tsx:310-316`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `copy.nav: Array<{ href: string; label: string }>` and the existing `internal` URL-prefix behaviour
- Produces: two `.desktop-nav-group` spans containing links 1-2 and 3-4 inside the existing `.desktop-nav`

- [ ] **Step 1: Write the failing test**

Add a header-structure assertion:

```tsx
it("groups desktop navigation around the hero split", () => {
  window.history.replaceState({}, "", "/en/");
  const { container } = render(<App />);
  const groups = container.querySelectorAll(".hero .desktop-nav-group");
  expect(groups).toHaveLength(2);
  expect(groups[0].querySelectorAll("a")).toHaveLength(2);
  expect(groups[1].querySelectorAll("a")).toHaveLength(2);
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `pnpm test src/App.test.tsx`

Expected: FAIL because `.desktop-nav-group` does not exist.

- [ ] **Step 3: Implement the grouped markup**

Inside `Header`, derive the two groups and preserve the current link URL logic:

```tsx
const navigationGroups = [copy.nav.slice(0, 2), copy.nav.slice(2)];
return <header className={"header" + (internal ? " header-internal" : "")}>
  <a className="brand" href={home} aria-label={copy.footer.studio}><Logo header /><span className="brand-type">Dance Studio Tela</span></a>
  <nav className="desktop-nav" aria-label={interfaceCopy[language].navigationLabel}>
    {navigationGroups.map((group, index) => <span className="desktop-nav-group" key={index}>
      {group.map((item) => <a href={internal ? home + item.href : item.href} key={item.href}>{item.label}</a>)}
    </span>)}
  </nav>
  <div className="header-actions">...</div>
</header>;
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `pnpm test src/App.test.tsx`

Expected: PASS.

---

### Task 2: Shared split, safe area, and brand alignment

**Files:**
- Modify: `src/styles.css:92-132`
- Modify: `src/styles.css:259-263`
- Modify: `src/styles.css:624-651`
- Modify: `src/styles.css:729-789`
- Test: `src/desktopHeroLayout.test.js`

**Interfaces:**
- Consumes: `.desktop-nav-group`, `--hero-split`, `.reassurance`, `.brand`, `.logo-header`, and `.brand-type`
- Produces: one language-independent split axis, a `1rem` reassurance safe area, and responsive lower-edge brand alignment

- [ ] **Step 1: Write the failing CSS regression assertions**

Add assertions for structural split geometry, shared safe area, and bottom-aligned proportional logo sizing:

```js
expect(css).toContain(".desktop-nav-group { display: flex;");
expect(css).toContain(".hero .desktop-nav { position: absolute;");
expect(css).toContain("right: calc(var(--nav-gap) / 2);");
expect(css).toContain("left: calc(var(--nav-gap) / 2);");
expect(css).toContain("max-width: calc(100% - 1rem);");
expect(css).toContain(".brand { display: inline-flex; align-items: flex-end;");
expect(css).toContain(".logo-header { width: 58px; height: auto;");
expect(css).not.toMatch(/\.language-(?:en|ka|ru) \.desktop-nav/);
```

- [ ] **Step 2: Run the focused CSS test to verify it fails**

Run: `pnpm test src/desktopHeroLayout.test.js`

Expected: FAIL because the shared geometry rules are not present.

- [ ] **Step 3: Add the minimal shared CSS**

Use one navigation gap variable and anchor the homepage groups around the viewport split:

```css
.brand { display: inline-flex; align-items: flex-end; gap: 0.72rem; justify-self: start; }
.logo-header { width: 58px; height: auto; display: block; overflow: hidden; flex: 0 0 auto; }
.desktop-nav { --nav-gap: clamp(1.3rem, 2.5vw, 2.8rem); display: flex; gap: var(--nav-gap); }
.desktop-nav-group { display: flex; align-items: center; gap: var(--nav-gap); white-space: nowrap; }
.hero .desktop-nav {
  width: 0;
  position: absolute;
  top: 50%;
  left: calc(var(--hero-split) - ((100vw - 100%) / 2));
  gap: 0;
  transform: translateY(-50%);
}
.hero .desktop-nav-group { position: absolute; }
.hero .desktop-nav-group:first-child { right: calc(var(--nav-gap) / 2); }
.hero .desktop-nav-group:last-child { left: calc(var(--nav-gap) / 2); }
.reassurance { max-width: calc(100% - 1rem); }
```

At `max-width: 820px`, restore `max-width: none` for `.reassurance`. Set responsive `.logo-header` widths only and keep `height: auto` so the SVG aspect ratio remains stable.

- [ ] **Step 4: Run focused tests to verify they pass**

Run: `pnpm test src/desktopHeroLayout.test.js src/App.test.tsx`

Expected: PASS.

- [ ] **Step 5: Verify measured geometry in a real browser**

Start the site with `pnpm dev --host 127.0.0.1`. For `/en/`, `/ka/`, and `/ru/` at `1280x832`, measure:

```js
const divider = document.querySelector(".hero-video").getBoundingClientRect().left;
const links = [...document.querySelectorAll(".hero .desktop-nav a")].map((link) => link.getBoundingClientRect());
const midpoint = (links[1].right + links[2].left) / 2;
```

Expected: `Math.abs(divider - midpoint) <= 1` for every language; no reassurance rectangle extends beyond `divider - 16`; WhatsApp right edge stays within 1px of `divider`.

At `390x844`, confirm the video spans the viewport, the desktop navigation is hidden, reassurance uses the mobile layout, and the visible lower edges of the mark and wordmark align. Also open one internal page and confirm its navigation remains centred.

- [ ] **Step 6: Run full verification**

Run:

```bash
pnpm test
pnpm build
git diff --check
```

Expected: all tests pass, production build exits 0, and `git diff --check` prints no errors.

- [ ] **Step 7: Commit the implementation**

```bash
git add src/App.tsx src/App.test.tsx src/styles.css src/desktopHeroLayout.test.js
git commit -m "Refine multilingual hero geometry"
```
