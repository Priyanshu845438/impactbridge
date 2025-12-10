"use client";

import { useMemo, useState } from "react";
import {
  BarChart2,
  Briefcase,
  Building2,
  ClipboardList,
  Coins,
  FileBarChart,
  Layers,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { cn } from "@/lib/utils";

interface KpiCard {
  label: string;
  value: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "sky" | "violet" | "amber";
}

const kpis: KpiCard[] = [
  {
    label: "Total CSR budget",
    value: "₹120Cr",
    helper: "FY 2025-26",
    icon: Briefcase,
    tone: "violet",
  },
  {
    label: "Funds allocated",
    value: "₹86Cr",
    helper: "Across 24 programmes",
    icon: Layers,
    tone: "sky",
  },
  {
    label: "Funds disbursed",
    value: "₹64Cr",
    helper: "Updated 2h ago",
    icon: Coins,
    tone: "emerald",
  },
  {
    label: "Active programmes",
    value: "24",
    helper: "6 pending approvals",
    icon: ClipboardList,
    tone: "amber",
  },
];

const spendingPerQuarter = [
  { quarter: "Q1", spend: 18.4 },
  { quarter: "Q2", spend: 21.7 },
  { quarter: "Q3", spend: 15.2 },
  { quarter: "Q4", spend: 8.9 },
];

const allocationSplit = [
  { name: "Education", value: 36, color: "#6366f1" },
  { name: "Healthcare", value: 28, color: "#0ea5e9" },
  { name: "Environment", value: 16, color: "#22c55e" },
  { name: "Livelihood", value: 12, color: "#f59e0b" },
  { name: "Disaster relief", value: 8, color: "#ec4899" },
];

const programmeProgress = [
  { month: "May", progress: 62 },
  { month: "Jun", progress: 68 },
  { month: "Jul", progress: 71 },
  { month: "Aug", progress: 74 },
  { month: "Sep", progress: 79 },
  { month: "Oct", progress: 83 },
];

const quickActions = [
  {
    title: "View partnered NGOs",
    description: "See current collaborations and due diligence notes.",
    ctaLabel: "Open directory",
    href: "/dashboard/admin/modules/ngos",
    icon: Building2,
  },
  {
    title: "Review programme proposals",
    description: "Approve pending submissions awaiting CSR funding.",
    ctaLabel: "Review now",
    href: "/dashboard/admin/modules/programmes/pipeline",
    icon: ClipboardList,
  },
  {
    title: "Track disbursement requests",
    description: "Monitor release schedules and supporting documents.",
    ctaLabel: "View requests",
    href: "/dashboard/admin/donations",
    icon: Coins,
  },
  {
    title: "Compliance overview",
    description: "Ensure statutory filings and board reports are on track.",
    ctaLabel: "Check compliance",
    href: "/dashboard/admin/modules/reports/compliance",
    icon: FileBarChart,
  },
];

const recentActivity = [
  {
    id: "activity-1",
    title: "₹1.8Cr disbursed to Project Udaan",
    timestamp: "15 Oct 2025 • 10:12 AM",
    detail: "Funds released for STEM labs expansion in rural schools.",
  },
  {
    id: "activity-2",
    title: "Partnership with HealTrust renewed",
    timestamp: "12 Oct 2025 • 03:40 PM",
    detail: "Three-year healthcare collaboration approved by CSR board.",
  },
  {
    id: "activity-3",
    title: "Livelihood programme hit 75% milestone",
    timestamp: "08 Oct 2025 • 01:05 PM",
    detail: "Quarterly review indicates steady progress toward 2025 goals.",
  },
  {
    id: "activity-4",
    title: "Compliance draft uploaded",
    timestamp: "02 Oct 2025 • 09:18 AM",
    detail: "CSR utiliation report shared for internal review.",
  },
];

export default function CompanyDashboardPage() {
  const [isLoadingCharts] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company Dashboard" },
    ],
    [],
  );

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />
      <SectionHeader
        title="Company Dashboard"
        subtitle="Monitor CSR programmes, partners, and impact."
        action={
          <Button variant="outline" size="sm" className="gap-2">
            <BarChart2 className="h-4 w-4" />
            Export summary
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((card) => (
          <KpiCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <Card className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:col-span-3">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">CSR spending per quarter</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">FY 2025-26 (₹ in Crores)</p>
            </div>
          </header>
          <div className="mt-6 h-72">
            {isLoadingCharts ? (
              <Skeleton className="h-full w-full rounded-3xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingPerQuarter}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                  <XAxis dataKey="quarter" stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value}Cr`} axisLine={false} tickLine={false} />
                  <RechartsTooltip formatter={(value) => `₹${value}Cr`} cursor={{ fill: "rgba(99,102,241,0.08)" }} />
                  <Bar dataKey="spend" radius={[12, 12, 4, 4]} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:col-span-2">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Allocation by category</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Share of sanctioned CSR budget</p>
            </div>
          </header>
          <div className="mt-6 flex flex-col items-center gap-6 md:flex-row">
            {isLoadingCharts ? (
              <Skeleton className="h-56 w-full rounded-3xl" />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={allocationSplit} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={4}>
                    {allocationSplit.map((slice) => (
                      <Cell key={slice.name} fill={slice.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {allocationSplit.map((slice) => (
                <li key={slice.name} className="flex items-center justify-between gap-6">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                    {slice.name}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{slice.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      <section className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Programme progress trend</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Average completion across funded programmes</p>
          </div>
        </header>
        <div className="mt-6 h-72">
          {isLoadingCharts ? (
            <Skeleton className="h-full w-full rounded-3xl" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={programmeProgress}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="month" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} domain={[50, 100]} />
                <RechartsTooltip formatter={(value) => `${value}% completion`} cursor={{ stroke: "#0ea5e9", strokeWidth: 1 }} />
                <Line type="monotone" dataKey="progress" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </ReLineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Quick actions</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">CSR shortcuts tailored to operations and compliance.</p>
          </div>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Recent activity</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">CSR allocations, partnerships, and compliance updates.</p>
          </div>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </header>

        <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <ul className="space-y-4">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="border-l-2 border-slate-200 pl-4 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{activity.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{activity.timestamp}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{activity.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

function KpiCard({ label, value, helper, icon: Icon, tone }: KpiCard) {
  const toneClasses: Record<KpiCard["tone"], string> = {
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    sky: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-200",
  };

  return (
    <Card className="flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl", toneClasses[tone])} aria-hidden>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">{value}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
      </div>
    </Card>
  );
}
