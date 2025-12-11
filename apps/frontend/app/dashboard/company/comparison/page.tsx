"use client";

import { Fragment, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Check, ChevronDown, Info, SlidersHorizontal } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MonthlyProgress {
  month: string;
  progress: number;
}

interface ProgrammeData {
  id: string;
  name: string;
  shortName: string;
  budget: number;
  utilised: number;
  milestonesCompleted: number;
  milestonesTotal: number;
  beneficiaries: number;
  complianceScore: number;
  monthlyProgress: MonthlyProgress[];
}

const PROGRAMMES: ProgrammeData[] = [
  {
    id: "prog-udaan",
    name: "Project Udaan STEM Labs",
    shortName: "Udaan",
    budget: 1.6,
    utilised: 1.3,
    milestonesCompleted: 14,
    milestonesTotal: 16,
    beneficiaries: 1240,
    complianceScore: 92,
    monthlyProgress: [
      { month: "Jan", progress: 48 },
      { month: "Feb", progress: 54 },
      { month: "Mar", progress: 61 },
      { month: "Apr", progress: 70 },
      { month: "May", progress: 78 },
      { month: "Jun", progress: 86 },
      { month: "Jul", progress: 92 },
    ],
  },
  {
    id: "prog-heal",
    name: "HealTrust Mobile Clinics",
    shortName: "Heal",
    budget: 2.1,
    utilised: 1.5,
    milestonesCompleted: 11,
    milestonesTotal: 15,
    beneficiaries: 980,
    complianceScore: 88,
    monthlyProgress: [
      { month: "Jan", progress: 35 },
      { month: "Feb", progress: 42 },
      { month: "Mar", progress: 51 },
      { month: "Apr", progress: 58 },
      { month: "May", progress: 65 },
      { month: "Jun", progress: 71 },
      { month: "Jul", progress: 79 },
    ],
  },
  {
    id: "prog-green",
    name: "GreenRoots Climate Fellowship",
    shortName: "Green",
    budget: 1.1,
    utilised: 0.82,
    milestonesCompleted: 10,
    milestonesTotal: 14,
    beneficiaries: 760,
    complianceScore: 94,
    monthlyProgress: [
      { month: "Jan", progress: 40 },
      { month: "Feb", progress: 47 },
      { month: "Mar", progress: 55 },
      { month: "Apr", progress: 63 },
      { month: "May", progress: 72 },
      { month: "Jun", progress: 81 },
      { month: "Jul", progress: 90 },
    ],
  },
  {
    id: "prog-aqua",
    name: "AquaPure Rural Water",
    shortName: "Aqua",
    budget: 1.8,
    utilised: 1.45,
    milestonesCompleted: 12,
    milestonesTotal: 18,
    beneficiaries: 1325,
    complianceScore: 85,
    monthlyProgress: [
      { month: "Jan", progress: 28 },
      { month: "Feb", progress: 37 },
      { month: "Mar", progress: 44 },
      { month: "Apr", progress: 52 },
      { month: "May", progress: 63 },
      { month: "Jun", progress: 71 },
      { month: "Jul", progress: 76 },
    ],
  },
];

const KPI_LABELS = [
  { key: "budget", label: "Budget Utilised", suffix: "%" },
  { key: "milestones", label: "Milestones Completed", suffix: "%" },
  { key: "beneficiaries", label: "Beneficiaries Impacted", suffix: "" },
  { key: "compliance", label: "Compliance Score", suffix: "%" },
] as const;

