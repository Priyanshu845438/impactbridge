"use client";

import { useMemo } from "react";
import { AlertTriangle, ArrowUpRight, CheckCircle2, Clock4, FileText, Filter, RefreshCw } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useNgoFinancialReports } from "@/lib/hooks/use-ngo-financial-reports";

interface FinancialReportRow {
  id: string;
  fiscalYear: string;
  period: "Q1" | "Q2" | "Q3" | "Q4" | "Annual";
  type: "Audited" | "Unaudited" | "Utilisation" | "CSR Impact";
  status: "Submitted" | "Verified" | "Pending";
  uploadedAt: string;
  reviewer?: string;
  url?: string;
}

const mockReports: FinancialReportRow[] = [
  {
    id: "rep-2025-q2",
    fiscalYear: "2024-2025",
    period: "Q2",
    type: "Audited",
    status: "Verified",
    uploadedAt: "12 Oct 2025 • 03:45 PM",
    reviewer: "Finance Desk",
    url: "#",
  },
  {
    id: "rep-2025-q1",
    fiscalYear: "2024-2025",
    period: "Q1",
    type: "Utilisation",
    status: "Submitted",
    uploadedAt: "02 Jul 2025 • 11:10 AM",
    reviewer: "Awaiting review",
    url: "#",
  },
  {
    id: "rep-2024-annual",
    fiscalYear: "2023-2024",
    period: "Annual",
    type: "CSR Impact",
    status: "Pending",
    uploadedAt: "—",
  },
];

const statusTone: Record<string, string> = {
  Submitted: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  Verified: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  Pending: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
};

const activityTimeline = [
  {
    icon: CheckCircle2,
    tone: "bg-emerald-500/10 text-emerald-500",
    title: "Q2 report verified",
    timestamp: "12 Oct 2025 • 05:02 PM",
  },
  {
    icon: RefreshCw,
    tone: "bg-sky-500/10 text-sky-500",
    title: "Utilisation report assigned to reviewer",
    timestamp: "03 Jul 2025 • 09:12 AM",
  },
  {
    icon: Clock4,
    tone: "bg-amber-500/10 text-amber-500",
    title: "Annual impact report pending submission",
    timestamp: "—",
  },
];

export default function NGOFinancialReportsPage() {
  const { reports, isLoading, error, usingMockData } = useNgoFinancialReports(mockReports);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "Finance" , href: "/dashboard/ngo/finance" },
      { label: "Financial reports" },
    ],
    [],
  );

  const isEmpty = !isLoading && reports.length === 0;

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />

      <SectionHeader
        title="Financial reports"
        subtitle="Submit quarterly and annual statements to stay CSR-compliant."
        action={
          <Button asChild className="gap-2" size="sm">
            <a href="/dashboard/ngo/finance/reports/upload">
              <FileText className="h-4 w-4" />
              Upload report
            </a>
          </Button>
        }
      />

      <main className="grid gap-6 xl:grid-cols-[3fr,2fr]">
        <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Statements archive</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track submissions, reviews, and compliance status.</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </header>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-14 rounded-3xl bg-slate-100 animate-pulse dark:bg-slate-800/40" />
              ))}
            </div>
          ) : error ? (
            <Card className="space-y-3 rounded-3xl border border-rose-200 bg-rose-50/70 p-6 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10">
              <h3 className="text-sm font-semibold">Unable to load reports</h3>
              <p className="text-sm">{error}</p>
            </Card>
          ) : isEmpty ? (
            <EmptyState
              icon={ArrowUpRight}
              title="No reports yet"
              description="Upload your first quarterly or annual statement to kickstart the compliance trail."
              actionLabel="Upload report"
              href="/dashboard/ngo/finance/reports/upload"
            />
          ) : (
            <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800/60">
              <Table aria-label="Financial reports table">
                <TableHeader>
                  <TableRow className="bg-slate-50/70 text-xs uppercase tracking-[0.14em] text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
                    <TableHead>Fiscal year</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Report type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last update</TableHead>
                    <TableHead className="w-32 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id} className="text-sm text-slate-600 dark:text-slate-300">
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100">{report.fiscalYear}</TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>
                        <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusTone[report.status] ?? statusTone.Pending)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.uploadedAt}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-slate-500"
                          disabled={!report.url}
                          asChild={Boolean(report.url)}
                        >
                          {report.url ? (
                            <a href={report.url} className="flex items-center gap-1">
                              Download
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : (
                            <span className="flex items-center gap-1">
                              Download
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        <aside className="space-y-6">
          <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">This week&apos;s focus</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                Submit your annual impact report by 31 Oct to stay compliant with CSR committee guidelines.
              </p>
              <p className="flex items-start gap-2">
                <FileText className="mt-0.5 h-4 w-4 text-sky-500" />
                Use the upload form to attach audited statements and optional supporting notes.
              </p>
            </div>
          </Card>

          <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Activity timeline</h3>
            <div className="space-y-4">
              {activityTimeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-3xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-2xl", item.tone)}>
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </main>
    </div>
  );
}
