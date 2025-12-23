import { useQuery } from '@tanstack/react-query';

const EXAMPLE_QUERY_KEY = ['example'] as const;

export function useExampleQuery() {
  return useQuery({
    queryKey: EXAMPLE_QUERY_KEY,
    queryFn: async () => ({ message: 'React Query ready' }),
  });
}
