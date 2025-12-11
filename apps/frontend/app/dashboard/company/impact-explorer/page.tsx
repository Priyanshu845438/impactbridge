"use client";

import { Fragment, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown, MapPin, Minus, TrendingUp, X } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface RegionImpact {
  id: string;
  name: string;
  beneficiaries: number;
  avgOutcomeScore: number;
  trend: "up" | "flat" | "down";
  keyOutcome: string;
  growth: number;
  outcomeBreakdown: Array<{ label: string; value: number }>;
  recentActivities: string[];
}

const REGIONS: RegionImpact[] = [
  {
    id: "west-bengal",
    name: "West Bengal",
    beneficiaries: 8420,
    avgOutcomeScore: 82,
    trend: "up",
    growth: 12,
    keyOutcome: "STEM readiness",
    outcomeBreakdown: [
      { label: "Education", value: 45 },
      { label: "Health", value: 25 },
      { label: "Livelihood", value: 20 },
      { label: "Environment", value: 10 },
    ],
    recentActivities: [
      "Digital literacy labs launched across 5 districts",
      "108 STEM fellows deployed to rural schools",
      "Higher secondary transition rate improved by 9%",
    ],
  },
  {
    id: "karnataka",
    name: "Karnataka",
    beneficiaries: 6120,
    avgOutcomeScore: 88,
    trend: "up",
    growth: 9,
    keyOutcome: "Primary healthcare",
    outcomeBreakdown: [
      { label: "Health", value: 55 },
      { label: "Education", value: 20 },
      { label: "Livelihood", value: 15 },
      { label: "Environment", value: 10 },
    ],
    recentActivities: [
      "Mobile clinic coverage expanded to 14 new taluks",
      "Maternal health compliance improved by 6%",
      "Telemedicine pilots launched for chronic care",
    ],
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    beneficiaries: 7250,
    avgOutcomeScore: 79,
    trend: "flat",
    growth: 2,
    keyOutcome: "Water security",
    outcomeBreakdown: [
      { label: "Environment", value: 40 },
      { label: "Livelihood", value: 30 },
      { label: "Health", value: 20 },
      { label: "Education", value: 10 },
    ],
    recentActivities: [
      "Rainwater harvesting sites completed in 11 villages",
      "Community WASH trainings delivered to 2,400 households",
      "Surface water monitoring dashboard rolled out",
    ],
  },
  {
    id: "odisha",
    name: "Odisha",
    beneficiaries: 4380,
    avgOutcomeScore: 74,
    trend: "up",
    growth: 5,
    keyOutcome: "Livelihood resilience",
    outcomeBreakdown: [
      { label: "Livelihood", value: 48 },
      { label: "Environment", value: 24 },
      { label: "Education", value: 18 },
      { label: "Health", value: 10 },
    ],
    recentActivities: [
      "Self-help groups onboarded to digital payments",
      "Climate-smart agriculture pilots expanded",
      "Women artisan collective reported 18% revenue rise",
    ],
  },
];

const REGIONS_TOTAL = REGIONS.reduce((sum, region) => sum + region.beneficiaries, 0);

const FILTER_OPTIONS = {
  regions: ["All regions", "West", "South", "East", "North"],
  age: ["All ages", "Children", "Youth", "Adults", "Seniors"],
  gender: ["All genders", "Women", "Men", "Non-binary"],
  outcomes: ["All outcomes", "Education", "Health", "Livelihood", "Environment"],
};

