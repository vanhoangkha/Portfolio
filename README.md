# Kha Van Hoang - Portfolio & Blog

A modern, full-stack portfolio and personal blog showcasing cloud architecture, AI/ML, and DevSecOps expertise.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazon-aws&logoColor=FF9900)

## Features

### Portfolio
- **Modern Design**: Clean, professional UI with smooth animations
- **Dark/Light Mode**: Toggle between themes with keyboard shortcut (Press 'T')
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Animations**: Scroll-triggered animations and floating elements
- **Smooth Navigation**: Seamless scrolling between sections
- **Progressive Web App**: Installable with offline support

### Blog System
- **Dedicated Blog Page**: Full blog experience with filtering
- **Categories**: Cloud Architecture, AI & ML, DevSecOps, Community, Career
- **Search & Filter**: Real-time search and category filtering
- **Reading Progress**: Visual progress indicator
- **Markdown Support**: Write posts in Markdown format

### Backend API
- **RESTful API**: Node.js/TypeScript backend
- **Database**: PostgreSQL for blog posts and analytics
- **Authentication**: Secure API endpoints
- **Analytics**: Track views and engagement

## Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Git
- Docker (optional, for containerized development)

### Installation

```bash
# Clone the repository
git clone https://github.com/vanhoangkha/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

### Development

```bash
# Run frontend (open frontend/index.html in browser or use live server)

# Run backend API
npm run dev:backend

# Or use Docker Compose
npm run docker:up
```

### Build & Deploy

```bash
# Build frontend assets
npm run build

# Deploy to AWS S3
npm run deploy:s3

# Deploy to AWS with CloudFront
npm run deploy:aws

# Check CloudFront status
npm run check:cloudfront
```

## Project Structure

```
Portfolio/
├── frontend/              # Static frontend application
│   ├── index.html        # Main portfolio page
│   ├── blog.html         # Blog listing and posts
│   ├── resume.html       # Resume/CV page
│   ├── css/              # Stylesheets
│   │   ├── main.css
│   │   ├── blog.css
│   │   └── themes.css
│   ├── js/               # JavaScript modules
│   │   ├── main.js
│   │   ├── blog.js
│   │   └── analytics.js
│   ├── assets/           # Images, fonts, icons
│   └── sw.js             # Service Worker for PWA
│
├── backend/              # Node.js/TypeScript API
│   ├── src/              # Source code
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── dist/             # Compiled JavaScript
│   └── package.json
│
├── database/             # Database schemas and migrations
│   ├── migrations/
│   └── seeds/
│
├── config/               # Configuration files
│   ├── docker-compose.yml
│   └── nginx.conf
│
├── scripts/              # Build and deployment scripts
│   ├── build.sh
│   ├── deploy-s3.sh
│   ├── deploy-aws.sh
│   ├── update-s3.sh
│   └── check-cloudfront.sh
│
├── docs/                 # Documentation
│   ├── DEPLOYMENT.md     # Deployment guide
│   ├── DEVELOPMENT_SUMMARY.md
│   ├── PERFORMANCE.md    # Performance optimization
│   └── API.md            # API documentation
│
├── .editorconfig         # Editor configuration
├── .gitignore            # Git ignore rules
├── CONTRIBUTING.md       # Contribution guidelines
├── LICENSE               # MIT License
└── package.json          # Project metadata and scripts
```

## Available Scripts

```bash
# Development
npm run dev:backend         # Start backend dev server
npm run docker:up           # Start all services with Docker
npm run docker:down         # Stop all services
npm run docker:logs         # View logs

# Build & Deploy
npm run build               # Build frontend assets
npm run build:backend       # Build backend
npm run deploy:s3           # Deploy to S3
npm run deploy:aws          # Deploy to AWS with CloudFront
npm run update:s3           # Update S3 content
npm run check:cloudfront    # Check CloudFront status

# Quality
npm run lint                # Run linter (to be configured)
npm run format              # Format code (to be configured)
npm test                    # Run tests (to be configured)
```

## Keyboard Shortcuts

- **T**: Toggle dark/light theme
- **Escape**: Close mobile menu
- **Ctrl/Cmd + K**: Focus search (on blog page)

## Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, Animations
- **Vanilla JavaScript**: ES6+ features, no frameworks
- **Service Worker**: PWA functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter & JetBrains Mono

### Backend
- **Node.js**: Runtime environment
- **TypeScript**: Type-safe development
- **Express**: Web framework
- **PostgreSQL**: Database
- **Docker**: Containerization

### Infrastructure
- **AWS S3**: Static hosting
- **AWS CloudFront**: CDN
- **AWS Route53**: DNS
- **Docker Compose**: Local development

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Fast Load Time**: < 2s initial load
- **Optimized Assets**: Minified CSS, JS, HTML
- **Lazy Loading**: Images and blog posts
- **CDN**: CloudFront for global distribution
- **Caching**: Aggressive caching strategy
- **Lighthouse Score**: 95+ across all metrics

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Code of conduct
- Development setup
- Coding standards
- Pull request process
- Commit message conventions

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/API.md)
- [Performance Optimization](docs/PERFORMANCE.md)
- [Quick Start Guide](docs/QUICK_START.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: khavan.work@gmail.com
- **LinkedIn**: [linkedin.com/in/vanhoangkha](https://linkedin.com/in/vanhoangkha)
- **GitHub**: [github.com/vanhoangkha](https://github.com/vanhoangkha)
- **Portfolio**: [cloudjourney.awsstudygroup.com](https://cloudjourney.awsstudygroup.com)

## Acknowledgments

- Built with passion and expertise
- Inspired by modern web design trends
- Community feedback from AWS Study Group
- Open source technologies and tools

## Roadmap

- [ ] Add comprehensive test suite
- [ ] Implement CI/CD pipeline
- [ ] Add more blog post templates
- [ ] Integrate with CMS
- [ ] Add analytics dashboard
- [ ] Implement newsletter subscription
- [ ] Add multi-language support

---

**Version**: 1.0.0
**Last Updated**: January 2025

For questions or issues, please [open an issue](https://github.com/vanhoangkha/Portfolio/issues) on GitHub.
