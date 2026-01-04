import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { programmes as mockProgrammes } from '@/app/dashboard/company/programmes/mock-data';
import { useCompanyProgrammes, useProgrammeDetail } from '@/lib/hooks/use-company-programmes';
import type { FeatureFlags } from '@/lib/feature-flags';
import { getFeatureFlags } from '@/lib/feature-flags';

jest.mock('@/lib/feature-flags', () => ({
  getFeatureFlags: jest.fn(),
}));

jest.mock('@/lib/api/client', () => ({
  apiRequest: jest.fn(),
}));

const { apiRequest } = jest.requireMock('@/lib/api/client') as {
  apiRequest: jest.Mock;
};

const baseFlags: FeatureFlags = {
  API_DASHBOARD: false,
  REALTIME_NOTIFICATIONS: false,
  SERVER_NAVIGATION: false,
  API_AUTH: false,
  API_PROGRAMME: false,
};

function createWrapper() {
  const queryClient = new QueryClient();
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { Wrapper, queryClient };
}

describe('CSR programme data hooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('falls back to mock data when API flag disabled', async () => {
    (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: false });

    const { Wrapper, queryClient } = createWrapper();

    const { result } = renderHook(() => useCompanyProgrammes({ enabled: true }), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiRequest).not.toHaveBeenCalled();
    expect(result.current.data?.[0]?.id).toBe(mockProgrammes[0].id);
    expect(result.current.data?.[0]?.title).toBe(mockProgrammes[0].name);

    queryClient.clear();
  });

  it('calls backend when API flag enabled', async () => {
    (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: true });

    const listPayload = [
      {
        id: 'programme-1',
        title: 'Backend Programme',
        status: 'ACTIVE',
        companyId: 'company-123',
        assignments: [],
        milestones: [],
        createdAt: 'today',
        updatedAt: 'today',
      },
    ];

    const detailPayload = {
      id: 'programme-1',
      title: 'Backend Programme',
      status: 'ACTIVE',
      companyId: 'company-123',
      assignments: [],
      milestones: [],
      createdAt: 'today',
      updatedAt: 'today',
    } as const;

    apiRequest.mockResolvedValueOnce({ data: listPayload });
    apiRequest.mockResolvedValueOnce({ data: detailPayload });

    const { Wrapper: listWrapper, queryClient: listQueryClient } = createWrapper();
    const listHook = renderHook(
      () => useCompanyProgrammes({ enabled: true, companyId: 'company-123' }),
      { wrapper: listWrapper },
    );

    await waitFor(() => expect(listHook.result.current.isSuccess).toBe(true));
    expect(apiRequest).toHaveBeenNthCalledWith(1, {
      path: '/api/v1/companies/company-123/csr-programmes',
    });
    expect(listHook.result.current.data).toEqual(listPayload);
    listQueryClient.clear();

    const { Wrapper: detailWrapper, queryClient: detailQueryClient } = createWrapper();
    const detailHook = renderHook(
      () => useProgrammeDetail({ enabled: true, programmeId: 'programme-1', companyId: 'company-123' }),
      { wrapper: detailWrapper },
    );

    await waitFor(() => expect(detailHook.result.current.isSuccess).toBe(true));
    expect(apiRequest).toHaveBeenNthCalledWith(2, {
      path: '/api/v1/companies/company-123/csr-programmes/programme-1',
    });
    expect(detailHook.result.current.data).toEqual(detailPayload);
    detailQueryClient.clear();

  });

  it('does not run queries when disabled', () => {
    (getFeatureFlags as jest.Mock).mockReturnValue(baseFlags);

    const { Wrapper: listWrapper, queryClient: listQueryClient } = createWrapper();
    const listHook = renderHook(
      () => useCompanyProgrammes({ enabled: false, companyId: 'company-1' }),
      { wrapper: listWrapper },
    );

    expect(listHook.result.current.isLoading).toBe(false);
    expect(listHook.result.current.data).toBeUndefined();

    const { Wrapper: detailWrapper, queryClient: detailQueryClient } = createWrapper();
    const detailHook = renderHook(
      () => useProgrammeDetail({ enabled: false, programmeId: 'programme-1', companyId: 'company-1' }),
      { wrapper: detailWrapper },
    );

    expect(detailHook.result.current.isLoading).toBe(false);
    expect(detailHook.result.current.data).toBeUndefined();
    expect(apiRequest).not.toHaveBeenCalled();

    listQueryClient.clear();
    detailQueryClient.clear();
  });
});
