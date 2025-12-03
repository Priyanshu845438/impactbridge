"use client";

import { notFound, useParams } from "next/navigation";
import { useMemo } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  IndianRupee,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { NGO_STATUS_TONE, STATUS_TONE, findCompanyById } from "../../companies/data";

export default function CompanyProfilePage() {
  const params = useParams();
  const companyId = Array.isArray(params?.companyId) ? params?.companyId[0] : params?.companyId;

  const company = useMemo(() => (companyId ? findCompanyById(companyId) : undefined), [companyId]);

  if (!companyId) {
    return null;
  }

  if (!company) {
    notFound();
    return null;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Company profile"
        subtitle="Detailed CSR snapshot, partner landscape, and recent activity for this organisation."
        action={
          <Button type="button" className="gap-2" variant="outline">
            <NotebookPen className="h-4 w-4" />
            Edit profile
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600">
                <Building2 className="h-7 w-7" />
              </span>
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  {company.name}
                </CardTitle>
                <p className="mt-1 text-sm text-slate-500">CIN: {company.cin}</p>
                <p className="mt-1 text-sm text-slate-500">Industry: {company.industry}</p>
              </div>
            </div>
            <Badge variant="outline" className={`border ${STATUS_TONE[company.status]}`}>
              {company.status}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Registered address</p>
                <p className="mt-1 leading-relaxed text-slate-600">{company.address}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-sm font-medium text-brand-600 transition hover:text-brand-700"
                >
                  {company.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <a
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  className="text-sm font-medium text-brand-600 transition hover:text-brand-700"
                >
                  {company.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">Primary contact: {company.contactPerson}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">
              CSR contribution snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Total budget</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{company.csrBudget}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <IndianRupee className="h-5 w-5" />
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Allocated</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{company.csrAllocated}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Remaining</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{company.csrRemaining}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <ArrowUpRight className="h-4 w-4 rotate-180" />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-slate-900">Linked NGOs</CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Current collaboration landscape across ongoing and historical programmes.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="hidden min-w-[640px] xl:block">
              <table className="w-full table-fixed">
                <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  <tr>
                    <th className="p-4">NGO name</th>
                    <th className="p-4">Focus area</th>
                    <th className="p-4">Last interaction</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {company.ngos.map((ngo) => (
                    <tr key={`${company.id}-${ngo.name}`} className="transition hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">{ngo.name}</td>
                      <td className="p-4">{ngo.focusArea}</td>
                      <td className="p-4 text-slate-500">{ngo.lastInteraction}</td>
                      <td className="p-4 text-right">
                        <Badge variant="outline" className={`border ${NGO_STATUS_TONE[ngo.status]}`}>
                          {ngo.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 xl:hidden">
              {company.ngos.map((ngo) => (
                <div
                  key={`${company.id}-${ngo.name}-mobile`}
                  className="rounded-2xl border border-slate-200 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{ngo.name}</p>
                      <p className="text-xs text-slate-400">{ngo.focusArea}</p>
                    </div>
                    <Badge variant="outline" className={`border ${NGO_STATUS_TONE[ngo.status]}`}>
                      {ngo.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    Last interaction: {ngo.lastInteraction}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Notes & activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative ml-3 border-l border-dashed border-slate-200 pl-6">
              {company.timeline.map((item, index) => (
                <div key={`${company.id}-timeline-${index}`} className="relative mb-6 last:mb-0">
                  <span className="absolute left-[-29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-slate-200 bg-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                  <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                  <span className="mt-2 inline-flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {item.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
