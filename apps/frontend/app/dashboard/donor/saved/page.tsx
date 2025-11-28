import { SectionHeader } from "@/components/dashboard/section-header";

export default function DonorSavedCausesPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Saved causes" subtitle="Revisit campaigns and NGOs you've bookmarked for future giving." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Save-later lists and curated recommendations will appear here once personalised feeds are ready.
      </div>
    </section>
  );
}
