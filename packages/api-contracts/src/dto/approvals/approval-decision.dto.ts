import type { ApprovalDecisionStatus } from '../../enums/approval-status.enum';

export interface ApprovalDecisionDto {
  decision: ApprovalDecisionStatus;
  comment?: string;
}

