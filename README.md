# Kha Van Hoang - Portfolio & Blog

A modern, responsive portfolio and personal blog showcasing cloud architecture, AI/ML, and DevSecOps expertise.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Features

### Portfolio
- **Modern Design**: Clean, professional UI with smooth animations
- **Dark/Light Mode**: Toggle between themes with keyboard shortcut (Press 'T')
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Animations**: Scroll-triggered animations and floating elements
- **Smooth Navigation**: Seamless scrolling between sections

### Sections
1. **Hero**: Dynamic typing animation showcasing roles and expertise
2. **About**: Professional summary with key achievements and stats counter
3. **Experience**: Timeline view of career journey
4. **Projects**: Grid showcase of featured projects with hover effects
5. **Blog**: Featured blog posts with categories and filtering
6. **Skills**: Categorized technical skills and certifications
7. **Community Impact**: Highlighting community contributions
8. **Contact**: Contact form and social links

### Blog
- **Dedicated Blog Page**: Full blog experience with filtering
- **Categories**: Cloud Architecture, AI & ML, DevSecOps, Community, Career
- **Featured Posts**:
  - Building Multi-Cloud Architectures
  - Implementing RAG Systems with AWS Bedrock
  - Zero-Trust Security in Kubernetes
  - Growing Tech Communities
  - Multi-Agent AI Systems
  - Career Journey and more...

## Quick Start

### Option 1: Direct Open
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
For the best experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## File Structure

```
Portfolio/
├── index.html              # Main portfolio page
├── blog.html              # Blog page with full posts
├── styles.css             # All styles (includes blog styles)
├── script.js              # Main JavaScript (navigation, animations, etc.)
├── blog.js                # Blog-specific JavaScript (filtering, rendering)
├── README.md              # This file
└── KHA VAN HOANG 2025.pdf # CV/Resume
```

## Keyboard Shortcuts

- **T**: Toggle dark/light theme
- **Escape**: Close mobile menu

## Customization

### Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #FF9900;      /* AWS Orange */
    --secondary-color: #232F3E;    /* Dark Blue */
    --accent-color: #146EB4;       /* Blue */
}
```

### Content
- **Portfolio**: Edit sections in `index.html`
- **Blog Posts**: Add/edit posts in `blog.js` > `blogPosts` array
- **Full Blog Articles**: Add new `<section id="post-X">` in `blog.html`

### Adding New Blog Post

1. Add post data to `blog.js`:
```javascript
{
    id: 10,
    title: 'Your Post Title',
    excerpt: 'Short description...',
    category: 'Category Name',
    categorySlug: 'category-slug',
    date: 'Jan 20, 2025',
    readTime: '5 min read',
    tags: ['Tag1', 'Tag2'],
    icon: 'fa-icon-name'
}
```

2. Add full content in `blog.html`:
```html
<section id="post-10" class="blog-post section" style="display: none;">
    <!-- Full blog post content -->
</section>
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, Animations
- **Vanilla JavaScript**: No frameworks, pure JS for performance
- **Font Awesome**: Icons
- **Google Fonts**: Inter & JetBrains Mono

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Fast Load Time**: Minimal dependencies
- **Optimized Images**: SVG icons for scalability
- **Lazy Loading**: Blog posts loaded on demand
- **Smooth Animations**: 60fps animations with CSS transforms

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast in both themes
- Screen reader friendly

## SEO Features

- Meta tags for social sharing
- Semantic markup
- Clean URLs (hash-based navigation)
- Fast page load

## Deployment

### GitHub Pages
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

# Enable GitHub Pages in repository settings
# Select branch: main, folder: / (root)
```

### Netlify
```bash
# Drag and drop the Portfolio folder to Netlify
# Or connect your GitHub repo
```

### AWS S3 + CloudFront
```bash
# Upload files to S3 bucket
aws s3 sync . s3://your-bucket-name --exclude ".git/*"

# Configure CloudFront distribution
# Enable HTTPS with ACM certificate
```

## License

© 2025 Kha Van Hoang. All rights reserved.

## Contact

- **Email**: khavan.work@gmail.com
- **LinkedIn**: [linkedin.com/in/vanhoangkha](https://linkedin.com/in/vanhoangkha)
- **GitHub**: [github.com/vanhoangkha](https://github.com/vanhoangkha)
- **Portfolio**: [cloudjourney.awsstudygroup.com](https://cloudjourney.awsstudygroup.com)

## Acknowledgments

- Built with ❤️ and ☕
- Inspired by modern web design trends
- Community feedback from AWS Study Group

---

**Note**: This portfolio is continuously updated with new projects and blog posts. Check back often for new content!
