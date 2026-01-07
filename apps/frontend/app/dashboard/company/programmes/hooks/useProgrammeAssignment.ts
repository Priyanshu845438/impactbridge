"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiRequest } from '@/lib/api/client';
import { getFeatureFlags } from '@/lib/feature-flags';
import { DEFAULT_COMPANY_ID } from '../api';
import {
  getProgrammeDetailKey,
  getProgrammeListKey,
} from './use-programme-wrappers';

interface AssignmentInput {
  programmeId: string;
  ngoId: string;
}

interface AssignmentResponse {
  success: boolean;
  ngoId: string;
}

const BASE_PATH = '/api/v1/companies';

function mapMockAssignment({ ngoId }: AssignmentInput): AssignmentResponse {
  return {
    success: true,
    ngoId,
  };
}

async function assignViaApi(
  { programmeId, ngoId }: AssignmentInput,
  companyId: string,
): Promise<AssignmentResponse> {
  const response = await apiRequest<{ ngoId?: string } | undefined>({
    method: 'POST',
    path: `${BASE_PATH}/${companyId}/csr-programmes/${programmeId}/assign-ngo`,
    body: { ngoId },
  });

  if (!response?.data) {
    return mapMockAssignment({ programmeId, ngoId });
  }

  return {
    success: true,
    ngoId: response.data.ngoId ?? ngoId,
  };
}

export function useProgrammeAssignment(companyId: string = DEFAULT_COMPANY_ID) {
  const { API_PROGRAMME } = getFeatureFlags();
  const queryClient = useQueryClient();

  return useMutation<AssignmentResponse, Error, AssignmentInput>({
    mutationFn: (input) => {
      if (!API_PROGRAMME) {
        return Promise.resolve(mapMockAssignment(input));
      }

      return assignViaApi(input, companyId);
    },
    onSettled: (_result, _error, variables) => {
      if (!variables) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: getProgrammeDetailKey(companyId, variables.programmeId),
      });
      queryClient.invalidateQueries({
        queryKey: getProgrammeListKey(companyId),
      });
    },
  });
}

export type { AssignmentInput, AssignmentResponse };
