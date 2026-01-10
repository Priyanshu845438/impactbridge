import { apiClient } from '@/lib/api-client';

export interface FinancialReportSummary {
  id: string;
  year: number;
  period: string;
  reportUrl: string;
  ngo: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  createdAt: string;
}

export type AdminFinancialReportsResponse = FinancialReportSummary[];

export async function fetchAdminFinancialReports(signal?: AbortSignal): Promise<AdminFinancialReportsResponse> {
  return apiClient
    .get('api/v1/financial/admin/all', { signal })
    .json<AdminFinancialReportsResponse>();
}
