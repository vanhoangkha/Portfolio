#!/usr/bin/env node

/**
 * Generate PWA icons from SVG source
 * Requires: sharp (npm install sharp)
 *
 * Usage: node generate-icons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if sharp is installed
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (error) {
  console.error('❌ Error: sharp is not installed');
  console.log('📦 Installing sharp...');
  execSync('npm install sharp', { stdio: 'inherit' });
  sharp = (await import('sharp')).default;
}

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'badge-72.png', size: 72 },
  { name: 'icon-blog.png', size: 96 },
  { name: 'icon-resume.png', size: 96 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'apple-touch-icon.png', size: 180 },
];

const screenshots = [
  { name: 'screenshot1.png', width: 540, height: 720 },
  { name: 'screenshot2.png', width: 1280, height: 720 },
];

const inputSvg = path.join(__dirname, 'frontend', 'icon.svg');
const outputDir = path.join(__dirname, 'frontend');

async function generateIcons() {
  console.log('🎨 Generating PWA icons from SVG...\n');

  // Check if SVG exists
  if (!fs.existsSync(inputSvg)) {
    console.error(`❌ SVG file not found: ${inputSvg}`);
    process.exit(1);
  }

  // Generate icons
  for (const { name, size } of sizes) {
    const outputPath = path.join(outputDir, name);

    try {
      await sharp(inputSvg)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 153, b: 0, alpha: 1 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated: ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }

  // Generate placeholder screenshots
  console.log('\n📸 Generating placeholder screenshots...\n');

  for (const { name, width, height } of screenshots) {
    const outputPath = path.join(outputDir, name);

    try {
      // Create a gradient background screenshot placeholder
      const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FF9900;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#146EB4;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#grad)"/>
          <text x="50%" y="50%" font-family="Arial" font-size="48" font-weight="bold"
                text-anchor="middle" dominant-baseline="middle" fill="white">
            KVH Portfolio
          </text>
        </svg>
      `;

      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated: ${name} (${width}x${height})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }

  // Generate favicon.ico (multi-resolution)
  console.log('\n🔖 Generating favicon.ico...\n');

  try {
    const favicon32 = await sharp(inputSvg)
      .resize(32, 32)
      .png()
      .toBuffer();

    // For proper .ico, we'd need a library like 'png-to-ico'
    // For now, just copy the 32x32 PNG as favicon
    const faviconPath = path.join(outputDir, 'favicon.ico');
    await sharp(inputSvg)
      .resize(32, 32)
      .png()
      .toFile(faviconPath);

    console.log('✅ Generated: favicon.ico (32x32)');
  } catch (error) {
    console.error('❌ Failed to generate favicon.ico:', error.message);
  }

  console.log('\n🎉 All icons generated successfully!');
  console.log('📁 Output directory:', outputDir);
}

// Run
generateIcons().catch(error => {
  console.error('❌ Error generating icons:', error);
  process.exit(1);
});
