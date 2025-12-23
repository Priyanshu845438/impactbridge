import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 0,
  },
};

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: defaultQueryOptions,
  });

export const queryClient = createQueryClient();

export { defaultQueryOptions };
