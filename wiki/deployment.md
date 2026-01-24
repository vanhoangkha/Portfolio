# Deployment Guide

## 🚀 Deployment Options

### 1. GitLab Pages (Static)

Automatic deployment via CI/CD pipeline:

```yaml
pages:
  stage: deploy
  script:
    - cd react-portfolio
    - npm ci
    - npm run build
    - mv dist ../public
  artifacts:
    paths:
      - public
  only:
    - main
```

### 2. AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### 3. Kubernetes

```bash
# Build Docker image
docker build -t registry.gitlab.com/awsfirstcloudaijourney/portfolio:latest .

# Push to GitLab Container Registry
docker push registry.gitlab.com/awsfirstcloudaijourney/portfolio:latest

# Deploy to Kubernetes
kubectl apply -f k8s/deployment.yaml

# Check status
kubectl get pods -l app=portfolio
kubectl get svc portfolio-service
```

### 4. Docker Compose

```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

## 🔐 Environment Variables

Set these in GitLab CI/CD Settings:

- `AWS_ACCESS_KEY_ID` - AWS credentials
- `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `KUBE_CONFIG` - Kubernetes config (base64 encoded)
- `DOCKER_REGISTRY_USER` - Container registry username
- `DOCKER_REGISTRY_PASSWORD` - Container registry password

## 📊 Monitoring

- GitLab CI/CD pipeline status
- Kubernetes pod health checks
- Application performance monitoring
- Error tracking and logging

## 🔄 Rollback

```bash
# Kubernetes rollback
kubectl rollout undo deployment/portfolio

# Check rollout status
kubectl rollout status deployment/portfolio
```
