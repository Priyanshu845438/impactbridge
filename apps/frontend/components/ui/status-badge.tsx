"use client";

import { CheckCircle2, FileCheck2, FileText } from "lucide-react";

import { cn } from "@/lib/utils";

export type StoryPublishingStatus = "Draft" | "Submitted" | "Published";

interface StatusBadgeProps {
  status: StoryPublishingStatus;
  className?: string;
}

const STATUS_STYLES: Record<StoryPublishingStatus, string> = {
  Draft: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  Submitted: "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-200",
  Published: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200",
};

const STATUS_ICONS: Record<StoryPublishingStatus, typeof CheckCircle2> = {
  Draft: FileText,
  Submitted: FileCheck2,
  Published: CheckCircle2,
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const Icon = STATUS_ICONS[status];

  return (
    <span
      key={status}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 animate-in fade-in-0 zoom-in-95",
        STATUS_STYLES[status],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {status}
    </span>
  );
}

