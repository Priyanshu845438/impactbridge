import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { programmes as mockProgrammes } from '@/app/dashboard/company/programmes/mock-data';
import { useCreateProgramme } from '@/app/dashboard/company/programmes/hooks/useCreateProgramme';
import { useProgrammeStatus } from '@/app/dashboard/company/programmes/hooks/useProgrammeStatus';
import { useCompanyProgrammes, useProgrammeDetail } from '@/lib/hooks/use-company-programmes';
import type { FeatureFlags } from '@/lib/feature-flags';
import { getFeatureFlags } from '@/lib/feature-flags';
import { mapMockDetail } from '@/app/dashboard/company/programmes/api';

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

  describe('useCreateProgramme', () => {
    it('uses mock mutation when API flag disabled', async () => {
      (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: false });

      const { Wrapper, queryClient } = createWrapper();
      const { result } = renderHook(() => useCreateProgramme('company-123'), {
        wrapper: Wrapper,
      });

      await act(async () => {
        const response = await result.current.mutateAsync({
          name: 'Mock Programme',
          summary: 'Summary',
          category: 'Education',
          region: 'Maharashtra',
          status: mockProgrammes[0].status,
        });

        expect(response).toEqual(
          expect.objectContaining({
            success: true,
            programme: expect.objectContaining({ name: 'Mock Programme', summary: 'Summary' }),
          }),
        );
      });

      expect(apiRequest).not.toHaveBeenCalled();
      queryClient.clear();
    });

    it('calls backend create API when flag enabled', async () => {
      (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: true });

      const apiResponse = {
        programme: {
          id: 'programme-api',
          title: 'API Programme',
          description: 'Created via API',
          status: 'ACTIVE',
          companyId: 'company-123',
          milestones: [],
          assignments: [],
          createdAt: 'today',
          updatedAt: 'today',
        },
      } as const;

      apiRequest.mockResolvedValueOnce({ data: apiResponse });

      const { Wrapper, queryClient } = createWrapper();
      const { result } = renderHook(() => useCreateProgramme('company-123'), {
        wrapper: Wrapper,
      });

      await act(async () => {
        const response = await result.current.mutateAsync({
          name: 'API Programme',
          summary: 'Created via API',
          category: 'Education',
          region: 'Maharashtra',
          status: mockProgrammes[0].status,
        });

        expect(apiRequest).toHaveBeenCalledWith({
          method: 'POST',
          path: '/api/v1/companies/company-123/csr-programmes',
          body: {
            title: 'API Programme',
            description: 'Created via API',
            status: mockProgrammes[0].status.toUpperCase(),
          },
        });

        expect(response).toEqual(apiResponse);
      });

      queryClient.clear();
    });
  });

  describe('useProgrammeStatus', () => {
    it('uses mock transition when API flag disabled', async () => {
      (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: false });

      const { Wrapper, queryClient } = createWrapper();
      const { result } = renderHook(() => useProgrammeStatus('company-123'), {
        wrapper: Wrapper,
      });

      await act(async () => {
        const response = await result.current.mutateAsync({
          programmeId: 'programme-1',
          nextStatus: mockProgrammes[0].status,
        });

        expect(response).toEqual({ success: true, status: mockProgrammes[0].status });
      });

      expect(apiRequest).not.toHaveBeenCalled();
      queryClient.clear();
    });

    it('calls backend status API when flag enabled', async () => {
      (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: true });

      apiRequest.mockResolvedValueOnce({ data: { status: 'ACTIVE' } });

      const { Wrapper, queryClient } = createWrapper();
      const { result } = renderHook(() => useProgrammeStatus('company-123'), {
        wrapper: Wrapper,
      });

      await act(async () => {
        const response = await result.current.mutateAsync({
          programmeId: 'programme-1',
          nextStatus: 'Active',
        });

        expect(apiRequest).toHaveBeenCalledWith({
          method: 'POST',
          path: '/api/v1/companies/company-123/csr-programmes/programme-1/status',
          body: { status: 'ACTIVE' },
        });

        expect(response).toEqual({ success: true, status: 'Active' });
      });

      queryClient.clear();
    });
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
        description: 'Backed by API',
        state: 'ACTIVE',
        ownerCompanyId: 'company-123',
        ngoId: 'ngo-1',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
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
    expect(listHook.result.current.data).toEqual([
      {
        id: 'programme-1',
        title: 'Backend Programme',
        description: 'Backed by API',
        ownerCompanyId: 'company-123',
        ngoId: 'ngo-1',
        state: 'ACTIVE',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        createdAt: 'today',
        updatedAt: 'today',
      },
    ]);
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

  it('returns mock detail when API flag disabled', async () => {
    (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: false });

    const mockDetail = mapMockDetail('company-1', mockProgrammes[0].id);
    const { Wrapper, queryClient } = createWrapper();

    const { result } = renderHook(
      () => useProgrammeDetail({ enabled: true, programmeId: mockProgrammes[0].id, companyId: 'company-1' }),
      { wrapper: Wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiRequest).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockDetail);

    queryClient.clear();
  });

  it('falls back to mock detail when API returns null', async () => {
    (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: true });
    apiRequest.mockResolvedValueOnce({ data: [] });
    apiRequest.mockResolvedValueOnce({ data: null });

    const { Wrapper: listWrapper, queryClient: listClient } = createWrapper();
    renderHook(() => useCompanyProgrammes({ enabled: true, companyId: 'company-123' }), {
      wrapper: listWrapper,
    });

    await waitFor(() => expect(apiRequest).toHaveBeenCalledTimes(1));
    listClient.clear();

    const { Wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useProgrammeDetail({ enabled: true, programmeId: mockProgrammes[0].id, companyId: 'company-123' }),
      { wrapper: Wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiRequest).toHaveBeenNthCalledWith(2, {
      path: `/api/v1/companies/company-123/csr-programmes/${mockProgrammes[0].id}`,
    });
    expect(result.current.data).toEqual(mapMockDetail('company-123', mockProgrammes[0].id));

    queryClient.clear();
  });

  it('falls back to mock list when API returns empty array', async () => {
    (getFeatureFlags as jest.Mock).mockReturnValue({ ...baseFlags, API_PROGRAMME: true });
    apiRequest.mockResolvedValueOnce({ data: [] });

    const { Wrapper, queryClient } = createWrapper();

    const { result } = renderHook(() => useCompanyProgrammes({ enabled: true, companyId: 'company-123' }), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiRequest).toHaveBeenCalledWith({
      path: '/api/v1/companies/company-123/csr-programmes',
    });
    expect(result.current.data).toEqual(
      mockProgrammes.map((programme) => expect.objectContaining({ id: programme.id })),
    );

    queryClient.clear();
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
