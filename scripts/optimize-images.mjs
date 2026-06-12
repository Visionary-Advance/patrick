// One-off image optimizer: resizes oversized images in public/Img to a sane
// max width and re-encodes them in place. Skips anything already small enough.
// Run: node scripts/optimize-images.mjs
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "Img");
const MAX_WIDTH = 2000;
const SIZE_THRESHOLD = 900 * 1024; // only touch files larger than ~900 KB
const JPEG_QUALITY = 80;

const fmt = (b) => (b / 1024 / 1024).toFixed(2) + " MB";

const files = await readdir(DIR);
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

  const full = path.join(DIR, file);
  const { size: before } = await stat(full);
  if (before < SIZE_THRESHOLD) continue;

  const input = await readFile(full);
  // failOn: 'none' tolerates truncated/corrupt source images.
  let pipeline = sharp(input, { failOn: "none" })
    .rotate() // bake in EXIF orientation before stripping metadata
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: JPEG_QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  let output;
  try {
    output = await pipeline.toBuffer();
  } catch (err) {
    console.log(`${file}: SKIPPED (could not process: ${err.message.split("\n")[0]})`);
    continue;
  }

  // Only overwrite if we actually saved space.
  if (output.length < before) {
    await writeFile(full, output);
    totalBefore += before;
    totalAfter += output.length;
    console.log(`${file}: ${fmt(before)} -> ${fmt(output.length)}`);
  } else {
    console.log(`${file}: kept original (${fmt(before)}, re-encode was larger)`);
  }
}

console.log("\n----------------------------------------");
console.log(`Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)}`);
if (totalBefore > 0) {
  console.log(`Saved ${fmt(totalBefore - totalAfter)} (${(100 * (1 - totalAfter / totalBefore)).toFixed(1)}% smaller)`);
}
