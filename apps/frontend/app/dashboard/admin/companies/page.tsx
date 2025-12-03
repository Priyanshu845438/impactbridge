"use client";

import { useMemo, useState } from "react";
import { Building2, Plus, Search } from "lucide-react";

import Link from "next/link";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
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

import {
  COMPANY_RECORDS,
  COMPANY_STATUS,
  INDUSTRY_TYPES,
  STATUS_TONE,
} from "./data";

export default function AdminCompaniesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | typeof COMPANY_STATUS[number]>("All");
  const [industryFilter, setIndustryFilter] = useState<"All" | typeof INDUSTRY_TYPES[number]>("All");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const perPage = 4;

  const filteredCompanies = useMemo(() => {
    return COMPANY_RECORDS.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === "All" || company.status === statusFilter;
      const matchesIndustry = industryFilter === "All" || company.industry === industryFilter;
      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [industryFilter, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / perPage));
  const paginatedCompanies = filteredCompanies.slice((page - 1) * perPage, page * perPage);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Company compliance workspace"
        subtitle="Review CSR portfolios, budgets, and onboarding status for registered companies."
        action={
          <Button type="button" onClick={handleOpenModal} className="gap-2">
            <Plus className="h-4 w-4" />
            Add company
          </Button>
        }
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-lg items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm focus-within:border-slate-300">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search companies"
              className="h-9 border-none bg-transparent px-0 text-small"
              aria-label="Search companies"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value as typeof statusFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px] border-slate-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {["All", ...COMPANY_STATUS].map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={industryFilter}
              onValueChange={(value) => {
                setIndustryFilter(value as typeof industryFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[220px] border-slate-200">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {["All", ...INDUSTRY_TYPES].map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <div className="hidden min-w-[760px] lg:block">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[260px]">Company name</TableHead>
                  <TableHead>CIN / Registration No.</TableHead>
                  <TableHead>Industry type</TableHead>
                  <TableHead>CSR annual budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCompanies.map((company) => (
                  <TableRow key={company.cin} className="text-small">
                    <TableCell className="font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <Building2 className="h-4 w-4" />
                        </span>
                        <div>
                          <p>{company.name}</p>
                          <p className="text-xs text-slate-400">{company.contactPerson}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">{company.cin}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.csrBudget}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`border ${STATUS_TONE[company.status]}`}>
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-3 text-sm font-medium text-brand-600">
                        <Link
                          href={`/dashboard/admin/company/${company.id}`}
                          className="transition hover:text-brand-700"
                        >
                          View
                        </Link>
                        <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                        <button type="button" className="transition hover:text-brand-700">
                          Edit
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!paginatedCompanies.length ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-slate-500">
                      No companies match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4 p-4 lg:hidden">
            {paginatedCompanies.length ? (
              paginatedCompanies.map((company) => (
                <div key={company.cin} className="rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <Building2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{company.name}</p>
                      <p className="text-xs text-slate-400">{company.contactPerson}</p>
                    </div>
                  </div>
                  <dl className="mt-4 grid gap-2 text-xs text-slate-500">
                    <div className="flex justify-between gap-3">
                      <dt className="font-medium text-slate-600">CIN</dt>
                      <dd className="font-mono">{company.cin}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="font-medium text-slate-600">Industry</dt>
                      <dd>{company.industry}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="font-medium text-slate-600">CSR budget</dt>
                      <dd>{company.csrBudget}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline" className={`border ${STATUS_TONE[company.status]}`}>
                      {company.status}
                    </Badge>
                    <div className="inline-flex items-center gap-3 text-sm font-medium text-brand-600">
                      <Link
                        href={`/dashboard/admin/company/${company.id}`}
                        className="transition hover:text-brand-700"
                      >
                        View
                      </Link>
                      <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                      <button type="button" className="transition hover:text-brand-700">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
                No companies match the current filters.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            Showing <span className="font-semibold text-slate-700">{paginatedCompanies.length}</span> of
            <span className="font-semibold text-slate-700"> {filteredCompanies.length}</span> companies
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="rounded-full px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-slate-400">
              Page <span className="font-medium text-slate-700">{page}</span> of
              <span className="font-medium text-slate-700"> {totalPages}</span>
            </span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded-full px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        title="Add company"
        description="Capture primary company details before inviting them to the platform."
        size="lg"
        footer={
          <>
            <Button type="button" variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="button" disabled>
              Save company
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Company name
            </label>
            <Input placeholder="Acme Industries Pvt Ltd" className="text-sm" disabled />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Contact email
            </label>
            <Input placeholder="csr@company.com" className="text-sm" disabled />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              CIN / Registration number
            </label>
            <Input placeholder="L12345KA2015PLC081234" className="text-sm" disabled />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Industry type
            </label>
            <Select disabled defaultValue="Information Technology">
              <SelectTrigger className="w-full border-slate-200 text-sm">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="max-h-56">
                {INDUSTRY_TYPES.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Contact person
            </label>
            <Input placeholder="Primary CSR contact" className="text-sm" disabled />
          </div>
        </div>
      </Modal>
    </div>
  );
}
