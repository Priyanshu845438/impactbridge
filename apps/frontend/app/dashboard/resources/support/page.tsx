import { SectionHeader } from "@/components/dashboard/section-header";

export default function SupportPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Help desk" subtitle="Connect with the ImpactBridge success team for guided assistance." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Support workflows (tickets, chat, escalation matrix) will be published here soon.
      </div>
    </section>
  );
}
