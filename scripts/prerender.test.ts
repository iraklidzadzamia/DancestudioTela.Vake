// @vitest-environment node

import { describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { renderStaticPage } from "../src/entry-server";
import { buildRobots, buildSitemap, injectDocument, prerenderSite } from "./prerender.mjs";

describe("static SEO document generation", () => {
  it("injects rendered content, route metadata, alternates and JSON-LD", () => {
    const html = injectDocument(
      '<!doctype html><html lang="en"><head><title>Old</title><meta name="description" content="Old" /></head><body><div id="root"></div></body></html>',
      {
        lang: "ru",
        title: "Балет & движение в Ваке",
        description: "Балетные занятия в Ваке.",
        canonical: "https://tela-vake.ge/ru/adults/ballet/",
        alternates: {
          en: "https://tela-vake.ge/en/adults/ballet/",
          ka: "https://tela-vake.ge/ka/adults/ballet/",
          ru: "https://tela-vake.ge/ru/adults/ballet/",
          "x-default": "https://tela-vake.ge/en/adults/ballet/",
        },
        body: "<main><h1>Балет</h1></main>",
        jsonLd: { "@context": "https://schema.org", "@type": ["LocalBusiness", "DanceSchool"], name: "Tela <Vake>" },
        robots: "index, follow",
      },
    );

    expect(html).toContain('<html lang="ru">');
    expect(html).toContain("<h1>Балет</h1>");
    expect(html).toContain("<title>Балет &amp; движение в Ваке</title>");
    expect(html).toContain('<link rel="canonical" href="https://tela-vake.ge/ru/adults/ballet/">');
    expect(html).toContain('<link rel="alternate" hreflang="ka" href="https://tela-vake.ge/ka/adults/ballet/">');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain("Tela \\u003cVake>");
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html.match(/name="description"/g)).toHaveLength(1);
  });

  it("generates absolute sitemap URLs and a root sitemap reference", () => {
    const sitemap = buildSitemap(
      [{ path: "/en/" }, { path: "/ru/privacy/" }],
      "https://tela-vake.ge",
    );

    expect(sitemap).toContain("<loc>https://tela-vake.ge/en/</loc>");
    expect(sitemap).toContain("<loc>https://tela-vake.ge/ru/privacy/</loc>");
    expect(buildRobots("https://tela-vake.ge")).toContain("Sitemap: https://tela-vake.ge/sitemap.xml");
  });

  it("server-renders localized route content without browser globals", () => {
    expect(renderStaticPage("/ru/adults/ballet/")).toContain("<h1>Балет</h1>");
    expect(renderStaticPage("/ka/privacy/")).toContain("კონფიდენციალურობის პოლიტიკა");
  });

  it("writes localized route documents, discovery files, a root copy and a noindex 404", async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "tela-prerender-"));
    const template = '<!doctype html><html lang="en"><head><title>Old</title></head><body><div id="root"></div></body></html>';
    const route = { path: "/en/" };
    const seoFor = (path: string) => ({
      lang: "en",
      title: path === "/404/" ? "Page not found" : "Dance classes in Vake",
      description: "Dance at Tela.",
      canonical: `https://tela-vake.ge${path}`,
      alternates: path === "/404/" ? {} : { en: "https://tela-vake.ge/en/" },
      robots: path === "/404/" ? "noindex, follow" : "index, follow",
    });

    try {
      await prerenderSite({
        outputDirectory,
        template,
        routes: [route],
        origin: "https://tela-vake.ge",
        renderPage: (path: string) => `<main><h1>${path === "/404/" ? "Page not found" : "Dance in Vake"}</h1></main>`,
        getSeo: seoFor,
        jsonLd: { "@type": ["LocalBusiness", "DanceSchool"] },
      });

      expect(await readFile(join(outputDirectory, "en", "index.html"), "utf8")).toContain("Dance in Vake");
      expect(await readFile(join(outputDirectory, "index.html"), "utf8")).toContain("Dance in Vake");
      expect(await readFile(join(outputDirectory, "404.html"), "utf8")).toContain("noindex, follow");
      expect(await readFile(join(outputDirectory, "sitemap.xml"), "utf8")).toContain("https://tela-vake.ge/en/");
      expect(await readFile(join(outputDirectory, "robots.txt"), "utf8")).toContain("https://tela-vake.ge/sitemap.xml");
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });
});
