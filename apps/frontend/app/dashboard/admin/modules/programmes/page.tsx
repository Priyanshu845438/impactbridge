import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminProgrammesModulePage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="CSR Programmes"
        subtitle="Configure and monitor CSR initiatives awaiting rollout."
      />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-6 text-slate-500 shadow-sm backdrop-blur-sm">
        Coming soon
      </div>
    </section>
  );
}
