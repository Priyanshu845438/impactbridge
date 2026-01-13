import { apiClient } from '@/lib/api-client';

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVOKED';

export interface ApprovalUserSummary {
  id: string;
  name: string;
  email: string;
}

export interface ApprovalOrganisationSummary {
  id: string;
  user: ApprovalUserSummary;
}

export interface ApprovalCampaignSummary {
  id: string;
  title: string;
  description?: string | null;
}

export interface ApprovalSummaryDto {
  id: string;
  status: ApprovalStatus;
  remarks?: string | null;
  campaign: ApprovalCampaignSummary;
  ngo: ApprovalOrganisationSummary;
  companyId: string;
  ngoId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalRequestDto {
  companyId: string;
  remarks?: string;
}

export interface ApprovalDecisionDto {
  status?: 'APPROVED' | 'REJECTED';
  remarks?: string;
}

export interface ApprovalRevokeDto {
  remarks?: string;
}

export type PendingApprovalsResponse = ApprovalSummaryDto[];

export async function fetchCompanyPendingApprovals(signal?: AbortSignal): Promise<PendingApprovalsResponse> {
  return apiClient
    .get('api/v1/approvals/company/pending', { signal })
    .json<PendingApprovalsResponse>();
}

export async function requestApproval(
  campaignId: string,
  payload: ApprovalRequestDto,
  signal?: AbortSignal,
) {
  return apiClient
    .post(`api/v1/approvals/${campaignId}/request`, {
      json: payload,
      signal,
    })
    .json<ApprovalSummaryDto>();
}

export async function approveCampaign(
  campaignId: string,
  payload: ApprovalDecisionDto = {},
  signal?: AbortSignal,
) {
  return apiClient
    .post(`api/v1/approvals/${campaignId}/approve`, {
      json: payload,
      signal,
    })
    .json<ApprovalSummaryDto>();
}

export async function rejectCampaign(
  campaignId: string,
  payload: ApprovalDecisionDto = {},
  signal?: AbortSignal,
) {
  return apiClient
    .post(`api/v1/approvals/${campaignId}/reject`, {
      json: payload,
      signal,
    })
    .json<ApprovalSummaryDto>();
}

export async function revokeApproval(
  campaignId: string,
  payload: ApprovalRevokeDto = {},
  signal?: AbortSignal,
) {
  return apiClient
    .post(`api/v1/approvals/${campaignId}/revoke`, {
      json: payload,
      signal,
    })
    .json<ApprovalSummaryDto>();
}
