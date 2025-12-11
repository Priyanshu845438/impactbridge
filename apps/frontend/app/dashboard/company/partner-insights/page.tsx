"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  Sparkle,
  Users,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const KPI_CARDS = [
  {
    id: "kpi-progress",
    label: "Avg programme progress",
    value: "76%",
    helper: "Across active initiatives",
    icon: Gauge,
    gradient: "bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent",
  },
  {
    id: "kpi-milestones",
    label: "On-time milestones",
    value: "84%",
    helper: "Past 90 days",
    icon: Sparkle,
    gradient: "bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent",
  },
  {
    id: "kpi-compliance",
    label: "Compliance score",
    value: "92",
    helper: "Weighted average",
    icon: CheckCircle2,
    gradient: "bg-gradient-to-r from-sky-500/20 via-sky-500/10 to-transparent",
  },
  {
    id: "kpi-engagement",
    label: "Engagement rating",
    value: "4.5 / 5",
    helper: "Partner feedback",
    icon: Users,
    gradient: "bg-gradient-to-r from-amber-500/25 via-amber-500/10 to-transparent",
  },
];

type ComplianceBadge = "Good" | "Warning" | "Critical";

interface PartnerRow {
  id: string;
  name: string;
  acronym: string;
  progress: number;
  compliance: ComplianceBadge;
  updates: number;
}

const PARTNERS: PartnerRow[] = [
  {
    id: "ngo-udaan",
    name: "Project Udaan",
    acronym: "PU",
    progress: 0.82,
    compliance: "Good",
    updates: 14,
  },
  {
    id: "ngo-healtrust",
    name: "HealTrust",
    acronym: "HT",
    progress: 0.74,
    compliance: "Good",
    updates: 12,
  },
  {
    id: "ngo-brightfuture",
    name: "BrightFuture Initiative",
    acronym: "BF",
    progress: 0.68,
    compliance: "Warning",
    updates: 9,
  },
  {
    id: "ngo-anandi",
    name: "Anandi Foundation",
    acronym: "AF",
    progress: 0.56,
    compliance: "Critical",
    updates: 5,
  },
];

const COMPLIANCE_FILTERS: Array<{ value: "all" | ComplianceBadge; label: string }> = [
  { value: "all", label: "All" },
  { value: "Good", label: "Good" },
  { value: "Warning", label: "Warning" },
  { value: "Critical", label: "Critical" },
];

const SORT_OPTIONS = [
  { value: "progress", label: "Progress" },
  { value: "updates", label: "Activity" },
  { value: "name", label: "Name" },
];

export default function PartnerInsightsPage() {
  const [complianceFilter, setComplianceFilter] = useState<"all" | ComplianceBadge>("all");
  const [sortBy, setSortBy] = useState("progress");
  const [performanceThreshold, setPerformanceThreshold] = useState(40);
  const [isLoading] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Partnership Insights" },
    ],
    [],
  );

  const filteredPartners = useMemo(() => {
    const base = complianceFilter === "all" ? PARTNERS : PARTNERS.filter((partner) => partner.compliance === complianceFilter);
    const threshold = performanceThreshold / 100;
    const afterThreshold = base.filter((partner) => partner.progress >= threshold);
    return [...afterThreshold].sort((a, b) => {
      if (sortBy === "progress") {
        return b.progress - a.progress;
      }
      if (sortBy === "updates") {
        return b.updates - a.updates;
      }
      return a.name.localeCompare(b.name);
    });
  }, [complianceFilter, performanceThreshold, sortBy]);

  const emptyState = !isLoading && filteredPartners.length === 0;

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200">
          Partnerships
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Partnership Insights</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Track NGO performance and collaboration health.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_CARDS.map((card) => (
          <Card key={card.id} className={cn("overflow-hidden rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70", card.gradient)}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{card.label}</span>
              <card.icon className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-50">{card.value}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{card.helper}</p>
          </Card>
        ))}
      </section>

      <FiltersRow
        compliance={complianceFilter}
        onComplianceChange={setComplianceFilter}
        performance={performanceThreshold}
        onPerformanceChange={(value) => setPerformanceThreshold(Number(value))}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {isLoading ? (
        <ListSkeleton />
      ) : emptyState ? (
        <EmptyState
          onReset={() => {
            setComplianceFilter("all");
            setSortBy("progress");
            setPerformanceThreshold(40);
          }}
        />
      ) : (
        <PartnerList partners={filteredPartners} />
      )}
    </div>
  );
}

