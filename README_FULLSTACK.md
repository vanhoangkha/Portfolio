# Portfolio Full-Stack Application

Complete refactored portfolio with backend API, frontend, and database.

## 🏗 Architecture

```
Portfolio/
├── backend/           # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, error handling, rate limiting
│   │   ├── config/        # Database configuration
│   │   └── index.ts       # App entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/          # Static HTML/CSS/JS (from dist/)
├── database/          # PostgreSQL schema and seeds
├── docker-compose.yml # Full stack orchestration
└── nginx.conf         # Reverse proxy config
```

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 16
- **ORM**: Knex.js
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting

### Frontend
- **HTML5** (semantic markup)
- **CSS3** (minified, optimized)
- **JavaScript** (vanilla, minified)
- **PWA** support

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Deployment**: ECS/Fargate ready

## 📦 Features

### Backend API Endpoints

#### Authentication (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh` - Refresh access token

#### Blog (`/api/v1/blog`)
- `GET /` - Get all published posts
- `GET /:slug` - Get post by slug
- `POST /` - Create post (admin only)
- `PUT /:id` - Update post (admin only)
- `DELETE /:id` - Delete post (admin only)

#### Projects (`/api/v1/projects`)
- `GET /` - Get all projects
- `GET /:slug` - Get project by slug
- `POST /` - Create project (admin only)
- `PUT /:id` - Update project (admin only)
- `DELETE /:id` - Delete project (admin only)

#### Contact (`/api/v1/contact`)
- `POST /` - Send contact message

#### Analytics (`/api/v1/analytics`)
- `POST /event` - Track custom event
- `POST /pageview` - Track page view
- `GET /stats` - Get analytics stats (admin only)

### Database Schema

**Tables:**
- `users` - User accounts (admin/user)
- `blog_posts` - Blog content with versioning
- `projects` - Portfolio projects
- `contact_messages` - Contact form submissions
- `analytics_events` - Custom event tracking
- `page_views` - Page view analytics

## 🛠 Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- PostgreSQL 16+ (if not using Docker)

### Quick Start with Docker

1. **Clone and setup:**
```bash
cd Portfolio
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
```

2. **Start all services:**
```bash
docker-compose up -d
```

3. **Access services:**
- Frontend: http://localhost
- Backend API: http://localhost:3000
- Database: localhost:5432

### Local Development (without Docker)

1. **Setup database:**
```bash
createdb portfolio_db
psql portfolio_db < database/schema.sql
psql portfolio_db < database/seed.sql
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env
```

3. **Run backend in dev mode:**
```bash
npm run dev
```

4. **Serve frontend:**
```bash
cd ../frontend
python -m http.server 3001
# Or use any static file server
```

## 📝 Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_minimum_32_chars
JWT_EXPIRES_IN=7d

# Email (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_TO=khavan.work@gmail.com

# CORS
CORS_ORIGIN=http://localhost:3001,https://yourproduction.com
```

## 🚢 Deployment

### Docker Compose (Recommended)

```bash
# Production build
docker-compose -f docker-compose.yml up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### AWS ECS/Fargate

1. **Build and push images:**
```bash
# Backend
cd backend
docker build -t portfolio-backend:latest .
docker tag portfolio-backend:latest ECR_URI/portfolio-backend:latest
docker push ECR_URI/portfolio-backend:latest

# Frontend (Nginx)
docker build -f Dockerfile.frontend -t portfolio-frontend:latest .
docker push ECR_URI/portfolio-frontend:latest
```

2. **Create ECS task definition** with:
   - Backend container (port 3000)
   - Nginx container (port 80)
   - RDS PostgreSQL database

3. **Deploy to ECS Fargate cluster**

### Environment-Specific Configs

**Development:**
- CORS: `*` or specific origins
- Logging: verbose (morgan 'dev')
- Error stack traces: enabled

**Production:**
- CORS: specific trusted origins
- Logging: combined format
- Error stack traces: disabled
- HTTPS: enforced
- Rate limiting: strict

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Configurable cross-origin access
- **Rate Limiting**: Prevent abuse
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Joi schemas
- **SQL Injection Prevention**: Parameterized queries (Knex)
- **XSS Protection**: Sanitized inputs

## 📊 API Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "message": "Error description"
  },
  "timestamp": "2025-11-06T12:00:00.000Z",
  "path": "/api/v1/endpoint"
}
```

## 🧪 Testing

```bash
cd backend
npm test
```

## 📚 API Documentation

Full API documentation available at `/api/v1/docs` (when Swagger is configured).

## 🔄 Database Migrations

```bash
cd backend

# Run migrations
npm run migrate

# Rollback
npm run migrate:rollback

# Seed database
npm run seed
```

## 📈 Monitoring

- **Health Check**: `GET /health`
- **Logs**: Docker logs or CloudWatch
- **Metrics**: Track via analytics endpoints

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit PR

## 📄 License

MIT

---

**Deployed URLs:**
- Frontend (S3): http://khavan-portfolio-site.s3-website-ap-southeast-1.amazonaws.com
- Frontend (CloudFront): https://d1pas1x9m16mj0.cloudfront.net
- Backend API: (Deploy to ECS)

**Author:** Kha Van Hoang
**Email:** khavan.work@gmail.com
