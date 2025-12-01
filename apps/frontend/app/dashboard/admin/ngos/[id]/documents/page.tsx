"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  EllipsisVertical,
  FileText,
  MessageCircle,
  MessageSquareReply,
  Search,
  ShieldCheck,
  Tag,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

type DocumentStatus =
  | "Uploaded"
  | "Pending Review"
  | "Approved"
  | "Rejected"
  | "Missing"
  | "Update Requested";

interface DocumentVersion {
  id: string;
  label: string;
  uploadedAt: string;
  uploadedBy: string;
  fileType: "pdf" | "image";
  notes?: string;
}

interface NgoDocument {
  id: string;
  name: string;
  status: DocumentStatus;
  uploadedAt?: string;
  uploadedBy?: string;
  fileType: "pdf" | "image";
  notes?: string;
  tags?: string[];
  versions?: DocumentVersion[];
}

interface NgoDocumentProfile {
  id: string;
  ngoName: string;
  registrationId: string;
  documents: NgoDocument[];
}

type ActionType = "approve" | "reject" | "update";

type DocumentActivity = {
  id: string;
  message: string;
  timestamp: string;
  tone: "info" | "success" | "danger" | "warning";
};

type CommentStatus = "Open" | "Resolved" | "Needs revision";

interface CommentEntry {
  id: string;
  author: string;
  avatar?: string;
  timestamp: string;
  status: CommentStatus;
  message: string;
  section: string;
  replies?: CommentEntry[];
}

const availableTags = ["Legal", "Financial", "Compliance", "Personal"] as const;

const mockNgoDocuments: Record<
  string,
  NgoDocumentProfile & {
    activities: Record<string, DocumentActivity[]>;
    comments: Record<string, CommentEntry[]>;
  }
