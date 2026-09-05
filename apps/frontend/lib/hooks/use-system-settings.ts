import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSystemSettings, updateSystemSettings } from '@/lib/api/system-settings';
import type { SystemSettingDto } from '@impactbridge/api-contracts';

const SETTINGS_QUERY_KEY = ['admin', 'system-settings'];

export function useSystemSettings() {
  const query = useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: ({ signal }) => fetchSystemSettings(signal),
    staleTime: 30_000,
  });

  return {
    settings: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useUpdateSystemSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      updated: Array<{
        key: string;
        value: string;
        category?: string;
        isSecret?: boolean;
        description?: string;
      }>,
    ) => updateSystemSettings(updated),
    onSuccess: (data: SystemSettingDto[]) => {
      queryClient.setQueryData(SETTINGS_QUERY_KEY, data);
    },
  });
}
