#!/usr/bin/env node

/**
 * Generate sitemap.xml for portfolio
 *
 * Usage: node generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://master.dzecmyr42457.amplifyapp.com';
const OUTPUT_PATH = path.join(__dirname, 'frontend', 'sitemap.xml');

// Static pages
const staticPages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/index.html', changefreq: 'weekly', priority: 1.0 },
  { url: '/blog.html', changefreq: 'daily', priority: 0.9 },
  { url: '/resume.html', changefreq: 'monthly', priority: 0.8 },
];

// Get current date in ISO format
const getCurrentDate = () => new Date().toISOString().split('T')[0];

// Generate XML
const generateSitemap = () => {
  const urls = staticPages.map(page => `
  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;

  return xml;
};

// Write sitemap
const writeSitemap = () => {
  try {
    const xml = generateSitemap();
    fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
    console.log('✅ Sitemap generated successfully!');
    console.log('📁 Output:', OUTPUT_PATH);
    console.log('📝 Pages included:', staticPages.length);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

writeSitemap();
