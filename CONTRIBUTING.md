# Contributing to Portfolio Project

First off, thank you for considering contributing to this project! It's people like you that make this portfolio a great showcase.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected
- Include screenshots if relevant
- Include your environment details (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- List examples of how the enhancement would be used

### Pull Requests

1. Fork the repository and create your branch from `master`
2. Follow the existing code style and conventions
3. Write clear, concise commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
4. Update documentation as needed
5. Test your changes thoroughly
6. Submit a pull request with a clear description of your changes

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup Instructions

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# For backend development
cd backend
npm install

# Run development server
npm run dev
```

### Project Structure

```
Portfolio/
├── frontend/          # Static frontend files
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript modules
│   └── assets/       # Images, fonts, etc.
├── backend/          # Node.js backend API
│   └── src/          # Source code
├── config/           # Configuration files
├── scripts/          # Build and deployment scripts
├── docs/             # Documentation
└── database/         # Database schemas and migrations
```

## Coding Standards

### Git Commit Messages

- Use conventional commits format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep the first line under 72 characters
- Use the imperative mood ("Add feature" not "Added feature")

Examples:
```
feat(blog): add pagination to blog posts
fix(api): resolve CORS issue in authentication
docs(readme): update installation instructions
refactor(frontend): consolidate CSS utility classes
```

### Code Style

- Use 2 spaces for indentation
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing patterns in the codebase
- Keep functions small and focused
- Avoid deep nesting

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for meaningful test coverage

## Questions?

Feel free to open an issue with your question or reach out through the contact methods listed in the README.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
