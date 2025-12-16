"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarClock,
  ChevronDown,
  Clock,
  Filter,
  Layers,
  Plus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TagSelector, type TagOption } from "@/components/ui/tag-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const STORY_STATUS = ["All", "Published", "Under Review", "Draft"] as const;

const STORY_SORT = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A → Z", value: "alphabetical" },
];

type StoryStatus = (typeof STORY_STATUS)[number];

type StoryCard = {
  id: string;
  title: string;
  status: "Published" | "Under Review" | "Draft";
  updated: string;
  ngo: string;
  programme: string;
  summary: string;
  cover: string;
  updatedDays: number;
  tags: string[];
};

const INITIAL_STORIES: StoryCard[] = [
  {
    id: "ST-2401",
    title: "Mobile Clinics Reached 40 New Villages",
    status: "Published",
    updated: "2024-09-18",
    ngo: "Swasthya Foundation",
    programme: "Rural Clinics on Wheels",
    summary:
      "Field doctors and midwives delivered primary care and antenatal support in remote hamlets.",
    cover:
      "https://images.unsplash.com/photo-1587502537147-117fbb0d4906?auto=format&fit=crop&w=960&q=80",
    updatedDays: 3,
    tags: ["health", "rural"],
  },
  {
    id: "ST-2402",
    title: "STEM Fellows Spark Curiosity in Rural Classrooms",
    status: "Published",
    updated: "2024-08-02",
    ngo: "TeachBridge Collective",
    programme: "Science Wings Fellowship",
    summary:
      "Mentors ran experiment labs after school, boosting science scores across three districts.",
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=960&q=80",
    updatedDays: 5,
    tags: ["education", "women"],
  },
  {
    id: "ST-2403",
    title: "Mangrove Guardians Restore Coastal Shields",
    status: "Under Review",
    updated: "2024-07-11",
    ngo: "GreenFuture Trust",
    programme: "Mangrove Guardians",
    summary:
      "Women-led collectives replanted 12,000 saplings protecting shoreline communities.",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=960&q=80",
    updatedDays: 10,
    tags: ["climate", "livelihoods"],
  },
  {
    id: "ST-2404",
    title: "Urban Youth Labs Pilot Solar Micro-grids",
    status: "Draft",
    updated: "2024-06-20",
    ngo: "Urban Change Lab",
    programme: "Solar Fellows",
    summary:
      "Student innovators prototyped neighborhood solar hubs with local technicians.",
    cover:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=960&q=80",
    updatedDays: 1,
    tags: ["climate", "education"],
  },
  {
    id: "ST-2405",
    title: "Women Rise Cooperative Launches Nutri Kitchens",
    status: "Published",
    updated: "2024-05-29",
    ngo: "Women Rise Coalition",
    programme: "Nutri Kitchens",
    summary:
      "Entrepreneurs set up micro-canteens offering fortified meals to adolescent girls.",
    cover:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=960&q=80",
    updatedDays: 6,
    tags: ["women", "health"],
  },
];

const STORY_TAG_OPTIONS: TagOption[] = [
  { label: "Education", value: "education" },
  { label: "Health", value: "health" },
  { label: "Women Empowerment", value: "women" },
  { label: "Climate Action", value: "climate" },
  { label: "Livelihoods", value: "livelihoods" },
  { label: "Child Rights", value: "child-rights" },
  { label: "Rural Development", value: "rural" },
];

const statusBadgeStyles: Record<StoryCard["status"], string> = {
  Published:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200",
  "Under Review":
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-200",
  Draft:
    "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
};

export default function ImpactStoriesManagePage() {
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [status, setStatus] = useState<StoryStatus>("All");
  const [ngo, setNgo] = useState<string>("All");
  const [sort, setSort] = useState<string>(STORY_SORT[0].value);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const tm = setTimeout(() => setLoading(false), 360);
    return () => clearTimeout(tm);
  }, []);

  const ngoOptions = useMemo(
    () => ["All", ...new Set(stories.map((story) => story.ngo))],
    [stories],
  );

