"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ProgrammeUpdateDto,
  ProgrammeDetailDto,
} from "@impactbridge/api-contracts";

import { apiRequest } from "@/lib/api/client";
import { getFeatureFlags } from "@/lib/feature-flags";
import { programmes as mockProgrammes } from "../mock-data";
import { DEFAULT_COMPANY_ID } from "../api";
import {
  getProgrammeDetailKey,
  getProgrammeListKey,
} from "./use-programme-wrappers";

type ProgrammeStatus = (typeof mockProgrammes)[number]["status"];

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

const BASE_PATH = "/api/v1/companies";

function mockUpdateProgramme(input: UpdateProgrammeInput): MockUpdateResponse {
  const programme =
    mockProgrammes.find((item) => item.id === input.programmeId) ??
    mockProgrammes[0];

  return {
    success: true,
    programme: {
      ...programme,
      name: input.name,
      summary: input.summary,
      category: input.category,
      region: input.region,
      status: input.status,
    },
  };
}

async function apiUpdateProgramme(
  input: UpdateProgrammeInput,
  companyId: string,
) {
  const baseline = mockUpdateProgramme(input);

  const payload: ProgrammeUpdateDto = {
    title: input.name,
    description: input.summary,
    status: input.status.toUpperCase(),
  };

  const response = await apiRequest<ProgrammeDetailDto>({
    method: "PATCH",
    path: `${BASE_PATH}/${companyId}/csr-programmes/${input.programmeId}`,
    body: payload,
  });

  const programme = response.data;

  if (!programme) {
    return baseline;
  }

  const toProgrammeStatus = (
    statusFromApi: string | undefined,
    fallback: ProgrammeStatus,
  ): ProgrammeStatus => {
    switch (statusFromApi) {
      case "ACTIVE":
        return "Active";
      case "COMPLETED":
        return "Completed";
      case "UPCOMING":
        return "Upcoming";
      default:
        return fallback;
    }
  };

  return {
    success: true,
    programme: {
      ...baseline.programme,
      id: programme.id,
      name: programme.title ?? baseline.programme.name,
      summary: programme.description ?? baseline.programme.summary,
      status: toProgrammeStatus(programme.status, baseline.programme.status),
    },
  } satisfies MockUpdateResponse;
}

export function useUpdateProgramme(
  defaultCompanyId: string = DEFAULT_COMPANY_ID,
) {
  const { API_PROGRAMME } = getFeatureFlags();
  const queryClient = useQueryClient();

  return useMutation<MockUpdateResponse, Error, UpdateProgrammeInput>({
    mutationFn: (input) => {
      const companyId = input.companyId ?? defaultCompanyId;

      if (!API_PROGRAMME) {
        return Promise.resolve(mockUpdateProgramme(input));
      }

      return apiUpdateProgramme(input, companyId);
    },
    onSettled: (_result, _error, variables) => {
      if (!variables) {
        return;
      }

      const companyId = variables.companyId ?? defaultCompanyId;

      queryClient.invalidateQueries({
        queryKey: getProgrammeDetailKey(companyId, variables.programmeId),
      });
      queryClient.invalidateQueries({
        queryKey: getProgrammeListKey(companyId),
      });
    },
  });
}

export type { UpdateProgrammeInput, MockUpdateResponse };
