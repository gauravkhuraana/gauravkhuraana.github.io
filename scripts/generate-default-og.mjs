#!/usr/bin/env node
// Generates the branded default social card (1200x630) used as themeConfig.image.
// Run: node scripts/generate-default-og.mjs

import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'static', 'img', 'og', 'default-og.png');

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#25c2a0;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#1a2a6c;stop-opacity:1"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="rgba(0,0,0,0.12)"/>

  <text x="600" y="250" font-size="64" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">gauravkhurana.com</text>
  <text x="600" y="330" font-size="36" fill="rgba(255,255,255,0.95)" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">Testing · Automation · AI</text>
  <text x="600" y="395" font-size="26" fill="rgba(255,255,255,0.75)" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">Tutorials, videos &amp; career guidance for QA professionals</text>

  <rect x="500" y="430" width="200" height="3" rx="2" fill="rgba(255,255,255,0.4)"/>

  <line x1="60" y1="525" x2="1140" y2="525" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="80" y="562" font-size="24" fill="rgba(255,255,255,0.9)" font-family="Arial, Helvetica, sans-serif" font-weight="600">Sharing is Caring</text>
  <text x="1120" y="562" font-size="17" fill="rgba(255,255,255,0.6)" text-anchor="end" font-family="Arial, Helvetica, sans-serif">Testing &amp; Automation Practitioner</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`Written ${OUT}`);
