"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Mail, MapPin, Phone, ShieldCheck, Users } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const ngoProfile = {
  id: "ngo-1",
  name: "Bright Future Foundation",
  mission: "Deliver STEM education and mentorship to low-income students across tier-2 cities, building innovation hubs for the next generation.",
  categories: ["Education", "Livelihood"],
  verified: true,
  alignmentScore: "92",
  compliance: "All checks complete",
  stats: {
    donations: "₹4.2Cr",
    campaigns: 5,
    alignment: "High",
    compliance: "Verified",
  },
  overview: {
    focusAreas: ["STEM Labs", "Teacher Training", "Mentorship"],
    team: "Core team of 38 educators & mentors across 7 cities.",
  },
  contact: {
    owner: "Ananya Sharma",
    phone: "+91 98765 43210",
    email: "partnerships@brightfuture.org",
    location: "Bengaluru, Karnataka",
    registered: 2012,
    employees: 124,
  },
  campaigns: [
    {
      id: "campaign-1",
      title: "Project Udaan",
      status: "Active",
      impact: "6,800 students reached",
    },
    {
      id: "campaign-2",
      title: "MentorX",
      status: "In planning",
      impact: "Launching Q1 2026",
    },
  ],
  documents: [
    { id: "doc-1", name: "CSR-1 Registration", updated: "12 Aug 2025" },
    { id: "doc-2", name: "80G Certificate", updated: "18 Sep 2025" },
    { id: "doc-3", name: "Latest audit report", updated: "20 Sep 2025" },
  ],
};

export default function CompanyNgoProfilePage() {
  const [isLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/company" },
      { label: "Partnered NGOs", href: "/dashboard/company/ngos" },
      { label: ngoProfile.name },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-44 w-full rounded-4xl" />
        <Skeleton className="h-64 w-full rounded-4xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />
      <SectionHeader title={ngoProfile.name} subtitle={ngoProfile.mission} />

      <section className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <HeaderCard profile={ngoProfile} />
          <StatsRow profile={ngoProfile} />

          <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="h-auto w-full justify-start gap-2 rounded-3xl bg-slate-100/60 p-1 text-xs font-semibold uppercase tracking-[0.14em] dark:bg-slate-800/50">
                <TabsTrigger value="overview" className="rounded-2xl">Overview</TabsTrigger>
                <TabsTrigger value="campaigns" className="rounded-2xl">Campaigns</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-2xl">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <Card className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Mission</h3>
                  <p className="mt-2 leading-relaxed">{ngoProfile.mission}</p>
                </Card>
                <Card className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Team snapshot</h3>
                  <p className="mt-2">{ngoProfile.overview.team}</p>
                </Card>
                <Card className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Focus areas</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ngoProfile.overview.focusAreas.map((area) => (
                      <span key={area} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {area}
                      </span>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="campaigns">
                {ngoProfile.campaigns.length === 0 ? (
                  <EmptyState message="No campaigns linked with this NGO yet." />
                ) : (
                  <div className="space-y-3">
                    {ngoProfile.campaigns.map((campaign) => (
                      <Card key={campaign.id} className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{campaign.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{campaign.status}</p>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-300">{campaign.impact}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents">
                {ngoProfile.documents.length === 0 ? (
                  <EmptyState message="No public documents shared yet." />
                ) : (
                  <div className="space-y-3">
                    {ngoProfile.documents.map((document) => (
                      <Card key={document.id} className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{document.name}</p>
                          <span className="text-xs text-slate-500 dark:text-slate-400">Updated {document.updated}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <aside className="w-full space-y-4 lg:w-80">
          <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Contact information</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span>
                  Owner: <span className="font-semibold text-slate-900 dark:text-slate-100">{ngoProfile.contact.owner}</span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                {ngoProfile.contact.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                {ngoProfile.contact.email}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                {ngoProfile.contact.location}
              </p>
            </div>
            <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <p>Registered: {ngoProfile.contact.registered}</p>
              <p>Employees: {ngoProfile.contact.employees}</p>
            </div>
            <div className="mt-6 space-y-2">
              <Button className="w-full" variant="outline">
                Message NGO
              </Button>
              <Button className="w-full">Mark as partner</Button>
            </div>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function HeaderCard({ profile }: { profile: typeof ngoProfile }) {
  return (
    <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-lg font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
            {profile.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.name}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {profile.categories.map((category) => (
                <span key={category} className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {category}
                </span>
              ))}
              {profile.verified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-300">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <ShieldCheck className="h-3.5 w-3.5" /> CSR alignment: {profile.alignmentScore}
        </span>
      </div>
    </Card>
  );
}

function StatsRow({ profile }: { profile: typeof ngoProfile }) {
  const stats = [
    {
      label: "Total donations given",
      value: profile.stats.donations,
      helper: "Since onboarding",
      tone: "emerald",
    },
    {
      label: "Active campaigns",
      value: profile.stats.campaigns,
      helper: "With this company",
      tone: "sky",
    },
    {
      label: "Alignment score",
      value: profile.stats.alignment,
      helper: "ImpactBridge metric",
      tone: "violet",
    },
    {
      label: "Compliance status",
      value: profile.stats.compliance,
      helper: "Due diligence snapshot",
      tone: "amber",
    },
  ];

  const toneClasses: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    sky: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-200",
  };

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="space-y-3 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70">
          <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-2xl", toneClasses[stat.tone])}>
            ●
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{stat.helper}</p>
          </div>
        </Card>
      ))}
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </Card>
  );
}
