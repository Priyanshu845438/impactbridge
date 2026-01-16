export interface FinancialReportResponse {
  id: string;
  period: string;
  year: number;
  reportUrl: string;
  ngoId: string;
  createdAt: string;
  updatedAt?: string;
  ngoName: string | null;
  ngoEmail: string | null;
}
