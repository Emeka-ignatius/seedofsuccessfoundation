#!/usr/bin/env node
// Makes the web-ready derivatives used behind the holding page. Repeatable and metadata-stripping:
// the client's originals are ~1.7 MB each and carry camera/GPS EXIF, neither of which should ship.
//   node scripts/media/holding.mjs
//
// Two outputs:
//   public/media/holding-bg.jpg   KAY_5841 palm grove, used by the social-share (OG) image.
//   public/media/grove-1..N.jpg   the rotating background on the holding page (see backdrop.tsx).
//
// Every crop is canopy only (the top strip of an outdoor frame). A background should read as place, not as portrait,
// and the people in these frames are real, identifiable clergy and parishioners whose use as wallpaper nobody has
// agreed. Those photographs belong on pages where the people are the point, with permission.
// See docs/IMPLEMENTATION_PLAN.md. If you add a frame, look at the output: a head or cap at the bottom edge fails it.
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const DIR = "public/images/day_1/camera";

// Fractions of the upright image: left, width, height (top is always 0). Each stays about 3.2:1, like the first.
// Order is the order they appear in; the first is also the one visitors see before anything has faded.
const GROVE = [
  { id: "KAY_5841", left: 0.15, width: 0.7, height: 0.33 },
  { id: "KAY_5886", left: 0.2, width: 0.57, height: 0.27 },
  { id: "KAY_5835", left: 0.15, width: 0.51, height: 0.24 },
  { id: "KAY_5890", left: 0.2, width: 0.59, height: 0.28 },
  { id: "KAY_5923", left: 0.1, width: 0.45, height: 0.21 },
];

mkdirSync("public/media", { recursive: true });

async function make({ id, left, width, height }, out) {
  const src = `${DIR}/${id}.JPG`;
  const meta = await sharp(src).rotate().metadata();
  await sharp(src)
    .rotate() // honour EXIF orientation, then drop all metadata (sharp strips it by default)
    .extract({
      left: Math.round(meta.width * left),
      top: 0,
      width: Math.round(meta.width * width),
      height: Math.round(meta.height * height),
    })
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 68, mozjpeg: true, progressive: true })
    .toFile(out);
  const kb = Math.round(statSync(out).size / 1024);
  const m = await sharp(out).metadata();
  console.log(`${out}: ${m.width}x${m.height}, ${kb} KB, exif=${m.exif ? "present" : "stripped"}`);
}

await make(GROVE[0], "public/media/holding-bg.jpg");
for (const [i, crop] of GROVE.entries()) await make(crop, `public/media/grove-${i + 1}.jpg`);
