#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PortfolioInfrastructureStack } from '../lib/portfolio-stack';
import { MonitoringStack } from '../lib/monitoring-stack';
import { SecurityStack } from '../lib/security-stack';

const app = new cdk.App();

// Get environment from context
const environment = app.node.tryGetContext('environment') || 'development';
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION || 'us-east-1';

// Common tags for all resources
const commonTags = {
  Project: 'Portfolio',
  Environment: environment,
  ManagedBy: 'CDK',
  Owner: 'Kha Van Hoang',
  CostCenter: 'Engineering'
};

// Main infrastructure stack
const infraStack = new PortfolioInfrastructureStack(app, `Portfolio-${environment}`, {
  env: { account, region },
  environment,
  tags: commonTags,
  description: 'Main portfolio infrastructure with CloudFront, S3, and WAF'
});

// Security stack
const securityStack = new SecurityStack(app, `PortfolioSecurity-${environment}`, {
  env: { account, region },
  environment,
  tags: commonTags,
  description: 'Security infrastructure with CloudTrail, Config, and GuardDuty'
});

// Monitoring stack
const monitoringStack = new MonitoringStack(app, `PortfolioMonitoring-${environment}`, {
  env: { account, region },
  environment,
  distribution: infraStack.distribution,
  bucket: infraStack.bucket,
  tags: commonTags,
  description: 'Monitoring infrastructure with CloudWatch dashboards and alarms'
});

app.synth();
