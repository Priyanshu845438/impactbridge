import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { isFeatureEnabled } from '@/lib/feature-flags';
import { fetchAdminFinancialReports } from '@/lib/api/financial';
import type { AdminFinancialReportsResponse } from '@/lib/api/financial';

export type AdminFinancialReportRow = {
  id: string;
  ngoName: string;
  ngoEmail: string;
  period: string;
  year: number;
  submittedAt: string;
  documentUrl: string;
};

export function useAdminFinancialReports() {
  const enabled = isFeatureEnabled('API_DASHBOARD');

  const query = useQuery({
    queryKey: ['admin-financial-reports'],
    queryFn: async ({ signal }) => fetchAdminFinancialReports(signal),
    enabled,
    staleTime: 60_000,
  });

  const rows = useMemo<AdminFinancialReportRow[]>(() => {
    const data: AdminFinancialReportsResponse | undefined = query.data;
    if (!data) return [];

    return data.map((report) => ({
      id: report.id,
      ngoName: report.ngoName ?? 'Unknown NGO',
      ngoEmail: report.ngoEmail ?? 'unknown@example.com',
      period: report.period,
      year: report.year,
      submittedAt: new Date(report.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      documentUrl: report.reportUrl,
    }));
  }, [query.data]);

  return {
    data: rows,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    isEnabled: enabled,
  };
}

export type UseAdminFinancialReportsReturn = ReturnType<typeof useAdminFinancialReports>;
