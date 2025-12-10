"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Download,
  FileBarChart2,
  Layers,
  Receipt,
  Share2,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ReportsSummaryCard } from "@/components/reports/reports-summary-card";

interface ReportRow {
  id: string;
  date: string;
  programme: string;
  ngo: string;
  amount: number;
}

const rows: ReportRow[] = [
  { id: "rep-1", date: "2025-11-22", programme: "Rural STEM Labs", ngo: "Project Udaan", amount: 6500000 },
  { id: "rep-2", date: "2025-09-14", programme: "Mobile Health Clinics", ngo: "HealTrust", amount: 8200000 },
  { id: "rep-3", date: "2025-07-02", programme: "Solar Micro-Grids", ngo: "BrightFuture Initiative", amount: 5100000 },
];

const programmeOptions = [
  "All",
  "Rural STEM Labs",
  "Mobile Health Clinics",
  "Solar Micro-Grids",
  "Women Artisan Cooperatives",
];

const yearOptions = ["2025", "2024", "2023", "2022"];

export default function CompanyReportsPage() {
  const [filters, setFilters] = useState({ year: "2025", programme: "All" });
  const [isLoading] = useState(false);
  const [hasError] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => filters.programme === "All" || row.programme === filters.programme);
  }, [filters.programme]);

  const totalDonated = useMemo(() => rows.reduce((sum, row) => sum + row.amount, 0), []);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Reports & Exports" },
    ],
    [],
  );

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-2">
        <Badge className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200">
          Insights
        </Badge>
        <div className="space-y-3 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Reports & Exports</h1>
            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Export contribution history, programme summaries, and partner engagement reports to share with leadership and auditors.
            </p>
          </div>
        </div>
      </header>

      {isLoading ? (
        <LoadingState />
      ) : hasError ? (
        <ErrorState onRetry={() => window.location.reload()} />
      ) : filteredRows.length === 0 ? (
        <EmptyState onReset={() => setFilters({ year: "2025", programme: "All" })} />
      ) : (
        <section className="space-y-6">
          <SummaryRow total={totalDonated} />
          <FiltersRow filters={filters} onChange={setFilters} onExport={() => setExportOpen(true)} />
          <ReportsTable rows={filteredRows} />
        </section>
      )}

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}

function SummaryRow({ total }: { total: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ReportsSummaryCard icon={<Wallet className="h-5 w-5" />} label="Total donated" value={`₹${total.toLocaleString()}`} helper="All approved disbursements" tone="emerald" />
      <ReportsSummaryCard icon={<Layers className="h-5 w-5" />} label="Programmes" value="12" helper="Across current fiscal" tone="sky" />
      <ReportsSummaryCard icon={<Share2 className="h-5 w-5" />} label="NGO partners" value="18" helper="Active collaborations" tone="violet" />
      <ReportsSummaryCard icon={<Sparkles className="h-5 w-5" />} label="Avg donation" value="₹56,00,000" helper="Across programmes" tone="amber" />
    </div>
  );
}

function FiltersRow({
  filters,
  onChange,
  onExport,
}: {
  filters: { year: string; programme: string };
  onChange: (filters: { year: string; programme: string }) => void;
  onExport: () => void;
}) {
  return (
    <Card className="flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <FilterSelect
          label="Year"
          value={filters.year}
          options={yearOptions}
          onChange={(value) => onChange({ ...filters, year: value })}
        />
        <FilterSelect
          label="Programme"
          value={filters.programme}
          options={programmeOptions}
          onChange={(value) => onChange({ ...filters, programme: value })}
        />
      </div>
      <Button className="gap-2 rounded-2xl" onClick={onExport}>
        <Download className="h-4 w-4" />
        Export
      </Button>
    </Card>
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
        <SelectTrigger className="min-w-[160px] rounded-2xl border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/60">
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

function ReportsTable({ rows }: { rows: ReportRow[] }) {
  return (
    <Card className="overflow-hidden rounded-4xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="hidden text-sm lg:block">
        <table className="w-full">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-400 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Programme</th>
              <th className="px-6 py-4 font-medium">NGO</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium text-right">Export</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900/60">
            {rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-emerald-50/40 dark:hover:bg-slate-800/70">
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{formatDate(row.date)}</td>
                <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">{row.programme}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.ngo}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">₹{row.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="gap-2 text-sm text-emerald-600 dark:text-emerald-300">
                    <Receipt className="h-4 w-4" />
                    Export row
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 lg:hidden">
        {rows.map((row) => (
          <div
            key={row.id}
            className="space-y-3 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{row.programme}</p>
              <Button variant="ghost" size="sm" className="gap-2 text-xs text-emerald-600 dark:text-emerald-300">
                <Receipt className="h-4 w-4" />
                Export
              </Button>
            </div>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <p>
                <span className="font-medium uppercase tracking-[0.2em]">Date</span> • {formatDate(row.date)}
              </p>
              <p>
                <span className="font-medium uppercase tracking-[0.2em]">NGO</span> • {row.ngo}
              </p>
              <p>
                <span className="font-medium uppercase tracking-[0.2em]">Amount</span> • ₹{row.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ExportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
      <Card className="w-full max-w-md space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Export reports</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">Choose a format to download programme and donation insights.</p>
        </div>
        <div className="space-y-3">
          <Button className="w-full justify-between rounded-2xl" variant="outline">
            Export CSV
            <FileBarChart2 className="h-4 w-4" />
          </Button>
          <Button className="w-full justify-between rounded-2xl" variant="outline">
            Export PDF
            <FileBarChart2 className="h-4 w-4" />
          </Button>
        </div>
        <Button className="w-full rounded-2xl" onClick={onClose}>
          Close
        </Button>
      </Card>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-24 w-full rounded-4xl" />
      <Skeleton className="h-24 w-full rounded-4xl" />
      <Skeleton className="h-24 w-full rounded-4xl" />
      <Skeleton className="h-[420px] w-full rounded-4xl" />
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-3 rounded-4xl border border-dashed border-slate-300 bg-white/60 p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
      <FileBarChart2 className="h-10 w-10 text-slate-400" />
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">No reports available</h3>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        Adjust your filters or generate new reports once you have more programme activity.
      </p>
      <Button variant="outline" className="rounded-2xl" onClick={onReset}>
        Clear filters
      </Button>
    </Card>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-3 rounded-4xl border border-rose-200 bg-rose-50/80 p-12 text-center shadow-sm dark:border-rose-900/60 dark:bg-rose-900/30">
      <AlertTriangle className="h-10 w-10 text-rose-500" />
      <h3 className="text-base font-semibold text-rose-600 dark:text-rose-200">Unable to load reports</h3>
      <p className="max-w-sm text-sm text-rose-500 dark:text-rose-200/80">
        Something went wrong while fetching reports. Try again or reach out to the admin team.
      </p>
      <Button variant="outline" className="rounded-2xl" onClick={onRetry}>
        Retry
      </Button>
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
