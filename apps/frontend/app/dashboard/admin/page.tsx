
"use client";

import { useEffect, useRef } from "react";

import {
  ActivitySquare,
  ClipboardCheck,
  Clock4,
  Files,
  HandshakeIcon,
  LineChart,
  Users2,
} from "lucide-react";

import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { useAuth } from "@/providers/auth-context";

export default function AdminDashboard() {
  const { user } = useAuth();
  const didToast = useRef(false);

  useEffect(() => {
    if (user && !didToast.current) {
      console.log(`Welcome, ${user.name}`);
      didToast.current = true;
    }
  }, [user]);

  const activity = [
    {
      title: "New NGO registered",
      detail: "Swasthya Seva Trust onboarding submitted",
      time: "5 minutes ago",
    },
    {
      title: "CSR programme pending",
      detail: "Green Earth Initiative awaiting approval",
      time: "22 minutes ago",
    },
    {
      title: "Verification completed",
      detail: "Hope for Tomorrow Foundation",
      time: "1 hour ago",
    },
    {
      title: "User login",
      detail: "Corporate admin (Reliance CSR) accessed dashboard",
      time: "3 hours ago",
    },
  ];

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
      </div>

      <div className="space-y-4">
        <SectionHeader title="Recent activity" subtitle="Live audit feed across compliance, programmes, and access" />
        <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <ul className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {activity.map((item) => (
              <li key={`${item.title}-${item.time}`} className="flex items-start gap-4 px-5 py-4">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <ActivitySquare className="h-5 w-5" />
                </span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-600">{item.detail}</p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
