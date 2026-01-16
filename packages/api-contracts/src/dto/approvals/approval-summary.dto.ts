import type { ApprovalStatus } from '../../enums/approval-status.enum';

export interface ApprovalSummaryDto {
  id: string;
  campaignId: string;
  companyId: string;
  ngoId: string;
  status: ApprovalStatus;
  requestedAt: string;
  updatedAt: string;
}

