import { SectionHeader } from "@/components/dashboard/section-header";

export default function UserManualPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="User manual" subtitle="Step-by-step guide to navigate the ImpactBridge platform." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Detailed guides will appear here. For now, reach out to support for onboarding assistance.
      </div>
    </section>
  );
}
