/**
 * Full set of statuses for the approval lifecycle.
 */
export const APPROVAL_STATUS_VALUES = [
  'PENDING',
  'APPROVED',
  'REJECTED',
  'REVOKED',
] as const;

export type ApprovalStatus = (typeof APPROVAL_STATUS_VALUES)[number];

/**
 * Subset of statuses used when making a decision.
 */
export const APPROVAL_DECISION_VALUES = ['APPROVED', 'REJECTED'] as const;

export type ApprovalDecisionStatus = (typeof APPROVAL_DECISION_VALUES)[number];
