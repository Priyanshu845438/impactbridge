import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import * as analyticsApi from '@/lib/api/analytics';
import { useAdminAnalytics } from '@/lib/hooks/use-admin-analytics';

jest.mock('@/lib/api/analytics');

const mockedFetch = analyticsApi as jest.Mocked<typeof analyticsApi>;

function createWrapper() {
  const client = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

const payload = {
  donations: {
    totals: [],
    timeline: [],
    summary: {
      totalCount: 52,
      totalAmount: 1250000,
      today: { count: 4, amount: 12000 },
      last7Days: { count: 16, amount: 420000 },
      last30Days: { count: 48, amount: 1070000 },
    },
  },
  programmes: {
    counts: [],
    summary: {
      totalProgrammes: 18,
      byStatus: {
        ACTIVE: 12,
        PENDING: 4,
        COMPLETED: 2,
      },
    },
  },
  approvals: {
    counts: [],
    summary: {
      totalApprovals: 24,
      byStatus: {
        APPROVED: 18,
        PENDING: 5,
        REVOKED: 1,
      },
    },
  },
  recentActivity: [],
};

describe('useAdminAnalytics', () => {
  beforeEach(() => {
    mockedFetch.fetchAdminAnalytics.mockResolvedValue(payload);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches analytics when enabled', async () => {
    const { result } = renderHook(() => useAdminAnalytics({ enabled: true }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.donationStats[0].amount).toBe(1250000);
    expect(mockedFetch.fetchAdminAnalytics).toHaveBeenCalledTimes(1);
  });

  it('does not run when disabled', async () => {
    const { result } = renderHook(() => useAdminAnalytics({ enabled: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isIdle).toBe(true));
    expect(mockedFetch.fetchAdminAnalytics).not.toHaveBeenCalled();
  });
});

