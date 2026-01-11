"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { Clock3, ShieldCheck, HandshakeIcon, FileSignature, Star } from "lucide-react";

import { cn } from "@/lib/utils";

export type ActivityFeedItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: LucideIcon;
};

type ActivityFeedProps = React.ComponentPropsWithoutRef<"section"> & {
  items?: ActivityFeedItem[];
  icon?: LucideIcon;
};

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

const FALLBACK_ACTIVITY: Array<ActivityFeedItem & { icon: LucideIcon }> = [
  {
    id: "fallback-ngo-verified",
    icon: ShieldCheck,
    title: "Hope for Tomorrow Foundation verified",
    description: "Compliance documents reviewed and approved",
    timestamp: "45m ago",
  },
  {
    id: "fallback-csr-funded",
    icon: HandshakeIcon,
    title: "Reliance CSR funded Green Earth",
    description: "₹12L tranche recorded via CSR-2 workflow",
    timestamp: "2h ago",
  },
  {
    id: "fallback-report-submitted",
    icon: FileSignature,
    title: "NGO quarterly report submitted",
    description: "Swasthya Seva Trust uploaded Q4 outcomes",
    timestamp: "5h ago",
  },
  {
    id: "fallback-donor-feedback",
    icon: Star,
    title: "Donor feedback received",
    description: "Corporate donor rated Clean Waters campaign ⭐⭐⭐⭐",
    timestamp: "1d ago",
  },
];

export const ActivityFeed = React.memo(function ActivityFeed({
  className,
  items,
  icon,
  ...rest
}: ActivityFeedProps) {
  const { ["aria-labelledby"]: ariaLabelledBy, ...sectionProps } = rest as Record<string, unknown>;
  const headingId = typeof ariaLabelledBy === "string" && ariaLabelledBy.length > 0 ? ariaLabelledBy : "recent-activity-heading";

  const mergedItems = items?.length
    ? items.map((item) => ({
        ...item,
        icon: item.icon ?? icon ?? HandshakeIcon,
        timestamp: formatTimestamp(item.timestamp),
      }))
    : FALLBACK_ACTIVITY;
  return (
    <section {...(sectionProps as React.ComponentPropsWithoutRef<"section">)} className={cn("space-y-4", className)} aria-labelledby={headingId}>
      <div className="flex items-center justify-between">
        <h2 id={headingId} className="text-heading-3 text-slate-700">
          Recent activity
        </h2>
        <span className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">Live feed</span>
      </div>

      <div className="relative rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm" role="list">
        <div className="absolute left-9 top-10 bottom-10 hidden w-px bg-slate-200 md:block" />
        <ul className="space-y-6 md:space-y-0">
          {mergedItems.map(({ icon: Icon, title, description, timestamp, id }) => (
            <li
              key={id}
              className="relative flex flex-col gap-3 md:flex-row md:gap-4"
              aria-label={`${title}. ${description}. ${timestamp}`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-xs text-slate-600">{description}</p>
              </div>
              <div className="md:flex md:w-32 md:justify-end">
                <div className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  <Clock3 className="h-3.5 w-3.5" />
                  {timestamp}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
