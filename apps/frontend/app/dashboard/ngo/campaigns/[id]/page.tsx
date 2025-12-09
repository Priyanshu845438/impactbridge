"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Calendar,
  Edit3,
  ExternalLink,
  PauseCircle,
  Share2,
  Users,
  XCircle,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CampaignDetail {
  id: string;
  name: string;
  status: "Active" | "Paused" | "Draft" | "Closed";
  category: string;
  description: string;
  coverImageUrl: string;
  targetAmount: number;
  raisedAmount: number;
  donors: number;
  daysRemaining: number;
  engagementScore: string;
}

interface DonationRow {
  id: string;
  donor: string;
  amount: number;
  date: string;
  status: "Success" | "Pending" | "Refunded";
}

const mockCampaign: CampaignDetail = {
  id: "cmp-21",
  name: "Rural Health Kits",
  status: "Active",
  category: "Healthcare",
  description:
    "Deliver essential medical kits to remote communities, ensuring every village health worker has the supplies they need for frontline care.",
  coverImageUrl:
    "https://images.unsplash.com/photo-1587502536263-21750b447ee5?auto=format&fit=crop&q=80&w=1200",
  targetAmount: 900000,
  raisedAmount: 640000,
  donors: 182,
  daysRemaining: 24,
  engagementScore: "A-",
};

const mockDonations: DonationRow[] = [
  { id: "d1", donor: "Ananya Sharma", amount: 15000, date: "12 Nov 2025", status: "Success" },
  { id: "d2", donor: "Bright Future CSR", amount: 120000, date: "10 Nov 2025", status: "Pending" },
  { id: "d3", donor: "Harish Mehta", amount: 8500, date: "03 Nov 2025", status: "Success" },
  { id: "d4", donor: "Unity Trust", amount: 50000, date: "28 Oct 2025", status: "Refunded" },
];

const statusTone: Record<CampaignDetail["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  Paused: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  Draft: "bg-slate-200 text-slate-600 dark:bg-slate-700/60 dark:text-slate-200",
  Closed: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
};

export default function NGOCampaignDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const campaign = useMemo(() => mockCampaign, []);

  const donors = useMemo(() => mockDonations, []);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "My Campaigns", href: "/dashboard/ngo/campaigns" },
      { label: campaign.name },
    ],
    [campaign.name],
  );

  return (
    <div className="space-y-8 pb-12">
      {isLoading ? (
        <Skeleton className="h-5 w-64 rounded-full" />
      ) : (
        <Breadcrumb items={breadcrumbItems} />
      )}

      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white/90 shadow-sm transition-all duration-500 ease-out dark:border-slate-800 dark:bg-slate-900/70">
        {isLoading ? (
          <div className="space-y-6 p-8">
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-5 w-48" />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-32 rounded-full" />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
                  {campaign.name}
                </h1>
                <div className="flex items-center gap-3">
                  <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusTone[campaign.status])}>
                    {campaign.status}
                  </Badge>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Campaign ID: {params.id}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" className="gap-2">
                  <PauseCircle className="h-4 w-4" />
                  Pause
                </Button>
                <Button variant="outline" className="gap-2 text-rose-500 hover:text-rose-600">
                  <XCircle className="h-4 w-4" />
                  Close
                </Button>
                <Button className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share link
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-32 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Target vs Raised"
              primary={`₹${campaign.raisedAmount.toLocaleString()}`}
              helper={`of ₹${campaign.targetAmount.toLocaleString()}`}
              accent="emerald"
            />
            <StatCard
              label="Donors"
              primary={`${campaign.donors}`}
              helper="Unique contributors"
              accent="sky"
              icon={<Users className="h-4 w-4" />}
            />
            <StatCard
              label="Days remaining"
              primary={`${campaign.daysRemaining}`}
              helper="Projected timeline"
              accent="amber"
              icon={<Calendar className="h-4 w-4" />}
            />
            <StatCard
              label="Engagement score"
              primary={campaign.engagementScore}
              helper="Based on recurring donors"
              accent="violet"
            />
          </div>
        )}
      </section>

      <section className="rounded-4xl border border-slate-200 bg-white/90 shadow-sm transition-all duration-500 ease-out dark:border-slate-800 dark:bg-slate-900/70">
        {isLoading ? (
          <div className="space-y-6 p-6">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        ) : (
          <Tabs defaultValue="overview" className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <TabsList className="bg-slate-100/80 dark:bg-slate-800/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <Button asChild variant="ghost" className="gap-2 text-sm">
                <Link href={`/dashboard/admin/campaigns/${campaign.id}`}>
                  View admin tools
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <TabsContent value="overview" className="space-y-6 pt-6">
              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">About this campaign</h3>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{campaign.description}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                    Category: {campaign.category}
                  </div>
                </div>
                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-700">
                  <img
                    src={campaign.coverImageUrl}
                    alt="Campaign cover"
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="donations" className="space-y-6 pt-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700">
                <table className="w-full min-w-max text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-400 dark:bg-slate-800/60">
                    <tr>
                      <th className="px-4 py-3 font-medium">Donor</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900/40">
                    {donors.map((donation) => (
                      <tr key={donation.id} className="transition hover:bg-emerald-50/40 dark:hover:bg-slate-800/80">
                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{donation.donor}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                          ₹{donation.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{donation.date}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{donation.status}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" className="text-sm text-emerald-600">
                            View receipt
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4 pt-6">
              <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Media library coming soon</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Upload images and videos to showcase campaign milestones.</p>
                <Button className="gap-2">
                  Upload files
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 pt-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Update campaign fundamentals. Saving will connect to ImpactBridge APIs once available.
              </p>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300" htmlFor="title">
                    Campaign title
                  </label>
                  <Input id="title" defaultValue={campaign.name} placeholder="Name your campaign" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300" htmlFor="goal">
                    Goal amount (₹)
                  </label>
                  <Input id="goal" type="number" defaultValue={campaign.targetAmount} />
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300" htmlFor="description">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    rows={5}
                    defaultValue={campaign.description}
                    placeholder="Describe your impact story..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    defaultValue={campaign.status}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="gap-2">Save changes</Button>
                <Button variant="ghost" className="text-slate-500">
                  Cancel
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </section>
    </div>
  );
}

interface StatCardProps {
  label: string;
  primary: string;
  helper: string;
  accent: "emerald" | "sky" | "amber" | "violet";
  icon?: React.ReactNode;
}

function StatCard({ label, primary, helper, accent, icon }: StatCardProps) {
  const accentTone: Record<StatCardProps["accent"], string> = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
    sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
    violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200",
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl", accentTone[accent])}>
        {icon ?? <BadgeCheck className="h-4 w-4" />}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{primary}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
      </div>
    </div>
  );
}

