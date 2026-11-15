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
