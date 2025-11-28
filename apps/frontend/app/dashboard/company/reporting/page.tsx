import { SectionHeader } from "@/components/dashboard/section-header";

export default function CompanyReportingPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Reporting" subtitle="Generate CSR compliance and impact reports for governance." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Reporting templates and scheduled exports will be enabled here once the reporting service is connected.
      </div>
    </section>
  );
}
