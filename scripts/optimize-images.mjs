/**
 * Site-wide image optimization script
 * Recursively finds all JPEG/PNG images under docs/, static/img/, and img/
 * and creates optimized WebP versions in-place (same directory, -optimized.webp suffix).
 * Original files are kept as fallbacks.
 *
 * Usage:  node scripts/optimize-images.mjs [--dry-run]
 */
import sharp from 'sharp';
import { resolve, dirname, basename, extname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdir, stat } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

// Max width to resize to (images wider than this get shrunk; smaller ones keep original width)
const MAX_WIDTH = 800;
// Quality for WebP output
const WEBP_QUALITY = 80;

// Directories to scan
const SCAN_DIRS = [
  resolve(ROOT, 'docs'),
  resolve(ROOT, 'static', 'img'),
  resolve(ROOT, 'img'),
];

// Extensions to process
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png']);

/**
 * Recursively walk a directory and yield file paths
 */
async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // directory doesn't exist, skip
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

let totalOriginalKB = 0;
let totalOptimizedKB = 0;
let processed = 0;
let skipped = 0;
let failed = 0;

for (const scanDir of SCAN_DIRS) {
  for await (const filePath of walk(scanDir)) {
    const ext = extname(filePath).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) continue;

    // Skip files that are already optimized
    const name = basename(filePath, ext);
    if (name.endsWith('-optimized')) {
      skipped++;
      continue;
    }

    const outputPath = join(dirname(filePath), `${name}-optimized.webp`);

    // Check if optimized version already exists and is newer than source
    try {
      const [srcStat, outStat] = await Promise.all([
        stat(filePath),
        stat(outputPath).catch(() => null),
      ]);
      if (outStat && outStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++;
        continue; // already up to date
      }
    } catch {
      // proceed with optimization
    }

    if (DRY_RUN) {
      const srcSize = (await stat(filePath)).size;
      console.log(`[dry-run] Would optimize: ${filePath} (${(srcSize / 1024).toFixed(1)} KB)`);
      processed++;
      continue;
    }

    try {
      const srcSize = (await stat(filePath)).size;
      const srcKB = srcSize / 1024;
      totalOriginalKB += srcKB;

      const pipeline = sharp(filePath);
      const metadata = await pipeline.metadata();

      // Resize only if wider than MAX_WIDTH
      const resizeWidth = metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined;

      const info = await sharp(filePath)
        .resize(resizeWidth)
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const outKB = info.size / 1024;
      totalOptimizedKB += outKB;
      processed++;

      const savings = ((1 - outKB / srcKB) * 100).toFixed(0);
      console.log(
        `  ${srcKB.toFixed(1)} KB -> ${outKB.toFixed(1)} KB  (${savings}% smaller)  ${filePath}`
      );
    } catch (err) {
      failed++;
      console.error(`  FAIL  ${filePath}: ${err.message}`);
    }
  }
}

console.log('\n--- Summary ---');
console.log(`Processed: ${processed}`);
console.log(`Skipped (already optimized / up-to-date): ${skipped}`);
console.log(`Failed: ${failed}`);
if (!DRY_RUN && processed > 0) {
  const savedMB = ((totalOriginalKB - totalOptimizedKB) / 1024).toFixed(2);
  const pct = ((1 - totalOptimizedKB / totalOriginalKB) * 100).toFixed(0);
  console.log(`Original total: ${(totalOriginalKB / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalOptimizedKB / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${savedMB} MB (${pct}% reduction)`);
}
console.log('Done!');
