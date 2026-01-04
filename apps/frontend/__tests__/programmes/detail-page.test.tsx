import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProgrammeDetailPage from '@/app/dashboard/company/programmes/[id]/page';
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

const mockUseProgrammeDetail = jest.fn(() => ({
  data: null,
  isLoading: false,
  isError: false,
}));

jest.mock('@/lib/hooks/use-company-programmes', () => ({
  useProgrammeDetail: (options: { programmeId: string; enabled: boolean }) => mockUseProgrammeDetail(options),
}));

const mockNotFound = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: mockProgrammes[0].id }),
  notFound: () => mockNotFound(),
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

describe('CSR Programme detail page (flag-aware)', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockGetFeatureFlags.mockReturnValue(baseFlags);
    mockUseProgrammeDetail.mockReturnValue({ data: null, isLoading: false, isError: false });
  });

  it('renders mock detail when flag disabled', async () => {
    mockGetFeatureFlags.mockReturnValueOnce(baseFlags);

    renderWithQuery(<ProgrammeDetailPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: mockProgrammes[0].name })).toBeInTheDocument();
    });

    expect(mockUseProgrammeDetail).toHaveBeenCalledWith({ programmeId: mockProgrammes[0].id, enabled: false });
    expect(screen.getByText(mockProgrammes[0].summary)).toBeInTheDocument();
    expect(mockNotFound).not.toHaveBeenCalled();
  });

  it('renders API detail when flag enabled and hook returns payload', async () => {
    mockGetFeatureFlags.mockReturnValueOnce({ ...baseFlags, API_PROGRAMME: true });

    const apiDetail = {
      id: 'api-programme',
      title: 'API Programme',
      description: 'API description',
      status: 'ACTIVE',
      budget: 1200000,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      companyId: 'company-1',
      milestones: [],
      assignments: [],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-02',
    } as const;

    mockUseProgrammeDetail.mockReturnValueOnce({ data: apiDetail, isLoading: false, isError: false });

    renderWithQuery(<ProgrammeDetailPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /API Programme/i })).toBeInTheDocument();
    });

    expect(mockUseProgrammeDetail).toHaveBeenCalledWith({ programmeId: mockProgrammes[0].id, enabled: true });
    expect(screen.queryByText(mockProgrammes[0].summary)).not.toBeInTheDocument();
    expect(mockNotFound).not.toHaveBeenCalled();
  });

  it('shows skeleton when flag enabled and loading', async () => {
    mockGetFeatureFlags.mockReturnValueOnce({ ...baseFlags, API_PROGRAMME: true });
    mockUseProgrammeDetail.mockReturnValueOnce({ data: null, isLoading: true, isError: false });

    renderWithQuery(<ProgrammeDetailPage />);

    await waitFor(() => {
      expect(screen.getByTestId('programme-detail-skeleton')).toBeInTheDocument();
    });
  });

  it('renders error state when flag enabled and API errors', async () => {
    mockGetFeatureFlags.mockReturnValueOnce({ ...baseFlags, API_PROGRAMME: true });
    mockUseProgrammeDetail.mockReturnValueOnce({ data: null, isLoading: false, isError: true });

    renderWithQuery(<ProgrammeDetailPage />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to load programme details/i)).toBeInTheDocument();
    });
  });
});
