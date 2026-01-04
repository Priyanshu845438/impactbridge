import { useQuery } from '@tanstack/react-query';
import type { ProgrammeDetailDto, ProgrammeSummaryDto } from '@impactbridge/api-contracts';
import {
  listProgrammes,
  getProgrammeById,
  mapMockDetail,
  DEFAULT_COMPANY_ID,
} from '../api';

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
  const effectiveCompanyId = companyId ?? DEFAULT_COMPANY_ID;

  return useQuery<ProgrammeDetailDto | null>({
    queryKey: [...LIST_QUERY_KEY, companyId ?? 'default', programmeId],
    queryFn: async () => {
      const response = await getProgrammeById(programmeId, effectiveCompanyId);

      if (response) {
        return response;
      }

      return mapMockDetail(effectiveCompanyId, programmeId) ?? null;
    },
    enabled: enabled && Boolean(programmeId),
    staleTime: 1000 * 30,
  });
}
