# Telavake.ge Domain Cutover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Перевести все публикуемые URL сайта DanceStudio Tela с временного домена Vercel на `https://telavake.ge` без нарушения языковых маршрутов, SEO и аналитики.

**Architecture:** Единственным источником origin остаётся `DEFAULT_SITE_ORIGIN`/`VITE_SITE_ORIGIN`. Пререндер использует его для canonical, hreflang, Open Graph, JSON-LD, sitemap и robots; статический шаблон содержит тот же безопасный production fallback.

**Tech Stack:** React, TypeScript, Vite, Vitest, Vercel, Node.js prerender.

## Global Constraints

- Основной адрес: `https://telavake.ge` без `www`.
- `www.telavake.ge` постоянно перенаправляется на основной домен кодом 308.
- Существующие пути `/en/`, `/ka/`, `/ru/` и все страницы программ не меняются.
- Measurement ID GA4 и имена событий не меняются.
- Исторические планы не переписываются; актуальное состояние фиксируется в README и доменном чек-листе.

---

### Task 1: Зафиксировать новый production origin тестами

**Files:**
- Modify: `src/site.test.ts`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: `DEFAULT_SITE_ORIGIN`, `getSeoData()`, runtime head metadata.
- Produces: тестовые ожидания для `https://telavake.ge`.

- [ ] **Step 1: Заменить ожидаемый временный origin на новый домен**

```ts
expect(DEFAULT_SITE_ORIGIN).toBe("https://telavake.ge");
expect(document.querySelector('link[hreflang="ka"]')).toHaveAttribute(
  "href",
  "https://telavake.ge/ka/adults/ballet/",
);
```

- [ ] **Step 2: Запустить целевые тесты и подтвердить, что они падают до изменения реализации**

Run: `pnpm test -- src/site.test.ts src/App.test.tsx`
Expected: FAIL на старом `dancestudio-tela-vake.vercel.app`.

### Task 2: Переключить публикуемые URL на новый домен

**Files:**
- Modify: `src/site.ts`
- Modify: `index.html`
- Modify: `.env.example`
- Modify: `README.md`
- Modify: `docs/plans/2026-08-25-tela-vake-domain-handoff.md`
- Modify: `DOMAIN_LAUNCH_CHECKLIST.md`

**Interfaces:**
- Consumes: `VITE_SITE_ORIGIN` и fallback `DEFAULT_SITE_ORIGIN`.
- Produces: canonical, hreflang, Open Graph, JSON-LD, sitemap и robots на `https://telavake.ge`.

- [ ] **Step 1: Обновить единый fallback origin**

```ts
export const DEFAULT_SITE_ORIGIN = "https://telavake.ge";
```

- [ ] **Step 2: Обновить статические fallback URL в HTML и пример переменной окружения**

```text
VITE_SITE_ORIGIN=https://telavake.ge
```

- [ ] **Step 3: Обновить актуальную документацию и отметить завершённые пункты DNS/SSL**

Run: `rg -n 'dancestudio-tela-vake\.vercel\.app|tela-vake\.ge' src index.html .env.example README.md DOMAIN_LAUNCH_CHECKLIST.md docs/plans/2026-08-25-tela-vake-domain-handoff.md`
Expected: старый и ошибочный домены отсутствуют в актуальных файлах.

- [ ] **Step 4: Запустить целевые тесты**

Run: `pnpm test -- src/site.test.ts src/App.test.tsx`
Expected: PASS.

### Task 3: Проверить production build и сгенерированные SEO-файлы

**Files:**
- Verify: `dist/en/index.html`
- Verify: `dist/ka/index.html`
- Verify: `dist/ru/index.html`
- Verify: `dist/sitemap.xml`
- Verify: `dist/robots.txt`

**Interfaces:**
- Consumes: production build output.
- Produces: проверенный набор статических страниц для Vercel.

- [ ] **Step 1: Запустить полный тестовый набор**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 2: Собрать production build**

Run: `pnpm build`
Expected: exit 0.

- [ ] **Step 3: Проверить новый домен в сгенерированных SEO-файлах**

Run: `rg -n 'https://telavake\.ge' dist/en/index.html dist/ka/index.html dist/ru/index.html dist/sitemap.xml dist/robots.txt`
Expected: новый домен присутствует во всех проверяемых файлах.

- [ ] **Step 4: Убедиться, что временный домен не публикуется**

Run: `rg -n 'dancestudio-tela-vake\.vercel\.app|tela-vake\.ge' dist`
Expected: no matches.

### Task 4: Обновить Vercel и проверить живой домен

**Files:**
- Modify external setting: Vercel Production `VITE_SITE_ORIGIN=https://telavake.ge`, если переменная существует.
- Deploy: branch `main` through the connected Vercel project.

**Interfaces:**
- Consumes: проверенный Git commit и Vercel project configuration.
- Produces: живой сайт с новым production origin.

- [ ] **Step 1: Проверить значение `VITE_SITE_ORIGIN` в Vercel**

Expected: переменная отсутствует либо равна `https://telavake.ge` для Production.

- [ ] **Step 2: Опубликовать проверенные изменения через подключённый репозиторий**

Run: `git push origin main`
Expected: Vercel запускает production deployment.

- [ ] **Step 3: Проверить HTTP, HTTPS и www-редирект**

Run: `curl -sSIL https://telavake.ge/` и `curl -sSIL https://www.telavake.ge/`
Expected: основной домен ведёт на `/en/`, `www` возвращает постоянный редирект на `https://telavake.ge/`.

- [ ] **Step 4: Проверить опубликованные canonical, sitemap и robots**

Run: `curl -sS https://telavake.ge/en/`, `curl -sS https://telavake.ge/sitemap.xml`, `curl -sS https://telavake.ge/robots.txt`
Expected: только `https://telavake.ge`.

