"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, FileText, RefreshCcw, Search } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type ComplianceStatus = "Good" | "Moderate" | "Critical";

interface AuditRecord {
  id: string;
  title: string;
  ngo: string;
  status: ComplianceStatus;
  score: number;
  year: string;
  lastReviewed: string;
  summary: string;
  scope: string;
  findings: string[];
  actions: string[];
  breakdown: Array<{ label: string; value: number }>;
}

const AUDITS: AuditRecord[] = [
  {
    id: "audit-udaan-2025",
    title: "FY25 Programme Impact & Financial Review",
    ngo: "Project Udaan",
    status: "Good",
    score: 92,
    year: "2025",
    lastReviewed: "2025-10-14",
    summary: "Independent audit covering STEM labs expansion with focus on fund utilisation and learning outcomes.",
    scope: "Financial compliance, programme KPIs, beneficiary verification",
    findings: [
      "Fund utilisation aligned with CSR budget allocations.",
      "Learning outcome tracking improved via quarterly dashboards.",
      "Volunteer hours documentation needs better standardisation.",
    ],
    actions: [
      "Launch standard volunteer documentation template by Q1 FY26.",
      "Introduce random spot-checks for lab equipment inventory.",
    ],
    breakdown: [
      { label: "Governance", value: 94 },
      { label: "Financial controls", value: 90 },
      { label: "Impact measurement", value: 93 },
      { label: "Documentation", value: 88 },
    ],
  },
  {
    id: "audit-healtrust-2025",
    title: "Mobile Clinics Compliance Review",
    ngo: "HealTrust",
    status: "Moderate",
    score: 78,
    year: "2025",
    lastReviewed: "2025-09-28",
    summary: "Review of mobile clinic rollout with emphasis on medical compliance, procurement, and FCRA utilisation.",
    scope: "Medical protocols, procurement, FCRA compliance",
    findings: [
      "Cold chain logs missing for 3% of vaccine drives.",
      "Procurement approvals documented but still manual.",
      "Telemedicine pilot exceeded KPIs in two regions.",
    ],
    actions: [
      "Implement digital cold chain tracking devices within 60 days.",
      "Automate procurement approvals via Compliance360 integration.",
    ],
    breakdown: [
      { label: "Governance", value: 80 },
      { label: "Financial controls", value: 76 },
      { label: "Impact measurement", value: 82 },
      { label: "Documentation", value: 74 },
    ],
  },
  {
    id: "audit-anandi-2024",
    title: "Women Artisan Cooperative Statutory Audit",
    ngo: "Anandi Foundation",
    status: "Critical",
    score: 61,
    year: "2024",
    lastReviewed: "2025-05-19",
    summary: "Statutory and programme compliance review for artisan livelihood clusters across Gujarat & Rajasthan.",
    scope: "Statutory filings, vendor vetting, beneficiary payout compliance",
    findings: [
      "Delayed 80G renewal submission flagged by compliance team.",
      "Vendor onboarding lacked background checks for 2 partners.",
      "Beneficiary payout logs in paper format; digitisation pending.",
    ],
    actions: [
      "Complete 80G renewal with supporting docs before Dec 2025.",
      "Adopt vendor due diligence checklist for all new partners.",
      "Digitise payout logs via ImpactBridge finance tooling.",
    ],
    breakdown: [
      { label: "Governance", value: 58 },
      { label: "Financial controls", value: 63 },
      { label: "Impact measurement", value: 60 },
      { label: "Documentation", value: 64 },
    ],
  },
];

const NGO_FILTERS = ["All NGOs", ...Array.from(new Set(AUDITS.map((audit) => audit.ngo)))];
const STATUS_FILTERS: Array<{ value: "all" | ComplianceStatus; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "Good", label: "Good" },
  { value: "Moderate", label: "Moderate" },
  { value: "Critical", label: "Critical" },
];
const YEAR_FILTERS = ["All years", ...Array.from(new Set(AUDITS.map((audit) => audit.year)))];

export default function AuditCenterPage() {
  const [ngoFilter, setNgoFilter] = useState("All NGOs");
  const [statusFilter, setStatusFilter] = useState<"all" | ComplianceStatus>("all");
  const [yearFilter, setYearFilter] = useState("All years");
  const [query, setQuery] = useState("");
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord | null>(null);
  const [isLoading] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Audit & Compliance Center" },
    ],
    [],
  );

  const filteredAudits = useMemo(() => {
    return AUDITS.filter((audit) => {
      const matchNgo = ngoFilter === "All NGOs" || audit.ngo === ngoFilter;
      const matchStatus = statusFilter === "all" || audit.status === statusFilter;
      const matchYear = yearFilter === "All years" || audit.year === yearFilter;
      const search = query.trim().toLowerCase();
      const matchQuery =
        search.length === 0 ||
        audit.title.toLowerCase().includes(search) ||
        audit.summary.toLowerCase().includes(search);
      return matchNgo && matchStatus && matchYear && matchQuery;
    });
  }, [ngoFilter, query, statusFilter, yearFilter]);

  const emptyState = !isLoading && filteredAudits.length === 0;

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200">
          Compliance review
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Audit & Compliance Center</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Review audit reports and track compliance health across partners.
          </p>
        </div>
      </header>

      <FiltersRow
        ngo={ngoFilter}
        onNgoChange={setNgoFilter}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        year={yearFilter}
        onYearChange={setYearFilter}
        query={query}
        onQueryChange={setQuery}
        onReset={() => {
          setNgoFilter("All NGOs");
          setStatusFilter("all");
          setYearFilter("All years");
          setQuery("");
        }}
      />

      {isLoading ? (
        <ListSkeleton />
      ) : emptyState ? (
        <EmptyState
          onReset={() => {
            setNgoFilter("All NGOs");
            setStatusFilter("all");
            setYearFilter("All years");
            setQuery("");
          }}
        />
      ) : (
        <AuditList audits={filteredAudits} onSelect={setSelectedAudit} />
      )}

      <Drawer
        open={Boolean(selectedAudit)}
        onClose={() => setSelectedAudit(null)}
        title={selectedAudit?.title}
        description={selectedAudit ? `${selectedAudit.ngo} • ${selectedAudit.year}` : undefined}
      >
        {selectedAudit ? <AuditDrawerContent audit={selectedAudit} /> : null}
      </Drawer>
    </div>
  );
}

