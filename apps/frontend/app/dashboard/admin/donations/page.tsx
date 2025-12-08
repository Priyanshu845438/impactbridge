"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  CreditCard,
  Download,
  Filter,
    Search,
  TicketCheck,
} from "lucide-react";

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

const paymentStatus = ["Success", "Pending", "Failed"] as const;
const paymentModes = ["UPI", "Card", "Bank"] as const;

const donationRecords = [
  {
    id: "txn-5012",
    donor: "Aarav Mehta",
    donorId: "donor-001",
    entity: "Urban Shelter Expansion",
    entityType: "Campaign",
    amount: "₹1,50,000",
    mode: "UPI" as const,
    status: "Success" as const,
    ngo: "City Shelter Trust",
    company: "Zdxy Pvt Ltd",
    date: "24 Jan 2025",
  },
  {
    id: "txn-4890",
    donor: "Ishita Sharma",
    donorId: "donor-002",
    entity: "Swasthya Seva Foundation",
    entityType: "NGO",
    amount: "₹1,25,000",
    mode: "Card" as const,
    status: "Success" as const,
    ngo: "Swasthya Seva Foundation",
    company: "Zdxy Pvt Ltd",
    date: "12 Feb 2025",
  },
  {
    id: "txn-4721",
    donor: "Rahul Banerjee",
    donorId: "donor-003",
    entity: "Clean Water Initiative",
    entityType: "Campaign",
    amount: "₹85,000",
    mode: "Bank" as const,
    status: "Pending" as const,
    ngo: "Blue River Welfare",
    company: "Axis CSR Trust",
    date: "03 Feb 2025",
  },
  {
    id: "txn-4702",
    donor: "Nikita Rao",
    donorId: "donor-004",
    entity: "Green Earth Alliance",
    entityType: "NGO",
    amount: "₹2,40,000",
    mode: "Card" as const,
    status: "Success" as const,
    ngo: "Green Earth Alliance",
    company: "Axis CSR Trust",
    date: "28 Jan 2025",
  },
  {
    id: "txn-4654",
    donor: "Devansh Khanna",
    donorId: "donor-007",
    entity: "Rural Health Camps",
    entityType: "Campaign",
    amount: "₹95,000",
    mode: "UPI" as const,
    status: "Failed" as const,
    ngo: "HealthReach Foundation",
    company: "Zdxy Pvt Ltd",
    date: "25 Jan 2025",
  },
  {
    id: "txn-4599",
    donor: "Anjali Deshmukh",
    donorId: "donor-008",
    entity: "Swasthya Seva Foundation",
    entityType: "NGO",
    amount: "₹65,000",
    mode: "Bank" as const,
    status: "Success" as const,
    ngo: "Swasthya Seva Foundation",
    company: "Zdxy Pvt Ltd",
    date: "18 Jan 2025",
  },
] as const;

const donors = ["All", "Aarav Mehta", "Ishita Sharma", "Rahul Banerjee", "Nikita Rao", "Devansh Khanna", "Anjali Deshmukh"] as const;
const ngos = ["All", "City Shelter Trust", "Swasthya Seva Foundation", "Blue River Welfare", "Green Earth Alliance", "HealthReach Foundation"] as const;
const companies = ["All", "Zdxy Pvt Ltd", "Axis CSR Trust", "NorthBridge CSR"] as const;

const perPage = 5;

