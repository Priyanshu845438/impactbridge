"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiRequest } from '@/lib/api/client';
import { getFeatureFlags } from '@/lib/feature-flags';
import type { ProgrammeCreateDto, ProgrammeCreateResponseDto } from '@impactbridge/api-contracts';

import { programmes as mockProgrammes } from '../mock-data';
import { DEFAULT_COMPANY_ID } from '../api';
import {
  getProgrammeDetailKey,
  getProgrammeListKey,
} from './use-programme-wrappers';

interface CreateProgrammeInput {
  name: string;
  summary: string;
  category: string;
  region: string;
  status: (typeof mockProgrammes)[number]['status'];
}

interface MockCreateResponse {
  success: boolean;
  programme: (typeof mockProgrammes)[number];
}

const BASE_PATH = '/api/v1/companies';

function mockCreateProgramme(input: CreateProgrammeInput): MockCreateResponse {
  const programme = {
    ...mockProgrammes[0],
    id: `programme-${Date.now()}`,
    name: input.name,
    summary: input.summary,
    category: input.category,
    region: input.region,
    status: input.status,
  } as (typeof mockProgrammes)[number];

  return { success: true, programme };
}

async function apiCreateProgramme(
  input: CreateProgrammeInput,
  companyId: string = DEFAULT_COMPANY_ID,
): Promise<ProgrammeCreateResponseDto> {
  const payload: ProgrammeCreateDto = {
    title: input.name,
    description: input.summary,
    status: input.status.toUpperCase() as ProgrammeCreateDto['status'],
  };

  const response = await apiRequest<ProgrammeCreateResponseDto>({
    method: 'POST',
    path: `${BASE_PATH}/${companyId}/csr-programmes`,
    body: payload,
  });

  return response.data as ProgrammeCreateResponseDto;
}

export function useCreateProgramme(companyId: string = DEFAULT_COMPANY_ID) {
  const { API_PROGRAMME } = getFeatureFlags();
  const queryClient = useQueryClient();

  return useMutation<MockCreateResponse | ProgrammeCreateResponseDto, Error, CreateProgrammeInput>({
    mutationFn: async (input) => {
      if (!API_PROGRAMME) {
        return mockCreateProgramme(input);
      }

      return apiCreateProgramme(input, companyId);
    },
    onSuccess: (data) => {
      const createdProgramme =
        (data as ProgrammeCreateResponseDto | MockCreateResponse)?.programme;
      const createdId = createdProgramme?.id;

      if (createdId) {
        queryClient.invalidateQueries({
          queryKey: getProgrammeDetailKey(companyId, createdId),
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getProgrammeListKey(companyId),
      });
    },
  });
}

export type { CreateProgrammeInput, MockCreateResponse };
