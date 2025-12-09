"use client";

import { useMemo, useState } from "react";
import {
  Filter,
  Pause,
  Plus,
  Search,
  SquareArrowOutUpRight,
} from "lucide-react";

import Link from "next/link";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const campaignStatus = ["Active", "Draft", "Closed"] as const;
const categories = ["Education", "Healthcare", "Environment", "Livelihood", "Women empowerment"] as const;
const ngos = ["All", "Swasthya Seva Foundation", "Green Earth Alliance", "City Shelter Trust", "Blue River Welfare"] as const;

const campaignRecords = [
  {
    id: "cmp-101",
    name: "Urban Shelter Expansion",
    ngo: "City Shelter Trust",
    status: "Active" as const,
    targetAmount: "₹75,00,000",
    raisedAmount: "₹42,80,000",
    category: "Livelihood",
  },
  {
    id: "cmp-102",
    name: "STEM Learning Labs",
    ngo: "Green Earth Alliance",
    status: "Draft" as const,
    targetAmount: "₹55,00,000",
    raisedAmount: "₹0",
    category: "Education",
  },
  {
    id: "cmp-103",
    name: "Rural Health Camps",
    ngo: "Swasthya Seva Foundation",
    status: "Active" as const,
    targetAmount: "₹32,00,000",
    raisedAmount: "₹18,40,000",
    category: "Healthcare",
  },
  {
    id: "cmp-104",
    name: "Clean Water Initiative",
    ngo: "Blue River Welfare",
    status: "Closed" as const,
    targetAmount: "₹48,00,000",
    raisedAmount: "₹48,00,000",
    category: "Environment",
  },
  {
    id: "cmp-105",
    name: "Young Innovators Scholarship",
    ngo: "Green Earth Alliance",
    status: "Active" as const,
    targetAmount: "₹28,00,000",
    raisedAmount: "₹12,60,000",
    category: "Education",
  },
  {
    id: "cmp-106",
    name: "Women Artisan Collective",
    ngo: "City Shelter Trust",
    status: "Draft" as const,
    targetAmount: "₹40,00,000",
    raisedAmount: "₹2,15,000",
    category: "Women empowerment",
  },
] as const;

const perPage = 5;

