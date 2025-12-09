"use client";

import { useCallback, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  FileText,
  Filter,
  Link2,
  RefreshCcw,
  Search,
  UserRound,
} from "lucide-react";

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
import { Drawer } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const mockAuditLogs = [
  {
    id: "log-001",
    user: "Aarav Mehta",
    userId: "user-001",
    role: "SUPER_ADMIN",
    action: "Approved NGO document",
    entity: "NGO: Clean Water Initiative",
    entityHref: "/dashboard/admin/ngos/ngo-501/documents",
    timestamp: "2025-02-18T09:24:00Z",
    device: "Chrome on macOS",
    ip: "49.37.112.90",
    summary:
      "Verified compliance dossier and approved the latest bank statement for Clean Water Initiative.",
  },
  {
    id: "log-002",
    user: "Naina Sharma",
    userId: "user-237",
    role: "COMPANY",
    action: "Updated CSR pledge",
    entity: "Company: Zdxy Pvt Ltd",
    entityHref: "/dashboard/admin/company/zdxy",
    timestamp: "2025-02-18T08:10:00Z",
    device: "Edge on Windows",
    ip: "182.73.22.51",
    summary: "Adjusted FY25 CSR commitment to ₹12 Cr and added 2 priority sectors.",
  },
  {
    id: "log-003",
    user: "Rahul Verma",
    userId: "user-510",
    role: "NGO",
    action: "Uploaded campaign report",
    entity: "Campaign: Green Schools Drive",
    entityHref: "/dashboard/admin/campaigns/camp-209",
    timestamp: "2025-02-17T17:45:00Z",
    device: "Safari on iOS",
    ip: "103.55.117.12",
    summary: "Submitted impact report with photo evidence for Green Schools Drive.",
  },
  {
    id: "log-004",
    user: "Joel Dsouza",
    userId: "user-611",
    role: "DONOR",
    action: "Made donation",
    entity: "Donation: DN-98314",
    entityHref: "/dashboard/admin/donations/dn-98314",
    timestamp: "2025-02-16T14:18:00Z",
    device: "Chrome on Android",
    ip: "106.51.74.20",
    summary: "Donated ₹1,50,000 to Rural Healthcare Revival campaign.",
  },
  {
    id: "log-005",
    user: "Admin Console",
    userId: "system",
    role: "SYSTEM",
    action: "Synced GSTIN",
    entity: "Company: Horizon Tech Ltd",
    entityHref: "/dashboard/admin/company/horizon",
    timestamp: "2025-02-16T02:12:00Z",
    device: "Background job",
    ip: "127.0.0.1",
    summary: "Automated GSTIN verification completed successfully.",
  },
] satisfies Array<{
  id: string;
  user: string;
  userId: string;
  role: string;
  action: string;
  entity: string;
  entityHref?: string;
  timestamp: string;
  device: string;
  ip: string;
  summary: string;
}>;

