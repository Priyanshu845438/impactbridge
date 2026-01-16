import { apiClient } from '@/lib/api-client';
import type { FinancialAdminReportDto } from '@impactbridge/api-contracts/dto/financial';

export type AdminFinancialReportsResponse = FinancialAdminReportDto[];

export async function fetchAdminFinancialReports(signal?: AbortSignal): Promise<AdminFinancialReportsResponse> {
  return apiClient
    .get('api/v1/financial/admin/all', { signal })
    .json<AdminFinancialReportsResponse>();
}
