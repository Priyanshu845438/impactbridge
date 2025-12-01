"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FileText, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { SkeletonCard, SkeletonText } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DocumentStatus = "Uploaded" | "Pending Review" | "Approved" | "Rejected" | "Missing";

interface NgoDocument {
  id: string;
  name: string;
  status: DocumentStatus;
  uploadedAt?: string;
  uploadedBy?: string;
  fileType: "pdf" | "image";
  notes?: string;
}

interface NgoDocumentProfile {
  id: string;
  ngoName: string;
  registrationId: string;
  documents: NgoDocument[];
}

const mockNgoDocuments: Record<string, NgoDocumentProfile> = {
  "ngo-001": {
    id: "ngo-001",
    ngoName: "Swasthya Seva Foundation",
    registrationId: "NGO-IND-2021-0098",
    documents: [
      {
        id: "doc-1",
        name: "PAN",
        status: "Approved",
        uploadedAt: "05 Feb 2025",
        uploadedBy: "Ananya Rao",
        fileType: "pdf",
        notes: "Verified PAN matching registration.",
      },
      {
        id: "doc-2",
        name: "80G Certificate",
        status: "Pending Review",
        uploadedAt: "08 Feb 2025",
        uploadedBy: "Ananya Rao",
        fileType: "pdf",
        notes: "Awaiting finance team confirmation.",
      },
      {
        id: "doc-3",
        name: "CSR-1",
        status: "Uploaded",
        uploadedAt: "10 Feb 2025",
        uploadedBy: "ImpactBridge Intake",
        fileType: "pdf",
      },
      {
        id: "doc-4",
        name: "Registration Proof",
        status: "Approved",
        uploadedAt: "05 Feb 2025",
        uploadedBy: "Compliance Bot",
        fileType: "image",
      },
      {
        id: "doc-5",
        name: "Audit Report FY 23-24",
        status: "Missing",
        fileType: "pdf",
      },
    ],
  },
  "ngo-002": {
    id: "ngo-002",
    ngoName: "Prerna Women Collective",
    registrationId: "NGO-IND-2023-0412",
    documents: [
      {
        id: "doc-6",
        name: "PAN",
        status: "Approved",
        uploadedAt: "12 Jan 2025",
        uploadedBy: "Meera Singh",
        fileType: "pdf",
      },
      {
        id: "doc-7",
        name: "FCRA Certificate",
        status: "Pending Review",
        uploadedAt: "09 Feb 2025",
        uploadedBy: "Meera Singh",
        fileType: "pdf",
        notes: "Requires board verification update.",
      },
      {
        id: "doc-8",
        name: "Audit Report FY 23-24",
        status: "Rejected",
        uploadedAt: "02 Feb 2025",
        uploadedBy: "Finance Reviewer",
        fileType: "pdf",
        notes: "Signatory mismatch, ask to reupload.",
      },
    ],
  },
};

const statuses: Array<"all" | DocumentStatus> = [
  "all",
  "Uploaded",
  "Pending Review",
  "Approved",
  "Rejected",
  "Missing",
];

const statusTone: Record<DocumentStatus, string> = {
  Uploaded: "bg-slate-100 text-slate-700",
  "Pending Review": "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
  Missing: "bg-slate-200 text-slate-600",
};

export default function NgoDocumentsPage() {
  const params = useParams();
  const router = useRouter();
  const ngoId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  const profile = ngoId ? mockNgoDocuments[ngoId] : undefined;

  useEffect(() => {
    if (ngoId && !profile) {
      notFound();
    }
  }, [ngoId, profile]);

  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<(typeof statuses)[number]>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<NgoDocument | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredDocuments = useMemo(() => {
    if (!profile) {
      return [] as NgoDocument[];
    }
    const query = searchQuery.trim().toLowerCase();
    return profile.documents.filter((document) => {
      const matchesStatus = statusFilter === "all" || document.status === statusFilter;
      const matchesQuery = query.length === 0 || document.name.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [profile, searchQuery, statusFilter]);

  if (!profile) {
    return null;
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonText lines={2} className="w-64" />
        <SkeletonCard className="h-20" />
        <SkeletonCard className="h-[360px]" />
      </div>
    );
  }

  const handleApprove = () => {
    if (!selectedDocument) return;
    toast.success(`${selectedDocument.name} approved (mock)`);
    setSelectedDocument(null);
  };

  const handleReject = () => {
    if (!selectedDocument) return;
    toast.error(`${selectedDocument.name} rejected (mock)`);
    setSelectedDocument(null);
  };

  const handleRequestUpdate = () => {
    if (!selectedDocument) return;
    toast.info(`Requested update for ${selectedDocument.name} (mock)`);
    setSelectedDocument(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`${profile.ngoName} · Documents`}
        subtitle="Review submitted compliance evidence and keep NGO records audit-ready."
        action={
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            Back
          </Button>
        }
      />

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition focus-within:border-slate-300 focus-within:shadow">
          <Search className="h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search document type"
            className="border-none p-0 text-sm shadow-none focus-visible:ring-0"
          />
        </div>

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as (typeof statuses)[number])}>
          <SelectTrigger className="w-full min-w-[200px] rounded-full border-slate-200 bg-white md:w-auto">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "all" ? "All statuses" : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 py-16 text-center text-slate-500">
          <FileText className="h-10 w-10 text-slate-400" />
          <p className="mt-4 text-sm font-semibold">No documents match the current filters.</p>
          <p className="mt-1 text-xs">Try adjusting the status filter or search query.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded by</TableHead>
                <TableHead>Uploaded on</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id} className="text-sm text-slate-700">
                  <TableCell className="font-semibold text-slate-900">{document.name}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusTone[document.status])}>
                      {document.status}
                    </span>
                  </TableCell>
                  <TableCell>{document.uploadedBy ?? "—"}</TableCell>
                  <TableCell>{document.uploadedAt ?? "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setSelectedDocument(document)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Drawer
        open={Boolean(selectedDocument)}
        onClose={() => setSelectedDocument(null)}
        title={selectedDocument?.name}
        description={selectedDocument ? `${profile.ngoName} · ${profile.registrationId}` : undefined}
        footer={
          selectedDocument ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <Button variant="outline" className="gap-2" onClick={handleRequestUpdate}>
                Request Update
              </Button>
              <Button variant="outline" className="gap-2 border-rose-200 text-rose-600 hover:bg-rose-50" onClick={handleReject}>
                Reject
              </Button>
              <Button className="gap-2" onClick={handleApprove}>
                Approve
              </Button>
            </div>
          ) : null
        }
      >
        {selectedDocument ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <Badge variant="outline" className={cn("border px-3 py-1", statusTone[selectedDocument.status])}>
                {selectedDocument.status}
              </Badge>
              <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                {selectedDocument.fileType.toUpperCase()} preview
              </span>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600">
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Uploaded by</span>
                  <p className="mt-1 font-medium text-slate-800">{selectedDocument.uploadedBy ?? "Not provided"}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Uploaded on</span>
                  <p className="mt-1 font-medium text-slate-800">{selectedDocument.uploadedAt ?? "Not provided"}</p>
                </div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Notes</span>
                <p className="mt-1 leading-relaxed text-slate-600">
                  {selectedDocument.notes ?? "No reviewer notes attached yet."}
                </p>
              </div>
            </div>

            <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-400">
              <div className="text-center">
                <FileText className="mx-auto h-10 w-10" />
                <p className="mt-2 text-sm">Document preview placeholder</p>
                <p className="text-xs">Embed PDF/image viewer once backend storage integrates.</p>
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
