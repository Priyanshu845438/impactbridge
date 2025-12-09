"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarRange,
  ChevronDown,
  Download,
  Filter,
  Loader2,
  ReceiptText,
  Search,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeader } from "@/components/dashboard/section-header";
import { cn } from "@/lib/utils";

const mockCampaigns = [
  { id: "cmp-21", name: "Rural Health Kits" },
  { id: "cmp-22", name: "School Nutrition Drive" },
  { id: "cmp-23", name: "Community Rainwater Harvesting" },
  { id: "cmp-24", name: "Digital Literacy Labs" },
];

const mockDonations = [
  {
    id: "txn-8721",
    donor: "Aarav Mehta",
    campaign: "Rural Health Kits",
    amount: 15000,
    mode: "UPI" as const,
    status: "Success" as const,
    date: "12 Nov 2025",
  },
  {
    id: "txn-8703",
    donor: "Bright Future CSR",
    campaign: "School Nutrition Drive",
    amount: 120000,
    mode: "Bank" as const,
    status: "Pending" as const,
    date: "10 Nov 2025",
  },
  {
    id: "txn-8694",
    donor: "Harish Mehta",
    campaign: "Rural Health Kits",
    amount: 8500,
    mode: "Card" as const,
    status: "Success" as const,
    date: "03 Nov 2025",
  },
  {
    id: "txn-8688",
    donor: "Unity Trust",
    campaign: "Community Rainwater Harvesting",
    amount: 50000,
    mode: "UPI" as const,
    status: "Failed" as const,
    date: "28 Oct 2025",
  },
  {
    id: "txn-8679",
    donor: "Global Giving Circle",
    campaign: "Digital Literacy Labs",
    amount: 45000,
    mode: "Card" as const,
    status: "Success" as const,
    date: "23 Oct 2025",
  },
  {
    id: "txn-8664",
    donor: "Nikita Rao",
    campaign: "School Nutrition Drive",
    amount: 26000,
    mode: "UPI" as const,
    status: "Success" as const,
    date: "19 Oct 2025",
  },
];

type StatusFilter = "All" | "Success" | "Pending" | "Failed";

interface FilterState {
  campaign: string;
  status: StatusFilter;
  search: string;
}

const initialFilters: FilterState = { campaign: "All", status: "All", search: "" };

const statusTone: Record<Exclude<StatusFilter, "All">, string> = {
  Success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  Failed: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
};

export default function NGODonationsPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 600);
    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (!isError) return;
    const timer = setTimeout(() => setIsError(false), 2400);
    return () => clearTimeout(timer);
  }, [isError]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const filteredDonations = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return mockDonations.filter((donation) => {
      const matchesCampaign =
        filters.campaign === "All" || donation.campaign === filters.campaign;
      const matchesStatus = filters.status === "All" || donation.status === filters.status;
      const matchesQuery =
        !query ||
        donation.donor.toLowerCase().includes(query) ||
        donation.campaign.toLowerCase().includes(query) ||
        donation.id.toLowerCase().includes(query);

      return matchesCampaign && matchesStatus && matchesQuery;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredDonations.length / pageSize));
  const paginatedDonations = filteredDonations.slice((page - 1) * pageSize, page * pageSize);

  const totals = useMemo(() => {
    const totalDonations = mockDonations.reduce((sum, donation) => sum + donation.amount, 0);
    const verifiedFunds = mockDonations
      .filter((donation) => donation.status === "Success")
      .reduce((sum, donation) => sum + donation.amount, 0);
    const pendingAmount = mockDonations
      .filter((donation) => donation.status === "Pending")
      .reduce((sum, donation) => sum + donation.amount, 0);
    const average = mockDonations.length
      ? Math.round(totalDonations / mockDonations.length)
      : 0;

    return {
      totalDonations,
      verifiedFunds,
      pendingAmount,
      average,
    };
  }, []);

  const paginationDisabled = isLoading || filteredDonations.length === 0;

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard/ngo" },
    { label: "Donations" },
  ];

  function handleFilterChange(partial: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  function formatCurrency(amount: number) {
    return `₹${Intl.NumberFormat("en-IN").format(amount)}`;
  }

  return (
    <div className="space-y-8 pb-12">
      {isLoading ? <Skeleton className="h-5 w-48" /> : <Breadcrumb items={breadcrumbItems} />}

      <SectionHeader
        title="Donations"
        subtitle="Overview of contributions across all active campaigns."
        action={
          <Button type="button" variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-32 rounded-3xl" />)
        ) : filteredDonations.length === 0 && filters.search ? (
          <Card className="col-span-full flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center dark:border-slate-700 dark:bg-slate-900/60">
            <ReceiptText className="h-10 w-10 text-slate-400" aria-hidden />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">No matches found</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Try refining your search keywords or adjust the filters to broaden results.
              </p>
            </div>
          </Card>
        ) : (
          <>
            <KpiCard
              label="Total donations"
              value={formatCurrency(totals.totalDonations)}
              helper="Since platform onboarding"
              tone="emerald"
            />
            <KpiCard
              label="Verified funds"
              value={formatCurrency(totals.verifiedFunds)}
              helper="Settled and reconciled"
              tone="sky"
            />
            <KpiCard
              label="Pending approvals"
              value={formatCurrency(totals.pendingAmount)}
              helper="Awaiting compliance review"
              tone="amber"
            />
            <KpiCard
              label="Avg donation size"
              value={formatCurrency(totals.average)}
              helper="Across all campaigns"
              tone="violet"
            />
          </>
        )}
      </section>

      <section className="rounded-4xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="space-y-6 p-6">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                <Filter className="h-3.5 w-3.5" />
                Filter donations
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarRange className="h-4 w-4" />
                Date range
              </span>
              <span className="inline-flex items-center gap-2">
                <ReceiptText className="h-4 w-4" />
                {filteredDonations.length} records
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarRange className="h-4 w-4" />
                Last 90 days
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                More filters
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-600 hover:text-amber-700 dark:text-amber-300"
                onClick={() => setIsError(true)}
              >
                Simulate sync issue
              </Button>
            </div>
          </header>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <Input
                placeholder="Search donor, campaign, or transaction"
                className="pl-9"
                value={filters.search}
                onChange={(event) => handleFilterChange({ search: event.target.value })}
                aria-label="Search donations"
              />
            </div>

            <div className="flex flex-1 flex-wrap items-center gap-2">
              <Select
                value={filters.campaign}
                onValueChange={(value) => handleFilterChange({ campaign: value })}
              >
                <SelectTrigger className="w-full min-w-[200px] lg:w-56">
                  <SelectValue placeholder="Filter by campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All campaigns</SelectItem>
                  {mockCampaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.name}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.status}
                onValueChange={(value: StatusFilter) => handleFilterChange({ status: value })}
              >
                <SelectTrigger className="w-full min-w-[200px] lg:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All statuses</SelectItem>
                  <SelectItem value="Success">Success</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <DonationTableSkeleton />
          ) : isError ? (
            <ErrorState onRetry={() => setIsError(false)} />
          ) : filteredDonations.length === 0 ? (
            <EmptyState />
          ) : (
            <DonationTable donations={paginatedDonations} onView={(id) => console.log("view", id)} />
          )}

          <footer className="flex flex-col items-center gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 lg:flex-row lg:justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={paginationDisabled || page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={paginationDisabled || page === totalPages}
              >
                Next
              </Button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