export default function ImpactExplorerPage() {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>(FILTER_OPTIONS.regions[0]!);
  const [selectedAge, setSelectedAge] = useState<string>(FILTER_OPTIONS.age[0]!);
  const [selectedGender, setSelectedGender] = useState<string>(FILTER_OPTIONS.gender[0]!);
  const [selectedOutcome, setSelectedOutcome] = useState<string>(FILTER_OPTIONS.outcomes[0]!);
  const [openRegionId, setOpenRegionId] = useState<string | null>(null);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Beneficiary Impact Explorer" },
    ],
    [],
  );

  const filteredRegions = useMemo(() => {
    // Mock filters simply pass through for now; expand when wiring real data.
    return REGIONS;
  }, []);

  const hasData = filteredRegions.length > 0;

  const summaryStats = useMemo(
    () => ({
      totalBeneficiaries: REGIONS_TOTAL,
      avgOutcome: Math.round(REGIONS.reduce((sum, r) => sum + r.avgOutcomeScore, 0) / REGIONS.length),
      highImpactRegions: REGIONS.filter((region) => region.avgOutcomeScore >= 85).length,
      recentGrowth: Math.round(
        REGIONS.reduce((sum, region) => sum + region.growth, 0) / REGIONS.length,
      ),
    }),
    [],
  );

  const activeRegion = filteredRegions.find((region) => region.id === openRegionId) ?? null;

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200">
          Impact analytics
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Beneficiary Impact Explorer</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Understand who is being reached and how programmes create change. Use filters, the impact map, and detailed views to discover where support is strongest and where follow-up is needed.
          </p>
        </div>
      </header>

      <FiltersPanel
        region={selectedRegionFilter}
        onRegionChange={setSelectedRegionFilter}
        age={selectedAge}
        onAgeChange={setSelectedAge}
        gender={selectedGender}
        onGenderChange={setSelectedGender}
        outcome={selectedOutcome}
        onOutcomeChange={setSelectedOutcome}
        onClear={() => {
          setSelectedRegionFilter(FILTER_OPTIONS.regions[0]!);
          setSelectedAge(FILTER_OPTIONS.age[0]!);
          setSelectedGender(FILTER_OPTIONS.gender[0]!);
          setSelectedOutcome(FILTER_OPTIONS.outcomes[0]!);
        }}
      />

      <SummaryRow stats={summaryStats} />

      {hasData ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Card className="space-y-6 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Impact map</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click a region to open detailed beneficiary insights.
                </p>
              </div>
              <Button size="sm" variant="ghost" className="rounded-xl">
                Download snapshot
              </Button>
            </header>
            <MapPlaceholder regions={filteredRegions} onSelect={setOpenRegionId} activeId={openRegionId} />
          </Card>

          <Card className="flex flex-col rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Beneficiary breakdown</h2>
            <div className="mt-4 flex-1 overflow-auto">
              <BeneficiaryTable regions={filteredRegions} onSelect={setOpenRegionId} activeId={openRegionId} />
            </div>
          </Card>
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/80 p-12 text-center dark:border-slate-700 dark:bg-slate-900/40">
          <MapPin className="h-10 w-10 text-slate-400" aria-hidden />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No data for selected filters</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Adjust filters to discover beneficiary impact across the network.</p>
          </div>
        </Card>
      )}

      <DetailDrawer region={activeRegion} onClose={() => setOpenRegionId(null)} />
    </div>
  );
}

