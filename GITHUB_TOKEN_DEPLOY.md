# 🚀 Deploy với GitHub Token - Cách Tốt Nhất!

## ✅ Tại sao dùng GitHub?

**Your code đã có trên GitHub**:
- Repository: https://github.com/vanhoangkha/Portfolio
- Branch: master
- Latest commit: Amplify backend code ✅

**Benefits**:
- ✅ Không cần upload code
- ✅ CI/CD tự động (git push → auto deploy)
- ✅ Git history đầy đủ
- ✅ Dễ collaborate
- ✅ Professional workflow

## 🎯 2 Cách Deploy với GitHub

### Option 1: Dùng GitHub Token qua CLI (Tôi làm - 2 phút) ⭐⭐⭐⭐⭐

**Bạn cần**:
1. Tạo GitHub Personal Access Token (30s)
2. Cho tôi token
3. Tôi connect Amplify → GitHub
4. Auto deploy!

**Steps**:

#### Bước 1: Tạo GitHub Token

1. **Vào GitHub Settings**:
   ```
   https://github.com/settings/tokens
   ```

2. Click **"Generate new token"** → **"Generate new token (classic)"**

3. **Configure token**:
   - Note: `Amplify Deploy`
   - Expiration: `90 days` (hoặc No expiration)
   - Scopes: Check these:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `admin:repo_hook` (Full control of repository hooks)

4. Click **"Generate token"**

5. **Copy token** (starts with `ghp_...`)
   - ⚠️ Save it! Chỉ hiện 1 lần!

#### Bước 2: Cho tôi token

Paste token vào chat:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Security**: Token này chỉ có quyền access repo của bạn, an toàn!

#### Bước 3: Tôi sẽ làm

```bash
# Connect Amplify với GitHub
aws amplify update-app \
  --app-id d1titvud3ysqcv \
  --access-token YOUR_TOKEN \
  --region ap-southeast-1

# Create branch connection
aws amplify create-branch \
  --app-id d1titvud3ysqcv \
  --branch-name master \
  --repository https://github.com/vanhoangkha/Portfolio

# Trigger deploy
aws amplify start-job \
  --app-id d1titvud3ysqcv \
  --branch-name master \
  --job-type RELEASE
```

**Done!** Deployment starts automatically!

---

### Option 2: Connect qua Amplify Console (Bạn làm - 3 phút) ⭐⭐⭐⭐

**Không cần token cho tôi**, bạn tự làm qua Console:

#### Bước 1: Delete Amplify App hiện tại

```bash
# Tôi sẽ delete app CodeCommit
aws amplify delete-app --app-id d1titvud3ysqcv --region ap-southeast-1
```

#### Bước 2: Create New App từ GitHub

1. **Mở Amplify Console**:
   ```
   https://ap-southeast-1.console.aws.amazon.com/amplify/home?region=ap-southeast-1#/create
   ```

2. Click **"Host web app"**

3. **Select GitHub**:
   - Click **"GitHub"**
   - Click **"Authorize AWS Amplify"**
   - Login GitHub (nếu chưa)
   - Authorize AWS Amplify

4. **Select Repository**:
   - Repository: **vanhoangkha/Portfolio**
   - Branch: **master**
   - Click **"Next"**

5. **Build Settings**:
   - Amplify auto-detects `amplify.yml` ✅
   - Backend detected: `amplify/` folder ✅
   - Click **"Next"**

6. **Review & Deploy**:
   - App name: portfolio-fullstack
   - Click **"Save and deploy"** 🚀

7. **Wait** 5-10 minutes for deployment!

---

## 💡 Tôi Recommend: Option 1 (với token)

**Why?**
- ✅ Faster (tôi làm mọi thứ)
- ✅ Không cần delete/recreate app
- ✅ Keep existing Amplify app ID
- ✅ Chỉ cần 1 token

