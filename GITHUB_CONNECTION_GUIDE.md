# 🔗 Hướng dẫn Connect GitHub với AWS Amplify

## Bước 1: Mở AWS Amplify Console

**Link trực tiếp đến app của bạn**:
```
https://ap-southeast-1.console.aws.amazon.com/amplify/home?region=ap-southeast-1#/d2y2voizcsqkbs
```

Hoặc:
1. Vào AWS Console: https://console.aws.amazon.com
2. Chọn region: **ap-southeast-1** (Singapore)
3. Search "Amplify" trong search bar
4. Click vào app **"khavan-portfolio"**

## Bước 2: Connect Repository

Khi vào app, bạn sẽ thấy:

### Scenario A: Nếu thấy button "Connect repository"
1. Click button **"Connect repository"** (màu cam/xanh)
2. Chuyển sang Bước 3

### Scenario B: Nếu thấy "Get started" hoặc "Host web app"
1. Click **"Get started"** hoặc **"Host web app"**
2. Chọn **"From your Git provider"**
3. Chuyển sang Bước 3

### Scenario C: Nếu đã có branch nhưng chưa connect Git
1. Click tab **"App settings"** bên trái
2. Click **"General"**
3. Tìm section **"Repository"**
4. Click **"Connect repository"**

## Bước 3: Chọn Git Provider

1. Bạn sẽ thấy các options:
   - GitHub ⭐ (chọn cái này)
   - GitLab
   - Bitbucket
   - AWS CodeCommit

2. **Click vào GitHub**

3. Một popup sẽ mở để authorize GitHub

## Bước 4: Authorize GitHub

### Lần đầu tiên:

1. **Popup GitHub Authorization** sẽ mở:
   - Nếu chưa login GitHub: Login với username/password
   - Nếu đã login: Sẽ thấy trang authorize

2. **Trang Authorize AWS Amplify**:
   - Repository access: Chọn "All repositories" hoặc "Only select repositories"
   - Nếu chọn "Only select repositories": Chọn **vanhoangkha/Portfolio**
   - Click **"Authorize AWS Amplify"** (button màu xanh)

3. **Có thể yêu cầu confirm password GitHub** - nhập password và confirm

4. **Quay lại AWS Console** (tự động)

### Nếu đã authorize trước đó:

- AWS sẽ tự động list repositories
- Chuyển luôn sang Bước 5

## Bước 5: Chọn Repository và Branch

1. **Select repository**:
   - Dropdown list: Chọn **"vanhoangkha/Portfolio"**

2. **Select branch**:
   - Dropdown list: Chọn **"master"**

3. Click **"Next"** hoặc **"Continue"**

## Bước 6: Configure Build Settings

Amplify sẽ auto-detect `amplify.yml` và show:

```yaml
version: 1
frontend:
  phases:
    build:
      commands:
        - echo "Building portfolio..."
        - echo "No build process needed - static HTML/CSS/JS"
  artifacts:
    baseDirectory: frontend
    files:
      - '**/*'
```

### Kiểm tra:
- ✅ `baseDirectory: frontend` - Đúng!
- ✅ Files: `**/*` - Đúng!

### Nếu cần edit:
1. Click **"Edit"** nếu cần thay đổi
2. Nhưng thường **không cần edit** vì đã đúng

### Environment variables (Optional):
- Skip, không cần add gì
- Click **"Next"**

## Bước 7: Review và Deploy

1. **Review page**:
   - App name: khavan-portfolio ✅
   - Repository: vanhoangkha/Portfolio ✅
   - Branch: master ✅
   - Build settings: amplify.yml detected ✅

2. **Service role** (nếu hỏi):
   - Chọn "Create new role" (Amplify sẽ tự tạo)
   - Hoặc để default

3. Click **"Save and deploy"** (button màu cam)

## Bước 8: Đợi Deployment

Bạn sẽ thấy deployment pipeline với 4 giai đoạn:

### 1. Provision (⏱️ ~30s)
```
⏳ Setting up environment...
```

### 2. Build (⏱️ ~1 phút)
```
⏳ Running build commands...
⏳ Generating artifacts...
```

### 3. Deploy (⏱️ ~30s)
```
⏳ Deploying to CDN...
```

### 4. Verify (⏱️ ~30s)
```
⏳ Verifying deployment...
```

