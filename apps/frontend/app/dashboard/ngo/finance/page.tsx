"use client";

import { useMemo, useState } from "react";
import {
  CalendarRange,
  Filter,
  MoreHorizontal,
  PiggyBank,
  PieChart as PieIcon,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionHeader } from "@/components/dashboard/section-header";
import { cn } from "@/lib/utils";

type TransactionType = "Credit" | "Debit";
type TransactionStatus = "Cleared" | "Pending";

interface FinanceCard {
  label: string;
  value: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "sky" | "violet" | "amber";
}

interface TransactionRow {
  id: string;
  date: string;
  description: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
}

const summaryCards: FinanceCard[] = [
  {
    label: "Total donations received",
    value: "₹12,40,000",
    helper: "Last update 2h ago",
    icon: TrendingUp,
    tone: "emerald",
  },
  {
    label: "Funds utilized",
    value: "₹8,30,000",
    helper: "Across 6 campaigns",
    icon: Wallet,
    tone: "sky",
  },
  {
    label: "Remaining balance",
    value: "₹3,10,000",
    helper: "Planned disbursal this month",
    icon: PiggyBank,
    tone: "violet",
  },
  {
    label: "Upcoming allocations",
    value: "₹1,20,000",
    helper: "Scheduled for next 30 days",
    icon: PieIcon,
    tone: "amber",
  },
];

const donationsSixMonths = [
  { month: "May", amount: 210000 },
  { month: "Jun", amount: 245000 },
  { month: "Jul", amount: 198000 },
  { month: "Aug", amount: 256000 },
  { month: "Sep", amount: 275000 },
  { month: "Oct", amount: 298000 },
];

const allocationByCategory = [
  { name: "Healthcare", value: 34, color: "#22c55e" },
  { name: "Education", value: 28, color: "#0284c7" },
  { name: "Livelihood", value: 18, color: "#f59e0b" },
  { name: "Disaster relief", value: 12, color: "#ec4899" },
  { name: "Admin", value: 8, color: "#6366f1" },
];

const mockTransactions: TransactionRow[] = [
  {
    id: "txn-9812",
    date: "12 Oct 2025",
    description: "Donation from Bright Future CSR",
    type: "Credit",
    amount: 120000,
    status: "Cleared",
  },
  {
    id: "txn-9804",
    date: "08 Oct 2025",
    description: "Medical supplies - Rural Health Kits",
    type: "Debit",
    amount: 45000,
    status: "Cleared",
  },
  {
    id: "txn-9799",
    date: "05 Oct 2025",
    description: "Donation from Global Giving Circle",
    type: "Credit",
    amount: 60000,
    status: "Pending",
  },
  {
    id: "txn-9786",
    date: "30 Sep 2025",
    description: "Field survey disbursement",
    type: "Debit",
    amount: 28000,
    status: "Cleared",
  },
  {
    id: "txn-9771",
    date: "25 Sep 2025",
    description: "Recurring supporter donation",
    type: "Credit",
    amount: 15000,
    status: "Cleared",
  },
];

interface FilterState {
  dateRange: string;
  type: "All" | TransactionType;
  status: "All" | TransactionStatus;
}

const initialFilters: FilterState = { dateRange: "Last 30 days", type: "All", status: "All" };

function formatCurrency(amount: number) {
  return `₹${Intl.NumberFormat("en-IN").format(amount)}`;
}

