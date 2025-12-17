"use client";

import { useMemo, useState } from "react";
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
import { ArrowLeftRight, ChevronDown } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProgrammeComparison {
  id: string;
  name: string;
  beneficiaries: number;
  costPerBeneficiary: number;
  outcomeScore: number;
  completion: number;
  outcomeBreakdown: Array<{ category: string; programme: string; value: number }>;
  monthlyProgress: Array<{ month: string; value: number }>;
  efficiency: number;
  strengths: string[];
  risks: string[];
}

const PROGRAMMES: ProgrammeComparison[] = [
  {
    id: "udaan",
    name: "Project Udaan STEM Labs",
    beneficiaries: 1240,
    costPerBeneficiary: 1280,
    outcomeScore: 84,
    completion: 92,
    efficiency: 78,
    outcomeBreakdown: [
      { category: "Education", programme: "Udaan", value: 45 },
      { category: "Health", programme: "Udaan", value: 20 },
      { category: "Livelihood", programme: "Udaan", value: 25 },
      { category: "Environment", programme: "Udaan", value: 10 },
    ],
    monthlyProgress: [
      { month: "Jan", value: 48 },
      { month: "Feb", value: 55 },
      { month: "Mar", value: 63 },
      { month: "Apr", value: 71 },
      { month: "May", value: 80 },
      { month: "Jun", value: 88 },
      { month: "Jul", value: 92 },
    ],
    strengths: [
      "High STEM adoption among secondary schools",
      "Robust partner network for lab maintenance",
      "Outcome assessments show steady improvement",
    ],
    risks: [
      "Requires continuous hardware refresh",
      "Beneficiary engagement dips during exam season",
    ],
  },
  {
    id: "heal",
    name: "HealTrust Mobile Clinics",
    beneficiaries: 980,
    costPerBeneficiary: 1540,
    outcomeScore: 90,
    completion: 86,
    efficiency: 82,
    outcomeBreakdown: [
      { category: "Education", programme: "Heal", value: 10 },
      { category: "Health", programme: "Heal", value: 60 },
      { category: "Livelihood", programme: "Heal", value: 20 },
      { category: "Environment", programme: "Heal", value: 10 },
    ],
    monthlyProgress: [
      { month: "Jan", value: 42 },
      { month: "Feb", value: 50 },
      { month: "Mar", value: 58 },
      { month: "Apr", value: 63 },
      { month: "May", value: 70 },
      { month: "Jun", value: 76 },
      { month: "Jul", value: 84 },
    ],
    strengths: [
      "Strong clinical protocol adherence",
      "Community health workers drive consistent follow-ups",
      "Telemedicine pilots lowering revisit times",
    ],
    risks: [
      "Higher operating cost due to fuel spend",
      "Weather disruption risk in remote villages",
    ],
  },
  {
    id: "green",
    name: "GreenRoots Climate Fellowship",
    beneficiaries: 760,
    costPerBeneficiary: 1120,
    outcomeScore: 82,
    completion: 88,
    efficiency: 85,
    outcomeBreakdown: [
      { category: "Education", programme: "Green", value: 20 },
      { category: "Health", programme: "Green", value: 15 },
      { category: "Livelihood", programme: "Green", value: 35 },
      { category: "Environment", programme: "Green", value: 30 },
    ],
    monthlyProgress: [
      { month: "Jan", value: 44 },
      { month: "Feb", value: 52 },
      { month: "Mar", value: 60 },
      { month: "Apr", value: 68 },
      { month: "May", value: 76 },
      { month: "Jun", value: 83 },
      { month: "Jul", value: 90 },
    ],
    strengths: [
      "Fellowship model ensures deep community presence",
      "Livelihood pilots report strong adoption",
      "Climate curriculum aligned with SDG goals",
    ],
    risks: [
      "Needs additional CSR mentors for scale",
      "Outcome reporting varies by cohort leader",
    ],
  },
];

const PROGRAMME_OPTIONS = PROGRAMMES.map((programme) => programme.name);

