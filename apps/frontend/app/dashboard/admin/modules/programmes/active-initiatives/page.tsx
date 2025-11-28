import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminProgrammesActiveInitiativesPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Active initiatives" subtitle="Monitor live CSR programmes, deliverables, and milestones." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Programme status and milestone tracking dashboards will appear here shortly.
      </div>
    </section>
  );
}
