import { apiClient } from '@/lib/api-client';

export interface RawAdminDonation {
  id: string;
  amount: number;
  donationDate: string;
  paymentMode?: string | null;
  paymentRef?: string | null;
  receiptUrl?: string | null;
  campaign?: {
    id: string;
    title: string;
    ngo?: {
      id: string;
      user?: {
        id: string;
        name?: string | null;
        email?: string | null;
      } | null;
    } | null;
  } | null;
  donor?: {
    id: string;
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;
  company?: {
    id: string;
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;
}

export type AdminDonationsResponse = RawAdminDonation[];

export async function fetchAdminDonations(signal?: AbortSignal): Promise<AdminDonationsResponse> {
  return apiClient
    .get('api/v1/donations/admin/all', { signal })
    .json<AdminDonationsResponse>();
}
