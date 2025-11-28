import { SectionHeader } from "@/components/dashboard/section-header";

export default function ReleaseNotesPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Release notes" subtitle="Track product improvements and new capabilities shipped to ImpactBridge." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Upcoming release summaries will be catalogued here with versioned highlights and change owners.
      </div>
    </section>
  );
}
