import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminProgrammesTemplatesPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Programme templates" subtitle="Standardise recurring initiatives with reusable templates and checklists." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Template catalogues and automation workflows will be published here soon.
      </div>
    </section>
  );
}
