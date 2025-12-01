"use client";

import React from "react";
import { Clock3, ShieldCheck, HandshakeIcon, FileSignature, Star } from "lucide-react";

import { cn } from "@/lib/utils";

const ACTIVITY = [
  {
    icon: ShieldCheck,
    title: "Hope for Tomorrow Foundation verified",
    description: "Compliance documents reviewed and approved",
    time: "45m ago",
  },
  {
    icon: HandshakeIcon,
    title: "Reliance CSR funded Green Earth",
    description: "₹12L tranche recorded via CSR-2 workflow",
    time: "2h ago",
  },
  {
    icon: FileSignature,
    title: "NGO quarterly report submitted",
    description: "Swasthya Seva Trust uploaded Q4 outcomes",
    time: "5h ago",
  },
  {
    icon: Star,
    title: "Donor feedback received",
    description: "Corporate donor rated Clean Waters campaign ⭐⭐⭐⭐",
    time: "1d ago",
  },
];

export const ActivityFeed = React.memo(function ActivityFeed({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Recent activity</h2>
        <span className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">Live feed</span>
      </div>

      <div className="relative rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="absolute left-9 top-10 bottom-10 hidden w-px bg-slate-200 md:block" />
        <ul className="space-y-6 md:space-y-0">
          {ACTIVITY.map(({ icon: Icon, title, description, time }) => (
            <li key={`${title}-${time}`} className="relative flex flex-col gap-3 md:flex-row md:gap-4">
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
                  {time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
