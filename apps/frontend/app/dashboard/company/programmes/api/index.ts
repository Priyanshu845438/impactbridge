import type { ProgrammeDetailDto, ProgrammeSummaryDto } from '@impactbridge/api-contracts';
import { apiRequest } from '@/lib/api/client';
import { getFeatureFlags } from '@/lib/feature-flags';
import { programmes as mockProgrammes } from '../mock-data';

type ProgrammeList = ProgrammeSummaryDto[];

type DetailResponse = ProgrammeDetailDto | null;

export const DEFAULT_COMPANY_ID = 'company-1';
const BASE_PATH = '/api/v1/companies';

export function mapMockList(companyId: string): ProgrammeList {
  return mockProgrammes.map((programme) => ({
    id: programme.id,
    title: programme.name,
    description: programme.summary,
    ownerCompanyId: companyId,
    ngoId: undefined,
    state: 'ACTIVE',
    startDate: undefined,
    endDate: undefined,
    createdAt: programme.createdAt ?? new Date(0).toISOString(),
    updatedAt: programme.updatedAt ?? new Date(0).toISOString(),
  }));
}

export function mapMockDetail(companyId: string, programmeId: string): DetailResponse {
  const programme = mockProgrammes.find((item) => item.id === programmeId);
  if (!programme) return null;

  return {
    id: programme.id,
    title: programme.name,
    description: programme.description,
    status: 'ACTIVE',
    budget: undefined,
    startDate: undefined,
    endDate: undefined,
    companyId,
    milestones: [],
    assignments: [],
    createdAt: programme.createdAt ?? new Date(0).toISOString(),
    updatedAt: programme.updatedAt ?? new Date(0).toISOString(),
  };
}

export async function listProgrammes(companyId: string = DEFAULT_COMPANY_ID): Promise<ProgrammeList> {
  const { API_PROGRAMME } = getFeatureFlags();

  if (!API_PROGRAMME) {
    return mapMockList(companyId);
  }

  const response = await apiRequest<ProgrammeSummaryDto[]>({
    path: `${BASE_PATH}/${companyId}/csr-programmes`,
  });

  return response.data ?? [];
}

export async function getProgrammeById(
  programmeId: string,
  companyId: string = DEFAULT_COMPANY_ID,
): Promise<DetailResponse> {
  const { API_PROGRAMME } = getFeatureFlags();

  if (!API_PROGRAMME) {
    return mapMockDetail(companyId, programmeId);
  }

  const response = await apiRequest<ProgrammeDetailDto>({
    path: `${BASE_PATH}/${companyId}/csr-programmes/${programmeId}`,
  });

  return response.data ?? mapMockDetail(companyId, programmeId);
}
