# Kha Van Hoang - Portfolio Full-Stack with AWS Amplify

Modern serverless portfolio with AWS Amplify Gen 2 backend showcasing cloud architecture, AI/ML, and DevSecOps expertise.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-Gen_2-orange)
![Serverless](https://img.shields.io/badge/Architecture-Serverless-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazon-aws&logoColor=FF9900)

## Architecture

This portfolio is built on **AWS Amplify Gen 2** serverless architecture with:

### Backend (Serverless)
- **Amazon Cognito**: User authentication with email verification
- **AWS AppSync**: Auto-generated GraphQL API with real-time subscriptions
- **Amazon DynamoDB**: NoSQL database with 7 data models
- **Amazon S3**: Object storage with 3 access levels (public, private, protected)
- **AWS Lambda**: Serverless functions for contact form and custom logic
- **Amazon SES**: Email notifications

### Frontend
- **Modern HTML/CSS/JS**: Semantic markup with premium animations
- **Dark/Light Mode**: Theme toggle with keyboard shortcuts
- **Fully Responsive**: Mobile-first design optimized for all devices
- **CloudFront CDN**: Global content delivery with HTTPS
- **PWA Support**: Installable with offline capabilities

### CI/CD
- **Git-based Deployment**: Auto-deploy on git push
- **GitHub Integration**: Connected to GitHub repository
- **Build Pipeline**: Automated backend + frontend build
- **Zero-downtime Deployment**: Rolling updates

## Features

### Portfolio
- **Modern Design**: Clean, professional UI with smooth animations
- **Interactive Animations**: Scroll-triggered animations and floating elements
- **Keyboard Shortcuts**: Quick navigation (Press 'T' for theme toggle)
- **Contact Form**: Integrated with Lambda + SES for email notifications

### Blog System
- **Full Blog Experience**: Dedicated blog page with filtering
- **Categories**: Cloud Architecture, AI & ML, DevSecOps, Community, Career
- **Real-time Updates**: GraphQL subscriptions for instant content updates
- **Search & Filter**: Client-side search and category filtering
- **View Analytics**: Track post views and engagement

### Data Models
7 DynamoDB tables managed by Amplify:
- **BlogPost**: Blog articles with categories, tags, view counts
- **Project**: Portfolio projects showcase
- **Skill**: Technical skills and proficiency levels
- **Certification**: Professional certifications
- **Achievement**: Career achievements and milestones
- **CommunityActivity**: Community contributions and events
- **ContactSubmission**: Contact form submissions
- **AnalyticsEvent**: User interaction tracking

## Quick Start

### Prerequisites
- **Node.js 18+** and npm 9+
- **AWS Account** with Amplify CLI access
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/vanhoangkha/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Install Amplify CLI (if not already installed)
npm install -g @aws-amplify/cli

# Configure AWS credentials
amplify configure
```

### Development

#### Run Amplify Sandbox (Local Backend)
```bash
# Start local Amplify backend with hot-reload
npm run sandbox

# This will:
# - Provision temporary cloud resources
# - Generate amplify_outputs.json
# - Watch for backend code changes
# - Provide local GraphQL endpoint
```

#### Run Frontend
```bash
# Option 1: Use any HTTP server
cd frontend
python3 -m http.server 8000

# Option 2: Use VS Code Live Server extension
# Right-click frontend/index.html → Open with Live Server

# Option 3: Use npx serve
npx serve frontend
```

Open http://localhost:8000 in your browser.

### Deploy to AWS

#### Deploy Backend
```bash
# Deploy backend to AWS (production)
npm run deploy:backend

# This will:
# - Create Cognito User Pool
# - Create 7 DynamoDB tables
# - Deploy GraphQL API (AppSync)
# - Create Lambda functions
# - Setup S3 buckets (3)
# - Generate amplify_outputs.json
```

#### Deploy Frontend + Backend (Full Stack)
The easiest way is to connect your GitHub repo to AWS Amplify Hosting:

1. **Push code to GitHub** (already done)
2. **Open Amplify Console**: https://console.aws.amazon.com/amplify
3. **Host web app** → Select **GitHub**
4. **Authorize AWS Amplify** → Select repo: `vanhoangkha/Portfolio`
5. **Select branch**: `master`
6. **Build settings**: Auto-detected from `amplify.yml`
7. **Deploy**: Click "Save and deploy"

**After deployment**, every `git push` will automatically deploy updates!

## Project Structure

```
Portfolio/
├── amplify/                  # Amplify Gen 2 Backend
│   ├── backend.ts           # Main backend config
│   ├── auth/                # Cognito authentication
│   │   └── resource.ts
│   ├── data/                # DynamoDB + GraphQL API
│   │   └── resource.ts      # 7 data models
│   ├── storage/             # S3 buckets
│   │   └── resource.ts
│   ├── functions/           # Lambda functions
│   │   └── contact-handler/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                # Static Frontend
│   ├── index.html          # Main portfolio page
│   ├── blog.html           # Blog listing
│   ├── resume.html         # Resume/CV
│   ├── css/                # Stylesheets
│   │   ├── main.css
│   │   ├── blog.css
│   │   └── themes.css
│   ├── js/                 # JavaScript modules
│   │   ├── main.js
│   │   ├── blog.js
│   │   └── analytics.js
│   ├── assets/             # Images, fonts, icons
│   └── sw.js               # Service Worker
│
├── docs/                    # Documentation
│   ├── QUICK_START.md
│   ├── DEPLOYMENT.md
│   └── archive/            # Historical docs
│
├── amplify.yml              # Amplify build config
├── amplify_outputs.json     # Generated backend config (gitignored)
├── package.json             # Project scripts
├── cleanup-amplify.sh       # Cleanup script
└── README.md               # This file
```

## Available Scripts

```bash
# Backend Development
npm run sandbox              # Run Amplify sandbox (local backend)
npm run deploy:backend       # Deploy backend to AWS

# Full Deployment
npm run deploy               # Deploy backend (frontend via Amplify Console)

# Utility
npm install                  # Install all dependencies
```

## Backend Resources

After deployment, you'll have:

### Authentication (Cognito)
- User Pool with email verification
- Email-based login
- JWT token authentication

### Database (DynamoDB)
- 7 tables with auto-scaling
- Global secondary indexes
- Point-in-time recovery

### API (AppSync GraphQL)
- Auto-generated from data models
- CRUD operations for all models
- Real-time subscriptions
- Authentication with Cognito
- API key for public access

### Storage (S3)
- **Public**: Blog images, project images
- **Protected**: User-specific uploads
- **Private**: Personal files

### Functions (Lambda)
- Contact form handler with SES integration
- Custom business logic

## GraphQL API Usage

After deployment, your frontend can interact with the backend:

```javascript
// Import Amplify client
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import outputs from './amplify_outputs.json';

// Configure Amplify
Amplify.configure(outputs);

// Create client
const client = generateClient();

// Query blog posts
const { data: posts } = await client.models.BlogPost.list();

// Create new post (authenticated users only)
await client.models.BlogPost.create({
  title: 'My New Post',
  slug: 'my-new-post',
  content: 'Post content here',
  author: 'Kha Van Hoang',
  published: true
});

// Subscribe to real-time updates
client.models.BlogPost.observeQuery().subscribe({
  next: ({ items }) => console.log('Posts updated:', items)
});
```

## Authentication Flow

```javascript
import { signIn, signUp, signOut, getCurrentUser } from 'aws-amplify/auth';

// Sign up
await signUp({
  username: 'user@example.com',
  password: 'SecurePass123!',
  options: {
    userAttributes: {
      email: 'user@example.com',
      name: 'John Doe'
    }
  }
});

// Sign in
await signIn({
  username: 'user@example.com',
  password: 'SecurePass123!'
});

// Get current user
const user = await getCurrentUser();

// Sign out
await signOut();
```

## Technologies Used

### Backend (AWS Amplify Gen 2)
- **TypeScript**: Type-safe backend configuration
- **AWS CDK**: Infrastructure as Code
- **GraphQL**: Auto-generated API with real-time capabilities
- **DynamoDB**: Serverless NoSQL database
- **Cognito**: Managed authentication
- **Lambda**: Serverless compute
- **S3**: Object storage
- **SES**: Email service
- **CloudFormation**: Infrastructure deployment

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling (Grid, Flexbox, Animations, CSS Variables)
- **Vanilla JavaScript**: ES6+ features
- **Font Awesome**: Icon library
- **Google Fonts**: Inter & JetBrains Mono

### Infrastructure
- **AWS Amplify Hosting**: CI/CD with git-based deployment
- **CloudFront CDN**: Global edge locations
- **HTTPS**: Auto-provisioned SSL certificates
- **Custom Domain**: Route53 DNS (optional)

## Cost Estimate

AWS Free Tier eligible! Expected monthly costs:

- **Amplify Hosting**: $0 (free tier: 1000 build minutes, 15 GB storage)
- **DynamoDB**: $0-5 (free tier: 25 GB storage, 200M requests)
- **Cognito**: $0 (free tier: 50,000 MAUs)
- **AppSync**: $0-5 (free tier: 250K queries/month)
- **Lambda**: $0 (free tier: 1M requests/month)
- **S3**: $0-2 (free tier: 5 GB storage, 20K GET requests)

**Total**: $0-15/month (mostly free tier)

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Fast Load Time**: < 2s initial load
- **Global CDN**: CloudFront edge locations
- **Optimized Assets**: Minified CSS, JS, HTML
- **Lazy Loading**: Images and content
- **Progressive Enhancement**: Works without JavaScript
- **Lighthouse Score**: 95+ across all metrics

## Security

- **HTTPS Only**: End-to-end encryption
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Client and server-side
- **CORS Configuration**: Restricted origins
- **IAM Policies**: Least-privilege access
- **Environment Variables**: Secrets management

## Documentation

- [Quick Start Guide](docs/QUICK_START.md)
- [AWS Amplify Full-Stack Plan](AWS_AMPLIFY_FULLSTACK_PLAN.md)
- [Amplify Implementation Guide](AMPLIFY_IMPLEMENTATION.md)
- [GitHub Token Deployment](GITHUB_TOKEN_DEPLOY.md)

## Deployment Status

**Current Deployment**:
- **App ID**: d1titvud3ysqcv
- **Domain**: https://master.d1titvud3ysqcv.amplifyapp.com
- **Region**: ap-southeast-1 (Singapore)
- **Connected to**: GitHub (vanhoangkha/Portfolio)
- **Branch**: master

**CI/CD**: Every push to `master` automatically triggers deployment!

## Development Workflow

1. **Make changes** to frontend or backend code
2. **Test locally** with `npm run sandbox` (backend) + local HTTP server (frontend)
3. **Commit changes**: `git add . && git commit -m "Your message"`
4. **Push to GitHub**: `git push origin master`
5. **Auto-deploy**: Amplify automatically builds and deploys!
6. **Monitor**: Check Amplify Console for build status

## Troubleshooting

### Backend deployment fails
```bash
# Check Amplify CLI version
npm list -g @aws-amplify/cli

# Update CLI
npm update -g @aws-amplify/cli

# Re-deploy
npm run deploy:backend
```

### Frontend not reflecting changes
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Check Amplify Console build logs
- Verify `amplify_outputs.json` is up to date

### GraphQL API errors
- Check authentication (logged in?)
- Verify IAM policies in Amplify Console
- Check CloudWatch logs for Lambda errors

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: khavan.work@gmail.com
- **LinkedIn**: [linkedin.com/in/vanhoangkha](https://linkedin.com/in/vanhoangkha)
- **GitHub**: [github.com/vanhoangkha](https://github.com/vanhoangkha)
- **Portfolio**: [Live on AWS Amplify](https://master.d1titvud3ysqcv.amplifyapp.com)

## Acknowledgments

- Built with AWS Amplify Gen 2
- Inspired by modern serverless architectures
- Community feedback from AWS Study Group
- Open source technologies and tools

---

**Version**: 2.0.0 (Amplify Gen 2)
**Last Updated**: January 2025

For questions or issues, please [open an issue](https://github.com/vanhoangkha/Portfolio/issues) on GitHub.
