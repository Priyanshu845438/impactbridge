"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle, XCircle, RotateCcw, MessageSquare, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  usePendingApprovals,
  useApproveCampaign,
  useRejectCampaign,
  useRevokeApproval,
} from "@/lib/hooks/use-approvals";

export default function AdminApprovalsModulePage() {
  const { approvals, isLoading, isFetching, error, isEnabled, refetch } = usePendingApprovals();

  const showSkeleton = isLoading || isFetching;
  const hasData = approvals.length > 0;
  const showErrorFallback = Boolean(error) || !isEnabled;

  return (
    <section className="space-y-6 pb-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="Approvals Management"
          subtitle="Review, approve, reject, or revoke CSR campaign and milestone funding proposals."
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          Refresh List
        </Button>
      </div>

      <hr className="border-slate-200 dark:border-slate-800" />

      {showSkeleton ? <ApprovalsSkeleton /> : null}

      {!showSkeleton && showErrorFallback ? (
        <EmptyState
          title="Approvals currently unavailable"
          description="Live approval records could not be loaded. Please ensure the API_DASHBOARD feature flag is enabled in System Settings."
        />
      ) : null}

      {!showSkeleton && !showErrorFallback && !hasData ? (
        <EmptyState
          title="No pending approvals"
          description="You're all caught up! New campaigns submitted by NGOs will appear here for verification and sign-off."
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
    <div className="space-y-3 rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
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
    <div className="rounded-3xl border border-dashed border-slate-200/80 bg-white/70 p-8 text-center text-slate-500 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
      <AlertCircle className="mx-auto h-8 w-8 text-slate-400 mb-2" />
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
      <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">{description}</p>
    </div>
  );
}

type ApprovalRow = ReturnType<typeof usePendingApprovals>["approvals"][number];

function ApprovalsTable({ approvals }: { approvals: ApprovalRow[] }) {
  const approveMutation = useApproveCampaign();
  const rejectMutation = useRejectCampaign();
  const revokeMutation = useRevokeApproval();

  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState<string>("");
  const [rejectingApprovalId, setRejectingApprovalId] = useState<string | null>(null);

  const handleApprove = async (approval: ApprovalRow) => {
    setActiveActionId(approval.id);
    try {
      await approveMutation.mutateAsync({
        campaignId: approval.campaign.id,
        payload: { remarks: "Approved by Administrator via Portal" },
      });
      toast.success(`Campaign "${approval.campaign.title}" approved successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve campaign.");
    } finally {
      setActiveActionId(null);
    }
  };

  const handleConfirmReject = async (approval: ApprovalRow) => {
    if (!rejectRemarks.trim()) {
      toast.error("Please enter a reason or remarks for rejection.");
      return;
    }

    setActiveActionId(approval.id);
    try {
      await rejectMutation.mutateAsync({
        campaignId: approval.campaign.id,
        payload: { remarks: rejectRemarks },
      });
      toast.success(`Campaign "${approval.campaign.title}" has been rejected.`);
      setRejectingApprovalId(null);
      setRejectRemarks("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject campaign.");
    } finally {
      setActiveActionId(null);
    }
  };

  const handleRevoke = async (approval: ApprovalRow) => {
    setActiveActionId(approval.id);
    try {
      await revokeMutation.mutateAsync({
        campaignId: approval.campaign.id,
        payload: { remarks: "Approval revoked by Administrator." },
      });
      toast.success(`Approval for "${approval.campaign.title}" has been revoked.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to revoke approval.");
    } finally {
      setActiveActionId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-3.5">Campaign & NGO</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Submitted</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-600 dark:divide-slate-800 dark:text-slate-300">
            {approvals.map((approval) => {
              const isProcessing = activeActionId === approval.id;
              const isRejectingThis = rejectingApprovalId === approval.id;

              return (
                <tr key={approval.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {approval.campaign.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      NGO: <span className="font-medium text-slate-700 dark:text-slate-300">{approval.ngo.name}</span> ({approval.ngo.email})
                    </div>
                    {approval.remarks && (
                      <div className="mt-1 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md inline-block">
                        Remarks: {approval.remarks}
                      </div>
                    )}

                    {/* Inline Rejection Modal/Drawer */}
                    {isRejectingThis && (
                      <div className="mt-3 p-3 bg-rose-50/80 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 space-y-2 max-w-md">
                        <label className="text-xs font-medium text-rose-800 dark:text-rose-300 flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" /> Rejection Remarks (Required):
                        </label>
                        <Input
                          placeholder="e.g. 12A tax exemption expired; please upload latest renewal."
                          value={rejectRemarks}
                          onChange={(e) => setRejectRemarks(e.target.value)}
                          className="text-xs h-8 bg-white dark:bg-slate-900"
                        />
                        <div className="flex items-center gap-2 pt-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs px-2.5 bg-rose-600 text-white hover:bg-rose-700 border-rose-600"
                            onClick={() => handleConfirmReject(approval)}
                            disabled={isProcessing}
                          >
                            Confirm Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs px-2.5"
                            onClick={() => {
                              setRejectingApprovalId(null);
                              setRejectRemarks("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={approval.status} />
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-500">
                    {formatDistanceToNow(new Date(approval.updatedAt), { addSuffix: true })}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {approval.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950 border-emerald-200 gap-1"
                            onClick={() => handleApprove(approval)}
                            disabled={isProcessing}
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs font-medium text-rose-700 hover:text-rose-800 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950 border-rose-200 gap-1"
                            onClick={() => {
                              setRejectingApprovalId(approval.id);
                              setRejectRemarks("");
                            }}
                            disabled={isProcessing}
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Reject
                          </Button>
                        </>
                      )}

                      {approval.status === "APPROVED" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-slate-600 hover:text-rose-600 hover:bg-rose-50 gap-1"
                          onClick={() => handleRevoke(approval)}
                          disabled={isProcessing}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Revoke
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  REVOKED: "Revoked",
};

const STATUS_TONE: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
  REVOKED: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
};

function StatusBadge({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? STATUS_TONE.PENDING;
  const label = STATUS_LABELS[status] ?? status;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tone}`}>
      {label}
    </span>
  );
}