export default function CampaignManagementPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof campaignStatus)[number] | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<(typeof categories)[number] | "All">("All");
  const [ngoFilter, setNgoFilter] = useState<(typeof ngos)[number]>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const filteredCampaigns = useMemo(() => {
    const query = search.trim().toLowerCase();

    return campaignRecords.filter((campaign) => {
      const matchesQuery = !query || campaign.name.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || campaign.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || campaign.category === categoryFilter;
      const matchesNgo = ngoFilter === "All" || campaign.ngo === ngoFilter;

      return matchesQuery && matchesStatus && matchesCategory && matchesNgo;
    });
  }, [categoryFilter, ngoFilter, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / perPage));
  const paginatedCampaigns = filteredCampaigns.slice((page - 1) * perPage, page * perPage);

  const handlePageChange = (nextPage: number) => {
    if (nextPage === page) return;
    setLoading(true);
    setTimeout(() => {
      setPage(nextPage);
      setLoading(false);
    }, 320);
  };

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Campaign Management" },
        ]}
      />

      <SectionHeader
        title="Campaign Management"
        subtitle="Oversee NGO-led fundraising campaigns, monitor progress, and take action when needed."
        action={
          <Button type="button" onClick={() => setCreateModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create campaign
          </Button>
        }
      />

      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition dark:border-slate-700 dark:bg-slate-900/80">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search campaigns"
              className="h-9 border-none bg-transparent px-0 text-small focus-visible:ring-0"
              aria-label="Search campaigns"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value as typeof campaignStatus[number] | "All");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[160px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {["All", ...campaignStatus].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                setCategoryFilter(value as typeof categories[number] | "All");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[200px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {["All", ...categories].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={ngoFilter}
              onValueChange={(value) => {
                setNgoFilter(value as typeof ngos[number]);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[220px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="NGO" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {ngos.map((ngo) => (
                  <SelectItem key={ngo} value={ngo}>
                    {ngo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="button" variant="outline" className="gap-2 border-slate-200 dark:border-slate-700">
              <Filter className="h-4 w-4" />
              Advanced filters
            </Button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
          <div className="hidden min-w-[900px] xl:block">
            <Table>
              <TableHeader className="bg-slate-50/80 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:bg-slate-900/40">
                <TableRow>
                  <TableHead>Campaign name</TableHead>
                  <TableHead>NGO</TableHead>
                  <TableHead>Target amount</TableHead>
                  <TableHead>Raised amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: perPage }).map((_, index) => (
                      <TableRow key={`loading-row-${index}`} className="animate-pulse">
                        <TableCell>
                          <div className="space-y-2">
                            <Skeleton className="h-3 w-48 rounded-full" />
                            <Skeleton className="h-3 w-40 rounded-full" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-40 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-32 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-32 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-16 rounded-full" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="ml-auto h-8 w-32 rounded-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  : paginatedCampaigns.map((campaign) => (
                      <TableRow
                        key={campaign.id}
                        className="text-sm text-slate-600 transition hover:bg-slate-50/80 dark:text-slate-300 dark:hover:bg-slate-900/30"
                      >
                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">{campaign.name}</TableCell>
                        <TableCell>{campaign.ngo}</TableCell>
                        <TableCell>{campaign.targetAmount}</TableCell>
                        <TableCell>{campaign.raisedAmount}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300"
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-3 text-sm font-medium text-brand-600">
                            <Link href={`/dashboard/admin/campaigns/${campaign.id}`} className="transition hover:text-brand-700">
                              View
                            </Link>
                            <button type="button" className="inline-flex items-center gap-1 transition hover:text-amber-600">
                              <Pause className="h-4 w-4" />
                              Pause
                            </button>
                            <button type="button" className="inline-flex items-center gap-1 transition hover:text-rose-600">
                              <SquareArrowOutUpRight className="h-4 w-4" />
                              Archive
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                {!loading && !paginatedCampaigns.length ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                      No campaigns match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4 p-4 xl:hidden">
            {loading
              ? Array.from({ length: perPage }).map((_, index) => (
                  <div
                    key={`mobile-loading-${index}`}
                    className="rounded-2xl border border-slate-200 p-4 shadow-sm dark:border-slate-800"
                  >
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-40 rounded-full" />
                      <Skeleton className="h-3 w-32 rounded-full" />
                      <Skeleton className="h-3 w-28 rounded-full" />
                      <Skeleton className="h-3 w-24 rounded-full" />
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))
              : paginatedCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="rounded-2xl border border-slate-200 p-4 shadow-sm dark:border-slate-800"
                  >
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{campaign.name}</p>
                        <p className="text-xs text-slate-400">{campaign.ngo}</p>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">Target: {campaign.targetAmount}</p>
                      <p className="text-slate-600 dark:text-slate-300">Raised: {campaign.raisedAmount}</p>
                      <Badge
                        variant="outline"
                        className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300"
                      >
                        {campaign.status}
                      </Badge>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Link
                          className="flex-1 rounded-full border border-brand-200 bg-brand-50 py-2 text-center text-brand-600 transition hover:bg-brand-100"
                          href={`/dashboard/admin/campaigns/${campaign.id}`}
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          className="flex-1 rounded-full border border-amber-200 bg-amber-50 py-2 text-amber-600 transition hover:bg-amber-100"
                        >
                          Pause
                        </button>
                        <button
                          type="button"
                          className="flex-1 rounded-full border border-rose-200 bg-rose-50 py-2 text-rose-600 transition hover:bg-rose-100"
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            {!loading && !paginatedCampaigns.length ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No campaigns found. Adjust your filters and try again.
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 lg:flex-row">
          <p>
            Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{paginatedCampaigns.length}</span> of
            <span className="font-semibold text-slate-700 dark:text-slate-200"> {filteredCampaigns.length}</span> campaigns
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1 || loading}
              className="h-9 rounded-full border-slate-200 px-4 text-sm dark:border-slate-700"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <span>Page</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                {page}
              </span>
              <span>of {totalPages}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || loading}
              className="h-9 rounded-full border-slate-200 px-4 text-sm dark:border-slate-700"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create campaign">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Campaign creation workflow will connect to NGO proposals and CSR approvals. For now this is a placeholder.
          </p>
          <Button type="button" onClick={() => setCreateModalOpen(false)} className="w-full">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}
