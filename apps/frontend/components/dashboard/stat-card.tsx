"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const toneMap = {
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    pill: "text-emerald-600",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    pill: "text-indigo-600",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    pill: "text-amber-600",
  },
  rose: {
    icon: "bg-rose-50 text-rose-600",
    pill: "text-rose-600",
  },
  slate: {
    icon: "bg-slate-100 text-slate-600",
    pill: "text-slate-600",
  },
} satisfies Record<string, { icon: string; pill: string }>;

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: number;
  statusColor?: keyof typeof toneMap;
  helper?: string;
  children?: React.ReactNode;
};

export const StatCard = React.memo(function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  statusColor = "emerald",
  helper,
  children,
}: StatCardProps) {
  const tone = toneMap[statusColor] ?? toneMap.emerald;
  const positive = trend >= 0;
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={cn("flex h-11 w-11 items-center justify-center rounded-full", tone.icon)}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
            <p className="text-2xl font-semibold text-slate-900">{value}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold",
            positive ? "text-emerald-600" : "text-rose-600",
          )}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {Math.abs(trend).toFixed(1)}%
        </span>
      </div>
      {helper ? <p className="mt-3 text-xs text-slate-500">{helper}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  );
});
