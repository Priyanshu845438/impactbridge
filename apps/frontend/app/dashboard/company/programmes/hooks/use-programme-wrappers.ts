import { useQuery } from "@tanstack/react-query";
import type {
  ProgrammeDetailDto,
  ProgrammeSummaryDto,
} from "@impactbridge/api-contracts";
import {
  listProgrammes,
  getProgrammeById,
  mapMockDetail,
  mapMockList,
  DEFAULT_COMPANY_ID,
} from "../api";

interface ListOptions {
  enabled: boolean;
  companyId?: string;
}

interface DetailOptions {
  programmeId: string;
  enabled: boolean;
  companyId?: string;
}

export const LIST_QUERY_KEY = ["csr-programmes", "company"] as const;

export const getProgrammeListKey = (companyId: string) => [
  ...LIST_QUERY_KEY,
  companyId,
] as const;

export const getProgrammeDetailKey = (
  companyId: string,
  programmeId: string,
) => [...LIST_QUERY_KEY, companyId, programmeId] as const;

function normaliseSummary(
  programme: ProgrammeSummaryDto | undefined,
  companyId: string,
  baselineLookup: Map<string, ReturnType<typeof mapMockList>[number]>,
) {
  if (!programme) {
    return null;
  }

  const id = programme.id ?? "";

  const fallback = baselineLookup.get(id);

  return {
    id,
    title: programme.title ?? fallback?.title ?? "",
    description: programme.description ?? fallback?.description ?? "",
    ownerCompanyId:
      programme.ownerCompanyId ?? fallback?.ownerCompanyId ?? companyId,
    ngoId: programme.ngoId ?? fallback?.ngoId,
    state: programme.state ?? fallback?.state ?? "ACTIVE",
    startDate: programme.startDate ?? fallback?.startDate,
    endDate: programme.endDate ?? fallback?.endDate,
    createdAt:
      (programme as { createdAt?: string }).createdAt ??
      fallback?.createdAt ??
      new Date(0).toISOString(),
    updatedAt:
      (programme as { updatedAt?: string }).updatedAt ??
      fallback?.updatedAt ??
      new Date(0).toISOString(),
  } satisfies ProgrammeSummaryDto & {
    createdAt: string;
    updatedAt: string;
  };
}

function ensureSummaryList(
  list: ProgrammeSummaryDto[] | undefined,
  companyId: string,
) {
  const baseline = mapMockList(companyId);
  const baselineLookup = new Map(baseline.map((item) => [item.id, item]));

  if (!Array.isArray(list) || list.length === 0) {
    return baseline;
  }

  const normalised = list
    .map((programme) => normaliseSummary(programme, companyId, baselineLookup))
    .filter(Boolean) as ReturnType<typeof normaliseSummary>[];

  if (normalised.length === 0) {
    return baseline;
  }

  return normalised;
}

function normaliseDetail(
  detail: ProgrammeDetailDto | null | undefined,
  programmeId: string,
  companyId: string,
) {
  const fallback = mapMockDetail(companyId, programmeId);

  if (!detail && fallback) {
    return fallback;
  }

  if (!detail) {
    return null;
  }

  return {
    id: detail.id ?? fallback?.id ?? programmeId,
    title: detail.title ?? fallback?.title ?? "",
    description: detail.description ?? fallback?.description,
    status: detail.status ?? fallback?.status ?? "ACTIVE",
    budget: detail.budget ?? fallback?.budget,
    startDate: detail.startDate ?? fallback?.startDate,
    endDate: detail.endDate ?? fallback?.endDate,
    companyId: detail.companyId ?? fallback?.companyId ?? companyId,
    milestones: Array.isArray(detail.milestones)
      ? detail.milestones
      : fallback?.milestones ?? [],
    assignments: Array.isArray(detail.assignments)
      ? detail.assignments
      : fallback?.assignments ?? [],
    createdAt:
      detail.createdAt ?? fallback?.createdAt ?? new Date(0).toISOString(),
    updatedAt:
      detail.updatedAt ?? fallback?.updatedAt ?? new Date(0).toISOString(),
  };
}

export function useCompanyProgrammesWrapper({
  enabled,
  companyId,
}: ListOptions) {
  const effectiveCompanyId = companyId ?? DEFAULT_COMPANY_ID;

  return useQuery<ProgrammeSummaryDto[]>({
    queryKey: getProgrammeListKey(effectiveCompanyId),
    queryFn: async () => {
      try {
        const response = await listProgrammes(effectiveCompanyId);
        return ensureSummaryList(response, effectiveCompanyId) as ProgrammeSummaryDto[];
      } catch (error) {
        console.warn(
          "CSR Programme list request failed, falling back to mock data",
          error,
        );
        return mapMockList(effectiveCompanyId) as ProgrammeSummaryDto[];
      }
    },
    enabled,
    staleTime: 1000 * 30,
  });
}

export function useProgrammeDetailsWrapper({
  programmeId,
  enabled,
  companyId,
}: DetailOptions) {
  const effectiveCompanyId = companyId ?? DEFAULT_COMPANY_ID;

  return useQuery<ProgrammeDetailDto | null>({
    queryKey: getProgrammeDetailKey(effectiveCompanyId, programmeId),
    queryFn: async () => {
      try {
        const response = await getProgrammeById(programmeId, effectiveCompanyId);
        return normaliseDetail(response, programmeId, effectiveCompanyId);
      } catch (error) {
        console.warn(
          "CSR Programme detail request failed, falling back to mock data",
          error,
        );
        return normaliseDetail(null, programmeId, effectiveCompanyId);
      }
    },
    enabled: enabled && Boolean(programmeId),
    staleTime: 1000 * 30,
  });
}
