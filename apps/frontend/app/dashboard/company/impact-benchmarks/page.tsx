"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sparkles, TrendingUp } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricUnit = "currency" | "percent" | "score";

type BenchmarkMetric = {
  id: string;
  label: string;
  companyValue: number;
  industryValue: number;
  unit: MetricUnit;
  higherIsBetter: boolean;
  helper: string;
};

const KPI_METRICS: BenchmarkMetric[] = [
  {
    id: "cost",
    label: "Avg cost per beneficiary",
    companyValue: 5400,
    industryValue: 6100,
    unit: "currency",
    higherIsBetter: false,
    helper: "Lower spend indicates efficiency",
  },
  {
    id: "success",
    label: "Programme success rate",
    companyValue: 78,
    industryValue: 70,
    unit: "percent",
    higherIsBetter: true,
    helper: "Share of initiatives meeting stated goals",
  },
  {
    id: "compliance",
    label: "Compliance score",
    companyValue: 89,
    industryValue: 82,
    unit: "score",
    higherIsBetter: true,
    helper: "Weighted audit + documentation health",
  },
  {
    id: "outreach",
    label: "Outreach growth",
    companyValue: 24,
    industryValue: 18,
    unit: "percent",
    higherIsBetter: true,
    helper: "Year-over-year supporter expansion",
  },
];

const BAR_CHART_DATA = [
  {
    metric: "Cost / Beneficiary (₹k)",
    Company: 5.4,
    Industry: 6.1,
  },
  {
    metric: "Success rate (%)",
    Company: 78,
    Industry: 70,
  },
  {
    metric: "Compliance score",
    Company: 89,
    Industry: 82,
  },
  {
    metric: "Outreach growth (%)",
    Company: 24,
    Industry: 18,
  },
];

const RADAR_DATA = [
  { aspect: "Efficiency", company: 86, industry: 78 },
  { aspect: "Scale", company: 74, industry: 70 },
  { aspect: "Compliance", company: 90, industry: 82 },
  { aspect: "Engagement", company: 84, industry: 76 },
  { aspect: "Innovation", company: 72, industry: 65 },
];

