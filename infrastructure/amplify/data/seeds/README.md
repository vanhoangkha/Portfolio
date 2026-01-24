# Database Seeding

Scripts để populate dữ liệu mẫu vào DynamoDB cho portfolio.

## 📋 Mục Lục

- [Cài Đặt](#cài-đặt)
- [Sử Dụng](#sử-dụng)
- [Dữ Liệu Mẫu](#dữ-liệu-mẫu)
- [Troubleshooting](#troubleshooting)

## 🚀 Cài Đặt

1. **Đảm bảo backend đã được deploy:**
   ```bash
   cd amplify
   npm run deploy
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Kiểm tra amplify_outputs.json tồn tại:**
   ```bash
   ls ../amplify_outputs.json
   ```

## 💻 Sử Dụng

### Kiểm tra dữ liệu hiện tại

```bash
cd amplify
npm run seed:check
```

Kết quả:
```
📊 Checking database statistics...

📝 Blog Posts: 0
🚀 Projects: 0
💻 Skills: 0
🎓 Certifications: 0
🏆 Achievements: 0
👥 Community Activities: 0
📧 Contact Submissions: 0

📈 Total Records: 0

⚠️  Database is empty. Run "npm run seed" to populate with sample data.
```

### Thêm dữ liệu mẫu

**Cách 1: Thêm vào dữ liệu hiện có**
```bash
npm run seed
```

**Cách 2: Xóa dữ liệu cũ và thêm mới**
```bash
npm run seed:clear
```

### Kiểm tra sau khi seed

```bash
npm run seed:check
```

Kết quả mong đợi:
```
📊 Checking database statistics...

📝 Blog Posts: 6
   - Published: 6
   - Featured: 2

🚀 Projects: 6
   - Featured: 3
   - Completed: 4

💻 Skills: 24
   - Categories: Cloud, Architecture, AI/ML, DevOps, Programming, Database

🎓 Certifications: 5

🏆 Achievements: 5

👥 Community Activities: 5

📧 Contact Submissions: 0

📈 Total Records: 51

✅ Database has data!
```

## 📊 Dữ Liệu Mẫu

### Blog Posts (6 bài viết)
- **Scalable AWS Architectures** (Featured)
- **Generative AI Integration** (Featured)
- DevSecOps Security
- Multi-Cloud Strategy
- Building AWS Community
- Career Growth

### Projects (6 dự án)
- **CloudThinker Platform** (Featured)
- **AWS GenAI Solutions** (Featured)
- **Enterprise LMS** (Featured)
- Hybrid Cloud Migration
- DevSecOps Pipeline
- Multi-Cloud Cost Optimizer

### Skills (24 kỹ năng)
Được phân loại theo:
- Cloud (AWS, Azure, GCP)
- Architecture (Solutions, Microservices, Serverless)
- AI/ML (Bedrock, SageMaker, ML, LangChain)
- DevOps (Terraform, Docker, Kubernetes, CI/CD)
- Programming (Python, JavaScript, Node.js, Go)
- Database (DynamoDB, PostgreSQL, MongoDB, Redis)

### Certifications (5)
- AWS Solutions Architect - Professional
- AWS DevOps Engineer - Professional
- AWS Security - Specialty
- Terraform Associate
- Kubernetes Administrator (CKA)

### Achievements (5)
- AWS Community Builder
- AWS re:Invent Speaker
- CloudThinker Founder
- AWS User Group Leader
- Published Author

### Community Activities (5)
- AWS Summit Singapore 2024
- GenAI Workshop Series
- Cloud Architecture Masterclass
- DevOps Vietnam Conference
- Tech Talk: Serverless at Scale

## 🔧 Troubleshooting

### Lỗi: "Cannot find amplify_outputs.json"

**Nguyên nhân:** Backend chưa được deploy hoặc file config chưa được generate.

**Giải pháp:**
```bash
cd amplify
npm run deploy
```

### Lỗi: "Authentication required"

**Nguyên nhân:** Cần authentication để tạo/update data.

**Giải pháp:**

1. **Tạo API Key (Temporary - cho development):**
   ```typescript
   // amplify/data/resource.ts
   export const data = defineData({
     schema,
     authorizationModes: {
       defaultAuthorizationMode: 'apiKey', // Thay 'userPool' thành 'apiKey'
       apiKeyAuthorizationMode: {
         expiresInDays: 30,
       },
     },
   });
   ```

2. **Deploy lại:**
   ```bash
   npm run deploy
   ```

3. **Chạy seed:**
   ```bash
   npm run seed
   ```

4. **Đổi lại về userPool sau khi seed xong** (recommended for production).

### Lỗi: "Network error"

**Nguyên nhân:** Không kết nối được với AWS.

**Giải pháp:**
1. Kiểm tra AWS credentials:
   ```bash
   aws sts get-caller-identity
   ```

2. Kiểm tra region trong amplify_outputs.json.

3. Kiểm tra internet connection.

### Dữ liệu không hiển thị trên frontend

**Nguyên nhân:** Frontend chưa được integrate với Amplify Data.

**Giải pháp:**
1. Generate GraphQL client code:
   ```bash
   cd amplify
   npm run generate
   ```

2. Integrate Amplify trong frontend:
   ```javascript
   import { Amplify } from 'aws-amplify';
   import outputs from './amplify_outputs.json';

   Amplify.configure(outputs);
   ```

3. Fetch data từ GraphQL:
   ```javascript
   import { generateClient } from 'aws-amplify/data';
   import type { Schema } from './amplify/data/resource';

   const client = generateClient<Schema>();

   // Fetch blog posts
   const { data: posts } = await client.models.BlogPost.list();
   ```

## 📝 Tùy Chỉnh Dữ Liệu

Để thêm/sửa dữ liệu mẫu:

1. **Chỉnh sửa `seed-data.ts`:**
   ```typescript
   export const blogPosts = [
     {
       title: "Your Blog Post Title",
       slug: "your-blog-post-slug",
       content: "Your content here...",
       // ... other fields
     },
   ];
   ```

2. **Chạy lại seed:**
   ```bash
   npm run seed:clear  # Xóa cũ và thêm mới
   ```

## 🔐 Security Note

⚠️ **Production:** Đảm bảo `authorizationMode` là `userPool` trong production, không dùng `apiKey` trừ khi cần thiết.

## 📚 Resources

- [AWS Amplify Data Documentation](https://docs.amplify.aws/gen2/build-a-backend/data/)
- [GraphQL API Documentation](https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-api/)
- [Authorization Rules](https://docs.amplify.aws/gen2/build-a-backend/data/customize-authz/)
