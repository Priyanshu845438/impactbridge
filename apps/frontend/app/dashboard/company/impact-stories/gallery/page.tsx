"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Filter,
  Landmark,
  Layers,
  Sparkles,
  Tag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORIES = [
  {
    id: "ST-2401",
    title: "Mobile Clinics Reached 40 New Villages",
    ngo: "Swasthya Foundation",
    programme: "Rural Clinics on Wheels",
    year: "2024",
    topic: "Healthcare",
    cover:
      "https://images.unsplash.com/photo-1587502537147-117fbb0d4906?auto=format&fit=crop&w=960&q=80",
    excerpt:
      "Women-led paramedic teams brought primary healthcare, antenatal support, and vaccination access to 8,200 residents across northern Karnataka.",
    body: "Over the last quarter, the Rural Clinics on Wheels programme expanded to 40 underserved villages, providing doorstep medical care to over 8,200 residents. Led by a women-first paramedic team, each mobile clinic is equipped with diagnostics, antenatal essentials, and vaccine cold storage.",
    metrics: [
      { label: "Patients treated", value: "8,226" },
      { label: "High-risk pregnancies stabilised", value: "312" },
      { label: "Clinic uptime", value: "97%" },
    ],
  },
  {
    id: "ST-2402",
    title: "STEM Fellows Spark Curiosity in Rural Classrooms",
    ngo: "TeachBridge Collective",
    programme: "Science Wings Fellowship",
    year: "2024",
    topic: "Education",
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=960&q=80",
    excerpt:
      "Mentors ran experiment labs after school, boosting science scores and confidence across three districts.",
    body: "The fellowship placed 60 STEM mentors across government schools, establishing after-hours experiment labs. Weekly curiosity challenges and parent showcases lifted science scores by 28% across the cohort.",
    metrics: [
      { label: "Students reached", value: "12,400" },
      { label: "Lab sessions", value: "340" },
      { label: "Score improvement", value: "+28%" },
    ],
  },
  {
    id: "ST-2403",
    title: "Mangrove Guardians Restore Coastal Shields",
    ngo: "GreenFuture Trust",
    programme: "Mangrove Guardians",
    year: "2023",
    topic: "Climate",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=960&q=80",
    excerpt:
      "Women-led collectives replanted 12,000 saplings protecting shoreline communities from storm surges.",
    body: "Coastal collectives restored mangrove belts across three districts, combining nursery training with community-led monitoring. Early data points to stronger shoreline protection and revived crab fisheries.",
    metrics: [
      { label: "Saplings planted", value: "12,000" },
      { label: "Households protected", value: "2,400" },
      { label: "Women employed", value: "180" },
    ],
  },
  {
    id: "ST-2404",
    title: "Urban Youth Labs Pilot Solar Micro-grids",
    ngo: "Urban Change Lab",
    programme: "Solar Fellows",
    year: "2023",
    topic: "Energy",
    cover:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=960&q=80",
    excerpt:
      "Student innovators prototyped neighbourhood solar hubs with local technicians.",
    body: "Solar Fellows partnered with ward committees to design modular micro-grids powering community libraries and health kiosks. Training modules upskilled local technicians, ensuring maintenance ownership stays local.",
    metrics: [
      { label: "Micro-grids piloted", value: "14" },
      { label: "Carbon saved", value: "210 tCO₂" },
      { label: "Youth trained", value: "95" },
    ],
  },
];

const filterOptions = {
  ngo: ["All", ...Array.from(new Set(STORIES.map((story) => story.ngo)))],
  programme: [
    "All",
    ...Array.from(new Set(STORIES.map((story) => story.programme))),
  ],
  year: ["All", ...Array.from(new Set(STORIES.map((story) => story.year)))],
  topic: ["All", ...Array.from(new Set(STORIES.map((story) => story.topic)))],
};