export default function DonationHistoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof paymentStatus)[number] | "All">("All");
  const [modeFilter, setModeFilter] = useState<(typeof paymentModes)[number] | "All">("All");
  const [donorFilter, setDonorFilter] = useState<(typeof donors)[number]>("All");
  const [ngoFilter, setNgoFilter] = useState<(typeof ngos)[number]>("All");
  const [companyFilter, setCompanyFilter] = useState<(typeof companies)[number]>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);

  const filteredDonations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return donationRecords.filter((donation) => {
      const matchesQuery =
        !query ||
        donation.donor.toLowerCase().includes(query) ||
        donation.entity.toLowerCase().includes(query) ||
        donation.ngo.toLowerCase().includes(query) ||
        donation.company.toLowerCase().includes(query) ||
        donation.amount.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "All" || donation.status === statusFilter;
      const matchesMode = modeFilter === "All" || donation.mode === modeFilter;
      const matchesDonor = donorFilter === "All" || donation.donor === donorFilter;
      const matchesNgo = ngoFilter === "All" || donation.ngo === ngoFilter;
      const matchesCompany = companyFilter === "All" || donation.company === companyFilter;

      return matchesQuery && matchesStatus && matchesMode && matchesDonor && matchesNgo && matchesCompany;
    });
  }, [companyFilter, donorFilter, modeFilter, ngoFilter, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredDonations.length / perPage));
  const paginatedDonations = filteredDonations.slice((page - 1) * perPage, page * perPage);

  const handlePageChange = (nextPage: number) => {
    if (nextPage === page) return;
    setLoading(true);
    setTimeout(() => {
      setPage(nextPage);
      setLoading(false);
    }, 320);
  };

  const openReceipt = (transactionId: string) => {
    setActiveReceiptId(transactionId);
    setReceiptModalOpen(true);
  };

  const activeDonation = activeReceiptId
    ? donationRecords.find((donation) => donation.id === activeReceiptId)
    : null;

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "All Donations" },
        ]}
      />

      <SectionHeader
        title="All Donations"
        subtitle="Monitor every contribution across donors, NGOs, and companies to maintain compliance and reporting."
        action={
          <Button type="button" variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
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
              placeholder="Search by donor, campaign, or organisation"
              className="h-9 border-none bg-transparent px-0 text-small focus-visible:ring-0"
              aria-label="Search donations"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value as typeof paymentStatus[number] | "All");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[160px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {["All", ...paymentStatus].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={modeFilter}
              onValueChange={(value) => {
                setModeFilter(value as typeof paymentModes[number] | "All");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[160px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                {["All", ...paymentModes].map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={donorFilter}
              onValueChange={(value) => {
                setDonorFilter(value as typeof donors[number]);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Donor" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {donors.map((donor) => (
                  <SelectItem key={donor} value={donor}>
                    {donor}
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
              <SelectTrigger className="w-[200px] rounded-full border-slate-200 dark:border-slate-700">
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

            <Select
              value={companyFilter}
              onValueChange={(value) => {
                setCompanyFilter(value as typeof companies[number]);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[200px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
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
                  <TableHead>Donor</TableHead>
                  <TableHead>Campaign / NGO</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: perPage }).map((_, index) => (
                      <TableRow key={`loading-row-${index}`} className="animate-pulse">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-3 w-32 rounded-full" />
                              <Skeleton className="h-3 w-24 rounded-full" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-48 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-24 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-20 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-16 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-28 rounded-full" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="ml-auto h-8 w-28 rounded-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  : paginatedDonations.map((donation) => (
                      <TableRow
                        key={donation.id}
                        className="text-sm text-slate-600 transition hover:bg-slate-50/80 dark:text-slate-300 dark:hover:bg-slate-900/30"
                      >
                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                          <div>
                            {donation.donor}
                            <p className="text-xs text-slate-400">{donation.company}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {donation.entity}
                            <p className="text-xs text-slate-400">{donation.entityType}</p>
                          </div>
                        </TableCell>
                        <TableCell>{donation.amount}</TableCell>
                        <TableCell className="inline-flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-slate-400" />
                          {donation.mode}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300"
                          >
                            {donation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{donation.date}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            className="gap-1 text-brand-600 hover:text-brand-700"
                            onClick={() => openReceipt(donation.id)}
                          >
                            <TicketCheck className="h-4 w-4" />
                            View receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                {!loading && !paginatedDonations.length ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                      No donations match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4 p-4 xl:hidden">
            {(loading ? Array.from({ length: perPage }) : paginatedDonations).map((donation, index) => (
              <div
                key={loading ? `mobile-loading-${index}` : donation.id}
                className="rounded-2xl border border-slate-200 p-4 shadow-sm dark:border-slate-800"
              >
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-3 w-36 rounded-full" />
                    <Skeleton className="h-3 w-24 rounded-full" />
                    <Skeleton className="h-3 w-20 rounded-full" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-24 rounded-full" />
                      <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{donation.donor}</p>
                      <p className="text-xs text-slate-400">{donation.company}</p>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{donation.entity}</p>
                    <p className="text-slate-600 dark:text-slate-300">{donation.amount}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{donation.status}</p>
                    <p className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="h-4 w-4" />
                      {donation.date}
                    </p>
                    <div className="pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full gap-2 border-slate-200 dark:border-slate-700"
                        onClick={() => openReceipt(donation.id)}
                      >
                        <TicketCheck className="h-4 w-4" />
                        View receipt
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {!loading && !paginatedDonations.length ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No donations found. Adjust your filters and try again.
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 lg:flex-row">
          <p>
            Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{paginatedDonations.length}</span> of
            <span className="font-semibold text-slate-700 dark:text-slate-200"> {filteredDonations.length}</span> donations
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

      <Modal open={receiptModalOpen} onOpenChange={setReceiptModalOpen} title="Donation receipt">
        {activeDonation ? (
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Transaction ID</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{activeDonation.id}</p>
              </div>
              <Badge
                variant="outline"
                className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300"
              >
                {activeDonation.status}
              </Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Donor</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{activeDonation.donor}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Program / NGO</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{activeDonation.entity}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Amount</p>
                <p className="mt-1 font-medium text-emerald-600">{activeDonation.amount}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Payment mode</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{activeDonation.mode}</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40">
              <span>{activeDonation.date}</span>
              <Button type="button" size="sm" variant="outline" className="gap-2 border-slate-200 dark:border-slate-700">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Skeleton className="h-5 w-40 rounded-full" />
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        )}
      </Modal>
    </div>
  );
}
