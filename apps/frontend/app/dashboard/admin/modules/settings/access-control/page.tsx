import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminSettingsAccessControlPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Access control" subtitle="Assign platform roles, permissions, and escalation workflows." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Role management and inviter tooling will be added here once backend endpoints are ready.
      </div>
    </section>
  );
}
