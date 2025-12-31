import { useQuery } from '@tanstack/react-query';
import {
  fetchCompanyProgrammes,
  fetchProgrammeDetail,
} from '@/lib/api/csr-programmes';
import type { ProgrammeListItemDto, ProgrammeDetailDto } from 'api-contracts';

interface ListOptions {
  enabled: boolean;
}

interface DetailOptions {
  id: string;
  enabled: boolean;
}

const LIST_QUERY_KEY = ['csr-programmes', 'company'] as const;

export function useCompanyProgrammes({ enabled }: ListOptions) {
  return useQuery({
    queryKey: LIST_QUERY_KEY,
    queryFn: fetchCompanyProgrammes,
    enabled,
    staleTime: 1000 * 30,
  });
}

export function useProgrammeDetail({ id, enabled }: DetailOptions) {
  return useQuery({
    queryKey: [...LIST_QUERY_KEY, id],
    queryFn: () => fetchProgrammeDetail(id),
    enabled: enabled && Boolean(id),
    staleTime: 1000 * 30,
  });
}

export type { ProgrammeListItemDto, ProgrammeDetailDto };
