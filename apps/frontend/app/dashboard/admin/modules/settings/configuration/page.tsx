import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminSettingsConfigurationPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Platform configuration" subtitle="Manage platform-level defaults, branding, and compliance toggles." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Configuration panels will surface here for environment settings and automation policies.
      </div>
    </section>
  );
}
