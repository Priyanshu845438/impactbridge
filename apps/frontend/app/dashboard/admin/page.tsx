
"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
  ClipboardCheck,
  Clock4,
  Files,
  HandshakeIcon,
  LineChart,
  ShieldCheck,
  TrendingUp,
  Users2,
} from "lucide-react";

import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { useAuth } from "@/providers/auth-context";
import { toast } from "sonner";
import { SkeletonCard, SkeletonStat, SkeletonActivityItem } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user || typeof window === "undefined") {
      return;
    }

    if (!sessionStorage.getItem("impactbridge:admin-welcomed")) {
      toast.success(`Welcome ${user.name}`);
      sessionStorage.setItem("impactbridge:admin-welcomed", "true");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, [user]);

  const activitySeries = useMemo(() => generateSeries(30, 40, 120), []);
  const ngoSeries = useMemo(() => generateSeries(10, 4, 18), []);
  const fundsSeries = useMemo(() => generateSeries(12, 20, 85), []);
  const activeUserSeries = useMemo(() => generateSeries(14, 60, 140), []);
  const userStatSeries = useMemo(() => generateSeries(8, 900, 1300), []);
  const approvalStatSeries = useMemo(() => generateSeries(8, 12, 28), []);
  const healthSeries = useMemo(() => generateSeries(8, 70, 98), []);

  const quickActions = [
    {
      title: "NGO verification queue",
      description: "Review newly registered organisations awaiting compliance diligence.",
      ctaLabel: "Review",
      href: "#",
      icon: ClipboardCheck,
    },
    {
      title: "Pending CSR programmes",
      description: "Approve incoming CSR initiatives and match them with vetted NGOs.",
      ctaLabel: "Manage",
      href: "#",
      icon: HandshakeIcon,
    },
    {
      title: "Registered NGOs",
      description: "Browse and update partner profiles, documents, and compliance states.",
      ctaLabel: "Open",
      href: "#",
      icon: Files,
    },
    {
      title: "Reports & insights",
      description: "Launch consolidated CSR-2 reports and impact analytics dashboards.",
      ctaLabel: "View",
      href: "#",
      icon: LineChart,
    },
  ] as const;

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <SkeletonCard />
          <div className="grid gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SkeletonStat />
          <SkeletonStat />
          <SkeletonStat />
          <SkeletonStat />
        </div>

        <div className="space-y-4">
          <SectionHeader title="Quick actions" subtitle="Common control centre tasks for administrators" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeader title="Recent activity" subtitle="Live audit feed across compliance, programmes, and access" />
          <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <ul className="max-h-72 divide-y divide-slate-100">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonActivityItem key={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-8 opacity-0",
        mounted ? "animate-in fade-in duration-500 opacity-100" : "",
      )}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-sm transition-all duration-200 hover:scale-[1.01]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Platform activity last 30 days
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">Engagement pulse</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              +18% vs previous
            </span>
          </div>
          <div className="mt-6">
            <AreaChart data={activitySeries} height={180} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <KpiCard
            label="New NGOs this month"
            value="42"
            delta={calculateDelta(ngoSeries)}
            data={ngoSeries}
          />
          <KpiCard
            label="CSR funds committed"
            value="₹4.8 Cr"
            delta={calculateDelta(fundsSeries)}
            data={fundsSeries}
            tone="emerald"
          />
          <KpiCard
            label="Active users trend"
            value="1.8k"
            delta={calculateDelta(activeUserSeries)}
            data={activeUserSeries}
            tone="indigo"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Users2}
          title="User count"
          value="1,248"
          helper="Across NGOs, corporates, and donors"
          data={userStatSeries}
        />
        <MetricCard
          icon={ClipboardCheck}
          title="Pending approvals"
          value="18"
          helper="Awaiting verification review"
          data={approvalStatSeries}
          trend={calculateDelta(approvalStatSeries)}
        />
        <MetricCard
          icon={Clock4}
          title="Last login"
          value="04:21 PM"
          helper="Most recent platform access"
          data={generateSeries(8, 3, 14)}
          highlight
        />
        <MetricCard
          icon={ShieldCheck}
          title="Platform health"
          value="94%"
          helper="SLA coverage across services"
          data={healthSeries}
          tone="emerald"
        />
      </div>

      <div className="space-y-4">
        <SectionHeader title="Quick actions" subtitle="Common control centre tasks for administrators" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </div>

      <ActivityFeed className="pt-4" />
    </div>
  );
}

