"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Edit,
  Filter,
  FolderPlus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  status: "Active" | "Draft" | "Closed";
  lastUpdated: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "cmp-21",
    name: "Rural Health Kits",
    category: "Healthcare",
    targetAmount: 900000,
    raisedAmount: 640000,
    status: "Active",
    lastUpdated: "2 days ago",
  },
  {
    id: "cmp-22",
    name: "School Nutrition Drive",
    category: "Education",
    targetAmount: 1200000,
    raisedAmount: 870000,
    status: "Active",
    lastUpdated: "5 hours ago",
  },
  {
    id: "cmp-23",
    name: "Digital Literacy Labs",
    category: "Education",
    targetAmount: 450000,
    raisedAmount: 450000,
    status: "Closed",
    lastUpdated: "Last month",
  },
  {
    id: "cmp-24",
    name: "Emergency Relief Fund",
    category: "Disaster relief",
    targetAmount: 750000,
    raisedAmount: 110000,
    status: "Draft",
    lastUpdated: "Draft saved yesterday",
  },
];

const statusFilters: Array<{ label: string; value: Campaign["status"] | "All" }> = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Draft", value: "Draft" },
  { label: "Closed", value: "Closed" },
];

const categoryFilters = [
  "All",
  "Healthcare",
  "Education",
  "Livelihood",
  "Disaster relief",
  "Women empowerment",
];

const statusTone: Record<Campaign["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  Draft: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  Closed: "bg-slate-200 text-slate-700 dark:bg-slate-700/60 dark:text-slate-200",
};

interface FilterState {
  status: Campaign["status"] | "All";
  category: string;
  search: string;
}

const initialFilter: FilterState = {
  status: "All",
  category: "All",
  search: "",
};

export default function NGOCampaignsPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilter);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filters.status, filters.category, filters.search]);

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter((campaign) => {
      const statusMatch = filters.status === "All" || campaign.status === filters.status;
      const categoryMatch = filters.category === "All" || campaign.category === filters.category;
      const searchMatch = campaign.name.toLowerCase().includes(filters.search.toLowerCase().trim());
      return statusMatch && categoryMatch && searchMatch;
    });
  }, [filters]);

  const paginatedCampaigns = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCampaigns.slice(start, start + pageSize);
  }, [filteredCampaigns, page]);

  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / pageSize));

  function handleFilterChange(partial: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  function handlePagination(direction: "prev" | "next") {
    setPage((prev) => {
      if (direction === "prev") {
        return Math.max(1, prev - 1);
      }
      return Math.min(totalPages, prev + 1);
    });
  }

  return (
    <div className="space-y-10">
      <SectionHeader
        title="My Campaigns"
        subtitle="Track all fundraising initiatives created by your organisation."
        action={
          <Button asChild size="lg" className="gap-2">
            <Link href="/dashboard/admin/campaigns/create">
              <FolderPlus className="h-4 w-4" />
              Create New Campaign
            </Link>
          </Button>
        }
      />

      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              <BadgeCheck className="h-3.5 w-3.5" />
              Only campaigns created by your NGO are shown here.
            </span>
          </div>

          <FilterToolbar
            filters={filters}
            onChange={handleFilterChange}
            isDisabled={isLoading}
          />

          <CampaignList
            isLoading={isLoading}
            campaigns={paginatedCampaigns}
            total={filteredCampaigns.length}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => handlePagination("prev")}
            onNext={() => handlePagination("next")}
            disabled={isLoading || filteredCampaigns.length === 0}
          />
        </div>
      </section>
    </div>
  );
}

interface FilterToolbarProps {
  filters: FilterState;
  onChange: (partial: Partial<FilterState>) => void;
  isDisabled?: boolean;
}

function FilterToolbar({ filters, onChange, isDisabled }: FilterToolbarProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr]">
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" aria-hidden />
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Search by campaign name"
          className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-12 pr-4 text-sm text-slate-600 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-emerald-300"
          disabled={isDisabled}
          aria-label="Search campaigns"
        />
      </div>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <SlidersHorizontal className="h-4 w-4 text-slate-400" aria-hidden />
        <select
          value={filters.status}
          onChange={(event) => onChange({ status: event.target.value as FilterState["status"] })}
          className="flex-1 bg-transparent text-sm font-medium text-slate-600 outline-none dark:text-slate-200"
          aria-label="Filter by status"
          disabled={isDisabled}
        >
          {statusFilters.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <Filter className="h-4 w-4 text-slate-400" aria-hidden />
        <select
          value={filters.category}
          onChange={(event) => onChange({ category: event.target.value })}
          className="flex-1 bg-transparent text-sm font-medium text-slate-600 outline-none dark:text-slate-200"
          aria-label="Filter by category"
          disabled={isDisabled}
        >
          {categoryFilters.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface CampaignListProps {
  campaigns: Campaign[];
  total: number;
  isLoading: boolean;
}

function CampaignList({ campaigns, total, isLoading }: CampaignListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <EmptyState
        title="No campaigns yet"
        description="Launch your first campaign to start receiving donations through ImpactBridge."
        action={{ href: "/dashboard/admin/campaigns/create", label: "Create campaign" }}
      />
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
        Showing {campaigns.length} of {total} campaign{total === 1 ? "" : "s"}
      </p>
      <div className="hidden rounded-2xl bg-slate-50/70 p-3 font-semibold text-slate-500 dark:bg-slate-800/60 md:grid md:grid-cols-[2fr,1fr,1fr,1fr,auto] md:gap-4 md:text-xs">
        <span>Campaign</span>
        <span>Target</span>
        <span>Raised</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <article
            key={campaign.id}
            className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/70 md:grid md:grid-cols-[2fr,1fr,1fr,1fr,auto] md:items-center md:gap-4"
          >
            <div className="space-y-2">
              <Link
                href={`/dashboard/admin/campaigns/${campaign.id}`}
                className="text-base font-semibold text-slate-800 transition hover:text-emerald-600 dark:text-slate-100"
              >
                {campaign.name}
              </Link>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                {campaign.category}
              </p>
              <p className="text-xs text-slate-400 md:hidden">
                Last updated {campaign.lastUpdated}
              </p>
            </div>

            <div className="space-y-1 text-sm text-slate-500 md:space-y-0 md:text-right">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                ₹{campaign.targetAmount.toLocaleString()}
              </span>
              <p className="text-xs text-slate-400 md:hidden">Target amount</p>
            </div>

            <div className="space-y-1 text-sm text-slate-500 md:space-y-0 md:text-right">
              <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                ₹{campaign.raisedAmount.toLocaleString()}
              </span>
              <p className="text-xs text-slate-400 md:hidden">Raised so far</p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusTone[campaign.status])}>
                {campaign.status}
              </Badge>
              <p className="hidden text-xs text-slate-400 md:block">Updated {campaign.lastUpdated}</p>
            </div>

            <div className="flex items-center justify-end gap-2 md:flex-col md:items-end md:gap-1">
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link href={`/dashboard/admin/campaigns/${campaign.id}`}>
                  <BadgeCheck className="h-4 w-4" />
                  View
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="gap-1 text-rose-500 hover:text-rose-600">
                <XCircle className="h-4 w-4" />
                Close
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
}

function Pagination({ page, totalPages, onPrev, onNext, disabled }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60">
      <p>
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={disabled || page === 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={disabled || page === totalPages}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="gap-1 text-slate-400">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { href: string; label: string };
}

function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <Archive className="h-10 w-10 text-slate-400" aria-hidden />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      {action ? (
        <Button asChild className="gap-2">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      ) : null}
    </div>
  );
}
