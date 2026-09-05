import { apiClient } from '@/lib/api-client';
import type { SystemSettingDto, PublicSystemConfigDto } from '@impactbridge/api-contracts';

export async function fetchSystemSettings(signal?: AbortSignal): Promise<SystemSettingDto[]> {
  return apiClient.get('api/v1/system-settings', { signal }).json<SystemSettingDto[]>();
}

export async function updateSystemSettings(
  settings: Array<{
    key: string;
    value: string;
    category?: string;
    isSecret?: boolean;
    description?: string;
  }>,
  signal?: AbortSignal,
): Promise<SystemSettingDto[]> {
  return apiClient
    .put('api/v1/system-settings', {
      json: { settings },
      signal,
    })
    .json<SystemSettingDto[]>();
}

export async function fetchPublicSystemConfig(signal?: AbortSignal): Promise<PublicSystemConfigDto> {
  return apiClient.get('api/v1/system-settings/public', { signal }).json<PublicSystemConfigDto>();
}
