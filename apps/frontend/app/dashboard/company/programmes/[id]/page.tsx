"use client";

import { notFound, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  Download,
  FileText,
  Flag,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { programmes } from "../mock-data";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-600",
  Completed: "bg-slate-500/10 text-slate-600",
  Upcoming: "bg-amber-500/10 text-amber-600",
};

export default function ProgrammeDetailPage() {
  const params = useParams<{ id: string }>();
  const [isLoading] = useState(false);
  const [hasError] = useState(false);

  const programme = useMemo(() => programmes.find((item) => item.id === params.id), [params.id]);

  const relatedProgrammes = useMemo(() => {
    if (!programme) return [];
    return programmes.filter((item) => programme.relatedProgrammeIds.includes(item.id));
  }, [programme]);

  const breadcrumbItems = useMemo(() => {
    if (!programme) {
      return [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Company", href: "/dashboard/company" },
        { label: "CSR Programmes", href: "/dashboard/company/programmes" },
      ];
    }
    return [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "CSR Programmes", href: "/dashboard/company/programmes" },
      { label: programme.name },
    ];
  }, [programme]);

  if (!programme) {
    return notFound();
  }

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      {isLoading ? (
        <PageSkeleton />
      ) : hasError ? (
        <ErrorState />
      ) : (
        <div className="space-y-8">
          <HeaderSection programme={programme} />
          <HeroSection programme={programme} />
          <MainContent programme={programme} relatedProgrammes={relatedProgrammes} />
        </div>
      )}
    </div>
  );
}

function HeaderSection({ programme }: { programme: (typeof programmes)[number] }) {
  return (
    <header className="flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusTone[programme.status])}>
            {programme.status}
          </Badge>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">CSR PROGRAMME</span>
        </div>
        <h1 className="text-2xl font-semibold leading-tight text-slate-900 dark:text-slate-50">{programme.name}</h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">{programme.summary}</p>
      </div>
      <Button size="lg" className="gap-2 rounded-2xl">
        Support programme
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </header>
  );
}

function HeroSection({ programme }: { programme: (typeof programmes)[number] }) {
  return (
    <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="relative h-60 w-full">
        <Image
          src={programme.bannerUrl}
          alt={`${programme.name} banner`}
          width={1280}
          height={360}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid gap-4 border-t border-slate-100 bg-white/90 p-6 text-sm dark:border-slate-800 dark:bg-slate-900/70 lg:grid-cols-5">
        <StatPill icon={Target} label="Budget" value={programme.budget} />
        <StatPill icon={Calendar} label="Timeline" value={programme.timeline} />
        <StatPill icon={Users} label="NGO partner" value={programme.ngo.name} />
        <StatPill icon={Sparkles} label="SDG focus" value={programme.sdgs.join(", ")} />
        <StatPill icon={MapPin} label="Region" value={programme.region} />
      </div>
    </section>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <Icon className="h-4 w-4" />
      </span>
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{value}</p>
      </div>
    </div>
  );
}

