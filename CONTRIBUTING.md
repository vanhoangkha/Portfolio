# Contributing to Portfolio

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vanhoangkha/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the site**
   Open http://localhost:8080 in your browser

## Code Quality

### Linting
Run ESLint to check code quality:
```bash
npm run lint        # Auto-fix issues
npm run lint:check  # Check only
```

### Formatting
Use Prettier for consistent code formatting:
```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

### Validation
Run all checks before committing:
```bash
npm run validate
```

## Coding Standards

### JavaScript
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused
- Avoid console.log in production code (use logger utility)

### CSS
- Follow BEM naming convention
- Use CSS custom properties for theming
- Mobile-first responsive design
- Maintain consistent spacing

### HTML
- Semantic HTML5 elements
- Proper heading hierarchy
- Alt text for all images
- ARIA labels for accessibility

## Commit Messages

Follow conventional commits format:
```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

Example:
```
feat(blog): add search functionality

Implemented client-side search for blog posts with debouncing
and highlighting of search terms.

Closes #123
```

## Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes
3. Run validation: `npm run validate`
4. Commit with conventional commit messages
5. Push to your fork
6. Create a Pull Request to `develop` branch
7. Wait for review and CI checks to pass

## Testing

### Manual Testing Checklist
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Check accessibility with screen reader
- [ ] Verify all links work
- [ ] Test form submissions
- [ ] Check PWA functionality
- [ ] Verify dark/light theme toggle

### Performance Testing
- Run Lighthouse audit (target: 90+ scores)
- Check Core Web Vitals
- Test on slow 3G connection

## Accessibility

Ensure all contributions meet WCAG 2.1 Level AA:
- Proper heading structure
- Sufficient color contrast
- Keyboard navigation support
- Screen reader compatibility
- Alt text for images
- ARIA labels where needed

## Browser Support

Target browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the code
- Suggestions for improvements

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
