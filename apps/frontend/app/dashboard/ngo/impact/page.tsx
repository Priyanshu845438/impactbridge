"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart2,
  BookOpen,
  Download,
  FileDown,
  LineChart,
  PieChart as PieIcon,
  Printer,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface KpiCard {
  label: string;
  value: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "sky" | "violet" | "amber";
}

interface ImpactStory {
  id: string;
  title: string;
  excerpt: string;
  image: string;
}

const kpiCards: KpiCard[] = [
  {
    label: "Total beneficiaries",
    value: "48,200",
    helper: "Across all active programmes",
    icon: LineChart,
    tone: "emerald",
  },
  {
    label: "Active projects",
    value: "18",
    helper: "Last updated 2 hours ago",
    icon: BarChart2,
    tone: "sky",
  },
  {
    label: "Funds utilised",
    value: "₹9.4Cr",
    helper: "84% of annual goal",
    icon: PieIcon,
    tone: "violet",
  },
  {
    label: "Volunteer hours",
    value: "12,680",
    helper: "Year to date",
    icon: BookOpen,
    tone: "amber",
  },
];

const monthlyBeneficiaries = [
  { month: "May", beneficiaries: 6200 },
  { month: "Jun", beneficiaries: 6800 },
  { month: "Jul", beneficiaries: 7200 },
  { month: "Aug", beneficiaries: 7500 },
  { month: "Sep", beneficiaries: 7900 },
  { month: "Oct", beneficiaries: 9100 },
];

const categoryDistribution = [
  { name: "Education", value: 36, color: "#22c55e" },
  { name: "Health", value: 28, color: "#0ea5e9" },
  { name: "Environment", value: 18, color: "#f59e0b" },
  { name: "Rural development", value: 18, color: "#6366f1" },
];

const campaignImpact = [
  { name: "Project Udaan", impact: 8200 },
  { name: "Swasthya", impact: 6700 },
  { name: "GreenRun", impact: 5400 },
  { name: "Jeevan", impact: 4800 },
];

const stories: ImpactStory[] = [
  {
    id: "story-1",
    title: "STEM Labs transformed rural classrooms",
    excerpt: "200 students across three districts now access hands-on experiments every week thanks to our portable STEM labs...",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "story-2",
    title: "Mobile health camps improved maternal care",
    excerpt: "Our mobile clinics reached 8,500 women with prenatal checkups and counselling, reducing complications by 32%...",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "story-3",
    title: "Watershed revival secured livelihoods",
    excerpt: "Restored check-dams increased water tables across five villages, ensuring irrigation for 600+ farmers even in summer...",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=60",
  },
];

export default function NGOImpactReportsPage() {
  const [isLoadingCharts] = useState(false);
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "Impact & Reports" },
    ],
    [],
  );

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />
      <SectionHeader
        title="Impact & Reports"
        subtitle="Track the outcomes and reach of your initiatives."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <FileDown className="h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Printer className="h-4 w-4" />
              Print summary
            </Button>
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <KpiCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <Card className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:col-span-3">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Monthly beneficiaries</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">May – Oct 2025</p>
            </div>
          </header>
          <div className="mt-6 h-72">
            {isLoadingCharts ? (
              <Skeleton className="h-full w-full rounded-3xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={monthlyBeneficiaries}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                  <XAxis dataKey="month" stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" tickFormatter={(value) => `${Math.round(value / 1000)}k`} axisLine={false} tickLine={false} />
                  <RechartsTooltip formatter={(value) => `${value.toLocaleString()} beneficiaries`} cursor={{ stroke: "#0ea5e9", strokeWidth: 1 }} />
                  <Line type="monotone" dataKey="beneficiaries" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </ReLineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:col-span-2">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Impact by category</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Contribution share</p>
            </div>
          </header>
          <div className="mt-6 flex flex-col items-center gap-6 md:flex-row">
            {isLoadingCharts ? (
              <Skeleton className="h-60 w-full rounded-3xl" />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={categoryDistribution} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={4}>
                    {categoryDistribution.map((slice) => (
                      <Cell key={slice.name} fill={slice.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {categoryDistribution.map((slice) => (
                <li key={slice.name} className="flex items-center justify-between gap-6">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                    {slice.name}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{slice.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      <section className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Campaign-wise impact</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Beneficiaries reached per campaign</p>
          </div>
        </header>
        <div className="mt-6 h-80">
          {isLoadingCharts ? (
            <Skeleton className="h-full w-full rounded-3xl" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignImpact}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${Math.round(value / 1000)}k`} axisLine={false} tickLine={false} />
                <RechartsTooltip formatter={(value) => `${value.toLocaleString()} beneficiaries`} cursor={{ fill: "rgba(99, 102, 241, 0.08)" }} />
                <Bar dataKey="impact" radius={[12, 12, 4, 4]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Impact stories</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Highlights curated from partner reports and field teams.</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowUpRight className="h-4 w-4" />
            View library
          </Button>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.id} className="group flex h-full flex-col overflow-hidden rounded-4xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200">
                <img src={story.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{story.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{story.excerpt}</p>
                <div className="mt-auto">
                  <Button variant="ghost" size="sm" className="gap-2" onClick={() => setSelectedStory(story)}>
                    Read more
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Modal
        open={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        title={selectedStory?.title ?? "Impact story"}
        description="Detailed narrative from field teams."
        size="lg"
      >
        {selectedStory ? (
          <article className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <img src={selectedStory.image} alt="" className="h-48 w-full rounded-3xl object-cover" />
            <p>
              {selectedStory.excerpt} This is a placeholder for full story content describing the outcomes, beneficiary quotes,
              and next steps. Integrate with CMS once available.
            </p>
            <p>
              Impact data includes beneficiary counts, funding utilisation, and volunteer stories cross-checked with on-ground
              partners. Replace with dynamic copy when API integration lands.
            </p>
          </article>
        ) : (
          <Skeleton className="h-48 w-full rounded-3xl" />
        )}
      </Modal>
    </div>
  );
}

function KpiCard({ label, value, helper, icon: Icon, tone }: KpiCard) {
  const toneClasses: Record<KpiCard["tone"], string> = {
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    sky: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-200",
  };

  return (
    <Card className="flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl", toneClasses[tone])} aria-hidden>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">{value}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
      </div>
    </Card>
  );
}
