/**
 * Full set of statuses for the approval lifecycle.
 */
export declare const APPROVAL_STATUS_VALUES: readonly ["PENDING", "APPROVED", "REJECTED", "REVOKED"];
export type ApprovalStatus = (typeof APPROVAL_STATUS_VALUES)[number];
/**
 * Subset of statuses used when making a decision.
 */
export declare const APPROVAL_DECISION_VALUES: readonly ["APPROVED", "REJECTED"];
export type ApprovalDecisionStatus = (typeof APPROVAL_DECISION_VALUES)[number];
