import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminNGOImpactPortfolioPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Impact portfolio" subtitle="Review outcomes of funded NGO programmes across geographies." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Portfolio insights, SDG mappings, and impact analytics will be reported here in upcoming releases.
      </div>
    </section>
  );
}