export default function ImpactStoryGalleryPage() {
  const [ngo, setNgo] = useState<string>("All");
  const [programme, setProgramme] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [topic, setTopic] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedStory, setSelectedStory] = useState<
    (typeof STORIES)[number] | null
  >(null);
  const [page, setPage] = useState(1);

  const filteredStories = useMemo(() => {
    const matches = STORIES.filter((story) => {
      const matchesNgo = ngo === "All" || story.ngo === ngo;
      const matchesProgramme =
        programme === "All" || story.programme === programme;
      const matchesYear = year === "All" || story.year === year;
      const matchesTopic = topic === "All" || story.topic === topic;
      const matchesSearch = search
        ? story.title.toLowerCase().includes(search.toLowerCase()) ||
          story.excerpt.toLowerCase().includes(search.toLowerCase())
        : true;
      return (
        matchesNgo &&
        matchesProgramme &&
        matchesYear &&
        matchesTopic &&
        matchesSearch
      );
    });

    const pageSize = 6;
    const start = (page - 1) * pageSize;
    return {
      totalPages: Math.max(1, Math.ceil(matches.length / pageSize)),
      items: matches.slice(start, start + pageSize),
    };
  }, [ngo, programme, year, topic, search, page]);

  const { items, totalPages } = filteredStories;

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
          { label: "Public gallery" },
        ]}
      />

      <header className="space-y-3">
        <Badge className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-200">
          Public view
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Impact stories gallery
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Preview how supporters experience your published narratives. Filters
            simulate the public site’s exploration tools while data stays
            mock-only.
          </p>
        </div>
      </header>

      <section className="space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <Filter className="h-4 w-4" />
          Refine by NGO, programme, year, or topic to mimic supporter discovery
          journeys.
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search stories"
              className="rounded-3xl"
            />
          </div>
          <Select value={ngo} onValueChange={setNgo}>
            <SelectTrigger className="rounded-3xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <SelectValue placeholder="NGO" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.ngo.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={programme} onValueChange={setProgramme}>
            <SelectTrigger className="rounded-3xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <SelectValue placeholder="Programme" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.programme.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="rounded-3xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.year.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger className="rounded-3xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.topic.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {items.length ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((story) => (
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
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-slate-950/70 to-transparent px-4 pb-4 pt-10 text-xs text-white">
                    <span className="font-medium">{story.programme}</span>
                    <Badge className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white">
                      {story.topic}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {story.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800/70">
                        {story.ngo}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarRange className="h-3.5 w-3.5" /> {story.year}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {story.excerpt}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full px-4"
                      onClick={() => setSelectedStory(story)}
                    >
                      Read preview
                    </Button>
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-4xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <Button
              variant="outline"
              className="rounded-full px-4"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              className="rounded-full px-4"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-300 bg-slate-50/70 p-12 text-center dark:border-slate-700 dark:bg-slate-900/60">
          <Landmark className="h-10 w-10 text-slate-300" />
          <div className="space-y-2">
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              No stories found
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Adjust filters to explore different narratives.
            </p>
          </div>
        </Card>
      )}

      <Modal
        open={Boolean(selectedStory)}
        onClose={() => setSelectedStory(null)}
        title={selectedStory?.title ?? ""}
      >
        {selectedStory ? (
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="relative h-56 w-full">
                <Image
                  src={selectedStory.cover}
                  alt={selectedStory.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Badge className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
                  {selectedStory.programme}
                </Badge>
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" /> {selectedStory.ngo}
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" /> {selectedStory.topic}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarRange className="h-3.5 w-3.5" /> {selectedStory.year}
                </span>
              </div>
              <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
                {selectedStory.body}
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {selectedStory.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
                >
                  <p className="text-xs uppercase tracking-wide">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold">{metric.value}</p>
                </div>
              ))}
            </div>
            <Button
              className="w-full rounded-full"
              onClick={() => setSelectedStory(null)}
            >
              Close preview
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
