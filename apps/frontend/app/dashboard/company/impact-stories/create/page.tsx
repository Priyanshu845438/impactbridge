"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ImagePlus, Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { TagSelector, type TagOption, resolveTags } from "@/components/ui/tag-selector";

const NGO_OPTIONS = ["Swasthya Foundation", "GreenFuture Trust", "TeachBridge Collective", "Women Rise Coalition"];
const PROGRAMME_OPTIONS = ["Rural Clinics on Wheels", "Mangrove Guardians", "Science Wings Fellowship", "Urban Youth Innovators"];
const MAX_SUMMARY = 200;
const STORY_TAG_OPTIONS: TagOption[] = [
  { label: "Education", value: "education" },
  { label: "Health", value: "health" },
  { label: "Women Empowerment", value: "women" },
  { label: "Climate Action", value: "climate" },
  { label: "Livelihoods", value: "livelihoods" },
  { label: "Child Rights", value: "child-rights" },
  { label: "Rural Development", value: "rural" },
];

export default function ImpactStoryBuilderPage() {
  const [title, setTitle] = useState("");
  const [ngo, setNgo] = useState<string | undefined>();
  const [programme, setProgramme] = useState<string | undefined>();
  const [summary, setSummary] = useState("");
  const [narrative, setNarrative] = useState("");
  const [outcomes, setOutcomes] = useState("Mentorship; Community clinics; Climate resilience");
  const [images, setImages] = useState<string[]>([]);
  const [previewReady, setPreviewReady] = useState(false);
  const [tags, setTags] = useState<string[]>(["education", "women"]);

  useEffect(() => {
    const tm = setTimeout(() => setPreviewReady(true), 350);
    return () => clearTimeout(tm);
  }, []);

  const summaryRemaining = MAX_SUMMARY - summary.length;
  const parsedOutcomes = useMemo(
    () =>
      outcomes
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean),
    [outcomes],
  );

  const handleImagePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const url = typeof loadEvent.target?.result === "string" ? loadEvent.target.result : undefined;
      if (!url) return;
      setImages((prev) => [...prev.slice(-4), url]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Company", href: "/dashboard/company" },
          { label: "Impact Stories", href: "/dashboard/company/impact-stories" },
          { label: "Create" },
        ]}
      />

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/40 dark:text-sky-200">
            Builder
          </Badge>
          <Badge className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
            Draft Mode
          </Badge>
        </div>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Impact Story Builder</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Draft compelling narratives, highlight key metrics, and preview how the story will appear to CSR stakeholders before publishing.
          </p>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="space-y-6 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="story-title">
              Title
            </label>
            <Input id="story-title" placeholder="e.g., STEM Fellows Transform Rural Classrooms" value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">NGO partner</label>
              <Select value={ngo} onValueChange={setNgo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select NGO" />
                </SelectTrigger>
                <SelectContent>
                  {NGO_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Programme</label>
              <Select value={programme} onValueChange={setProgramme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select programme" />
                </SelectTrigger>
                <SelectContent>
                  {PROGRAMME_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="story-summary">
                Short summary
              </label>
              <span className={cn("text-xs", summaryRemaining < 0 ? "text-rose-500" : "text-slate-400")}>{summaryRemaining} characters left</span>
            </div>
            <Textarea
              id="story-summary"
              value={summary}
              maxLength={MAX_SUMMARY}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Two-sentence teaser highlighting the impact."
              className="min-h-[90px]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="story-narrative">
              Full narrative
            </label>
            <AutoTextarea id="story-narrative" value={narrative} onChange={setNarrative} placeholder="Write the full story, including community voices, milestones, and key changes." />
            <p className="text-xs text-slate-500 dark:text-slate-400">Rich text toolbar coming soon — for now, use paragraphs to structure the story.</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="story-outcomes">
              Outcome metrics (separate with semicolons)
            </label>
            <Textarea
              id="story-outcomes"
              value={outcomes}
              onChange={(event) => setOutcomes(event.target.value)}
              className="min-h-[70px]"
              placeholder="e.g., STEM pass rate +22%; Prenatal visit adherence +39%; Income uplift +18%"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Upload gallery</label>
              <span className="text-xs text-slate-400">Max 5 mock previews</span>
            </div>
            <label
              htmlFor="story-upload"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center text-sm text-slate-500 transition hover:border-emerald-400 hover:bg-emerald-50/40 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10"
            >
              <ImagePlus className="h-5 w-5" />
              <span>Drag & drop or click to add an image</span>
              <input id="story-upload" type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
            </label>
            {images.length ? (
              <div className="flex flex-wrap gap-3">
                {images.map((src) => (
                  <div key={src} className="relative h-20 w-28 overflow-hidden rounded-2xl">
                    <Image src={src} alt="Story preview" fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Story tags</label>
            <TagSelector options={STORY_TAG_OPTIONS} value={tags} onChange={setTags} />
            <p className="text-xs text-slate-500 dark:text-slate-400">Use tags to help stakeholders filter stories by focus area. Multiple selections allowed.</p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
            <Button type="button" variant="outline" className="rounded-full px-5">
              Save draft
            </Button>
            <Button type="button" className="rounded-full px-5">
              Publish story
            </Button>
          </div>
        </Card>

        <Card className="rounded-4xl border border-slate-200 bg-white/95 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-200">Live preview</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Instantly mirrors form inputs — publish when it feels ready.</p>
          </div>
          <div className="relative p-6">
            {!previewReady ? (
              <div className="space-y-4">
                <Skeleton className="h-48 w-full rounded-3xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="grid gap-2 sm:grid-cols-2">
                  <Skeleton className="h-3" />
                  <Skeleton className="h-3" />
                </div>
              </div>
            ) : (
              <StoryPreview
                title={title}
                ngo={ngo}
                programme={programme}
                summary={summary}
                narrative={narrative}
                outcomes={parsedOutcomes}
                images={images}
                tags={resolveTags(tags, STORY_TAG_OPTIONS).map((option) => option.label)}
              />
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}

interface AutoTextareaProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function AutoTextarea({ id, value, onChange, placeholder }: AutoTextareaProps) {
  const [height, setHeight] = useState<number | undefined>();

  return (
    <Textarea
      id={id}
      value={value}
      placeholder={placeholder}
      style={{ height }}
      className="min-h-[160px] resize-none whitespace-pre-wrap"
      onChange={(event) => {
        const element = event.target;
        onChange(element.value);
        requestAnimationFrame(() => {
          setHeight(0);
          requestAnimationFrame(() => setHeight(element.scrollHeight));
        });
      }}
    />
  );
}

interface StoryPreviewProps {
  title: string;
  ngo?: string;
  programme?: string;
  summary: string;
  narrative: string;
  outcomes: string[];
  images: string[];
  tags: string[];
}

function StoryPreview({ title, ngo, programme, summary, narrative, outcomes, images, tags }: StoryPreviewProps) {
  const readyImages = images.length ? images : ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"];

  const safeSummary = summary || "Add a short 2-line summary describing the headline impact.";
  const safeNarrative = narrative || "Use the narrative field to elaborate the journey: contextual challenge, interventions, community voices, and measurable change.";

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-800">
        <Image src={readyImages[0]!} alt="Preview visual" width={960} height={480} className="h-52 w-full object-cover" />
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white">
          <Sparkles className="h-3 w-3 text-amber-300" />
          {programme ?? "Programme name"}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title || "Story title goes here"}</h3>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{ngo ?? "Select an NGO"}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{safeSummary}</p>
      </div>
      {tags.length ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
        <p>{safeNarrative}</p>
        {outcomes.length ? (
          <div className="flex flex-wrap gap-2">
            {outcomes.map((item) => (
              <span key={item} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-3 gap-2">
          {images.slice(1).map((src) => (
            <div key={src} className="relative h-20 w-full overflow-hidden rounded-2xl">
              <Image src={src} alt="Preview thumbnail" fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