export default function NGOFinanceOverviewPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRow | null>(null);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "Finance Overview" },
    ],
    [],
  );

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesType = filters.type === "All" || transaction.type === filters.type;
      const matchesStatus = filters.status === "All" || transaction.status === filters.status;
      return matchesType && matchesStatus;
    });
  }, [filters]);

  function formatCurrency(amount: number) {
    return `₹${Intl.NumberFormat("en-IN").format(amount)}`;
  }

  function handleFilter(partial: Partial<FilterState>) {
    setFilters((previous) => ({ ...previous, ...partial }));
  }

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      <SectionHeader
        title="Finance Overview"
        subtitle="Track funding, spending, and financial health in one place."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <Card className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:col-span-3">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Donations trend</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Last six months</p>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-500">
              <Filter className="mr-2 h-4 w-4" />
              Compare
            </Button>
          </header>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationsSixMonths}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `₹${Math.round(value / 1000)}k`} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: "rgba(14, 165, 233, 0.08)" }} formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" radius={[12, 12, 4, 4]} fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:col-span-2">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Allocation by category</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Where funds are being utilised</p>
            </div>
          </header>
          <div className="mt-6 flex flex-col items-center gap-6 md:flex-row">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={allocationByCategory} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {allocationByCategory.map((slice) => (
                    <Cell key={slice.name} fill={slice.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {allocationByCategory.map((slice) => (
                <li key={slice.name} className="flex items-center justify-between gap-4">
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

      <section className="rounded-4xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="space-y-6 p-6">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Transactions</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">History of credits and debits across campaigns</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={filters.dateRange} onValueChange={(value) => handleFilter({ dateRange: value })}>
                <SelectTrigger className="w-full min-w-[180px] lg:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                  <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                  <SelectItem value="Last quarter">Last quarter</SelectItem>
                  <SelectItem value="Year to date">Year to date</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.type} onValueChange={(value: FilterState["type"]) => handleFilter({ type: value })}>
                <SelectTrigger className="w-full min-w-[140px] lg:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All types</SelectItem>
                  <SelectItem value="Credit">Credits</SelectItem>
                  <SelectItem value="Debit">Debits</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={(value: FilterState["status"]) => handleFilter({ status: value })}>
                <SelectTrigger className="w-full min-w-[140px] lg:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All statuses</SelectItem>
                  <SelectItem value="Cleared">Cleared</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="hidden gap-2 lg:flex">
                <CalendarRange className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </header>

          {isLoading ? (
            <TransactionSkeleton />
          ) : filteredTransactions.length === 0 ? (
            <EmptyTransactions />
          ) : (
            <TransactionTable transactions={filteredTransactions} onAction={setSelectedTransaction} formatCurrency={formatCurrency} />
          )}
        </div>
      </section>

      <TransactionDetailModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
    </div>
  );
}

function SummaryCard({ label, value, helper, icon: Icon, tone }: FinanceCard) {
  const toneClasses: Record<FinanceCard["tone"], string> = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
    sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200",
    violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  };

  return (
    <Card className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
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

function TransactionTable({
  transactions,
  onAction,
  formatCurrency,
}: {
  transactions: TransactionRow[];
  onAction: (transaction: TransactionRow) => void;
  formatCurrency: (amount: number) => string;
}) {
  return (
    <div className="space-y-4">
      <div className="hidden rounded-3xl border border-slate-200 dark:border-slate-800 lg:block">
        <Table>
          <TableHeader>
            <TableRow className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="text-sm text-slate-600 dark:text-slate-300">
                <TableCell className="font-medium text-slate-900 dark:text-slate-50">{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", transaction.type === "Credit" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200" : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200")}>{transaction.type}</span>
                </TableCell>
                <TableCell className="font-medium text-slate-900 dark:text-slate-50">{formatCurrency(transaction.amount)}</TableCell>
                <TableCell>
                  <span className={cn("inline-flex items-center gap-2 text-sm font-medium", transaction.status === "Cleared" ? "text-emerald-600 dark:text-emerald-300" : "text-amber-500 dark:text-amber-200")}>{transaction.status}</span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onAction(transaction)}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3 lg:hidden">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50">{transaction.date}</p>
                <p className="mt-1 text-slate-500 dark:text-slate-400">{transaction.description}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onAction(transaction)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", transaction.type === "Credit" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200" : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200")}>{transaction.type}</span>
              <span className={cn("inline-flex items-center gap-2 text-sm font-medium", transaction.status === "Cleared" ? "text-emerald-600 dark:text-emerald-300" : "text-amber-500 dark:text-amber-200")}>{transaction.status}</span>
              <span className="ml-auto text-base font-semibold text-slate-900 dark:text-slate-50">{formatCurrency(transaction.amount)}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TransactionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="hidden rounded-3xl border border-slate-200 p-4 dark:border-slate-800 lg:block">
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full rounded-2xl" />
          ))}
        </div>
      </div>
      <div className="grid gap-3 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-8 w-full rounded-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function EmptyTransactions() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <Wallet className="h-12 w-12 text-slate-400" aria-hidden />
      <div className="space-y-1">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">No transactions yet</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">You’ll see donation and spending history here once activity begins.</p>
      </div>
      <Button variant="outline" className="gap-2">
        <CalendarRange className="h-4 w-4" />
        Adjust filters
      </Button>
    </div>
  );
}

function TransactionDetailModal({ transaction, onClose }: { transaction: TransactionRow | null; onClose: () => void }) {
  return (
    <Modal open={Boolean(transaction)} onClose={onClose} title={transaction ? transaction.description : "Transaction"} description={transaction?.date}>
      {!transaction ? (
        <TransactionSkeleton />
      ) : (
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/60">
            <InfoRow label="Transaction ID" value={transaction.id} />
            <InfoRow label="Type" value={transaction.type} />
            <InfoRow label="Amount" value={formatCurrency(transaction.amount)} />
            <InfoRow label="Status" value={transaction.status} />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Notes</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              This is placeholder text for transaction details. In production, surface campaign linkages, supporting documents, and reviewer comments.
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 text-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-medium text-slate-900 dark:text-slate-100">{value}</span>
    </div>
  );
}
