"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, Check, Flag, Link as LinkIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const MOCK_STORY = {
  id: "ST-2401",
  title: "Mobile Clinics Reached 40 New Villages",
  ngo: "Swasthya Foundation",
  programme: "Rural Clinics on Wheels",
  publishedOn: "2024-09-18",
  tags: ["Healthcare", "Rural", "Women-led", "Primary Care"],
  cover:
    "https://images.unsplash.com/photo-1587502537147-117fbb0d4906?auto=format&fit=crop&w=1920&q=80",
  status: "Awaiting Approval",
  version: "v1.3",
  reviewerNotes: [
    "Verify beneficiary numbers for Bhairavpura cluster",
    "Add quote highlighting frontline nurse experience",
    "Attach receipts for September medical supplies",
  ],
  narrative: {
    overview: [
      {
        type: "text",
        content:
          "Over the last quarter, the Rural Clinics on Wheels programme expanded to 40 underserved villages across northern Karnataka, providing doorstep medical care to over 8,200 residents. Led by a women-first paramedic team, each mobile clinic is equipped with basic diagnostics, antenatal care essentials, and vaccination storage.",
      },
      {
        type: "metric",
        title: "Patients treated",
        value: "8,226",
        helper: "60% women and adolescent girls",
      },
      {
        type: "metric",
        title: "High-risk pregnancies stabilised",
        value: "312",
        helper: "Referred to district hospital within 48h",
      },
    ],
    impact: [
      {
        type: "text",
        content:
          "Community health volunteers paired with mobile doctors to establish a monthly screening rhythm. WhatsApp triage enabled faster escalation for chronic cases, while nutrition workshops improved iron adherence for pregnant mothers.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=80",
        alt: "Nurse checking vitals",
        caption:
          "Nurse Asha monitoring vitals during a village clinic in Shivapura",
      },
      {
        type: "metric",
        title: "Haemoglobin improvement",
        value: "+18%",
        helper: "Across 540 monitored expectant mothers",
      },
    ],
    media: [
      {
        type: "text",
        content:
          "The media gallery captures the daily rhythm of the mobile clinic — from setting up inflatable triage tents to tele-consultations with district doctors. Audio snippets (coming soon) will surface caregiver testimonials and beneficiary voices.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
        alt: "Mobile clinic parked near school",
        caption:
          "Mobile van stationed outside the community school before evening consultations",
      },
    ],
    timeline: [
      {
        type: "text",
        content:
          "July & August focused on onboarding new ASHA workers and mapping high-burden hamlets. By September, the programme had synchronised with state immunisation drives, ensuring zero cold-chain disruptions for vaccines.",
      },
      {
        type: "metric",
        title: "Clinic uptime",
        value: "97%",
        helper: "Downtime limited to monsoon flooding events",
      },
    ],
  },
};

type SectionKey = "overview" | "impact" | "media" | "timeline";

const sections: Array<{ key: SectionKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "impact", label: "Impact" },
  { key: "media", label: "Media" },
  { key: "timeline", label: "Timeline" },
];

