"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { notFound, useParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Download,
  Edit,
  FileText,
  Layers,
  NotebookPen,
  Plus,
  RadioTower,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tooltip } from "@/components/ui/tooltip";

import type { NgoRelationshipStatus } from "../../../../companies/data";
import {
  NGO_STATUS_TONE,
  PROGRAMME_STATUS_TONE,
  findCompanyById,
  findCompanyProgramme,
} from "../../../../companies/data";
import { useOfflineContext } from "@/providers/offline-status-provider";
import { getQueueSnapshot } from "@/lib/queue-manager";

type AssignableStatus = "Verified" | "Pending";

interface AssignableNgo {
  name: string;
  registrationType: string;
  status: AssignableStatus;
}

interface AssignedNgo {
  name: string;
  status: NgoRelationshipStatus;
  focusArea?: string;
  registrationType?: string;
}

const ASSIGNABLE_STATUS_TONE: Record<AssignableStatus, string> = {
  Verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
};

const ASSIGNABLE_NGOS: AssignableNgo[] = [
  { name: "Swasthya Seva Foundation", registrationType: "Section 8 Company", status: "Verified" },
  { name: "Future Minds Trust", registrationType: "Public Charitable Trust", status: "Pending" },
  { name: "Prerna Women Collective", registrationType: "Society", status: "Verified" },
  { name: "Green Earth Alliance", registrationType: "Section 8 Company", status: "Verified" },
  { name: "Jeevan Jyoti Society", registrationType: "Society", status: "Pending" },
];

type MilestoneStatus = "Not started" | "In progress" | "Completed";

interface ProgrammeMilestoneDetail {
  id: string;
  title: string;
  status: MilestoneStatus;
  deadline: string;
  progress: number;
  description?: string;
}

const MILESTONE_STATUS_TONE: Record<MilestoneStatus, string> = {
  "Not started": "bg-slate-100 text-slate-600 border-slate-200",
  "In progress": "bg-sky-50 text-sky-700 border-sky-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const MILESTONE_STATUS_ACCENT: Record<MilestoneStatus, { dot: string; progress: string; bar: string }> = {
  "Not started": {
    dot: "border-slate-300 bg-white text-slate-400",
    progress: "bg-rose-400",
    bar: "#cbd5f5",
  },
  "In progress": {
    dot: "border-sky-200 bg-sky-50 text-sky-600",
    progress: "bg-sky-500",
    bar: "#38bdf8",
  },
  Completed: {
    dot: "border-emerald-200 bg-emerald-50 text-emerald-600",
    progress: "bg-emerald-500",
    bar: "#34d399",
  },
};

const tabItems = [
  { value: "overview", label: "Overview" },
  { value: "timeline", label: "Timeline" },
  { value: "documents", label: "Documents" },
  { value: "ngos", label: "Assigned NGOs" },
  { value: "milestones", label: "Milestones" },
  { value: "comments", label: "Comments" },
];

