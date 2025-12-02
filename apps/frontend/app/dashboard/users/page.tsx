"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Search, Users } from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { SkeletonCard, SkeletonText } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type UserRole = "SUPER_ADMIN" | "NGO" | "COMPANY" | "DONOR";
type UserStatus = "Active" | "Pending" | "Suspended";

interface DirectoryUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
}

const mockUsers: DirectoryUser[] = [
  {
    id: "1",
    name: "Aarti Desai",
    email: "aarti.desai@impactbridge.org",
    role: "SUPER_ADMIN",
    status: "Active",
    lastLogin: "Today, 09:15 AM",
  },
  {
    id: "2",
    name: "GreenFuture Foundation",
    email: "compliance@greenfuture.org",
    role: "NGO",
    status: "Pending",
    lastLogin: "Yesterday, 08:20 PM",
  },
  {
    id: "3",
    name: "Acme Industries CSR",
    email: "csr-team@acmeindustries.com",
    role: "COMPANY",
    status: "Active",
    lastLogin: "Yesterday, 01:45 PM",
  },
  {
    id: "4",
    name: "InspireGivers Trust",
    email: "hello@inspiregivers.in",
    role: "DONOR",
    status: "Active",
    lastLogin: "2 days ago",
  },
  {
    id: "5",
    name: "Swasthya Seva NGO",
    email: "care@swasthyaseva.org",
    role: "NGO",
    status: "Suspended",
    lastLogin: "5 days ago",
  },
  {
    id: "6",
    name: "BlueOrbit CSR",
    email: "csr@blueorbit.co",
    role: "COMPANY",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    id: "7",
    name: "Global Donors Collective",
    email: "contact@globaldonors.org",
    role: "DONOR",
    status: "Pending",
    lastLogin: "3 days ago",
  },
  {
    id: "8",
    name: "ImpactBridge QA",
    email: "qa@impactbridge.org",
    role: "SUPER_ADMIN",
    status: "Active",
    lastLogin: "Today, 11:05 AM",
  },
];

const roles: Array<{ label: string; value: "all" | UserRole }> = [
  { label: "All roles", value: "all" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "NGO", value: "NGO" },
  { label: "Company", value: "COMPANY" },
  { label: "Donor", value: "DONOR" },
];

const statuses: Array<{ label: string; value: "all" | UserStatus }> = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
  { label: "Suspended", value: "Suspended" },
];

export default function UserDirectoryPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return mockUsers.filter((user) => {
      const matchesQuery =
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, roleFilter, statusFilter]);

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonText lines={2} className="w-64" />
        <SkeletonCard className="h-24" />
        <SkeletonCard className="h-[320px]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="User Directory"
        subtitle="Search and manage platform users."
        action={
          <Button variant="outline" size="sm" className="gap-2">
            <Users className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-lg items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition focus-within:border-slate-300 focus-within:shadow">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name or email"
            aria-label="Search users"
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as typeof roleFilter)}>
            <SelectTrigger className="w-full min-w-[160px] rounded-full border-slate-200 bg-white">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
            <SelectTrigger className="w-full min-w-[160px] rounded-full border-slate-200 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {paginatedUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 py-16 text-center text-slate-500">
          <Users className="h-10 w-10 text-slate-400" />
          <p className="mt-4 text-sm font-semibold">No users found based on filters.</p>
          <p className="mt-1 text-xs">Try adjusting your search terms or filter selections.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white/95 shadow-sm">
          <div className="hidden min-w-[720px] grid-cols-[2fr_1fr_2fr_1fr_1.5fr_1fr] bg-slate-50/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 md:grid">
            <span>Name</span>
            <span>Role</span>
            <span>Email</span>
            <span>Status</span>
            <span>Last login</span>
            <span className="text-right">Action</span>
          </div>

          <div className="divide-y divide-slate-100 md:min-w-[720px]">
            {paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="grid gap-4 px-4 py-4 text-sm text-slate-700 transition hover:bg-slate-50/80 md:grid-cols-[2fr_1fr_2fr_1fr_1.5fr_1fr] md:px-6 md:py-5"
              >
                <div>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="self-center">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {user.role.replace("_", " ")}
                  </span>
                </div>
                <div className="md:self-center md:text-left">
                  <span className="text-xs text-slate-500 md:hidden">Email</span>
                  <p className="md:hidden">{user.email}</p>
                </div>
                <div className="self-center">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                      user.status === "Active" && "bg-emerald-100 text-emerald-700",
                      user.status === "Pending" && "bg-amber-100 text-amber-700",
                      user.status === "Suspended" && "bg-rose-100 text-rose-700",
                    )}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="self-center text-sm text-slate-600">
                  <span className="block md:hidden text-xs text-slate-500">Last login</span>
                  {user.lastLogin}
                </div>
                <div className="flex items-center justify-end">
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <Link href={`/dashboard/users/${user.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-transparent bg-transparent py-2 text-small text-slate-500 sm:flex-row">
        <span>
          Showing {(currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