export default function ImpactComparePage() {
  const [programmeA, setProgrammeA] = useState(PROGRAMME_OPTIONS[0]!);
  const [programmeB, setProgrammeB] = useState(PROGRAMME_OPTIONS[1]!);
  const [openDropdown, setOpenDropdown] = useState<"A" | "B" | null>(null);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Impact Comparison" },
    ],
    [],
  );

  const selectedA = PROGRAMMES.find((programme) => programme.name === programmeA) ?? PROGRAMMES[0]!;
  const selectedB = PROGRAMMES.find((programme) => programme.name === programmeB) ?? PROGRAMMES[1]!;

  const barData = useMemo(() => {
    const categories = ["Education", "Health", "Livelihood", "Environment"];
    return categories.map((category) => {
      const aValue = selectedA.outcomeBreakdown.find((item) => item.category === category)?.value ?? 0;
      const bValue = selectedB.outcomeBreakdown.find((item) => item.category === category)?.value ?? 0;
      return {
        category,
        [selectedA.name]: aValue,
        [selectedB.name]: bValue,
      };
    });
  }, [selectedA, selectedB]);

  const lineData = useMemo(() => {
    return selectedA.monthlyProgress.map((entry, index) => ({
      month: entry.month,
      [selectedA.name]: entry.value,
      [selectedB.name]: selectedB.monthlyProgress[index]?.value ?? 0,
    }));
  }, [selectedA, selectedB]);

  const radarData = useMemo(
    () => [
      { attribute: "Efficiency", [selectedA.name]: selectedA.efficiency, [selectedB.name]: selectedB.efficiency },
      { attribute: "Outcome Score", [selectedA.name]: selectedA.outcomeScore, [selectedB.name]: selectedB.outcomeScore },
      { attribute: "Completion", [selectedA.name]: selectedA.completion, [selectedB.name]: selectedB.completion },
    ],
    [selectedA, selectedB],
  );

  const insights = useMemo(
    () => [
      `${selectedA.name} delivers ${(selectedA.outcomeScore - selectedB.outcomeScore).toFixed(1)} point higher outcome score than ${selectedB.name}.`,
      `${selectedA.name} reaches ${(selectedA.beneficiaries - selectedB.beneficiaries).toLocaleString()} more beneficiaries compared to ${selectedB.name}.`,
      `${selectedA.name} reports ${Math.abs(selectedA.costPerBeneficiary - selectedB.costPerBeneficiary)} ₹ difference in cost per beneficiary.`,
    ],
    [selectedA, selectedB],
  );

  const handleSwap = () => {
    setProgrammeA(programmeB);
    setProgrammeB(programmeA);
  };

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200">
          Comparative insight
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Impact Comparison</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Compare programme outcomes and efficiency side-by-side to guide CSR committee reviews.
          </p>
        </div>
      </header>

      <section className="flex flex-wrap items-center gap-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <ProgrammeSelect
          label="Programme A"
          value={programmeA}
          open={openDropdown === "A"}
          options={PROGRAMME_OPTIONS}
          onToggle={() => setOpenDropdown((prev) => (prev === "A" ? null : "A"))}
          onSelect={(value) => {
            setProgrammeA(value);
            setOpenDropdown(null);
          }}
          disabledValue={programmeB}
        />
        <Button variant="outline" className="rounded-2xl px-4 py-2" onClick={handleSwap}>
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Swap
        </Button>
        <ProgrammeSelect
          label="Programme B"
          value={programmeB}
          open={openDropdown === "B"}
          options={PROGRAMME_OPTIONS}
          onToggle={() => setOpenDropdown((prev) => (prev === "B" ? null : "B"))}
          onSelect={(value) => {
            setProgrammeB(value);
            setOpenDropdown(null);
          }}
          disabledValue={programmeA}
        />
      </section>

      <StatsGrid programmeA={selectedA} programmeB={selectedB} />

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
       <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
         <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Outcome categories</h2>
          <div className="mt-4 h-72" data-testid="impact-compare-bar">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
                <Bar dataKey={selectedA.name} fill="#0f9c69" radius={[4, 4, 0, 0]} />
                <Bar dataKey={selectedB.name} fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

       <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
         <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Progress over time</h2>
          <div className="mt-4 h-72" data-testid="impact-compare-line">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey={selectedA.name} stroke="#0f9c69" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey={selectedB.name} stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

       <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
         <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Efficiency profile</h2>
          <div className="mt-4 h-72" data-testid="impact-compare-radar">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="attribute" stroke="#94a3b8" />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Radar dataKey={selectedA.name} stroke="#0f9c69" fill="#0f9c69" fillOpacity={0.3} />
                <Radar dataKey={selectedB.name} stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Insights</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                {insight}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="grid gap-6 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Where {selectedA.name} leads</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {selectedA.strengths.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-900/60">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Where {selectedB.name} leads</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {selectedB.strengths.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-900/60">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Risks to monitor for {selectedA.name}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {selectedA.risks.map((risk) => (
              <li key={risk} className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-900/50 dark:bg-amber-900/20">
                {risk}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Risks to monitor for {selectedB.name}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {selectedB.risks.map((risk) => (
              <li key={risk} className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-900/50 dark:bg-amber-900/20">
                {risk}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

function ProgrammeSelect({
  label,
  value,
  open,
  options,
  onToggle,
  onSelect,
  disabledValue,
}: {
  label: string;
  value: string;
  open: boolean;
  options: string[];
  onToggle: () => void;
  onSelect: (value: string) => void;
  disabledValue?: string;
}) {
  return (
    <div className="relative flex-1 min-w-[220px]">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{label}</span>
      <Button
        type="button"
        variant="outline"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
        className="mt-2 flex w-full items-center justify-between gap-2 rounded-2xl border-slate-200 bg-white px-4 py-3 text-left text-sm dark:border-slate-700 dark:bg-slate-900/60"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : "rotate-0"}`} aria-hidden />
      </Button>
      {open ? (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <ul role="listbox" className="space-y-1 text-sm">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={`w-full rounded-xl px-3 py-2 text-left transition ${
                    option === value ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200" : option === disabledValue ? "cursor-not-allowed text-slate-300 dark:text-slate-600" : "hover:bg-slate-100 dark:hover:bg-slate-800/70"
                  }`}
                  disabled={option === disabledValue}
                  onClick={() => onSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function StatsGrid({ programmeA, programmeB }: { programmeA: ProgrammeComparison; programmeB: ProgrammeComparison }) {
  const statsA = [
    { label: "Total beneficiaries", value: programmeA.beneficiaries.toLocaleString() },
    { label: "Cost per beneficiary", value: `₹${programmeA.costPerBeneficiary.toLocaleString()}` },
    { label: "Outcome score", value: `${programmeA.outcomeScore}%` },
    { label: "Completion", value: `${programmeA.completion}%` },
  ];
  const statsB = [
    { label: "Total beneficiaries", value: programmeB.beneficiaries.toLocaleString() },
    { label: "Cost per beneficiary", value: `₹${programmeB.costPerBeneficiary.toLocaleString()}` },
    { label: "Outcome score", value: `${programmeB.outcomeScore}%` },
    { label: "Completion", value: `${programmeB.completion}%` },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{programmeA.name}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {statsA.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{stat.label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{programmeB.name}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {statsB.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{stat.label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
