import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminActivityPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Team activity" subtitle="Monitor administrative actions and platform oversight." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Detailed audit trails and reviewer assignments will surface on this page shortly.
      </div>
    </section>
  );
}
