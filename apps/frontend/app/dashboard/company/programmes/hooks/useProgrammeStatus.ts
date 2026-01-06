"use client";

import { useMutation } from '@tanstack/react-query';
import type { ProgrammeStatusUpdateDto } from '@impactbridge/api-contracts';

import { apiRequest } from '@/lib/api/client';
import { getFeatureFlags } from '@/lib/feature-flags';
import { programmes as mockProgrammes } from '../mock-data';
import { DEFAULT_COMPANY_ID } from '../api';

type ProgrammeStatus = (typeof mockProgrammes)[number]['status'];

type StatusInput = {
  programmeId: string;
  nextStatus: ProgrammeStatus;
};

type MockStatusResponse = {
  success: boolean;
  status: ProgrammeStatus;
};

const BASE_PATH = '/api/v1/companies';

function mockTransitionStatus({ nextStatus }: StatusInput): MockStatusResponse {
  return {
    success: true,
    status: nextStatus,
  };
}

async function apiTransitionStatus(
  { programmeId, nextStatus }: StatusInput,
  companyId: string,
): Promise<MockStatusResponse> {
  const payload: ProgrammeStatusUpdateDto = {
    status: nextStatus.toUpperCase(),
  };

  const response = await apiRequest<ProgrammeStatusUpdateDto>({
    method: 'POST',
    path: `${BASE_PATH}/${companyId}/csr-programmes/${programmeId}/status`,
    body: payload,
  });

  return response.data
    ? {
        success: true,
        status: nextStatus,
      }
    : mockTransitionStatus({ programmeId, nextStatus });
}

export function useProgrammeStatus(companyId: string = DEFAULT_COMPANY_ID) {
  const { API_PROGRAMME } = getFeatureFlags();

  return useMutation<MockStatusResponse, Error, StatusInput>({
    mutationFn: (input) => {
      if (!API_PROGRAMME) {
        return Promise.resolve(mockTransitionStatus(input));
      }

      return apiTransitionStatus(input, companyId);
    },
  });
}

export type { ProgrammeStatus, StatusInput, MockStatusResponse };