interface KpiCardProps {
  label: string;
  value: string;
  helper: string;
  tone: "emerald" | "sky" | "amber" | "violet";
}

function KpiCard({ label, value, helper, tone }: KpiCardProps) {
  const toneClasses: Record<KpiCardProps["tone"], string> = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
    sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
    violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200",
  };

  return (
    <Card className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <span
        className={cn(
          "inline-flex w-fit items-center gap-2 rounded-2xl px-3 py-1 text-xs font-semibold",
          toneClasses[tone],
        )}
      >
        {label}
      </span>
      <p className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{value}</p>
      <span className="text-sm text-slate-500 dark:text-slate-400">{helper}</span>
    </Card>
  );
}

interface Donation {
  id: string;
  donor: string;
  campaign: string;
  amount: number;
  mode: "UPI" | "Card" | "Bank";
  status: Exclude<StatusFilter, "All">;
  date: string;
}

function DonationTable({ donations, onView }: { donations: Donation[]; onView: (id: string) => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
      <div className="hidden divide-y divide-slate-200 bg-slate-50 dark:divide-slate-800 dark:bg-slate-900/70 md:grid">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <span>Donor</span>
          <span>Campaign</span>
          <span className="text-right">Amount</span>
          <span>Payment mode</span>
          <span>Status</span>
          <span>Date</span>
        </div>
      </div>
      <ul className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
        {donations.map((donation) => (
          <li key={donation.id} className="flex flex-col gap-4 px-6 py-5 md:grid md:grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] md:items-center md:gap-4">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">{donation.donor}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Txn #{donation.id}</p>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">{donation.campaign}</div>
            <div className="text-right text-sm font-semibold text-slate-900 dark:text-slate-50">
              ₹{Intl.NumberFormat("en-IN").format(donation.amount)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">{donation.mode}</div>
            <div>
              <Badge
                className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusTone[donation.status])}
              >
                {donation.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between md:block">
              <span className="text-sm text-slate-600 dark:text-slate-300">{donation.date}</span>
              <Button
                size="sm"
                variant="ghost"
                className="mt-2 gap-2 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-300"
                onClick={() => onView(donation.id)}
              >
                View receipt
                <ReceiptText className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DonationTableSkeleton() {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/60">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <ReceiptText className="h-10 w-10 text-slate-400" aria-hidden />
      <div className="space-y-1">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">No donations yet</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          You&apos;ll see real-time donation activity here once contributions start flowing in.
        </p>
      </div>
      <Button size="sm" className="mt-2" variant="outline">
        Explore campaign tips
      </Button>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-rose-200 bg-rose-50/80 p-12 text-center dark:border-rose-800/60 dark:bg-rose-900/40">
      <Loader2 className="h-10 w-10 animate-spin text-rose-400" aria-hidden />
      <div className="space-y-1">
        <p className="text-lg font-semibold text-rose-600 dark:text-rose-200">Unable to load donations</p>
        <p className="text-sm text-rose-500 dark:text-rose-300">
          Please check your connection or try refreshing the page. We&apos;ll sync your data as soon as possible.
        </p>
      </div>
      <Button size="sm" variant="outline" onClick={onRetry}>
        Retry sync
      </Button>
    </Card>
  );
}
