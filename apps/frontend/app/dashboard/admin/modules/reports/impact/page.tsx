import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminReportsImpactPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Impact insights" subtitle="Analyse outcomes across geography, sector, and SDG category." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Impact heatmaps and contribution trends will be plotted here in a future iteration.
      </div>
    </section>
  );
}