### Tổng thời gian: ~2-3 phút

## Bước 9: Deployment Complete! 🎉

Khi xong, bạn sẽ thấy:

1. **Status màu xanh**: ✅ **Deployed**

2. **Domain URL**:
   ```
   https://master.d2y2voizcsqkbs.amplifyapp.com
   ```

3. **Screenshot thumbnail** của website

4. Click vào URL để xem website!

## Bước 10: Báo cho tôi biết

Chỉ cần gõ:
- "Xong" hoặc
- "Done" hoặc
- Paste URL của website

Tôi sẽ:
- ✅ Verify deployment qua CLI
- ✅ Test HTTPS + CDN
- ✅ Check performance
- ✅ Update documentation
- ✅ Tạo final summary

## 🔧 Troubleshooting

### Issue: Popup bị block
**Giải pháp**:
- Allow popups từ console.aws.amazon.com
- Hoặc click icon popup ở address bar
- Hoặc thử browser khác (Chrome recommended)

### Issue: Can't find repository
**Giải pháp**:
- Đảm bảo đã authorize đúng GitHub account
- Refresh page
- Re-authorize nếu cần

### Issue: Build failed
**Giải pháp**:
- Click vào job để xem logs
- Copy error message
- Báo cho tôi, tôi sẽ fix

### Issue: Access denied
**Giải pháp**:
- Kiểm tra AWS account có permission với Amplify
- Check IAM roles

## 📱 Screenshots Mẫu

### 1. Connect Repository Button
```
┌─────────────────────────────────────┐
│  khavan-portfolio                   │
│                                     │
│  [Connect repository]               │ <- Click here
│                                     │
└─────────────────────────────────────┘
```

### 2. GitHub Authorization
```
┌─────────────────────────────────────┐
│  Authorize AWS Amplify              │
│                                     │
│  Repository access:                 │
│  ○ All repositories                 │
│  ● Only select repositories         │
│    ☑ vanhoangkha/Portfolio         │
│                                     │
│  [Authorize AWS Amplify]            │ <- Click
└─────────────────────────────────────┘
```

### 3. Select Repository
```
┌─────────────────────────────────────┐
│  Select repository                  │
│  [vanhoangkha/Portfolio  ▼]        │ <- Select
│                                     │
│  Select branch                      │
│  [master                 ▼]        │ <- Select
│                                     │
│  [Next]                             │ <- Click
└─────────────────────────────────────┘
```

### 4. Deployment Progress
```
┌─────────────────────────────────────┐
│  Branch: master                     │
│                                     │
│  ✅ Provision    (30s)              │
│  ⏳ Build        (in progress)      │
│  ⏱️  Deploy      (waiting)          │
│  ⏱️  Verify      (waiting)          │
└─────────────────────────────────────┘
```

### 5. Success!
```
┌─────────────────────────────────────┐
│  ✅ Deployed                         │
│                                     │
│  🌐 https://master.d2y2voizcsqkbs  │
│     .amplifyapp.com                 │
│                                     │
│  [View deployment]                  │
└─────────────────────────────────────┘
```

## ⏱️ Timeline

- **00:00** - Click connect repository
- **00:30** - Authorize GitHub
- **01:00** - Select repo + branch
- **01:30** - Review + click deploy
- **02:00** - Provision starts
- **02:30** - Build starts
- **03:30** - Deploy starts
- **04:00** - Verify
- **04:30** - ✅ DONE!

**Total: ~5 phút**

## 🎯 Next Steps After Success

Sau khi connect thành công:

1. **Mỗi lần push code**:
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```
   → Amplify tự động detect và deploy! (không cần làm gì)

2. **Add custom domain** (nếu có):
   - App settings → Domain management
   - Add domain → Follow instructions

3. **Branch previews** (optional):
   - Mỗi branch tự động có URL riêng để test

## ✅ Checklist

- [ ] Mở AWS Amplify Console
- [ ] Click "Connect repository"
- [ ] Authorize GitHub
- [ ] Chọn vanhoangkha/Portfolio
- [ ] Chọn branch master
- [ ] Review build settings
- [ ] Click "Save and deploy"
- [ ] Đợi deployment complete
- [ ] Copy URL
- [ ] Báo cho tôi!

---

**Bắt đầu từ Bước 1 và làm theo thứ tự! Good luck! 🚀**
