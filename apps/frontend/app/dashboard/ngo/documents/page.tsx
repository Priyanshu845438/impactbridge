"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CloudUpload,
  FileText,
  Loader2,
  MessageSquare,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

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

const initialDocuments: DocumentItem[] = [
  {
    id: "doc-80g",
    label: "80G Tax Exemption Certificate",
    status: "Verified",
    lastUpdated: "Verified on 12 Nov 2025",
  },
  {
    id: "doc-12a",
    label: "12A Registration Certificate",
    status: "Submitted",
    lastUpdated: "Uploaded 5 days ago",
    notes: "Review pending with compliance audit team",
  },
  {
    id: "doc-bank",
    label: "Bank Passbook / Cancelled Cheque",
    status: "Missing",
  },
  {
    id: "doc-pan",
    label: "NGO PAN & Legal Registration Deed",
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
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const targetDocIdRef = useRef<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const triggerUpload = (docId: string) => {
    targetDocIdRef.current = docId;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const docId = targetDocIdRef.current ?? "bulk";
    setUploadingId(docId);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadingId(null);

          // Update document status
          if (docId !== "bulk") {
            setDocuments((prevDocs) =>
              prevDocs.map((d) =>
                d.id === docId
                  ? {
                      ...d,
                      status: "Submitted",
                      lastUpdated: `Uploaded just now (${file.name})`,
                      notes: "Under administrative compliance verification",
                    }
                  : d,
              ),
            );
          } else {
            // New upload added
            const newDoc: DocumentItem = {
              id: `doc-${Date.now()}`,
              label: file.name.replace(/\.[^/.]+$/, ""),
              status: "Submitted",
              lastUpdated: "Uploaded just now",
              notes: "Uploaded for compliance review",
            };
            setDocuments((prevDocs) => [newDoc, ...prevDocs]);
          }

          toast.success(`"${file.name}" uploaded successfully for verification!`);
          return 100;
        }
        return prev + 25;
      });
    }, 150);

    // Reset file input
    e.target.value = "";
  };

  const handleRemove = (id: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "Missing",
              lastUpdated: undefined,
              notes: undefined,
            }
          : d,
      ),
    );
    toast.info("Document removed. Please upload valid proof to remain in good standing.");
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hidden file input for real uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        className="hidden"
      />

      {isLoading ? (
        <Skeleton className="h-5 w-64 rounded-full" />
      ) : (
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard/ngo" },
            { label: "Compliance Documents" },
          ]}
        />
      )}

      <SectionHeader
        title="Compliance & Regulatory Documents"
        subtitle="Keep statutory tax exemption (12A, 80G), PAN, and bank documents up to date for corporate disbursements."
        action={
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => triggerUpload("bulk")}
          >
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
            onUpload={triggerUpload}
            onRemove={handleRemove}
          />

          <UploadArea
            isLoading={isLoading}
            onDrop={() => triggerUpload("bulk")}
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
  onRemove: (id: string) => void;
}

function ChecklistCard({
  documents,
  isLoading,
  uploadingId,
  progress,
  onUpload,
  onRemove,
}: ChecklistCardProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const verifiedCount = documents.filter((doc) => doc.status === "Verified").length;

  return (
    <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Document Checklist</h2>
          <p className="text-xs text-slate-500">Government compliance documents required under Section 135.</p>
        </div>
        <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
          {verifiedCount} of {documents.length} verified
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
                ) : (
                  <p className="text-xs text-rose-500 font-medium">Pending upload</p>
                )}
              </div>
              <Badge className={cn("w-fit rounded-full px-3 py-1 text-xs font-semibold", statusStyles[doc.status])}>
                {doc.status}
              </Badge>
            </div>

            {doc.notes ? (
              <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200/50">
                <MessageSquare className="h-4 w-4 shrink-0" />
                {doc.notes}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs"
                onClick={() => onUpload(doc.id)}
                disabled={uploadingId === doc.id}
              >
                {uploadingId === doc.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <UploadCloud className="h-3.5 w-3.5" />
                )}
                {doc.status === "Missing" ? "Upload" : "Replace"}
              </Button>
              {doc.status !== "Missing" && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs text-slate-600 hover:text-slate-900"
                    onClick={() => toast.info(`Viewing compliance certificate for ${doc.label}`)}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Preview
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    onClick={() => onRemove(doc.id)}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Remove
                  </Button>
                </>
              )}
            </div>

            {uploadingId === doc.id ? (
              <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm shadow-inner dark:bg-slate-900/60">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                <p className="text-slate-600 dark:text-slate-300 text-xs">
                  Encrypting and uploading to storage vault…{" "}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">{progress}%</span>
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
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Drag & drop compliance documents</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">PDF, JPG, PNG up to 15 MB each. Encrypted in cloud storage vault.</p>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <Button className="gap-2 text-xs" onClick={onDrop}>
          <CloudUpload className="h-4 w-4" />
          Select files
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
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">Compliance Notes</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The audit committee shares remarks here. Keep paperwork verified to receive CSR funding disbursements.
        </p>
      </header>
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl bg-emerald-50/60 p-4 text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
          <p className="font-semibold">Next suggested action</p>
          <p className="mt-1">Upload your bank passbook/cancelled cheque to verify account credentials for payouts.</p>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-200 p-4 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2.5">
            <BadgeCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">12 Nov 2025</p>
              <p>80G tax exemption document verified successfully. Valid for financial year.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MessageSquare className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">12A Renewal Review</p>
              <p>Registration renewal date is being verified with IT portal.</p>
            </div>
          </div>
        </div>
      </div>
      <Button asChild variant="outline" className="mt-auto gap-2 text-xs">
        <Link href="/dashboard/notifications">
          <BadgeCheck className="h-4 w-4" />
          View audit alerts
        </Link>
      </Button>
    </aside>
  );
}
