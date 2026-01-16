import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getFeatureFlags } from '@/lib/feature-flags';
import { fetchNgoFinancialReports } from '@/lib/api/ngo-financial';
import type { FinancialReportDto } from '@impactbridge/api-contracts/dto/financial';

export interface NgoFinancialReportRow {
  id: string;
  fiscalYear: string;
  period: string;
  type: string;
  status: string;
  uploadedAt: string;
  reviewer?: string;
  url?: string;
}

interface UseNgoFinancialReportsResult {
  reports: NgoFinancialReportRow[];
  isLoading: boolean;
  error: string | null;
  usingMockData: boolean;
}

export function useNgoFinancialReports(fallback: NgoFinancialReportRow[]): UseNgoFinancialReportsResult {
  const { API_NGO_FINANCIAL } = getFeatureFlags();

  const query = useQuery({
    queryKey: ['ngo', 'financial', 'reports'],
    enabled: API_NGO_FINANCIAL,
    queryFn: async ({ signal }) => fetchNgoFinancialReports(signal),
    staleTime: 60_000,
  });

  const reports = useMemo(() => {
    if (!API_NGO_FINANCIAL || !query.data) {
      return fallback;
    }

    return query.data.map(mapDtoToRow);
  }, [API_NGO_FINANCIAL, query.data, fallback]);

  return {
    reports,
    isLoading: query.isLoading,
    error: query.error ? (query.error instanceof Error ? query.error.message : 'Unable to load reports') : null,
    usingMockData: !API_NGO_FINANCIAL,
  };
}

function mapDtoToRow(report: FinancialReportDto): NgoFinancialReportRow {
  return {
    id: report.id,
    fiscalYear: report.fiscalYear ?? '—',
    period: report.period ?? '—',
    type: report.reportType ?? 'Utilisation',
    status: report.status ?? 'Pending',
    uploadedAt: formatTimestamp(report.uploadedAt),
    reviewer: report.reviewer ?? undefined,
    url: report.url ?? undefined,
  };
}

function formatTimestamp(timestamp?: string | null) {
  if (!timestamp) return '—';
  try {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (_error) {
    return '—';
  }
}
***PATCH
