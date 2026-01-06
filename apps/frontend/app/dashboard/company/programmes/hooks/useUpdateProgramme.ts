"use client";

import { useMutation } from '@tanstack/react-query';
import type { ProgrammeUpdateDto, ProgrammeUpdateResponseDto } from '@impactbridge/api-contracts';

import { apiRequest } from '@/lib/api/client';
import { getFeatureFlags } from '@/lib/feature-flags';
import { programmes as mockProgrammes } from '../mock-data';
import { DEFAULT_COMPANY_ID } from '../api';

const BASE_PATH = '/api/v1/companies';

type ProgrammeStatus = (typeof mockProgrammes)[number]['status'];

type UpdateProgrammeInput = {
  programmeId: string;
  name: string;
  summary: string;
  category: string;
  region: string;
  status: ProgrammeStatus;
  companyId?: string;
};

type MockUpdateResponse = {
  success: boolean;
  programme: (typeof mockProgrammes)[number];
};

function mapStatusToApi(status: ProgrammeStatus): string {
  return status.toUpperCase();
}

function mockUpdateProgramme({ programmeId, name, summary, category, region, status }: UpdateProgrammeInput): MockUpdateResponse {
  const existing = mockProgrammes.find((programme) => programme.id === programmeId);

  const updatedProgramme = existing
    ? {
        ...existing,
        name,
        summary,
        category,
        region,
        status,
        updatedAt: new Date().toISOString(),
      }
    : {
        id: programmeId,
        name,
        summary,
        category,
        region,
        status,
        ngo: {
          name: 'Partner NGO',
        },
        sdgs: [],
        bannerUrl: '',
        timeline: '',
        impactSummary: '',
        goals: [],
        description: summary,
        milestones: [],
        documents: [],
        updates: [],
        relatedProgrammeIds: [],
        budget: '',
      } as (typeof mockProgrammes)[number];

  return {
    success: true,
    programme: updatedProgramme,
  };
}

async function apiUpdateProgramme(
  input: UpdateProgrammeInput,
  companyId: string,
): Promise<ProgrammeUpdateResponseDto | MockUpdateResponse> {
  const payload: ProgrammeUpdateDto = {
    title: input.name,
    description: input.summary,
    status: mapStatusToApi(input.status),
  };

  const response = await apiRequest<ProgrammeUpdateResponseDto>({
    method: 'PATCH',
    path: `${BASE_PATH}/${companyId}/csr-programmes/${input.programmeId}`,
    body: payload,
  });

  if (!response.data?.programme) {
    return mockUpdateProgramme(input);
  }

  return response.data;
}

export function useUpdateProgramme(defaultCompanyId: string = DEFAULT_COMPANY_ID) {
  const { API_PROGRAMME } = getFeatureFlags();

  return useMutation<MockUpdateResponse | ProgrammeUpdateResponseDto, Error, UpdateProgrammeInput>({
    mutationFn: (input) => {
      const companyId = input.companyId ?? defaultCompanyId;

      if (!API_PROGRAMME) {
        return Promise.resolve(mockUpdateProgramme(input));
      }

      return apiUpdateProgramme(input, companyId);
    },
  });
}

export type { UpdateProgrammeInput, MockUpdateResponse };
