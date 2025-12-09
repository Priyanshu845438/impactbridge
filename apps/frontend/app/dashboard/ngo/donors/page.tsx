"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Filter,
  Mail,
  Search,
  TrendingUp,
  UserCircle,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/dashboard/section-header";
import { cn } from "@/lib/utils";

type DonationStatus = "Success" | "Failed" | "Refunded";

interface DonorProfile {
  id: string;
  name: string;
  email: string;
  totalAmount: number;
  donationsCount: number;
  topCampaign: string;
  frequency: "One-time" | "Repeat";
  preferredMethod: "UPI" | "Card" | "Bank";
  averageDonation: number;
  status: DonationStatus;
}

const mockDonors: DonorProfile[] = [
  {
    id: "donor-001",
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    totalAmount: 150000,
    donationsCount: 7,
    topCampaign: "Rural Health Kits",
    frequency: "Repeat",
    preferredMethod: "UPI",
    averageDonation: 21428,
    status: "Success",
  },
  {
    id: "donor-002",
    name: "Bright Future CSR",
    email: "csr@brightfuture.org",
    totalAmount: 420000,
    donationsCount: 3,
    topCampaign: "School Nutrition Drive",
    frequency: "Repeat",
    preferredMethod: "Bank",
    averageDonation: 140000,
    status: "Success",
  },
  {
    id: "donor-003",
    name: "Harish Mehta",
    email: "harish.mehta@example.com",
    totalAmount: 22000,
    donationsCount: 2,
    topCampaign: "Community Rainwater Harvesting",
    frequency: "One-time",
    preferredMethod: "Card",
    averageDonation: 11000,
    status: "Refunded",
  },
  {
    id: "donor-004",
    name: "Unity Trust",
    email: "support@unitytrust.in",
    totalAmount: 95000,
    donationsCount: 2,
    topCampaign: "Digital Literacy Labs",
    frequency: "One-time",
    preferredMethod: "UPI",
    averageDonation: 47500,
    status: "Failed",
  },
  {
    id: "donor-005",
    name: "Global Giving Circle",
    email: "team@globalgivingcircle.org",
    totalAmount: 180000,
    donationsCount: 5,
    topCampaign: "Rural Health Kits",
    frequency: "Repeat",
    preferredMethod: "Bank",
    averageDonation: 36000,
    status: "Success",
  },
  {
    id: "donor-006",
    name: "Nikita Rao",
    email: "nikita.rao@example.com",
    totalAmount: 48000,
    donationsCount: 4,
    topCampaign: "School Nutrition Drive",
    frequency: "Repeat",
    preferredMethod: "UPI",
    averageDonation: 12000,
    status: "Success",
  },
];

interface FilterState {
  search: string;
  frequency: "All" | "One-time" | "Repeat";
  status: "All" | DonationStatus;
  amountRange: [number, number];
}

const initialFilters: FilterState = { search: "", frequency: "All", status: "All", amountRange: [0, 500000] };

const donationStatusTone: Record<DonationStatus, string> = {
  Success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  Failed: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
  Refunded: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
};

export default function NGODonorProfilesPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isLoading] = useState(false);
  const [activeDonorId, setActiveDonorId] = useState<string | null>(null);

  const filteredDonors = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return mockDonors.filter((donor) => {
      const matchesSearch =
        !query || donor.name.toLowerCase().includes(query) || donor.email.toLowerCase().includes(query);
      const matchesFrequency = filters.frequency === "All" || donor.frequency === filters.frequency;
      const matchesStatus = filters.status === "All" || donor.status === filters.status;
      const matchesAmount =
        donor.totalAmount >= filters.amountRange[0] && donor.totalAmount <= filters.amountRange[1];

      return matchesSearch && matchesFrequency && matchesStatus && matchesAmount;
    });
  }, [filters]);

  const activeDonor = filteredDonors.find((donor) => donor.id === activeDonorId) ??
    mockDonors.find((donor) => donor.id === activeDonorId) ??
    null;

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard/ngo" },
    { label: "Donor Profiles" },
  ];

  function formatCurrency(value: number) {
    return `₹${Intl.NumberFormat("en-IN").format(value)}`;
  }

  function handleFilter(partial: Partial<FilterState>) {
    setFilters((previous) => ({ ...previous, ...partial }));
  }

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      <SectionHeader
        title="Donor Profiles"
        subtitle="People and organisations contributing to your campaigns"
      />

      <section className="rounded-4xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="space-y-6 p-6">
          <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                <Filter className="h-3.5 w-3.5" />
                Filter donors
              </span>
              <span className="inline-flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {filteredDonors.length} donors
              </span>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              Export CSV
            </Button>
          </header>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <Input
                placeholder="Search name or email"
                className="pl-9"
                value={filters.search}
                onChange={(event) => handleFilter({ search: event.target.value })}
              />
            </div>

            <div className="flex flex-1 flex-wrap items-center gap-3">
              <Select
                value={filters.frequency}
                onValueChange={(value: FilterState["frequency"]) => handleFilter({ frequency: value })}
              >
                <SelectTrigger className="w-full min-w-[160px] lg:w-48">
                  <SelectValue placeholder="Donation frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All frequencies</SelectItem>
                  <SelectItem value="One-time">One-time</SelectItem>
                  <SelectItem value="Repeat">Repeat</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.status}
                onValueChange={(value: FilterState["status"]) => handleFilter({ status: value })}
              >
                <SelectTrigger className="w-full min-w-[160px] lg:w-48">
                  <SelectValue placeholder="Donation status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All statuses</SelectItem>
                  <SelectItem value="Success">Success</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>

              <AmountRangeControl
                value={filters.amountRange}
                onChange={(range) => handleFilter({ amountRange: range })}
                formatCurrency={formatCurrency}
              />
            </div>
          </div>

          {isLoading ? (
            <DonorGridSkeleton />
          ) : filteredDonors.length === 0 ? (
            <EmptyState />
          ) : (
            <DonorGrid donors={filteredDonors} onViewProfile={setActiveDonorId} />
          )}
        </div>
      </section>

      <DonorModal donor={activeDonor} open={Boolean(activeDonor)} onClose={() => setActiveDonorId(null)} />
    </div>
  );
}

