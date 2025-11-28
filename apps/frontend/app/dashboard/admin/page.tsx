
"use client";

import { useEffect, useState } from "react";

import { ClipboardCheck, Clock4, Files, HandshakeIcon, LineChart, Users2 } from "lucide-react";

import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { useAuth } from "@/providers/auth-context";
import { toast } from "sonner";
import { SkeletonCard, SkeletonStat, SkeletonActivityItem } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

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

  const quickActions = (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <QuickActionCard
        title="NGO verification queue"
        description="Review newly registered organisations awaiting compliance diligence."
        ctaLabel="Review"
        href="#"
        icon={ClipboardCheck}
      />
      <QuickActionCard
        title="Pending CSR programmes"
        description="Approve incoming CSR initiatives and match them with vetted NGOs."
        ctaLabel="Manage"
        href="#"
        icon={HandshakeIcon}
      />
      <QuickActionCard
        title="Registered NGOs"
        description="Browse and update partner profiles, documents, and compliance states."
        ctaLabel="Open"
        href="#"
        icon={Files}
      />
      <QuickActionCard
        title="Reports & insights"
        description="Launch consolidated CSR-2 reports and impact analytics dashboards."
        ctaLabel="View"
        href="#"
        icon={LineChart}
      />
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={Users2}
          title="User count"
          value="1,248"
          helper="Across NGOs, corporates, and donors"
        />
        <StatCard
          icon={ClipboardCheck}
          title="Pending approvals"
          value="18"
          helper="Awaiting CSR or verification review"
        />
        <StatCard
          icon={Clock4}
          title="Last login activity"
          value="04:21 PM"
          helper="Most recent platform access"
        />
      </div>

      <div className="space-y-4">
        <SectionHeader title="Quick actions" subtitle="Common control centre tasks for administrators" />
        {quickActions}
      </div>

      <ActivityFeed className="pt-4" />
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  helper: string;
  icon: typeof Users2;
};

function StatCard({ title, value, helper, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/90 p-5 shadow-sm shadow-emerald-100 transition-transform duration-150 hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
          <p className="text-2xl font-semibold text-slate-900">{value}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">{helper}</p>
    </div>
  );
}
