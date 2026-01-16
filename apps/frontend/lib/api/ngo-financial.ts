import { apiClient } from '@/lib/api-client';
import type { NgoFinancialReportDto } from '@impactbridge/api-contracts/dto/financial';

type NgoFinancialReportsResponse = NgoFinancialReportDto[];

export async function fetchNgoFinancialReports(signal?: AbortSignal): Promise<NgoFinancialReportsResponse> {
  return apiClient
    .get('api/v1/financial/ngo/reports', { signal })
    .json<NgoFinancialReportsResponse>();
}
