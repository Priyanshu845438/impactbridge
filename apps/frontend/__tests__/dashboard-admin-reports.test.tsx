import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminReportsPage from '@/app/dashboard/admin/reports/page';
import * as analyticsApi from '@/lib/api/analytics';

jest.mock('@/providers/auth-context', () => ({
  useAuth: () => ({
    user: { id: '1', name: 'Admin Test', role: 'SUPER_ADMIN' },
    token: 'token',
    login: jest.fn(),
    logout: jest.fn(),
    unreadNotifications: 0,
    markNotificationRead: jest.fn(),
    resetNotifications: jest.fn(),
    syncNotificationsCount: jest.fn(),
  }),
}));

jest.mock('@/providers/query-provider', () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockGetFeatureFlags = jest.fn(() => ({
  API_DASHBOARD: false,
  REALTIME_NOTIFICATIONS: false,
  SERVER_NAVIGATION: false,
  API_AUTH: false,
  API_PROGRAMME: false,
}));

jest.mock('@/lib/feature-flags', () => ({
  ...jest.requireActual('@/lib/feature-flags'),
  getFeatureFlags: () => mockGetFeatureFlags(),
}));

jest.mock('@/lib/api/analytics');

const mockedApi = analyticsApi as jest.Mocked<typeof analyticsApi>;

const mockResponse = {
  donations: {
    totals: [
      { label: 'Last 30 days', amount: 320000, delta: 0.12 },
      { label: 'Today', amount: 25000 },
    ],
    timeline: [
      { date: '2025-02-01T00:00:00.000Z', amount: 50000 },
      { date: '2025-02-02T00:00:00.000Z', amount: 75000 },
    ],
    summary: {
      totalCount: 10,
      totalAmount: 500000,
      today: { count: 2, amount: 25000 },
      last7Days: { count: 4, amount: 125000 },
      last30Days: { count: 8, amount: 320000 },
    },
  },
  programmes: {
    counts: [
      { status: 'ACTIVE', count: 3 },
      { status: 'PENDING', count: 2 },
      { status: 'COMPLETED', count: 1 },
    ],
    summary: {
      totalProgrammes: 6,
      byStatus: {
        ACTIVE: 3,
        PENDING: 2,
        COMPLETED: 1,
      },
    },
  },
  approvals: {
    counts: [
      { status: 'APPROVED', count: 5 },
      { status: 'PENDING', count: 3 },
      { status: 'REVOKED', count: 1 },
    ],
    summary: {
      totalApprovals: 9,
      byStatus: {
        APPROVED: 5,
        PENDING: 3,
        REVOKED: 1,
      },
    },
  },
  financial: {
    totalReports: 14,
    ngoCount: 7,
    latestSubmittedAt: '2025-02-02T10:00:00.000Z',
  },
  recentActivity: [],
};

function renderPage() {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>
      <AdminReportsPage />
    </QueryClientProvider>,
  );
}

describe('Admin reports dashboard wiring', () => {
  beforeEach(() => {
    mockedApi.fetchAdminAnalytics.mockResolvedValue(mockResponse as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockGetFeatureFlags.mockReset();
    mockGetFeatureFlags.mockReturnValue({
      API_DASHBOARD: false,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
    });
  });

  it('keeps mock tiles when API is disabled', async () => {
    renderPage();
    expect(screen.getByText(/Total donations/i)).toBeInTheDocument();
    expect(mockedApi.fetchAdminAnalytics).not.toHaveBeenCalled();
  });

  it('populates analytics when API is enabled', async () => {
    mockGetFeatureFlags.mockReturnValueOnce({
      API_DASHBOARD: true,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
    });

    renderPage();

    await waitFor(() => expect(mockedApi.fetchAdminAnalytics).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText(/NGOs onboarded/i)).toBeInTheDocument());
    expect(screen.getByText(/Latest report/i)).toBeInTheDocument();
  });
});
