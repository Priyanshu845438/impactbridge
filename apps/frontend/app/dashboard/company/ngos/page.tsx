"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Filter, Search, Tag } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface NgoCard {
  id: string;
  name: string;
  mission: string;
  categories: string[];
  status: "Active" | "Inactive" | "Pending";
  verified: boolean;
  logo?: string;
  campaigns: string[];
  docs: string;
}

const ngoList: NgoCard[] = [
  {
    id: "ngo-1",
    name: "Bright Future Foundation",
    mission: "Deliver STEM education and mentorship to low-income students across tier-2 cities.",
    categories: ["Education", "Livelihood"],
    status: "Active",
    verified: true,
    campaigns: ["Project Udaan", "MentorX"],
    docs: "12A, 80G, CSR-1",
  },
  {
    id: "ngo-2",
    name: "HealTrust",
    mission: "Operate mobile health camps for maternal and child care in underserved communities.",
    categories: ["Health"],
    status: "Active",
    verified: true,
    campaigns: ["Swasthya 2.0"],
    docs: "12A, 80G, FCRA",
  },
  {
    id: "ngo-3",
    name: "GreenRun Collective",
    mission: "Restore watersheds and drive climate-resilient agriculture across drought prone belts.",
    categories: ["Environment", "Rural"],
    status: "Pending",
    verified: false,
    campaigns: ["AquaShield"],
    docs: "12A, CSR-1",
  },
];

export default function CompanyPartneredNgosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedNgo, setSelectedNgo] = useState<NgoCard | null>(null);
  const [isLoading] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/company" },
      { label: "Partnered NGOs" },
    ],
    [],
  );

  const filteredNgos = useMemo(() => {
    return ngoList.filter((ngo) => {
      const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === "All" || ngo.categories.includes(category);
      const matchesStatus = status === "All" || ngo.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, category, status]);

  const isEmpty = !isLoading && filteredNgos.length === 0;

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />
      <SectionHeader
        title="Partnered NGOs"
        subtitle="Browse and manage your CSR-aligned NGO partners."
        action={
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Advanced filters
          </Button>
        }
      />

      <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by NGO name"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-2xl border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-700 focus:border-slate-400 focus:ring focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              />
            </div>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full rounded-2xl">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All categories</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Environment">Environment</SelectItem>
              <SelectItem value="Rural">Rural</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full rounded-2xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {isLoading ? (
        <NgoSkeleton />
      ) : isEmpty ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredNgos.map((ngo) => (
            <NgoCard key={ngo.id} ngo={ngo} onOpen={() => setSelectedNgo(ngo)} />
          ))}
        </div>
      )}

      <Modal
        open={!!selectedNgo}
        onClose={() => setSelectedNgo(null)}
        title={selectedNgo?.name ?? "NGO profile"}
        description="Verified information synced from ImpactBridge due diligence."
        size="lg"
      >
        {selectedNgo ? <NgoDetailDrawer ngo={selectedNgo} /> : <Skeleton className="h-48 w-full rounded-3xl" />}
      </Modal>
    </div>
  );
}

function NgoCard({ ngo, onOpen }: { ngo: NgoCard; onOpen: () => void }) {
  const initials = ngo.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <Card className="flex h-full flex-col gap-4 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-base font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{ngo.name}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{ngo.status}</span>
            {ngo.verified ? (
              <span className="inline-flex items-center gap-1 text-emerald-500">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">{ngo.mission}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {ngo.categories.map((category) => (
          <span key={category} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            <Tag className="h-3 w-3" />
            {category}
          </span>
        ))}
      </div>
      <Button size="sm" className="mt-2 w-fit" onClick={onOpen}>
        View profile
      </Button>
    </Card>
  );
}

function NgoDetailDrawer({ ngo }: { ngo: NgoCard }) {
  return (
    <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/80 text-base font-semibold text-white">
          {ngo.name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-slate-50">{ngo.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{ngo.status} partner</p>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Mission highlight</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{ngo.mission}</p>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Compliance status</h4>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
            CSR checks {ngo.verified ? "complete" : "in progress"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Documentation: {ngo.docs}</p>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Key CSR campaigns</h4>
          <ul className="mt-2 space-y-2">
            {ngo.campaigns.map((campaign) => (
              <li key={campaign} className="rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {campaign}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Button className="gap-2" variant="outline">
        Open full profile
      </Button>
    </div>
  );
}

function NgoSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <Skeleton className="h-14 w-36 rounded-xl" />
          <Skeleton className="mt-3 h-4 w-3/4" />
          <Skeleton className="mt-2 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-1/2" />
          <Skeleton className="mt-4 h-8 w-32 rounded-lg" />
        </Card>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 rounded-4xl border border-slate-200 bg-white/90 p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <Search className="h-10 w-10 text-slate-300" />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No partnered NGOs found</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">Adjust filters or onboard a new organisation to begin collaborating.</p>
    </Card>
  );
}
