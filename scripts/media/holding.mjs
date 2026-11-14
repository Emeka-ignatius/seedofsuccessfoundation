#!/usr/bin/env node
// Makes the web-ready derivative used behind the holding page. Repeatable and metadata-stripping:
// the client's originals are ~1.7 MB each and carry camera/GPS EXIF, neither of which should ship.
//   node scripts/media/holding.mjs
//
// Source: public/images/day_1/camera/KAY_5841.JPG (foundation-stone day at the Abajah site).
// Crop: the palm grove only (top third of the frame). A background should read as place, not as portrait, and the
// people in this frame are real, identifiable clergy and parishioners whose use as wallpaper nobody has agreed.
// Those photographs belong on pages where the people are the point, with permission. See docs/IMPLEMENTATION_PLAN.md.
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const SRC = "public/images/day_1/camera/KAY_5841.JPG";
const OUT = "public/media/holding-bg.jpg";

mkdirSync("public/media", { recursive: true });

const { width, height } = await sharp(SRC).rotate().metadata();
const left = Math.round(width * 0.15);
const cropWidth = Math.round(width * 0.7);
const cropHeight = Math.round(height * 0.33);

await sharp(SRC)
  .rotate() // honour EXIF orientation, then drop all metadata (sharp strips it by default)
  .extract({ left, top: 0, width: cropWidth, height: cropHeight })
  .resize({ width: 2400, withoutEnlargement: true })
  .jpeg({ quality: 68, mozjpeg: true, progressive: true })
  .toFile(OUT);

const kb = Math.round(statSync(OUT).size / 1024);
const meta = await sharp(OUT).metadata();
console.log(
  `${OUT}: ${meta.width}x${meta.height}, ${kb} KB, exif=${meta.exif ? "present" : "stripped"}`,
);
