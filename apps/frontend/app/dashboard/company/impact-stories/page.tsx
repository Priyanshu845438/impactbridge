"use client";

import { useMemo, useState } from "react";
import { Camera, CheckCircle2, ChevronDown, Film, Sparkles, Star } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const THEMES = ["All themes", "Education", "Health", "Environment"] as const;
const NGO_FILTERS = ["All partners", "Swasthya Foundation", "GreenFuture Trust", "TeachBridge Collective"] as const;
const STATUS_FILTERS = ["All", "Draft", "Under Review", "Published"] as const;

type Story = {
  id: string;
  programme: string;
  ngo: string;
  snippet: string;
  cover: string;
  theme: typeof THEMES[number];
  narrative: string;
  beforeAfter: Array<{ label: string; before: string; after: string }>;
  outcomes: string[];
  gallery: string[];
  status: "Draft" | "Under Review" | "Published";
  updatedDays: number;
};

const INITIAL_STORIES: Story[] = [
  {
    id: "science-wings",
    programme: "Science Wings Fellowship",
    ngo: "TeachBridge Collective",
    theme: "Education",
    snippet: "STEM mentors helped 1,200 girls in semi-urban Maharashtra build robotics projects that made it to state-level showcases.",
    cover: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80",
    narrative:
      "Funded by your 2023 CSR allocation, the Science Wings Fellowship embedded 48 STEM mentors across 24 government schools. The mentors introduced hands-on labs, robotics clubs, and career guidance. Within nine months, pass rates in physics jumped 22 points while attendance rose sharply. Parents reported stronger confidence in their daughters pursuing higher education.",
    beforeAfter: [
      { label: "Physics pass rate", before: "46%", after: "68%" },
      { label: "STEM club participation", before: "120 students", after: "1,120 students" },
      { label: "Secondary transition", before: "58%", after: "81%" },
    ],
    outcomes: ["Mentorship", "Robotics labs", "Parent engagement"],
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Published",
    updatedDays: 4,
  },
  {
    id: "rural-clinics",
    programme: "Rural Clinics on Wheels",
    ngo: "Swasthya Foundation",
    theme: "Health",
    snippet: "Mobile clinics reached 58 remote villages in Odisha, delivering prenatal care and chronic disease screening to 9,400 residents.",
    cover: "https://images.unsplash.com/photo-1580281658627-7664eb19f0c4?auto=format&fit=crop&w=900&q=80",
    narrative:
      "The Rural Clinics on Wheels programme is a shining example of community-first healthcare. Backed by your CSR grant, three mobile clinics staffed with midwives, nurses, and lab technicians provided care in historically underserved tribal districts. The teams conducted routine screenings, created referral pathways to district hospitals, and trained local ASHA workers. Maternal health compliance rose, and chronic conditions are now detected months earlier.",
    beforeAfter: [
      { label: "Prenatal visit adherence", before: "42%", after: "81%" },
      { label: "Hypertension detection", before: "18%", after: "46%" },
      { label: "Clinic follow-up", before: "24%", after: "67%" },
    ],
    outcomes: ["Mobile primary care", "ASHA upskilling", "Telehealth triage"],
    gallery: [
      "https://images.unsplash.com/photo-1504817343863-5092a9238036?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Under Review",
    updatedDays: 2,
  },
  {
    id: "mangrove-guardians",
    programme: "Mangrove Guardians",
    ngo: "GreenFuture Trust",
    theme: "Environment",
    snippet: "Coastal youth restored 320 hectares of mangroves in Andhra Pradesh, shielding 14 fishing hamlets from tidal flooding.",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    narrative:
      "Over two planting seasons, community volunteers and fisherwomen collectives replanted mangrove saplings in erosion-prone deltas. The project reintroduced biodiversity, anchored soil, and created eco-tourism livelihood pilots. Early modeling shows tidal surge impact down 38%, while crab and prawn populations rebounded, improving local incomes.",
    beforeAfter: [
      { label: "Hectares restored", before: "0", after: "320" },
      { label: "Tidal flood incidents", before: "14/year", after: "5/year" },
      { label: "Household income uplift", before: "—", after: "+18%" },
    ],
    outcomes: ["Habitat restoration", "Livelihood diversification", "Community stewardship"],
    gallery: [
      "https://images.unsplash.com/photo-1542317854-ff948c2dc01b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1526711657229-bad3d702c5d5?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Draft",
    updatedDays: 7,
  },
  {
    id: "urban-youth",
    programme: "Urban Youth Innovators",
    ngo: "TeachBridge Collective",
    theme: "Education",
    snippet: "Design-thinking labs powered 75 student-led solutions tackling waste segregation and last-mile tutoring in Delhi.",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    narrative:
      "Urban Youth Innovators pairs mentors from tech companies with municipal school students. With your support, the cohort prototyped solutions for waste management, digital literacy gaps, and inclusive learning. Several projects received city incubation grants, demonstrating the multiplier effect of investing in creative youth leadership.",
    beforeAfter: [
      { label: "Student-led pilots", before: "6", after: "31" },
      { label: "Community reach", before: "450 residents", after: "3,900 residents" },
      { label: "City grants awarded", before: "1", after: "8" },
    ],
    outcomes: ["Design labs", "Mentor network", "Civic incubation"],
    gallery: [
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Published",
    updatedDays: 1,
  },
];

const STATUS_BADGE: Record<Story["status"], string> = {
  Draft: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  "Under Review": "bg-amber-500/15 text-amber-600 dark:bg-amber-500/15 dark:text-amber-200",
  Published: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200",
};

const STATUS_OPTIONS: Story["status"][] = ["Draft", "Under Review", "Published"];

export default function ImpactStoriesPage() {
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [selectedTheme, setSelectedTheme] = useState<typeof THEMES[number]>(THEMES[0]!);
  const [selectedNgo, setSelectedNgo] = useState<typeof NGO_FILTERS[number]>(NGO_FILTERS[0]!);
  const [statusFilter, setStatusFilter] = useState<typeof STATUS_FILTERS[number]>(STATUS_FILTERS[0]!);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const themeMatch = selectedTheme === "All themes" || story.theme === selectedTheme;
      const ngoMatch = selectedNgo === "All partners" || story.ngo === selectedNgo;
      const statusMatch = statusFilter === "All" || story.status === statusFilter;
      return themeMatch && ngoMatch && statusMatch;
    });
  }, [stories, selectedNgo, selectedTheme, statusFilter]);

  const activeStory = activeStoryId ? stories.find((story) => story.id === activeStoryId) ?? null : null;

  const handleOpenStory = (story: Story) => {
    setActiveStoryId(story.id);
    setGalleryIndex(0);
  };

  const handleStatusChange = (storyId: string, status: Story["status"]) => {
    setStories((current) => current.map((story) => (story.id === storyId ? { ...story, status } : story)));
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Company", href: "/dashboard/company" },
          { label: "Impact Stories" },
        ]}
      />

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-500/10 dark:text-amber-200">
            Storytelling
          </Badge>
          <Badge className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/40 dark:text-sky-200">
            Mock data
          </Badge>
        </div>
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Impact Stories</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            See how your contributions created meaningful change across communities. These narratives combine field visits, beneficiary voices, and programme metrics to bring outcomes to life.
          </p>
        </div>
      </header>

      <section className="flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
        <FilterPill
          label="Theme"
          options={THEMES as unknown as string[]}
          activeOption={selectedTheme}
          onSelect={(value) => setSelectedTheme(value as typeof THEMES[number])}
        />
        <FilterPill
          label="NGO"
          options={NGO_FILTERS as unknown as string[]}
          activeOption={selectedNgo}
          onSelect={(value) => setSelectedNgo(value as typeof NGO_FILTERS[number])}
        />
        <FilterPill
          label="Status"
          options={STATUS_FILTERS as unknown as string[]}
          activeOption={statusFilter}
          onSelect={(value) => setStatusFilter(value as typeof STATUS_FILTERS[number])}
        />
      </section>

      <section>
        {filteredStories.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onReadMore={() => handleOpenStory(story)}
                onStatusChange={(status) => handleStatusChange(story.id, status)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 p-12 text-center dark:border-slate-800 dark:bg-slate-900/60">
            <Sparkles className="mx-auto h-10 w-10 text-slate-400" />
            <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-200">No stories match these filters yet.</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Reset the filters to explore the full library of programme narratives.</p>
          </div>
        )}
      </section>

      <Drawer
        open={Boolean(activeStory)}
        onClose={() => setActiveStoryId(null)}
        title={activeStory?.programme}
        description={activeStory ? `${activeStory.ngo} · ${activeStory.theme}` : undefined}
        className="max-lg:w-full lg:max-w-3xl"
      >
        {!activeStory ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/4" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeStory.gallery[galleryIndex]}
                src={activeStory.gallery[galleryIndex]}
                alt={activeStory.programme}
                className="h-60 w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {activeStory.gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setGalleryIndex(index)}
                    className={cn(
                      "h-3 w-3 rounded-full transition",
                      galleryIndex === index ? "bg-white" : "bg-white/60 hover:bg-white/80",
                    )}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{activeStory.narrative}</p>
              <div className="flex flex-wrap gap-2">
                {activeStory.outcomes.map((badge) => (
                  <Badge
                    key={badge}
                    className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200"
                  >
                    <CheckCircle2 className="mr-1.5 h-3 w-3" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Before / After impact</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {activeStory.beforeAfter.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white/90 p-3 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="rounded-full bg-rose-100/80 px-2 py-0.5 font-medium text-rose-600 dark:bg-rose-500/20 dark:text-rose-200">
                        {item.before}
                      </span>
                      <span className="text-slate-400">→</span>
                      <span className="rounded-full bg-emerald-100/80 px-2 py-0.5 font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200">
                        {item.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <Film className="h-4 w-4 text-slate-400" />
                Story captured through field visit, beneficiary interviews, and partner MIS data. Replace with CMS-driven content when connected to backend.
              </p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
interface FilterPillProps {
  label: string;
  options: string[];
  activeOption: string;
  onSelect: (value: string) => void;
}

function FilterPill({ label, options, activeOption, onSelect }: FilterPillProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold transition",
              option === activeOption
                ? "border-emerald-400 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/60 dark:bg-emerald-500/10 dark:text-emerald-200"
                : "border-slate-200 bg-white/80 text-slate-500 hover:border-emerald-200 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

interface StoryCardProps {
  story: Story;
  onReadMore: () => void;
  onStatusChange: (status: Story["status"]) => void;
}

function StoryCard({ story, onReadMore, onStatusChange }: StoryCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70">
      <div className="relative h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={story.cover} alt={story.programme} className="h-full w-full object-cover transition group-hover:scale-105" />
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white">
          <Star className="h-3 w-3 text-amber-300" />
          {story.theme}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{story.programme}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{story.ngo}</p>
            </div>
            <Badge className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", STATUS_BADGE[story.status])}>{story.status}</Badge>
          </div>
          <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{story.snippet}</p>
        </div>
        <div className="space-y-3">
          <Select value={story.status} onValueChange={(value: Story["status"]) => onStatusChange(value)}>
            <SelectTrigger className="h-9 w-full justify-between rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
              <SelectValue placeholder="Change status" />
              <ChevronDown className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Last updated: {story.updatedDays} days ago</span>
            <span>Status: {story.status}</span>
          </div>
          <div className="mt-2 flex items-center justify-between pt-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
              <Camera className="h-3 w-3" />
              Field verified
            </span>
            <Button variant="outline" size="sm" onClick={onReadMore} className="rounded-full px-4">
              Read full story
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
