import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminReportsCompliancePage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Compliance reports" subtitle="Generate statutory filings and audits at a glance." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        CSR-2, impact, and donor reporting exports will be available here once the reporting service is wired.
      </div>
    </section>
  );
}
