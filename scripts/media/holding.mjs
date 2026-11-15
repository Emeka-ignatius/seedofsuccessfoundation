#!/usr/bin/env node
// Makes the web-ready derivatives used on the holding page. Repeatable and metadata-stripping:
// the client's originals are ~1.7 MB each and carry camera/GPS EXIF, neither of which should ship.
//   node scripts/media/holding.mjs
//
// The originals live in `originals/` (gitignored, never inside `public/`, which is served). They are personal data
// and their licence is unconfirmed, so they are kept on the developer's machine only. Nothing but the derivatives
// this script writes to `public/media/` may be served. See lib/security/CLAUDE.md and docs/IMPLEMENTATION_PLAN.md.
//
// Outputs:
//   public/media/grove-1..5.jpg   the rotating background on the holding page, in the order backdrop.tsx shows them.
//                                 Chosen by the site owner. Sources are in `originals/grove-source/`.
//   public/media/about-*.jpg      the story plates on the About page (components/site/about.tsx).
//   public/media/builders.jpg     the builders at the site, on the home page's "being built" section.
//
// The plates show identifiable clergy, sisters and parishioners at public ceremonies: used on the owner's
// (Fusco's) decision while the client's photo permissions and the Kay Images licence are still outstanding
// (see the dependency tracker in docs/IMPLEMENTATION_PLAN.md). Outreach frames showing patients or children
// are deliberately NOT used anywhere until the client confirms permission.
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const ORIGINALS = "originals";
const OUT_DIR = "public/media";

// The owner's choice, in display order. 1 and 5 are portraits of identifiable people, 2 has people at distance,
// 3 and 4 are the building under construction.
const GROVE = [
  "grove-source/grove-1.jpg",
  "grove-source/grove-2.jpg",
  "grove-source/grove-3.jpeg",
  "grove-source/grove-4.jpeg",
  "grove-source/grove-5.jpg",
];

// Story plates: [source under originals/images, output name, width]. Chosen for what each frame says; see
// docs/DESIGN_BRIEF.md ("Photography rules") for the mapping to page sections.
const PLATES = [
  ["day_2/church/KAY_6248.JPG", "about-priests.jpg", 2000],
  ["day_2/church/KAY_6451.JPG", "about-sisters.jpg", 1400],
  ["day_2/church/KAY_6494.JPG", "about-guests.jpg", 1400],
  ["day_2/church/KAY_135.JPG", "about-land.jpg", 1400],
  ["day_1/camera/KAY_5877.JPG", "about-stone.jpg", 1400],
  ["day_1/camera/KAY_5954.JPG", "about-welcome.jpg", 1400],
  ["day_1/camera/KAY_5923.JPG", "builders.jpg", 1600],
];

mkdirSync(OUT_DIR, { recursive: true });

async function write(pipeline, out, width, quality = 70) {
  await pipeline
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(out);
  const kb = Math.round(statSync(out).size / 1024);
  const m = await sharp(out).metadata();
  console.log(`${out}: ${m.width}x${m.height}, ${kb} KB, exif=${m.exif ? "present" : "stripped"}`);
}

// .rotate() honours EXIF orientation; sharp then drops all metadata by default.
for (const [i, file] of GROVE.entries())
  await write(sharp(`${ORIGINALS}/${file}`).rotate(), `${OUT_DIR}/grove-${i + 1}.jpg`, 2400);

for (const [src, out, width] of PLATES)
  await write(sharp(`${ORIGINALS}/images/${src}`).rotate(), `${OUT_DIR}/${out}`, width);
