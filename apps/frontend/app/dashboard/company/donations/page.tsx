"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  Layers,
  Receipt,
  RefreshCcw,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { donations, donationFilters, type CompanyDonation } from "./mock-data";

interface FilterState {
  year: string;
  sdg: string;
  region: string;
}

const statusBadgeTone: Record<CompanyDonation["status"], string> = {
  Completed: "bg-emerald-500/10 text-emerald-600",
  Pending: "bg-amber-500/10 text-amber-600",
};

export default function CompanyDonationsPage() {
  const [filters, setFilters] = useState<FilterState>({ year: "All", sdg: "All", region: "All" });
  const [isLoading] = useState(false);
  const [hasError] = useState(false);

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchYear = filters.year === "All" || donation.year.toString() === filters.year;
      const matchSdg = filters.sdg === "All" || donation.sdg === filters.sdg;
      const matchRegion = filters.region === "All" || donation.region === filters.region;
      return matchYear && matchSdg && matchRegion;
    });
  }, [filters.year, filters.sdg, filters.region]);

  const totalDonated = useMemo(
    () => filteredDonations.reduce((sum, donation) => sum + donation.amount, 0),
    [filteredDonations],
  );
  const programmesSupported = useMemo(
    () => new Set(filteredDonations.map((donation) => donation.programme)).size,
    [filteredDonations],
  );
  const ngoPartners = useMemo(
    () => new Set(filteredDonations.map((donation) => donation.ngo)).size,
    [filteredDonations],
  );
  const averageDonation = useMemo(() => {
    if (!filteredDonations.length) return 0;
    return Math.round(totalDonated / filteredDonations.length);
  }, [filteredDonations.length, totalDonated]);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Donations Overview" },
    ],
    [],
  );

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <header className="flex flex-col gap-6 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <Badge className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200">
            Impact tracking
          </Badge>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Donations Overview</h1>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Track all contributions and their impact across programmes and NGO partners.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            label="Year"
            value={filters.year}
            options={["All", ...donationFilters.years.map((year) => year.toString())]}
            onChange={(value) => setFilters((prev) => ({ ...prev, year: value }))}
          />
          <FilterSelect
            label="Programme"
            value={filters.sdg}
            options={["All", ...donationFilters.sdgs]}
            onChange={(value) => setFilters((prev) => ({ ...prev, sdg: value }))}
          />
          <FilterSelect
            label="NGO"
            value={filters.region}
            options={["All", ...donationFilters.regions]}
            onChange={(value) => setFilters((prev) => ({ ...prev, region: value }))}
          />
        </div>
      </header>

      {isLoading ? (
        <SkeletonState />
      ) : hasError ? (
        <ErrorState />
      ) : filteredDonations.length === 0 ? (
        <EmptyState onReset={() => setFilters({ year: "All", sdg: "All", region: "All" })} />
      ) : (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <SummaryRow
              totalDonated={totalDonated}
              programmesSupported={programmesSupported}
              ngoPartners={ngoPartners}
              averageDonation={averageDonation}
            />
            <DonationsTable donations={filteredDonations} />
          </div>
          <Sidebar filters={filters} onFiltersChange={setFilters} />
        </section>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col text-sm">
      <span className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="min-w-[140px] rounded-2xl border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SummaryRow({
  totalDonated,
  programmesSupported,
  ngoPartners,
  averageDonation,
}: {
  totalDonated: number;
  programmesSupported: number;
  ngoPartners: number;
  averageDonation: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        icon={Wallet}
        label="Total donated"
        primary={`₹${totalDonated.toLocaleString()}`}
        helper="Across all filtered disbursements"
      />
      <SummaryCard
        icon={Layers}
        label="Programmes supported"
        primary={programmesSupported.toString()}
        helper="Unique CSR initiatives"
      />
      <SummaryCard
        icon={Sparkles}
        label="NGOs partnered"
        primary={ngoPartners.toString()}
        helper="Active collaboration partners"
      />
      <SummaryCard
        icon={Calendar}
        label="Average donation"
        primary={`₹${averageDonation.toLocaleString()}`}
        helper="Mean value per grant"
      />
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  primary,
  helper,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary: string;
  helper: string;
}) {
  return (
    <Card className="flex flex-col gap-3 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200">
        <Icon className="h-5 w-5" />
      </span>
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{label}</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{primary}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{helper}</p>
      </div>
    </Card>
  );
}