const roles = ["All", "SUPER_ADMIN", "ADMIN", "NGO", "COMPANY", "DONOR", "SYSTEM"] as const;
const actionTypes = ["All", "login", "update", "approval", "delete", "upload", "donation", "sync"] as const;
const perPage = 5;

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<(typeof roles)[number]>("All");
  const [actionFilter, setActionFilter] = useState<(typeof actionTypes)[number]>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mockAuditLogs.filter((log) => {
      const matchesSearch =
        !query ||
        log.user.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.entity.toLowerCase().includes(query) ||
        log.summary.toLowerCase().includes(query);

      const matchesRole = roleFilter === "All" || log.role === roleFilter;
      const matchesAction =
        actionFilter === "All" || log.action.toLowerCase().includes(actionFilter.toLowerCase());

      return matchesSearch && matchesRole && matchesAction;
    });
  }, [actionFilter, roleFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / perPage));
  const paginatedLogs = filteredLogs.slice((page - 1) * perPage, page * perPage);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage === page) return;
      setLoading(true);
      const timeout = setTimeout(() => {
        setPage(nextPage);
        setLoading(false);
      }, 320);
      return () => clearTimeout(timeout);
    },
    [page],
  );

  const currentLog = paginatedLogs.find((log) => log.id === selectedLogId) ??
    filteredLogs.find((log) => log.id === selectedLogId) ??
    null;

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Audit Logs" },
        ]}
      />

      <SectionHeader
        title="Audit Logs"
        subtitle="Review every change across the platform — logins, approvals, updates, and system activity."
      />

      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition dark:border-slate-700 dark:bg-slate-900/70">
              <Search className="h-4 w-4 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search by user, action, or entity"
                className="h-9 border-none bg-transparent px-0 text-small focus-visible:ring-0"
                aria-label="Search audit logs"
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              className="h-9 gap-2 rounded-full border border-slate-200 px-3 text-xs font-medium tracking-wide transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Date range
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={roleFilter}
              onValueChange={(value) => {
                setRoleFilter(value as typeof roleFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[170px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role === "All" ? "All roles" : role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={actionFilter}
              onValueChange={(value) => {
                setActionFilter(value as typeof actionFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[190px] rounded-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Action type" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action === "All" ? "All actions" : action.charAt(0).toUpperCase() + action.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              className="h-9 gap-2 rounded-full border-slate-200 px-3 text-xs font-semibold tracking-wide transition hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
              onClick={() => {
                setSearch("");
                setRoleFilter("All");
                setActionFilter("All");
                setPage(1);
              }}
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Reset filters
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Showing {paginatedLogs.length} of {filteredLogs.length} events
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-2 rounded-full text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Export CSV
          </Button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <Table>
            <TableHeader className="bg-slate-50/80 uppercase tracking-wide text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
              <TableRow>
                <TableHead className="w-[220px]">User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="w-[240px]">Entity</TableHead>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[160px]">Role</TableHead>
                <TableHead className="w-[160px]">Device / IP</TableHead>
                <TableHead className="w-[70px] text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: perPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-5 w-40 rounded" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-64 rounded" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48 rounded" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28 rounded" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24 rounded" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28 rounded" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="ml-auto h-5 w-16 rounded" /></TableCell>
                  </TableRow>
                ))
              ) : paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => {
                  const timestamp = new Date(log.timestamp).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

                  return (
                    <TableRow key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <TableCell>
                        <div className="space-y-1">
                          <Link
                            href={`#/users/${log.userId}`}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                          >
                            <UserRound className="h-4 w-4 text-slate-400" aria-hidden="true" />
                            <span>{log.user}</span>
                          </Link>
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Clock3 className="h-3 w-3" aria-hidden="true" />
                            <span>{timestamp}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {log.action}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-700 dark:text-slate-300">{log.entity}</span>
                          {log.entityHref ? (
                            <Link
                              href={log.entityHref}
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-indigo-500 transition hover:bg-indigo-500/10"
                              aria-label="Open entity"
                            >
                              <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-600 dark:text-slate-300">{timestamp}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full border-slate-200 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide dark:border-slate-700">
                          {log.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          <div>{log.device}</div>
                          <div className="font-mono text-[11px] text-slate-400">{log.ip}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedLogId(log.id)}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-50 dark:border-slate-700 dark:text-indigo-400 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10"
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center">
                    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                      <FileText className="h-10 w-10 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                      <span>No audit events match your filters yet.</span>
                      <span className="text-xs">
                        Adjust filters or time range to review past approvals, document updates, or login activity.
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white/80 px-4 py-3 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row">
          <div className="text-slate-500 dark:text-slate-400">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn("h-8 rounded-full border-slate-200 px-3 dark:border-slate-700", page === 1 && "pointer-events-none opacity-50")}
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="min-w-[120px] text-center font-semibold text-slate-700 dark:text-slate-200">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredLogs.length)}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "h-8 rounded-full border-slate-200 px-3 dark:border-slate-700",
                page === totalPages && "pointer-events-none opacity-50",
              )}
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Drawer
        open={Boolean(selectedLogId)}
        onClose={() => setSelectedLogId(null)}
        title="Audit log details"
        className="gap-6 border-slate-200 bg-white/95 p-8 dark:border-slate-800 dark:bg-slate-950/95 sm:max-w-xl"
      >
        {currentLog ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{currentLog.action}</div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Badge variant="outline" className="rounded-full border-slate-200 px-2 py-1 dark:border-slate-700">
                  {currentLog.role}
                </Badge>
                <span>•</span>
                <span>{new Date(currentLog.timestamp).toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{currentLog.summary}</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-700 dark:text-slate-200">User</span>
                <span className="text-slate-600 dark:text-slate-300">{currentLog.user}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Entity</span>
                {currentLog.entityHref ? (
                  <Link
                    href={currentLog.entityHref}
                    className="inline-flex items-center gap-2 text-indigo-600 transition hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    {currentLog.entity}
                    <Link2 className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="text-slate-600 dark:text-slate-300">{currentLog.entity}</span>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Device</span>
                  <span className="text-sm text-slate-700 dark:text-slate-200">{currentLog.device}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">IP Address</span>
                  <span className="font-mono text-sm text-slate-600 dark:text-slate-300">{currentLog.ip}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-6 w-48 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        )}
      </Drawer>
    </div>
  );
}