function FiltersRow({
  compliance,
  onComplianceChange,
  performance,
  onPerformanceChange,
  sortBy,
  onSortChange,
}: {
  compliance: "all" | ComplianceBadge;
  onComplianceChange: (value: "all" | ComplianceBadge) => void;
  performance: number;
  onPerformanceChange: (value: number) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}) {
  return (
    <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2 text-sm">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Compliance</label>
          <Select value={compliance} onValueChange={(value) => onComplianceChange(value as "all" | ComplianceBadge)}>
            <SelectTrigger className="rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COMPLIANCE_FILTERS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 text-sm">
          <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Performance threshold
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{performance}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={performance}
            onChange={(event) => onPerformanceChange(Number(event.target.value))}
            className="h-1 w-full cursor-pointer accent-emerald-500"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">Show partners meeting this progress benchmark.</p>
        </div>

        <div className="space-y-2 text-sm">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Sort by</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}

function PartnerList({ partners }: { partners: PartnerRow[] }) {
  return (
    <div className="space-y-4">
      <Card className="hidden rounded-4xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-400 dark:bg-slate-900/40">
            <tr>
              <th className="px-6 py-4 font-medium">Partner NGO</th>
              <th className="px-6 py-4 font-medium">Progress</th>
              <th className="px-6 py-4 font-medium">Compliance</th>
              <th className="px-6 py-4 font-medium">Activity</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900/60">
            {partners.map((partner) => (
              <tr key={partner.id} className="transition hover:bg-emerald-50/40 dark:hover:bg-slate-900/40">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <LogoPlaceholder acronym={partner.acronym} />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{partner.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <ProgressBar value={partner.progress} />
                </td>
                <td className="px-6 py-4">
                  <ComplianceBadge tone={partner.compliance} />
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{partner.updates} updates this month</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="outline" size="sm" className="gap-2 rounded-2xl">
                    View profile
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="space-y-3 md:hidden">
        {partners.map((partner) => (
          <Card key={partner.id} className="space-y-4 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <LogoPlaceholder acronym={partner.acronym} />
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{partner.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{partner.updates} updates this month</p>
              </div>
              <ComplianceBadge tone={partner.compliance} className="ml-auto" />
            </div>
            <ProgressBar value={partner.progress} />
            <Button variant="outline" size="sm" className="w-full gap-2 rounded-2xl">
              View profile
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LogoPlaceholder({ acronym }: { acronym: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {acronym}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min(value * 100, 100)}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{(value * 100).toFixed(0)}%</span>
    </div>
  );
}

function ComplianceBadge({ tone, className }: { tone: ComplianceBadge; className?: string }) {
  const toneMap: Record<ComplianceBadge, string> = {
    Good: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200",
    Warning: "bg-amber-500/10 text-amber-600 dark:bg-amber-900/40 dark:text-amber-200",
    Critical: "bg-rose-500/10 text-rose-600 dark:bg-rose-900/40 dark:text-rose-200",
  };
  return (
    <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", toneMap[tone], className)}>{tone}</Badge>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center dark:border-slate-800 dark:bg-slate-900/40">
      <BarChart3 className="h-10 w-10 text-slate-400" />
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">No partners match the filters</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Adjust performance thresholds or compliance filter to see matching NGOs.</p>
      </div>
      <Button variant="outline" className="rounded-2xl" onClick={onReset}>
        Reset filters
      </Button>
    </Card>
  );
}

function ListSkeleton() {
  return (
    <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-3xl" />
        ))}
      </div>
    </Card>
  );
}
