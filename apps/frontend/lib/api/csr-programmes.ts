import { apiRequest } from '@/lib/api/client';
import type {
  ProgrammeSummaryDto,
  ProgrammeDetailDto,
  ProgrammeCreateDto,
  ProgrammeUpdateDto,
  ProgrammeStatusUpdateDto,
  ProgrammeAssignNgoDto,
} from '@impactbridge/api-contracts';

const BASE_PATH = '/api/v1/csr/programmes';

export async function fetchCompanyProgrammes() {
  const response = await apiRequest<ProgrammeSummaryDto[]>({ path: BASE_PATH });
  return response.data ?? [];
}

export async function fetchProgrammeDetail(id: string) {
  const response = await apiRequest<ProgrammeDetailDto>({ path: `${BASE_PATH}/${id}` });
  return response.data ?? null;
}

export async function createProgramme(payload: ProgrammeCreateDto) {
  const response = await apiRequest<ProgrammeDetailDto, ProgrammeCreateDto>({
    path: BASE_PATH,
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function updateProgramme(id: string, payload: ProgrammeUpdateDto) {
  const response = await apiRequest<ProgrammeDetailDto, ProgrammeUpdateDto>({
    path: `${BASE_PATH}/${id}`,
    method: 'PATCH',
    body: payload,
  });
  return response.data;
}

export async function transitionProgrammeStatus(id: string, payload: ProgrammeStatusUpdateDto) {
  const response = await apiRequest<ProgrammeDetailDto, ProgrammeStatusUpdateDto>({
    path: `${BASE_PATH}/${id}/status`,
    method: 'PATCH',
    body: payload,
  });
  return response.data;
}

export async function assignProgrammeNgo(id: string, payload: ProgrammeAssignNgoDto) {
  const response = await apiRequest<{ success: boolean }, ProgrammeAssignNgoDto>({
    path: `${BASE_PATH}/${id}/assign`,
    method: 'POST',
    body: payload,
  });
  return response.data;
}
