"use client";

import { useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock4,
  Globe2,
  Loader2,
  Lock,
  Sparkles,
  Tag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MOCK_STORY = {
  id: "ST-2401",
  title: "Mobile Clinics Reached 40 New Villages",
  ngo: "Swasthya Foundation",
  programme: "Rural Clinics on Wheels",
  cover:
    "https://images.unsplash.com/photo-1587502537147-117fbb0d4906?auto=format&fit=crop&w=960&q=80",
  excerpt:
    "Women-led paramedic teams brought primary healthcare, antenatal support, and vaccination access to 8,200 residents across northern Karnataka.",
  checklist: {
    coverImage: true,
    title: true,
    ngoLinked: true,
    programmeLinked: true,
    minLength: false,
    metricsAdded: true,
  },
};

type ChecklistKey = keyof typeof MOCK_STORY.checklist;

const CHECKLIST_LABELS: Record<ChecklistKey, string> = {
  coverImage: "Cover image uploaded",
  title: "Title provided",
  ngoLinked: "NGO partner linked",
  programmeLinked: "Programme linked",
  minLength: "Minimum story length met",
  metricsAdded: "Impact metrics added",
};

export default function ImpactStoryPublishPage() {
  const [metaTitle, setMetaTitle] = useState(MOCK_STORY.title);
  const [metaDescription, setMetaDescription] = useState(
    "Explore how mobile clinics are delivering doorstep medical care to rural families across northern Karnataka.",
  );
  const [visibility, setVisibility] = useState<"public" | "private">("private");
  const [scheduleDate, setScheduleDate] = useState<string>("2024-10-05");
  const [scheduleTime, setScheduleTime] = useState<string>("10:00");
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const checklist = MOCK_STORY.checklist;
  const checklistItems = useMemo(
    () => Object.entries(checklist) as Array<[ChecklistKey, boolean]>,
    [checklist],
  );
  const allValid = checklistItems.every(([, passed]) => passed);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishModalOpen(true);
    }, 800);
  };

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Company", href: "/dashboard/company" },
          {
            label: "Impact Stories",
            href: "/dashboard/company/impact-stories",
          },
          { label: "Publish" },
        ]}
      />

      <header className="space-y-2">
        <Badge className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:bg-purple-500/10 dark:text-purple-200">
          Publishing flow
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Prepare story for publication
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Review final checks, optimise metadata, and schedule your launch so
            donors view the most polished version of this narrative.
          </p>
        </div>
      </header>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section className="space-y-8">
          <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Validation checklist
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Ensure every requirement is complete before the story goes live.
              Validation mirrors the donor-facing experience.
            </p>

            <div className="mt-4 space-y-3">
              {checklistItems.map(([key, passed]) => (
                <div
                  key={key}
                  className={cn(
                    "flex items-start justify-between gap-4 rounded-3xl border px-4 py-3",
                    passed
                      ? "border-emerald-200 bg-emerald-50/70 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
                      : "border-amber-200 bg-amber-50/70 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200",
                  )}
                >
                  <div>
                    <p className="text-sm font-medium">
                      {CHECKLIST_LABELS[key]}
                    </p>
                    {!passed ? (
                      <span className="text-xs text-amber-500">
                        Add more narrative or metrics to unlock publishing
                      </span>
                    ) : null}
                  </div>
                  {passed ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Clock4 className="h-5 w-5" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              SEO & discovery
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Optimise how this story appears in search engines and community
              updates. All fields are mock-only today.
            </p>

            <div className="mt-4 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="meta-title">Meta title</Label>
                <Input
                  id="meta-title"
                  value={metaTitle}
                  onChange={(event) => setMetaTitle(event.target.value)}
                  placeholder="Headline for search engines"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="meta-description">Meta description</Label>
                <Textarea
                  id="meta-description"
                  value={metaDescription}
                  onChange={(event) => setMetaDescription(event.target.value)}
                  className="min-h-[90px]"
                  placeholder="Short description for donors and search results"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                  label="Readability"
                  value="Grade 8"
                  helper="Optimised for donors"
                  tone="emerald"
                />
                <MetricCard
                  label="Meta length"
                  value={`${metaTitle.length} chars`}
                  helper="Ideal: 50-60"
                  tone={metaTitle.length > 60 ? "amber" : "emerald"}
                />
                <MetricCard
                  label="Description length"
                  value={`${metaDescription.length} chars`}
                  helper="Ideal: 120-160"
                  tone={metaDescription.length > 160 ? "amber" : "emerald"}
                />
              </div>
            </div>
          </Card>

          <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Visibility & scheduling
            </h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <Label>Visibility</Label>
                <Select
                  value={visibility}
                  onValueChange={(value: "public" | "private") =>
                    setVisibility(value)
                  }
                >
                  <SelectTrigger className="rounded-3xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe2 className="h-4 w-4" /> Public
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" /> Private (internal review)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Schedule publish</Label>
                <div className="flex gap-3">
                  <Input
                    type="date"
                    value={scheduleDate}
                    onChange={(event) => setScheduleDate(event.target.value)}
                    className="rounded-3xl"
                  />
                  <Input
                    type="time"
                    value={scheduleTime}
                    onChange={(event) => setScheduleTime(event.target.value)}
                    className="rounded-3xl"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Time zone defaults to IST for now
                </p>
              </div>
            </div>
          </Card>
        </section>

        <aside className="space-y-8">
          <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Listing preview
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              This mirrors the public impact stories listing card.
            </p>
            <PreviewCard />
          </Card>

          <Card className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Launch readiness
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Visibility
                </div>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {visibility === "public" ? "Public" : "Private"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" /> Scheduled
                </div>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {scheduleDate} • {scheduleTime}
                </span>
              </div>
              <Button
                disabled={!allValid || isPublishing}
                className="w-full rounded-full px-5"
                onClick={handlePublish}
              >
                {isPublishing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}{" "}
                Publish story
              </Button>
              {!allValid ? (
                <p className="text-xs text-amber-500">
                  Complete the checklist before publishing.
                </p>
              ) : null}
            </div>
          </Card>
        </aside>
      </div>

      <Modal
        open={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        title="Story scheduled"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-50">
                Story queued for publishing
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Stakeholders will see the latest updates once it goes live on{" "}
                {scheduleDate} at {scheduleTime} (IST).
              </p>
            </div>
          </div>
          <Button
            className="w-full rounded-full"
            onClick={() => setPublishModalOpen(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function PreviewCard() {
  return (
    <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 shadow-sm transition hover:shadow-md dark:border-slate-800">
      <div className="h-40 w-full overflow-hidden bg-slate-200">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Badge className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
            {MOCK_STORY.programme}
          </Badge>
          <span>{MOCK_STORY.ngo}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          {MOCK_STORY.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {MOCK_STORY.excerpt}
        </p>
        <Button variant="outline" size="sm" className="rounded-full px-4">
          View story
        </Button>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
  tone: "emerald" | "amber";
}

function MetricCard({ label, value, helper, tone }: MetricCardProps) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-200 bg-emerald-50/70 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
      : "border-amber-200 bg-amber-50/70 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200";

  return (
    <div className={cn("rounded-3xl border px-4 py-4", toneClass)}>
      <p className="text-xs uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
      <p className="text-xs text-current/70">{helper}</p>
    </div>
  );
}
