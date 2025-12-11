"use client";

import { useMemo, useState } from "react";
import {
  Coins,
  Layers,
  PencilLine,
  Plus,
  Wallet,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type BudgetYear = 2024 | 2025 | 2026;

interface ProgrammeAllocation {
  id: string;
  programme: string;
  ngo: string;
  allocation: number;
  progress: number;
}

const MOCK_DATA: Record<BudgetYear, { budget: number; allocations: ProgrammeAllocation[] }> = {
  2024: {
    budget: 110_000_000,
    allocations: [
      {
        id: "csr-24-1",
        programme: "STEM Labs Expansion",
        ngo: "Project Udaan",
        allocation: 32_000_000,
        progress: 0.72,
      },
      {
        id: "csr-24-2",
        programme: "Mobile Health Clinics",
        ngo: "HealTrust",
        allocation: 28_500_000,
        progress: 0.65,
      },
      {
        id: "csr-24-3",
        programme: "Solar Micro-Grids",
        ngo: "BrightFuture Initiative",
        allocation: 24_000_000,
        progress: 0.58,
      },
      {
        id: "csr-24-4",
        programme: "Women Artisan Cooperatives",
        ngo: "Anandi Foundation",
        allocation: 15_500_000,
        progress: 0.41,
      },
    ],
  },
  2025: {
    budget: 125_000_000,
    allocations: [
      {
        id: "csr-25-1",
        programme: "Digital Literacy Pods",
        ngo: "Project Udaan",
        allocation: 34_500_000,
        progress: 0.44,
      },
      {
        id: "csr-25-2",
        programme: "Rural Health Response",
        ngo: "HealTrust",
        allocation: 31_000_000,
        progress: 0.35,
      },
      {
        id: "csr-25-3",
        programme: "Climate Resilience Fund",
        ngo: "BrightFuture Initiative",
        allocation: 26_500_000,
        progress: 0.28,
      },
      {
        id: "csr-25-4",
        programme: "Women Artisan Cooperatives",
        ngo: "Anandi Foundation",
        allocation: 18_500_000,
        progress: 0.21,
      },
    ],
  },
  2026: {
    budget: 135_000_000,
    allocations: [
      {
        id: "csr-26-1",
        programme: "STEM Workforce Scholarships",
        ngo: "Project Udaan",
        allocation: 38_000_000,
        progress: 0.12,
      },
      {
        id: "csr-26-2",
        programme: "Community Clinics Network",
        ngo: "HealTrust",
        allocation: 33_200_000,
        progress: 0.08,
      },
      {
        id: "csr-26-3",
        programme: "Green Jobs Accelerator",
        ngo: "BrightFuture Initiative",
        allocation: 29_100_000,
        progress: 0.05,
      },
    ],
  },
};

const PROGRAMME_OPTIONS = [
  "STEM Labs Expansion",
  "Digital Literacy Pods",
  "Mobile Health Clinics",
  "Solar Micro-Grids",
  "Women Artisan Cooperatives",
  "Rural Health Response",
  "Climate Resilience Fund",
  "Community Clinics Network",
  "Green Jobs Accelerator",
];

export default function CsrBudgetPlannerPage() {
  const [year, setYear] = useState<BudgetYear>(2025);
  const [editRow, setEditRow] = useState<ProgrammeAllocation | null>(null);
  const [editAmount, setEditAmount] = useState<string>("");
  const [addOpen, setAddOpen] = useState(false);
  const [addProgramme, setAddProgramme] = useState(PROGRAMME_OPTIONS[0]);
  const [addAmount, setAddAmount] = useState("5000000");
  const [isLoading] = useState(false);

  const data = useMemo(() => MOCK_DATA[year], [year]);
  const allocatedTotal = useMemo(() => data.allocations.reduce((sum, item) => sum + item.allocation, 0), [data.allocations]);
  const remaining = data.budget - allocatedTotal;

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "CSR Budget Planner" },
    ],
    [],
  );

  const handleOpenEdit = (row: ProgrammeAllocation) => {
    setEditRow(row);
    setEditAmount(row.allocation.toString());
  };

  const closeEdit = () => {
    setEditRow(null);
    setEditAmount("");
  };

  const handleSaveEdit = () => {
    closeEdit();
  };

  const handleAddAllocation = () => {
    setAddOpen(false);
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200">
          Planning
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">CSR Budget Planner</h1>
              <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Plan and track yearly CSR allocations across programmes.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <YearSelect value={year} onChange={(value) => setYear(parseInt(value, 10) as BudgetYear)} />
            </div>
          </div>
        </div>
      </header>

      <SummaryRow budget={data.budget} allocated={allocatedTotal} remaining={remaining} />

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Programme allocations</h2>
          <Button className="w-full gap-2 rounded-2xl sm:w-auto" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Add programme allocation
          </Button>
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : (
          <AllocationList allocations={data.allocations} onEdit={handleOpenEdit} />
        )}
      </section>

      <Drawer
        open={Boolean(editRow)}
        onClose={closeEdit}
        title={editRow ? `Adjust allocation • ${editRow.programme}` : undefined}
        description="Update the committed amount for this CSR initiative."
      >
        {editRow ? (
          <div className="space-y-6">
            <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-slate-100">{editRow.ngo}</p>
              <p>Current allocation: ₹{editRow.allocation.toLocaleString()}</p>
              <p>Progress: {(editRow.progress * 100).toFixed(0)}%</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Allocation amount</label>
              <Input
                inputMode="numeric"
                value={editAmount}
                onChange={(event) => setEditAmount(event.target.value.replace(/[^0-9]/g, ""))}
                className="rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60"
              />
              <input
                type="range"
                min={0}
                max={data.budget}
                step={100000}
                value={Number(editAmount || 0)}
                onChange={(event) => setEditAmount(event.target.value)}
                className="h-1 w-full cursor-pointer accent-emerald-500"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">Drag to adjust the committed amount. This is a mock-only control.</p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" className="rounded-2xl" onClick={closeEdit}>
                Cancel
              </Button>
              <Button className="rounded-2xl" onClick={handleSaveEdit}>
                Save changes
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add programme allocation"
        description="Choose a programme and set the planned allocation."
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Programme</label>
            <Select value={addProgramme} onValueChange={setAddProgramme}>
              <SelectTrigger className="rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {PROGRAMME_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Allocation amount</label>
            <Input
              inputMode="numeric"
              value={addAmount}
              onChange={(event) => setAddAmount(event.target.value.replace(/[^0-9]/g, ""))}
              className="rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button variant="outline" className="rounded-2xl" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button className="rounded-2xl" onClick={handleAddAllocation}>
              Save allocation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function YearSelect({ value, onChange }: { value: BudgetYear; onChange: (value: string) => void }) {
  return (
    <div className="space-y-2 text-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Year</span>
      <Select value={value.toString()} onValueChange={onChange}>
        <SelectTrigger className="rounded-2xl border-slate-200 bg-white/90 dark:border-slate-700 dark:bg-slate-900/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2026">2026</SelectItem>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function SummaryRow({ budget, allocated, remaining }: { budget: number; allocated: number; remaining: number }) {
  const cards = [
    {
      id: "budget-total",
      label: "Total CSR budget",
      value: budget,
      helper: "Approved by board",
      icon: Wallet,
      tone: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    },
    {
      id: "budget-allocated",
      label: "Allocated",
      value: allocated,
      helper: "Committed programmes",
      icon: Layers,
      tone: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    },
    {
      id: "budget-remaining",
      label: "Remaining",
      value: remaining,
      helper: "Available to assign",
      icon: Coins,
      tone: remaining >= 0 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" : "bg-rose-500/10 text-rose-600 dark:text-rose-300",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.id} className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", card.tone)}>
            <card.icon className="h-4 w-4" />
            {card.label}
          </span>
          <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-50">₹{card.value.toLocaleString()}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{card.helper}</p>
        </Card>
      ))}
    </section>
  );
}

