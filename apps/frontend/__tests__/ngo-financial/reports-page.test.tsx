import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import NGOFinancialReportsPage from '@/app/dashboard/ngo/finance/reports/page';
import * as ngoFinancialApi from '@/lib/api/ngo-financial';
import { getFeatureFlags } from '@/lib/feature-flags';

jest.mock('@/lib/api/ngo-financial');
jest.mock('@/lib/feature-flags');
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/dashboard/ngo/finance/reports',
}));

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

describe('NGO financial reports page', () => {
  const mockedFlags = getFeatureFlags as jest.MockedFunction<typeof getFeatureFlags>;
  const mockedApi = ngoFinancialApi as jest.Mocked<typeof ngoFinancialApi>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders mock data when feature flag is disabled', () => {
    mockedFlags.mockReturnValue({
      API_DASHBOARD: false,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
      API_NGO_FINANCIAL: false,
    } as any);

    render(<NGOFinancialReportsPage />, { wrapper: createWrapper() });

    const table = screen.getByRole('table', { name: /financial reports table/i });
    expect(table).toBeInTheDocument();
    expect(screen.getAllByText(/Q2/)[0]).toBeInTheDocument();
    expect(mockedApi.fetchNgoFinancialReports).not.toHaveBeenCalled();
  });

  it('renders API data when feature flag is enabled', async () => {
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
        period: 'Q3',
        type: 'UTILISATION',
        status: 'Verified',
        uploadedAt: '2025-10-15T12:00:00.000Z',
        reviewer: 'Finance Desk',
        url: 'https://example.com/report.pdf',
      } as any,
    ]);

    render(<NGOFinancialReportsPage />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Q3')).toBeInTheDocument());
    expect(screen.getAllByText(/verified/i)[0]).toBeInTheDocument();
    expect(mockedApi.fetchNgoFinancialReports).toHaveBeenCalledTimes(1);
  });

  it('renders empty state when API returns no reports', async () => {
    mockedFlags.mockReturnValue({
      API_DASHBOARD: true,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
      API_NGO_FINANCIAL: true,
    } as any);

    mockedApi.fetchNgoFinancialReports.mockResolvedValue([]);

    render(<NGOFinancialReportsPage />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText(/No reports yet/i)).toBeInTheDocument());
  });
});
