import * as cdk from 'aws-cdk-lib';
import * as cloudtrail from 'aws-cdk-lib/aws-cloudtrail';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as config from 'aws-cdk-lib/aws-config';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

interface SecurityStackProps extends cdk.StackProps {
  environment: string;
}

export class SecurityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SecurityStackProps) {
    super(scope, id, props);

    // KMS Key for encryption
    const key = new kms.Key(this, 'SecurityKey', {
      description: `Encryption key for ${props.environment} portfolio security`,
      enableKeyRotation: true,
      removalPolicy: props.environment === 'production'
        ? cdk.RemovalPolicy.RETAIN
        : cdk.RemovalPolicy.DESTROY,
    });

    // S3 Bucket for CloudTrail logs
    const cloudTrailBucket = new s3.Bucket(this, 'CloudTrailBucket', {
      bucketName: `portfolio-cloudtrail-${props.environment}-${this.account}`,
      encryption: s3.BucketEncryption.KMS,
      encryptionKey: key,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(365),
          transitions: [
            {
              storageClass: s3.StorageClass.GLACIER,
              transitionAfter: cdk.Duration.days(90),
            },
          ],
        },
      ],
    });

    // CloudTrail
    const trail = new cloudtrail.Trail(this, 'CloudTrail', {
      trailName: `Portfolio-${props.environment}`,
      bucket: cloudTrailBucket,
      encryptionKey: key,
      enableFileValidation: true,
      includeGlobalServiceEvents: true,
      isMultiRegionTrail: true,
      managementEvents: cloudtrail.ReadWriteType.ALL,
    });

    // SNS Topic for Config compliance notifications
    const complianceTopic = new sns.Topic(this, 'ComplianceTopic', {
      topicName: `portfolio-${props.environment}-compliance`,
      displayName: `Portfolio ${props.environment} Compliance Notifications`,
    });

    // AWS Config
    const configBucket = new s3.Bucket(this, 'ConfigBucket', {
      bucketName: `portfolio-config-${props.environment}-${this.account}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Config Recorder
    const configRecorder = new config.CfnConfigurationRecorder(this, 'ConfigRecorder', {
      roleArn: `arn:aws:iam::${this.account}:role/aws-service-role/config.amazonaws.com/AWSServiceRoleForConfig`,
      recordingGroup: {
        allSupported: true,
        includeGlobalResourceTypes: true,
      },
    });

    const configDeliveryChannel = new config.CfnDeliveryChannel(this, 'ConfigDeliveryChannel', {
      s3BucketName: configBucket.bucketName,
      snsTopicArn: complianceTopic.topicArn,
      configSnapshotDeliveryProperties: {
        deliveryFrequency: 'TwentyFour_Hours',
      },
    });

    configDeliveryChannel.addDependency(configRecorder);

    // AWS Config Rules

    // S3 Bucket encryption rule
    new config.ManagedRule(this, 'S3BucketEncryptionRule', {
      configRuleName: 's3-bucket-server-side-encryption-enabled',
      identifier: 'S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED',
      description: 'Checks that S3 buckets have encryption enabled',
    });

    // CloudTrail enabled rule
    new config.ManagedRule(this, 'CloudTrailEnabledRule', {
      configRuleName: 'cloudtrail-enabled',
      identifier: 'CLOUD_TRAIL_ENABLED',
      description: 'Checks that CloudTrail is enabled',
    });

    // IAM password policy rule
    new config.ManagedRule(this, 'IAMPasswordPolicyRule', {
      configRuleName: 'iam-password-policy',
      identifier: 'IAM_PASSWORD_POLICY',
      description: 'Checks that IAM password policy meets requirements',
    });

    // Root account MFA rule
    new config.ManagedRule(this, 'RootAccountMFARule', {
      configRuleName: 'root-account-mfa-enabled',
      identifier: 'ROOT_ACCOUNT_MFA_ENABLED',
      description: 'Checks that root account has MFA enabled',
    });

    // DynamoDB point-in-time recovery rule
    new config.ManagedRule(this, 'DynamoDBPITRRule', {
      configRuleName: 'dynamodb-pitr-enabled',
      identifier: 'DYNAMODB_PITR_ENABLED',
      description: 'Checks that DynamoDB tables have point-in-time recovery enabled',
    });

    // GuardDuty (Enable manually via Console or CLI - CDK support limited)
    // aws guardduty create-detector --enable

    // Outputs
    new cdk.CfnOutput(this, 'CloudTrailArn', {
      value: trail.trailArn,
      description: 'CloudTrail ARN',
    });

    new cdk.CfnOutput(this, 'ComplianceTopicArn', {
      value: complianceTopic.topicArn,
      description: 'Compliance notification topic ARN',
    });

    new cdk.CfnOutput(this, 'EncryptionKeyId', {
      value: key.keyId,
      description: 'KMS encryption key ID',
    });
  }
}