function AllocationList({ allocations, onEdit }: { allocations: ProgrammeAllocation[]; onEdit: (row: ProgrammeAllocation) => void }) {
  return (
    <Card className="overflow-hidden rounded-4xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="hidden text-sm sm:block">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-400 dark:bg-slate-900/50">
            <tr>
              <th className="px-6 py-4 font-medium">Programme</th>
              <th className="px-6 py-4 font-medium">NGO</th>
              <th className="px-6 py-4 font-medium">Allocation</th>
              <th className="px-6 py-4 font-medium">Progress</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm dark:divide-slate-800 dark:bg-slate-900/60">
            {allocations.map((allocation) => (
              <tr key={allocation.id} className="transition hover:bg-emerald-50/40 dark:hover:bg-slate-900/40">
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{allocation.programme}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{allocation.ngo}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">₹{allocation.allocation.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <ProgressBar value={allocation.progress} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="outline" size="sm" className="gap-2 rounded-2xl" onClick={() => onEdit(allocation)}>
                    <PencilLine className="h-4 w-4" />
                    Edit allocation
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-4 sm:hidden">
        {allocations.map((allocation) => (
          <div key={allocation.id} className="space-y-3 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{allocation.programme}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{allocation.ngo}</p>
              </div>
              <Badge className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200">
                ₹{allocation.allocation.toLocaleString()}
              </Badge>
            </div>
            <ProgressBar value={allocation.progress} />
            <Button variant="outline" size="sm" className="w-full gap-2 rounded-2xl" onClick={() => onEdit(allocation)}>
              <PencilLine className="h-4 w-4" />
              Edit allocation
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${Math.min(value * 100, 100)}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{(value * 100).toFixed(0)}%</span>
    </div>
  );
}

function TableSkeleton() {
  return (
    <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-3xl" />
        ))}
      </div>
    </Card>
  );
}
