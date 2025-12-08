"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  BadgeCheck,
  Calendar,
  CalendarClock,
  Download,
  Edit,
  FileText,
  ImageIcon,
  IndianRupee,
  Layers,
  Pause,
  Play,
  Repeat,
  Search,
  Users,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CAMPAIGNS = [
  {
    id: "cmp-101",
    title: "Urban Shelter Expansion",
    status: "Active" as const,
    ngoId: "ngo-001",
    ngoName: "City Shelter Trust",
    category: "Livelihood",
    description:
      "Expanding emergency shelter capacity across South Mumbai wards with modular housing pods and wraparound services.",
    attachments: ["Shelter blueprint.pdf", "Budget allocation.xlsx"],
    targetAmount: "₹75,00,000",
    raisedAmount: "₹42,80,000",
    donorsCount: 148,
    daysRemaining: 34,
    donations: [
      {
        id: "txn-5012",
        donor: "Aarav Mehta",
        amount: "₹1,50,000",
        date: "24 Jan 2025",
        status: "Success",
        mode: "UPI",
      },
      {
        id: "txn-4721",
        donor: "Rahul Banerjee",
        amount: "₹85,000",
        date: "03 Feb 2025",
        status: "Pending",
        mode: "Bank",
      },
      {
        id: "txn-4599",
        donor: "Anjali Deshmukh",
        amount: "₹65,000",
        date: "18 Jan 2025",
        status: "Success",
        mode: "Bank",
      },
    ],
  },
  {
    id: "cmp-102",
    title: "STEM Learning Labs",
    status: "Draft" as const,
    ngoId: "ngo-002",
    ngoName: "Green Earth Alliance",
    category: "Education",
    description: "Setting up modular STEM labs across government schools in tier-2 cities with a focus on girls participation.",
    attachments: ["Curriculum outline.pdf"],
    targetAmount: "₹55,00,000",
    raisedAmount: "₹0",
    donorsCount: 0,
    daysRemaining: 90,
    donations: [],
  },
  {
    id: "cmp-103",
    title: "Rural Health Camps",
    status: "Active" as const,
    ngoId: "ngo-003",
    ngoName: "Swasthya Seva Foundation",
    category: "Healthcare",
    description:
      "Deploying mobile clinics with telemedicine support across 12 underserved blocks in Karnataka with weekly rotations.",
    attachments: ["Camp calendar.xlsx", "Medical partner MOU.pdf"],
    targetAmount: "₹32,00,000",
    raisedAmount: "₹18,40,000",
    donorsCount: 86,
    daysRemaining: 52,
    donations: [
      {
        id: "txn-5820",
        donor: "Nikita Rao",
        amount: "₹1,10,000",
        date: "02 Feb 2025",
        status: "Success",
        mode: "Card",
      },
    ],
  },
] as const;

type Campaign = (typeof CAMPAIGNS)[number];

const STATUS_TONE: Record<Campaign["status"], string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-600/50 dark:bg-emerald-500/10 dark:text-emerald-200",
  Draft: "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-600/40 dark:bg-amber-500/10 dark:text-amber-200",
  Closed: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-600/40 dark:bg-slate-500/10 dark:text-slate-200",
};