> = {
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
        tags: ["Compliance", "Personal"],
        versions: [
          {
            id: "doc-1-v1",
            label: "Version 1",
            uploadedAt: "03 Feb 2025",
            uploadedBy: "Ananya Rao",
            fileType: "pdf",
            notes: "Initial submission from NGO portal.",
          },
        ],
      },
      {
        id: "doc-2",
        name: "80G Certificate",
        status: "Pending Review",
        uploadedAt: "08 Feb 2025",
        uploadedBy: "Ananya Rao",
        fileType: "pdf",
        notes: "Awaiting finance team confirmation.",
        tags: ["Financial", "Compliance"],
        versions: [
          {
            id: "doc-2-v1",
            label: "Original upload",
            uploadedAt: "01 Feb 2025",
            uploadedBy: "Ananya Rao",
            fileType: "pdf",
            notes: "Initial 80G upload before revision.",
          },
        ],
      },
      {
        id: "doc-3",
        name: "CSR-1",
        status: "Uploaded",
        uploadedAt: "10 Feb 2025",
        uploadedBy: "ImpactBridge Intake",
        fileType: "pdf",
        tags: ["Compliance"],
        versions: [],
      },
      {
        id: "doc-4",
        name: "Registration Proof",
        status: "Approved",
        uploadedAt: "05 Feb 2025",
        uploadedBy: "Compliance Bot",
        fileType: "image",
        tags: ["Legal"],
        versions: [
          {
            id: "doc-4-v1",
            label: "Scan upload",
            uploadedAt: "28 Jan 2025",
            uploadedBy: "Compliance Bot",
            fileType: "image",
          },
        ],
      },
      {
        id: "doc-5",
        name: "Audit Report FY 23-24",
        status: "Missing",
        fileType: "pdf",
        tags: ["Financial"],
        versions: [],
      },
    ],
    activities: {
      "doc-1": [
        {
          id: "doc-1-activity-1",
          message: "Admin approved this document at 09:40 AM",
          timestamp: "05 Feb 2025",
          tone: "success",
        },
        {
          id: "doc-1-activity-2",
          message: "Compliance bot verified PAN metadata",
          timestamp: "05 Feb 2025",
          tone: "info",
        },
        {
          id: "doc-1-activity-3",
          message: "Document uploaded by Ananya Rao",
          timestamp: "05 Feb 2025",
          tone: "info",
        },
      ],
      "doc-2": [
        {
          id: "doc-2-activity-1",
          message: "Finance reviewer marked document pending at 03:15 PM",
          timestamp: "08 Feb 2025",
          tone: "warning",
        },
        {
          id: "doc-2-activity-2",
          message: "Document uploaded by Ananya Rao",
          timestamp: "08 Feb 2025",
          tone: "info",
        },
      ],
      "doc-3": [
        {
          id: "doc-3-activity-1",
          message: "CSR-1 uploaded by ImpactBridge Intake",
          timestamp: "10 Feb 2025",
          tone: "info",
        },
      ],
      "doc-4": [
        {
          id: "doc-4-activity-1",
          message: "Compliance bot approved registration proof",
          timestamp: "05 Feb 2025",
          tone: "success",
        },
      ],
      "doc-5": [
        {
          id: "doc-5-activity-1",
          message: "Audit report pending upload reminder sent",
          timestamp: "11 Feb 2025",
          tone: "warning",
        },
      ],
    },
    comments: {
      "doc-1": [
        {
          id: "comment-1",
          author: "Karan Patel",
          timestamp: "12 Feb 2025 · 09:10 AM",
          status: "Resolved",
          message: "Confirmed PAN details against Income Tax records. No discrepancies found.",
          section: "pan-heading",
          replies: [
            {
              id: "reply-1",
              author: "Ananya Rao",
              timestamp: "12 Feb 2025 · 09:24 AM",
              status: "Resolved",
              message: "Thanks for cross-checking. Closing this thread.",
              section: "pan-heading",
            },
          ],
        },
        {
          id: "comment-2",
          author: "Finance Review",
          timestamp: "12 Feb 2025 · 11:45 AM",
          status: "Open",
          message: "Please upload the signed declaration page as well for our archives.",
          section: "pan-attachment",
        },
      ],
      "doc-2": [
        {
          id: "comment-3",
          author: "Compliance Bot",
          timestamp: "13 Feb 2025 · 08:02 AM",
          status: "Needs revision",
          message: "Stamp imprint is slightly faded on page 3. Kindly re-scan at higher contrast.",
          section: "80g-page-3",
        },
      ],
    },
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
        tags: ["Compliance", "Personal"],
        versions: [
          {
            id: "doc-6-v1",
            label: "Earlier upload",
            uploadedAt: "05 Jan 2025",
            uploadedBy: "Meera Singh",
            fileType: "pdf",
          },
        ],
      },
      {
        id: "doc-7",
        name: "FCRA Certificate",
        status: "Pending Review",
        uploadedAt: "09 Feb 2025",
        uploadedBy: "Meera Singh",
        fileType: "pdf",
        notes: "Requires board verification update.",
        tags: ["Legal", "Compliance"],
        versions: [
          {
            id: "doc-7-v1",
            label: "Submission draft",
            uploadedAt: "02 Feb 2025",
            uploadedBy: "Meera Singh",
            fileType: "pdf",
          },
        ],
      },
      {
        id: "doc-8",
        name: "Audit Report FY 23-24",
        status: "Rejected",
        uploadedAt: "02 Feb 2025",
        uploadedBy: "Finance Reviewer",
        fileType: "pdf",
        notes: "Signatory mismatch, ask to reupload.",
        tags: ["Financial"],
        versions: [
          {
            id: "doc-8-v1",
            label: "Auditor upload",
            uploadedAt: "20 Jan 2025",
            uploadedBy: "Finance Reviewer",
            fileType: "pdf",
            notes: "First draft shared post-audit.",
          },
          {
            id: "doc-8-v2",
            label: "Second revision",
            uploadedAt: "28 Jan 2025",
            uploadedBy: "Finance Reviewer",
            fileType: "pdf",
          },
        ],
      },
    ],
    activities: {
      "doc-6": [
        {
          id: "doc-6-activity-1",
          message: "Admin approved this document at 11:10 AM",
          timestamp: "12 Jan 2025",
          tone: "success",
        },
      ],
      "doc-7": [
        {
          id: "doc-7-activity-1",
          message: "Marked pending for board verification",
          timestamp: "09 Feb 2025",
          tone: "warning",
        },
        {
          id: "doc-7-activity-2",
          message: "Document uploaded by Meera Singh",
          timestamp: "09 Feb 2025",
          tone: "info",
        },
      ],
      "doc-8": [
        {
          id: "doc-8-activity-1",
          message: "Admin rejected this document at 05:22 PM",
          timestamp: "02 Feb 2025",
          tone: "danger",
        },
        {
          id: "doc-8-activity-2",
          message: "Finance reviewer flagged signatory mismatch",
          timestamp: "02 Feb 2025",
          tone: "warning",
        },
        {
          id: "doc-8-activity-3",
          message: "Document uploaded by Finance Reviewer",
          timestamp: "02 Feb 2025",
          tone: "info",
        },
      ],
    },
    comments: {
      "doc-6": [
        {
          id: "comment-4",
          author: "Meera Singh",
          timestamp: "05 Feb 2025 · 03:18 PM",
          status: "Resolved",
          message: "Uploaded revised PAN with clearer signature. Please confirm.",
          section: "pan-signature",
          replies: [
            {
              id: "reply-2",
              author: "Finance Reviewer",
              timestamp: "05 Feb 2025 · 03:40 PM",
              status: "Resolved",
              message: "Looks great now. Thank you!",
              section: "pan-signature",
            },
          ],
        },
      ],
      "doc-7": [
        {
          id: "comment-5",
          author: "Board Liaison",
          timestamp: "10 Feb 2025 · 10:05 AM",
          status: "Open",
          message: "Board meeting scheduled Friday to confirm details. Will update afterwards.",
          section: "fcra-board",
        },
      ],
    },
  },
};

