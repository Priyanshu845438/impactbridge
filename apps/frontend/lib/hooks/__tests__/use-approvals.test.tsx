import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';

import {
  useApproveCampaign,
  usePendingApprovals,
  useRejectCampaign,
  useRequestApproval,
  useRevokeApproval,
} from '@/lib/hooks/use-approvals';
import * as approvalsApi from '@/lib/api/approvals';
import { getFeatureFlags } from '@/lib/feature-flags';

jest.mock('@/lib/api/approvals');
jest.mock('@/lib/feature-flags');

const mockedApi = approvalsApi as jest.Mocked<typeof approvalsApi>;
const mockedFlags = getFeatureFlags as jest.MockedFunction<typeof getFeatureFlags>;

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

const approvalSummary = {
  id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  status: 'PENDING' as const,
  remarks: null,
  campaign: {
    id: '5b9e6679-7425-40de-944b-e07fc1f90ae5',
    title: 'Water conservation initiative',
    description: 'Rainwater harvesting in rural schools',
  },
  ngo: {
    id: '4c9e6679-7425-40de-944b-e07fc1f90aa4',
    user: {
      id: '3c9e6679-7425-40de-944b-e07fc1f90ab4',
      name: 'Green Earth Trust',
      email: 'contact@greenearth.org',
    },
  },
  companyId: '2c9e6679-7425-40de-944b-e07fc1f90ac4',
  ngoId: '4c9e6679-7425-40de-944b-e07fc1f90aa4',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('usePendingApprovals', () => {
  beforeEach(() => {
    mockedFlags.mockReturnValue({
      API_DASHBOARD: true,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
    });

    mockedApi.fetchCompanyPendingApprovals.mockResolvedValue([approvalSummary]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches pending approvals when enabled', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => usePendingApprovals(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedApi.fetchCompanyPendingApprovals).toHaveBeenCalledTimes(1);
    expect(result.current.approvals).toHaveLength(1);
    expect(result.current.approvals[0]).toEqual({
      id: approvalSummary.id,
      status: approvalSummary.status,
      remarks: undefined,
      campaign: {
        id: approvalSummary.campaign.id,
        title: approvalSummary.campaign.title,
        description: approvalSummary.campaign.description ?? undefined,
      },
      ngo: {
        id: approvalSummary.ngo.id,
        name: approvalSummary.ngo.user.name,
        email: approvalSummary.ngo.user.email,
      },
      createdAt: approvalSummary.createdAt,
      updatedAt: approvalSummary.updatedAt,
    });
  });

  it('skips query when feature flag disabled', async () => {
    mockedFlags.mockReturnValue({
      API_DASHBOARD: false,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
    });

    const wrapper = createWrapper();
    const { result } = renderHook(() => usePendingApprovals(), { wrapper });

    expect(result.current.isEnabled).toBe(false);
    expect(mockedApi.fetchCompanyPendingApprovals).not.toHaveBeenCalled();
  });
});

describe('approval mutations', () => {
  beforeEach(() => {
    mockedFlags.mockReturnValue({
      API_DASHBOARD: true,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('requests approval and invalidates pending list', async () => {
    const wrapper = createWrapper();
    mockedApi.requestApproval.mockResolvedValue(approvalSummary);
    mockedApi.fetchCompanyPendingApprovals.mockResolvedValue([approvalSummary]);

    const pendingHook = renderHook(() => usePendingApprovals(), { wrapper });
    await waitFor(() => expect(pendingHook.result.current.isLoading).toBe(false));

    const { result } = renderHook(() => useRequestApproval(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        campaignId: approvalSummary.campaign.id,
        payload: { companyId: approvalSummary.companyId, remarks: 'Please approve' },
      });
    });

    expect(mockedApi.requestApproval).toHaveBeenCalledWith(approvalSummary.campaign.id, {
      companyId: approvalSummary.companyId,
      remarks: 'Please approve',
    });
    expect(mockedApi.fetchCompanyPendingApprovals).toHaveBeenCalledTimes(2);
  });

  it('approves campaign and invalidates cache', async () => {
    const wrapper = createWrapper();
    mockedApi.approveCampaign.mockResolvedValue({ ...approvalSummary, status: 'APPROVED' });
    mockedApi.fetchCompanyPendingApprovals.mockResolvedValue([approvalSummary]);

    const pendingHook = renderHook(() => usePendingApprovals(), { wrapper });
    await waitFor(() => expect(pendingHook.result.current.isLoading).toBe(false));

    const { result } = renderHook(() => useApproveCampaign(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        campaignId: approvalSummary.campaign.id,
        payload: { status: 'APPROVED', remarks: 'Looks good' },
      });
    });

    expect(mockedApi.approveCampaign).toHaveBeenCalledWith(approvalSummary.campaign.id, {
      status: 'APPROVED',
      remarks: 'Looks good',
    });
    expect(mockedApi.fetchCompanyPendingApprovals).toHaveBeenCalledTimes(2);
  });

  it('rejects campaign and invalidates cache', async () => {
    const wrapper = createWrapper();
    mockedApi.rejectCampaign.mockResolvedValue({ ...approvalSummary, status: 'REJECTED' });
    mockedApi.fetchCompanyPendingApprovals.mockResolvedValue([approvalSummary]);

    const pendingHook = renderHook(() => usePendingApprovals(), { wrapper });
    await waitFor(() => expect(pendingHook.result.current.isLoading).toBe(false));

    const { result } = renderHook(() => useRejectCampaign(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        campaignId: approvalSummary.campaign.id,
        payload: { status: 'REJECTED', remarks: 'Missing audit trail' },
      });
    });

    expect(mockedApi.rejectCampaign).toHaveBeenCalledWith(approvalSummary.campaign.id, {
      status: 'REJECTED',
      remarks: 'Missing audit trail',
    });
    expect(mockedApi.fetchCompanyPendingApprovals).toHaveBeenCalledTimes(2);
  });

  it('revokes approval and invalidates cache', async () => {
    const wrapper = createWrapper();
    mockedApi.revokeApproval.mockResolvedValue({ ...approvalSummary, status: 'REVOKED' });
    mockedApi.fetchCompanyPendingApprovals.mockResolvedValue([approvalSummary]);

    const pendingHook = renderHook(() => usePendingApprovals(), { wrapper });
    await waitFor(() => expect(pendingHook.result.current.isLoading).toBe(false));

    const { result } = renderHook(() => useRevokeApproval(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        campaignId: approvalSummary.campaign.id,
        payload: { remarks: 'Criteria changed' },
      });
    });

    expect(mockedApi.revokeApproval).toHaveBeenCalledWith(approvalSummary.campaign.id, {
      remarks: 'Criteria changed',
    });
    expect(mockedApi.fetchCompanyPendingApprovals).toHaveBeenCalledTimes(2);
  });
});