function FiltersRow({
  ngo,
  onNgoChange,
  status,
  onStatusChange,
  year,
  onYearChange,
  query,
  onQueryChange,
  onReset,
}: {
  ngo: string;
  onNgoChange: (value: string) => void;
  status: "all" | ComplianceStatus;
  onStatusChange: (value: "all" | ComplianceStatus) => void;
  year: string;
  onYearChange: (value: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  onReset: () => void;
}) {
  return (
    <Card className="grid gap-4 rounded-4xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:grid-cols-5 lg:items-end">
      <div className="lg:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Search</label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900/60">
          <Search className="h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search audit title or reviewer"
            className="border-0 bg-transparent p-0 focus-visible:ring-0"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">NGO</label>
        <Select value={ngo} onValueChange={onNgoChange}>
          <SelectTrigger className="mt-2 rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {NGO_FILTERS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Compliance status</label>
        <Select value={status} onValueChange={(value) => onStatusChange(value as "all" | ComplianceStatus)}>
          <SelectTrigger className="mt-2 rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Year</label>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger className="mt-2 rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {YEAR_FILTERS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end">
        <Button variant="outline" className="w-full gap-2 rounded-2xl" onClick={onReset}>
          <RefreshCcw className="h-4 w-4" />
          Reset filters
        </Button>
      </div>
    </Card>
  );
}

function AuditList({ audits, onSelect }: { audits: AuditRecord[]; onSelect: (audit: AuditRecord) => void }) {
  return (
    <div className="space-y-4">
      <Card className="hidden rounded-4xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-400 dark:bg-slate-900/40">
            <tr>
              <th className="px-6 py-4 font-medium">Audit</th>
              <th className="px-6 py-4 font-medium">NGO</th>
              <th className="px-6 py-4 font-medium">Score</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Last reviewed</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900/60">
            {audits.map((audit) => (
              <tr key={audit.id} className="transition hover:bg-emerald-50/40 dark:hover:bg-slate-900/40">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{audit.title}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Scope: {audit.scope}</p>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{audit.ngo}</td>
                <td className="px-6 py-4">
                  <ScoreBadge value={audit.score} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={audit.status} />
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{formatDate(audit.lastReviewed)}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="outline" size="sm" className="gap-2 rounded-2xl" onClick={() => onSelect(audit)}>
                    Open report
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="space-y-3 md:hidden">
        {audits.map((audit) => (
          <Card key={audit.id} className="space-y-4 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{audit.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{audit.ngo} • {formatDate(audit.lastReviewed)}</p>
              </div>
              <StatusBadge status={audit.status} />
            </div>
            <ScoreBadge value={audit.score} />
            <p className="text-sm text-slate-600 dark:text-slate-300">Scope: {audit.scope}</p>
            <Button variant="outline" size="sm" className="w-full gap-2 rounded-2xl" onClick={() => onSelect(audit)}>
              Open report
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ScoreBadge({ value }: { value: number }) {
  const tone = value >= 85 ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200" : value >= 70 ? "bg-amber-500/15 text-amber-600 dark:bg-amber-900/40 dark:text-amber-200" : "bg-rose-500/15 text-rose-600 dark:bg-rose-900/40 dark:text-rose-200";
  return (
    <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{value} / 100</Badge>
  );
}

function StatusBadge({ status, className }: { status: ComplianceStatus; className?: string }) {
  const tone: Record<ComplianceStatus, string> = {
    Good: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200",
    Moderate: "bg-amber-500/10 text-amber-600 dark:bg-amber-900/40 dark:text-amber-200",
    Critical: "bg-rose-500/10 text-rose-600 dark:bg-rose-900/40 dark:text-rose-200",
  };
  return (
    <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[status]} ${className ?? ""}`}>{status}</Badge>
  );
}

function AuditDrawerContent({ audit }: { audit: AuditRecord }) {
  return (
    <div className="space-y-6">
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Score</span>
          <ScoreBadge value={audit.score} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{audit.summary}</p>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Score breakdown</h3>
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          {audit.breakdown.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Key findings</h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {audit.findings.map((finding) => (
            <li key={finding} className="flex items-start gap-2">
              <span className="mt-1 flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {finding}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recommended actions</h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {audit.actions.map((action) => (
            <li key={action} className="flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 text-emerald-500" />
              {action}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Download</h3>
        <Card className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">Audit report PDF</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Download will be enabled once documents sync.</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-2xl" disabled>
            Coming soon
          </Button>
        </Card>
      </section>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center dark:border-slate-800 dark:bg-slate-900/40">
      <FileText className="h-10 w-10 text-slate-400" />
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">No audits found for the selected filters</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Modify your filters or reset to see all audit reports.</p>
      </div>
      <Button variant="outline" className="rounded-2xl" onClick={onReset}>
        Reset filters
      </Button>
    </Card>
  );
}

function ListSkeleton() {
  return (
    <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-3xl" />
        ))}
      </div>
    </Card>
  );
}

function formatDate(input: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(input));
  } catch {
    return input;
  }
}

