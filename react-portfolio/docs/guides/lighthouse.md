# Lighthouse Performance Auditing

This project includes Lighthouse CI for automated performance auditing and monitoring.

## Quick Start

### Run Lighthouse Audit

```bash
# Build and run audit (recommended)
./scripts/run-lighthouse.sh

# Or manually:
npm run build
npm run preview &
npm run lighthouse
```

### Run Lighthouse CI

```bash
npm run lighthouse:ci
```

### Mobile Performance Audit

```bash
npm run lighthouse:mobile
```

## Configuration

Lighthouse CI is configured in `.lighthouserc.js` with the following targets:

### Score Targets
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Core Web Vitals Targets
- **FCP** (First Contentful Paint): <1800ms
- **LCP** (Largest Contentful Paint): <2500ms
- **CLS** (Cumulative Layout Shift): <0.1
- **TTI** (Time to Interactive): <2500ms
- **Speed Index**: <3400
- **TBT** (Total Blocking Time): <200ms

### Resource Size Warnings
- **JavaScript**: <300KB
- **CSS**: <100KB
- **Images**: <500KB

## Reports

Lighthouse reports are saved in `lighthouse-reports/`:
- `report.report.html` - Full HTML report
- `report.report.json` - JSON data
- `summary.json` - Score summary

## CI/CD Integration

Lighthouse CI runs automatically in GitHub Actions. The configuration enforces:
- Minimum scores of 95 for all categories
- Core Web Vitals thresholds
- Resource size limits

## Troubleshooting

### Server Not Starting
Make sure port 4173 is available:
```bash
lsof -ti:4173 | xargs kill -9
```

### Low Performance Scores
1. Check bundle size: `npm run build:analyze`
2. Optimize images: Use WebP format
3. Enable code splitting: Already configured
4. Check Core Web Vitals: Review Web Vitals tracking

### Mobile Performance Issues
1. Test with mobile preset: `npm run lighthouse:mobile`
2. Check responsive images
3. Verify touch targets are 44x44px minimum
4. Test on real devices

## Best Practices

1. **Run audits before deploying** - Catch performance regressions early
2. **Monitor Core Web Vitals** - Track real user metrics
3. **Optimize images** - Use WebP, lazy loading, responsive sizes
4. **Code splitting** - Already configured in `vite.config.ts`
5. **Resource hints** - Preconnect, prefetch, preload critical resources

## Performance Budget

The project enforces a performance budget:
- Initial bundle: <300KB (gzipped)
- Total JavaScript: <500KB
- Total CSS: <100KB
- Images per page: <500KB

These limits help maintain fast load times and good user experience.

