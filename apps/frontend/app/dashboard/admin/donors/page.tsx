"use client";

import { useMemo, useState } from "react";
import { Filter, Mail, MapPin, Phone, Search, UserRound } from "lucide-react";

import Link from "next/link";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Skeleton } from "@/components/ui/skeleton";

const donorStatus = ["Active", "Invited", "Inactive"] as const;
const locations = ["All", "Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Kolkata"] as const;

const donorRecords = [
  {
    id: "donor-001",
    name: "Aarav Mehta",
    email: "aarav.mehta@email.com",
    phone: "+91 98989 12345",
    city: "Mumbai",
    state: "Maharashtra",
    status: "Active" as const,
    pledgedAmount: "₹12,50,000",
    lastDonation: "24 Jan 2025",
  },
  {
    id: "donor-002",
    name: "Ishita Sharma",
    email: "ishita.sharma@email.com",
    phone: "+91 99221 98760",
    city: "Delhi",
    state: "Delhi",
    status: "Invited" as const,
    pledgedAmount: "₹6,80,000",
    lastDonation: "12 Feb 2025",
  },
  {
    id: "donor-003",
    name: "Rahul Banerjee",
    email: "rahul.banerjee@email.com",
    phone: "+91 90000 45678",
    city: "Kolkata",
    state: "West Bengal",
    status: "Inactive" as const,
    pledgedAmount: "₹2,40,000",
    lastDonation: "18 Nov 2024",
  },
  {
    id: "donor-004",
    name: "Nikita Rao",
    email: "nikita.rao@email.com",
    phone: "+91 98765 78901",
    city: "Bengaluru",
    state: "Karnataka",
    status: "Active" as const,
    pledgedAmount: "₹9,15,000",
    lastDonation: "02 Feb 2025",
  },
  {
    id: "donor-005",
    name: "Sanjay Patel",
    email: "sanjay.patel@email.com",
    phone: "+91 91234 78945",
    city: "Ahmedabad",
    state: "Gujarat",
    status: "Active" as const,
    pledgedAmount: "₹4,75,000",
    lastDonation: "08 Jan 2025",
  },
  {
    id: "donor-006",
    name: "Meghna Kapoor",
    email: "meghna.kapoor@email.com",
    phone: "+91 95555 32109",
    city: "Chennai",
    state: "Tamil Nadu",
    status: "Invited" as const,
    pledgedAmount: "₹3,60,000",
    lastDonation: "—",
  },
  {
    id: "donor-007",
    name: "Devansh Khanna",
    email: "devansh.khanna@email.com",
    phone: "+91 99887 65432",
    city: "Hyderabad",
    state: "Telangana",
    status: "Active" as const,
    pledgedAmount: "₹7,30,000",
    lastDonation: "30 Jan 2025",
  },
  {
    id: "donor-008",
    name: "Anjali Deshmukh",
    email: "anjali.deshmukh@email.com",
    phone: "+91 98888 11223",
    city: "Pune",
    state: "Maharashtra",
    status: "Inactive" as const,
    pledgedAmount: "₹1,95,000",
    lastDonation: "14 Oct 2024",
  },
] satisfies Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: typeof donorStatus[number];
  pledgedAmount: string;
  lastDonation: string;
}>;

const perPage = 5;

export default function AdminDonorManagementPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof donorStatus)[number] | "All">("All");
  const [locationFilter, setLocationFilter] = useState<(typeof locations)[number]>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filteredDonors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return donorRecords.filter((donor) => {
      const matchesSearch =
        !query ||
        donor.name.toLowerCase().includes(query) ||
        donor.email.toLowerCase().includes(query) ||
        donor.phone.replace(/\s+/g, "").includes(query.replace(/\s+/g, ""));

      const matchesStatus = statusFilter === "All" || donor.status === statusFilter;
      const matchesLocation =
        locationFilter === "All" || donor.city === locationFilter || donor.state === locationFilter;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [locationFilter, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredDonors.length / perPage));
  const paginatedDonors = filteredDonors.slice((page - 1) * perPage, page * perPage);

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
          { label: "Donor Management" },
        ]}
      />

      <SectionHeader
        title="Donor Management"
        subtitle="Track philanthropic partners, fundraising pledges, and recent engagement activity."
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
              placeholder="Search donors by name, email, or phone"
              className="h-9 border-none bg-transparent px-0 text-small focus-visible:ring-0"
              aria-label="Search donors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value as typeof statusFilter | "All");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {["All", ...donorStatus].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={locationFilter}
              onValueChange={(value) => {
                setLocationFilter(value as typeof locations[number]);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[200px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
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
          <div className="hidden min-w-[760px] lg:block">
            <Table>
              <TableHeader className="bg-slate-50/80 dark:bg-slate-900/40">
                <TableRow>
                  <TableHead className="w-[260px]">Donor</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: perPage }).map((_, index) => (
                      <TableRow key={`loading-${index}`} className="animate-pulse">
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
                          <Skeleton className="h-3 w-32 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-20 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-16 rounded-full" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="ml-auto h-8 w-24 rounded-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  : paginatedDonors.map((donor) => (
                      <TableRow key={donor.id} className="text-sm">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                              <UserRound className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-slate-100">{donor.name}</p>
                              <p className="text-xs text-slate-400">Last donation: {donor.lastDonation}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                            {donor.email}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-slate-400" />
                            {donor.phone}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            {donor.city}, {donor.state}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300"
                          >
                            {donor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-3 text-sm font-medium text-brand-600">
                            <Link href={`/dashboard/admin/donors/${donor.id}`} className="transition hover:text-brand-700">
                              View profile
                            </Link>
                            <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                            <button type="button" className="transition hover:text-brand-700">
                              Disable
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                {!loading && !paginatedDonors.length ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                      No donors match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4 p-4 lg:hidden">
            {(loading ? Array.from({ length: perPage }) : paginatedDonors).map((donor, index) => (
              <div
                key={loading ? `mobile-loading-${index}` : donor.id}
                className="rounded-2xl border border-slate-200 p-4 shadow-sm dark:border-slate-800"
              >
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-32 rounded-full" />
                    <Skeleton className="h-3 w-48 rounded-full" />
                    <Skeleton className="h-3 w-32 rounded-full" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-20 rounded-full" />
                      <Skeleton className="h-8 w-20 rounded-full" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{donor.name}</p>
                      <p className="text-xs text-slate-400">Last donation: {donor.lastDonation}</p>
                    </div>
                    <p className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {donor.email}
                    </p>
                    <p className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      {donor.phone}
                    </p>
                    <p className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {donor.city}, {donor.state}
                    </p>
                    <Badge
                      variant="outline"
                      className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300"
                    >
                      {donor.status}
                    </Badge>
                    <div className="flex gap-3 pt-2">
                      <Link
                        className="flex-1 rounded-full border border-brand-200 bg-brand-50 py-2 text-center text-brand-600 transition hover:bg-brand-100"
                        href={`/dashboard/admin/donors/${donor.id}`}
                      >
                        View profile
                      </Link>
                      <button
                        type="button"
                        className="flex-1 rounded-full border border-slate-200 bg-white py-2 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      >
                        Disable
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {!loading && !paginatedDonors.length ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No donors found. Adjust your filters and try again.
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 lg:flex-row">
          <p>
            Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{paginatedDonors.length}</span> of
            <span className="font-semibold text-slate-700 dark:text-slate-200"> {filteredDonors.length}</span> donors
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
    </div>
  );
}
