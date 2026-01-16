import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useNgoFinancialReports } from '@/lib/hooks/use-ngo-financial-reports';
import * as ngoFinancialApi from '@/lib/api/ngo-financial';
import { getFeatureFlags } from '@/lib/feature-flags';

jest.mock('@/lib/api/ngo-financial');
jest.mock('@/lib/feature-flags');

const mockedApi = ngoFinancialApi as jest.Mocked<typeof ngoFinancialApi>;
const mockedFlags = getFeatureFlags as jest.MockedFunction<typeof getFeatureFlags>;

const fallbackReports = [
  {
    id: 'local-1',
    fiscalYear: '2024-2025',
    period: 'Q1',
    type: 'Audited',
    status: 'Verified',
    uploadedAt: '12 Oct 2025 • 03:45 PM',
    reviewer: 'Finance Desk',
    url: '#',
  },
];

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('useNgoFinancialReports', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns fallback reports when flag disabled', async () => {
    mockedFlags.mockReturnValue({
      API_DASHBOARD: false,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
      API_NGO_FINANCIAL: false,
    } as any);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useNgoFinancialReports(fallbackReports), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockedApi.fetchNgoFinancialReports).not.toHaveBeenCalled();
    expect(result.current.reports).toEqual(fallbackReports);
    expect(result.current.usingMockData).toBe(true);
  });

  it('fetches reports when flag enabled', async () => {
    mockedFlags.mockReturnValue({
      API_DASHBOARD: true,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
      API_NGO_FINANCIAL: true,
    } as any);

    mockedApi.fetchNgoFinancialReports.mockResolvedValue([
      {
        id: 'api-1',
        fiscalYear: '2024-2025',
        period: 'Q2',
        type: 'AUDITED',
        status: 'Submitted',
        uploadedAt: '2025-10-12T12:45:00.000Z',
        reviewer: 'Finance Desk',
        url: 'https://example.com/report.pdf',
      } as any,
    ]);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useNgoFinancialReports(fallbackReports), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockedApi.fetchNgoFinancialReports).toHaveBeenCalledTimes(1);
    expect(result.current.reports).toHaveLength(1);
    expect(result.current.reports[0]).toMatchObject({
      id: 'api-1',
      period: 'Q2',
      type: 'AUDITED',
      status: 'Submitted',
      url: 'https://example.com/report.pdf',
    });
    expect(result.current.usingMockData).toBe(false);
  });

  it('returns error message when request fails', async () => {
    mockedFlags.mockReturnValue({
      API_DASHBOARD: true,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
      API_NGO_FINANCIAL: true,
    } as any);

    mockedApi.fetchNgoFinancialReports.mockRejectedValue(new Error('Network error'));

    const wrapper = createWrapper();
    const { result } = renderHook(() => useNgoFinancialReports(fallbackReports), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Network error');
    expect(result.current.reports).toEqual(fallbackReports);
  });
});
