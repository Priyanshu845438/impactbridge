export type SettingCategory =
  | 'PLATFORM'
  | 'STORAGE'
  | 'COMMUNICATION'
  | 'PAYMENTS'
  | 'CSR_REGULATORY'
  | 'FEATURE_FLAGS';

export interface SystemSettingDto {
  key: string;
  value: string;
  category: SettingCategory;
  isSecret: boolean;
  description?: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface UpdateSystemSettingsDto {
  settings: Array<{
    key: string;
    value: string;
    category?: SettingCategory;
    isSecret?: boolean;
    description?: string;
  }>;
}

export interface PublicSystemConfigDto {
  platformName: string;
  supportEmail: string;
  defaultCurrency: string;
  defaultCountry: string;
  csrMandatePercentage: number;
}
