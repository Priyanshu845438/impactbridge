import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { AdminDonationsResponse } from '@/lib/api/donations';
import { fetchAdminDonations } from '@/lib/api/donations';
import { isFeatureEnabled } from '@/lib/feature-flags';

export type AdminDonationTableRecord = {
  id: string;
  donor: string;
  donorId: string;
  entity: string;
  entityType: 'NGO' | 'Campaign';
  amount: string;
  mode: string;
  status: string;
  ngo: string;
  company: string;
  date: string;
};

const paymentModeLabels: Record<string, string> = {
  UPI: 'UPI',
  CARD: 'Card',
  BANK_TRANSFER: 'Bank transfer',
  BANK: 'Bank',
  FOREIGN: 'Foreign',
  DOMESTIC: 'Domestic',
  PUBLIC_FORM: 'Public form',
};

export function useAdminDonations() {
  const enabled = isFeatureEnabled('API_DASHBOARD');

  const query = useQuery({
    queryKey: ['admin-donations'],
    queryFn: async ({ signal }) => fetchAdminDonations(signal),
    enabled,
    staleTime: 60_000,
  });

  const formatted = useMemo<AdminDonationTableRecord[]>(() => {
    const data: AdminDonationsResponse | undefined = query.data;
    if (!data) {
      return [];
    }

    return data.map((donation) => {
      const donorName = donation.donor?.user?.name ?? 'Unknown donor';
      const donorId = donation.donor?.id ?? 'unknown';
      const ngoName = donation.campaign?.ngo?.user?.name ?? 'Unknown NGO';
      const companyName = donation.company?.user?.name ?? '—';
      const entityTitle = donation.campaign?.title ?? ngoName;
      const paymentMode = donation.paymentMode ? paymentModeLabels[donation.paymentMode] ?? donation.paymentMode : 'Unknown';
      const status = donation.paymentRef ? 'Success' : 'Pending';

      return {
        id: donation.id,
        donor: donorName,
        donorId,
        entity: entityTitle,
        entityType: donation.campaign ? 'Campaign' : 'NGO',
        amount: new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(donation.amount),
        mode: paymentMode,
        status,
        ngo: ngoName,
        company: companyName,
        date: new Date(donation.donationDate).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      } satisfies AdminDonationTableRecord;
    });
  }, [query.data]);

  return {
    data: formatted,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    isEnabled: enabled,
  };
}

export type UseAdminDonationsReturn = ReturnType<typeof useAdminDonations>;