**vs Option 2**:
- ⏱️ Slower (bạn phải làm qua UI)
- 🔄 Phải delete và recreate app
- 📝 More manual steps

---

## 🎉 Sau khi Deploy (Option 1 hoặc 2)

### You Get:

**Frontend URL**:
```
https://master.[app-id].amplifyapp.com
```

**Backend Resources**:
- ✅ Cognito User Pool
- ✅ 7 DynamoDB tables
- ✅ GraphQL API endpoint
- ✅ 3 S3 buckets
- ✅ Lambda functions
- ✅ amplify_outputs.json

**CI/CD Enabled**:
```bash
# From now on, mỗi khi:
git add .
git commit -m "Update"
git push origin master

# Amplify tự động:
# ✅ Detect commit
# ✅ Build backend
# ✅ Build frontend
# ✅ Deploy
# ✅ Update live site
```

No manual deployment needed anymore!

---

## 📊 Deployment Pipeline

```
⏳ Provision (30s)
   - Setup environment

⏳ Build Backend (3-5 mins)
   - Deploy Cognito User Pool
   - Create DynamoDB tables (7)
   - Deploy GraphQL API
   - Create Lambda functions
   - Setup S3 buckets
   - Generate config

⏳ Build Frontend (2 mins)
   - Process assets
   - Optimize code

⏳ Deploy (1 min)
   - Upload to CloudFront CDN
   - Configure HTTPS

⏳ Verify (30s)
   - Health checks

✅ Deployed!
```

**Total**: 5-10 minutes

---

## 🔒 Security Notes

**GitHub Token**:
- ✅ Scoped to your repo only
- ✅ Can be revoked anytime
- ✅ Expires after 90 days (or custom)
- ✅ Used only for Amplify integration

**After deployment**:
- Token stored securely in AWS Secrets Manager
- Not exposed in logs or console
- Can be rotated anytime

**Revoke token**:
```
https://github.com/settings/tokens
```
Click token → Delete

---

## 🆚 Comparison: CodeCommit vs GitHub

| Feature | CodeCommit | GitHub + Token |
|---------|------------|----------------|
| **Setup** | Complex | Simple (1 token) |
| **Upload** | Manual | Already has code |
| **CI/CD** | ✅ Yes | ✅ Yes |
| **Popular** | AWS only | Industry standard |
| **Collaboration** | Limited | Better tools |
| **Cost** | AWS charges | Free (public repo) |
| **Recommend** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## ❓ Bạn chọn gì?

### A: Tôi làm với GitHub token (Fast - 2 phút)

**You do**:
1. Tạo GitHub token (30s)
2. Paste vào chat

**I do**:
1. Connect Amplify → GitHub
2. Trigger deployment
3. Monitor progress
4. Get URLs

**Time**: 2 phút setup + 5-10 phút deploy

---

### B: Tự làm qua Console (3 phút)

**You do**:
1. Mở Amplify Console
2. Create new app
3. Connect GitHub
4. Deploy

**I help**:
- Verify deployment
- Get URLs
- Test backend

**Time**: 3 phút setup + 5-10 phút deploy

---

## 🎯 Quick Links

**Create GitHub Token**:
https://github.com/settings/tokens

**Amplify Console**:
https://ap-southeast-1.console.aws.amazon.com/amplify/home?region=ap-southeast-1

**Your GitHub Repo**:
https://github.com/vanhoangkha/Portfolio

---

## ✅ Status Right Now

- ✅ GitHub repo: Has all code (Amplify backend included)
- ✅ Latest commit: Backend + frontend ready
- ⏳ Amplify app: Can connect to GitHub anytime
- ⏳ Deployment: Ready to start

**Just need**:
- GitHub token (30 seconds to create)
- Then auto-deploy! 🚀

---

**Ready? Chọn A or B?**

**A = Cho tôi token, tôi deploy ngay (recommend)**
**B = Tự làm qua Console**

Chọn gì? 😊
