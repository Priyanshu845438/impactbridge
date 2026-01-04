import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CompanyProgrammeDirectoryPage from '@/app/dashboard/company/programmes/page';
import type { FeatureFlags } from '@/lib/feature-flags';
import { programmes as mockProgrammes } from '@/app/dashboard/company/programmes/mock-data';

const baseFlags: FeatureFlags = {
  API_DASHBOARD: false,
  REALTIME_NOTIFICATIONS: false,
  SERVER_NAVIGATION: false,
  API_AUTH: false,
  API_PROGRAMME: false,
};

const mockGetFeatureFlags = jest.fn(() => baseFlags);

jest.mock('@/lib/feature-flags', () => ({
  getFeatureFlags: () => mockGetFeatureFlags(),
}));

const mockUseCompanyProgrammes = jest.fn(() => ({
  data: undefined,
  isLoading: false,
  isError: false,
}));

jest.mock('@/lib/hooks/use-company-programmes', () => ({
  useCompanyProgrammes: (options: { enabled: boolean }) => mockUseCompanyProgrammes(options),
}));

jest.mock('@/hooks/use-debounced-value', () => ({
  useDebouncedValue: <T,>(value: T) => value,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentPropsWithoutRef<'img'>) => <img {...props} alt={props.alt ?? ''} />,
}));

function renderWithQuery(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('CSR Programme list page (flag-aware)', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockGetFeatureFlags.mockReturnValue(baseFlags);
    mockUseCompanyProgrammes.mockReturnValue({ data: undefined, isLoading: false, isError: false });
  });

  it('renders mock list when flag disabled', async () => {
    mockGetFeatureFlags.mockReturnValueOnce(baseFlags);

    renderWithQuery(<CompanyProgrammeDirectoryPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /CSR Programmes/i })).toBeInTheDocument();
    });

    expect(mockUseCompanyProgrammes).toHaveBeenCalledWith({ enabled: false });
    expect(screen.getByText(mockProgrammes[0].name)).toBeInTheDocument();
  });

  it('renders API data when flag enabled and hook returns payload', async () => {
    mockGetFeatureFlags.mockReturnValueOnce({ ...baseFlags, API_PROGRAMME: true });

    const apiProgrammes = [
      {
        id: 'api-1',
        title: 'API Programme',
        description: 'Programme from backend',
        ownerCompanyId: 'company-1',
        ngoId: undefined,
        state: 'ACTIVE',
        startDate: undefined,
        endDate: undefined,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ];

    mockUseCompanyProgrammes.mockReturnValueOnce({ data: apiProgrammes, isLoading: false, isError: false });

    renderWithQuery(<CompanyProgrammeDirectoryPage />);

    await waitFor(() => {
      expect(screen.getByText('API Programme')).toBeInTheDocument();
    });

    expect(mockUseCompanyProgrammes).toHaveBeenCalledWith({ enabled: true });
    expect(screen.queryByText(mockProgrammes[0].name)).not.toBeInTheDocument();
  });

  it('falls back to mock list when API returns empty array', async () => {
    mockGetFeatureFlags.mockReturnValueOnce({ ...baseFlags, API_PROGRAMME: true });

    mockUseCompanyProgrammes.mockReturnValueOnce({ data: [], isLoading: false, isError: false });

    renderWithQuery(<CompanyProgrammeDirectoryPage />);

    await waitFor(() => {
      expect(screen.getByText(mockProgrammes[0].name)).toBeInTheDocument();
    });

    expect(mockUseCompanyProgrammes).toHaveBeenCalledWith({ enabled: true });
  });

  it('shows skeleton when API flag on and hook loading', async () => {
    mockGetFeatureFlags.mockReturnValueOnce({ ...baseFlags, API_PROGRAMME: true });
    mockUseCompanyProgrammes.mockReturnValueOnce({ data: undefined, isLoading: true, isError: false });

    renderWithQuery(<CompanyProgrammeDirectoryPage />);

    expect(await screen.findAllByTestId('programme-skeleton-card')).toHaveLength(6);
  });

  it('shows error banner when API flag on and hook errors', async () => {
    mockGetFeatureFlags.mockReturnValueOnce({ ...baseFlags, API_PROGRAMME: true });
    mockUseCompanyProgrammes.mockReturnValueOnce({ data: undefined, isLoading: false, isError: true });

    renderWithQuery(<CompanyProgrammeDirectoryPage />);

    await waitFor(() => {
      expect(screen.getByText(/Programme data unavailable/i)).toBeInTheDocument();
    });
  });
});