function findCampaignById(id: string | undefined) {
  if (!id) return undefined;
  return CAMPAIGNS.find((campaign) => campaign.id === id);
}

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);

  const campaign = useMemo(() => findCampaignById(campaignId), [campaignId]);

  if (!campaignId) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-32 w-full rounded-3xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (!campaign) {
    notFound();
    return null;
  }

  const handlePause = () => setPauseModalOpen(true);
  const handleClose = () => setCloseModalOpen(true);
  const handleDuplicate = () => setDuplicateModalOpen(true);

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Campaign Management", href: "/dashboard/admin/campaigns" },
          { label: campaign.title },
        ]}
      />

      <SectionHeader
        title="Campaign overview"
        subtitle="Monitor a single campaign across donations, storytelling, and configuration controls."
        action={
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" className="gap-2" onClick={handlePause}>
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button type="button" variant="outline" className="gap-2" onClick={handleClose}>
              <Play className="h-4 w-4 rotate-180" />
              Close
            </Button>
            <Button type="button" className="gap-2" onClick={handleDuplicate}>
              <Repeat className="h-4 w-4" />
              Duplicate
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {campaign.title}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-500" />
                <Link
                  href={`/dashboard/admin/ngos/${campaign.ngoId}`}
                  className="font-medium text-brand-600 transition hover:text-brand-700"
                >
                  {campaign.ngoName}
                </Link>
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                <Layers className="h-4 w-4" />
                {campaign.category}
              </span>
            </div>
          </div>
          <Badge variant="outline" className={`border ${STATUS_TONE[campaign.status]}`}>
            {campaign.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard icon={IndianRupee} label="Target amount" value={campaign.targetAmount} />
            <SummaryCard icon={IndianRupee} label="Raised so far" value={campaign.raisedAmount} tone="emerald" />
            <SummaryCard icon={Users} label="Donors" value={`${campaign.donorsCount}`} tone="brand" />
            <SummaryCard icon={CalendarClock} label="Days remaining" value={`${campaign.daysRemaining}`} tone="amber" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex w-full flex-wrap items-center justify-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">Campaign story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <p>{campaign.description}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Category</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{campaign.category}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Attachments</p>
                {campaign.attachments.length ? (
                  <ul className="mt-2 space-y-2">
                    {campaign.attachments.map((file) => (
                      <li key={file} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                        <span>{file}</span>
                        <Button type="button" variant="ghost" size="sm" className="gap-2 text-brand-600 hover:text-brand-700">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">No attachments uploaded yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">Donation ledger</CardTitle>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Track contributions flowing into this campaign.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
                  <Search className="h-4 w-4 text-slate-400" />
                  <Input placeholder="Search donations" className="h-8 border-none bg-transparent px-0 text-sm focus-visible:ring-0" />
                </div>
                <Button type="button" variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="hidden min-w-[720px] lg:block">
                <Table>
                  <TableHeader className="bg-slate-50/80 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:bg-slate-900/40">
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Mode</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaign.donations.length ? (
                      campaign.donations.map((donation) => (
                        <TableRow key={donation.id} className="text-sm text-slate-600 dark:text-slate-300">
                          <TableCell>{donation.donor}</TableCell>
                          <TableCell>{donation.amount}</TableCell>
                          <TableCell>{donation.date}</TableCell>
                          <TableCell>{donation.status}</TableCell>
                          <TableCell>{donation.mode}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                          No donations recorded yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-3 lg:hidden">
                {campaign.donations.length ? (
                  campaign.donations.map((donation) => (
                    <div key={donation.id} className="rounded-2xl border border-slate-200 p-4 shadow-sm dark:border-slate-800">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{donation.donor}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{donation.amount}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-4 w-4" />
                        {donation.date}
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">{donation.status}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Mode: {donation.mode}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    No transactions yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">Media library</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <p>Upload campaign visuals and collaterals to strengthen the story. Integration pending.</p>
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-slate-200 text-slate-400 dark:border-slate-700"
                  >
                    <ImageIcon className="h-6 w-6" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Campaign settings
              </CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Update campaign metadata. Saving will integrate with workflow approvals later.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="title">
                    Title
                  </label>
                  <Input id="title" defaultValue={campaign.title} className="rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="category">
                    Category
                  </label>
                  <Select defaultValue={campaign.category}>
                    <SelectTrigger id="category" className="rounded-2xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Education",
                        "Healthcare",
                        "Environment",
                        "Livelihood",
                        "Women empowerment",
                      ].map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="target">
                    Target amount
                  </label>
                  <Input id="target" defaultValue={campaign.targetAmount} className="rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="timeline">
                    Timeline
                  </label>
                  <Input id="timeline" defaultValue={`${campaign.daysRemaining} days remaining`} className="rounded-2xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="description">
                  Description
                </label>
                <Textarea
                  id="description"
                  defaultValue={campaign.description}
                  className="min-h-[160px] rounded-2xl"
                />
              </div>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <Button type="button" variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Cancel
                </Button>
                <Button type="button" className="gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Modal open={pauseModalOpen} onOpenChange={setPauseModalOpen} title="Pause campaign?">
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>Pausing will temporarily hide donation entry points. Resume anytime to continue fundraising.</p>
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setPauseModalOpen(false)}>
              Keep live
            </Button>
            <Button type="button" className="flex-1">
              Pause campaign
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={closeModalOpen} onOpenChange={setCloseModalOpen} title="Close campaign?">
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>Closing will lock donations and mark the campaign complete. This action can be reversed with admin approval.</p>
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setCloseModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="flex-1">
              Confirm close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={duplicateModalOpen} onOpenChange={setDuplicateModalOpen} title="Duplicate campaign">
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>Create a copy of this campaign for a new cycle. Draft will open in the campaign workspace.</p>
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setDuplicateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="flex-1">
              Create draft copy
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone = "slate",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "slate" | "emerald" | "brand" | "amber";
}) {
  const toneClasses: Record<typeof tone, string> = {
    slate: "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/40",
    emerald: "border-emerald-200 bg-emerald-50 dark:border-emerald-600/40 dark:bg-emerald-500/10",
    brand: "border-sky-200 bg-sky-50 dark:border-sky-600/40 dark:bg-sky-500/10",
    amber: "border-amber-200 bg-amber-50 dark:border-amber-600/40 dark:bg-amber-500/10",
  };

  return (
    <div className={`rounded-2xl border px-4 py-5 shadow-sm transition ${toneClasses[tone]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{label}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{value}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-slate-500 dark:bg-slate-900/40">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
