"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Filter, Search as SearchIcon, SlidersHorizontal, Tags } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

import { getFeatureFlags } from "@/lib/feature-flags";
import { useCompanyProgrammes } from "@/lib/hooks/use-company-programmes";
import type { ProgrammeSummaryDto } from "@impactbridge/api-contracts";
import { programmes as mockProgrammes, Programme } from "./mock-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FilterState {
  category: string;
  status: Programme["status"] | "All";
  region: string;
  query: string;
}

const statusOptions: Array<FilterState["status"] | "All"> = ["All", "Active", "Completed", "Upcoming", "Draft", "Submitted", "Approved"] as Array<
  FilterState["status"] | "All"
>;
const categoryOptions = ["All", "Education", "Healthcare", "Environment", "Livelihood", "Infrastructure", "Agriculture"];
const regionOptions = ["All", "Maharashtra", "Uttarakhand", "Tamil Nadu", "Gujarat", "Rajasthan", "Madhya Pradesh"];

type ProgrammeSource = Programme | ProgrammeSummaryDto;

interface ProgrammeCardData {
  id: string;
  title: string;
  description: string;
  statusLabel: string;
  badgeToneClass: string;
  category: string;
  region: string;
  ngoName: string;
  highlights: string[];
  bannerUrl: string;
  searchHaystack: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function CompanyProgrammeDirectoryPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    status: "All",
    region: "All",
    query: "",
  });
  const { API_PROGRAMME } = useMemo(() => getFeatureFlags(), []);
  const {
    data: apiProgrammes,
    isLoading: isApiLoading,
    isError: isApiError,
  } = useCompanyProgrammes({ enabled: API_PROGRAMME });

  const debouncedQuery = useDebouncedValue(filters.query, 200);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "CSR Programmes" },
    ],
    [],
  );

  const filteredProgrammes = useMemo(() => {
    const search = debouncedQuery?.trim().toLowerCase() ?? "";
    const sourceProgrammes: ProgrammeSource[] = API_PROGRAMME && !isApiError ? apiProgrammes ?? [] : mockProgrammes;
    const normalised = sourceProgrammes.map(toProgrammeCardData);

    return normalised.filter((programme) => {
      const matchesCategory = filters.category === "All" || programme.category === filters.category;
      const matchesStatus = filters.status === "All" || programme.statusLabel === filters.status;
      const matchesRegion = filters.region === "All" || programme.region === filters.region;
      const matchesSearch = search.length === 0 || programme.searchHaystack.includes(search);

      return matchesCategory && matchesStatus && matchesRegion && matchesSearch;
    });
  }, [API_PROGRAMME, apiProgrammes, debouncedQuery, filters.category, filters.region, filters.status, isApiError]);

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />
      <header className="flex flex-col gap-6 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">CSR Programmes</h1>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Browse, fund, and collaborate on CSR initiatives that align with your company&apos;s priorities and industry focus.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:items-center">
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.status}
            onValueChange={(value: FilterState["status"] | "All") => handleFilterChange("status", value)}
          >
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.region} onValueChange={(value) => handleFilterChange("region", value)}>
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xl">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={filters.query}
            onChange={(event) => handleFilterChange("query", event.target.value)}
            placeholder="Search programme, NGO, SDG, or focus area"
            className="pl-9"
          />
        </div>
        <Button variant="ghost" className="gap-2 text-sm">
          <SlidersHorizontal className="h-4 w-4" />
          Advanced filters
        </Button>
      </div>

      {API_PROGRAMME && isApiLoading ? (
        <ProgrammeSkeletonGrid />
      ) : API_PROGRAMME && isApiError ? (
        <ErrorBanner />
      ) : filteredProgrammes.length === 0 ? (
        <EmptyState query={debouncedQuery} />
      ) : (
        <ProgrammeGrid programmes={filteredProgrammes} />
      )}
    </div>
  );
}

function ProgrammeSkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          data-testid="programme-skeleton-card"
          className="space-y-4 rounded-4xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
        >
          <Skeleton className="h-36 w-full rounded-3xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((__, chipIndex) => (
              <Skeleton key={chipIndex} className="h-6 w-16 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-9 w-full rounded-2xl" />
        </Card>
      ))}
    </div>
  );
}

