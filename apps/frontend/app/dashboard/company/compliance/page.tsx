"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Calendar, CheckCircle2, FileWarning, NotebookPen, Search } from "lucide-react";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { complianceRows, ComplianceRow } from "./mock-data";

type FilterValue = "All" | ComplianceRow["status"];

const statusTone: Record<ComplianceRow["status"], string> = {
  Compliant: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  "Action needed": "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
};

const insightCards = [
  {
    id: "insight-compliant",
    label: "Compliant NGOs",
    helper: "Fully verified partners",
    tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
    value: complianceRows.filter((row) => row.status === "Compliant").length,
  },
  {
    id: "insight-pending",
    label: "Pending reviews",
    helper: "Awaiting documentation",
    tone: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
    value: complianceRows.filter((row) => row.status === "Pending").length,
  },
  {
    id: "insight-missing",
    label: "Missing documents",
    helper: "CSR prerequisites",
    tone: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200",
    value: complianceRows.reduce((count, row) => count + (row.missingItems.length > 0 ? 1 : 0), 0),
  },
  {
    id: "insight-expiring",
    label: "Expiring registrations",
    helper: "< 45 days",
    tone: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
    value: complianceRows.reduce((count, row) => {
      const upcoming = row.deadlines.filter((deadline) => deadline.label.toLowerCase().includes("renewal") || deadline.label.toLowerCase().includes("expiry"));
      return count + (upcoming.length > 0 ? 1 : 0);
    }, 0),
  },
];

