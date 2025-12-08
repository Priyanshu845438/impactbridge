"use client";

import { useMemo, useState } from "react";
import {
  BarChartBig,
  CalendarRange,
  Download,
  FileText,
  LineChart,
  PieChart,
  Search,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const summaryTiles = [
  { id: "donations", label: "Total donations", value: "₹2.45 Crore", change: "+12.4% vs last month" },
  { id: "campaigns", label: "Active campaigns", value: "28", change: "3 paused" },
  { id: "ngos", label: "NGOs onboarded", value: "146", change: "+8 pending review" },
  { id: "companies", label: "Companies", value: "63", change: "+4 new this week" },
  { id: "users", label: "Total users", value: "1,204", change: "412 admins" },
] as const;

const donationTrend = [
  { month: "Jan", amount: 28 },
  { month: "Feb", amount: 32 },
  { month: "Mar", amount: 36 },
  { month: "Apr", amount: 31 },
  { month: "May", amount: 42 },
  { month: "Jun", amount: 48 },
] as const;

const categoryBreakdown = [
  { label: "Education", value: 34, color: "bg-sky-400" },
  { label: "Healthcare", value: 26, color: "bg-emerald-400" },
  { label: "Environment", value: 18, color: "bg-amber-400" },
  { label: "Livelihood", value: 14, color: "bg-rose-400" },
  { label: "Women", value: 8, color: "bg-indigo-400" },
] as const;

const contributionSplit = [
  { label: "NGOs", value: 62 },
  { label: "Companies", value: 38 },
] as const;

export default function ReportsDashboardPage() {
  const [activeRange, setActiveRange] = useState<"today" | "week" | "month" | "custom">("month");
  const [loading] = useState(false);

  const gridColumns = useMemo(() => (activeRange === "custom" ? "lg:grid-cols-1" : "lg:grid-cols-2"), [activeRange]);

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Reports & Analytics" },
        ]}
      />

      <SectionHeader
        title="Reports & Analytics"
        subtitle="Monitor platform-wide activity across donations, campaigns, and partnerships."
        action={
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
            <Button type="button" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader className="flex flex-col gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800/80">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">Time range</CardTitle>
          <Tabs value={activeRange} onValueChange={(value) => setActiveRange(value as typeof activeRange)}>
            <TabsList className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This week</TabsTrigger>
              <TabsTrigger value="month">This month</TabsTrigger>
              <TabsTrigger value="custom">Custom range</TabsTrigger>
            </TabsList>
            <TabsContent value="custom" className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <CalendarRange className="h-4 w-4 text-slate-400" />
              Custom range picker coming soon. For now, metrics reflect the last 90 days.
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {loading
              ? Array.from({ length: summaryTiles.length }).map((_, index) => (
                  <Skeleton key={`tile-skeleton-${index}`} className="h-28 rounded-2xl" />
                ))
              : summaryTiles.map((tile) => (
                  <div
                    key={tile.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-200 hover:bg-brand-50/60 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{tile.label}</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{tile.value}</p>
                    <p className="mt-1 text-xs text-emerald-500">{tile.change}</p>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>

      <div className={`grid gap-6 ${gridColumns}`}>
        <AnalyticsCard
          title="Donations over time"
          description="Mock trend for visual placeholder — Wire to backend metrics later."
          Icon={LineChart}
          loading={loading}
        >
          <ChartSkeleton>
            <svg viewBox="0 0 400 160" className="h-64 w-full text-brand-400" role="presentation" aria-hidden="true">
              <polyline fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points="0,120 50,110 100,90 150,100 200,75 250,60 300,72 350,50 400,65" />
              {donationTrend.map((point, index) => (
                <circle key={point.month} cx={(index / (donationTrend.length - 1)) * 380 + 10} cy={130 - point.amount} r="4" fill="currentColor" className="drop-shadow" />
              ))}
            </svg>
          </ChartSkeleton>
        </AnalyticsCard>

        <AnalyticsCard
          title="Contributions by category"
          description="Static seed data — replace with API once available."
          Icon={PieChart}
          loading={loading}
        >
          <ChartSkeleton>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex h-48 w-48 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[14px] border-sky-400" />
                <div className="absolute inset-4 rounded-full border-[14px] border-emerald-400 rotate-45" />
                <div className="absolute inset-8 rounded-full border-[14px] border-amber-400 rotate-90" />
                <div className="absolute inset-12 rounded-full border-[14px] border-rose-400 rotate-[135deg]" />
                <div className="absolute inset-16 rounded-full border-[14px] border-indigo-400 rotate-[180deg]" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">Mock pie</span>
              </div>
              <ul className="flex-1 space-y-2 text-sm">
                {categoryBreakdown.map((slice) => (
                  <li key={slice.label} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-800">
                    <span className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${slice.color}`} />
                      {slice.label}
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-100">{slice.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </ChartSkeleton>
        </AnalyticsCard>

        <AnalyticsCard
          title="NGO vs company contributions"
          description="Mock comparison until backend totals land."
          Icon={BarChartBig}
          loading={loading}
        >
          <ChartSkeleton>
            <div className="flex h-64 w-full items-end gap-6">
              {contributionSplit.map((entry) => (
                <div key={entry.label} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex h-full w-full items-end justify-center rounded-2xl border border-slate-200 bg-gradient-to-t from-brand-100 via-brand-100/60 to-white px-6 pb-4 dark:border-slate-800 dark:from-slate-800 dark:via-slate-800/60 dark:to-slate-900">
                    <div
                      className="w-8 rounded-full bg-brand-500 transition"
                      style={{ height: `${entry.value}%` }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{entry.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{entry.value}% of total funds</p>
                </div>
              ))}
            </div>
          </ChartSkeleton>
        </AnalyticsCard>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">Saved reports</CardTitle>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">No saved exports yet. Generate and save frequent reports for quick reuse.</p>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
              <Search className="h-4 w-4 text-slate-400" />
              <Input placeholder="Search saved reports" className="h-8 border-none bg-transparent px-0 text-sm focus-visible:ring-0" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No reports saved yet. Exports you generate will appear here with quick access links.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsCard({
  title,
  description,
  Icon,
  loading,
  children,
}: {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</CardTitle>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900/60">
          <Icon className="h-5 w-5" />
        </span>
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-64 w-full rounded-2xl" /> : children}
      </CardContent>
    </Card>
  );
}

function ChartSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[260px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/50">
      {children}
    </div>
  );
}