function DonationsTable({ donations }: { donations: CompanyDonation[] }) {
  return (
    <Card className="overflow-hidden rounded-4xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="hidden min-w-full text-sm lg:block">
        <table className="w-full">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-400 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Programme</th>
              <th className="px-6 py-4 font-medium">NGO</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900/60">
            {donations.map((donation) => (
              <tr key={donation.id} className="transition hover:bg-emerald-50/40 dark:hover:bg-slate-800/70">
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{formatDate(donation.date)}</td>
                <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">
                  <Link
                    href={`/dashboard/company/programmes/${donation.programmeId}`}
                    className="hover:text-emerald-600 hover:underline"
                  >
                    {donation.programme}
                  </Link>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{donation.ngo}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">₹{donation.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusBadgeTone[donation.status])}>
                    {donation.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="gap-2 text-sm text-emerald-600 dark:text-emerald-300">
                    <Receipt className="h-4 w-4" />
                    View receipt
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 lg:hidden">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="space-y-3 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{donation.programme}</p>
              <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusBadgeTone[donation.status])}>
                {donation.status}
              </Badge>
            </div>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <p>
                <span className="font-medium uppercase tracking-[0.2em]">Date</span> • {formatDate(donation.date)}
              </p>
              <p>
                <span className="font-medium uppercase tracking-[0.2em]">NGO</span> • {donation.ngo}
              </p>
              <p>
                <span className="font-medium uppercase tracking-[0.2em]">Amount</span> • ₹{donation.amount.toLocaleString()}
              </p>
            </div>
            <Button variant="outline" className="w-full rounded-2xl gap-2 text-sm">
              <Receipt className="h-4 w-4" />
              View receipt
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Sidebar({
  filters,
  onFiltersChange,
}: {
  filters: FilterState;
  onFiltersChange: (update: FilterState | ((prev: FilterState) => FilterState)) => void;
}) {
  return (
    <aside className="hidden space-y-5 xl:block">
      <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Quick filters</h3>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-600"
            onClick={() => onFiltersChange({ year: "All", sdg: "All", region: "All" })}
          >
            <RefreshCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
        <div className="space-y-2">
          <FilterChip label="This year" active={filters.year === new Date().getFullYear().toString()}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between rounded-2xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-emerald-200 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300"
              onClick={() => onFiltersChange((prev) => ({ ...prev, year: new Date().getFullYear().toString() }))}
            >
              This year
              <ChevronDown className="h-4 w-4" />
            </Button>
          </FilterChip>
          <FilterChip label="Last year" active={filters.year === (new Date().getFullYear() - 1).toString()}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between rounded-2xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-emerald-200 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300"
              onClick={() => onFiltersChange((prev) => ({ ...prev, year: (new Date().getFullYear() - 1).toString() }))}
            >
              Last year
              <ChevronDown className="h-4 w-4" />
            </Button>
          </FilterChip>
          <FilterChip label="Custom" active={filters.year === "All"}>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center rounded-2xl border-slate-200 text-xs font-semibold text-slate-600 hover:border-emerald-200 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300"
            >
              Custom range
            </Button>
          </FilterChip>
        </div>
      </Card>

      <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Category filters</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">SDG focus</p>
            <div className="flex flex-wrap gap-2">
              {donationFilters.sdgs.map((sdg) => (
                <Badge
                  key={sdg}
                  variant="soft"
                  className={cn(
                    "cursor-pointer border border-transparent px-3 py-1 text-xs font-semibold",
                    filters.sdg === sdg
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600",
                  )}
                  onClick={() =>
                    onFiltersChange((prev) => ({ ...prev, sdg: prev.sdg === sdg ? "All" : sdg }))
                  }
                >
                  {sdg}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Region</p>
            <div className="flex flex-wrap gap-2">
              {donationFilters.regions.map((region) => (
                <Badge
                  key={region}
                  variant="outline"
                  className={cn(
                    "cursor-pointer border px-3 py-1 text-xs font-semibold",
                    filters.region === region
                      ? "border-emerald-400 text-emerald-600"
                      : "border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600",
                  )}
                  onClick={() =>
                    onFiltersChange((prev) => ({ ...prev, region: prev.region === region ? "All" : region }))
                  }
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </aside>
  );
}

function FilterChip({ label, active, children }: { label: string; active: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-2 rounded-3xl border p-3", active ? "border-emerald-200 bg-emerald-50/60" : "border-slate-200")}
    >
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{label}</p>
      {children}
    </div>
  );
}

function SkeletonState() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-28 w-full rounded-4xl" />
      <Skeleton className="h-24 w-full rounded-4xl" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-4xl" />
          <Skeleton className="h-[420px] w-full rounded-4xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-52 w-full rounded-4xl" />
          <Skeleton className="h-48 w-full rounded-4xl" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-3 rounded-4xl border border-dashed border-slate-300 bg-white/60 p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
      <Image
        src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80"
        alt="Empty donations"
        width={220}
        height={160}
        className="h-40 w-auto rounded-3xl object-cover"
      />
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">No donations yet</h3>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        Adjust the filters or explore new programmes to begin collaborating with NGO partners.
      </p>
      <Button variant="outline" className="rounded-2xl" onClick={onReset}>
        Clear filters
      </Button>
    </Card>
  );
}

function ErrorState() {
  return (
    <Card className="flex flex-col items-center gap-3 rounded-4xl border border-rose-200 bg-rose-50/80 p-12 text-center shadow-sm dark:border-rose-900/60 dark:bg-rose-900/30">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-200">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h3 className="text-base font-semibold text-rose-600 dark:text-rose-200">Unable to load donations</h3>
      <p className="max-w-sm text-sm text-rose-500 dark:text-rose-200/80">
        Something went wrong while fetching donations. Try refreshing or come back later.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" className="rounded-2xl" onClick={() => window.location.reload()}>
          Retry
        </Button>
        <Button asChild className="rounded-2xl">
          <Link href="/dashboard/company/programmes">Explore programmes</Link>
        </Button>
      </div>
    </Card>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