export default function ProgrammeComparisonPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["prog-udaan", "prog-heal"]);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Programme Comparison" },
    ],
    [],
  );

  const selectedProgrammes = useMemo(
    () => PROGRAMMES.filter((programme) => selected.includes(programme.id)),
    [selected],
  );

  const hasComparison = selectedProgrammes.length >= 2;

  const chartColors = ["#0f9c69", "#0b7dd1", "#f97316", "#8b5cf6"];

  const budgetData = useMemo(
    () =>
      selectedProgrammes.map((programme) => ({
        name: programme.shortName,
        budget: programme.budget,
        utilised: programme.utilised,
      })),
    [selectedProgrammes],
  );

  const lineData = useMemo(() => {
    if (!selectedProgrammes.length) return [];
    const months = selectedProgrammes[0].monthlyProgress.map((item) => item.month);
    return months.map((month, index) => {
      const entry: Record<string, string | number> = { month };
      selectedProgrammes.forEach((programme) => {
        entry[programme.shortName] = programme.monthlyProgress[index]?.progress ?? 0;
      });
      return entry;
    });
  }, [selectedProgrammes]);

  const complianceData = useMemo(
    () =>
      selectedProgrammes.map((programme) => ({
        programme: programme.shortName,
        score: programme.complianceScore,
      })),
    [selectedProgrammes],
  );

  const insights = useMemo(() => {
    if (!hasComparison) return [];
    const milestoneLeader = [...selectedProgrammes].sort(
      (a, b) => b.milestonesCompleted / b.milestonesTotal - a.milestonesCompleted / a.milestonesTotal,
    )[0];
    const bestCompliance = [...selectedProgrammes].sort((a, b) => b.complianceScore - a.complianceScore)[0];
    const budgetEfficiency = [...selectedProgrammes].sort(
      (a, b) => b.utilised / b.budget - a.utilised / a.budget,
    )[0];
    const beneficiaryLeader = [...selectedProgrammes].sort((a, b) => b.beneficiaries - a.beneficiaries)[0];
    return [
      `${milestoneLeader.shortName} shows stronger milestone velocity than its peers at ${Math.round(
        (milestoneLeader.milestonesCompleted / milestoneLeader.milestonesTotal) * 100,
      )}% completion.`,
      `${bestCompliance.shortName} leads compliance scores at ${bestCompliance.complianceScore}%, indicating audit readiness.`,
      `${budgetEfficiency.shortName} utilises ${Math.round(
        (budgetEfficiency.utilised / budgetEfficiency.budget) * 100,
      )}% of allocated budget, the highest conversion among selected programmes.`,
      `${beneficiaryLeader.shortName} has impacted ${beneficiaryLeader.beneficiaries.toLocaleString()} beneficiaries so far.`,
    ];
  }, [hasComparison, selectedProgrammes]);

  const toggleProgramme = (programmeId: string) => {
    setSelected((current) => {
      const isSelected = current.includes(programmeId);
      if (isSelected) {
        return current.filter((id) => id !== programmeId);
      }
      if (current.length >= 4) {
        return current;
      }
      return [...current, programmeId];
    });
  };

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200">
          Comparative view
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Programme Comparison</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Evaluate performance across selected CSR initiatives and spot opportunities to rebalance effort or funding.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <MultiSelect
          label="Select programmes"
          open={open}
          onToggle={() => setOpen((state) => !state)}
          onClose={() => setOpen(false)}
          programmes={PROGRAMMES}
          selectedIds={selected}
          onSelect={toggleProgramme}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Select 2&ndash;4 programmes to unlock side-by-side comparison. All data shown is mock sample for UI validation.
        </p>
      </div>

      {!hasComparison ? (
        <Card className="flex flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/80 p-12 text-center dark:border-slate-700 dark:bg-slate-900/40">
          <SlidersHorizontal className="h-10 w-10 text-slate-400" aria-hidden />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Select programmes to begin comparison</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose at least two programmes from the selector above to see metrics, charts, and insights.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          <ComparisonGrid programmes={selectedProgrammes} />

          <section className="grid gap-6 xl:grid-cols-3">
            <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Budget vs utilisation</h2>
              </div>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value.toFixed(1)}₹cr`} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)} ₹cr`} />
                    <Legend />
                    <Bar dataKey="budget" name="Budget" fill="#0b7dd1" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="utilised" name="Utilised" fill="#0f9c69" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <header className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Monthly progress</h2>
              </header>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                    {selectedProgrammes.map((programme, index) => (
                      <Line
                        key={programme.id}
                        type="monotone"
                        dataKey={programme.shortName}
                        stroke={chartColors[index % chartColors.length]}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <header className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Compliance snapshot</h2>
              </header>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={complianceData} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="programme" stroke="#94a3b8" />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </section>

          <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <header className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-200">
                <Info className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Insights</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">Auto-generated highlights from the selected comparison set.</p>
              </div>
            </header>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  {insight}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}

function MultiSelect({
  label,
  open,
  onToggle,
  onClose,
  programmes,
  selectedIds,
  onSelect,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  programmes: ProgrammeData[];
  selectedIds: string[];
  onSelect: (programmeId: string) => void;
}) {
  return (
    <div className="relative w-full max-w-md">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <Button
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
        variant="outline"
        className="mt-2 flex w-full items-center justify-between gap-3 rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/60"
      >
        <span>
          {selectedIds.length > 0
            ? `${selectedIds.length} programme${selectedIds.length > 1 ? "s" : ""} selected`
            : "Choose up to four programmes"}
        </span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : "rotate-0"}`} aria-hidden />
      </Button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <p className="px-1 text-xs text-slate-500 dark:text-slate-400">Up to four programmes can be compared at once.</p>
          <ul role="listbox" aria-multiselectable className="mt-2 space-y-1">
            {programmes.map((programme) => {
              const isSelected = selectedIds.includes(programme.id);
              return (
                <li key={programme.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(programme.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800/70"
                    }`}
                  >
                    <span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{programme.name}</span>
                      <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">({programme.shortName})</span>
                    </span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-emerald-400 bg-emerald-500 text-white"
                          : "border-slate-300 text-transparent dark:border-slate-600"
                      }`}
                      aria-hidden
                    >
                      <Check className="h-3 w-3" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex justify-end">
            <Button size="sm" variant="ghost" className="rounded-xl" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ComparisonGrid({ programmes }: { programmes: ProgrammeData[] }) {
  const budgetPercent = (programme: ProgrammeData) => Math.round((programme.utilised / programme.budget) * 100);
  const milestonePercent = (programme: ProgrammeData) =>
    Math.round((programme.milestonesCompleted / programme.milestonesTotal) * 100);

  return (
    <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div
        className="grid min-w-full gap-px bg-slate-100 dark:bg-slate-800"
        style={{
          gridTemplateColumns: `minmax(200px, 0.8fr) repeat(${programmes.length}, minmax(0, 1fr))`,
        }}
      >
        <div className="bg-white p-5 text-sm font-semibold text-slate-500 dark:bg-slate-900/80 dark:text-slate-400">
          Metric
        </div>
        {programmes.map((programme) => (
          <div key={programme.id} className="bg-white p-5 dark:bg-slate-900/80">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{programme.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{programme.shortName}</p>
            </div>
          </div>
        ))}

        {KPI_LABELS.map((kpi) => (
          <Fragment key={kpi.key}>
            <div className="bg-white p-5 text-sm font-semibold text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
              {kpi.label}
            </div>
            {programmes.map((programme) => (
              <div key={`${programme.id}-${kpi.key}`} className="bg-white p-5 text-sm text-slate-900 dark:bg-slate-900/80 dark:text-slate-100">
                {renderKpiValue(programme, kpi.key)}{kpi.suffix}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  );

  function renderKpiValue(programme: ProgrammeData, key: typeof KPI_LABELS[number]["key"]) {
    switch (key) {
      case "budget":
        return `${budgetPercent(programme)}`;
      case "milestones":
        return `${milestonePercent(programme)}`;
      case "beneficiaries":
        return programme.beneficiaries.toLocaleString();
      case "compliance":
        return `${programme.complianceScore}`;
      default:
        return "-";
    }
  }
}
