import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminNgosModulePage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="NGO Management"
        subtitle="Audit pending registrations, profile submissions, and compliance status."
      />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-6 text-slate-500 shadow-sm backdrop-blur-sm">
        Coming soon
      </div>
    </section>
  );
}
