"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock4, FileText, Filter, Loader2, RefreshCw, UploadCloud } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ComplianceItem {
  id: string;
  label: string;
  status: "Pending" | "Verified" | "Expiring soon";
  lastUpdated: string;
  action: "Upload" | "Replace" | "View";
}

interface ComplianceGroup {
  title: string;
  items: ComplianceItem[];
}

const complianceGroups: ComplianceGroup[] = [
  {
    title: "Core CSR Compliance",
    items: [
      {
        id: "csr-1",
        label: "CSR eligibility certificate",
        status: "Verified",
        lastUpdated: "12 Aug 2025",
        action: "View",
      },
      {
        id: "csr-2",
        label: "Annual CSR impact report",
        status: "Pending",
        lastUpdated: "—",
        action: "Upload",
      },
      {
        id: "csr-3",
        label: "Utilisation certificates",
        status: "Expiring soon",
        lastUpdated: "04 Oct 2025",
        action: "Replace",
      },
    ],
  },
  {
    title: "Financial Audit Requirements",
    items: [
      {
        id: "aud-1",
        label: "Statutory audit report",
        status: "Verified",
        lastUpdated: "20 Sep 2025",
        action: "View",
      },
      {
        id: "aud-2",
        label: "12A compliance certificate",
        status: "Pending",
        lastUpdated: "—",
        action: "Upload",
      },
      {
        id: "aud-3",
        label: "Quarterly financial statements",
        status: "Expiring soon",
        lastUpdated: "02 Oct 2025",
        action: "Replace",
      },
    ],
  },
  {
    title: "Identity & Registration",
    items: [
      {
        id: "id-1",
        label: "80G certificate",
        status: "Expiring soon",
        lastUpdated: "18 Sep 2025",
        action: "Replace",
      },
      {
        id: "id-2",
        label: "NGO Darpan registration",
        status: "Verified",
        lastUpdated: "14 Jul 2025",
        action: "View",
      },
      {
        id: "id-3",
        label: "PAN and TAN documents",
        status: "Pending",
        lastUpdated: "—",
        action: "Upload",
      },
    ],
  },
];

const statusToneMap: Record<ComplianceItem["status"], string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  "Expiring soon": "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
  Verified: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
};

const mockTimeline = [
  {
    title: "80G submitted for renewal",
    timestamp: "12 Oct 2025 • 09:45 AM",
    tone: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    icon: RefreshCw,
  },
  {
    title: "CSR eligibility verified",
    timestamp: "05 Oct 2025 • 04:12 PM",
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    icon: CheckCircle2,
  },
  {
    title: "Audit doc pending review",
    timestamp: "28 Sep 2025 • 11:05 AM",
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    icon: Clock4,
  },
];

const alertCards = [
  {
    id: "alert-1",
    title: "80G certificate expiring in 30 days",
    description: "Submit the renewed document to avoid disruption to donor tax benefits.",
    tone: "border-amber-400 text-amber-600 dark:border-amber-300 dark:text-amber-200",
    icon: AlertTriangle,
  },
  {
    id: "alert-2",
    title: "Missing mandatory audit form",
    description: "Upload the latest statutory audit report for FY 2024-25.",
    tone: "border-rose-400 text-rose-600 dark:border-rose-300 dark:text-rose-200",
    icon: FileText,
  },
];

export default function NGOCompliancePage() {
  const [filter, setFilter] = useState<string>("All");
  const [isLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<ComplianceItem | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "Compliance Center" },
    ],
    [],
  );

  const filteredGroups = useMemo(() => {
    if (filter === "All") return complianceGroups;

    return complianceGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.status.toLowerCase() === filter.toLowerCase()),
      }))
      .filter((group) => group.items.length);
  }, [filter]);

  const isEmpty = !isLoading && filteredGroups.every((group) => group.items.length === 0);

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />
      <SectionHeader
        title="Compliance Center"
        subtitle="Stay up-to-date with mandatory compliance checks."
        action={
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        }
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <section className="flex-1 space-y-6">
          <Card className="flex flex-wrap items-center justify-between gap-3 rounded-4xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="space-y-1 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Filter by status</p>
              <p className="text-slate-600 dark:text-slate-300">Quickly locate pending or expiring items.</p>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full min-w-[160px] sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Expiring soon">Expiring soon</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          {isLoading ? (
            <ChecklistSkeleton />
          ) : isEmpty ? (
            <EmptyChecklist />
          ) : (
            filteredGroups.map((group) => (
              <Card key={group.title} className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <header className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{group.title}</h3>
                  <span className="text-xs uppercase tracking-[0.14em] text-slate-400">{group.items.length} items</span>
                </header>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200/70 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/70 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Last updated {item.lastUpdated}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusToneMap[item.status])}>{item.status}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            setActiveItem(item);
                            setModalOpen(true);
                          }}
                        >
                          {item.action}
                          <UploadCloud className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))
          )}
        </section>

        <aside className="w-full space-y-6 lg:w-96">
          <Card className="space-y-4 rounded-4xl border border-rose-200 bg-rose-50/70 p-6 shadow-sm dark:border-rose-500/40 dark:bg-rose-500/10">
            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-200">Alerts</h3>
            <ul className="space-y-3">
              {alertCards.map((alert) => (
                <li key={alert.id} className={cn("flex items-start gap-3 rounded-3xl border bg-white/80 p-4 dark:bg-slate-900/70", alert.tone)}>
                  <alert.icon className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{alert.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Timeline</h3>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </Button>
            </div>
            {mockTimeline.length === 0 ? (
              <TimelineEmptyState />
            ) : (
              <ol className="space-y-4">
                {mockTimeline.map((event) => (
                  <li key={event.title} className="flex items-start gap-3">
                    <span className={cn("mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full", event.tone)}>
                      <event.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{event.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{event.timestamp}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </aside>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Compliance action"
        description="Upload, replace, or review compliance documentation."
      >
        {activeItem ? <ActionModalContent item={activeItem} /> : <Skeleton className="h-32 w-full" />}
      </Modal>
    </div>
  );
}

function ChecklistSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <Skeleton className="h-6 w-40" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, rowIdx) => (
              <Skeleton key={rowIdx} className="h-16 w-full rounded-3xl" />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyChecklist() {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 rounded-4xl border border-slate-200 bg-white/90 p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <UploadCloud className="h-12 w-12 text-slate-300" aria-hidden />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No items match this filter</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">Adjust the status filter to view pending or verified compliance tasks.</p>
    </Card>
  );
}

function TimelineEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-slate-50/60 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
      <Clock4 className="h-6 w-6" />
      <p>No activity recorded yet</p>
    </div>
  );
}

function ActionModalContent({ item }: { item: ComplianceItem }) {
  const [isProcessing, setProcessing] = useState(false);

  function handleAction() {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 1000);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Current status: {item.status}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
        Upload zone placeholder. Drag & drop files or click the button below to select a document.
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={handleAction} className="gap-2" disabled={isProcessing}>
          {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />} {item.action}
        </Button>
      </div>
    </div>
  );
}