export default function CompanyCompliancePage() {
  const [filter, setFilter] = useState<FilterValue>("All");
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState<ComplianceRow | null>(null);
  const [isLoading] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Compliance Overview" },
    ],
    [],
  );

  const filteredRows = useMemo(() => {
    return complianceRows.filter((row) => {
      const matchesStatus = filter === "All" || row.status === filter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        row.ngo.toLowerCase().includes(query) ||
        row.missingItems.some((item) => item.toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [filter, search]);

  const emptyState = !isLoading && filteredRows.length === 0;

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200">
          CSR Oversight
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Compliance Overview</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Track NGO compliance, documents, and CSR alignment to ensure every partnered organisation maintains the required statutory standards.
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insightCards.map((card) => (
          <Card key={card.id} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", card.tone)}>
              <CheckCircle2 className="h-3.5 w-3.5" />
              {card.label}
            </span>
            <p className="mt-5 text-3xl font-semibold text-slate-900 dark:text-slate-50">{card.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{card.helper}</p>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-1 rounded-4xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <FilterPill label="All" active={filter === "All"} onClick={() => setFilter("All")} />
              <FilterPill label="Compliant" active={filter === "Compliant"} onClick={() => setFilter("Compliant")} />
              <FilterPill label="Pending" active={filter === "Pending"} onClick={() => setFilter("Pending")} />
              <FilterPill label="Action needed" active={filter === "Action needed"} onClick={() => setFilter("Action needed")} />
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search NGO or missing items"
                className="rounded-2xl border-slate-200 bg-white pl-9 pr-3 dark:border-slate-700 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {isLoading ? (
              <TableSkeleton />
            ) : emptyState ? (
              <EmptyState onReset={() => {
                setFilter("All");
                setSearch("");
              }} />
            ) : (
              <ComplianceList rows={filteredRows} onSelect={setSelectedRow} />
            )}
          </div>
        </Card>

        <Card className="w-full max-w-sm rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:max-w-xs">
          <header className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Upcoming deadlines</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monitor renewals and filings</p>
            </div>
          </header>
          <div className="mt-5 space-y-4">
            {complianceRows
              .flatMap((row) => row.deadlines.map((deadline) => ({ ...deadline, ngo: row.ngo, status: row.status, id: `${row.id}-${deadline.label}` })))
              .slice(0, 4)
              .map((deadline) => (
                <div key={deadline.id} className="space-y-2 rounded-3xl border border-slate-100 bg-slate-50/60 p-3 dark:border-slate-800/60 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{deadline.label}</span>
                    <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", statusTone[deadline.status as ComplianceRow["status"]])}>
                      {deadline.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{deadline.ngo}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(deadline.date)}
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </section>

      <Drawer
        open={Boolean(selectedRow)}
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.ngo}
        description="Detailed compliance status and outstanding actions"
      >
        {selectedRow ? <DrawerContent row={selectedRow} onClose={() => setSelectedRow(null)} /> : null}
      </Drawer>
    </div>
  );
}

function ComplianceList({ rows, onSelect }: { rows: ComplianceRow[]; onSelect: (row: ComplianceRow) => void }) {
  return (
    <div className="space-y-4">
      <div className="hidden text-sm lg:block">
        <table className="w-full text-left" aria-label="Compliance table">
          <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="px-4 py-3 font-medium">NGO</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Last reviewed</th>
              <th className="px-4 py-3 font-medium">Missing items</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-emerald-50/40 dark:hover:bg-slate-900/40">
                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{row.ngo}</div>
                  <Link href={`/dashboard/company/ngos/${row.ngoId}`} className="text-xs text-emerald-600 hover:underline dark:text-emerald-300">
                    View profile
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusTone[row.status])}>{row.status}</Badge>
                </td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{formatDate(row.lastReviewed)}</td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                  {row.missingItems.length > 0 ? row.missingItems.join(", ") : <span className="text-xs text-slate-400">None</span>}
                </td>
                <td className="px-4 py-4 text-right">
                  <Button variant="outline" size="sm" className="rounded-2xl" onClick={() => onSelect(row)}>
                    View details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 lg:hidden">
        {rows.map((row) => (
          <Card key={row.id} className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{row.ngo}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Last reviewed {formatDate(row.lastReviewed)}</p>
              </div>
              <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusTone[row.status])}>{row.status}</Badge>
            </div>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-medium">Missing items</p>
              {row.missingItems.length > 0 ? (
                <ul className="space-y-1 text-sm">
                  {row.missingItems.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <FileWarning className="h-4 w-4 text-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">Nothing pending</p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/dashboard/company/ngos/${row.ngoId}`} className="text-sm text-emerald-600 hover:underline dark:text-emerald-300">
                View profile
              </Link>
              <Button variant="outline" size="sm" className="rounded-2xl" onClick={() => onSelect(row)}>
                View details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: FilterValue; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1 text-sm font-medium transition",
        active
          ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-500/10 dark:text-emerald-200"
          : "border-slate-200 text-slate-500 hover:border-emerald-200 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-emerald-400 dark:hover:text-emerald-200",
      )}
    >
      {label}
    </button>
  );
}

function DrawerContent({ row, onClose }: { row: ComplianceRow; onClose: () => void }) {
  return (
    <div className="space-y-6">
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <header className="flex items-center gap-3">
          <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusTone[row.status])}>{row.status}</Badge>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</span>
        </header>
        <p className="text-sm text-slate-600 dark:text-slate-300">Last reviewed {formatDate(row.lastReviewed)} by CSR compliance team.</p>
        <Button asChild className="rounded-2xl" variant="outline">
          <Link href={`/dashboard/company/ngos/${row.ngoId}`}>Open NGO profile</Link>
        </Button>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Missing documents</h3>
        {row.missingItems.length > 0 ? (
          <ul className="space-y-2">
            {row.missingItems.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/50 px-3 py-2 text-sm text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                <FileWarning className="h-4 w-4" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <Card className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
            All documents verified.
          </Card>
        )}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Upcoming deadlines</h3>
        <div className="space-y-2">
          {row.deadlines.map((deadline) => (
            <Card key={deadline.label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950">
              <Calendar className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-100">{deadline.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Due {formatDate(deadline.date)}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notes</h3>
        <Card className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          <NotebookPen className="h-4 w-4 text-slate-400" />
          <p className="leading-relaxed">{row.notes}</p>
        </Card>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button variant="outline" className="rounded-2xl" onClick={onClose}>
          Close
        </Button>
        <Button className="rounded-2xl">Record follow-up</Button>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full rounded-3xl" />
      ))}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center dark:border-slate-800 dark:bg-slate-900/40">
      <FileWarning className="mx-auto h-10 w-10 text-slate-400" />
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">No NGOs match your filters</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Adjust filters or reset to see all compliance statuses across partnered NGOs.
      </p>
      <Button variant="outline" className="mt-4 rounded-2xl" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}

function formatDate(input: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(input));
  } catch {
    return input;
  }
}
