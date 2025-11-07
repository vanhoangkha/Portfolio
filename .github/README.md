# GitHub Configuration

This directory contains GitHub-specific configuration files for the Portfolio project.

## Contents

```
.github/
├── workflows/              # GitHub Actions workflows
│   ├── ci.yml             # Continuous Integration
│   └── deploy.yml         # Deployment workflow
├── ISSUE_TEMPLATE/        # Issue templates
│   ├── bug_report.md      # Bug report template
│   └── feature_request.md # Feature request template
├── PULL_REQUEST_TEMPLATE.md # PR template
└── README.md              # This file
```

## GitHub Actions Workflows

### CI Workflow (`workflows/ci.yml`)

Runs on every push and pull request to `master`, `main`, or `develop` branches.

**Jobs:**
1. **Lint** - Code style checking
   - Runs ESLint
   - Checks formatting with Prettier

2. **Test** - Runs test suite
   - Unit tests
   - Integration tests

3. **Build** - Builds the project
   - Frontend build
   - Backend build
   - Uploads artifacts

4. **Security** - Security audits
   - npm audit
   - Dependency vulnerabilities

**Status Badge:**
```markdown
![CI](https://github.com/vanhoangkha/Portfolio/workflows/CI/badge.svg)
```

---

### Deploy Workflow (`workflows/deploy.yml`)

Deploys to production when code is pushed to `master` or `main` branch.

**Steps:**
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Build project
5. Configure AWS credentials
6. Deploy to S3
7. Invalidate CloudFront cache

**Required Secrets:**

Add these in GitHub repository settings → Secrets and variables → Actions:

| Secret Name | Description | Required |
|------------|-------------|----------|
| `AWS_ACCESS_KEY_ID` | AWS access key | Yes |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Yes |
| `AWS_REGION` | AWS region | No (default: ap-southeast-1) |
| `S3_BUCKET_NAME` | S3 bucket name | Yes |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront ID | No |

**Manual Trigger:**

You can also trigger deployment manually:
1. Go to Actions tab
2. Select "Deploy to AWS" workflow
3. Click "Run workflow"
4. Select branch and run

---

## Issue Templates

### Bug Report

Use this template when reporting bugs. It includes:
- Bug description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots

**Creating a bug report:**
1. Go to Issues → New Issue
2. Select "Bug Report"
3. Fill in the template
4. Submit

### Feature Request

Use this template for suggesting new features:
- Feature description
- Problem statement
- Proposed solution
- Alternatives considered
- Use case
- Priority level

**Creating a feature request:**
1. Go to Issues → New Issue
2. Select "Feature Request"
3. Fill in the template
4. Submit

---

## Pull Request Template

The PR template ensures all pull requests include:
- Description of changes
- Type of change (bug fix, feature, etc.)
- Related issues
- Testing details
- Checklist for code quality, documentation, security

**Creating a pull request:**
1. Push your branch to GitHub
2. Click "New Pull Request"
3. The template will auto-populate
4. Fill in all sections
5. Check all applicable boxes
6. Submit for review

---

## Setting Up Workflows

### First Time Setup

1. **Enable GitHub Actions:**
   - Go to repository Settings
   - Click on "Actions" → "General"
   - Enable "Allow all actions and reusable workflows"

2. **Add Secrets:**
   ```
   Settings → Secrets and variables → Actions → New repository secret
   ```

3. **Configure Branch Protection:**
   ```
   Settings → Branches → Add branch protection rule
   ```
   - Require pull request reviews
   - Require status checks to pass
   - Require linear history

### Testing Workflows Locally

Use [act](https://github.com/nektos/act) to test workflows locally:

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run CI workflow
act push

# Run specific job
act -j lint

# List available workflows
act -l
```

---

## Workflow Customization

### Adding New Jobs

Edit workflow files in `.github/workflows/`:

```yaml
jobs:
  your-job-name:
    name: Your Job Display Name
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Your Step
        run: your-command
```

### Conditional Execution

Run jobs only on specific conditions:

```yaml
jobs:
  deploy:
    if: github.ref == 'refs/heads/main'
    # ... job steps
```

### Using Outputs

Pass data between jobs:

```yaml
jobs:
  job1:
    outputs:
      version: ${{ steps.get-version.outputs.version }}
    steps:
      - id: get-version
        run: echo "version=1.0.0" >> $GITHUB_OUTPUT

  job2:
    needs: job1
    steps:
      - run: echo ${{ needs.job1.outputs.version }}
```

---

## Best Practices

### Security
- Never commit secrets to workflow files
- Use GitHub Secrets for sensitive data
- Limit workflow permissions
- Review third-party actions

### Performance
- Cache dependencies with `actions/cache`
- Use matrix builds for parallel testing
- Skip unnecessary jobs with conditions
- Use `continue-on-error` for non-critical steps

### Maintenance
- Keep actions up to date
- Review workflow runs regularly
- Monitor action usage limits
- Document custom workflows

---

## Troubleshooting

### Workflow Fails

1. Check workflow run logs in Actions tab
2. Verify all required secrets are set
3. Test locally with `act`
4. Check for syntax errors in YAML

### Deployment Issues

1. Verify AWS credentials are valid
2. Check S3 bucket permissions
3. Verify CloudFront distribution ID
4. Check AWS region configuration

### Permission Errors

```yaml
permissions:
  contents: read
  deployments: write
```

Add appropriate permissions to workflow.

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Actions Debugging](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows)

---

## Support

For workflow-related issues:
1. Check GitHub Actions status page
2. Review workflow logs
3. Open an issue using the bug report template
4. Contact: khavan.work@gmail.com
