import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminProgrammesPipelinePage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Programme pipeline" subtitle="Track CSR proposals from intake through due diligence." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Funnel analytics and stage progression will be integrated once programme ingestion APIs are ready.
      </div>
    </section>
  );
}
