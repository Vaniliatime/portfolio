/**
 * Shrinks source images in public/images into web-sized WebP.
 *
 * `output: "export"` disables the Next image optimizer, so whatever sits in
 * public/ is what visitors download. Run this after adding new screenshots:
 *
 *   node scripts/optimize-images.mjs
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const MAX_WIDTH = 1600;
const QUALITY = 82;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let converted = 0;
let savedBytes = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const target = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const before = (await stat(file)).size;

  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(target);

  const after = (await stat(target)).size;
  converted += 1;
  savedBytes += before - after;

  const rel = path.relative(ROOT, file);
  console.log(
    `${rel} → ${path.basename(target)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
  );
}

console.log(`\n${converted} images, ${(savedBytes / 1024 / 1024).toFixed(2)} MB saved.`);
