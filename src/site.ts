import { siteCopy, type Language, type SiteCopy } from "./content";

export const DEFAULT_SITE_ORIGIN = "https://telavake.ge";

export const SITE_ADDRESS = {
  streetAddress: "2/5 Ateni Street",
  addressLocality: "Tbilisi",
  addressRegion: "Tbilisi",
  addressCountry: "GE",
  neighborhood: "Vake",
} as const;

export const languagePaths: Record<Language, string> = {
  EN: "/en/",
  KA: "/ka/",
  RU: "/ru/",
};

export const programSlugs: Record<string, string> = {
  "01": "ballroom-latin",
  "02": "womens-tango",
  "03": "ballet",
  "04": "georgian-dance",
  "05": "ballroom-latin",
  "06": "ballet",
  "07": "georgian-dance",
};

const languages = Object.keys(languagePaths) as Language[];
const languageByPath: Record<string, Language> = { en: "EN", ka: "KA", ru: "RU" };
const programDefinitions = [
  { audience: "adults", slug: "pro-am", number: null },
  { audience: "adults", slug: "ballroom-latin", number: "01" },
  { audience: "adults", slug: "womens-tango", number: "02" },
  { audience: "adults", slug: "ballet", number: "03" },
  { audience: "adults", slug: "georgian-dance", number: "04" },
  { audience: "kids", slug: "ballroom-latin", number: "05" },
  { audience: "kids", slug: "ballet", number: "06" },
  { audience: "kids", slug: "georgian-dance", number: "07" },
] as const;

export type SiteRoute =
  | { kind: "home"; language: Language; path: string }
  | { kind: "privacy"; language: Language; path: string }
  | { kind: "program"; language: Language; path: string; audience: "adults" | "kids"; slug: string; number: string | null };

export type MatchedSiteRoute = SiteRoute | { kind: "not-found"; language: Language; path: string };

export interface SeoData {
  lang: string;
  title: string;
  description: string;
  canonical: string;
  alternates: Partial<Record<"en" | "ka" | "ru" | "x-default", string>>;
  robots: "index, follow" | "noindex, follow";
  route: MatchedSiteRoute;
}

const privacyMetadata: Record<Language, { title: string; description: string }> = {
  EN: {
    title: "Privacy Policy — DanceStudio Tela, Vake",
    description: "How DanceStudio Tela Vake uses cookies, analytics and contact links while respecting visitor privacy.",
  },
  KA: {
    title: "კონფიდენციალურობის პოლიტიკა — სტუდია „თელა“, ვაკე",
    description: "როგორ იყენებს სტუდია „თელა“, ვაკე ქუქიებს, ანალიტიკასა და საკონტაქტო ბმულებს ვიზიტორთა კონფიდენციალურობის დაცვით.",
  },
  RU: {
    title: "Политика конфиденциальности — Танцевальная студия «Тела», Ваке",
    description: "Как студия «Тела» в Ваке использует cookies, аналитику и контактные ссылки, сохраняя конфиденциальность посетителей.",
  },
};

const notFoundMetadata: Record<Language, { title: string; description: string }> = {
  EN: { title: "Page not found — DanceStudio Tela, Vake", description: "The requested page could not be found." },
  KA: { title: "გვერდი ვერ მოიძებნა — სტუდია „თელა“, ვაკე", description: "მოთხოვნილი გვერდი ვერ მოიძებნა." },
  RU: { title: "Страница не найдена — Танцевальная студия «Тела», Ваке", description: "Запрошенная страница не найдена." },
};

export function normalizeSiteOrigin(value = DEFAULT_SITE_ORIGIN) {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("Site origin must be a valid http or https URL");
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("Site origin must use http or https");
  }

  if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
    parsed.pathname = "/";
    parsed.search = "";
    parsed.hash = "";
  }

  return parsed.origin;
}

export const siteOrigin = normalizeSiteOrigin(import.meta.env.VITE_SITE_ORIGIN?.trim() || undefined);

export function normalizePathname(pathname: string) {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/";
  const normalized = "/" + pathOnly.split("/").filter(Boolean).join("/");
  return normalized === "/" ? "/" : normalized + "/";
}

export function getSiteRoutes(): SiteRoute[] {
  return languages.flatMap((language) => {
    const languageRoot = languagePaths[language];
    const programRoutes: SiteRoute[] = programDefinitions.map((program) => ({
      kind: "program",
      language,
      path: `${languageRoot}${program.audience}/${program.slug}/`,
      audience: program.audience,
      slug: program.slug,
      number: program.number,
    }));

    return [
      { kind: "home", language, path: languageRoot },
      ...programRoutes,
      { kind: "privacy", language, path: `${languageRoot}privacy/` },
    ];
  });
}

