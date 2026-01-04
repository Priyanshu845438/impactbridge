import type { ProgrammeDetailDto, ProgrammeSummaryDto } from '@impactbridge/api-contracts';
import { apiRequest } from '@/lib/api/client';
import { getFeatureFlags } from '@/lib/feature-flags';
import { programmes as mockProgrammes } from '../mock-data';

type ProgrammeList = ProgrammeSummaryDto[];

type DetailResponse = ProgrammeDetailDto | null;

const DEFAULT_COMPANY_ID = 'company-1';
const BASE_PATH = '/api/v1/companies';

function mapMockList(companyId: string): ProgrammeList {
  return mockProgrammes.map((programme) => ({
    id: programme.id,
    title: programme.name,
    description: programme.summary,
    ownerCompanyId: companyId,
    ngoId: undefined,
    state: 'ACTIVE',
    startDate: undefined,
    endDate: undefined,
  }));
}

function mapMockDetail(companyId: string, programmeId: string): DetailResponse {
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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

  return response.data ?? null;
}
