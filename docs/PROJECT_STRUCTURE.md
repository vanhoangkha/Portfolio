# Cấu trúc Project Portfolio

Tài liệu này mô tả cấu trúc thư mục của project Portfolio sau khi được tổ chức lại.

## Cấu trúc Thư mục

```
Portfolio/
│
├── index.html # Trang chủ chính
├── resume.html # Trang Resume/CV
├── blog.html # Trang blog
├── manifest.json # PWA manifest
├── sw.js # Service worker
├── robots.txt # SEO robots file
├── sitemap.xml # SEO sitemap
├── LICENSE # License file
├── README.md # Tài liệu chính
│
├── css/ # Stylesheets
│   ├── main.css
│   ├── consolidated.css
│   ├── minimal.css
│   ├── components/
│   ├── core/
│   ├── enhancements/
│   ├── features/
│   └── premium/
│
├── js/ # JavaScript modules
│   ├── main.js
│   ├── backend-integration.js
│   ├── api/
│   ├── config/
│   ├── core/
│   ├── features/
│   ├── premium/
│   └── utils/
│
├── assets/ # Tài nguyên (hình ảnh, fonts, icons)
│   ├── documents/
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── docs/ # Tài liệu
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md
│   ├── SECURITY.md
│   ├── PERFORMANCE.md
│   ├── IMPROVEMENTS.md
│   ├── UI_COMPONENTS.md
│   ├── UI_ENHANCEMENTS_GUIDE.md
│   ├── PHASE2_*.md
│   ├── REACT_REFACTOR_COMPLETE.md
│   ├── RESUME_UPDATE_SUMMARY.md
│   └── QUICK_START.txt
│
├── scripts/ # Shell scripts
│   ├── push-to-github.sh
│   ├── setup-github-token.sh
│   ├── configure-gitlab.sh
│   └── QUICK_DEPLOY.sh
│
├── config/ # File cấu hình
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vercel.json
│   └── .dockerignore
│
├── deployment/ # Hướng dẫn deployment
│   ├── AWS_DEPLOYMENT_GUIDE.md
│   ├── GITHUB_PAGES_DEPLOY.md
│   ├── VERCEL_CICD_SETUP.md
│   └── DEPLOY_INSTRUCTIONS.txt
│
├── demos/ # File demo và test
│   ├── demo-ui.html
│   ├── preview.html
│   └── test.html
│
├── logs/ # Log files
│   ├── server.log
│   └── server8000.log
│
├── infrastructure/ # AWS Amplify backend
│   ├── amplify/
│   ├── bin/
│   ├── lib/
│   └── ...
│
├── k8s/ # Kubernetes configs
│
├── web/ # Next.js version (nếu có)
│
├── react-portfolio/ # React version (nếu có)
│
└── wiki/ # Wiki documentation
```

## Mô tả các Thư mục

### Root Level Files
- **HTML files** (`index.html`, `resume.html`, `blog.html`): Các trang chính của website
- **PWA files** (`manifest.json`, `sw.js`): Progressive Web App configuration
- **SEO files** (`robots.txt`, `sitemap.xml`): Search Engine Optimization

### css/
Chứa tất cả các file stylesheet, được tổ chức theo modules:
- `main.css`: Styles chính
- `components/`: Styles cho các components
- `core/`: Core styles
- `features/`: Feature-specific styles
- `premium/`: Premium UI effects

### js/
Chứa tất cả các JavaScript modules:
- `main.js`: Entry point
- `core/`: Core functionality
- `features/`: Feature modules
- `utils/`: Utility functions
- `premium/`: Premium UI effects

### assets/
Chứa tất cả tài nguyên tĩnh:
- `images/`: Hình ảnh
- `fonts/`: Font files
- `icons/`: Icon files
- `documents/`: Document files

### docs/
Tất cả các file tài liệu markdown và text:
- Documentation về project
- Changelog, contributing guidelines
- Security và performance docs
- Phase completion summaries

### scripts/
Các shell scripts để tự động hóa tasks:
- Deployment scripts
- Setup scripts
- CI/CD scripts

### config/
Các file cấu hình cho deployment và infrastructure:
- `Dockerfile`: Docker configuration
- `nginx.conf`: Nginx configuration
- `vercel.json`: Vercel configuration

### deployment/
Các hướng dẫn và guides về deployment:
- AWS deployment guide
- GitHub Pages deployment
- Vercel CI/CD setup
- General deployment instructions

### demos/
Các file demo và test:
- UI demos
- Preview files
- Test files

### logs/
Các log files (thường được gitignore)

## Migration Notes

Sau khi tổ chức lại:
- Tất cả documentation files đã được di chuyển vào `docs/`
- Tất cả scripts đã được di chuyển vào `scripts/`
- Tất cả config files đã được di chuyển vào `config/`
- Tất cả deployment guides đã được di chuyển vào `deployment/`
- Demo và test files đã được di chuyển vào `demos/`
- Log files đã được di chuyển vào `logs/`

## Lưu ý

- README.md vẫn ở root level (chuẩn cho GitHub)
- Các file PWA (manifest.json, sw.js) vẫn ở root level (yêu cầu của PWA)
- Các file SEO (robots.txt, sitemap.xml) vẫn ở root level (yêu cầu của search engines)
- Các file config như `.gitignore`, `.eslintrc.json`, `.prettierrc` vẫn ở root level (chuẩn cho các tools)

