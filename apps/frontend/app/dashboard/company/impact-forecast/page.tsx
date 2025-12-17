"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sparkles, TrendingUp, CalendarRange, Gauge, Plus, Minus } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BASE_BUDGET = 2.4; // crores INR, mock baseline
const MIN_MULTIPLIER = 0.6;
const MAX_MULTIPLIER = 1.8;

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ImpactForecastPage() {
  const [multiplier, setMultiplier] = useState(1);

  const budgetInCrores = useMemo(() => Number((BASE_BUDGET * multiplier).toFixed(2)), [multiplier]);

  const forecast = useMemo(() => buildForecast(multiplier), [multiplier]);
  const summary = useMemo(() => getSummary(multiplier), [multiplier]);
  const scenarios = useMemo(() => scenarioData(multiplier), [multiplier]);
  const insights = useMemo(() => deriveInsights(multiplier), [multiplier]);

  const handleMultiplierChange = (value: number) => {
    const clamped = Math.min(MAX_MULTIPLIER, Math.max(MIN_MULTIPLIER, value));
    setMultiplier(Number(clamped.toFixed(2)));
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Company", href: "/dashboard/company" },
          { label: "Impact Forecasting" },
        ]}
      />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/50 dark:text-sky-200">
          Forward-looking
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Impact Forecasting</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Project future outcomes based on budget adjustments and see how investments influence beneficiary reach, programme efficiency, and delivery timelines.
          </p>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
        <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Budget Controls</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Adjust the CSR allocation to simulate forward-looking impact projections.</p>
            </div>
            <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              Current mock budget · ₹{budgetInCrores.toLocaleString()} Cr
            </Badge>
          </header>

          <div className="mt-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {[0.9, 1, 1.1, 1.25, 1.5].map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant={Math.abs(multiplier - preset) < 0.01 ? "default" : "outline"}
                  className="rounded-2xl px-4 py-2 text-sm"
                  onClick={() => handleMultiplierChange(preset)}
                >
                  {preset > 1 ? "+" : ""}
                  {Math.round((preset - 1) * 100)}%
                </Button>
              ))}
              <Button type="button" variant="outline" className="rounded-2xl px-4 py-2 text-sm" onClick={() => handleMultiplierChange(1.1)}>
                Quick Boost +10%
              </Button>
              <Button type="button" variant="outline" className="rounded-2xl px-4 py-2 text-sm" onClick={() => handleMultiplierChange(0.9)}>
                Trim –10%
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => handleMultiplierChange(multiplier - 0.05)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="range"
                  min={MIN_MULTIPLIER}
                  max={MAX_MULTIPLIER}
                  step={0.01}
                  value={multiplier}
                  onChange={(event) => handleMultiplierChange(Number(event.target.value))}
                  className="flex-1 accent-emerald-500"
                />
                <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => handleMultiplierChange(multiplier + 0.05)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={(multiplier * 100).toFixed(0)}
                  onChange={(event) => handleMultiplierChange(Number(event.target.value) / 100 || 1)}
                  className="w-20 rounded-2xl text-center"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-label="Budget multiplier percentage"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400">% of base budget</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-4xl border border-slate-200 bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-violet-500/10 p-6 shadow-sm dark:border-slate-800 dark:from-emerald-500/10 dark:via-sky-500/10 dark:to-indigo-500/10">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Projected headline</h3>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">₹{budgetInCrores.toLocaleString()} Cr annual allocation</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Forecast recalculated live with each tweak, combining historical trend multipliers and confidence bands to keep expectations realistic.
          </p>
          <div className="mt-4 space-y-3">
            {insights.primary.map((insight) => (
              <div key={insight.id} className="flex items-start gap-3 rounded-3xl border border-white/60 bg-white/80 p-3 text-sm leading-relaxed text-slate-700 shadow-sm backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200">
                <Sparkles className="mt-0.5 h-4 w-4 text-emerald-500" />
                {insight.text}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((card) => (
          <Card key={card.id} className="space-y-3 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-3">
              <card.icon className={cn("h-5 w-5", card.iconTone)} />
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{card.label}</span>
            </div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{card.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.helper}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
       <Card className="h-full rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
         <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
           <div>
             <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Beneficiary forecast</h2>
             <p className="text-sm text-slate-500 dark:text-slate-400">Projected reach across the next 12 months based on the current budget setting.</p>
           </div>
           <Badge className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
             Auto-updates with slider
           </Badge>
         </header>

          <div className="mt-6 h-[320px] w-full" data-testid="impact-forecast-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecast} margin={{ left: 8, right: 8, top: 16, bottom: 0 }}>
                <defs>
                  <linearGradient id="beneficiariesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="month" className="text-xs text-slate-400" axisLine={false} tickLine={false} />
                <YAxis className="text-xs text-slate-400" axisLine={false} tickLine={false} width={48} />
                <Tooltip
                  cursor={{ stroke: "#10B981", strokeWidth: 1, strokeDasharray: "3 3" }}
                  contentStyle={{ background: "rgba(15, 23, 42, 0.8)", borderRadius: 16, border: "none", padding: 12 }}
                  labelFormatter={(label) => `Month: ${label}`}
                  formatter={(value: number) => [`${value.toLocaleString()} beneficiaries`, "Projected reach"]}
                />
                <Area type="monotone" dataKey="beneficiaries" stroke="#10B981" strokeWidth={2.2} fill="url(#beneficiariesGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Scenario comparison</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Modelled cases blend historical variance and mock confidence intervals.</p>
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{scenario.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Budget variance {scenario.variance}</p>
                  </div>
                  <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", scenario.badgeTone)}>{scenario.pill}</Badge>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {scenario.metrics.map((metric) => (
                    <li key={metric.label} className="flex items-center justify-between">
                      <span>{metric.label}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{metric.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">What the model suggests</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {insights.secondary.map((item) => (
              <li data-testid={item.id === "timeline" ? "insight-timeline" : undefined} key={item.id} className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <TrendingUp className="mt-0.5 h-4 w-4 text-emerald-500" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Forecast methodology</h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>Estimates blend three factors: historical beneficiary growth, programme efficiency ratios, and delivery velocity trends.</p>
            <p>
              Multipliers scale each factor differently—e.g., additional budget raises reach but gradually decays on efficiency after +40% to reflect
              diminishing returns.
            </p>
            <p className="rounded-3xl border border-slate-200 bg-slate-50/80 p-3 leading-relaxed dark:border-slate-800 dark:bg-slate-900/60">
              This simulator intentionally stays client-side for exploration. Plug it into the analytics service once real forecasting APIs ship.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}

function buildForecast(multiplier: number) {
  const base = 9000;
  return monthLabels.map((month, index) => {
    const seasonal = 1 + Math.sin((index / 12) * Math.PI) * 0.08;
    const scaling = Math.pow(multiplier, 0.92);
    const beneficiaries = Math.round(base * (1 + index * 0.06) * seasonal * scaling);
    return { month, beneficiaries };
  });
}

function formatPercentage(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function getSummary(multiplier: number) {
  const reach = Math.round(18500 * Math.pow(multiplier, 1.05)).toLocaleString();
  const outcome = (multiplier - 1) * 28;
  const timeline = (1 - (multiplier - 1) * 0.35) * 14;

  return [
    {
      id: "projected-beneficiaries",
      label: "Projected beneficiaries",
      value: `${reach}`,
      helper: "Across programmes in the coming 12 months",
      icon: Gauge,
      iconTone: "text-emerald-500",
    },
    {
      id: "cost-efficiency",
      label: "Cost efficiency",
      value: formatPercentage((1 - multiplier) * 18),
      helper: "Improvement vs baseline cost per beneficiary",
      icon: Sparkles,
      iconTone: "text-sky-500",
    },
    {
      id: "outcome-improvement",
      label: "Outcome improvement",
      value: formatPercentage(outcome),
      helper: "Modelled uplift in impact score",
      icon: TrendingUp,
      iconTone: "text-violet-500",
    },
    {
      id: "timeline-shift",
      label: "Timeline shift",
      value: `${timeline >= 0 ? "-" : "+"}${Math.abs(timeline).toFixed(1)} weeks`,
      helper: timeline >= 0 ? "Earlier completion vs baseline" : "Delay expected vs baseline",
      icon: CalendarRange,
      iconTone: "text-amber-500",
    },
  ];
}

function scenarioData(multiplier: number) {
  const cases = [
    {
      id: "best",
      title: "Best case",
      pill: "Optimistic",
      badgeTone: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200",
      variance: "+18% reach",
      metrics: [
        { label: "Beneficiaries", value: formatNumber(Math.round(20000 * Math.pow(multiplier, 1.1))) },
        { label: "Cost/beneficiary", value: formatCurrency(Math.round(6400 / multiplier)) },
        { label: "Outcome score", value: formatScore(92 + (multiplier - 1) * 12) },
        { label: "Timeline", value: "-4 weeks" },
      ],
    },
    {
      id: "expected",
      title: "Expected",
      pill: "Most likely",
      badgeTone: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/10 dark:text-sky-200",
      variance: "+10% reach",
      metrics: [
        { label: "Beneficiaries", value: formatNumber(Math.round(18200 * Math.pow(multiplier, 1.05))) },
        { label: "Cost/beneficiary", value: formatCurrency(Math.round(6800 / multiplier)) },
        { label: "Outcome score", value: formatScore(88 + (multiplier - 1) * 9) },
        { label: "Timeline", value: "-2 weeks" },
      ],
    },
    {
      id: "worst",
      title: "Guardrail",
      pill: "Conservative",
      badgeTone: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-200",
      variance: "-6% reach",
      metrics: [
        { label: "Beneficiaries", value: formatNumber(Math.round(16500 * Math.pow(multiplier, 0.95))) },
        { label: "Cost/beneficiary", value: formatCurrency(Math.round(7200 / multiplier)) },
        { label: "Outcome score", value: formatScore(84 + (multiplier - 1) * 6) },
        { label: "Timeline", value: "+1 week" },
      ],
    },
  ];
  return cases;
}

function deriveInsights(multiplier: number) {
  const deltaPercent = Math.round((multiplier - 1) * 100);
  const weeksShift = Math.max(0, Math.abs(Math.round((multiplier - 1) * 8)));
  const headlinePrefix = deltaPercent >= 0 ? "Increasing" : "Reducing";
  const verb = deltaPercent >= 0 ? "accelerate" : "delay";
  const period = weeksShift === 1 ? "week" : "weeks";
  const absoluteDelta = Math.abs(deltaPercent);
  const primaryHeadline = `${headlinePrefix} your CSR budget by ${absoluteDelta}% could ${verb} impact delivery by roughly ${weeksShift} ${period}.`;
  const timelineMessage = multiplier >= 1
    ? "Higher investment brings completion forward; dedicate funds to milestone automation to sustain the gain."
    : "Reducing budget extends delivery; introduce phased rollouts to shield critical outcomes.";

  return {
    primary: [
      {
        id: "headline",
        text: primaryHeadline,
      },
    ],
    secondary: [
      {
        id: "mix",
        title: "Balance reach and efficiency",
        body: `Every +10% allocation unlocks ~${Math.round(multiplier * 650)} additional beneficiaries but starts tapering after +40%. Consider diversifying into efficiency-focused interventions to preserve ROI.`,
      },
      {
        id: "timeline",
        title: "Protect completion timelines",
        body: timelineMessage,
      },
      {
        id: "resilience",
        title: "Build scenario resilience",
        body: "Use the guardrail case to plan contingency reserves; a small buffer mitigates seasonal dips without derailing commitments.",
      },
    ],
  };
}

function formatScore(value: number) {
  return `${Math.round(value)} / 100`;
}

function formatNumber(value: number) {
  return value.toLocaleString();
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString()}`;
}
