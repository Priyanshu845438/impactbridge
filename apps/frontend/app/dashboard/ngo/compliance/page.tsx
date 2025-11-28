import { SectionHeader } from "@/components/dashboard/section-header";

export default function NGOCompliancePage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Compliance" subtitle="Stay on top of documentation, certifications, and audit tasks." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Compliance checklist, document submissions, and renewal reminders will be connected soon.
      </div>
    </section>
  );
}
