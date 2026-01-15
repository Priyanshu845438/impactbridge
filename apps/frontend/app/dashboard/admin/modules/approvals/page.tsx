"use client";

import { formatDistanceToNow } from "date-fns";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { usePendingApprovals } from "@/lib/hooks/use-approvals";

export default function AdminApprovalsModulePage() {
  const { approvals, isLoading, isFetching, error, isEnabled } = usePendingApprovals();

  const showSkeleton = isLoading || isFetching;
  const hasData = approvals.length > 0;
  const showErrorFallback = Boolean(error) || !isEnabled;

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Approvals overview"
        subtitle="Review and monitor campaign approvals awaiting action."
      />
      <hr className="border-slate-200" />

      {showSkeleton ? (
        <ApprovalsSkeleton />
      ) : null}

      {!showSkeleton && showErrorFallback ? (
        <EmptyState
          title="Approvals currently unavailable"
          description="Live approval records could not be loaded. Once the dashboard API flag is enabled, this section will surface pending approvals automatically."
        />
      ) : null}

      {!showSkeleton && !showErrorFallback && !hasData ? (
        <EmptyState
          title="No pending approvals"
          description="You're all caught up. New approvals will appear here as NGOs submit campaign requests."
        />
      ) : null}

      {!showSkeleton && !showErrorFallback && hasData ? (
        <ApprovalsTable approvals={approvals} />
      ) : null}
    </section>
  );
}

function ApprovalsSkeleton() {
  return (
    <div className="space-y-3 rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-5 w-32 rounded-full" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200/80 bg-white/70 p-6 text-center text-slate-500 shadow-sm backdrop-blur-sm">
      <h3 className="text-heading-4 text-slate-600">{title}</h3>
      <p className="mt-2 text-small text-slate-500">{description}</p>
    </div>
  );
}

type ApprovalRow = ReturnType<typeof usePendingApprovals>["approvals"][number];

function ApprovalsTable({ approvals }: { approvals: ApprovalRow[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50/70 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-6 py-3">Approval ID</th>
            <th className="px-6 py-3">Campaign</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Last updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm text-slate-600">
          {approvals.map((approval) => (
            <tr key={approval.id} className="hover:bg-slate-50/80">
              <td className="px-6 py-4 font-mono text-xs text-slate-500">{approval.id}</td>
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-700">{approval.campaign.title}</div>
                {approval.campaign.description ? (
                  <div className="text-xs text-slate-500">{approval.campaign.description}</div>
                ) : null}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={approval.status} />
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {formatDistanceToNow(new Date(approval.updatedAt), { addSuffix: true })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  REVOKED: "Revoked",
};

const STATUS_TONE: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
  REVOKED: "bg-slate-50 text-slate-600 border-slate-200",
};

function StatusBadge({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? STATUS_TONE.PENDING;
  const label = STATUS_LABELS[status] ?? status;
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>
      {label}
    </span>
  );
}
