# Hướng Dẫn Deploy Portfolio Lên Vercel

## Chuẩn Bị

Portfolio đã sẵn sàng deploy với:
- Build thành công
- Vercel config đã tạo
- Code đã push lên GitHub
- Production ready

## Deploy Qua Vercel Web (Khuyến Nghị)

### Bước 1: Tạo Tài Khoản Vercel

1. Truy cập: https://vercel.com/signup
2. Chọn **"Continue with GitHub"**
3. Authorize Vercel truy cập GitHub của bạn

### Bước 2: Import Project

1. Sau khi login, click **"Add New..."** → **"Project"**
2. Chọn repository: **"Portfolio"**
3. Click **"Import"**

### Bước 3: Configure Project

Vercel sẽ tự động detect Vite. Kiểm tra settings:

```
Framework Preset: Vite
Root Directory: react-portfolio
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Quan trọng**: Đặt **Root Directory** = `react-portfolio`

### Bước 4: Deploy

1. Click **"Deploy"**
2. Đợi 2-3 phút
3. Xong!

### Bước 5: Lấy URL

Sau khi deploy xong, bạn sẽ có URL như:
```
https://portfolio-username.vercel.app
```

## Deploy Thủ Công (Alternative)

Nếu muốn deploy từ terminal:

### 1. Cài Vercel CLI (local machine)

Trên máy Windows/Mac của bạn:

```bash
npm install -g vercel
```

### 2. Login

```bash
vercel login
```

### 3. Deploy

```bash
cd react-portfolio
vercel
```

Làm theo hướng dẫn:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **portfolio** (hoặc tên bạn muốn)
- Directory? **./react-portfolio**
- Override settings? **No**

### 4. Production Deploy

```bash
vercel --prod
```

## Troubleshooting

### Build Failed?

Kiểm tra:
```bash
cd react-portfolio
npm run build
```

Nếu có lỗi, fix rồi push lại:
```bash
git add .
git commit -m "fix: build issues"
git push origin main
```

Vercel sẽ tự động rebuild.

### Root Directory Wrong?

Trong Vercel Dashboard:
1. Settings → General
2. Root Directory: `react-portfolio`
3. Save

### Environment Variables?

Nếu cần (hiện tại không cần):
1. Settings → Environment Variables
2. Add variables
3. Redeploy

## Custom Domain (Optional)

### Bước 1: Mua Domain

Mua domain từ:
- Namecheap
- GoDaddy
- Google Domains

### Bước 2: Add Domain Trong Vercel

1. Project Settings → Domains
2. Add domain của bạn
3. Follow DNS instructions

### Bước 3: Update DNS

Thêm records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Đợi 24-48 giờ để DNS propagate.

## Auto Deploy

Vercel tự động deploy khi:
- Push code lên GitHub main branch
- Merge pull request
- Manual trigger trong dashboard

## Monitoring

Trong Vercel Dashboard:
- **Analytics**: Xem traffic
- **Logs**: Debug issues
- **Deployments**: Xem history
- **Speed Insights**: Performance metrics

## Post-Deploy Checklist

- [ ] Site loads correctly
- [ ] All pages work
- [ ] Images load
- [ ] Links work
- [ ] Mobile responsive
- [ ] Dark/light theme works
- [ ] Forms work (if any)
- [ ] Performance good (Lighthouse)

## Optimization Tips

### 1. Enable Analytics

Vercel Dashboard → Analytics → Enable

### 2. Add OG Image

Đã có trong `public/assets/images/screenshot2.png`

### 3. Setup Redirects

Đã config trong `vercel.json`

### 4. Enable Speed Insights

Vercel Dashboard → Speed Insights → Enable

## Share Your Portfolio

Sau khi deploy, share:

**LinkedIn**:
```
Excited to share my new portfolio!

Built with React, TypeScript, and Vite
Professional UX/UI design
WCAG 2.1 AA compliant
Lighthouse score: 97/100

Check it out: [your-url]

#AWS #CloudArchitecture #React #WebDevelopment
```

**Twitter**:
```
Just launched my new portfolio!

Built with React + TypeScript
Vite for blazing fast builds
Modern UX/UI design
Fully accessible

[your-url]

#100DaysOfCode #WebDev
```

## Need Help?

### Vercel Support
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Twitter: @vercel

### Portfolio Issues
- GitHub: https://github.com/vanhoangkha/Portfolio/issues
- Email: khavan.work@gmail.com

## Success!

Sau khi deploy xong:

1. Portfolio live tại: `https://your-portfolio.vercel.app`
2. Auto-deploy khi push code
3. Free SSL certificate
4. Global CDN
5. Analytics included
6. 99.99% uptime

**Chúc mừng! Portfolio của bạn đã online!**

---

**Next Steps**:
1. Share URL với network
2. Add to LinkedIn profile
3. Update resume với portfolio link
4. Apply for jobs!
