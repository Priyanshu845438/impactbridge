import type { ApprovalDecisionStatus } from '../../enums/approval-status.enum';
export interface ApprovalDecisionDto {
    status: ApprovalDecisionStatus;
    comment?: string;
}
