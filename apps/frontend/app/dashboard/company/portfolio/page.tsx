import { SectionHeader } from "@/components/dashboard/section-header";

export default function CompanyPortfolioPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="CSR portfolio" subtitle="Review funded programmes, allocations, and impact metrics." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Portfolio views and allocation analytics will surface here once corporate dashboards are wired.
      </div>
    </section>
  );
}
