# Deployment Guide

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deployment Options

### 1. Vercel (Recommended)

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vanhoangkha/Portfolio)

**Manual Deploy:**
```bash
npm install -g vercel
vercel
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2. Netlify

**One-Click Deploy:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/vanhoangkha/Portfolio)

**Manual Deploy:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Configuration:**
- Build Command: `npm run build`
- Publish Directory: `dist`

### 3. GitHub Pages

**Automatic Deployment:**
The `.github/workflows/deploy.yml` file is configured for automatic deployment.

**Steps:**
1. Push to `main` branch
2. GitHub Actions will build and deploy automatically
3. Enable GitHub Pages in repository settings
4. Set source to "GitHub Actions"

**Manual Deploy:**
```bash
npm run build
npx gh-pages -d dist
```

### 4. AWS Amplify

**Configuration:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd react-portfolio
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: react-portfolio/dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 5. Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and Run:**
```bash
docker build -t portfolio .
docker run -p 80:80 portfolio
```

## Environment Variables

Create `.env.production` file:

```env
VITE_APP_NAME=Portfolio
VITE_API_URL=https://api.example.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Performance Optimization

### Before Deployment:

1. **Optimize Images:**
   ```bash
   npm install -g sharp-cli
   sharp -i ./public/assets/images/*.jpg -o ./public/assets/images/ -f webp
   ```

2. **Analyze Bundle:**
   ```bash
   npm run build
   npx vite-bundle-visualizer
   ```

3. **Run Lighthouse:**
   ```bash
   npm run preview
   npx lighthouse http://localhost:3000 --view
   ```

## Post-Deployment Checklist

- [ ] Test all pages and links
- [ ] Verify mobile responsiveness
- [ ] Check PWA functionality
- [ ] Test dark/light theme
- [ ] Verify analytics tracking
- [ ] Check SEO meta tags
- [ ] Test form submissions
- [ ] Verify social media previews
- [ ] Check performance scores
- [ ] Test on different browsers

## Custom Domain

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

### GitHub Pages:
1. Add `CNAME` file to `public` folder with your domain
2. Configure DNS with your provider

## SSL/HTTPS

All recommended platforms provide free SSL certificates automatically.

## Monitoring

### Setup Analytics:
1. Add Google Analytics ID to `.env`
2. Implement tracking in `src/utils/analytics.ts`

### Error Tracking:
Consider integrating:
- Sentry
- LogRocket
- Rollbar

## Rollback

If deployment fails:

**Vercel:**
```bash
vercel rollback
```

**Netlify:**
Use the Netlify dashboard to rollback to previous deployment

**GitHub Pages:**
Revert the commit and push

## Support

For deployment issues, contact: khavan.work@gmail.com