export default function CompanyProgrammeDetailPage() {
  const params = useParams();
  const companyId = Array.isArray(params?.companyId) ? params?.companyId[0] : params?.companyId;
  const programmeId = Array.isArray(params?.programmeId) ? params?.programmeId[0] : params?.programmeId;

  const company = useMemo(() => (companyId ? findCompanyById(companyId) : undefined), [companyId]);
  const programme = useMemo(
    () => (companyId && programmeId ? findCompanyProgramme(companyId, programmeId) : undefined),
    [companyId, programmeId],
  );
  const { online, enqueue, markSynced } = useOfflineContext();
  const [assignedNgos, setAssignedNgos] = useState<AssignedNgo[]>(() => programme?.ngos ?? []);
  const [assigning, setAssigning] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignSearch, setAssignSearch] = useState("");
  const [pendingSelection, setPendingSelection] = useState<AssignableNgo | null>(null);
  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<ProgrammeMilestoneDetail | null>(null);
  const [milestoneForm, setMilestoneForm] = useState({
    title: "",
    deadline: "",
    description: "",
    status: "Not started" as MilestoneStatus,
    progress: 0,
  });
  const [milestonesView, setMilestonesView] = useState<"list" | "timeline">("list");
  const [timelineAnimated, setTimelineAnimated] = useState(false);
  const [progressAnimated, setProgressAnimated] = useState(false);
  const [actionCenterOpen, setActionCenterOpen] = useState(false);

  const initialMilestones = useMemo<ProgrammeMilestoneDetail[]>(() => {
    if (!programme) {
      return [];
    }

    const defaults: ProgrammeMilestoneDetail[] = programme.milestones.map((milestone, index) => {
      const status: MilestoneStatus = milestone.completed
        ? "Completed"
        : index === 0
          ? "In progress"
          : "Not started";
      const progressValue = milestone.completed ? 100 : status === "In progress" ? 45 : 0;
      const deadlinePresets = [
        programme.timeline.start,
        "30 Jun 2024",
        "15 Sep 2024",
        programme.timeline.end,
      ];
      return {
        id: `${programme.id}-milestone-${index}`,
        title: milestone.label,
        status,
        deadline: deadlinePresets[index] ?? programme.timeline.end,
        progress: progressValue,
        description:
          status === "Completed"
            ? "Documentation closed and compliance archived."
            : "Track key deliverables and update stakeholders when progress advances.",
      };
    });

    return defaults.length
      ? defaults
      : [
          {
            id: `${programme.id}-kickoff`,
            title: "Programme kickoff",
            status: "Not started",
            deadline: programme.timeline.start,
            progress: 0,
            description: "Align teams and confirm goals before execution phase begins.",
          },
        ];
  }, [programme]);

  const [milestones, setMilestones] = useState<ProgrammeMilestoneDetail[]>(initialMilestones);

  useEffect(() => {
    setAssignedNgos(programme?.ngos ?? []);
  }, [programme]);

  useEffect(() => {
    setMilestones(initialMilestones);
  }, [initialMilestones]);

  useEffect(() => {
    if (milestonesView === "timeline") {
      const frame = requestAnimationFrame(() => setTimelineAnimated(true));
      return () => cancelAnimationFrame(frame);
    }
    setTimelineAnimated(false);
  }, [milestonesView]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setProgressAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const completedMilestones = useMemo(
    () => milestones.filter((milestone) => milestone.status === "Completed").length,
    [milestones],
  );
  const progressPercent = milestones.length ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  const progressTone = useMemo(() => {
    if (progressPercent < 30) {
      return {
        title: "text-rose-600",
        bar: "bg-rose-500",
        highlight: "text-rose-500",
      };
    }
    if (progressPercent < 70) {
      return {
        title: "text-sky-600",
        bar: "bg-sky-500",
        highlight: "text-sky-500",
      };
    }
    return {
      title: "text-emerald-600",
      bar: "bg-emerald-500",
      highlight: "text-emerald-600",
    };
  }, [progressPercent]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleViewportToggle = () => {
      setActionCenterOpen(window.innerWidth >= 1024);
    };

    handleViewportToggle();
    window.addEventListener("resize", handleViewportToggle);

    return () => {
      window.removeEventListener("resize", handleViewportToggle);
    };
  }, []);

  const filteredAssignableNgos = useMemo(() => {
    const term = assignSearch.trim().toLowerCase();
    if (!term) {
      return ASSIGNABLE_NGOS;
    }
    return ASSIGNABLE_NGOS.filter((ngo) =>
      [ngo.name, ngo.registrationType, ngo.status]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [assignSearch]);

  const closeAssignModal = () => {
    setAssignModalOpen(false);
    setAssignSearch("");
    setPendingSelection(null);
    setAssigning(false);
  };

  const handleRemoveAssignedNgo = (name: string) => {
    setAssignedNgos((prev) => prev.filter((ngo) => ngo.name !== name));
    toast.message("NGO unlinked", {
      description: `${name} removed from this programme.`,
    });
  };

  const simulateAssignRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (typeof navigator !== "undefined" && "onLine" in navigator && navigator.onLine === false) {
      throw new Error("offline");
    }
  };

  const wasOfflineRef = useRef(!online);

  useEffect(() => {
    if (!online) {
      wasOfflineRef.current = true;
      return;
    }

    if (!wasOfflineRef.current) {
      return;
    }
    wasOfflineRef.current = false;

    const pendingAssignments = getQueueSnapshot().filter((action) => action.type === "assign-ngo");
    if (!pendingAssignments.length) {
      return;
    }

    let cancelled = false;

    const syncQueuedAssignments = async () => {
      try {
        for (const action of pendingAssignments) {
          await simulateAssignRequest();
          if (cancelled) {
            return;
          }
          markSynced(action.id);
        }
        if (!cancelled) {
          toast.success("Changes synced.");
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to replay offline queue", error);
          toast.error("Failed to sync queued changes.");
        }
      }
    };

    void syncQueuedAssignments();

    return () => {
      cancelled = true;
    };
  }, [online, markSynced]);

  const handleConfirmAssignment = async () => {
    if (!pendingSelection || assigning) {
      return;
    }

    const alreadyLinked = assignedNgos.some((ngo) => ngo.name === pendingSelection.name);
    if (alreadyLinked) {
      toast.info(`${pendingSelection.name} is already linked to this programme.`);
      setPendingSelection(null);
      return;
    }

    const rollback = assignedNgos.map((ngo) => ({ ...ngo }));
    const convertedStatus: NgoRelationshipStatus =
      pendingSelection.status === "Verified" ? "Active" : "Pending Approval";
    const optimisticNgo: AssignedNgo = {
      name: pendingSelection.name,
      status: convertedStatus,
      focusArea: undefined,
      registrationType: pendingSelection.registrationType,
    };

    setAssignedNgos((prev) => [...prev, optimisticNgo]);

    if (!online) {
      enqueue({
        type: "assign-ngo",
        payload: {
          programmeId,
          companyId,
          ngoName: optimisticNgo.name,
        },
      });
      toast.info("Action queued. We'll sync when you're back online.");
      closeAssignModal();
      return;
    }

    setAssigning(true);

    try {
      await simulateAssignRequest();
      toast.success(`${pendingSelection.name} assigned instantly.`);
      closeAssignModal();
    } catch (cause) {
      setAssignedNgos(rollback);
      setAssigning(false);
      const message =
        cause instanceof Error && cause.message === "offline"
          ? "You appear to be offline. We'll sync this assignment when you're back online."
          : "Sync failed. Restored previous state.";
      if (cause instanceof Error && cause.message === "offline") {
        enqueue({
          type: "assign-ngo",
          payload: {
            programmeId,
            companyId,
            ngoName: optimisticNgo.name,
          },
        });
        toast.info("Action queued. We'll sync when you're back online.");
        closeAssignModal();
        return;
      }
      toast.error(message);
    }
  };

  const closeMilestoneModal = () => {
    setMilestoneModalOpen(false);
    setEditingMilestone(null);
    setMilestoneForm({ title: "", deadline: "", description: "", status: "Not started", progress: 0 });
  };

  const handleMilestoneSubmit = () => {
    if (!milestoneForm.title.trim()) {
      closeMilestoneModal();
      return;
    }

    if (editingMilestone) {
      setMilestones((prev) =>
        prev.map((milestone) =>
          milestone.id === editingMilestone.id
            ? { ...milestone, ...milestoneForm }
            : milestone,
        ),
      );
    } else {
      const makeId = () => Math.random().toString(36).slice(2, 10);
      setMilestones((prev) => [
        ...prev,
        {
          id: makeId(),
          title: milestoneForm.title,
          status: milestoneForm.status,
          deadline: milestoneForm.deadline || programme?.timeline.end || "",
          progress: Math.min(100, Math.max(0, milestoneForm.progress)),
          description: milestoneForm.description,
        },
      ]);
    }

    closeMilestoneModal();
  };

  const handleEditMilestone = (milestone: ProgrammeMilestoneDetail) => {
    setEditingMilestone(milestone);
    setMilestoneForm({
      title: milestone.title,
      deadline: milestone.deadline,
      description: milestone.description ?? "",
      status: milestone.status,
      progress: milestone.progress,
    });
    setMilestoneModalOpen(true);
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((milestone) => milestone.id !== id));
  };

  if (!companyId || !programmeId) {
    return null;
  }

  if (!company || !programme) {
    notFound();
    return null;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title={programme.title}
        subtitle={`CSR Programme • ${company.name}`}
        action={
          <div className="inline-flex items-center gap-3">
            <Button type="button" variant="outline" className="gap-2">
              <NotebookPen className="h-4 w-4" />
              Edit
            </Button>
            <Button type="button" variant="outline" className="gap-2">
              <Archive className="h-4 w-4" />
              Archive
            </Button>
            <Button type="button" className="gap-2">
              <Download className="h-4 w-4" />
              Download summary
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="xl:col-span-1">
          <CardContent className="space-y-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Overall progress</p>
            <p className={cn("text-2xl font-semibold", progressTone.title)}>{progressPercent}%</p>
            <p className="text-xs text-slate-500">Based on completed milestones</p>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="space-y-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Total milestones</p>
            <p className="text-2xl font-semibold text-slate-900">{milestones.length}</p>
            <p className="text-xs text-slate-500">Across planning and execution stages</p>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="space-y-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Completed</p>
            <p className="text-2xl font-semibold text-emerald-600">{completedMilestones}</p>
            <p className="text-xs text-slate-500">Milestones validated and closed</p>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="space-y-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Pending</p>
            <p className="text-2xl font-semibold text-slate-900">{milestones.length - completedMilestones}</p>
            <p className="text-xs text-slate-500">Milestones awaiting action</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">Milestone completion rate</p>
            <p className={cn("text-xs", progressTone.highlight)}>
              {completedMilestones} of {milestones.length || 1} milestones complete
            </p>
          </div>
          <span className="text-xs text-slate-400">Automatically recalculates as milestones update</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={cn("h-full rounded-full transition-all duration-700 ease-out", progressTone.bar)}
            style={{ width: progressAnimated ? `${progressPercent}%` : "0%" }}
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold text-slate-900">Programme summary</CardTitle>
            <Badge variant="outline" className={`border ${PROGRAMME_STATUS_TONE[programme.status]}`}>
              {programme.status}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Budget</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{programme.budget}</p>
              <p className="text-xs text-slate-500">{programme.utilisation}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Timeline</p>
              <p className="mt-1 text-sm text-slate-600">
                {programme.timeline.start} → {programme.timeline.end}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-400">
                <CalendarDays className="h-3.5 w-3.5" />
                12-month span
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Impact category</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{programme.category}</p>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-400">
                <Layers className="h-3.5 w-3.5" />
                Schedule VII alignment
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                CSR compliance note
              </p>
              <p className="mt-1 text-sm text-slate-600">{programme.complianceNote}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Overall progress</span>
                <span className="font-medium text-slate-700">{programme.progress}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${programme.progress}%` }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Milestones</p>
              <ol className="space-y-2 text-sm text-slate-600">
                {programme.milestones.map((milestone) => (
                  <li key={`${programme.id}-${milestone.label}`} className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        milestone.completed
                          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : "border-slate-200 bg-white text-slate-400"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <span className={milestone.completed ? "font-medium text-slate-800" : "text-slate-500"}>
                      {milestone.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        <aside
        className={cn(
          "rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 ease-out",
          "flex h-full flex-col overflow-hidden",
          actionCenterOpen ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 xl:translate-x-0 xl:opacity-100",
          !actionCenterOpen ? "max-h-0 xl:max-h-full" : "max-h-[32rem] xl:max-h-full",
        )}
      >
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <RadioTower className="h-4 w-4 text-brand-500" />
              Action Center
              <span className="ml-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden>
                <span className="sr-only">Two pending actions</span>
              </span>
            </div>
            <button
              type="button"
              className="text-xs font-medium text-brand-600 transition hover:text-brand-700 xl:hidden"
              onClick={() => setActionCenterOpen((prev) => !prev)}
            >
              {actionCenterOpen ? "Hide" : "Show"}
            </button>
          </div>

          <div
            className={cn(
              "grid gap-3 px-5 py-4 text-sm text-slate-600",
              actionCenterOpen
                ? "max-h-[480px] opacity-100"
                : "max-h-0 overflow-hidden opacity-0 xl:max-h-full xl:opacity-100",
              "transition-all duration-500 ease-out",
            )}
          >
            <ActionItem
              icon={Plus}
              label="Add milestone"
              description="Create a new checkpoint to track programme delivery."
              onClick={() => {
                setEditingMilestone(null);
                setMilestoneForm({
                  title: "",
                  deadline: "",
                  description: "",
                  status: "Not started",
                  progress: 0,
                });
                setMilestoneModalOpen(true);
                toast.success("Ready to add a milestone", {
                  description: "Fill in the milestone details in the drawer.",
                });
              }}
            />
            <ActionItem
              icon={RadioTower}
              label="Request update from NGO"
              description="Ping partner stakeholders for the latest field status."
              onClick={() => {
                toast("Update request sent", {
                  description: "NGO will receive a notification to share progress.",
                });
              }}
            />
            <ActionItem
              icon={UploadCloud}
              label="Upload compliance document"
              description="Attach reports, approvals, or committee notes."
              onClick={() => {
                toast("Upload placeholder", {
                  description: "Compliance document workflow coming soon.",
                });
              }}
            />
          </div>
        </aside>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-white p-0">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 data-[state=active]:border-brand-200 data-[state=active]:bg-brand-50 data-[state=active]:text-brand-700"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-4 text-sm text-slate-600">
              <p>
                This programme focuses on driving impactful CSR interventions aligned with ImpactBridge compliance
                standards. Use this space to document success metrics, implementation updates, and stakeholder
                feedback as the initiative advances.
              </p>
              <p>
                Ensure quarterly reports are prepared for CSR committee review and maintain transparent records of
                expenditure and beneficiary impact.
              </p>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4 text-sm text-slate-600">
              <div className="relative ml-3 border-l border-dashed border-slate-200 pl-6">
                {programme.milestones.map((milestone, index) => (
                  <div key={`${programme.id}-timeline-${index}`} className="relative mb-6 last:mb-0">
                    <span className="absolute left-[-29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-slate-200 bg-white">
                      <span
                        className={`h-2 w-2 rounded-full ${milestone.completed ? "bg-emerald-500" : "bg-slate-300"}`}
                      />
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900">{milestone.label}</h4>
                    <p className="mt-1 text-xs text-slate-500">
                      {milestone.completed
                        ? "Milestone achieved and documented."
                        : "Pending completion. Ensure requirements are logged."}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 text-sm text-slate-600">
              {programme.documents.length ? (
                <div className="space-y-3">
                  {programme.documents.map((doc) => (
                    <div
                      key={`${programme.id}-doc-${doc.name}`}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3 text-sm">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-700">{doc.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">Uploaded {doc.uploadedAt}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
                  No files uploaded.
                </div>
              )}
            </TabsContent>

            <TabsContent value="ngos" className="space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  className="gap-2 text-sm font-medium text-brand-600 hover:bg-brand-50 hover:text-brand-700"
                  onClick={() => {
                    setAssignModalOpen(true);
                    setAssignSearch("");
                    setPendingSelection(null);
                  }}
                >
                  + Assign NGO
                </Button>
              </div>

              {assignedNgos.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {assignedNgos.map((ngo) => (
                    <div
                      key={`${programme.id}-ngo-${ngo.name}`}
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{ngo.name}</p>
                        <p className="text-xs text-slate-400">
                          {ngo.focusArea ? `Focus: ${ngo.focusArea}` : `Registration: ${ngo.registrationType ?? "Pending intake"}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={`border ${NGO_STATUS_TONE[ngo.status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
                        >
                          {ngo.status}
                        </Badge>
                        {!online ? (
                          <Tooltip label="Unavailable while offline." side="top">
                            <span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                                disabled
                              >
                                Remove
                              </Button>
                            </span>
                          </Tooltip>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                            onClick={() => handleRemoveAssignedNgo(ngo.name)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
                  No NGOs assigned yet.
                </div>
              )}
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4 text-sm text-slate-600">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-slate-400">
                  Track milestone health to keep CSR stakeholders aligned on progress.
                </p>
                <div className="flex items-center gap-3">
                  <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-xs font-medium text-slate-500">
                    <button
                      type="button"
                      className={cn(
                        "rounded-full px-3 py-1 transition",
                        milestonesView === "list"
                          ? "bg-brand-50 text-brand-700 shadow-sm"
                          : "hover:bg-slate-100 hover:text-slate-700",
                      )}
                      onClick={() => setMilestonesView("list")}
                    >
                      List View
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "rounded-full px-3 py-1 transition",
                        milestonesView === "timeline"
                          ? "bg-brand-50 text-brand-700 shadow-sm"
                          : "hover:bg-slate-100 hover:text-slate-700",
                      )}
                      onClick={() => setMilestonesView("timeline")}
                    >
                      Timeline View
                    </button>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="gap-2 text-sm font-medium text-brand-600 hover:bg-brand-50 hover:text-brand-700"
                    onClick={() => {
                      setEditingMilestone(null);
                      setMilestoneForm({ title: "", deadline: "", description: "", status: "Not started", progress: 0 });
                      setMilestoneModalOpen(true);
                    }}
                  >
                    + Add Milestone
                  </Button>
                </div>
              </div>

              {milestones.length ? (
                milestonesView === "list" ? (
                  <div className="space-y-3">
                    {milestones.map((milestone) => (
                      <MilestoneCard
                        key={milestone.id}
                        milestone={milestone}
                        onEdit={() => handleEditMilestone(milestone)}
                        onDelete={() => handleDeleteMilestone(milestone.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <MilestoneTimeline
                    milestones={milestones}
                    onEdit={handleEditMilestone}
                    onDelete={handleDeleteMilestone}
                    animated={timelineAnimated}
                  />
                )
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
                  No milestones yet — track project progress by adding one.
                </div>
              )}
            </TabsContent>

            <TabsContent value="comments" className="space-y-4 text-sm text-slate-600">
              {programme.comments.length ? (
                <div className="space-y-3">
                  {programme.comments.map((comment, index) => (
                    <div
                      key={`${programme.id}-comment-${index}`}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-slate-600">{comment.author}</span>
                        <span>{comment.timestamp}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{comment.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
                  No comments added yet.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Modal
        open={assignModalOpen}
        onClose={closeAssignModal}
        title="Assign NGO"
        description="Select an NGO from the network to link with this programme."
        footer={
          pendingSelection ? (
            <>
                  <Button type="button" variant="ghost" onClick={closeAssignModal} disabled={assigning}>
                    Cancel
                  </Button>
                  {!online ? (
                    <Tooltip label="Unavailable while offline." side="top">
                      <span>
                        <Button
                          type="button"
                          onClick={handleConfirmAssignment}
                          disabled={assigning}
                          aria-disabled={!online}
                          className="bg-brand-600 text-white hover:bg-brand-700"
                        >
                          {assigning ? (
                            <span className="inline-flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Saving…
                            </span>
                          ) : (
                            "Queue for sync"
                          )}
                        </Button>
                      </span>
                    </Tooltip>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleConfirmAssignment}
                      disabled={assigning}
                      className="bg-brand-600 text-white hover:bg-brand-700"
                    >
                      {assigning ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving…
                        </span>
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  )}
                </>
          ) : (
            <Button type="button" variant="ghost" onClick={closeAssignModal}>
              Close
            </Button>
          )
        }
      >
        {pendingSelection ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Assign NGO <span className="font-semibold text-slate-900">{pendingSelection.name}</span> to this programme?
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">{pendingSelection.name}</p>
              <p className="mt-1 text-xs text-slate-400">Registration: {pendingSelection.registrationType}</p>
              <Badge
                variant="outline"
                className={`mt-3 inline-flex border ${ASSIGNABLE_STATUS_TONE[pendingSelection.status]}`}
              >
                {pendingSelection.status}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
              <Input
                value={assignSearch}
                onChange={(event) => setAssignSearch(event.target.value)}
                placeholder="Search NGOs"
                className="h-9 border-none bg-transparent px-0 text-sm"
                aria-label="Search NGOs to assign"
              />
            </div>
            <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "18rem" }}>
              {filteredAssignableNgos.length ? (
                filteredAssignableNgos.map((ngo) => {
                  const isAssigned = assignedNgos.some((existingNgo) => existingNgo.name === ngo.name);

                  return (
                    <div
                      key={`assign-${ngo.name}`}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{ngo.name}</p>
                        <p className="text-xs text-slate-400">{ngo.registrationType}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`border ${ASSIGNABLE_STATUS_TONE[ngo.status]}`}>
                          {ngo.status}
                        </Badge>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPendingSelection(ngo)}
                          disabled={isAssigned}
                        >
                          {isAssigned ? "Assigned" : "Select"}
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
                  No NGOs matched your search.
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={milestoneModalOpen}
        onClose={closeMilestoneModal}
        title={editingMilestone ? "Edit milestone" : "Add milestone"}
        description="Define key stages for this programme to monitor delivery."
        footer={
          <>
            <Button type="button" variant="ghost" onClick={closeMilestoneModal}>
              Cancel
            </Button>
            <Button type="button" onClick={handleMilestoneSubmit} className="bg-brand-600 text-white hover:bg-brand-700">
              {editingMilestone ? "Save" : "Add"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="milestone-title">
              Title
            </label>
            <Input
              id="milestone-title"
              value={milestoneForm.title}
              onChange={(event) => setMilestoneForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Quarterly progress review"
              className="mt-2 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="milestone-deadline">
                Deadline
              </label>
              <Input
                id="milestone-deadline"
                type="date"
                value={milestoneForm.deadline}
                onChange={(event) => setMilestoneForm((prev) => ({ ...prev, deadline: event.target.value }))}
                className="mt-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Status
              </label>
              <Select
                value={milestoneForm.status}
                onValueChange={(value) => setMilestoneForm((prev) => ({ ...prev, status: value as MilestoneStatus }))}
              >
                <SelectTrigger className="mt-2 w-full border-slate-200 text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(MILESTONE_STATUS_TONE).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="milestone-progress">
              Progress (% complete)
            </label>
            <Input
              id="milestone-progress"
              type="number"
              min={0}
              max={100}
              value={milestoneForm.progress}
              onChange={(event) =>
                setMilestoneForm((prev) => ({ ...prev, progress: Number(event.target.value ?? 0) }))
              }
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="milestone-description">
              Description
            </label>
            <Textarea
              id="milestone-description"
              value={milestoneForm.description}
              onChange={(event) => setMilestoneForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Outline expected deliverables and reporting cadence for this stage."
              className="mt-2 text-sm"
              rows={4}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

interface MilestoneCardProps {
  milestone: ProgrammeMilestoneDetail;
  onEdit: () => void;
  onDelete: () => void;
  variant?: "default" | "compact";
}

function MilestoneCard({ milestone, onEdit, onDelete, variant = "default" }: MilestoneCardProps) {
  const accent = MILESTONE_STATUS_ACCENT[milestone.status];
  const progressWidth = `${Math.min(100, Math.max(0, milestone.progress))}%`;

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition",
        variant === "compact" ? "text-center" : undefined,
      )}
    >
      <div
        className={cn(
          "flex gap-3",
          variant === "compact" ? "flex-col items-center" : "flex-col sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div className={cn("text-left", variant === "compact" ? "text-center" : undefined)}>
          <h3 className="text-sm font-semibold text-slate-900">{milestone.title}</h3>
          {milestone.description ? (
            <p className="mt-1 text-xs text-slate-500">{milestone.description}</p>
          ) : null}
        </div>
        <div className={cn("flex items-center gap-3", variant === "compact" ? "justify-center" : undefined)}>
          <Badge variant="outline" className={`border ${MILESTONE_STATUS_TONE[milestone.status]}`}>
            {milestone.status}
          </Badge>
          <span className="text-xs text-slate-400">Deadline: {milestone.deadline}</span>
        </div>
      </div>

      <div className={cn("mt-4", variant === "compact" ? "text-center" : undefined)}>
        <div
          className={cn(
            "text-xs text-slate-500",
            variant === "compact" ? "flex flex-col items-center gap-1" : "flex items-center justify-between",
          )}
        >
          <span>Progress</span>
          <span className="font-medium text-slate-700">{milestone.progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={cn("h-full rounded-full transition-all", accent.progress)}
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className={cn("mt-4 flex items-center gap-3", variant === "compact" ? "justify-center" : undefined)}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1 text-brand-600 hover:bg-brand-50 hover:text-brand-700"
          onClick={onEdit}
        >
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
          onClick={onDelete}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}

interface MilestoneTimelineProps {
  milestones: ProgrammeMilestoneDetail[];
  onEdit: (milestone: ProgrammeMilestoneDetail) => void;
  onDelete: (id: string) => void;
  animated: boolean;
}

function MilestoneTimeline({ milestones, onEdit, onDelete, animated }: MilestoneTimelineProps) {
  return (
    <div className="space-y-6">
      <div
        className={cn(
          "hidden gap-10 overflow-x-auto pb-6 md:flex",
          "transition-all duration-300 ease-out",
          animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        )}
      >
        {milestones.map((milestone, index) => {
          const accent = MILESTONE_STATUS_ACCENT[milestone.status];

          return (
            <div key={milestone.id} className="relative flex min-w-[240px] flex-col items-center pb-2">
              {index < milestones.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute right-[-3.5rem] top-6 hidden h-[2px] w-[3.5rem] md:block"
                  style={{ backgroundColor: accent.bar }}
                />
              ) : null}
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold",
                  accent.dot,
                )}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-xs text-slate-500">{milestone.deadline}</span>
              <div className="mt-6 w-full max-w-xs">
                <MilestoneCard
                  milestone={milestone}
                  onEdit={() => onEdit(milestone)}
                  onDelete={() => onDelete(milestone.id)}
                  variant="compact"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={cn(
          "space-y-6 border-l border-slate-200 pl-6 md:hidden",
          "transition-all duration-300 ease-out",
          animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        )}
      >
        {milestones.map((milestone, index) => {
          const accent = MILESTONE_STATUS_ACCENT[milestone.status];

          return (
            <div key={`${milestone.id}-mobile`} className="relative">
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[1.35rem] top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  accent.dot,
                )}
              >
                {index + 1}
              </span>
              <div className="pl-2">
                <MilestoneCard
                  milestone={milestone}
                  onEdit={() => onEdit(milestone)}
                  onDelete={() => onDelete(milestone.id)}
                  variant="compact"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ActionItemProps {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
}

function ActionItem({ icon: Icon, label, description, onClick }: ActionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-brand-200 hover:bg-brand-50/60"
    >
      <span className="mt-0.5 rounded-full bg-brand-50 p-1.5 text-brand-600 group-hover:bg-white">
        <Icon className="h-4 w-4" aria-hidden />
        <span className="sr-only">{label}</span>
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium text-slate-800">{label}</span>
        <span className="mt-1 block text-xs text-slate-500">{description}</span>
      </span>
    </button>
  );
}
