import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import * as analyticsApi from '@/lib/api/analytics';
import AdminDashboard from '@/app/dashboard/admin/page';

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

jest.mock('@/lib/feature-flags', () => ({
  ...jest.requireActual('@/lib/feature-flags'),
  isFeatureEnabled: (key: string) => key === 'API_DASHBOARD',
  getFeatureFlags: () => ({
    API_DASHBOARD: process.env.NEXT_PUBLIC_FLAG_API_DASHBOARD === 'true',
    REALTIME_NOTIFICATIONS: false,
    SERVER_NAVIGATION: false,
  }),
}));

jest.mock('@/lib/api/analytics');

const mockedFetch = analyticsApi as jest.Mocked<typeof analyticsApi>;

function renderWithQuery(ui: React.ReactElement) {
  const client = new QueryClient();
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

const mockResponse = {
  donations: {
    totals: [],
    timeline: [],
    summary: {
      totalCount: 10,
      totalAmount: 500000,
      today: { count: 2, amount: 25000 },
      last7Days: { count: 4, amount: 125000 },
      last30Days: { count: 8, amount: 320000 },
    },
  },
  programmes: {
    counts: [],
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
    counts: [],
    summary: {
      totalApprovals: 9,
      byStatus: {
        APPROVED: 5,
        PENDING: 3,
        REVOKED: 1,
      },
    },
  },
  recentActivity: [],
};

describe('Admin analytics dashboard data wiring', () => {
  beforeEach(() => {
    mockedFetch.fetchAdminAnalytics.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders mock data when flag is disabled', () => {
    process.env.NEXT_PUBLIC_FLAG_API_DASHBOARD = 'false';
    renderWithQuery(<AdminDashboard />);

    expect(screen.getByText(/platform engagement across the last 30 days/i)).toBeInTheDocument();
    expect(mockedFetch.fetchAdminAnalytics).not.toHaveBeenCalled();
  });

  it('fetches analytics when flag is enabled', async () => {
    process.env.NEXT_PUBLIC_FLAG_API_DASHBOARD = 'true';
    renderWithQuery(<AdminDashboard />);

    await waitFor(() => expect(mockedFetch.fetchAdminAnalytics).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/total donations/i)).toBeInTheDocument();
  });
});