function FiltersPanel({
  region,
  onRegionChange,
  age,
  onAgeChange,
  gender,
  onGenderChange,
  outcome,
  onOutcomeChange,
  onClear,
}: {
  region: string;
  onRegionChange: (value: string) => void;
  age: string;
  onAgeChange: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  outcome: string;
  onOutcomeChange: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <FilterSelect label="Region" value={region} options={FILTER_OPTIONS.regions} onChange={onRegionChange} />
          <FilterSelect label="Age" value={age} options={FILTER_OPTIONS.age} onChange={onAgeChange} />
          <FilterSelect label="Gender" value={gender} options={FILTER_OPTIONS.gender} onChange={onGenderChange} />
          <FilterSelect label="Outcome type" value={outcome} options={FILTER_OPTIONS.outcomes} onChange={onOutcomeChange} />
        </div>
        <Button variant="outline" className="w-full rounded-2xl sm:w-auto" onClick={onClear}>
          Clear filters
        </Button>
      </div>
    </Card>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <Button
        type="button"
        variant="outline"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((state) => !state)}
        className="mt-2 flex w-full items-center justify-between gap-2 rounded-2xl border-slate-200 bg-white px-4 py-3 text-left text-sm dark:border-slate-700 dark:bg-slate-900/60"
      >
        <span>{value}</span>
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
                    option === value ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200" : "hover:bg-slate-100 dark:hover:bg-slate-800/70"
                  }`}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
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

function SummaryRow({
  stats,
}: {
  stats: {
    totalBeneficiaries: number;
    avgOutcome: number;
    highImpactRegions: number;
    recentGrowth: number;
  };
}) {
  const cards = [
    {
      label: "Total beneficiaries",
      value: stats.totalBeneficiaries.toLocaleString(),
      icon: <TrendingUp className="h-5 w-5" aria-hidden />,
      tone: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200",
    },
    {
      label: "Avg outcome score",
      value: `${stats.avgOutcome}%`,
      icon: <ArrowUpRight className="h-5 w-5" aria-hidden />,
      tone: "bg-blue-500/10 text-blue-600 dark:bg-blue-900/40 dark:text-blue-200",
    },
    {
      label: "High-impact regions",
      value: stats.highImpactRegions,
      icon: <MapPin className="h-5 w-5" aria-hidden />,
      tone: "bg-violet-500/10 text-violet-600 dark:bg-violet-900/40 dark:text-violet-200",
    },
    {
      label: "Recent growth",
      value: `${stats.recentGrowth}%`,
      icon: <TrendingUp className="h-5 w-5" aria-hidden />,
      tone: "bg-amber-500/10 text-amber-600 dark:bg-amber-900/40 dark:text-amber-200",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="rounded-4xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.tone}`}>{card.icon}</div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</p>
        </Card>
      ))}
    </div>
  );
}

