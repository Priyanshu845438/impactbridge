import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SettingItemDto } from './dto/update-system-settings.dto';

export interface MaskedSystemSetting {
  key: string;
  value: string;
  category: string;
  isSecret: boolean;
  description: string | null;
  updatedAt: Date;
  updatedBy: string | null;
}

const DEFAULT_SETTINGS: Array<{
  key: string;
  value: string;
  category: string;
  isSecret: boolean;
  description: string;
}> = [
  // Platform & Branding
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
    description: 'Default platform reporting currency (e.g. INR, USD)',
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
    description: 'Storage region (e.g., ap-south-1 Mumbai, us-east-1)',
  },
  {
    key: 'STORAGE_ACCESS_KEY_ID',
    value: '',
    category: 'STORAGE',
    isSecret: false,
    description: 'Cloud storage IAM Access Key ID',
  },
  {
    key: 'STORAGE_SECRET_ACCESS_KEY',
    value: '',
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
    value: '',
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
    value: '',
    category: 'COMMUNICATION',
    isSecret: true,
    description: 'Webhook signing secret for incoming delivery status callbacks',
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
    value: '',
    category: 'PAYMENTS',
    isSecret: false,
    description: 'Public Key ID / Publishable Key for donation checkouts',
  },
  {
    key: 'PAYMENT_KEY_SECRET',
    value: '',
    category: 'PAYMENTS',
    isSecret: true,
    description: 'Secret Key for payment verification and payout webhooks',
  },
  {
    key: 'PAYMENT_WEBHOOK_SECRET',
    value: '',
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

@Injectable()
export class SystemSettingsService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedDefaultsIfEmpty();
  }

  async seedDefaultsIfEmpty() {
    if (!this.prisma?.systemSetting?.count) {
      return;
    }
    const count = await this.prisma.systemSetting.count();
    if (count === 0) {
      for (const setting of DEFAULT_SETTINGS) {
        await this.prisma.systemSetting.create({
          data: setting,
        });
      }
    }
  }

  async getAllSettings(): Promise<MaskedSystemSetting[]> {
    if (!this.prisma?.systemSetting?.findMany) {
      return [];
    }

    const settings = await this.prisma.systemSetting.findMany({
      orderBy: [{ category: 'asc' }, { key: 'asc' }],
    });

    return settings.map((s) => ({
      key: s.key,
      value: s.isSecret && s.value ? this.maskSecret(s.value) : s.value,
      category: s.category,
      isSecret: s.isSecret,
      description: s.description,
      updatedAt: s.updatedAt,
      updatedBy: s.updatedBy,
    }));
  }

  async getSettingValue(key: string): Promise<string | null> {
    if (!this.prisma?.systemSetting?.findUnique) {
      return null;
    }
    const setting = await this.prisma.systemSetting.findUnique({
      where: { key },
    });
    return setting ? setting.value : null;
  }

  async updateSettings(
    items: SettingItemDto[],
    actorId?: string,
  ): Promise<MaskedSystemSetting[]> {
    if (!this.prisma?.systemSetting?.upsert) {
      return [];
    }

    for (const item of items) {
      const existing = await this.prisma.systemSetting.findUnique({
        where: { key: item.key },
      });

      // If existing is secret and submitted value is masked (starts with ••••), don't overwrite secret
      if (existing?.isSecret && item.value.startsWith('••••')) {
        continue;
      }

      await this.prisma.systemSetting.upsert({
        where: { key: item.key },
        create: {
          key: item.key,
          value: item.value,
          category: item.category ?? existing?.category ?? 'PLATFORM',
          isSecret: item.isSecret ?? existing?.isSecret ?? false,
          description: item.description ?? existing?.description,
          updatedBy: actorId,
        },
        update: {
          value: item.value,
          ...(item.category ? { category: item.category } : {}),
          ...(typeof item.isSecret === 'boolean' ? { isSecret: item.isSecret } : {}),
          ...(item.description ? { description: item.description } : {}),
          updatedBy: actorId,
        },
      });
    }

    return this.getAllSettings();
  }

  async getPublicConfig() {
    if (!this.prisma?.systemSetting?.findMany) {
      return {
        platformName: 'ImpactBridge CSR Platform',
        supportEmail: 'support@impactbridge.org',
        defaultCountry: 'India',
        defaultCurrency: 'INR',
        csrMandatePercentage: 2.0,
        featureFlags: {
          API_DASHBOARD: true,
          API_NGO_FINANCIAL: true,
          API_PROGRAMME: true,
          REALTIME_NOTIFICATIONS: true,
        },
      };
    }

    const settings = await this.prisma.systemSetting.findMany({
      where: {
        key: {
          in: [
            'PLATFORM_NAME',
            'SUPPORT_EMAIL',
            'DEFAULT_COUNTRY',
            'DEFAULT_CURRENCY',
            'CSR_MANDATE_PERCENTAGE',
            'FLAG_API_DASHBOARD',
            'FLAG_API_NGO_FINANCIAL',
            'FLAG_API_PROGRAMME',
            'FLAG_REALTIME_NOTIFICATIONS',
          ],
        },
      },
    });

    const map: Record<string, string> = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });

    return {
      platformName: map['PLATFORM_NAME'] || 'ImpactBridge CSR Platform',
      supportEmail: map['SUPPORT_EMAIL'] || 'support@impactbridge.org',
      defaultCountry: map['DEFAULT_COUNTRY'] || 'India',
      defaultCurrency: map['DEFAULT_CURRENCY'] || 'INR',
      csrMandatePercentage: parseFloat(map['CSR_MANDATE_PERCENTAGE'] || '2.0'),
      featureFlags: {
        API_DASHBOARD: map['FLAG_API_DASHBOARD'] === 'true',
        API_NGO_FINANCIAL: map['FLAG_API_NGO_FINANCIAL'] === 'true',
        API_PROGRAMME: map['FLAG_API_PROGRAMME'] === 'true',
        REALTIME_NOTIFICATIONS: map['FLAG_REALTIME_NOTIFICATIONS'] === 'true',
      },
    };
  }

  private maskSecret(val: string): string {
    if (!val) return '';
    if (val.length <= 4) return '••••';
    const last4 = val.slice(-4);
    return `••••••••••••${last4}`;
  }
}
