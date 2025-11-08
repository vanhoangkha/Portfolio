import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as actions from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Construct } from 'constructs';

interface MonitoringStackProps extends cdk.StackProps {
  environment: string;
  distribution: cloudfront.Distribution;
  bucket: s3.Bucket;
}

export class MonitoringStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MonitoringStackProps) {
    super(scope, id, props);

    // SNS Topic for alerts
    const alertTopic = new sns.Topic(this, 'AlertTopic', {
      topicName: `portfolio-${props.environment}-alerts`,
      displayName: `Portfolio ${props.environment} Alerts`,
    });

    // Add email subscription (configure via environment variable)
    if (process.env.ALERT_EMAIL) {
      alertTopic.addSubscription(
        new subscriptions.EmailSubscription(process.env.ALERT_EMAIL)
      );
    }

    // CloudWatch Dashboard
    const dashboard = new cloudwatch.Dashboard(this, 'Dashboard', {
      dashboardName: `Portfolio-${props.environment}`,
    });

    // CloudFront Metrics
    const requestsMetric = new cloudwatch.Metric({
      namespace: 'AWS/CloudFront',
      metricName: 'Requests',
      dimensionsMap: {
        DistributionId: props.distribution.distributionId,
      },
      statistic: 'Sum',
      period: cdk.Duration.minutes(5),
    });

    const errorRateMetric = new cloudwatch.MathExpression({
      expression: '(m1 / m2) * 100',
      usingMetrics: {
        m1: new cloudwatch.Metric({
          namespace: 'AWS/CloudFront',
          metricName: '5xxErrorRate',
          dimensionsMap: {
            DistributionId: props.distribution.distributionId,
          },
          statistic: 'Average',
        }),
        m2: requestsMetric,
      },
      period: cdk.Duration.minutes(5),
    });

    const bytesDownloadedMetric = new cloudwatch.Metric({
      namespace: 'AWS/CloudFront',
      metricName: 'BytesDownloaded',
      dimensionsMap: {
        DistributionId: props.distribution.distributionId,
      },
      statistic: 'Sum',
      period: cdk.Duration.minutes(5),
    });

    // Add widgets to dashboard
    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'CloudFront Requests',
        left: [requestsMetric],
        width: 12,
      }),
      new cloudwatch.GraphWidget({
        title: 'Error Rate',
        left: [errorRateMetric],
        width: 12,
      })
    );

    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Bytes Downloaded',
        left: [bytesDownloadedMetric],
        width: 12,
      }),
      new cloudwatch.SingleValueWidget({
        title: 'Total Requests (24h)',
        metrics: [requestsMetric],
        width: 12,
      })
    );

    // Alarms
    
    // High error rate alarm
    const errorRateAlarm = new cloudwatch.Alarm(this, 'HighErrorRate', {
      alarmName: `${props.environment}-HighErrorRate`,
      alarmDescription: 'Alert when error rate exceeds 5%',
      metric: new cloudwatch.Metric({
        namespace: 'AWS/CloudFront',
        metricName: '5xxErrorRate',
        dimensionsMap: {
          DistributionId: props.distribution.distributionId,
        },
        statistic: 'Average',
        period: cdk.Duration.minutes(5),
      }),
      threshold: 5,
      evaluationPeriods: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    errorRateAlarm.addAlarmAction(new actions.SnsAction(alertTopic));

    // High request count alarm (potential DDoS)
    const highRequestAlarm = new cloudwatch.Alarm(this, 'HighRequestCount', {
      alarmName: `${props.environment}-HighRequestCount`,
      alarmDescription: 'Alert when request count is abnormally high',
      metric: requestsMetric,
      threshold: 10000,
      evaluationPeriods: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    highRequestAlarm.addAlarmAction(new actions.SnsAction(alertTopic));

    // Low cache hit rate alarm
    const cacheHitRateAlarm = new cloudwatch.Alarm(this, 'LowCacheHitRate', {
      alarmName: `${props.environment}-LowCacheHitRate`,
      alarmDescription: 'Alert when cache hit rate is too low',
      metric: new cloudwatch.Metric({
        namespace: 'AWS/CloudFront',
        metricName: 'CacheHitRate',
        dimensionsMap: {
          DistributionId: props.distribution.distributionId,
        },
        statistic: 'Average',
        period: cdk.Duration.minutes(30),
      }),
      threshold: 70,
      evaluationPeriods: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    cacheHitRateAlarm.addAlarmAction(new actions.SnsAction(alertTopic));

    // Outputs
    new cdk.CfnOutput(this, 'DashboardURL', {
      value: `https://console.aws.amazon.com/cloudwatch/home?region=${this.region}#dashboards:name=${dashboard.dashboardName}`,
      description: 'CloudWatch Dashboard URL',
    });

    new cdk.CfnOutput(this, 'AlertTopicArn', {
      value: alertTopic.topicArn,
      description: 'SNS Topic ARN for alerts',
    });
  }
}
