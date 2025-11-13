# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please email:
**khavan.work@gmail.com**

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Measures

### Content Security Policy
- XSS protection enabled
- Frame options configured
- Referrer policy set

### HTTPS Only
- All resources served over HTTPS
- HSTS headers configured

### Input Validation
- Form inputs sanitized
- XSS prevention
- CSRF protection

### Dependencies
- Regular security audits
- Automated vulnerability scanning
- Timely updates

## Best Practices

1. Never commit sensitive data
2. Use environment variables
3. Validate all user inputs
4. Keep dependencies updated
5. Follow OWASP guidelines
