
"use client";

import { memo, useEffect, useMemo, useState } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
  ClipboardCheck,
  Clock4,
  Files,
  HandshakeIcon,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users2,
} from "lucide-react";

import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { StatCard } from "@/components/dashboard/stat-card";
import { useAuth } from "@/providers/auth-context";
import { toast } from "sonner";
import { SkeletonCard, SkeletonStat, SkeletonActivityItem } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ImpactTrendChart } from "@/components/charts/impact-trend-chart";
import { DashboardOnboarding } from "@/components/onboarding/dashboard-onboarding";
import { getFeatureFlags } from "@/lib/feature-flags";
import { useAdminAnalytics } from "@/lib/hooks/use-admin-analytics";
import { formatCurrency, formatNumber } from "@/lib/formatters";

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

  const analyticsEnabled = useMemo(() => getFeatureFlags().API_DASHBOARD, []);

  const { data: analytics } = useAdminAnalytics({ enabled: analyticsEnabled });
  const hasAnalytics = analyticsEnabled && Boolean(analytics);

  const activitySeries = useMemo(() => generateSeries(30, 40, 120), []);
  const baselineNgoSeries = useMemo(() => generateSeries(10, 4, 18), []);
  const baselineFundsSeries = useMemo(() => generateSeries(12, 20, 85), []);
  const baselineProgrammeSeries = useMemo(() => generateSeries(14, 60, 140), []);
  const userStatSeries = useMemo(() => generateSeries(8, 900, 1300), []);
  const approvalStatSeries = useMemo(() => generateSeries(8, 12, 28), []);
  const healthSeries = useMemo(() => generateSeries(8, 70, 98), []);
  const lastLoginSeries = useMemo(() => generateSeries(8, 3, 14), []);

  const donationTrendSeries = hasAnalytics && analytics?.donationTimeline.length ? analytics.donationTimeline : null;

  const programmeStatusSeries = hasAnalytics && analytics?.programmeStatus.length
    ? analytics.programmeStatus.map((entry) => entry.value)
    : baselineProgrammeSeries;

  const buildFlatSeries = (value: number | null | undefined, fallback: number[]) => {
    const safeValue = typeof value === "number" && Number.isFinite(value) ? value : 0;
    if (safeValue <= 0) {
      return fallback;
    }
    return Array.from({ length: fallback.length }, () => safeValue);
  };

  const ngoSeries = hasAnalytics && analytics
    ? buildFlatSeries(analytics.donationSummary.last30Days.amount, baselineNgoSeries)
    : baselineNgoSeries;

  const fundsSeries = hasAnalytics && analytics
    ? buildFlatSeries(analytics.donationSummary.today.amount, baselineFundsSeries)
    : baselineFundsSeries;

  const activeUserSeries = programmeStatusSeries.length ? programmeStatusSeries : baselineProgrammeSeries;

  const csrSubmissions = useMemo(() => {
    if (!donationTrendSeries?.length) {
      return createCSRSubmissionsData(30);
    }
    return donationTrendSeries.map((point, index) => {
      const label = new Date(point.name).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      const previous = donationTrendSeries[index - 1]?.value ?? point.value;
      return {
        label,
        value: point.value,
        previous,
      } satisfies CSRPoint;
    });
  }, [donationTrendSeries]);
  const activityTrend = useMemo(() => {
    if (!analytics?.donationTimeline?.length) {
      return createActivityData(activitySeries.slice(-12));
    }
    return analytics.donationTimeline.slice(-12).map((point) => ({
      label: new Date(point.name).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      active: point.value,
      submissions: point.value,
    }));
  }, [activitySeries, analytics?.donationTimeline]);

  const programmeTotal = useMemo(() => {
    if (!hasAnalytics || !analytics?.programmeStatus?.length) {
      return 0;
    }
    return analytics.programmeStatus.reduce((acc, curr) => acc + curr.value, 0);
  }, [hasAnalytics, analytics?.programmeStatus]);

  const donationTotal = hasAnalytics ? analytics!.donationSummary.totalAmount : 0;
  const donations30d = hasAnalytics ? analytics!.donationSummary.last30Days.amount : null;
  const donationsToday = hasAnalytics ? analytics!.donationSummary.today.amount : null;
  const activeProgrammes = hasAnalytics
    ? analytics!.programmeStatus.find((entry) => entry.label === "ACTIVE")?.value ?? null
    : null;
  const pendingApprovals = hasAnalytics
    ? analytics!.approvalStatus.find((entry) => entry.label === "PENDING")?.value ?? null
    : null;

  const donations30dDisplay = hasAnalytics && donations30d !== null ? formatCurrency(donations30d) : "₹4.8 Cr";
  const donationsTodayDisplay = hasAnalytics && donationsToday !== null ? formatCurrency(donationsToday) : "₹1.2 Cr";
  const programmesTrackedDisplay = hasAnalytics ? formatNumber(programmeTotal) : "1.8k";
  const totalDonationsDisplay = hasAnalytics ? formatCurrency(donationTotal) : "₹62.4L";
  const activeProgrammesDisplay = hasAnalytics && activeProgrammes !== null ? formatNumber(activeProgrammes) : "78%";
  const pendingApprovalsDisplay = hasAnalytics && pendingApprovals !== null ? formatNumber(pendingApprovals) : "64%";
  const reportsFiledDisplay = hasAnalytics ? formatNumber(analytics!.financial.totalReports) : "21";
  const reportsHelper = hasAnalytics
    ? `Across ${formatNumber(analytics!.financial.ngoCount)} NGOs`
    : "Initiatives expanding reach YoY";

  const quickActions = useMemo(
    () =>
      [
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
      ] as const,
    [],
  );

  const oversightSnapshot = useMemo(() => {
    if (!hasAnalytics || !analytics) {
      return [
        {
          title: "Verifications due",
          metric: "12 NGOs",
          helper: "Across legal, financial, compliance tracks",
          tone: "amber" as const,
        },
        {
          title: "Funds disbursing",
          metric: "₹2.4 Cr",
          helper: "In settlement over next 7 days",
          tone: "indigo" as const,
        },
        {
          title: "Impact reports",
          metric: "9 due",
          helper: "Awaiting quarterly validation",
          tone: "slate" as const,
        },
      ];
    }

    return [
      {
        title: "Verifications due",
        metric: `${formatNumber(analytics.approvalStatus.reduce((acc, entry) => acc + entry.value, 0))} approvals`,
        helper: "Across legal, financial, compliance tracks",
        tone: "amber" as const,
      },
      {
        title: "Funds disbursing",
        metric: formatCurrency(analytics.donationSummary.last30Days.amount),
        helper: "In settlement over next 30 days",
        tone: "indigo" as const,
      },
      {
        title: "Impact reports",
        metric: `${formatNumber(analytics.financial.totalReports)} filed`,
        helper: analytics.financial.latestSubmittedAt
          ? `Latest ${new Date(analytics.financial.latestSubmittedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
          : "Awaiting latest submission",
        tone: "slate" as const,
      },
    ];
  }, [analytics, hasAnalytics]);

  const pipelineMilestones = useMemo(
    () =>
      [
        {
          label: "CSR-1 onboarding",
          owner: "Compliance desk",
          status: "On track",
          eta: "Mar 04",
        },
        {
          label: "Green Earth audit",
          owner: "Finance ops",
          status: "Attention",
          eta: "Feb 28",
        },
        {
          label: "North region due diligence",
          owner: "Field review",
          status: "Scheduled",
          eta: "Mar 12",
        },
        {
          label: "Platform policy refresh",
          owner: "Governance",
          status: "Drafting",
          eta: "Mar 20",
        },
      ],
    [],
  );

  const assuranceNotes = useMemo(
    () => [
      {
        title: "Weekly compliance window",
        detail: "Finance and legal teams aligned on dual approvals for high-value CSR uploads.",
      },
      {
        title: "Partner sentiment",
        detail: "Average donor NPS 4.6/5 across the past fortnight with positive comments on reporting cadence.",
      },
    ],
    [],
  );

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

        <SkeletonCard className="h-80" />

        <div className="space-y-4">
          <SectionHeader
            title="Quick actions"
            subtitle="Common control centre tasks for administrators"
            data-onboarding="quick-actions"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeader
            title="Recent activity"
            subtitle="Live audit feed across compliance, programmes, and access"
            data-onboarding="activity-feed"
          />
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
    <>
      {mounted && <DashboardOnboarding />}
      <div className="space-y-10">
        <div
          className={cn(
            "space-y-10 opacity-0",
            mounted ? "animate-in fade-in duration-500 opacity-100" : "",
          )}
        >
          <section className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1.6fr)]">
              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-2">
                  <p className="text-caption font-semibold uppercase tracking-[0.28em] text-slate-400">Executive overview</p>
                  <h1 className="text-2xl font-semibold text-slate-900">
                    Platform engagement across the last 30 days
                  </h1>
                  <p className="text-small text-slate-500">
                    Monitor activity velocity, programme submissions, and user sentiment to keep CSR operations predictable.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/95 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption font-semibold uppercase tracking-[0.28em] text-slate-400">
                      Platform activity
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      +18% vs previous
                    </span>
                  </div>
                  <div className="mt-4 w-full min-h-[280px]">
                    <OverviewChart data={activityTrend} />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <KpiCard
                  label="Donations (30d)"
                  value={donations30dDisplay}
                  delta={calculateDelta(ngoSeries)}
                  data={ngoSeries}
                />
                <KpiCard
                  label="Funds today"
                  value={donationsTodayDisplay}
                  delta={calculateDelta(fundsSeries)}
                  data={fundsSeries}
                  tone="emerald"
                />
                <KpiCard
                  label="Programmes tracked"
                  value={programmesTrackedDisplay}
                  delta={calculateDelta(activeUserSeries)}
                  data={activeUserSeries}
                  tone="indigo"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.8fr)]">
            <ImpactTrendChart className="min-h-[320px]" />
            <div className="flex flex-col justify-between gap-4">
              <SectionHeader title="Metric signals" subtitle="Snapshot of correlated donation and impact metrics" />
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Total donations",
                    metric: totalDonationsDisplay,
                    helper: "Cumulative across platform",
                    icon: TrendingUp,
                    tone: "emerald",
                  },
                  {
                    title: "Active programmes",
                    metric: activeProgrammesDisplay,
                    helper: "Programmes currently in progress",
                    icon: Target,
                    tone: "indigo",
                  },
                  {
                    title: "Approvals pending",
                    metric: pendingApprovalsDisplay,
                    helper: "Awaiting verification",
                    icon: Users2,
                    tone: "amber",
                  },
                  {
                    title: "Reports filed",
                    metric: reportsFiledDisplay,
                    helper: reportsHelper,
                    icon: Sparkles,
                    tone: "slate",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-caption font-semibold uppercase tracking-[0.28em] text-slate-400">{item.title}</p>
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full",
                          item.tone === "emerald" && "bg-emerald-100 text-emerald-600",
                          item.tone === "indigo" && "bg-indigo-100 text-indigo-600",
                          item.tone === "amber" && "bg-amber-100 text-amber-600",
                          item.tone === "slate" && "bg-slate-200 text-slate-600",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-4 text-heading-2 text-slate-800">{item.metric}</p>
                    <p className="mt-1 text-small text-slate-500">{item.helper}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/95 p-shell shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-caption font-semibold uppercase tracking-[0.28em] text-slate-400">CSR submissions</p>
                <h3 className="text-heading-3 text-slate-700">Performance over the last month</h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                <TrendingUp className="h-3.5 w-3.5" />
                {calculateCSRDelta(csrSubmissions).toFixed(1)}% vs prev
              </span>
            </div>
            <div className="mt-4 w-full min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%" minHeight={280}>
                <BarChart data={csrSubmissions} margin={{ top: 12, right: 12, left: -6, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} interval={5} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis hide domain={[0, "dataMax + 6"]} />
                  <Tooltip cursor={{ fill: "rgba(15, 23, 42, 0.04)" }} content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#d9e2ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Users2}
              label="User count"
              value="1,248"
              helper="Across NGOs, corporates, and donors"
              trend={calculateDelta(userStatSeries)}
              statusColor="emerald"
            >
              <MicroBar data={userStatSeries} tone="#0f172a" />
            </StatCard>
            <StatCard
              icon={ClipboardCheck}
              label="Pending approvals"
              value="18"
              helper="Awaiting verification review"
              trend={calculateDelta(approvalStatSeries)}
              statusColor="amber"
            >
              <MicroBar data={approvalStatSeries} tone="#b45309" />
            </StatCard>
            <StatCard
              icon={Clock4}
              label="Last login"
              value="04:21 PM"
              helper="Most recent platform access"
              trend={calculateDelta(lastLoginSeries)}
              statusColor="indigo"
            >
              <MicroBar data={lastLoginSeries} tone="#3730a3" />
            </StatCard>
            <StatCard
              icon={ShieldCheck}
              label="Platform health"
              value="94%"
              helper="SLA coverage across services"
              trend={calculateDelta(healthSeries)}
              statusColor="emerald"
            >
              <MicroBar data={healthSeries} tone="#059669" />
            </StatCard>
          </section>

          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-shell shadow-sm">
            <SectionHeader title="Operational oversight" subtitle="Live workload, milestones, and governance notes" />
            <div className="grid gap-4 md:grid-cols-3">
              {oversightSnapshot.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-4"
                >
                  <p className="text-caption font-semibold uppercase tracking-[0.28em] text-slate-400">
                    {item.title}
                  </p>
                  <p className="mt-2 text-heading-3 text-slate-700">{item.metric}</p>
                  <p className="mt-1 text-caption text-slate-500">{item.helper}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">Programme milestones</h4>
                  <span className="text-xs uppercase tracking-[0.28em] text-slate-400">2 week view</span>
                </div>
                <div className="mt-3 divide-y divide-slate-100 text-small text-slate-500">
                  {pipelineMilestones.map((milestone) => (
                    <div key={milestone.label} className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-slate-800">{milestone.label}</p>
                        <p className="text-caption text-slate-500">Owner: {milestone.owner}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {milestone.status}
                        </span>
                        <span className="text-caption text-slate-500">ETA {milestone.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/90 p-4">
                <h4 className="text-sm font-semibold text-slate-900">Risk & assurance notes</h4>
                <div className="space-y-3 text-small text-slate-500">
                  {assuranceNotes.map((note) => (
                    <div key={note.title} className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-800">{note.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{note.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.4fr)]">
            <div className="space-y-4">
              <SectionHeader
                title="Quick actions"
                subtitle="Common control centre tasks for administrators"
                data-onboarding="quick-actions"
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {quickActions.map((action) => (
                  <QuickActionCard key={action.title} {...action} />
                ))}
              </div>
            </div>

            <SuggestedActionsPanel />
          </section>

          <ActivityFeed
            className="pt-2"
            data-onboarding="activity-feed"
            items={hasAnalytics ? analytics!.activity : undefined}
          />
        </div>
      </div>
    </>
  );
}

const SuggestedActionsPanel = memo(function SuggestedActionsPanel() {
  const suggestions = useMemo(
    () => [
      {
        title: "Review pending NGO documents",
        description: "3 submissions await compliance sign-off before they can go live.",
        icon: Files,
      },
      {
        title: "Approve CSR programme",
        description: "Green Earth solar initiative is waiting on your final verification.",
        icon: ShieldCheck,
      },
      {
        title: "Follow up with Company XYZ",
        description: "Send a reminder for quarterly reporting and impact evidence uploads.",
        icon: Target,
      },
      {
        title: "Check donor KYC gaps",
        description: "5 donors created accounts but still need PAN / address verification.",
        icon: Users2,
      },
      {
        title: "Schedule compliance sync",
        description: "Plan a review with NGO partners flagged for audit next month.",
        icon: Sparkles,
      },
    ] as const,
    [],
  );

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-caption font-semibold uppercase tracking-[0.28em] text-slate-400">Suggested actions</p>
          <h3 className="text-lg font-semibold text-slate-900">Smart recommendations</h3>
          <p className="text-caption text-slate-500">Curated nudges based on recent activity and role.</p>
        </div>
      </div>
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1" style={{ maxHeight: 260 }}>
        {suggestions.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition hover:border-emerald-200 hover:bg-emerald-50/80"
          >
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <item.icon className="h-4 w-4" />
            </span>
            <div className="flex flex-1 flex-col gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-caption text-slate-500">{item.description}</p>
              </div>
              <button
                type="button"
                className="inline-flex w-fit items-center justify-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                onClick={() => toast.info(`${item.title} (mock action)`)}
              >
                Take action
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

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
    <div className={cn("rounded-3xl border border-slate-200 bg-gradient-to-br p-4 shadow-sm", toneClasses)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
          <p className="mt-2 text-heading-3 text-slate-700">{value}</p>
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

type OverviewPoint = { label: string; active: number; submissions: number };

function OverviewChart({ data }: { data: OverviewPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={280}>
      <ComposedChart data={data} margin={{ top: 8, bottom: 0, left: -16, right: 8 }}>
        <CartesianGrid stroke="#edf2f7" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis yAxisId="left" hide domain={[0, "dataMax + 8"]} />
        <YAxis yAxisId="right" hide domain={[0, "dataMax + 6"]} />
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          cursor={{ fill: "rgba(15,23,42,0.04)" }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const [bars, linePoint] = payload;
            return (
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
                <p className="font-semibold text-slate-800">{bars?.payload?.label}</p>
                <p className="mt-1">Active users: {bars?.value}</p>
                <p className="mt-1">Submissions: {linePoint?.value}</p>
              </div>
            );
          }}
        />
        <Bar dataKey="active" yAxisId="left" fill="#cbd5f5" radius={[6, 6, 0, 0]} />
        <Line
          type="monotone"
          dataKey="submissions"
          yAxisId="right"
          stroke="#0f172a"
          strokeWidth={2.4}
          dot={false}
          activeDot={{ r: 5, fill: "#0f172a" }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

type SparklineProps = {
  data: SparkData;
  height?: number;
  area?: boolean;
  tone?: "emerald" | "indigo" | "slate" | "amber";
};

function Sparkline({ data, height = 48, area = false, tone = "slate" }: SparklineProps) {
  const width = 160;
  const padding = 8;
  const { path, areaPath } = buildPaths(data, width, height, padding);
  const toneColor = {
    emerald: "#10b981",
    indigo: "#6366f1",
    slate: "#475569",
    amber: "#f59e0b",
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

function MicroBar({ data, tone = "#0f172a" }: { data: SparkData; tone?: string }) {
  const width = 160;
  const height = 48;
  const padding = 6;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const barWidth = (width - padding * 2) / data.length - 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      {data.map((value, index) => {
        const normalized = (value - min) / range;
        const barHeight = (height - padding * 2) * normalized;
        const x = padding + index * (barWidth + 2);
        const y = height - padding - barHeight;
        return <rect key={index} x={x} y={y} width={barWidth} height={barHeight} rx={barWidth / 4} fill={`${tone}22`} stroke={`${tone}55`} />;
      })}
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

type CSRPoint = { label: string; value: number; previous: number };

function createCSRSubmissionsData(days: number): CSRPoint[] {
  let current = 28;
  let previous = current - Math.random() * 5;
  const result: CSRPoint[] = [];
  for (let day = days; day >= 1; day -= 1) {
    const change = (Math.random() - 0.4) * 6;
    previous = current;
    current = Math.max(6, current + change);
    result.unshift({ label: `Day ${day}`, value: Math.round(current), previous: Math.round(previous) });
  }
  return result;
}

function calculateCSRDelta(data: CSRPoint[]) {
  if (data.length < 2) return 0;
  const first = data[0].previous || data[0].value;
  const last = data[data.length - 1].value;
  return ((last - first) / first) * 100;
}

function createActivityData(series: SparkData): OverviewPoint[] {
  return series.map((value, index) => ({
    label: `W${index + 1}`,
    active: Math.round(value),
    submissions: Math.round(value * 0.6 + (Math.random() * 8 - 4)),
  }));
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: CSRPoint }> }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
      <p className="font-semibold text-slate-800">{point.label}</p>
      <p className="mt-1">Submissions: {point.value}</p>
    </div>
  );
}
