"use client";

import { useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

type MetricKey = "donations" | "impact";

interface ImpactTrendChartProps {
  className?: string;
}

const data = [
  { month: "Jan", donations: 40, impact: 20 },
  { month: "Feb", donations: 55, impact: 30 },
  { month: "Mar", donations: 62, impact: 34 },
  { month: "Apr", donations: 58, impact: 38 },
  { month: "May", donations: 70, impact: 44 },
  { month: "Jun", donations: 77, impact: 50 },
  { month: "Jul", donations: 74, impact: 47 },
  { month: "Aug", donations: 81, impact: 56 },
  { month: "Sep", donations: 88, impact: 60 },
  { month: "Oct", donations: 95, impact: 64 },
  { month: "Nov", donations: 102, impact: 70 },
  { month: "Dec", donations: 110, impact: 76 },
];

const metricOptions: Array<{ key: MetricKey; label: string }> = [
  { key: "donations", label: "Donations" },
  { key: "impact", label: "Impact" },
];

export function ImpactTrendChart({ className }: ImpactTrendChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("donations");

  const chartColor = useMemo(
    () =>
      selectedMetric === "donations"
        ? { stroke: "#059669", glow: "shadow-[0_0_18px_rgba(16,185,129,0.35)]" }
        : { stroke: "#2563eb", glow: "shadow-[0_0_18px_rgba(37,99,235,0.35)]" },
    [selectedMetric],
  );

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/70",
        "sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-heading-4 font-semibold text-slate-900 dark:text-slate-50">
            Impact & Donations Trend
          </p>
          <p className="text-small text-slate-500 dark:text-slate-400">
            Track how monthly giving aligns with measurable outcomes.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/70 p-1 dark:border-slate-700 dark:bg-slate-900/50">
          {metricOptions.map((option) => {
            const isActive = option.key === selectedMetric;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelectedMetric(option.key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition",
                  isActive
                    ? "bg-white text-emerald-600 shadow-sm dark:bg-slate-800 dark:text-emerald-300"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-100",
                )}
                aria-pressed={isActive}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickMargin={12}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              width={36}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3", stroke: "#cbd5f5" }}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid rgba(148, 163, 184, 0.35)",
                background: "rgba(255,255,255,0.94)",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
              }}
              labelStyle={{ color: "#0f172a", fontWeight: 600 }}
              formatter={(value: number) => [`${value}`, selectedMetric === "donations" ? "Donations" : "Impact"]}
            />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={chartColor.stroke}
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 1.5, stroke: "#f8fafc", fill: chartColor.stroke }}
              activeDot={{ r: 6, stroke: "#f1f5f9", strokeWidth: 2 }}
              className={chartColor.glow}
              isAnimationActive
              animationDuration={900}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

