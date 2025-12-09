"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ChartLine,
  FileText,
  HeartHandshake,
  Sparkles,
  UploadCloud,
  Users,
} from "lucide-react";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import { useAuth } from "@/providers/auth-context";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/dashboard/section-header";
import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "blue" | "amber" | "rose";
}

const donorCategoryColors = ["#0ea5e9", "#ec4899", "#22c55e", "#f97316", "#8b5cf6"];

const statsDataset: StatCardProps[] = [
  {
    label: "Active campaigns",
    value: "4",
    helper: "2 launching this quarter",
    icon: Sparkles,
    tone: "emerald",
  },
  {
    label: "Total donations received",
    value: "₹12.4L",
    helper: "Up 18% vs last month",
    icon: HeartHandshake,
    tone: "rose",
  },
  {
    label: "Pending approvals",
    value: "3",
    helper: "Awaiting compliance review",
    icon: FileText,
    tone: "amber",
  },
  {
    label: "Supporters",
    value: "1,286",
    helper: "+42 joined this week",
    icon: Users,
    tone: "blue",
  },
];

const donationTrendData = [
  { month: "Jan", amount: 320000 },
  { month: "Feb", amount: 285000 },
  { month: "Mar", amount: 360000 },
  { month: "Apr", amount: 410000 },
  { month: "May", amount: 390000 },
  { month: "Jun", amount: 470000 },
  { month: "Jul", amount: 520000 },
];

const donorCategories = [
  { name: "Corporate CSR", value: 38 },
  { name: "Major donors", value: 24 },
  { name: "Recurring supporters", value: 18 },
  { name: "One-time givers", value: 12 },
  { name: "Employee matches", value: 8 },
];

const quickActions = [
  {
    title: "Create campaign",
    description: "Launch a new fundraising initiative in under five minutes.",
    ctaLabel: "Start",
    href: "/dashboard/admin/campaigns/create",
    icon: Sparkles,
  },
  {
    title: "Upload documents",
    description: "Submit compliance proofs and keep your profile audit-ready.",
    ctaLabel: "Upload",
    href: "/dashboard/admin/ngos/files",
    icon: UploadCloud,
  },
  {
    title: "Request verification",
    description: "Tell ImpactBridge you're ready for the next milestone review.",
    ctaLabel: "Request",
    href: "/dashboard/admin/ngos/verification",
    icon: BadgeCheck,
  },
];

function StatCard({ label, value, helper, icon: Icon, tone }: StatCardProps) {
  const toneClasses: Record<StatCardProps["tone"], string> = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
    blue: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <span
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-2xl text-lg",
          toneClasses[tone],
        )}
        aria-hidden
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">{value}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
      </div>
    </div>
  );
}

export default function NGODashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const greeting = useMemo(
    () => user?.name ?? "ImpactBridge Partner",
    [user?.name],
  );

  return (
    <div className="space-y-12 pb-12">
      <section className="rounded-4xl border border-slate-200 bg-gradient-to-r from-emerald-50 via-emerald-50 to-sky-50 p-8 shadow-sm dark:border-slate-800 dark:from-emerald-900/40 dark:via-slate-900 dark:to-slate-900/40 sm:p-12">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-4 w-96 max-w-full" />
            <div className="flex flex-wrap gap-3 pt-4">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-36" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm dark:bg-slate-800/80 dark:text-emerald-200">
              <BadgeCheck className="h-4 w-4" aria-hidden />
              Registered NGO workspace
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                Welcome back, {greeting.split(" ")[0]}!
              </h1>
              <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
                Here is a quick pulse on your campaigns, supporters, and compliance. Keep the momentum going—ImpactBridge is cheering for your next milestone.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="gap-2">
                <Link href="/dashboard/admin/campaigns/create">
                  <Sparkles className="h-4 w-4" />
                  Launch campaign
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <UploadCloud className="h-4 w-4" />
                Upload documents
              </Button>
              <Button variant="ghost" size="lg" className="gap-2">
                <CalendarClock className="h-4 w-4" />
                View upcoming reviews
              </Button>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Your at-a-glance metrics"
          subtitle="A friendly summary of how your organisation is progressing."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-40 rounded-3xl" />
              ))
            : statsDataset.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Donations & supporters"
          subtitle="Understand where your support is coming from and how it evolves."
        />
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            {isLoading ? (
              <Skeleton className="h-72 w-full rounded-2xl" />
            ) : donationTrendData.length ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Donation trend
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                      Monthly giving insight
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                    <ChartLine className="h-4 w-4" />
                    +18% vs last month
                  </span>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={donationTrendData} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        tickMargin={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value: number) => `₹${Math.round(value / 1000)}k`}
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        width={46}
                      />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3", stroke: "#cbd5f5" }}
                        contentStyle={{
                          borderRadius: 16,
                          border: "1px solid rgba(148,163,184,0.35)",
                          background: "rgba(15,23,42,0.92)",
                          color: "#f8fafc",
                          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.25)",
                        }}
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, "Donations"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ r: 3, strokeWidth: 1.5, stroke: "#f8fafc", fill: "#10b981" }}
                        activeDot={{ r: 6, stroke: "#ecfdf5", strokeWidth: 2 }}
                        isAnimationActive
                        animationDuration={900}
                        className="shadow-[0_0_18px_rgba(16,185,129,0.35)]"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={ChartLine}
                title="No donations yet"
                description="Once supporters start contributing, your trend analytics will appear here."
                action={{ href: "/dashboard/admin/campaigns/create", label: "Launch your first campaign" }}
              />
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            {isLoading ? (
              <Skeleton className="h-72 w-full rounded-2xl" />
            ) : donorCategories.length ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Supporter mix
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                    Donor categories snapshot
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donorCategories}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          paddingAngle={4}
                        >
                          {donorCategories.map((entry, index) => (
                            <Cell key={entry.name} fill={donorCategoryColors[index % donorCategoryColors.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ul className="w-full space-y-2">
                    {donorCategories.map((category, index) => (
                      <li
                        key={category.name}
                        className="flex items-center justify-between rounded-2xl bg-slate-50/70 px-4 py-2 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300"
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: donorCategoryColors[index % donorCategoryColors.length] }}
                            aria-hidden
                          />
                          {category.name}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{category.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No supporters categorised yet"
                description="As you gather donations, supporter groups will appear so you can tailor outreach."
                action={{ href: "/dashboard/admin/donors", label: "View donor directory" }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Quick wins"
          subtitle="A few helpful shortcuts picked just for your team."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-48 rounded-3xl" />
              ))
            : quickActions.map((action) => (
                <QuickActionCard key={action.title} {...action} />
              ))}
        </div>
      </section>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: { href: string; label: string };
}

function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/60 p-8 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      {action ? (
        <Button asChild variant="outline" className="gap-2">
          <Link href={action.href}>
            {action.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
