# Russian Copy Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every reviewed Russian website string with the owner-approved native version and protect it with regression tests.

**Architecture:** Keep the existing copy objects and component structure unchanged. Add focused tests around `siteCopy.RU`, rendered Russian pages, consent text, and the generated WhatsApp URL; then update only string literals in the four existing production files.

**Tech Stack:** TypeScript, React, Vitest, Testing Library, Vite prerender build

## Global Constraints

- Direct visitor address uses informal singular `ты`.
- Connected Russian copy uses Latin `Tela`, never `«Тела»`, `«Телы»`, or `«Теле»`.
- The program name is `Женское танго`.
- Cookie terminology is `файлы cookie` and `аналитические файлы cookie`.
- WhatsApp prefill is exactly `Здравствуйте! Хочу записаться на первый бесплатный урок.`
- English and Georgian copy, layout, routing, analytics, and contact destinations must not change.

---

### Task 1: Lock the approved Russian content and WhatsApp behavior

**Files:**
- Create: `src/russianCopy.test.ts`
- Modify: `src/content.ts`
- Modify: `src/contacts.ts`

**Interfaces:**
- Consumes: `siteCopy.RU` from `src/content.ts` and `contactHref("WhatsApp", "RU")` from `src/contacts.ts`.
- Produces: approved Russian content values and the approved encoded WhatsApp message.

- [ ] **Step 1: Write the failing copy test**

Create assertions for the exact approved high-risk strings and project-wide rejected variants:

```ts
expect(siteCopy.RU.hero.title).toBe("Найди свой");
expect(siteCopy.RU.hero.body).toContain("студия Tela");
expect(siteCopy.RU.proam.body).toContain("участвуй в закрытом вечере в студии вместе с друзьями");
expect(siteCopy.RU.journey.steps[2].title).toBe("Внимательное обучение");
expect(siteCopy.RU.programs.items[1].title).toBe("Женское танго");
expect(siteCopy.RU.heritage.note).toBe("Более чем полувековая танцевальная традиция продолжается в студии и сегодня.");
expect(JSON.stringify(siteCopy.RU)).not.toMatch(/«Тел(?:а|ы|е)»|Women’s Tango/);
expect(new URL(contactHref("WhatsApp", "RU")).searchParams.get("text")).toBe(
  "Здравствуйте! Хочу записаться на первый бесплатный урок.",
);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `pnpm test src/russianCopy.test.ts`

Expected: failures show the current formal-address copy, `Women’s Tango`, Cyrillic brand forms, old heritage note, and old WhatsApp prefill.

- [ ] **Step 3: Update content and contact strings**

Apply the approved before/after comparison to the Russian `SiteCopy` object, including metadata, hero, Pro-Am, journey, program cards, schedule, heritage, FAQ, contact, footer, and exact WhatsApp message. Do not modify the English or Georgian objects.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `pnpm test src/russianCopy.test.ts`

Expected: the new test file passes with no failures.

### Task 2: Lock the approved interface, consent, booking, and privacy copy

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/ConsentBanner.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/ConsentBanner.tsx`

**Interfaces:**
- Consumes: Russian routes `/ru/` and `/ru/privacy/`, `ConsentBanner` with `language="RU"`.
- Produces: rendered informal Russian interface, booking modal, privacy page, and consent banner.

- [ ] **Step 1: Write failing rendered-copy tests**

Add assertions for the approved live interface:

```ts
expect(container).toHaveTextContent("Для кого ты ищешь занятия?");
expect(container).toHaveTextContent("Сила, музыкальность и свобода самовыражения.");
expect(container).toHaveTextContent("Настоящие моменты из жизни студии Tela");
expect(dialog).toHaveTextContent("Выбери, как тебе удобнее записаться.");
expect(privacy).toHaveTextContent("Конфиденциальность в студии Tela");
expect(privacy).toHaveTextContent("аналитические файлы cookie");
expect(privacy).toHaveTextContent("Кнопка карты открывает Google Maps");
expect(consent).toHaveTextContent("Твоя конфиденциальность — твой выбор");
```

- [ ] **Step 2: Run the focused interface tests and verify RED**

Run: `pnpm test src/App.test.tsx src/ConsentBanner.test.tsx`

Expected: assertions fail on the current formal Russian interface and old privacy/cookie terminology.

- [ ] **Step 3: Update interface and consent strings**

Replace only Russian literals in `interfaceCopy`, `bookingCopy`, `privacyCopy`, and `consentCopy`. Use the approved privacy external-services sentence exactly:

```text
Кнопка карты открывает Google Maps, ссылки социальных сетей и мессенджеров — соответствующие сервисы, а кнопка звонка — приложение телефона. После их открытия действуют условия соответствующего сервиса или приложения.
```

- [ ] **Step 4: Run the focused interface tests and verify GREEN**

Run: `pnpm test src/App.test.tsx src/ConsentBanner.test.tsx`

Expected: both test files pass with no failures.

### Task 3: Audit, build, commit, and publish

**Files:**
- Verify: `src/content.ts`
- Verify: `src/App.tsx`
- Verify: `src/ConsentBanner.tsx`
- Verify: `src/contacts.ts`
- Verify: `dist/ru/index.html`
- Verify: `dist/ru/privacy/index.html`

**Interfaces:**
- Consumes: completed copy changes and tests from Tasks 1–2.
- Produces: verified commit on `main`, pushed to `origin/main`.

- [ ] **Step 1: Audit rejected Russian variants**

Run searches for formal direct-address forms, `Women’s Tango`, Cyrillic brand forms, and mixed cookie terminology in the Russian production objects. Review every match rather than blindly replacing unrelated English or Georgian text.

- [ ] **Step 2: Run complete verification**

Run: `pnpm test`

Expected: every test file passes with zero failed tests.

Run: `pnpm build`

Expected: TypeScript, client build, SSR build, and prerender complete successfully.

- [ ] **Step 3: Verify prerendered pages and patch quality**

Confirm `dist/ru/index.html` contains `студия Tela`, `Женское танго`, and the informal CTA. Confirm `dist/ru/privacy/index.html` contains `аналитические файлы cookie` and the approved external-services sentence. Run `git diff --check`.

- [ ] **Step 4: Commit the cohesive copy change**

```bash
git add src/content.ts src/contacts.ts src/App.tsx src/ConsentBanner.tsx src/russianCopy.test.ts src/App.test.tsx src/ConsentBanner.test.tsx docs/superpowers/plans/2026-08-25-russian-copy-review.md
git commit -m "Polish Russian site copy"
```

- [ ] **Step 5: Push and verify the remote ref**

```bash
git push origin main
git status --short
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

Expected: local `HEAD` and `origin/main` resolve to the same commit and the worktree is clean.
