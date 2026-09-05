import { PrismaClient, Role } from '../../prisma/generated';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const DEFAULT_SETTINGS = [
  // Platform & Legal Details
  {
    key: 'PLATFORM_NAME',
    value: 'ImpactBridge CSR & DPI Platform',
    category: 'PLATFORM',
    isSecret: false,
    description: 'Public name of the CSR platform',
  },
  {
    key: 'SUPPORT_EMAIL',
    value: 'support@impactbridge.org',
    category: 'PLATFORM',
    isSecret: false,
    description: 'Public support and compliance email address',
  },
  {
    key: 'DEFAULT_COUNTRY',
    value: 'India',
    category: 'PLATFORM',
    isSecret: false,
    description: 'Primary legal jurisdiction for CSR compliance',
  },
  {
    key: 'DEFAULT_CURRENCY',
    value: 'INR',
    category: 'PLATFORM',
    isSecret: false,
    description: 'Default platform reporting currency',
  },
  {
    key: 'SESSION_TIMEOUT_MINUTES',
    value: '60',
    category: 'PLATFORM',
    isSecret: false,
    description: 'Session idle timeout in minutes',
  },
  {
    key: 'REQUIRE_2FA_ADMINS',
    value: 'true',
    category: 'PLATFORM',
    isSecret: false,
    description: 'Require Two-Factor Authentication for administrative roles',
  },

  // Cloud File Storage (S3 / Cloudflare R2 / MinIO)
  {
    key: 'STORAGE_PROVIDER',
    value: 'AWS_S3',
    category: 'STORAGE',
    isSecret: false,
    description: 'Object storage provider: AWS_S3, CLOUDFLARE_R2, or MINIO',
  },
  {
    key: 'STORAGE_BUCKET',
    value: 'impactbridge-compliance-vault',
    category: 'STORAGE',
    isSecret: false,
    description: 'S3/R2 Bucket name for audit certificates and documents',
  },
  {
    key: 'STORAGE_REGION',
    value: 'ap-south-1',
    category: 'STORAGE',
    isSecret: false,
    description: 'Storage region (e.g., ap-south-1, us-east-1)',
  },
  {
    key: 'STORAGE_ACCESS_KEY_ID',
    value: 'AKIAIOSFODNN7EXAMPLE',
    category: 'STORAGE',
    isSecret: false,
    description: 'Cloud storage IAM Access Key ID',
  },
  {
    key: 'STORAGE_SECRET_ACCESS_KEY',
    value: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    category: 'STORAGE',
    isSecret: true,
    description: 'Cloud storage IAM Secret Access Key',
  },
  {
    key: 'STORAGE_CUSTOM_ENDPOINT',
    value: '',
    category: 'STORAGE',
    isSecret: false,
    description: 'Optional custom endpoint URL for Cloudflare R2 / MinIO',
  },

  // Email & Communications Gateway
  {
    key: 'NOTIFICATION_PROVIDER',
    value: 'RESEND',
    category: 'COMMUNICATION',
    isSecret: false,
    description: 'Email provider: RESEND, SENDGRID, AWS_SES, or SMTP',
  },
  {
    key: 'NOTIFICATION_API_KEY',
    value: 're_123456789_abcdefg',
    category: 'COMMUNICATION',
    isSecret: true,
    description: 'Transactional email service API key',
  },
  {
    key: 'NOTIFICATION_FROM_EMAIL',
    value: 'notifications@impactbridge.org',
    category: 'COMMUNICATION',
    isSecret: false,
    description: 'Verified sender email address for alerts and receipts',
  },
  {
    key: 'NOTIFICATION_WEBHOOK_SECRET',
    value: 'whsec_sample123456',
    category: 'COMMUNICATION',
    isSecret: true,
    description: 'Webhook signing secret for incoming delivery callbacks',
  },

  // Payment & Payout Gateways
  {
    key: 'PAYMENT_PROVIDER',
    value: 'RAZORPAY',
    category: 'PAYMENTS',
    isSecret: false,
    description: 'Payment gateway provider: RAZORPAY, STRIPE, or CASHFREE',
  },
  {
    key: 'PAYMENT_KEY_ID',
    value: 'rzp_test_1DP5mmOlF5G5ag',
    category: 'PAYMENTS',
    isSecret: false,
    description: 'Public Key ID / Publishable Key for donation checkouts',
  },
  {
    key: 'PAYMENT_KEY_SECRET',
    value: 's9sampleRazorpaySecretKey2026',
    category: 'PAYMENTS',
    isSecret: true,
    description: 'Secret Key for payment verification and webhooks',
  },
  {
    key: 'PAYMENT_WEBHOOK_SECRET',
    value: 'rzp_whsec_sampleKey2026',
    category: 'PAYMENTS',
    isSecret: true,
    description: 'Signing secret for payment webhook signature validation',
  },

  // CSR Statutory Rules & Compliance Parameters
  {
    key: 'CSR_MANDATE_PERCENTAGE',
    value: '2.0',
    category: 'CSR_REGULATORY',
    isSecret: false,
    description: 'Statutory CSR rate under Section 135 (default 2.0%)',
  },
  {
    key: 'CSR_FINANCIAL_YEAR_START_MONTH',
    value: '4',
    category: 'CSR_REGULATORY',
    isSecret: false,
    description: 'Financial year start month (4 for April in India)',
  },
  {
    key: 'CSR_MIN_NET_WORTH_INR_CRORES',
    value: '500',
    category: 'CSR_REGULATORY',
    isSecret: false,
    description: 'Minimum Net Worth threshold in Crores qualifying for CSR mandate',
  },
  {
    key: 'CSR_MIN_TURNOVER_INR_CRORES',
    value: '1000',
    category: 'CSR_REGULATORY',
    isSecret: false,
    description: 'Minimum Turnover threshold in Crores qualifying for CSR mandate',
  },
  {
    key: 'CSR_MIN_NET_PROFIT_INR_CRORES',
    value: '5',
    category: 'CSR_REGULATORY',
    isSecret: false,
    description: 'Minimum Net Profit threshold in Crores qualifying for CSR mandate',
  },

  // Dynamic Feature Flags
  {
    key: 'FLAG_API_DASHBOARD',
    value: 'true',
    category: 'FEATURE_FLAGS',
    isSecret: false,
    description: 'Enable live API-backed dashboards platform-wide',
  },
  {
    key: 'FLAG_API_NGO_FINANCIAL',
    value: 'true',
    category: 'FEATURE_FLAGS',
    isSecret: false,
    description: 'Enable NGO financial report uploads and validation',
  },
  {
    key: 'FLAG_API_PROGRAMME',
    value: 'true',
    category: 'FEATURE_FLAGS',
    isSecret: false,
    description: 'Enable CSR programme management and assignment',
  },
  {
    key: 'FLAG_REALTIME_NOTIFICATIONS',
    value: 'true',
    category: 'FEATURE_FLAGS',
    isSecret: false,
    description: 'Enable live real-time notification feeds',
  },
];

async function main() {
  const email = 'admiin@acadifysolution.com';
  const password = 'Acadify@2026!';
  const name = 'Verify Super Admin';

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    },
    create: {
      email,
      password: hashedPassword,
      name,
      role: Role.SUPER_ADMIN,
    },
  });

  console.log('Super Admin User Created/Updated:', user.email);

  // Seed default platform settings
  let seededCount = 0;
  for (const setting of DEFAULT_SETTINGS) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      create: {
        key: setting.key,
        value: setting.value,
        category: setting.category,
        isSecret: setting.isSecret,
        description: setting.description,
        updatedBy: user.id,
      },
      update: {
        category: setting.category,
        description: setting.description,
      },
    });
    seededCount++;
  }

  console.log(`Platform Settings Configured (${seededCount} keys active).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