type SparkData = number[];

type KpiCardProps = {
  label: string;
  value: string;
  delta: number;
  data: SparkData;
  tone?: "emerald" | "indigo" | "slate";
};

function KpiCard({ label, value, delta, data, tone = "slate" }: KpiCardProps) {
  const isPositive = delta >= 0;
  const toneClasses = {
    emerald: "from-emerald-50 to-white",
    indigo: "from-indigo-50 to-white",
    slate: "from-slate-50 to-white",
  }[tone];

  return (
    <div className={cn("rounded-3xl border border-slate-200 bg-gradient-to-br p-4 shadow-sm transition-all duration-200 hover:scale-[1.01]", toneClasses)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
          )}
        >
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} 
          {Math.abs(delta).toFixed(1)}%
        </span>
      </div>
      <div className="mt-4">
        <Sparkline data={data} height={56} />
      </div>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
  helper: string;
  icon: typeof Users2;
  data: SparkData;
  trend?: number;
  highlight?: boolean;
  tone?: "emerald" | "indigo" | "slate";
};

function MetricCard({ title, value, helper, icon: Icon, data, trend, highlight, tone = "slate" }: MetricCardProps) {
  const delta = trend ?? calculateDelta(data);
  const isPositive = delta >= 0;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
            <p className={cn("text-2xl font-semibold text-slate-900", highlight && "text-indigo-600")}>{value}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
          )}
        >
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} 
          {Math.abs(delta).toFixed(1)}%
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{helper}</p>
      <div className="mt-4">
        <Sparkline data={data} height={64} area tone={tone} />
      </div>
    </div>
  );
}

type ChartProps = {
  data: SparkData;
  height?: number;
};

function AreaChart({ data, height = 160 }: ChartProps) {
  const width = 520;
  const padding = 12;
  const { path, areaPath } = buildPaths(data, width, height, padding);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      <defs>
        <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#activityGradient)" />
      <path d={path} fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type SparklineProps = {
  data: SparkData;
  height?: number;
  area?: boolean;
  tone?: "emerald" | "indigo" | "slate";
};

function Sparkline({ data, height = 48, area = false, tone = "slate" }: SparklineProps) {
  const width = 160;
  const padding = 8;
  const { path, areaPath } = buildPaths(data, width, height, padding);
  const toneColor = {
    emerald: "#10b981",
    indigo: "#6366f1",
    slate: "#475569",
  }[tone];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      {area ? (
        <path d={areaPath} fill={`${toneColor}20`} />
      ) : null}
      <path d={path} fill="none" stroke={toneColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function buildPaths(data: SparkData, width: number, height: number, padding: number) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const steps = data.length - 1 || 1;
  const stepX = (width - padding * 2) / steps;

  const points = data.map((value, index) => {
    const x = padding + stepX * index;
    const normalized = (value - min) / range;
    const y = height - padding - normalized * (height - padding * 2);
    return { x, y };
  });

  const path = points.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, "");

  const areaPath = `${path} L ${padding + stepX * (data.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`;

  return { path, areaPath };
}

function generateSeries(count: number, min: number, max: number): SparkData {
  return Array.from({ length: count }, (_, index) => {
    const random = Math.random() * (max - min) + min;
    if (index === 0) return random;
    const prev = index > 0 ? (Math.random() > 0.5 ? random : (random + (Math.random() * 0.4 - 0.2) * (max - min))) : random;
    return Math.max(min, Math.min(max, prev));
  });
}

function calculateDelta(data: SparkData) {
  if (data.length < 2) return 0;
  const first = data[0];
  const last = data[data.length - 1];
  return ((last - first) / first) * 100;
}
