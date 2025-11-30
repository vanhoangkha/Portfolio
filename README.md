# Portfolio - Kha Van Hoang

![License](https://img.shields.io/github/license/vanhoangkha/Portfolio?style=flat-square)
![Stars](https://img.shields.io/github/stars/vanhoangkha/Portfolio?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/vanhoangkha/Portfolio?style=flat-square)
![Language](https://img.shields.io/github/languages/top/vanhoangkha/Portfolio?style=flat-square)



> Solutions Architect | AWS, Azure, GCP | Cloud Architecture, AI/ML, DevSecOps

## 🚀 Overview

Personal portfolio website showcasing my experience as a Solutions Architect with 5 years of designing enterprise-scale cloud solutions. AWS Community Builder recognized for establishing Vietnam's premier cloud learning ecosystem serving 50,000 professionals.

## 📋 Features

- ✅ Responsive design optimized for all devices
- ✅ Progressive Web App (PWA) support
- ✅ SEO optimized with structured data
- ✅ Performance optimized (lazy loading, caching)
- ✅ Dark/Light theme toggle
- ✅ Interactive animations and effects
- ✅ Blog section ready
- ✅ Resume/CV page

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Modern UI with glass morphism effects
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **PWA**: Service Worker, Web Manifest

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main landing page
├── resume.html             # Resume/CV page
├── blog.html               # Blog listing page
├── css/                    # Stylesheets
│   ├── main.css           # Main styles
│   ├── animations.css     # Animation effects
│   └── ...
├── js/                     # JavaScript modules
│   ├── core/              # Core functionality
│   ├── features/          # Feature modules
│   ├── utils/             # Utility functions
│   └── premium/           # Premium UI effects
├── assets/                 # Images and media
├── infrastructure/         # AWS Amplify backend (optional)
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker
├── robots.txt             # SEO robots file
└── sitemap.xml            # SEO sitemap

```

## 🚀 Quick Start

### Local Development

```bash
# Install http-server (if not already installed)
npm install -g http-server

# Start local server
npm run dev

# Or use Python's built-in server
python3 -m http.server 8080
```

Then open http://localhost:8080 in your browser.

### Deploy to AWS Amplify

This project is configured for AWS Amplify hosting:

```bash
# Build specification is in infrastructure/amplify/
# Deployment is automatic via GitHub integration
```

## 📝 Customization

### Update Personal Information

1. Edit `index.html` - Update hero section, about, experience
2. Edit `resume.html` - Update professional resume content
3. Update meta tags in `<head>` sections for SEO

### Styling

- Main colors: Edit CSS variables in `css/main.css`
- Animations: Customize in `css/animations.css`
- Theme: Modify theme toggle in `js/core/themes.js`

## 📊 Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Total Bundle Size: ~500KB (with images)

## 🔒 Security

- Content Security Policy headers configured
- XSS protection enabled
- HTTPS-only (when deployed)
- Secure headers implemented

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👤 Author

**Kha Van Hoang**
- Email: khavan.work@gmail.com
- LinkedIn: [linkedin.com/in/vanhoangkha](https://linkedin.com/in/vanhoangkha)
- GitHub: [github.com/vanhoangkha](https://github.com/vanhoangkha)

## 🌟 Acknowledgments

- AWS Community for inspiration and support
- Open source community for amazing tools and libraries

---

**Built with ❤️ by Kha Van Hoang**
