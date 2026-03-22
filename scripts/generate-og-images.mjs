#!/usr/bin/env node
/**
 * OG Image Generator for gauravkhurana.com
 *
 * Generates branded 1200x630 Open Graph images for all docs and blog pages,
 * and updates MDX frontmatter to reference them.
 *
 * Usage:
 *   node scripts/generate-og-images.mjs           # Generate missing images only
 *   node scripts/generate-og-images.mjs --force    # Regenerate all images
 *   node scripts/generate-og-images.mjs --dry-run  # Preview without changes
 *
 * Images are generated as PNG files in static/img/og/ and should be committed
 * to the repository so they're available as static assets at build time.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const BLOG_DIR = path.join(ROOT, 'blog');
const OG_DIR = path.join(ROOT, 'static', 'img', 'og');

const force = process.argv.includes('--force');
const dryRun = process.argv.includes('--dry-run');

// Gradient color schemes per category
const categoryColors = {
  'AI':               ['#667eea', '#764ba2'],
  'API':              ['#11998e', '#38ef7d'],
  'Automation':       ['#F2994A', '#F2C94C'],
  'Testing':          ['#2193b0', '#6dd5ed'],
  'AzureDevOps':      ['#0078d4', '#00bcf2'],
  'Git':              ['#f05033', '#f14e32'],
  'Tools':            ['#8E2DE2', '#4A00E0'],
  'IndustryInsights': ['#1a2a6c', '#b21f1f'],
  'self-mastery':     ['#C6426E', '#642B73'],
  'FreeCourses':      ['#00b09b', '#96c93d'],
  'Topmate':          ['#fc5c7d', '#6a82fb'],
  'blog':             ['#25c2a0', '#43e97b'],
  'default':          ['#4facfe', '#00f2fe'],
};

// Human-readable category labels for the badge
const categoryLabels = {
  'AI':               'AI & Machine Learning',
  'API':              'API Testing',
  'Automation':       'Test Automation',
  'Testing':          'Software Testing',
  'AzureDevOps':      'Azure DevOps',
  'Git':              'Git & GitHub',
  'Tools':            'Developer Tools',
  'IndustryInsights': 'Industry Insights',
  'self-mastery':     'Self Mastery',
  'FreeCourses':      'Free Courses',
  'Topmate':          'Mentoring',
  'blog':             'Blog',
};

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars = 28) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, 4); // Max 4 lines
}

function createOgSvg(title, category) {
  const colors = categoryColors[category] || categoryColors.default;
  const label = categoryLabels[category] || category;
  const lines = wrapText(title);

  const fontSize = lines.length > 3 ? 38 : lines.length > 2 ? 44 : lines.length > 1 ? 50 : 56;
  const lineHeight = fontSize * 1.35;
  const totalTextHeight = lines.length * lineHeight;
  const startY = 300 - totalTextHeight / 2 + fontSize;

  const titleElements = lines.map((line, i) =>
    `<text x="600" y="${Math.round(startY + i * lineHeight)}" ` +
    `font-size="${fontSize}" font-weight="bold" fill="white" text-anchor="middle" ` +
    `font-family="Arial, Helvetica, sans-serif">${escapeXml(line)}</text>`
  ).join('\n    ');

  const badgeWidth = Math.max(label.length * 13 + 40, 120);
  const decoY = Math.round(startY + lines.length * lineHeight + 25);

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Content card -->
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="rgba(0,0,0,0.12)"/>

  <!-- Category badge -->
  <rect x="60" y="65" width="${badgeWidth}" height="42" rx="21" fill="rgba(255,255,255,0.2)"/>
  <text x="${60 + badgeWidth / 2}" y="93" font-size="18" fill="white" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="600">${escapeXml(label)}</text>

  <!-- Title -->
  <g>
    ${titleElements}
  </g>

  <!-- Decorative line -->
  <rect x="500" y="${decoY}" width="200" height="3" rx="2" fill="rgba(255,255,255,0.4)"/>

  <!-- Bottom bar -->
  <line x1="60" y1="525" x2="1140" y2="525" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="80" y="562" font-size="24" fill="rgba(255,255,255,0.9)" font-family="Arial, Helvetica, sans-serif" font-weight="600">gauravkhurana.com</text>
  <text x="1120" y="562" font-size="17" fill="rgba(255,255,255,0.6)" text-anchor="end" font-family="Arial, Helvetica, sans-serif">Testing &amp; Automation Practitioner</text>
</svg>`;
}

function extractTitle(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (match) {
    const fm = match[1];
    const titleMatch = fm.match(/^title\s*:\s*["']?(.*?)["']?\s*$/m);
    if (titleMatch) return titleMatch[1];
  }
  // Fallback: use first # heading
  const headingMatch = content.match(/^#\s+(.+)$/m);
  return headingMatch ? headingMatch[1].replace(/[^\w\s&:,.-]/g, '').trim() : null;
}

function hasImageField(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return false; // No frontmatter = needs one
  return /^image\s*:/m.test(match[1]);
}

function getFrontmatterBlock(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[0] : null;
}

function addImageToFrontmatter(content, imageRef) {
  const block = getFrontmatterBlock(content);
  if (!block) {
    // No frontmatter exists — add one at the top
    return `---\nimage: ${imageRef}\n---\n\n${content}`;
  }

  // Insert image field before the closing ---
  const closingIdx = block.lastIndexOf('---');
  const beforeClosing = block.slice(0, closingIdx);
  const separator = beforeClosing.endsWith('\n') ? '' : '\n';
  const newBlock = beforeClosing + separator + `image: ${imageRef}\n---`;

  return newBlock + content.slice(block.length);
}

function getSlug(filePath, baseDir) {
  let relative = path.relative(baseDir, filePath).replace(/\\/g, '/');
  relative = relative.replace(/\.mdx$/, '');
  relative = relative.replace(/\/README$/, '');
  // Remove date prefix from blog filenames (e.g., 2025-07-08-)
  if (baseDir === BLOG_DIR) {
    relative = relative.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  }
  return relative.toLowerCase().replace(/\//g, '-').replace(/[^a-z0-9-]/g, '');
}

function getCategory(filePath) {
  const relative = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
  const parts = relative.split('/');
  return parts.length > 1 ? parts[0] : 'default';
}

function findMdxFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.mdx')) files.push(full);
    }
  }
  walk(dir);
  return files;
}

async function processFile(file, baseDir, category) {
  const content = fs.readFileSync(file, 'utf-8');
  const title = extractTitle(content);
  const relPath = path.relative(ROOT, file);

  if (!title) {
    console.log(`  skip  (no title)     ${relPath}`);
    return { generated: 0, updated: 0, skipped: 1 };
  }

  const prefix = baseDir === BLOG_DIR ? 'blog-' : '';
  const slug = getSlug(file, baseDir);
  const imageName = `${prefix}${slug}-og.png`;
  const imagePath = path.join(OG_DIR, imageName);
  const imageRef = `/img/og/${imageName}`;

  let generated = 0, updated = 0, skipped = 0;

  // Generate image
  if (!fs.existsSync(imagePath) || force) {
    if (!dryRun) {
      const svg = createOgSvg(title, category);
      await sharp(Buffer.from(svg)).png().toFile(imagePath);
    }
    console.log(`  image ${dryRun ? '(dry)' : '     '} ${imageName}`);
    generated++;
  }

  // Update frontmatter
  if (!hasImageField(content)) {
    if (!dryRun) {
      const newContent = addImageToFrontmatter(content, imageRef);
      fs.writeFileSync(file, newContent, 'utf-8');
    }
    console.log(`  front ${dryRun ? '(dry)' : '     '} ${relPath}`);
    updated++;
  } else {
    skipped++;
  }

  return { generated, updated, skipped };
}

async function main() {
  console.log(`\nOG Image Generator${dryRun ? ' (DRY RUN)' : ''}${force ? ' (FORCE)' : ''}\n`);

  if (!dryRun) {
    fs.mkdirSync(OG_DIR, { recursive: true });
  }

  const docFiles = findMdxFiles(DOCS_DIR);
  const blogFiles = findMdxFiles(BLOG_DIR);

  let totalGen = 0, totalUpd = 0, totalSkip = 0;

  console.log(`Processing ${docFiles.length} doc files...`);
  for (const file of docFiles) {
    const category = getCategory(file);
    const { generated, updated, skipped } = await processFile(file, DOCS_DIR, category);
    totalGen += generated;
    totalUpd += updated;
    totalSkip += skipped;
  }

  console.log(`\nProcessing ${blogFiles.length} blog files...`);
  for (const file of blogFiles) {
    const { generated, updated, skipped } = await processFile(file, BLOG_DIR, 'blog');
    totalGen += generated;
    totalUpd += updated;
    totalSkip += skipped;
  }

  console.log(`\nDone! Images: ${totalGen} generated | Frontmatter: ${totalUpd} updated | ${totalSkip} skipped`);
  if (dryRun) console.log('(No files were modified - dry run)\n');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