function DonorGrid({ donors, onViewProfile }: { donors: DonorProfile[]; onViewProfile: (id: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {donors.map((donor) => (
        <Card key={donor.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
          <header className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
                {donor.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{donor.name}</p>
                <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <Mail className="h-4 w-4" aria-hidden />
                  {donor.email}
                </p>
              </div>
            </div>
            <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", donationStatusTone[donor.status])}>
              {donor.status}
            </span>
          </header>

          <dl className="grid grid-cols-2 gap-3 text-sm text-slate-500 dark:text-slate-400">
            <div>
              <dt className="text-xs uppercase tracking-wider">Total contributed</dt>
              <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                ₹{Intl.NumberFormat("en-IN").format(donor.totalAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider">Donations</dt>
              <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">{donor.donationsCount}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider">Top campaign</dt>
              <dd className="mt-1 font-medium text-slate-700 dark:text-slate-200">{donor.topCampaign}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider">Frequency</dt>
              <dd className="mt-1 font-medium text-slate-700 dark:text-slate-200">{donor.frequency}</dd>
            </div>
          </dl>

          <Button variant="outline" className="mt-auto w-full gap-2" onClick={() => onViewProfile(donor.id)}>
            View profile
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Card>
      ))}
    </div>
  );
}

function DonorGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
            </div>
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <UserCircle className="h-12 w-12 text-slate-400" aria-hidden />
      <div className="space-y-1">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">No donors yet</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Donations will appear automatically once supporters back your campaigns.
        </p>
      </div>
      <Button size="sm" variant="outline" className="gap-2">
        Share campaign page
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
}

function DonorModal({ donor, open, onClose }: { donor: DonorProfile | null; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title={donor ? donor.name : "Donor details"} description={donor?.email}>
      {!donor ? (
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-32 w-full rounded-3xl" />
        </div>
      ) : (
        <div className="space-y-6">
          <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/70 md:grid-cols-3">
            <InfoTile label="Total contributed" value={`₹${Intl.NumberFormat("en-IN").format(donor.totalAmount)}`} />
            <InfoTile label="Preferred method" value={donor.preferredMethod} />
            <InfoTile label="Average donation" value={`₹${Intl.NumberFormat("en-IN").format(donor.averageDonation)}`} />
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Donation timeline (mock)
            </h3>
            <div className="space-y-3">
              {Array.from({ length: donor.donationsCount }).map((_, index) => (
                <div key={index} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                  <span>Donation #{index + 1}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    ₹{Intl.NumberFormat("en-IN").format(Math.round(donor.averageDonation * (0.8 + Math.random() * 0.4)))}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Notes
            </h3>
            <Textarea placeholder="Add relationship notes or follow-up reminders" className="min-h-[120px]" />
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>Save notes</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/60">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  );
}

function AmountRangeControl({
  value,
  onChange,
  formatCurrency,
}: {
  value: [number, number];
  onChange: (range: [number, number]) => void;
  formatCurrency: (value: number) => string;
}) {
  const presets: Array<{ label: string; range: [number, number] }> = [
    { label: "Under ₹25K", range: [0, 25000] },
    { label: "₹25K – ₹1L", range: [25000, 100000] },
    { label: "₹1L – ₹2.5L", range: [100000, 250000] },
    { label: "₹2.5L – ₹5L", range: [250000, 500000] },
  ];

  return (
    <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        <span>Donation amount</span>
        <span>{formatCurrency(value[0])} – {formatCurrency(value[1])}</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {presets.map((preset) => {
          const isActive = value[0] === preset.range[0] && value[1] === preset.range[1];
          return (
            <button
              key={preset.label}
              type="button"
              className={cn(
                "rounded-2xl border px-3 py-2 text-left text-sm transition",
                isActive
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400 dark:text-emerald-200"
                  : "border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-emerald-400 dark:hover:text-emerald-200",
              )}
              onClick={() => onChange(preset.range)}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Custom range coming soon</span>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" disabled>
          Adjust manually
        </Button>
      </div>
    </div>
  );
}