const statuses: Array<"all" | DocumentStatus> = [
  "all",
  "Uploaded",
  "Pending Review",
  "Approved",
  "Rejected",
  "Missing",
  "Update Requested",
];

const statusTone: Record<DocumentStatus, string> = {
  Uploaded: "bg-slate-100 text-slate-700",
  "Pending Review": "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
  Missing: "bg-slate-200 text-slate-600",
  "Update Requested": "border border-amber-200 bg-amber-50 text-amber-700",
};

const commentFilters: Array<"All" | CommentStatus> = ["All", "Open", "Resolved", "Needs revision"];

const commentStatusTone: Record<CommentStatus, string> = {
  Open: "bg-emerald-100 text-emerald-700",
  Resolved: "bg-slate-200 text-slate-600",
  "Needs revision": "bg-amber-100 text-amber-700",
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

const activityIcons: Record<
  DocumentActivity["tone"],
  { icon: React.ComponentType<{ className?: string }>; toneClass: string }
> = {
  info: { icon: Clock, toneClass: "bg-slate-100 text-slate-600" },
  warning: { icon: AlertTriangle, toneClass: "bg-amber-100 text-amber-700" },
  success: { icon: CheckCircle2, toneClass: "bg-emerald-100 text-emerald-700" },
  danger: { icon: XCircle, toneClass: "bg-rose-100 text-rose-700" },
};

export default function NgoDocumentsPage() {
  const params = useParams();
  const router = useRouter();
  const ngoId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  const profile = ngoId ? mockNgoDocuments[ngoId] : undefined;
  const [documents, setDocuments] = useState<NgoDocument[]>(() => profile?.documents ?? []);
  const [activityMap, setActivityMap] = useState<Record<string, DocumentActivity[]>>(
    () => profile?.activities ?? {},
  );
  const [tagSelections, setTagSelections] = useState<Record<string, string[]>>(() => {
    if (!profile) return {};
    return Object.fromEntries(profile.documents.map((doc) => [doc.id, doc.tags ?? []]));
  });
  const [previewVersion, setPreviewVersion] = useState<Record<string, string | null>>(() => {
    if (!profile) return {};
    return Object.fromEntries(profile.documents.map((doc) => [doc.id, null]));
  });
  const [commentMap, setCommentMap] = useState<Record<string, CommentEntry[]>>(
    () => profile?.comments ?? {},
  );
  const [commentFilter, setCommentFilter] = useState<"All" | CommentStatus>("All");
  const [selectedThread, setSelectedThread] = useState<{ commentId: string; section: string } | null>(
    null,
  );
  const [isCommentPanelOpen, setCommentPanelOpen] = useState(true);
  const [draftComment, setDraftComment] = useState("");
  const [openCommentMenu, setOpenCommentMenu] = useState<string | null>(null);

  useEffect(() => {
    if (ngoId && !profile) {
      notFound();
    }
  }, [ngoId, profile]);

  useEffect(() => {
    if (profile) {
      setDocuments(profile.documents);
      setActivityMap(profile.activities);
      setTagSelections(
        Object.fromEntries(profile.documents.map((doc) => [doc.id, doc.tags ?? []])),
      );
      setPreviewVersion(Object.fromEntries(profile.documents.map((doc) => [doc.id, null])));
      setCommentMap(profile.comments);
    }
  }, [profile]);

  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<(typeof statuses)[number]>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<NgoDocument | null>(null);
  const [pendingAction, setPendingAction] = useState<
    { type: ActionType; document: NgoDocument } | null
  >(null);
  const [tagPickerNonce, setTagPickerNonce] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isCommentPanelOpen) {
      setOpenCommentMenu(null);
    }
  }, [isCommentPanelOpen]);

  const filteredDocuments = useMemo(() => {
    if (!profile) {
      return [] as NgoDocument[];
    }
    const query = searchQuery.trim().toLowerCase();
    return documents.filter((document) => {
      const matchesStatus = statusFilter === "all" || document.status === statusFilter;
      const matchesQuery = query.length === 0 || document.name.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [profile, documents, searchQuery, statusFilter]);

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

  const confirmAction = (type: ActionType, document: NgoDocument) => {
    setPendingAction({ type, document });
  };

  const getEffectiveDocument = (document: NgoDocument) => {
    const activeVersionId = previewVersion[document.id];
    if (!activeVersionId) {
      return document;
    }

    const version = document.versions?.find((item) => item.id === activeVersionId);
    if (!version) {
      return document;
    }

    return {
      ...document,
      uploadedAt: version.uploadedAt,
      uploadedBy: version.uploadedBy,
      fileType: version.fileType,
      notes: version.notes ?? document.notes,
    } as NgoDocument;
  };

  const applyAction = () => {
    if (!pendingAction) return;
    const { type, document } = pendingAction;

    setDocuments((prev) =>
      prev.map((item) => {
        if (item.id !== document.id) return item;
        if (type === "approve") {
          return { ...item, status: "Approved" };
        }
        if (type === "reject") {
          return { ...item, status: "Rejected" };
        }
        return { ...item, status: "Update Requested" };
      }),
    );

    const newEntry: DocumentActivity = {
      id: `${document.id}-activity-${Date.now()}`,
      message:
        type === "approve"
          ? `Admin approved this document at ${new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : type === "reject"
          ? `Admin rejected this document at ${new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : `Admin requested an update at ${new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`,
      timestamp: new Date().toLocaleDateString(),
      tone: type === "approve" ? "success" : type === "reject" ? "danger" : "warning",
    };

    setActivityMap((prev) => {
      const existing = prev[document.id] ?? [];
      const updated = [newEntry, ...existing].slice(0, 5);
      return { ...prev, [document.id]: updated };
    });

    if (type === "approve") {
      toast.success(`${document.name} approved.`);
    } else if (type === "reject") {
      toast.error(`${document.name} rejected.`);
    } else {
      toast.warning(`Update requested for ${document.name}.`);
    }

    setPendingAction(null);
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
                    <span
                      className={cn(
                        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                        statusTone[document.status],
                      )}
                    >
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
              <Button
                variant="outline"
                className="gap-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                onClick={() => confirmAction("update", selectedDocument)}
              >
                Request Update
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100"
                onClick={() => confirmAction("reject", selectedDocument)}
              >
                Reject
              </Button>
              <Button
                className="gap-2 bg-emerald-600 hover:bg-emerald-500"
                onClick={() => confirmAction("approve", selectedDocument)}
              >
                Approve
              </Button>
            </div>
          ) : null
        }
      >
        {selectedDocument ? (
          (() => {
            const effectiveDocument = getEffectiveDocument(selectedDocument);
            const selectedTags = tagSelections[selectedDocument.id] ?? [];
            const availableTagOptions = availableTags.filter((tag) => !selectedTags.includes(tag));
            const threads = commentMap[selectedDocument.id] ?? [];
            const filteredThreads = threads.filter((thread) =>
              commentFilter === "All" ? true : thread.status === commentFilter,
            );
            const commentCounts: Record<"All" | CommentStatus, number> = {
              All: threads.length,
              Open: threads.filter((thread) => thread.status === "Open").length,
              Resolved: threads.filter((thread) => thread.status === "Resolved").length,
              "Needs revision": threads.filter((thread) => thread.status === "Needs revision").length,
            };

            const handleCommentMenuAction = (
              commentId: string,
              action: "edit" | "delete" | "resolve",
            ) => {
              setOpenCommentMenu(null);
              if (!selectedDocument) return;

              if (action === "edit") {
                toast.info("Edit comment (mock)");
                return;
              }

              setCommentMap((prev) => {
                const existingThreads = prev[selectedDocument.id] ?? [];
                const updatedThreads = existingThreads
                  .map((thread) => {
                    if (thread.id !== commentId) {
                      return thread;
                    }
                    if (action === "resolve") {
                      return { ...thread, status: "Resolved" as CommentStatus };
                    }
                    return null;
                  })
                  .filter(Boolean) as CommentEntry[];
                return { ...prev, [selectedDocument.id]: updatedThreads };
              });

              if (action === "delete") {
                if (selectedThread?.commentId === commentId) {
                  setSelectedThread(null);
                }
                toast.success("Comment removed (mock)");
              }

              if (action === "resolve") {
                toast.success("Comment marked resolved (mock)");
              }
            };

            return (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 xl:flex-row">
                  <div className="flex flex-1 flex-col gap-4">
                    <div
                      className={cn(
                        "relative flex h-[22rem] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-400 transition",
                        selectedThread && selectedThread.section ? "ring-2 ring-emerald-400/80 ring-offset-4" : "",
                      )}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="pointer-events-none whitespace-nowrap text-center text-lg font-semibold uppercase tracking-[0.6em] text-slate-200">
                          CONFIDENTIAL — ImpactBridge
                        </div>
                      </div>
                      <div className="relative z-10 text-center">
                        <FileText className="mx-auto h-12 w-12" />
                        <p className="mt-3 text-sm text-slate-500">Document preview placeholder</p>
                        <p className="text-xs text-slate-400">Embed PDF/image viewer once backend storage integrates.</p>
                      </div>
                      {selectedThread ? (
                        <div className="pointer-events-none absolute inset-4 rounded-2xl border-4 border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition" />
                      ) : null}
                    </div>

                    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge
                          variant="outline"
                          className={cn("border px-3 py-1", statusTone[effectiveDocument.status])}
                        >
                          {effectiveDocument.status}
                        </Badge>
                        <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                          <ShieldCheck className="h-4 w-4 text-slate-400" />
                          {effectiveDocument.fileType.toUpperCase()} preview
                        </span>
                      </div>
                      <div className="grid gap-3 text-sm text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Uploaded by</span>
                          <span className="font-medium text-slate-800">
                            {effectiveDocument.uploadedBy ?? "Not provided"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Uploaded on</span>
                          <span className="font-medium text-slate-800">
                            {effectiveDocument.uploadedAt ?? "Not provided"}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Notes</span>
                          <span className="max-w-[360px] text-right leading-relaxed text-slate-600">
                            {effectiveDocument.notes ?? "No reviewer notes attached yet."}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                          Tags
                        </h4>
                        {availableTagOptions.length > 0 ? (
                          <Select
                            key={`${selectedDocument.id}-${availableTagOptions.length}-${tagPickerNonce}`}
                            onValueChange={(value) => {
                              const nextTag = value as (typeof availableTags)[number];
                              setTagSelections((prev) => {
                                const current = prev[selectedDocument.id] ?? [];
                                return { ...prev, [selectedDocument.id]: [...current, nextTag] };
                              });
                              setTagPickerNonce((prev) => prev + 1);
                            }}
                          >
                            <SelectTrigger className="h-8 w-32 rounded-full border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-300">
                              <SelectValue placeholder="Add tag" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                              {availableTagOptions.map((tag) => (
                                <SelectItem key={tag} value={tag}>
                                  {tag}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.length === 0 ? (
                          <span className="text-xs text-slate-400">No tags yet</span>
                        ) : null}
                        {selectedTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            <Tag className="h-3.5 w-3.5 text-slate-500" />
                            {tag}
                            <button
                              type="button"
                              onClick={() =>
                                setTagSelections((prev) => {
                                  const current = prev[selectedDocument.id] ?? [];
                                  return {
                                    ...prev,
                                    [selectedDocument.id]: current.filter((item) => item !== tag),
                                  };
                                })
                              }
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                              aria-label={`Remove ${tag}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <aside
                    className={cn(
                      "flex w-full flex-col rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm transition-all",
                      isCommentPanelOpen ? "xl:w-80" : "xl:w-14",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-900">Collaboration</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                          {threads.length}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => setCommentPanelOpen((prev) => !prev)}
                        aria-label="Toggle comments"
                      >
                        {isCommentPanelOpen ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                      </button>
                    </div>

                    {isCommentPanelOpen ? (
                      <>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {commentFilters.map((filter) => (
                            <button
                              key={filter}
                              type="button"
                              onClick={() => setCommentFilter(filter)}
                              className={cn(
                                "rounded-full px-3 py-1 text-xs font-semibold transition",
                                commentFilter === filter
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                              )}
                            >
                              {filter}
                              <span className="ml-1 text-[10px] font-normal text-slate-500">
                                {commentCounts[filter] ?? 0}
                              </span>
                            </button>
                          ))}
                        </div>

                        <div className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1 text-sm text-slate-600">
                          {filteredThreads.length === 0 ? (
                            <div className="flex h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-center">
                              <AlertCircle className="h-5 w-5 text-slate-400" />
                              <p className="text-xs text-slate-500">No comments yet under this filter.</p>
                            </div>
                          ) : (
                            filteredThreads.map((comment) => (
                              <div
                                key={comment.id}
                                className={cn(
                                  "space-y-2 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm transition",
                                  selectedThread?.commentId === comment.id
                                    ? "border-emerald-300 shadow-[0_0_0_2px_rgba(16,185,129,0.2)]"
                                    : null,
                                )}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-2">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                                      {getInitials(comment.author)}
                                    </span>
                                    <div>
                                      <p className="text-sm font-semibold text-slate-900">{comment.author}</p>
                                      <p className="text-xs text-slate-400">{comment.timestamp}</p>
                                    </div>
                                  </div>
                                  <div className="relative flex items-center gap-2">
                                    <span
                                      className={cn(
                                        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                        commentStatusTone[comment.status],
                                      )}
                                    >
                                      {comment.status}
                                    </span>
                                    <button
                                      type="button"
                                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                                      aria-label="Comment actions"
                                      onClick={() =>
                                        setOpenCommentMenu((prev) =>
                                          prev === comment.id ? null : comment.id,
                                        )
                                      }
                                    >
                                      <EllipsisVertical className="h-4 w-4" />
                                    </button>
                                    {openCommentMenu === comment.id ? (
                                      <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                                        <button
                                          type="button"
                                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                                          onClick={() => handleCommentMenuAction(comment.id, "edit")}
                                        >
                                          Edit
                                          <span className="text-[10px] uppercase tracking-wide text-slate-400">
                                            Mock
                                          </span>
                                        </button>
                                        <button
                                          type="button"
                                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:bg-emerald-50"
                                          onClick={() => handleCommentMenuAction(comment.id, "resolve")}
                                        >
                                          Mark resolved
                                          <span className="text-[10px] uppercase tracking-wide text-slate-400">
                                            Mock
                                          </span>
                                        </button>
                                        <button
                                          type="button"
                                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                                          onClick={() => handleCommentMenuAction(comment.id, "delete")}
                                        >
                                          Delete
                                          <span className="text-[10px] uppercase tracking-wide text-rose-400">
                                            Mock
                                          </span>
                                        </button>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <p className="text-sm leading-relaxed text-slate-700">{comment.message}</p>

                                <div className="flex items-center justify-between text-xs text-slate-400">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedThread({ commentId: comment.id, section: comment.section })}
                                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                                  >
                                    <MessageSquareReply className="h-3.5 w-3.5" />
                                    View context
                                  </button>
                                  <span className="italic text-slate-400">Linked section: {comment.section}</span>
                                </div>

                                {(comment.replies ?? []).length > 0 ? (
                                  <div className="space-y-2 border-l-2 border-slate-200 pl-4">
                                    {comment.replies?.map((reply) => (
                                      <div key={reply.id} className="space-y-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-600">
                                              {getInitials(reply.author)}
                                            </span>
                                            <p className="text-xs font-semibold text-slate-700">{reply.author}</p>
                                          </div>
                                          <span className="text-[10px] text-slate-400">{reply.timestamp}</span>
                                        </div>
                                        <p className="text-xs leading-relaxed text-slate-600">{reply.message}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            ))
                          )}
                        </div>

                        <div className="mt-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm">
                          <Textarea
                            placeholder="Leave a review note…"
                            value={draftComment}
                            onChange={(event) => setDraftComment(event.target.value)}
                            className="min-h-[96px]"
                          />
                          <div className="mt-2 flex items-center justify-end">
                            <Button
                              size="sm"
                              disabled={draftComment.trim().length === 0}
                              onClick={() => {
                                if (!selectedDocument) return;
                                const newComment: CommentEntry = {
                                  id: `comment-${Date.now()}`,
                                  author: "You",
                                  timestamp: new Date().toLocaleString(),
                                  status: "Open",
                                  message: draftComment.trim(),
                                  section: "general",
                                  replies: [],
                                };
                                setCommentMap((prev) => {
                                  const existing = prev[selectedDocument.id] ?? [];
                                  return { ...prev, [selectedDocument.id]: [newComment, ...existing] };
                                });
                                setDraftComment("");
                                setSelectedThread({ commentId: newComment.id, section: newComment.section });
                                toast.success("Comment added (mock)");
                              }}
                            >
                              Add comment
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </aside>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
                  <div className="space-y-3 rounded-2xl border border-slate-200 bg-white px-5 py-4">
                    <h4 className="text-sm font-semibold text-slate-900">Version history</h4>
                    <div className="space-y-2 text-sm text-slate-600">
                      {(selectedDocument.versions ?? []).length === 0 ? (
                        <p className="text-xs text-slate-400">No prior versions uploaded.</p>
                      ) : null}
                      {selectedDocument.versions?.map((version) => {
                        const isActive = previewVersion[selectedDocument.id] === version.id;
                        return (
                          <button
                            key={version.id}
                            type="button"
                            onClick={() =>
                              setPreviewVersion((prev) => ({
                                ...prev,
                                [selectedDocument.id]: isActive ? null : version.id,
                              }))
                            }
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl border px-4 py-2 text-left transition",
                              isActive
                                ? "border-emerald-300 bg-emerald-50"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                            )}
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{version.label}</p>
                              <p className="text-xs text-slate-500">
                                Uploaded {version.uploadedAt} · {version.uploadedBy}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-slate-500">
                              {isActive ? "Viewing" : "View"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-slate-200 bg-white px-5 py-4">
                    <h4 className="text-sm font-semibold text-slate-900">Recent activity</h4>
                    <div className="space-y-2">
                      {(activityMap[selectedDocument.id] ?? []).map((entry) => {
                        const Icon = activityIcons[entry.tone].icon;
                        return (
                          <div
                            key={entry.id}
                            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2 text-xs text-slate-600"
                          >
                            <span
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-2xl",
                                activityIcons[entry.tone].toneClass,
                              )}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <div className="flex flex-1 flex-col gap-0.5">
                              <span className="font-medium text-slate-700">{entry.message}</span>
                              <span className="text-[10px] uppercase tracking-wide text-slate-400">
                                {entry.timestamp}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        ) : null}
      </Drawer>

            <Modal
        open={Boolean(pendingAction)}
        onClose={() => setPendingAction(null)}
        title="Confirm action"
        description={
          pendingAction
            ? `Are you sure you want to ${
                pendingAction.type === "approve"
                  ? "approve"
                  : pendingAction.type === "reject"
                  ? "reject"
                  : "request an update for"
              } ${pendingAction.document.name}?`
            : undefined
        }
        size="sm"
        footer={
          pendingAction ? (
            <>
              <Button variant="outline" onClick={() => setPendingAction(null)}>
                Cancel
              </Button>
              <Button
                className={cn(
                  pendingAction.type === "approve" && "bg-emerald-600 hover:bg-emerald-500",
                  pendingAction.type === "reject" && "bg-rose-600 hover:bg-rose-500",
                  pendingAction.type === "update" && "bg-amber-600 hover:bg-amber-500",
                )}
                onClick={applyAction}
              >
                Confirm
              </Button>
            </>
          ) : null
        }
      >
        {pendingAction ? (
          <p className="text-sm text-slate-600">
            This action will update the document status and log an activity entry so the NGO can track the
            decision.
          </p>
        ) : null}
      </Modal>
    </div>
  );
}
