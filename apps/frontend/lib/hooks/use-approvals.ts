import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  approveCampaign,
  fetchCompanyPendingApprovals,
  rejectCampaign,
  requestApproval,
  revokeApproval,
} from '@/lib/api/approvals';
import {
  approvalDecisionSchema,
  approvalRequestSchema,
  approvalRevokeSchema,
  approvalSummarySchema,
  type ApprovalDecisionPayload,
  type ApprovalRequestPayload,
  type ApprovalRevokePayload,
  type ApprovalSummary,
} from '@/lib/approvals/schema';
import { getFeatureFlags } from '@/lib/feature-flags';

const APPROVALS_QUERY_KEY = ['approvals', 'pending'];

function mapSummaryToUi(summary: ApprovalSummary) {
  return {
    id: summary.id,
    status: summary.status,
    remarks: summary.remarks ?? undefined,
    campaign: {
      id: summary.campaign.id,
      title: summary.campaign.title,
      description: summary.campaign.description ?? undefined,
    },
    ngo: {
      id: summary.ngo.id,
      name: summary.ngo.user.name,
      email: summary.ngo.user.email,
    },
    createdAt: summary.createdAt,
    updatedAt: summary.updatedAt,
  };
}

export function usePendingApprovals() {
  const enabled = getFeatureFlags().API_DASHBOARD;

  const query = useQuery({
    queryKey: APPROVALS_QUERY_KEY,
    enabled,
    staleTime: 60_000,
    queryFn: async ({ signal }) => {
      const response = await fetchCompanyPendingApprovals(signal);
      return response.map((item) => approvalSummarySchema.parse(item));
    },
  });

  const approvals = useMemo(() => {
    if (!query.data) return [];
    return query.data.map(mapSummaryToUi);
  }, [query.data]);

  return {
    approvals,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    isEnabled: enabled,
  };
}

type BaseMutationOptions<TData> = {
  onSuccess?: (data: TData) => void | Promise<void>;
  onError?: (error: unknown) => void;
};

export function useRequestApproval(options?: BaseMutationOptions<ApprovalSummary>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ campaignId, payload }: { campaignId: string; payload: ApprovalRequestPayload }) => {
      const parsed = approvalRequestSchema.parse(payload);
      const response = await requestApproval(campaignId, parsed);
      return approvalSummarySchema.parse(response);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: APPROVALS_QUERY_KEY });
      await options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

export function useApproveCampaign(options?: BaseMutationOptions<ApprovalSummary>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ campaignId, payload }: { campaignId: string; payload?: ApprovalDecisionPayload }) => {
      const parsed = approvalDecisionSchema.parse(payload ?? {});
      const response = await approveCampaign(campaignId, parsed);
      return approvalSummarySchema.parse(response);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: APPROVALS_QUERY_KEY });
      await options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

export function useRejectCampaign(options?: BaseMutationOptions<ApprovalSummary>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ campaignId, payload }: { campaignId: string; payload?: ApprovalDecisionPayload }) => {
      const parsed = approvalDecisionSchema.parse(payload ?? {});
      const response = await rejectCampaign(campaignId, parsed);
      return approvalSummarySchema.parse(response);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: APPROVALS_QUERY_KEY });
      await options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

export function useRevokeApproval(options?: BaseMutationOptions<ApprovalSummary>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ campaignId, payload }: { campaignId: string; payload?: ApprovalRevokePayload }) => {
      const parsed = approvalRevokeSchema.parse(payload ?? {});
      const response = await revokeApproval(campaignId, parsed);
      return approvalSummarySchema.parse(response);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: APPROVALS_QUERY_KEY });
      await options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

export type PendingApprovalsHook = ReturnType<typeof usePendingApprovals>;