function MapPlaceholder({
  regions,
  onSelect,
  activeId,
}: {
  regions: RegionImpact[];
  onSelect: (regionId: string) => void;
  activeId: string | null;
}) {
  const [hovered, setHovered] = useState<{ region: RegionImpact; x: number; y: number } | null>(null);

  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 p-4 dark:border-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
      <div className="relative h-80 rounded-2xl bg-[radial-gradient(circle_at_top,_#d1fae5,_#ffffff_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_rgba(15,23,42,0.9)_70%)]">
        <svg viewBox="0 0 400 240" className="h-full w-full">
          {regions.map((region, index) => {
            const x = 60 + index * 85;
            const y = 80 + (index % 2) * 60;
            const isActive = activeId === region.id;
            return (
              <Fragment key={region.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 24 : 20}
                  className={`cursor-pointer fill-emerald-500/20 stroke-emerald-600 transition hover:fill-emerald-500/40 dark:stroke-emerald-300 ${isActive ? "fill-emerald-500/40" : ""}`}
                  onClick={() => onSelect(region.id)}
                  onMouseEnter={() => setHovered({ region, x, y })}
                  onMouseLeave={() => setHovered(null)}
                />
                <text
                  x={x}
                  y={y + 38}
                  textAnchor="middle"
                  className="fill-slate-600 text-xs font-semibold dark:fill-slate-300"
                >
                  {region.name.split(" ")[0]}
                </text>
              </Fragment>
            );
          })}
        </svg>
        {hovered ? <MapTooltip hovered={hovered} /> : null}
        {activeId ? null : <Skeleton className="absolute bottom-4 left-4 h-10 w-36 rounded-2xl" />}
      </div>
      <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
        {regions.map((region) => (
          <button
            key={region.id}
            type="button"
            onClick={() => onSelect(region.id)}
            className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-left transition ${
              activeId === region.id
                ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-200"
                : "border-slate-200 bg-white hover:border-emerald-200 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-emerald-500"
            }`}
          >
            <span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{region.name}</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Key outcome: {region.keyOutcome}</span>
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-200">+{region.growth}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MapTooltip({ hovered }: { hovered: { region: RegionImpact; x: number; y: number } }) {
  const { region, x, y } = hovered;
  const left = Math.min(Math.max(x - 80, 0), 240);
  const top = Math.min(Math.max(y - 80, 20), 160);
  return (
    <div
      className="pointer-events-none absolute rounded-2xl border border-slate-200 bg-white/95 p-3 text-xs shadow-lg dark:border-slate-800 dark:bg-slate-900/90"
      style={{ transform: `translate(${left}px, ${top}px)` }}
    >
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{region.name}</p>
      <p className="mt-1 text-slate-600 dark:text-slate-400">Beneficiaries: {region.beneficiaries.toLocaleString()}</p>
      <p className="text-slate-600 dark:text-slate-400">Key outcome: {region.keyOutcome}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        Trend {trendIcon(region.trend)}
      </div>
    </div>
  );
}

function trendIcon(trend: RegionImpact["trend"]) {
  if (trend === "up") {
    return <ArrowUpRight className="h-4 w-4 text-emerald-500" aria-hidden />;
  }
  if (trend === "down") {
    return <ArrowDownRight className="h-4 w-4 text-rose-500" aria-hidden />;
  }
  return <Minus className="h-4 w-4 text-slate-400" aria-hidden />;
}

function BeneficiaryTable({
  regions,
  onSelect,
  activeId,
}: {
  regions: RegionImpact[];
  onSelect: (regionId: string) => void;
  activeId: string | null;
}) {
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-2 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 max-md:hidden">
        <span>Region</span>
        <span>Beneficiaries</span>
        <span>Avg outcome</span>
        <span>Trend</span>
        <span className="text-right">Actions</span>
      </div>
      {regions.map((region) => (
        <button
          key={region.id}
          type="button"
          onClick={() => onSelect(region.id)}
          className={`grid w-full items-center gap-4 px-2 py-4 text-left text-sm transition max-md:grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] ${
            activeId === region.id
              ? "bg-emerald-50/60 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-100"
              : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
          }`}
        >
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{region.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {region.keyOutcome}
            </p>
          </div>
          <div className="text-slate-700 dark:text-slate-300">{region.beneficiaries.toLocaleString()}</div>
          <div className="text-slate-700 dark:text-slate-300">{region.avgOutcomeScore}%</div>
          <div>
            <TrendBadge trend={region.trend} />
          </div>
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-200">
              View details
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function TrendBadge({ trend }: { trend: RegionImpact["trend"] }) {
  const tone =
    trend === "up"
      ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
      : trend === "flat"
        ? "bg-slate-200/60 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300"
        : "bg-rose-500/10 text-rose-600 dark:bg-rose-900/40 dark:text-rose-200";
  const label = trend === "up" ? "Positive" : trend === "flat" ? "Stable" : "Declining";

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{label}</span>;
}

function DetailDrawer({ region, onClose }: { region: RegionImpact | null; onClose: () => void }) {
  if (!region) return null;

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-slate-950/40 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col overflow-hidden rounded-l-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <header className="flex items-start justify-between border-b border-slate-200 p-6 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{region.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Key outcome focus: {region.keyOutcome}</p>
          </div>
          <Button variant="ghost" className="rounded-full p-2" onClick={onClose}>
            <X className="h-5 w-5" aria-hidden />
            <span className="sr-only">Close</span>
          </Button>
        </header>

        <div className="flex-1 space-y-6 overflow-auto p-6">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Outcome distribution</h3>
            <div className="mt-4 space-y-3">
              {region.outcomeBreakdown.map((entry) => (
                <div key={entry.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{entry.label}</span>
                    <span>{entry.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${entry.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Recent activities</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {region.recentActivities.map((activity) => (
                <li key={activity} className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/60">
                  {activity}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
