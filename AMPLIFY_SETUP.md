# 🚀 AWS Amplify Hosting Setup Guide

## Status
✅ Git repository: https://github.com/vanhoangkha/Portfolio
✅ Code pushed to GitHub (latest commit: 068e112)
✅ amplify.yml configuration created
⏳ Amplify App ID: d2y2voizcsqkbs
⏳ Waiting for GitHub connection

## Quick Setup (5 phút)

### Cách 1: Tự động qua Console (Recommended) ⭐

1. **Mở AWS Amplify Console**:
   ```
   https://ap-southeast-1.console.aws.amazon.com/amplify/home?region=ap-southeast-1#/
   ```

2. **Click vào app "khavan-portfolio"** (App ID: d2y2voizcsqkbs)

3. **Click "Connect repository"** hoặc **"Connect branch"**

4. **Chọn GitHub** và authorize:
   - Click "Connect GitHub"
   - Login GitHub nếu chưa
   - Authorize AWS Amplify
   - Chọn repository: `vanhoangkha/Portfolio`
   - Chọn branch: `master`

5. **Review build settings**:
   - Amplify sẽ tự detect `amplify.yml`
   - Xác nhận build settings
   - Click "Save and deploy"

6. **Chờ deployment** (2-3 phút):
   - Build → Deploy → Verify
   - Xong! ✅

### Cách 2: Tạo mới từ đầu (Alternative)

1. **Vào Amplify Console**:
   ```
   https://ap-southeast-1.console.aws.amazon.com/amplify/home?region=ap-southeast-1#/create
   ```

2. **Chọn "Host web app"**

3. **Chọn GitHub**:
   - Authorize GitHub
   - Chọn repo: `vanhoangkha/Portfolio`
   - Chọn branch: `master`

4. **Configure build settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands:
           - echo "Building portfolio..."
     artifacts:
       baseDirectory: frontend
       files:
         - '**/*'
   ```

5. **Review and deploy**

## Sau khi deploy thành công

Bạn sẽ có:

### 🌐 HTTPS URL
```
https://master.d2y2voizcsqkbs.amplifyapp.com
```

### ✨ Features
- ✅ **HTTPS tự động** (SSL certificate miễn phí)
- ✅ **Global CDN** (CloudFront distribution)
- ✅ **CI/CD tự động** (push code → auto deploy)
- ✅ **Atomic deployments** (zero downtime)
- ✅ **Branch previews** (cho mỗi branch)
- ✅ **Custom domain ready** (dễ dàng add domain)

### 📊 Build Process
```
1. Git push → GitHub
2. Amplify detects change
3. Auto build & deploy
4. Website live với HTTPS
```

### 🎯 Custom Domain (Optional)

Nếu có domain (vd: khavan.dev):

1. Vào Amplify Console → Domain management
2. Add domain
3. Update DNS records (Amplify sẽ hướng dẫn)
4. Chờ SSL certificate provision (~15 phút)
5. Done! Website live với custom domain + HTTPS

## Comparison: S3 vs Amplify

| Feature | S3 Static | Amplify Hosting |
|---------|-----------|-----------------|
| **HTTPS** | ❌ HTTP only | ✅ HTTPS automatic |
| **CDN** | ❌ Manual setup | ✅ Built-in CloudFront |
| **CI/CD** | ❌ Manual deploy | ✅ Auto from Git |
| **Custom Domain** | ⚠️ Complex | ✅ Easy (1-click) |
| **SSL Certificate** | ⚠️ Manual | ✅ Free automatic |
| **Price** | $ Cheap | $$ Moderate |
| **Best for** | Simple sites | Modern apps |

## Current URLs

### S3 Static Website (Old)
```
http://khavan-portfolio-site.s3-website-ap-southeast-1.amazonaws.com
```
- ❌ HTTP only (not secure)
- ❌ No CDN
- ⚠️ Nên migrate sang Amplify

### Amplify Hosting (New)
```
https://master.d2y2voizcsqkbs.amplifyapp.com
```
- ✅ HTTPS
- ✅ Global CDN
- ✅ CI/CD
- ⏳ Chờ GitHub connection

## Troubleshooting

### Issue: Can't authorize GitHub
**Solution**:
- Kiểm tra popup blocker
- Thử browser khác
- Clear cache và thử lại

### Issue: Build fails
**Solution**:
- Check amplify.yml syntax
- Verify frontend folder structure
- Check build logs trong Console

### Issue: Files not found
**Solution**:
- Confirm `baseDirectory: frontend` trong amplify.yml
- Check file paths trong artifacts

## Next Steps

1. ✅ **Connect GitHub** qua Console (làm ngay)
2. ⏳ **Wait for deployment** (2-3 phút)
3. ✅ **Test HTTPS URL**
4. 📝 **Update README** với URL mới
5. 🎨 **Share portfolio** với recruiters!

## Support

- AWS Amplify Docs: https://docs.aws.amazon.com/amplify/
- GitHub Issues: https://github.com/vanhoangkha/Portfolio/issues

---

**Ready to go! Chỉ cần connect GitHub là xong! 🚀**
