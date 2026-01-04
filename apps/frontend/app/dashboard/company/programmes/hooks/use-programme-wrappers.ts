import { useQuery } from '@tanstack/react-query';
import type { ProgrammeDetailDto, ProgrammeSummaryDto } from '@impactbridge/api-contracts';
import { listProgrammes, getProgrammeById } from '../api';

interface ListOptions {
  enabled: boolean;
  companyId?: string;
}

interface DetailOptions {
  programmeId: string;
  enabled: boolean;
  companyId?: string;
}

const LIST_QUERY_KEY = ['csr-programmes', 'company'] as const;

export function useCompanyProgrammesWrapper({ enabled, companyId }: ListOptions) {
  return useQuery<ProgrammeSummaryDto[]>({
    queryKey: [...LIST_QUERY_KEY, companyId ?? 'default'],
    queryFn: () => listProgrammes(companyId),
    enabled,
    staleTime: 1000 * 30,
  });
}

export function useProgrammeDetailsWrapper({ programmeId, enabled, companyId }: DetailOptions) {
  return useQuery<ProgrammeDetailDto | null>({
    queryKey: [...LIST_QUERY_KEY, companyId ?? 'default', programmeId],
    queryFn: () => getProgrammeById(programmeId, companyId),
    enabled: enabled && Boolean(programmeId),
    staleTime: 1000 * 30,
  });
}
