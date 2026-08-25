import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  renameSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const sourceLogo = join(repositoryRoot, "public", "tela-logo.png");
const temporaryDirectory = mkdtempSync(join(tmpdir(), "tela-social-"));

const assets = [
  {
    filename: "tela-logo-square.png",
    width: 1200,
    height: 1200,
    logoSize: 1000,
  },
  {
    filename: "og.png",
    width: 1200,
    height: 630,
    logoSize: 520,
  },
];

function backgroundFilter(width, height) {
  const plum =
    "exp(-((X-W/2)*(X-W/2)+(Y-H*0.48)*(Y-H*0.48))/(2*(0.34*W)*(0.34*W)))";
  const warm =
    "exp(-((X-W*0.92)*(X-W*0.92)+(Y-H*0.18)*(Y-H*0.18))/(2*(0.38*W)*(0.38*W)))";

  return [
    `color=c=0x150f13:s=${width}x${height}`,
    "format=rgb24",
    `geq=r='clip(21+30*${plum}+10*${warm},0,255)'` +
      `:g='clip(15+14*${plum}+6*${warm},0,255)'` +
      `:b='clip(19+27*${plum}+2*${warm},0,255)'`,
    "noise=alls=2:allf=u:all_seed=17",
  ].join(",");
}

function runFfmpeg(asset, temporaryOutput) {
  const filter = [
    `[1:v]crop=2828:2828:586:0,scale=${asset.logoSize}:${asset.logoSize}:flags=lanczos,format=rgba[logo]`,
    "[0:v]format=rgba[background]",
    "[background][logo]overlay=(W-w)/2:(H-h)/2:format=auto,format=rgb24",
  ].join(";");

  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      backgroundFilter(asset.width, asset.height),
      "-i",
      sourceLogo,
      "-filter_complex",
      filter,
      "-frames:v",
      "1",
      temporaryOutput,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || `ffmpeg failed for ${asset.filename}`);
  }
}

try {
  for (const asset of assets) {
    const temporaryOutput = join(temporaryDirectory, asset.filename);
    const finalOutput = join(repositoryRoot, "public", asset.filename);

    runFfmpeg(asset, temporaryOutput);
    renameSync(temporaryOutput, finalOutput);
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