export default function ImpactStoryReviewPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");

  const sectionContent = useMemo(() => MOCK_STORY.narrative, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (
          visible?.target?.id &&
          sections.some((section) => section.key === visible.target.id)
        ) {
          setActiveSection(visible.target.id as SectionKey);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.key);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative pb-20">
      <ReadingProgressBar />

      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Company", href: "/dashboard/company" },
          {
            label: "Impact Stories",
            href: "/dashboard/company/impact-stories",
          },
          { label: "Review" },
        ]}
      />

      <header className="sticky top-16 z-20 mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          {sections.map((section) => (
            <button
              key={section.key}
              className={cn(
                "rounded-full px-4 py-1.5 transition",
                activeSection === section.key
                  ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800/70",
              )}
              onClick={() => {
                setActiveSection(section.key);
                document
                  .getElementById(section.key)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="rounded-full px-4">
            <Flag className="mr-2 h-4 w-4" /> Request changes
          </Button>
          <Button variant="outline" className="rounded-full px-4">
            <ArrowDownToLine className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button className="rounded-full px-5">
            <Check className="mr-2 h-4 w-4" /> Approve story
          </Button>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
        <article className="space-y-10">
          <section className="overflow-hidden rounded-4xl border border-slate-200 shadow-sm dark:border-slate-800">
            <div className="relative h-[360px] w-full">
              <Image
                src={MOCK_STORY.cover}
                alt={MOCK_STORY.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-8 text-white">
                <h1 className="text-4xl font-semibold tracking-tight">
                  {MOCK_STORY.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1">
                    <LinkIcon className="h-4 w-4" /> {MOCK_STORY.ngo}
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1">
                    <Layers className="h-4 w-4" /> {MOCK_STORY.programme}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    Published{" "}
                    {new Date(MOCK_STORY.publishedOn).toLocaleDateString(
                      "en-IN",
                      { month: "long", day: "numeric", year: "numeric" },
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white px-8 py-6 dark:bg-slate-950">
              <div className="flex flex-wrap items-center gap-2">
                {MOCK_STORY.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full border-slate-300 px-3 py-1 text-xs dark:border-slate-700"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {sections.map((section) => (
            <StorySection
              key={section.key}
              sectionKey={section.key}
              active={activeSection === section.key}
              blocks={sectionContent[section.key] as StoryBlock[]}
            />
          ))}
        </article>

        <aside className="space-y-6">
          <Card className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Review status
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs uppercase text-slate-400">Status</p>
                <p className="mt-1 text-base font-medium text-emerald-600 dark:text-emerald-300">
                  {MOCK_STORY.status}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs uppercase text-slate-400">Version</p>
                <p className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
                  {MOCK_STORY.version}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Reviewer notes
                </p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {MOCK_STORY.reviewerNotes.map((note) => (
                    <li key={note} className="leading-relaxed">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
          <Card className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Story metadata
            </h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Story ID</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {MOCK_STORY.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Submitted</span>
                <span>
                  {new Date(MOCK_STORY.publishedOn).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Locale</span>
                <span>en-IN</span>
              </div>
              <div className="flex justify-between">
                <span>Reviewer</span>
                <span>Priya Raman (CSR Manager)</span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

type StoryBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "metric"; title: string; value: string; helper: string };

interface StorySectionProps {
  sectionKey: SectionKey;
  active: boolean;
  blocks: StoryBlock[];
}

function StorySection({ sectionKey, blocks }: StorySectionProps) {
  return (
    <section
      id={sectionKey}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/70"
    >
      <h2 className="text-xl font-semibold capitalize text-slate-900 dark:text-slate-50">
        {sectionKey}
      </h2>
      <div className="space-y-6">
        {blocks.map((block, index) => {
          if (block.type === "text") {
            return (
              <p
                key={index}
                className="text-base leading-7 text-slate-600 dark:text-slate-300"
              >
                {block.content}
              </p>
            );
          }

          if (block.type === "image") {
            return (
              <figure
                key={index}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                  {block.caption}
                </figcaption>
              </figure>
            );
          }

          return (
            <div
              key={index}
              className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 dark:border-emerald-400/20 dark:bg-emerald-500/10"
            >
              <p className="text-xs uppercase text-emerald-600 dark:text-emerald-300">
                {block.title}
              </p>
              <p className="mt-2 text-3xl font-semibold text-emerald-700 dark:text-emerald-200">
                {block.value}
              </p>
              <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-200/80">
                {block.helper}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const value =
        docHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
          : 0;
      setProgress(value);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-30 h-1 bg-transparent">
      <div className="h-full w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0">
        <div
          className="h-full bg-emerald-500"
          style={{ width: `${progress}%`, transition: "width 120ms linear" }}
        />
      </div>
    </div>
  );
}

function Layers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 3L3 8l9 5 9-5-4.5-2.5L12 3zM3 12l9 5 9-5M3 16l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