const filteredStories = useMemo(() => {
    const list = stories.filter((story) => {
      const matchesStatus = status === "All" || story.status === status;
      const matchesNgo = ngo === "All" || story.ngo === ngo;
      const matchesQuery = query
        ? story.title.toLowerCase().includes(query.toLowerCase()) ||
          story.programme.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesTags = tags.length === 0 || tags.some((tag) => story.tags.includes(tag));
      return matchesStatus && matchesNgo && matchesQuery && matchesTags;
    });

    return list.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.updated).getTime() - new Date(b.updated).getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
      }
    });
  }, [stories, status, ngo, sort, query, tags]);

  const handleChangeStatus = (storyId: string, nextStatus: StoryCard["status"]) => {
    setStories((current) =>
      current.map((story) =>
        story.id === storyId
          ? {
              ...story,
              status: nextStatus,
              updated: new Date().toISOString(),
              updatedDays: 0,
            }
          : story,
      ),
    );
  };

  const describeLastUpdated = (days: number) => {
    if (days <= 0) return "Just updated";
    if (days === 1) return "Updated 1 day ago";
    return `Updated ${days} days ago`;
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Company", href: "/dashboard/company" },
          {
            label: "Impact Stories",
            href: "/dashboard/company/impact-stories",
          },
          { label: "Manage" },
        ]}
      />

      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
            <Layers className="h-4 w-4" /> Repository
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Impact Story Library
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Organise published narratives, refine drafts, and keep your CSR
              storytelling runway ready for the next showcase.
            </p>
          </div>
        </div>

        <Button asChild className="h-11 rounded-full px-5">
          <Link href="/dashboard/company/impact-stories/create">
            <Plus className="mr-2 h-4 w-4" /> Create new story
          </Link>
        </Button>
      </header>

      <section className="flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid gap-4 xl:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
          <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-slate-500 transition focus-within:border-emerald-500/60 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            <Filter className="h-4 w-4" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title or programme"
              className="border-none bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
            />
          </div>

          <Select
            value={status}
            onValueChange={(value: StoryStatus) => setStatus(value)}
          >
            <SelectTrigger className="rounded-3xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STORY_STATUS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ngo} onValueChange={setNgo}>
            <SelectTrigger className="rounded-3xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <SelectValue placeholder="NGO" />
            </SelectTrigger>
            <SelectContent>
              {ngoOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="rounded-3xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {STORY_SORT.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Tags
          </span>
          <TagSelector options={STORY_TAG_OPTIONS} value={tags} onChange={setTags} className="max-w-[460px]" />
        </div>
      </section>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-4xl border border-slate-200 bg-white/80 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
            >
              <Skeleton className="h-40 w-full" />
              <div className="space-y-4 p-5">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-3">
                  <Skeleton className="h-9 w-20 rounded-full" />
                  <Skeleton className="h-9 w-20 rounded-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : filteredStories.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredStories.map((story) => (
            <Card
              key={story.id}
              className="group flex h-full flex-col overflow-hidden rounded-4xl border border-slate-200 bg-white/95 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={story.cover}
                  alt={story.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-slate-950/60 to-transparent px-4 pb-4 pt-10 text-xs text-white">
                  <span className="font-medium">{story.programme}</span>
                  <Badge
                    className={cn(
                      "rounded-full px-3 py-1 text-[11px] font-semibold",
                      statusBadgeStyles[story.status],
                    )}
                  >
                    {story.status}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {story.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {story.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800/70">
                    {story.ngo}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarClock className="h-3.5 w-3.5" /> Updated{" "}
                    {new Date(story.updated).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {story.tags.length ? (
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {story.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800/70">
                        {STORY_TAG_OPTIONS.find((option) => option.value === tag)?.label ?? tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <Button variant="outline" size="sm" className="rounded-full px-4" asChild>
                    <Link href={`/dashboard/company/impact-stories/review/${story.id}`}>
                      Review
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full px-4" asChild>
                    <Link href={`/dashboard/company/impact-stories/publish/${story.id}`}>
                      Publish
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full px-4 text-rose-500 hover:text-rose-500"
                  >
                    Delete
                  </Button>
                  <Select
                    value={story.status}
                    onValueChange={(value: StoryCard["status"]) =>
                      handleChangeStatus(story.id, value)
                    }
                  >
                    <SelectTrigger className="h-9 w-40 justify-between rounded-full border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                      <SelectValue placeholder="Change status" />
                      <ChevronDown className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-3xl">
                      {(["Published", "Under Review", "Draft"] as const).map(
                        (option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between gap-2 rounded-3xl bg-slate-100/70 px-4 py-2 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {describeLastUpdated(story.updatedDays)}
                      <span className="mx-2 text-slate-400">•</span>
                      <span className="font-semibold uppercase tracking-tight text-slate-600 dark:text-slate-200">
                        Status: {story.status}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-6 rounded-4xl border border-dashed border-slate-300 bg-slate-50/70 p-12 text-center dark:border-slate-700 dark:bg-slate-900/60">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              No stories match your filters
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Adjust the filters or start crafting a new story to fill the
              library.
            </p>
          </div>
          <Button asChild className="rounded-full px-5">
            <Link href="/dashboard/company/impact-stories/create">
              Create story
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
