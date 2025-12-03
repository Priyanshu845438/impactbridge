"use client";

import { useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import {
  Archive,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  NotebookPen,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  NGO_STATUS_TONE,
  PROGRAMME_STATUS_TONE,
  findCompanyById,
  findCompanyProgramme,
} from "../../../../companies/data";

const tabItems = [
  { value: "overview", label: "Overview" },
  { value: "timeline", label: "Timeline" },
  { value: "documents", label: "Documents" },
  { value: "ngos", label: "Assigned NGOs" },
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
              {programme.ngos.length ? (
                <div className="space-y-3">
                  {programme.ngos.map((ngo) => (
                    <div
                      key={`${programme.id}-ngo-${ngo.name}`}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{ngo.name}</p>
                        <p className="text-xs text-slate-400">Focus: {ngo.focusArea}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`border ${NGO_STATUS_TONE[ngo.status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
                      >
                        {ngo.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
                  No NGO assigned yet.
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
    </div>
  );
}
