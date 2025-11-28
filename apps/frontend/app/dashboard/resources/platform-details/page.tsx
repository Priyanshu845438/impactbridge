import { SectionHeader } from "@/components/dashboard/section-header";

export default function PlatformDetailsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Platform details" subtitle="Understand the architecture, governance model, and compliance checkpoints." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Platform documentation will be curated here shortly. Stay tuned for environment topology and data flow diagrams.
      </div>
    </section>
  );
}
