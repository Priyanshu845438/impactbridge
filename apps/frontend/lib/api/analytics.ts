import { apiClient } from '@/lib/api-client';
import type { AdminAnalyticsPayload } from '@/lib/analytics/contracts';

export async function fetchAdminAnalytics(signal?: AbortSignal): Promise<AdminAnalyticsPayload> {
  const response = await apiClient
    .get('api/v1/admin/analytics/overview', {
      signal,
    })
    .json<AdminAnalyticsPayload>();
  return response;
}
