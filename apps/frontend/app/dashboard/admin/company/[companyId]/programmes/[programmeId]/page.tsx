"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import {
  Archive,
  CalendarDays,
  CheckCircle2,
  Download,
  Edit,
  FileText,
  Layers,
  NotebookPen,
  Trash2,
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

import {
  NGO_STATUS_TONE,
  PROGRAMME_STATUS_TONE,
  findCompanyById,
  findCompanyProgramme,
} from "../../../../companies/data";

type AssignableStatus = "Verified" | "Pending";

interface AssignableNgo {
  name: string;
  registrationType: string;
  status: AssignableStatus;
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
    setMilestones(initialMilestones);
  }, [initialMilestones]);

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

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
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

              {programme.ngos.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {programme.ngos.map((ngo) => (
                    <div
                      key={`${programme.id}-ngo-${ngo.name}`}
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{ngo.name}</p>
                        <p className="text-xs text-slate-400">Focus: {ngo.focusArea}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={`border ${NGO_STATUS_TONE[ngo.status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
                        >
                          {ngo.status}
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          Remove
                        </Button>
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
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Track milestone health to keep CSR stakeholders aligned on progress.
                </p>
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

              {milestones.length ? (
                <div className="space-y-3">
                  {milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">{milestone.title}</h3>
                          {milestone.description ? (
                            <p className="mt-1 text-xs text-slate-500">{milestone.description}</p>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className={`border ${MILESTONE_STATUS_TONE[milestone.status]}`}>
                            {milestone.status}
                          </Badge>
                          <span className="text-xs text-slate-400">Deadline: {milestone.deadline}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Progress</span>
                          <span className="font-medium text-slate-700">{milestone.progress}%</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-brand-500 transition-all"
                            style={{ width: `${Math.min(100, Math.max(0, milestone.progress))}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-brand-600 hover:bg-brand-50 hover:text-brand-700"
                          onClick={() => handleEditMilestone(milestone)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => handleDeleteMilestone(milestone.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
              <Button type="button" variant="ghost" onClick={closeAssignModal}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={closeAssignModal}
                className="bg-brand-600 text-white hover:bg-brand-700"
              >
                Confirm
              </Button>
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
                filteredAssignableNgos.map((ngo) => (
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
                      <Button type="button" variant="outline" size="sm" onClick={() => setPendingSelection(ngo)}>
                        Select
                      </Button>
                    </div>
                  </div>
                ))
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