function ProgrammeGrid({ programmes }: { programmes: ProgrammeCardData[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {programmes.map((programme) => (
        <ProgrammeCard key={programme.id} programme={programme} />
      ))}
    </div>
  );
}

function ErrorBanner() {
  return (
    <Alert variant="destructive" className="rounded-3xl border border-rose-200 bg-rose-50 text-rose-700">
    <div className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600">
        <AlertTriangle className="h-3.5 w-3.5" />
      </span>
      <div className="space-y-1">
        <AlertTitle className="text-sm font-semibold">Programme data unavailable</AlertTitle>
        <AlertDescription className="text-xs leading-5 text-rose-600/90">
          We couldn&apos;t load CSR programmes from the API right now. You can continue browsing the mock catalogue or try again later.
        </AlertDescription>
      </div>
    </div>
  </Alert>
  );
}

function ProgrammeCard({ programme }: { programme: ProgrammeCardData }) {
  const { statusLabel, badgeToneClass, bannerUrl, title, description, ngoName, category, region, highlights } = programme;

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-4xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <div className="relative h-40 w-full bg-slate-200">
        <Image src={bannerUrl} alt={title} width={720} height={320} className="h-full w-full object-cover" />
        <Badge className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${badgeToneClass}`}>
          {statusLabel}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {deriveInitials(ngoName)}
          </span>
          <span>{ngoName}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Badge variant="outline" className="gap-1 border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <Tags className="h-3 w-3" />
            {category}
          </Badge>
          <Badge variant="outline" className="border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {region}
          </Badge>
          {highlights.map((highlight) => (
            <Badge key={highlight} variant="soft" className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {highlight}
            </Badge>
          ))}
        </div>
        <div className="mt-auto">
          <Button asChild className="w-full rounded-2xl">
            <Link href={`/dashboard/company/programmes/${programme.id}`}>View details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <Card className="flex flex-col items-center gap-3 rounded-4xl border border-dashed border-slate-300 bg-white/60 p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
      <Filter className="h-10 w-10 text-slate-400" />
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">No programmes match your filters</h3>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
        {query
          ? `We couldn\'t find a programme related to “${query}”. Try refining your search or clearing filters.`
          : "Try adjusting filters or exploring other CSR categories to discover partner-ready programmes."}
      </p>
      <Button variant="ghost" onClick={() => window.location.reload()} className="gap-2">
        Reset filters
      </Button>
    </Card>
  );
}

function toProgrammeCardData(programme: ProgrammeSource): ProgrammeCardData {
  if (isMockProgramme(programme)) {
    const statusLabel = programme.status;
    const badgeToneClass = normaliseStatusTone(statusLabel);
    const searchHaystack = [programme.name, programme.summary, programme.ngo.name, programme.category, programme.region, programme.sdgs.join(" ")]
      .join(" ")
      .toLowerCase();

    return {
      id: programme.id,
      title: programme.name,
      description: programme.summary,
      statusLabel,
      badgeToneClass,
      category: programme.category,
      region: programme.region,
      ngoName: programme.ngo.name,
      highlights: programme.sdgs,
      bannerUrl: programme.bannerUrl,
      searchHaystack,
    };
  }

  const statusLabel = PROGRAMME_STATUS_LABELS[programme.state] ?? programme.state;
  const badgeToneClass = normaliseStatusTone(statusLabel);
  const ngoName = "Partner NGO";
  const highlights: string[] = [];
  const description = programme.description ?? "Programme overview coming soon.";
  const category = inferProgrammeCategoryFromSummary(programme);
  const region = inferProgrammeRegion(programme);
  const bannerUrl = inferProgrammeBanner(programme);
  const searchHaystack = [programme.title, description, ngoName, category, region].join(" ").toLowerCase();

  return {
    id: programme.id,
    title: programme.title,
    description,
    statusLabel,
    badgeToneClass,
    category,
    region,
    ngoName,
    highlights,
    bannerUrl,
    searchHaystack,
  };
}

function inferProgrammeBanner(programme: ProgrammeSummaryDto) {
  const base = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";
  const mission = programme.description;
  if (!mission) return base;
  const encoded = encodeURIComponent(mission.replace(/\s+/g, " "));
  return `https://source.unsplash.com/featured/720x320/?csr,impact,${encoded}`;
}

function inferProgrammeCategoryFromSummary(programme: ProgrammeSummaryDto): string {
  const text = `${programme.title} ${programme.description}`.toLowerCase();
  if (text.includes("health")) return "Healthcare";
  if (text.includes("education")) return "Education";
  if (text.includes("climate") || text.includes("environment")) return "Environment";
  if (text.includes("livelihood")) return "Livelihood";
  return "CSR";
}

function inferProgrammeRegion(programme: ProgrammeSummaryDto): string {
  return programme.description?.toLowerCase().includes("rural") ? "Rural India" : "Pan India";
}

function normaliseStatusTone(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-emerald-500/10 text-emerald-600";
    case "completed":
      return "bg-slate-500/10 text-slate-600";
    case "upcoming":
    case "draft":
    case "submitted":
      return "bg-amber-500/10 text-amber-600";
    default:
      return "bg-slate-500/10 text-slate-600";
  }
}

function deriveInitials(name: string) {
  if (!name?.trim()) return "NG";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map((part) => part[0] ?? "").join("").toUpperCase();
  return initials || "NG";
}

function isMockProgramme(programme: ProgrammeSource): programme is Programme {
  return (programme as Programme).summary !== undefined;
}

const PROGRAMME_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  APPROVED: "Approved",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};
