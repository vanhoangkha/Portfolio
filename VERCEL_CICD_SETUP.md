# Vercel CI/CD Setup Guide

## 🔧 Cấu hình GitLab CI/CD với Vercel

### Bước 1: Lấy Vercel Token

1. Đăng nhập https://vercel.com
2. Vào **Settings** → **Tokens**
3. Tạo token mới với tên `GitLab CI/CD`
4. Copy token (chỉ hiện 1 lần)

### Bước 2: Lấy Vercel Project Info

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
cd /home/ubuntu/projects/production/Portfolio
vercel link

# Lấy thông tin project
cat .vercel/project.json
```

Bạn sẽ thấy:
```json
{
  "projectId": "prj_xxxxx",
  "orgId": "team_xxxxx"
}
```

### Bước 3: Thêm CI/CD Variables vào GitLab

Vào: https://gitlab.com/awsfirstcloudaijourney/Portfolio/-/settings/ci_cd

Thêm các variables:

| Key | Value | Protected | Masked |
|-----|-------|-----------|--------|
| `VERCEL_TOKEN` | Token từ bước 1 | ✅ | ✅ |
| `VERCEL_ORG_ID` | orgId từ bước 2 | ✅ | ❌ |
| `VERCEL_PROJECT_ID` | projectId từ bước 2 | ✅ | ❌ |

### Bước 4: Tạo vercel.json (đã có)

File `vercel.json` đã được tạo với cấu hình tối ưu.

### Bước 5: Push code

```bash
git add .
git commit -m "feat: setup Vercel CI/CD"
git push gitlab main
```

## 🚀 Workflow

### Khi tạo Merge Request:
- ✅ Run tests
- ✅ Build project
- ✅ Deploy preview lên Vercel
- 📝 Comment preview URL vào MR

### Khi merge vào main:
- ✅ Run tests
- ✅ Build project
- ✅ Deploy production lên Vercel
- 🌐 Update production URL

## 📊 Monitoring

- **GitLab Pipelines**: https://gitlab.com/awsfirstcloudaijourney/Portfolio/-/pipelines
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Deployment Logs**: Trong GitLab CI/CD job logs

## 🔄 Rollback

### Qua Vercel Dashboard:
1. Vào https://vercel.com/dashboard
2. Chọn deployment cũ
3. Click **"Promote to Production"**

### Qua CLI:
```bash
vercel rollback
```

## 🎯 Lợi ích

- ✅ Tự động deploy mỗi khi push
- ✅ Preview cho mỗi MR
- ✅ Zero-downtime deployment
- ✅ Instant rollback
- ✅ Global CDN
- ✅ HTTPS tự động
- ✅ Analytics built-in

## 🔐 Security

- Token được mask trong logs
- Protected variables chỉ chạy trên protected branches
- Vercel tự động scan vulnerabilities
