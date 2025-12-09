"use client";

import { useMemo, useState } from "react";
import { CalendarRange, Download, FileText, Filter, MoreHorizontal, Plus, Wallet } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  partner: string;
  date: string;
  status: "Paid" | "Pending" | "Rejected";
  amount: string;
}

const invoices: InvoiceRow[] = [
  {
    id: "inv-9821",
    invoiceNumber: "INV-2025-021",
    partner: "Bright Future CSR",
    date: "12 Oct 2025",
    status: "Paid",
    amount: "₹1,20,000",
  },
  {
    id: "inv-9814",
    invoiceNumber: "INV-2025-020",
    partner: "Global Giving Circle",
    date: "05 Oct 2025",
    status: "Pending",
    amount: "₹85,000",
  },
  {
    id: "inv-9799",
    invoiceNumber: "INV-2025-019",
    partner: "HopeWorks Foundation",
    date: "28 Sep 2025",
    status: "Rejected",
    amount: "₹60,000",
  },
];

const statusToneMap: Record<InvoiceRow["status"], string> = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
};

export default function NGOBillingPage() {
  const [activeStatus, setActiveStatus] = useState<string>("All");
  const [dateRange, setDateRange] = useState<string>("Last 30 days");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isLoading] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "Invoices & Billing" },
    ],
    [],
  );

  const filteredInvoices = useMemo(() => {
    if (activeStatus === "All") {
      return invoices;
    }
    return invoices.filter((invoice) => invoice.status === activeStatus);
  }, [activeStatus]);

  const showEmpty = !isLoading && filteredInvoices.length === 0;

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />
      <SectionHeader title="Invoices & Billing" subtitle="Manage payout requests and financial documentation." />

      <Tabs defaultValue="invoices" className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-2xl bg-slate-100/60 p-1 text-sm sm:w-auto dark:bg-slate-800/50">
            <TabsTrigger value="invoices" className="rounded-xl text-xs font-semibold uppercase tracking-[0.14em]">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="payouts" className="rounded-xl text-xs font-semibold uppercase tracking-[0.14em]">
              Payout Requests
            </TabsTrigger>
            <TabsTrigger value="downloadables" className="rounded-xl text-xs font-semibold uppercase tracking-[0.14em]">
              Downloadables
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={activeStatus} onValueChange={setActiveStatus}>
              <SelectTrigger className="w-full min-w-[160px] sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full min-w-[160px] sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                <SelectItem value="FY 2025">FY 2025</SelectItem>
                <SelectItem value="Custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Advanced
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </div>
        </div>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="rounded-4xl border border-slate-200 bg-white/90 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <input
                    type="search"
                    placeholder="Search invoices"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-800"
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-2 border-dashed">
                  <CalendarRange className="h-4 w-4" />
                  Export list
                </Button>
              </div>
            </div>

            {isLoading ? (
              <InvoiceSkeleton />
            ) : showEmpty ? (
              <EmptyState />
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Issued to</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="w-[60px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id} className="text-sm text-slate-600 dark:text-slate-300">
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-50">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.partner}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>
                          <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusToneMap[invoice.status])}>
                            {invoice.status}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900 dark:text-slate-50">{invoice.amount}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setPreviewOpen(true);
                            }}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card className="flex flex-col items-center justify-center gap-4 rounded-4xl border border-slate-200 bg-white/80 p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <Wallet className="h-12 w-12 text-slate-400" aria-hidden />
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No payout requests yet</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Submit your first payout request once funds are ready for disbursal.
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New payout request
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="downloadables" className="space-y-4">
          <Card className="flex flex-col items-center justify-center gap-3 rounded-4xl border border-slate-200 bg-white/80 p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <FileText className="h-12 w-12 text-slate-400" aria-hidden />
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No downloads available</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Statements, FCRA letters, and compliance reports will appear here once generated.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Request a report
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      <Modal
        open={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Invoice preview"
        description="Review details before sending or downloading the invoice."
        size="lg"
      >
        {selectedInvoice ? <InvoicePreview invoice={selectedInvoice} /> : null}
      </Modal>
    </div>
  );
}

function InvoiceSkeleton() {
  return (
    <div className="space-y-2 p-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full rounded-3xl" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <FileText className="h-12 w-12 text-slate-300" aria-hidden />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No invoices yet</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Generate your first invoice to keep billing records organised.
      </p>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Create invoice
      </Button>
    </div>
  );
}

function InvoicePreview({ invoice }: { invoice: InvoiceRow }) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{invoice.invoiceNumber}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Issued to {invoice.partner}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            Send invoice
          </Button>
        </div>
      </header>

      <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Invoice date</p>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{invoice.date}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Status</p>
          <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusToneMap[invoice.status])}>
            {invoice.status}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Amount</p>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{invoice.amount}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Project reference</p>
          <p className="font-semibold text-slate-900 dark:text-slate-50">Community Health Outreach 2025</p>
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-slate-400">
          <p>Line item</p>
          <p>Amount</p>
        </div>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/60 p-3 dark:bg-slate-800/40">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">Field operations expense</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Medical camp coordination and staff logistics</p>
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-50">₹70,000</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/60 p-3 dark:bg-slate-800/40">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">Program materials</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Educational kits and resources for beneficiaries</p>
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-50">₹35,000</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/60 p-3 dark:bg-slate-800/40">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">Administrative overhead</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Audit compliance and reporting</p>
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-50">₹15,000</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:text-slate-50">
          <span>Total</span>
          <span>{invoice.amount}</span>
        </div>
      </section>

      <section className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
        PDF preview placeholder
      </section>
    </div>
  );
}
