import { useQuery } from '@tanstack/react-query';

import { fetchAdminAnalytics } from '@/lib/api/analytics';
import { mapAdminAnalyticsToUi } from '@/lib/analytics/adapters';
import type { AdminUiModel } from '@/lib/analytics/adapters';

interface UseAdminAnalyticsOptions {
  enabled: boolean;
}

export function useAdminAnalytics({ enabled }: UseAdminAnalyticsOptions) {
  return useQuery({
    queryKey: ['admin-analytics', 'overview'],
    queryFn: async () => {
      const payload = await fetchAdminAnalytics();
      return mapAdminAnalyticsToUi(payload);
    },
    enabled,
    staleTime: 1000 * 60,
  });
}

export type { AdminUiModel };

