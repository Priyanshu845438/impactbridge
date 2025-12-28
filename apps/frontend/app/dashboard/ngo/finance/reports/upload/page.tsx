"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, CalendarRange, FileUp, Info, Loader2, UploadCloud } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/dashboard/section-header";
import { EmptyState } from "@/components/ui/empty-state";

interface UploadFormState {
  fiscalYear: string;
  period: string;
  reportType: string;
  file: File | null;
  notes: string;
}

const initialState: UploadFormState = {
  fiscalYear: "",
  period: "",
  reportType: "",
  file: null,
  notes: "",
};

const fiscalYearOptions = ["2024-2025", "2023-2024", "2022-2023"];
const periodOptions = ["Q1", "Q2", "Q3", "Q4", "Annual"];
const reportTypes = ["Audited", "Unaudited", "Utilisation", "CSR Impact"];

export default function NGOFinancialReportUploadPage() {
  const [form, setForm] = useState<UploadFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFilePicking, setIsFilePicking] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "Finance", href: "/dashboard/ngo/finance" },
      { label: "Financial reports", href: "/dashboard/ngo/finance/reports" },
      { label: "Upload" },
    ],
    [],
  );

  function handleChange(name: keyof UploadFormState, value: string | File | null) {
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);
    setHasSubmitted(true);
    setForm(initialState);
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    handleChange("file", nextFile);
  }

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb items={breadcrumbItems} />

      <SectionHeader
        title="Upload financial report"
        subtitle="Share audited statements, utilisation details, and supporting notes."
        action={
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="/dashboard/ngo/finance/reports">
              <ArrowLeft className="h-4 w-4" />
              Back to reports
            </a>
          </Button>
        }
      />

      <main className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <Card className="space-y-6 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/70">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fiscalYear">Fiscal year</Label>
                <Select value={form.fiscalYear} onValueChange={(value) => handleChange("fiscalYear", value)}>
                  <SelectTrigger id="fiscalYear">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {fiscalYearOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Quarter or period</Label>
                <Select value={form.period} onValueChange={(value) => handleChange("period", value)}>
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report type</Label>
                <Select value={form.reportType} onValueChange={(value) => handleChange("reportType", value)}>
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportDate">Report period end</Label>
                <div className="relative">
                  <CalendarRange className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="reportDate"
                    type="date"
                    placeholder="Select date"
                    className="pl-9"
                    onChange={(event) => handleChange("notes", `${form.notes}\nPeriod end: ${event.target.value}`.trim())}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Attach statement</Label>
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/40">
                <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Drag & drop or choose a PDF (max 20 MB)
                </p>
                <p className="text-xs text-slate-500">Audited statements help companies review your compliance quickly.</p>
                <div className="mt-4 flex justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setIsFilePicking(true)}
                    asChild
                  >
                    <label htmlFor="file">
                      <FileUp className="h-4 w-4" />
                      Choose file
                    </label>
                  </Button>
                  <Input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                    onClick={(event) => {
                      (event.target as HTMLInputElement).value = "";
                    }}
                  />
                </div>

                {form.file ? (
                  <p className="mt-3 text-xs text-slate-500">Selected: {form.file.name}</p>
                ) : null}

                {isFilePicking ? (
                  <p className="mt-2 text-xs text-slate-400">Ready when you pick a file…</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes for reviewer</Label>
              <Textarea
                id="notes"
                placeholder="Add context such as auditor name, key highlights, or utilisation narrative."
                value={form.notes}
                onChange={(event) => handleChange("notes", event.target.value)}
                rows={4}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Info className="h-4 w-4" />
                Submission triggers a review notification to the finance compliance team.
              </p>

              <Button type="submit" className="gap-2" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                Submit report
              </Button>
            </div>
          </form>
        </Card>

        <aside className="space-y-6">
          <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Submission checklist</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 text-sky-500" />
                Ensure the PDF includes auditor signature and seal.
              </li>
              <li className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 text-sky-500" />
                Add utilisation breakdown to help companies assess impact.
              </li>
              <li className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 text-sky-500" />
                Mention major capital expenses or variances in the notes field.
              </li>
            </ul>
          </Card>

          {hasSubmitted ? (
            <Card className="space-y-4 rounded-4xl border border-emerald-200 bg-emerald-50/70 p-6 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10">
              <h3 className="text-sm font-semibold">Submission simulated</h3>
              <p className="text-sm">
                This mock flow resets the form so you can preview the upcoming experience. API wiring will replace this with a real upload.
              </p>
            </Card>
          ) : (
            <Card className="space-y-4 rounded-4xl border border-slate-200 bg-white/90 p-6 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <EmptyState
                icon={UploadCloud}
                title="Awaiting your next upload"
                description="Once live, you&apos;ll be able to attach files and notify review teams instantly."
                className="border-0 bg-transparent p-0"
              />
            </Card>
          )}
        </aside>
      </main>
    </div>
  );
}
