import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as donationsApi from '@/lib/api/donations';
import DonationHistoryPage from '@/app/dashboard/admin/donations/page';

jest.mock('@/providers/auth-context', () => ({
  useAuth: () => ({
    user: { id: 'admin', name: 'Super Admin', role: 'SUPER_ADMIN' },
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
  isFeatureEnabled: jest.fn((key: string) => key === 'API_DASHBOARD'),
}));

jest.mock('@/lib/api/donations');

const mockedDonations = donationsApi as jest.Mocked<typeof donationsApi>;

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient();
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('Admin Donations dashboard wiring', () => {
  beforeEach(() => {
    mockedDonations.fetchAdminDonations.mockResolvedValue([
      {
        id: 'don-1',
        amount: 250000,
        donationDate: new Date('2024-05-20').toISOString(),
        paymentMode: 'UPI',
        paymentRef: 'REF-123',
        receiptUrl: null,
        campaign: {
          id: 'camp-1',
          title: 'River Cleanup',
          ngo: {
            id: 'ngo-1',
            user: { id: 'ngo-user', name: 'River Guardians', email: 'river@ngo.org' },
          },
        },
        donor: {
          id: 'donor-profile',
          user: { id: 'donor-user', name: 'Anaya Sharma', email: 'anaya@example.com' },
        },
        company: {
          id: 'company-profile',
          user: { id: 'company-user', name: 'NorthBridge CSR', email: 'csr@northbridge.com' },
        },
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders live donations when API flag is enabled', async () => {
    renderWithClient(<DonationHistoryPage />);

    await waitFor(() => expect(mockedDonations.fetchAdminDonations).toHaveBeenCalled());

    const donorCells = await screen.findAllByText('Anaya Sharma');
    expect(donorCells.length).toBeGreaterThan(0);
    const programmeCells = await screen.findAllByText('River Cleanup');
    expect(programmeCells.length).toBeGreaterThan(0);
    const amountCells = await screen.findAllByText(/₹/);
    expect(amountCells.length).toBeGreaterThan(0);
  });
});