export default function ImpactBenchmarksPage() {
  const insights = useMemo(() => buildInsights(KPI_METRICS), []);

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Company", href: "/dashboard/company" },
          { label: "Impact Benchmarks" },
        ]}
      />

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/40 dark:text-sky-200">
            Comparative view
          </Badge>
          <Badge className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
            Mock data
          </Badge>
        </div>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Impact Benchmarks</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            See how your CSR performance compares to industry standards across efficiency, compliance, and engagement benchmarks.
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {KPI_METRICS.map((metric) => {
          const { companyDisplay, industryDisplay, deltaLabel, deltaTone, progressWidth } = describeMetric(metric);

          return (
            <Card
              key={metric.id}
              className="space-y-4 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{companyDisplay}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-600 dark:text-slate-300">Industry: {industryDisplay}</span>
                <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", deltaTone)}>{deltaLabel}</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-slate-200/70 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all"
                    style={{ width: `${progressWidth}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{metric.helper}</p>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
       <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
         <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
           <div>
             <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Company vs industry metrics</h2>
             <p className="text-sm text-slate-500 dark:text-slate-400">Direct comparison across cost, success, compliance, and growth indicators.</p>
           </div>
           <Badge className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
             Updated monthly
           </Badge>
         </header>
          <div className="mt-6 h-[320px] w-full" data-testid="impact-benchmark-bar">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_CHART_DATA} barCategoryGap={24}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="metric" className="text-xs text-slate-500" tickLine={false} axisLine={false} interval={0} angle={-10} textAnchor="end" />
                <YAxis className="text-xs text-slate-500" tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  cursor={{ fill: "rgba(14,165,233,0.08)" }}
                  contentStyle={{ borderRadius: 16, border: "none", background: "rgba(15,23,42,0.88)", color: "white" }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Company" fill="#10B981" radius={[8, 8, 4, 4]} />
                <Bar dataKey="Industry" fill="#64748B" radius={[8, 8, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

       <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
         <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
           <div>
             <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Strength radar</h2>
             <p className="text-sm text-slate-500 dark:text-slate-400">Identify areas where you outperform or trail the broader CSR landscape.</p>
           </div>
         </header>
          <div className="mt-6 h-[320px] w-full" data-testid="impact-benchmark-radar">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA} outerRadius="80%">
                <PolarGrid stroke="rgba(148,163,184,0.3)" />
                <PolarAngleAxis dataKey="aspect" className="text-xs text-slate-500" />
                <PolarRadiusAxis className="text-[10px] text-slate-400" tickLine={false} axisLine={false} />
                <Radar name="Company" dataKey="company" stroke="#10B981" fill="#10B981" fillOpacity={0.35} />
                <Radar name="Industry" dataKey="industry" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 16, border: "none", background: "rgba(15,23,42,0.88)", color: "white" }}
                  formatter={(value: number) => [`${value} pts`, "Score"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Insights</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {insights.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
              >
                <Sparkles className="mt-0.5 h-4 w-4 text-emerald-500" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Next steps</h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>
              Use these benchmarks to prioritise programme reviews, adjust partner support, and shape upcoming CSR proposals. Once analytics APIs
              are live, this module will visualise real-time industry medians.
            </p>
            <div className="space-y-2 rounded-3xl border border-emerald-200/70 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">Suggested focus</p>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-200">
                Double down on outreach momentum while investing in innovation pilots to close the remaining gap.
              </p>
            </div>
            <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
              Sync with the analytics team to plug in live data feeds once the benchmarking service is ready.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}

function describeMetric(metric: BenchmarkMetric) {
  const companyDisplay = formatMetric(metric.unit, metric.companyValue);
  const industryDisplay = formatMetric(metric.unit, metric.industryValue);

  const performanceRatio = metric.higherIsBetter
    ? metric.industryValue === 0
      ? 1
      : metric.companyValue / metric.industryValue
    : metric.companyValue === 0
      ? 1
      : metric.industryValue / metric.companyValue;

  const progressWidth = Math.min(Math.max(performanceRatio, 0), 1.15) * 100;

  const rawDelta = metric.higherIsBetter
    ? metric.companyValue - metric.industryValue
    : metric.industryValue - metric.companyValue;

  const deltaLabel = buildDeltaLabel(metric.unit, rawDelta);
  const deltaTone = rawDelta >= 0 ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200" : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/10 dark:text-rose-200";

  return {
    companyDisplay,
    industryDisplay,
    deltaLabel,
    deltaTone,
    progressWidth: Math.max(8, Math.min(progressWidth, 100)),
  };
}

function formatMetric(unit: MetricUnit, value: number) {
  if (unit === "currency") {
    return `₹${value.toLocaleString()}`;
  }
  if (unit === "percent") {
    return `${value.toFixed(0)}%`;
  }
  return `${value.toFixed(0)} pts`;
}

function buildDeltaLabel(unit: MetricUnit, rawDelta: number) {
  const ahead = rawDelta >= 0;
  const absolute = Math.abs(rawDelta);

  if (absolute < 0.01) {
    return "On par";
  }

  let formatted: string;
  if (unit === "currency") {
    formatted = `₹${absolute.toLocaleString()}`;
    return ahead ? `Ahead by ${formatted}` : `Lagging by ${formatted}`;
  }

  if (unit === "percent") {
    formatted = `${absolute.toFixed(1)}%`;
    return ahead ? `Ahead by ${formatted}` : `Lagging by ${formatted}`;
  }

  formatted = `${absolute.toFixed(1)} pts`;
  return ahead ? `Ahead by ${formatted}` : `Lagging by ${formatted}`;
}

function buildInsights(metrics: BenchmarkMetric[]) {
  return metrics.map((metric) => {
    const rawDelta = metric.higherIsBetter
      ? metric.companyValue - metric.industryValue
      : metric.industryValue - metric.companyValue;

    const ahead = rawDelta >= 0;
    const diff = metric.unit === "currency" ? `₹${Math.abs(rawDelta).toLocaleString()}` : `${Math.abs(rawDelta).toFixed(1)}${metric.unit === "percent" ? "%" : " pts"}`;

    const title = ahead ? `Strong ${metric.label.toLowerCase()}` : `${metric.label} needs attention`;
    const body = ahead
      ? `${metric.label} is ${diff} better than the industry median, indicating outperformance you can spotlight in CSR reporting.`
      : `${metric.label} trails the industry by ${diff}. Explore targeted interventions or partner support to close the gap.`;

    return {
      id: metric.id,
      title,
      body,
    };
  });
}
