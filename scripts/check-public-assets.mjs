import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readText(pathname) {
  return readFile(resolve(root, pathname), "utf8");
}

async function pngDimensions(pathname) {
  const buffer = await readFile(resolve(root, pathname));
  assert(buffer.toString("hex", 0, 8) === "89504e470d0a1a0a", `${pathname} is not a PNG`);
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function check() {
  const index = await readText("index.html");
  const manifest = JSON.parse(await readText("public/site.webmanifest"));
  const vercel = JSON.parse(await readText("vercel.json"));
  const favicon = await pngDimensions("public/favicon-48.png");
  const appleIcon = await pngDimensions("public/apple-touch-icon.png");

  assert(favicon.width === 48 && favicon.height === 48, "favicon-48.png must be 48×48");
  assert(appleIcon.width === 180 && appleIcon.height === 180, "apple-touch-icon.png must be 180×180");
  await stat(resolve(root, "public/favicon.ico"));
  assert(index.includes('href="/favicon-48.png"'), "index.html must reference favicon-48.png");
  assert(index.includes('href="/apple-touch-icon.png"'), "index.html must reference apple-touch-icon.png");
  assert(index.includes('href="/site.webmanifest"'), "index.html must reference site.webmanifest");
  assert(manifest.name === "DanceStudio Tela, Vake", "manifest must use the public studio name");
  assert(manifest.icons?.some((icon) => icon.src === "/favicon-48.png"), "manifest must reference favicon-48.png");
  assert(manifest.icons?.some((icon) => icon.src === "/apple-touch-icon.png"), "manifest must reference apple-touch-icon.png");
  assert(!vercel.rewrites, "vercel.json must not use the SPA catch-all rewrite");
  assert(vercel.trailingSlash === true, "vercel.json must canonicalize routes with a trailing slash");
  assert(vercel.redirects?.some((rule) => rule.source === "/" && rule.destination === "/en/" && rule.permanent), "vercel.json must permanently redirect / to /en/");
}

check()
  .then(() => console.log("Public icons, manifest, and Vercel routes are valid."))
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
