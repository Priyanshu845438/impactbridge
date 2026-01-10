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

import { useAdminDonations, type AdminDonationTableRecord } from "@/lib/hooks/use-admin-donations";
import { isFeatureEnabled } from "@/lib/feature-flags";

const paymentStatus = ["Success", "Pending", "Failed"] as const;
const paymentModes = ["UPI", "Card", "Bank", "Domestic", "Foreign", "Public form", "Unknown"] as const;

const unique = (values: ReadonlyArray<string | undefined | null>) =>
  Array.from(
    new Set(
      values.filter((value): value is string => typeof value === "string" && value.trim().length > 0),
    ),
  ).sort((first, second) => first.localeCompare(second));

const mockDonationRecords: readonly AdminDonationTableRecord[] = [
  {
    id: "txn-5012",
    donor: "Aarav Mehta",
    donorId: "donor-001",
    entity: "Urban Shelter Expansion",
    entityType: "Campaign",
    amount: "₹1,50,000",
    mode: "UPI",
    status: "Success",
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
    mode: "Card",
    status: "Success",
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
    mode: "Bank",
    status: "Pending",
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
    mode: "Card",
    status: "Success",
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
    mode: "UPI",
    status: "Failed",
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
    mode: "Bank",
    status: "Success",
    ngo: "Swasthya Seva Foundation",
    company: "Zdxy Pvt Ltd",
    date: "18 Jan 2025",
  },
];

const mockDonors = [
  "All",
  "Aarav Mehta",
  "Ishita Sharma",
  "Rahul Banerjee",
  "Nikita Rao",
  "Devansh Khanna",
  "Anjali Deshmukh",
] as const;

const mockNgos = [
  "All",
  "City Shelter Trust",
  "Swasthya Seva Foundation",
  "Blue River Welfare",
  "Green Earth Alliance",
  "HealthReach Foundation",
] as const;

const mockCompanies = ["All", "Zdxy Pvt Ltd", "Axis CSR Trust", "NorthBridge CSR"] as const;

const perPage = 5;

export default function DonationHistoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof paymentStatus)[number] | "All">("All");
  const [modeFilter, setModeFilter] = useState<(typeof paymentModes)[number] | "All">("All");
  const [donorFilter, setDonorFilter] = useState<string>("All");
  const [ngoFilter, setNgoFilter] = useState<string>("All");
  const [companyFilter, setCompanyFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);

  const apiEnabled = isFeatureEnabled("API_DASHBOARD");
  const { data: liveDonations, isLoading: isLoadingDonations } = useAdminDonations();

  const donors = apiEnabled && liveDonations.length > 0 ? ["All", ...unique(liveDonations.map((donation) => donation.donor))] : [...mockDonors];
  const ngos = apiEnabled && liveDonations.length > 0 ? ["All", ...unique(liveDonations.map((donation) => donation.ngo))] : [...mockNgos];
  const companies = apiEnabled && liveDonations.length > 0 ? ["All", ...unique(liveDonations.map((donation) => donation.company))] : [...mockCompanies];

  const donationRecords: readonly AdminDonationTableRecord[] =
    apiEnabled && liveDonations.length > 0 ? liveDonations : mockDonationRecords;

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
  }, [companyFilter, donorFilter, donationRecords, modeFilter, ngoFilter, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredDonations.length / perPage));
  const paginatedDonations = filteredDonations.slice((page - 1) * perPage, page * perPage);

  const handlePageChange = (nextPage: number) => {
    if (nextPage === page) return;
    setPage(nextPage);
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
                setDonorFilter(value);
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
                setNgoFilter(value);
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
                setCompanyFilter(value);
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
                {(apiEnabled && isLoadingDonations)
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
                            className="gap-2"
                            onClick={() => openReceipt(donation.id)}
                          >
                            <TicketCheck className="h-4 w-4" />
                            View receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>

          <div className="xl:hidden">
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {(apiEnabled && isLoadingDonations)
                ? Array.from({ length: perPage }).map((_, index) => (
                    <li key={`mobile-loading-${index}`} className="space-y-4 py-4">
                      <Skeleton className="h-4 w-40 rounded-full" />
                      <Skeleton className="h-4 w-32 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded-full" />
                      <Skeleton className="h-8 w-28 rounded-full" />
                    </li>
                  ))
                : paginatedDonations.map((donation) => (
                    <li key={donation.id} className="space-y-4 py-4">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{donation.donor}</p>
                        <p className="text-xs text-slate-400">{donation.company}</p>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        <p>
                          <span className="font-medium text-slate-900 dark:text-slate-100">Campaign / NGO:</span> {donation.entity}
                        </p>
                        <p>
                          <span className="font-medium text-slate-900 dark:text-slate-100">Amount:</span> {donation.amount}
                        </p>
                        <p className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-slate-400" />
                          {donation.mode}
                        </p>
                        <p>
                          <span className="font-medium text-slate-900 dark:text-slate-100">Status:</span> {donation.status}
                        </p>
                        <p>
                          <Calendar className="mr-2 inline h-4 w-4 text-slate-400" />
                          {donation.date}
                        </p>
                      </div>
                      <div>
                        <Button type="button" variant="outline" className="gap-2" onClick={() => openReceipt(donation.id)}>
                          <TicketCheck className="h-4 w-4" />
                          View receipt
                        </Button>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{paginatedDonations.length}</span> of
              <span className="font-semibold text-slate-700 dark:text-slate-200"> {filteredDonations.length} </span>
              records
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </Button>
              <p className="font-medium text-slate-700 dark:text-slate-200">
                Page {page} of {totalPages}
              </p>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={receiptModalOpen} onOpenChange={setReceiptModalOpen} title="Donation receipt">
        {!activeDonation ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-48 rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-3/4 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        ) : (
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-slate-900 dark:text-slate-100">{activeDonation.donor}</p>
              <p className="text-xs text-slate-400">{activeDonation.donorId}</p>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Campaign / NGO</p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{activeDonation.entity}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">NGO</p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{activeDonation.ngo}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Amount</p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{activeDonation.amount}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Date</p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{activeDonation.date}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-200 p-4 dark:border-slate-700">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Status</p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{activeDonation.status}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Receipts mirror the metadata captured during the transaction. Downloadable PDFs are coming soon.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" className="gap-2">
                <Download className="h-4 w-4" />
                Download receipt
              </Button>
              <Button type="button" variant="outline" className="gap-2">
                Share via email
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
