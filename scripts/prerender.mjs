import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function stripManagedHead(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/gi, "")
    .replace(/\s*<meta\s+(?:name|property)=["'](?:description|robots|og:type|og:url|og:title|og:description|og:image|twitter:card|twitter:title|twitter:description|twitter:image)["'][^>]*>/gi, "")
    .replace(/\s*<link\s+rel=["'](?:canonical|alternate)["'][^>]*>/gi, "")
    .replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
}

export function injectDocument(template, page) {
  const cleaned = stripManagedHead(template);
  const origin = new URL(page.canonical).origin;
  const alternates = Object.entries(page.alternates)
    .filter(([, href]) => Boolean(href))
    .map(([hreflang, href]) => `<link rel="alternate" hreflang="${escapeHtml(hreflang)}" href="${escapeHtml(href)}">`)
    .join("\n    ");
  const head = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    `<meta name="robots" content="${escapeHtml(page.robots)}">`,
    `<link rel="canonical" href="${escapeHtml(page.canonical)}">`,
    alternates,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escapeHtml(page.canonical)}">`,
    `<meta property="og:title" content="${escapeHtml(page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    `<meta property="og:image" content="${escapeHtml(origin + "/og.png")}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(origin + "/og.png")}">`,
    `<script type="application/ld+json">${safeJson(page.jsonLd)}</script>`,
  ].filter(Boolean).join("\n    ");

  return cleaned
    .replace(/<html\s+lang=["'][^"']*["']/, `<html lang="${escapeHtml(page.lang)}"`)
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${page.body}</div>`);
}

export function buildSitemap(routes, origin) {
  const base = new URL(origin).origin;
  const urls = routes.map(({ path }) => `  <url><loc>${escapeHtml(base + path)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildRobots(origin) {
  const base = new URL(origin).origin;
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
}

async function writeOutput(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

export async function prerenderSite({ outputDirectory, template, routes, origin, renderPage, getSeo, jsonLd }) {
  let englishHome = null;

  for (const route of routes) {
    const seo = getSeo(route.path, origin);
    const html = injectDocument(template, {
      ...seo,
      body: renderPage(route.path),
      jsonLd,
    });
    const outputPath = join(outputDirectory, ...route.path.split("/").filter(Boolean), "index.html");
    await writeOutput(outputPath, html);
    if (route.path === "/en/") englishHome = html;
  }

  if (!englishHome) throw new Error("The route manifest must include /en/");
  await writeOutput(join(outputDirectory, "index.html"), englishHome);

  const notFoundSeo = getSeo("/404/", origin);
  const notFoundHtml = injectDocument(template, {
    ...notFoundSeo,
    body: renderPage("/404/"),
    jsonLd,
  });
  await writeOutput(join(outputDirectory, "404.html"), notFoundHtml);
  await writeOutput(join(outputDirectory, "sitemap.xml"), buildSitemap(routes, origin));
  await writeOutput(join(outputDirectory, "robots.txt"), buildRobots(origin));
}

export async function runPrerender(projectRoot = process.cwd()) {
  const outputDirectory = resolve(projectRoot, "dist");
  const serverDirectory = resolve(projectRoot, ".seo-ssr");
  const serverEntry = resolve(serverDirectory, "entry-server.js");
  const template = await readFile(join(outputDirectory, "index.html"), "utf8");
  const server = await import(pathToFileURL(serverEntry).href);
  const routes = server.getSiteRoutes();
  const origin = server.siteOrigin;

  await prerenderSite({
    outputDirectory,
    template,
    routes,
    origin,
    renderPage: server.renderStaticPage,
    getSeo: server.getSeoData,
    jsonLd: server.getLocalBusinessJsonLd(origin),
  });
  await rm(serverDirectory, { recursive: true, force: true });
}

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMainModule) {
  runPrerender().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
