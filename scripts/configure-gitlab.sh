#!/bin/bash

# GitLab Project Configuration Script
# Usage: ./configure-gitlab.sh <GITLAB_TOKEN>

set -e

GITLAB_TOKEN="${1:-$GITLAB_TOKEN}"
PROJECT_ID="awsfirstcloudaijourney%2FPortfolio"
GITLAB_API="https://gitlab.com/api/v4"

if [ -z "$GITLAB_TOKEN" ]; then
    echo "Error: GitLab token required"
    echo "Usage: ./configure-gitlab.sh <GITLAB_TOKEN>"
    echo "Or set GITLAB_TOKEN environment variable"
    exit 1
fi

echo "🔧 Configuring GitLab project..."

# Enable Auto DevOps
echo "📦 Enabling Auto DevOps..."
curl --silent --request PUT "${GITLAB_API}/projects/${PROJECT_ID}" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --data "auto_devops_enabled=true" \
  --data "auto_devops_deploy_strategy=continuous" | jq -r '.auto_devops_enabled'

# Enable Wiki
echo "📚 Enabling Wiki..."
curl --silent --request PUT "${GITLAB_API}/projects/${PROJECT_ID}" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --data "wiki_enabled=true" | jq -r '.wiki_enabled'

# Enable Issues
echo "🐛 Enabling Issues..."
curl --silent --request PUT "${GITLAB_API}/projects/${PROJECT_ID}" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --data "issues_enabled=true" | jq -r '.issues_enabled'

# Enable Merge Requests
echo "🔀 Enabling Merge Requests..."
curl --silent --request PUT "${GITLAB_API}/projects/${PROJECT_ID}" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --data "merge_requests_enabled=true" | jq -r '.merge_requests_enabled'

# Enable CI/CD
echo "🚀 Enabling CI/CD..."
curl --silent --request PUT "${GITLAB_API}/projects/${PROJECT_ID}" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --data "builds_enabled=true" \
  --data "shared_runners_enabled=true" | jq -r '.builds_enabled'

# Enable Container Registry
echo "🐳 Enabling Container Registry..."
curl --silent --request PUT "${GITLAB_API}/projects/${PROJECT_ID}" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --data "container_registry_enabled=true" | jq -r '.container_registry_enabled'

# Enable Security features
echo "🔒 Enabling Security features..."
curl --silent --request PUT "${GITLAB_API}/projects/${PROJECT_ID}" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --data "security_and_compliance_enabled=true"

# Set default branch protection
echo "🛡️ Configuring branch protection..."
curl --silent --request POST "${GITLAB_API}/projects/${PROJECT_ID}/protected_branches" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  --data "name=main" \
  --data "push_access_level=40" \
  --data "merge_access_level=30" \
  --data "allow_force_push=false" 2>/dev/null || echo "Branch protection already exists"

# Create CI/CD variables (examples)
echo "🔐 Setting up CI/CD variables..."
# Add your variables here
# curl --request POST "${GITLAB_API}/projects/${PROJECT_ID}/variables" \
#   --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
#   --data "key=AWS_ACCESS_KEY_ID" \
#   --data "value=YOUR_VALUE" \
#   --data "protected=true" \
#   --data "masked=true"

echo ""
echo "✅ GitLab project configuration complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add Kubernetes cluster: https://gitlab.com/awsfirstcloudaijourney/Portfolio/-/clusters"
echo "2. Configure integrations: https://gitlab.com/awsfirstcloudaijourney/Portfolio/-/settings/integrations"
echo "3. Set up CI/CD variables: https://gitlab.com/awsfirstcloudaijourney/Portfolio/-/settings/ci_cd"
echo "4. Create Wiki pages: https://gitlab.com/awsfirstcloudaijourney/Portfolio/-/wikis/home"
echo ""
echo "🔗 Project URL: https://gitlab.com/awsfirstcloudaijourney/Portfolio"