function MainContent({
  programme,
  relatedProgrammes,
}: {
  programme: (typeof programmes)[number];
  relatedProgrammes: typeof programmes;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="space-y-6 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex flex-wrap items-center gap-2 rounded-3xl bg-slate-100/70 p-1 dark:bg-slate-800/40">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ngo">NGO profile</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Programme overview</h2>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{programme.description}</p>
            </section>
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Strategic goals
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {programme.goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Impact to date
              </h3>
              <p className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                {programme.impactSummary}
              </p>
            </section>
          </TabsContent>

          <TabsContent value="ngo" className="space-y-4">
            <Card className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{programme.ngo.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{programme.ngo.mission}</p>
                </div>
                <Badge className="self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                  Verified partner
                </Badge>
              </div>
              <div className="grid gap-4 pt-4 text-sm sm:grid-cols-2">
                <InfoRow icon={Mail} label="Email" value={programme.ngo.email ?? "hello@example.org"} />
                <InfoRow icon={Phone} label="Phone" value={programme.ngo.phone ?? "N/A"} />
                <InfoRow icon={ShieldCheck} label="Website" value={programme.ngo.website ?? "N/A"} isLink />
                <InfoRow icon={MapPin} label="Region" value={programme.region} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4">
            <div className="space-y-3">
              {programme.milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className="flex gap-4 rounded-3xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/50"
                >
                  <div className="flex flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                      {index + 1}
                    </span>
                    {index !== programme.milestones.length - 1 ? (
                      <span className="mt-2 h-full w-px bg-slate-200 dark:bg-slate-700" />
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{milestone.date}</p>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{milestone.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{milestone.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-3">
            {programme.documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/70 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="space-y-1">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{document.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{document.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="updates" className="space-y-4">
            {programme.updates.length === 0 ? (
              <EmptyUpdatesState />
            ) : (
              <div className="space-y-3">
                {programme.updates.map((update) => (
                  <div
                    key={update.id}
                    className="rounded-3xl border border-slate-200 bg-white/70 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{update.timestamp}</p>
                    <h4 className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{update.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{update.description}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      <aside className="hidden space-y-6 xl:block">
        <ContactCard programme={programme} />
        <RelatedProgrammes programmes={relatedProgrammes} />
        <TagCloud programme={programme} />
      </aside>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  isLink = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
        <Icon className="h-4 w-4" />
      </span>
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{label}</p>
        {isLink && value.startsWith("http") ? (
          <Link href={value} target="_blank" className="text-sm text-emerald-600 hover:underline dark:text-emerald-300">
            {value}
          </Link>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300">{value}</p>
        )}
      </div>
    </div>
  );
}

function ContactCard({ programme }: { programme: (typeof programmes)[number] }) {
  return (
    <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">NGO contacts</h3>
      <div className="space-y-3 text-sm">
        <InfoRow icon={Users} label="Programme lead" value={programme.ngo.name} />
        <InfoRow icon={Mail} label="Email" value={programme.ngo.email ?? "contact@example.org"} />
        <InfoRow icon={Phone} label="Phone" value={programme.ngo.phone ?? "N/A"} />
        <InfoRow icon={ShieldCheck} label="Website" value={programme.ngo.website ?? "https://impactbridge.org"} isLink />
      </div>
      <Button variant="outline" className="w-full rounded-2xl">
        Request introduction
      </Button>
    </Card>
  );
}

function RelatedProgrammes({ programmes: related }: { programmes: Array<(typeof programmes)[number]> }) {
  if (!related.length) {
    return null;
  }
  return (
    <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Related programmes</h3>
      <div className="space-y-3 text-sm">
        {related.map((programme) => (
          <Link
            key={programme.id}
            href={`/dashboard/company/programmes/${programme.id}`}
            className="group block rounded-3xl border border-slate-200 bg-white/70 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/60 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/30"
          >
            <p className="font-semibold text-slate-800 transition group-hover:text-emerald-600 dark:text-slate-100 dark:group-hover:text-emerald-300">
              {programme.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{programme.summary}</p>
          </Link>
        ))}
      </div>
    </Card>
  );
}

function TagCloud({ programme }: { programme: (typeof programmes)[number] }) {
  return (
    <Card className="space-y-3 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Focus areas</h3>
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge variant="outline" className="border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300">
          {programme.category}
        </Badge>
        {programme.sdgs.map((sdg) => (
          <Badge key={sdg} variant="soft" className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {sdg}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

function EmptyUpdatesState() {
  return (
    <Card className="flex flex-col items-center gap-3 rounded-4xl border border-dashed border-slate-300 bg-white/50 p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
      <Flag className="h-10 w-10 text-slate-400" />
      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">No updates shared yet</h4>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        Updates from the NGO partner will appear here once the programme team posts field notes or milestone summaries.
      </p>
    </Card>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-24 w-full rounded-4xl" />
      <Skeleton className="h-60 w-full rounded-4xl" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Skeleton className="h-[520px] rounded-4xl" />
        <div className="space-y-4">
          <Skeleton className="h-52 rounded-4xl" />
          <Skeleton className="h-40 rounded-4xl" />
          <Skeleton className="h-32 rounded-4xl" />
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <Card className="flex flex-col items-center gap-3 rounded-4xl border border-dashed border-rose-200 bg-rose-50/70 p-10 text-center shadow-sm dark:border-rose-900/60 dark:bg-rose-900/20">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-200">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h3 className="text-base font-semibold text-rose-600 dark:text-rose-200">Unable to load programme details</h3>
      <p className="max-w-sm text-sm text-rose-500 dark:text-rose-200/80">
        Something went wrong while fetching programme data. Try refreshing the page or return to the programme directory.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" className="rounded-2xl" onClick={() => window.location.reload()}>
          Retry
        </Button>
        <Button asChild className="rounded-2xl">
          <Link href="/dashboard/company/programmes">Back to programmes</Link>
        </Button>
      </div>
    </Card>
  );
}
