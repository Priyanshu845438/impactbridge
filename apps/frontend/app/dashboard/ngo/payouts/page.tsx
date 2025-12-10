"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarClock,
  CalendarRange,
  CheckCircle2,
  Download,
  Loader2,
  MoreHorizontal,
  Paperclip,
  Plus,
  XCircle,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PayoutRequest {
  id: string;
  amount: string;
  requestedOn: string;
  status: "Pending" | "Approved" | "Rejected" | "Processing";
  eta?: string;
}

const mockRequests: PayoutRequest[] = [
  {
    id: "PR-2025-015",
    amount: "₹2,40,000",
    requestedOn: "14 Oct 2025",
    status: "Processing",
    eta: "21 Oct 2025",
  },
  {
    id: "PR-2025-014",
    amount: "₹1,50,000",
    requestedOn: "05 Oct 2025",
    status: "Approved",
    eta: "10 Oct 2025",
  },
  {
    id: "PR-2025-013",
    amount: "₹90,000",
    requestedOn: "23 Sep 2025",
    status: "Rejected",
  },
];

const statusBadgeMap: Record<PayoutRequest["status"], string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
  Processing: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200",
};

export default function NGOPayoutRequestsPage() {
  const [isLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedRequest, setSelectedRequest] = useState<PayoutRequest | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ amount: "", purpose: "", doc: "" });
  const [isSubmitting, setSubmitting] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "Payout Requests" },
    ],
    [],
  );

  const filtered = useMemo(() => {
    if (selectedStatus === "All") {
      return mockRequests;
    }
    return mockRequests.filter((request) => request.status === selectedStatus);
  }, [selectedStatus]);

  const showEmpty = !isLoading && filtered.length === 0;

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setModalOpen(false);
      setFormState({ amount: "", purpose: "", doc: "" });
    }, 1000);
  }

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />
      <SectionHeader
        title="Payout Requests"
        subtitle="Request fund transfers and track approval progress."
        action={
          <Button className="gap-2" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Request payout
          </Button>
        }
      />

      <Card className="rounded-4xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="space-y-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <input
                type="search"
                placeholder="Search payout requests"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full min-w-[160px] sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2 border-dashed">
              <CalendarRange className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {isLoading ? (
          <PayoutSkeleton />
        ) : showEmpty ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <TableHead>Request ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Requested on</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead className="w-[60px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((request) => (
                  <TableRow key={request.id} className="text-sm text-slate-600 dark:text-slate-300">
                    <TableCell className="font-semibold text-slate-900 dark:text-slate-50">{request.id}</TableCell>
                    <TableCell className="font-medium text-slate-900 dark:text-slate-50">{request.amount}</TableCell>
                    <TableCell>{request.requestedOn}</TableCell>
                    <TableCell>
                      <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusBadgeMap[request.status])}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>{request.eta ?? "—"}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedRequest(request);
                          setDetailOpen(true);
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

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row">
          <p>Showing {filtered.length} of {mockRequests.length} requests</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Previous
            </Button>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">1</span>
            <Button variant="ghost" size="sm">
              Next
            </Button>
          </div>
        </footer>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Request payout"
        description="Submit a payout request for funds received across your campaigns."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Amount</label>
            <Input
              placeholder="₹0.00"
              value={formState.amount}
              onChange={(event) => setFormState((prev) => ({ ...prev, amount: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Purpose / notes</label>
            <Textarea
              rows={3}
              placeholder="Explain how the funds will be used"
              value={formState.purpose}
              onChange={(event) => setFormState((prev) => ({ ...prev, purpose: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Supporting document (optional)</label>
            <Button variant="outline" className="w-full justify-between">
              <span>Attach document</span>
              <Paperclip className="h-4 w-4" />
            </Button>
            {formState.doc ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">{formState.doc}</p>
            ) : null}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              Submit request
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={isDetailOpen}
        onClose={() => setDetailOpen(false)}
        title="Payout request details"
        description="Review the timeline and download official receipts."
        size="lg"
      >
        {selectedRequest ? <PayoutDetail request={selectedRequest} onCancel={() => setDetailOpen(false)} /> : null}
      </Modal>
    </div>
  );
}

function PayoutSkeleton() {
  return (
    <div className="space-y-2 px-6 py-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full rounded-3xl" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <CalendarClock className="h-12 w-12 text-slate-300" aria-hidden />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No payout requests yet</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">Submit your first request to start tracking approvals.</p>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Request payout
      </Button>
    </div>
  );
}

function PayoutDetail({ request, onCancel }: { request: PayoutRequest; onCancel: () => void }) {
  const timeline = [
    {
      label: "Request submitted",
      timestamp: "14 Oct 2025, 10:12 AM",
      icon: Plus,
      tone: "bg-sky-500/10 text-sky-500",
    },
    {
      label: request.status === "Rejected" ? "Request rejected" : "Review in progress",
      timestamp: "15 Oct 2025, 04:36 PM",
      icon: request.status === "Rejected" ? XCircle : Loader2,
      tone: request.status === "Rejected" ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500",
    },
    request.status === "Approved"
      ? {
          label: "Approved by ImpactBridge",
          timestamp: "17 Oct 2025, 09:00 AM",
          icon: CheckCircle2,
          tone: "bg-emerald-500/10 text-emerald-500",
        }
      : null,
  ].filter(Boolean) as Array<{ label: string; timestamp: string; icon: React.ComponentType<{ className?: string }>; tone: string }>;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Request ID</p>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{request.id}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Amount</p>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{request.amount}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Requested on</p>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{request.requestedOn}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Status</p>
          <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusBadgeMap[request.status])}>
            {request.status}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Estimated transfer</p>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{request.eta ?? "TBC"}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Timeline</h4>
        <ol className="space-y-4">
          {timeline.map((item, index) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className={cn("mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full", item.tone)}>
                <item.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.timestamp}</p>
                {index < timeline.length - 1 ? (
                  <div className="ml-4 mt-3 h-6 border-l border-dashed border-slate-300 dark:border-slate-700" />
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <Download className="h-4 w-4" />
          <span>Download receipt</span>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </section>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Close
        </Button>
        <Button variant="outline" className="gap-2 border-rose-500 text-rose-600 hover:bg-rose-500/10 dark:border-rose-400 dark:text-rose-200">
          <AlertCircle className="h-4 w-4" />
          Cancel request
        </Button>
      </div>
    </div>
  );
}
