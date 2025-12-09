"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CloudUpload,
  FileText,
  Loader2,
  MessageSquare,
  ShieldCheck,
  UploadCloud,
  XCircle,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DocumentItem {
  id: string;
  label: string;
  status: "Missing" | "Submitted" | "Verified";
  lastUpdated?: string;
  notes?: string;
}

const mockDocuments: DocumentItem[] = [
  {
    id: "doc-80g",
    label: "80G Certificate",
    status: "Verified",
    lastUpdated: "Verified on 12 Nov 2025",
  },
  {
    id: "doc-registration",
    label: "Registration Certificate",
    status: "Submitted",
    lastUpdated: "Uploaded 5 days ago",
    notes: "Review pending with compliance team",
  },
  {
    id: "doc-bank",
    label: "Bank Passbook / Cancelled Cheque",
    status: "Missing",
  },
  {
    id: "doc-pan",
    label: "PAN & Compliance Docs",
    status: "Submitted",
    lastUpdated: "Uploaded yesterday",
  },
];

const statusStyles: Record<DocumentItem["status"], string> = {
  Missing: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
  Submitted: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  Verified: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
};

export default function NGODocumentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!uploadingId) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [uploadingId]);

  const documents = useMemo(() => mockDocuments, []);

  return (
    <div className="space-y-10 pb-12">
      {isLoading ? (
        <Skeleton className="h-5 w-64 rounded-full" />
      ) : (
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard/ngo" },
            { label: "My Documents" },
          ]}
        />
      )}

      <SectionHeader
        title="My Documents"
        subtitle="Keep your compliance paperwork up to date so companies can engage faster."
        action={
          <Button variant="outline" className="gap-2">
            <CloudUpload className="h-4 w-4" />
            Upload new file
          </Button>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <ChecklistCard
            documents={documents}
            isLoading={isLoading}
            uploadingId={uploadingId}
            progress={progress}
            onUpload={(id) => setUploadingId(id)}
          />

          <UploadArea
            isLoading={isLoading}
            onDrop={() => setUploadingId("bulk")}
          />
        </div>

        <CommentSidebar isLoading={isLoading} />
      </section>
    </div>
  );
}

interface ChecklistCardProps {
  documents: DocumentItem[];
  isLoading: boolean;
  uploadingId: string | null;
  progress: number;
  onUpload: (id: string) => void;
}

function ChecklistCard({ documents, isLoading, uploadingId, progress, onUpload }: ChecklistCardProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-3xl" />
        ))}
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-300 bg-white/60 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
        <ShieldCheck className="h-10 w-10 text-emerald-500" aria-hidden />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">You&apos;re all set!</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">All required documents are verified. We&apos;ll notify you if anything needs attention.</p>
        </div>
        <Button className="gap-2">
          <CloudUpload className="h-4 w-4" />
          Upload optional file
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Required documents</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Submit everything to unlock faster approvals.</p>
        </div>
        <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
          {documents.filter((doc) => doc.status === "Verified").length} verified
        </Badge>
      </header>

      <div className="space-y-3">
        {documents.map((doc) => (
          <article
            key={doc.id}
            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/60 dark:border-slate-700 dark:bg-slate-900/60"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{doc.label}</h3>
                {doc.lastUpdated ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">{doc.lastUpdated}</p>
                ) : null}
              </div>
              <Badge className={cn("w-fit rounded-full px-3 py-1 text-xs font-semibold", statusStyles[doc.status])}>
                {doc.status}
              </Badge>
            </div>

            {doc.notes ? (
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-300">
                <MessageSquare className="h-4 w-4" />
                {doc.notes}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => onUpload(doc.id)}
                disabled={uploadingId === doc.id}
              >
                {uploadingId === doc.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UploadCloud className="h-4 w-4" />
                )}
                {doc.status === "Missing" ? "Upload" : "Replace"}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-slate-500">
                <FileText className="h-4 w-4" />
                Preview
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-rose-500">
                <XCircle className="h-4 w-4" />
                Remove
              </Button>
            </div>

            {uploadingId === doc.id ? (
              <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm shadow-inner dark:bg-slate-900/60">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                <p className="text-slate-600 dark:text-slate-300">
                  Uploading… <span className="font-semibold text-emerald-600 dark:text-emerald-300">{progress}%</span>
                </p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

interface UploadAreaProps {
  isLoading: boolean;
  onDrop: () => void;
}

function UploadArea({ isLoading, onDrop }: UploadAreaProps) {
  if (isLoading) {
    return <Skeleton className="h-56 w-full rounded-4xl" />;
  }

  return (
    <div className="rounded-4xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/40 dark:border-slate-700 dark:bg-slate-900/50">
      <CloudUpload className="mx-auto h-12 w-12 text-emerald-500" aria-hidden />
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Drag & drop documents</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">PDF, JPG, PNG up to 15 MB each. You can also browse files from your device.</p>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <Button className="gap-2" onClick={onDrop}>
          <CloudUpload className="h-4 w-4" />
          Select files
        </Button>
        <Button variant="ghost" className="gap-2 text-sm text-slate-500">
          View upload history
        </Button>
      </div>
    </div>
  );
}

interface CommentSidebarProps {
  isLoading: boolean;
}

function CommentSidebar({ isLoading }: CommentSidebarProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <aside className="flex h-full flex-col gap-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Compliance notes</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The ImpactBridge team shares feedback here. Keep an eye on pending comments to stay in good standing.
        </p>
      </header>
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl bg-emerald-50/60 p-4 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
          <p className="font-semibold">Next suggested action</p>
          <p className="mt-1">Upload your bank proof to unlock disbursements into the correct account.</p>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-200 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-3">
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
            <div>
              <p className="font-semibold">12 Nov 2025</p>
              <p>80G document verified successfully. Keep original handy for audits.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="h-4 w-4 text-amber-500" />
            <div>
              <p className="font-semibold">Pending review</p>
              <p>Registration certificate requires clarity on renewal date. Please annotate and re-upload.</p>
            </div>
          </div>
        </div>
      </div>
      <Button asChild variant="outline" className="mt-auto gap-2">
        <Link href="/dashboard/notifications">
          <BadgeCheck className="h-4 w-4" />
          Request manual review
        </Link>
      </Button>
    </aside>
  );
}
