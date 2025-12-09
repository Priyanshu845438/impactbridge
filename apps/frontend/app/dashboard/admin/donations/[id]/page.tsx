"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BadgeCheck,
  Download,
  IndianRupee,
  Mail,
  Printer,
  QrCode,
  Receipt,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DONATIONS = [
  {
    id: "txn-5012",
    donorName: "Aarav Mehta",
    donorEmail: "aarav.mehta@email.com",
    campaignName: "Urban Shelter Expansion",
    campaignId: "cmp-101",
    status: "Success" as const,
    amount: "₹1,50,000",
    mode: "UPI" as const,
    transactionRef: "UPI/ICIC/2025-02-24-1450",
    timestamp: "24 Jan 2025 • 14:50 IST",
    pan: "ABCDE1234F",
    ngoName: "City Shelter Trust",
    ngoId: "ngo-001",
    companyName: "Zdxy Pvt Ltd",
    companyId: "comp-001",
  },
  {
    id: "txn-4721",
    donorName: "Rahul Banerjee",
    donorEmail: "rahul.banerjee@email.com",
    campaignName: "Clean Water Initiative",
    campaignId: "cmp-104",
    status: "Pending" as const,
    amount: "₹85,000",
    mode: "Bank" as const,
    transactionRef: "NEFT/HDFC/2025-02-03-0912",
    timestamp: "03 Feb 2025 • 09:12 IST",
    pan: null,
    ngoName: "Blue River Welfare",
    ngoId: "ngo-004",
    companyName: "Axis CSR Trust",
    companyId: "comp-003",
  },
] as const;

type DonationRecord = (typeof DONATIONS)[number];

const STATUS_TONE: Record<DonationRecord["status"], string> = {
  Success: "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-600/40 dark:bg-emerald-500/10 dark:text-emerald-200",
  Pending: "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-600/40 dark:bg-amber-500/10 dark:text-amber-200",
  Failed: "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-600/40 dark:bg-rose-500/10 dark:text-rose-200",
};

function findDonationById(id: string | undefined) {
  if (!id) return undefined;
  return DONATIONS.find((donation) => donation.id === id);
}

export default function DonationReceiptPage() {
  const params = useParams();
  const donationId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [sending, setSending] = useState(false);

  const donation = useMemo(() => findDonationById(donationId), [donationId]);

  if (!donationId) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-32 w-full rounded-3xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="space-y-6 text-center">
        <Skeleton className="mx-auto h-20 w-20 rounded-full" />
        <p className="text-lg font-semibold text-slate-600">Donation not found</p>
        <p className="text-sm text-slate-500">The receipt you are trying to access does not exist or has been archived.</p>
        <Button asChild>
          <Link href="/dashboard/admin/donations">Back to Donations</Link>
        </Button>
      </div>
    );
  }

  const handleResend = () => {
    setSending(true);
    setTimeout(() => setSending(false), 600);
  };

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "All Donations", href: "/dashboard/admin/donations" },
          { label: donation.id },
        ]}
      />

      <SectionHeader
        title="Donation receipt"
        subtitle="Review transaction details, verify compliance, and share receipts with stakeholders."
        action={
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download receipt
            </Button>
            <Button type="button" variant="outline" className="gap-2" onClick={handleResend} disabled={sending}>
              <Mail className={sending ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
              {sending ? "Sending…" : "Resend email"}
            </Button>
            <Button type="button" className="gap-2">
              <BadgeCheck className="h-4 w-4" />
              Mark verified
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{donation.donorName}</CardTitle>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Receipt className="h-4 w-4 text-slate-400" />
                {donation.campaignName}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
              <span className="inline-flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-slate-400" />
                {donation.amount}
              </span>
            </div>
          </div>
          <Badge variant="outline" className={`border ${STATUS_TONE[donation.status] ?? STATUS_TONE.Success}`}>
            {donation.status}
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[2fr,3fr]">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <DetailRow label="Transaction ID" value={donation.transactionRef} />
            <DetailRow label="Date & time" value={donation.timestamp} />
            <DetailRow label="Payment mode" value={donation.mode} />
            <DetailRow label="PAN number" value={donation.pan ?? "Not provided"} subtle={!donation.pan} />
            <DetailRow
              label="NGO beneficiary"
              value={
                <Link href={`/dashboard/admin/ngos/${donation.ngoId}`} className="text-brand-600 transition hover:text-brand-700">
                  {donation.ngoName}
                </Link>
              }
            />
            <DetailRow
              label="Company on record"
              value={
                <Link
                  href={`/dashboard/admin/companies/${donation.companyId}`}
                  className="text-brand-600 transition hover:text-brand-700"
                >
                  {donation.companyName}
                </Link>
              }
            />
            <DetailRow
              label="Donor contact"
              value={
                <a href={`mailto:${donation.donorEmail}`} className="text-brand-600 transition hover:text-brand-700">
                  {donation.donorEmail}
                </a>
              }
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Receipt preview</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">ImpactBridge Foundation</p>
                <p className="text-xs text-slate-500">CSR Donation Receipt</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900/60">
                <Printer className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-6 space-y-2 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <PreviewRow label="Receipt ID" value={donation.id} />
              <PreviewRow label="Donor" value={donation.donorName} />
              <PreviewRow label="Campaign" value={donation.campaignName} />
              <PreviewRow label="Amount" value={donation.amount} emphasize />
              <PreviewRow label="Payment mode" value={donation.mode} />
              <PreviewRow label="Date" value={donation.timestamp} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50">
                <QrCode className="mx-auto h-16 w-16 text-slate-400" />
                <p className="mt-2">QR code placeholder</p>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50">
                <p>Authorised signature</p>
                <div className="mt-6 h-12 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50" />
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              This is a mock receipt layout. Integrate with PDF generator and digital signatures when backend endpoints are ready.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailRow({
  label,
  value,
  subtle = false,
}: {
  label: string;
  value: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <div className={`text-sm ${subtle ? "text-slate-400" : "text-slate-700 dark:text-slate-200"}`}>{value}</div>
    </div>
  );
}

function PreviewRow({ label, value, emphasize = false }: { label: string; value: React.ReactNode; emphasize?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">{label}</span>
      <span className={`text-sm font-semibold ${emphasize ? "text-emerald-600" : "text-slate-600 dark:text-slate-200"}`}>{value}</span>
    </div>
  );
}
