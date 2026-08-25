import { describe, expect, it } from "vitest";
import {
  DEFAULT_SITE_ORIGIN,
  SITE_ADDRESS,
  getLocalBusinessJsonLd,
  getSeoData,
  getSiteRoutes,
  matchSiteRoute,
  normalizeSiteOrigin,
} from "./site";

describe("site route and SEO configuration", () => {
  it("uses the current production host until a permanent origin is configured", () => {
    expect(DEFAULT_SITE_ORIGIN).toBe("https://dancestudio-tela-vake.vercel.app");
    expect(normalizeSiteOrigin()).toBe(DEFAULT_SITE_ORIGIN);
  });

  it("normalizes the future production origin and rejects unsafe protocols", () => {
    expect(normalizeSiteOrigin("https://tela-vake.ge/")).toBe("https://tela-vake.ge");
    expect(normalizeSiteOrigin("http://localhost:4173///")).toBe("http://localhost:4173");
    expect(() => normalizeSiteOrigin("javascript:alert(1)")).toThrow("http or https");
  });

  it("builds localized canonical and equivalent-language program alternates", () => {
    const seo = getSeoData("/ru/adults/ballet/", "https://tela-vake.ge");

    expect(seo.canonical).toBe("https://tela-vake.ge/ru/adults/ballet/");
    expect(seo.title).toContain("Балет");
    expect(seo.title).toContain("Ваке");
    expect(seo.alternates).toEqual({
      en: "https://tela-vake.ge/en/adults/ballet/",
      ka: "https://tela-vake.ge/ka/adults/ballet/",
      ru: "https://tela-vake.ge/ru/adults/ballet/",
      "x-default": "https://tela-vake.ge/en/adults/ballet/",
    });
  });

  it("lists every localized home, program, and privacy route but not the 404 page", () => {
    const paths = getSiteRoutes().map((route) => route.path);

    expect(paths).toHaveLength(30);
    expect(paths).toContain("/en/");
    expect(paths).toContain("/ka/kids/georgian-dance/");
    expect(paths).toContain("/ru/adults/pro-am/");
    expect(paths).toContain("/ru/privacy/");
    expect(paths).not.toContain("/404/");
  });

  it("matches privacy routes and marks unsupported paths as not found", () => {
    expect(matchSiteRoute("/ka/privacy")).toMatchObject({ kind: "privacy", language: "KA", path: "/ka/privacy/" });
    expect(matchSiteRoute("/not-a-real-page/")).toMatchObject({ kind: "not-found", language: "EN" });
  });

  it("publishes the confirmed branch address and phone in local business data", () => {
    const jsonLd = getLocalBusinessJsonLd("https://tela-vake.ge") as {
      "@type": string[];
      url: string;
      telephone: string;
      address: { streetAddress: string; addressLocality: string; addressCountry: string };
    };

    expect(SITE_ADDRESS).toEqual({
      streetAddress: "2/5 Ateni Street",
      addressLocality: "Tbilisi",
      addressRegion: "Tbilisi",
      addressCountry: "GE",
      neighborhood: "Vake",
    });
    expect(jsonLd["@type"]).toEqual(["LocalBusiness", "DanceSchool"]);
    expect(jsonLd.url).toBe("https://tela-vake.ge/en/");
    expect(jsonLd.telephone).toBe("+995505051614");
    expect(jsonLd.address).toMatchObject({
      streetAddress: "2/5 Ateni Street",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    });
  });
});
