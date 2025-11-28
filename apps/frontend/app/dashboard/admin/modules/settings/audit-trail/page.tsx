import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminSettingsAuditTrailPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Audit trail" subtitle="Review system events and user actions aligned with compliance standards." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        A searchable audit log will be published here once monitoring services are connected.
      </div>
    </section>
  );
}
