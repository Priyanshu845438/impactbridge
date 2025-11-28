import { SectionHeader } from "@/components/dashboard/section-header";

export default function DocumentationPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Documentation" subtitle="Central reference library for product, process, and API guides." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Documentation collections will surface here. Meanwhile explore external guides and platform walk-throughs.
      </div>
    </section>
  );
}
