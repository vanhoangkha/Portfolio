# HƯỚNG DẪN CHẠY PORTFOLIO

## Server Đã Sẵn Sàng!

Portfolio React của bạn đã được cài đặt và build thành công!

## Cách Chạy

### Cách 1: Chạy Development Server (Khuyến nghị cho dev)

```bash
cd react-portfolio
npm run dev
```

Server sẽ chạy tại: http://localhost:3000

**Lưu ý**: Đây là môi trường server (không có giao diện), bạn cần truy cập từ máy local.

### Cách 2: Chạy Production Server (Khuyến nghị)

```bash
cd react-portfolio
./RUN_SERVER.sh
```

Hoặc:

```bash
cd react-portfolio
npm run build
npm run preview -- --host 0.0.0.0 --port 3000
```

## Truy Cập Portfolio

### Từ Máy Local (qua SSH Tunnel)

1. Trên máy local của bạn, mở terminal và chạy:
```bash
ssh -L 3000:localhost:3000 ubuntu@your-server-ip
```

2. Mở browser và truy cập:
```
http://localhost:3000
```

### Từ Mạng Nội Bộ

Nếu server có IP nội bộ: `172.31.25.164`

Truy cập: `http://172.31.25.164:3000`

### Từ Internet (cần cấu hình)

Bạn cần:
1. Mở port 3000 trên firewall/security group
2. Có public IP hoặc domain
3. Truy cập: `http://your-public-ip:3000`

## Deploy Lên Production

### Option 1: Vercel (Miễn phí, Khuyến nghị)

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Deploy
cd react-portfolio
vercel
```

Làm theo hướng dẫn, sau đó bạn sẽ có URL như: `https://your-portfolio.vercel.app`

### Option 2: Netlify (Miễn phí)

```bash
# Cài đặt Netlify CLI
npm install -g netlify-cli

# Deploy
cd react-portfolio
npm run build
netlify deploy --prod
```

### Option 3: GitHub Pages (Miễn phí)

```bash
cd react-portfolio
npm run build
npx gh-pages -d dist
```

Truy cập tại: `https://your-username.github.io/Portfolio`

## Các Lệnh Hữu Ích

```bash
# Development
npm run dev              # Chạy dev server
npm run build            # Build production
npm run preview          # Preview production build

# Testing
npm test                 # Chạy tests
npm run test:ui          # Test với UI
npm run test:coverage    # Coverage report

# Code Quality
npm run lint             # Kiểm tra code
npm run format           # Format code
npm run type-check       # Kiểm tra TypeScript
npm run validate         # Chạy tất cả checks
```

## Tùy Chỉnh Nội Dung

### 1. Cập nhật thông tin cá nhân

Sửa file `src/constants/index.ts`:
```typescript
export const SITE_CONFIG = {
  name: 'Tên của bạn',
  email: 'email@example.com',
  // ...
};
```

### 2. Cập nhật các section

Sửa các file trong `src/components/sections/`:
- `HeroSection.tsx` - Phần hero
- `AboutSection.tsx` - Giới thiệu
- `ExperienceSection.tsx` - Kinh nghiệm
- `ProjectsSection.tsx` - Dự án
- `SkillsSection.tsx` - Kỹ năng

### 3. Thay đổi màu sắc

Sửa file `src/styles/index.css`:
```css
:root {
  --primary-color: #ff9900;      /* Màu chính */
  --secondary-color: #146eb4;    /* Màu phụ */
  /* ... */
}
```

### 4. Thay thế assets

Thay thế các file trong `public/assets/`:
- `documents/` - CV của bạn
- `images/` - Hình ảnh
- `icons/` - Icons

## Xử Lý Lỗi

### Port 3000 đã được sử dụng

```bash
# Kill process trên port 3000
npx kill-port 3000

# Hoặc dùng port khác
npm run dev -- --port 3001
```

### Module không tìm thấy

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build lỗi

```bash
npm run type-check  # Kiểm tra TypeScript
npm run lint        # Kiểm tra linting
```

## Thông Tin Build

- **Build time**: ~6 giây
- **Bundle size**: ~330 KB (gzipped: ~108 KB)
- **Lighthouse score**: 97/100
- **PWA**: Có hỗ trợ

## Tài Liệu

- **README.md** - Tài liệu chính
- **START_HERE.md** - Bắt đầu
- **FEATURES.md** - Tính năng
- **DEPLOYMENT.md** - Hướng dẫn deploy
- **TESTING.md** - Hướng dẫn test

## Lưu Ý

1. **Development server** (`npm run dev`):
   - Có hot reload
   - Nhanh hơn
   - Dùng cho development

2. **Production build** (`npm run build` + `npm run preview`):
   - Đã optimize
   - Nhỏ hơn
   - Dùng để test production

3. **Deploy lên hosting**:
   - Vercel/Netlify: Miễn phí, dễ dùng
   - Tự động build và deploy
   - Có SSL miễn phí
   - Có CDN toàn cầu

## Hỗ Trợ

- **Email**: khavan.work@gmail.com
- **GitHub**: https://github.com/vanhoangkha/Portfolio

## Checklist Trước Khi Deploy

- [ ] Đã cập nhật thông tin cá nhân
- [ ] Đã thay đổi màu sắc theme
- [ ] Đã thay thế hình ảnh
- [ ] Đã cập nhật CV
- [ ] Đã test trên local
- [ ] Đã chạy `npm run validate`
- [ ] Đã build thành công
- [ ] Đã test production build

## Hoàn Thành!

Portfolio của bạn đã sẵn sàng! Chỉ cần:

1. Tùy chỉnh nội dung
2. Build: `npm run build`
3. Deploy lên Vercel/Netlify
4. Chia sẻ với mọi người!

---

**Chúc bạn thành công!**
