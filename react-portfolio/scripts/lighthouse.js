#!/usr/bin/env node

/**
 * Lighthouse Audit Script
 * Runs Lighthouse audits and generates reports
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

const PORT = process.env.PORT || 4173;
const URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = join(process.cwd(), 'lighthouse-reports');

// Create output directory
mkdirSync(OUTPUT_DIR, { recursive: true });

console.log('Running Lighthouse audit...');
console.log(`URL: ${URL}`);
console.log(`Output: ${OUTPUT_DIR}\n`);

(async () => {
  try {
    // Run Lighthouse
    const command = `npx lighthouse ${URL} --output=html,json --output-path=${join(OUTPUT_DIR, 'report')} --chrome-flags="--headless --no-sandbox" --quiet`;
    
    execSync(command, { stdio: 'inherit' });
    
    // Read and parse JSON report
    const reportPath = join(OUTPUT_DIR, 'report.report.json');
    
    if (!existsSync(reportPath)) {
      console.error('Lighthouse report not found. Make sure the preview server is running.');
      process.exit(1);
    }
    
    const reportData = JSON.parse(await readFile(reportPath, 'utf-8'));
  
  // Extract scores
  const scores = {
    performance: Math.round(reportData.categories.performance.score * 100),
    accessibility: Math.round(reportData.categories.accessibility.score * 100),
    'best-practices': Math.round(reportData.categories['best-practices'].score * 100),
    seo: Math.round(reportData.categories.seo.score * 100),
  };
  
  // Extract Core Web Vitals
  const metrics = {
    fcp: reportData.audits['first-contentful-paint']?.numericValue || 0,
    lcp: reportData.audits['largest-contentful-paint']?.numericValue || 0,
    cls: reportData.audits['cumulative-layout-shift']?.numericValue || 0,
    tti: reportData.audits['interactive']?.numericValue || 0,
    speedIndex: reportData.audits['speed-index']?.numericValue || 0,
    tbt: reportData.audits['total-blocking-time']?.numericValue || 0,
  };
  
  // Generate summary
  const summary = {
    timestamp: new Date().toISOString(),
    url: URL,
    scores,
    metrics,
    passed: Object.values(scores).every(score => score >= 95),
  };
  
  // Write summary
  writeFileSync(
    join(OUTPUT_DIR, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  // Print results
  console.log('\nLighthouse Results:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Performance:      ${scores.performance}/100 ${scores.performance >= 95 ? '✅' : '❌'}`);
  console.log(`Accessibility:    ${scores.accessibility}/100 ${scores.accessibility >= 95 ? '✅' : '❌'}`);
  console.log(`Best Practices:   ${scores['best-practices']}/100 ${scores['best-practices'] >= 95 ? '✅' : '❌'}`);
  console.log(`SEO:              ${scores.seo}/100 ${scores.seo >= 95 ? '✅' : '❌'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\nCore Web Vitals:');
  console.log(`FCP:  ${metrics.fcp.toFixed(0)}ms ${metrics.fcp <= 1800 ? '✅' : '❌'}`);
  console.log(`LCP:  ${metrics.lcp.toFixed(0)}ms ${metrics.lcp <= 2500 ? '✅' : '❌'}`);
  console.log(`CLS:  ${metrics.cls.toFixed(3)} ${metrics.cls <= 0.1 ? '✅' : '❌'}`);
  console.log(`TTI:  ${metrics.tti.toFixed(0)}ms ${metrics.tti <= 2500 ? '✅' : '❌'}`);
  console.log(`SI:   ${metrics.speedIndex.toFixed(0)} ${metrics.speedIndex <= 3400 ? '✅' : '❌'}`);
  console.log(`TBT:  ${metrics.tbt.toFixed(0)}ms ${metrics.tbt <= 200 ? '✅' : '❌'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
    if (summary.passed) {
      console.log('All scores meet the 95+ target!');
      process.exit(0);
    } else {
      console.log('Some scores are below 95. Check the report for details.');
      console.log(`Full report: ${join(OUTPUT_DIR, 'report.report.html')}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Lighthouse audit failed:', error.message);
    process.exit(1);
  }
})();

