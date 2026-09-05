export type FinancialReconciliationIssueType =
  | 'MISSING_REPORT'
  | 'AMOUNT_MISMATCH';

export interface FinancialReconciliationIssue {
  type: FinancialReconciliationIssueType;
  ngoId: string;
  period: string;
  expectedTotal: number;
  actualTotal: number;
}

export interface FinancialReconciliationSummary {
  checkedPeriods: number;
  matchedPeriods: number;
  issues: FinancialReconciliationIssue[];
}