const siteRoutes = getSiteRoutes();

export function matchSiteRoute(pathname: string): MatchedSiteRoute {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") return siteRoutes.find((route) => route.path === "/en/")!;

  const matched = siteRoutes.find((route) => route.path === normalized);
  if (matched) return matched;

  const firstSegment = normalized.split("/").filter(Boolean)[0]?.toLowerCase();
  return {
    kind: "not-found",
    language: languageByPath[firstSegment] ?? "EN",
    path: normalized,
  };
}

function programTitle(copy: SiteCopy, route: Extract<SiteRoute, { kind: "program" }>) {
  if (route.slug === "pro-am") return "Pro-Am";
  return copy.programs.items.find((program) => program.number === route.number)?.title;
}

function programDescription(copy: SiteCopy, route: Extract<SiteRoute, { kind: "program" }>) {
  if (route.slug === "pro-am") return copy.proam.body;
  return copy.programs.items.find((program) => program.number === route.number)?.body;
}

function programSeoTitle(language: Language, title: string, studio: string) {
  if (language === "KA") return `${title} ვაკეში — ${studio}`;
  if (language === "RU") return `${title} в Ваке — ${studio}`;
  return `${title} Classes in Vake — ${studio}`;
}

function equivalentPath(route: SiteRoute, language: Language) {
  if (route.kind === "home") return languagePaths[language];
  if (route.kind === "privacy") return `${languagePaths[language]}privacy/`;
  return `${languagePaths[language]}${route.audience}/${route.slug}/`;
}

function buildAlternates(route: SiteRoute, origin: string): SeoData["alternates"] {
  return {
    en: origin + equivalentPath(route, "EN"),
    ka: origin + equivalentPath(route, "KA"),
    ru: origin + equivalentPath(route, "RU"),
    "x-default": origin + equivalentPath(route, "EN"),
  };
}

export function getSeoData(pathname: string, configuredOrigin = siteOrigin): SeoData {
  const origin = normalizeSiteOrigin(configuredOrigin);
  const route = matchSiteRoute(pathname);
  const copy = siteCopy[route.language];

  if (route.kind === "not-found") {
    const metadata = notFoundMetadata[route.language];
    return {
      lang: copy.languageCode,
      ...metadata,
      canonical: origin + route.path,
      alternates: {},
      robots: "noindex, follow",
      route,
    };
  }

  if (route.kind === "privacy") {
    const metadata = privacyMetadata[route.language];
    return {
      lang: copy.languageCode,
      ...metadata,
      canonical: origin + route.path,
      alternates: buildAlternates(route, origin),
      robots: "index, follow",
      route,
    };
  }

  if (route.kind === "program") {
    const title = programTitle(copy, route);
    const description = programDescription(copy, route);
    if (!title || !description) throw new Error(`Missing localized program metadata for ${route.path}`);

    return {
      lang: copy.languageCode,
      title: programSeoTitle(route.language, title, copy.footer.studio),
      description,
      canonical: origin + route.path,
      alternates: buildAlternates(route, origin),
      robots: "index, follow",
      route,
    };
  }

  return {
    lang: copy.languageCode,
    title: copy.pageTitle,
    description: copy.pageDescription,
    canonical: origin + route.path,
    alternates: buildAlternates(route, origin),
    robots: "index, follow",
    route,
  };
}

export function getLocalBusinessJsonLd(configuredOrigin = siteOrigin) {
  const origin = normalizeSiteOrigin(configuredOrigin);
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "DanceSchool"],
    "@id": `${origin}/#dance-studio`,
    name: "DanceStudio Tela, Vake",
    alternateName: ["Dance Studio Tela Vake", "სტუდია თელა ვაკე", "Танцевальная студия Тела Ваке"],
    url: `${origin}/en/`,
    image: `${origin}/og.png`,
    logo: `${origin}/favicon-48.png`,
    telephone: "+995505051614",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    areaServed: [SITE_ADDRESS.neighborhood, SITE_ADDRESS.addressLocality],
    hasMap: "https://maps.app.goo.gl/5v5F8D6VXWXjL9tk7",
    sameAs: [
      "https://www.instagram.com/dancestudiotela.vake/",
      "https://www.facebook.com/Dancestudiotelavake",
    ],
  };
}
