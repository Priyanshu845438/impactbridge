import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminNGOPartnerProfilesPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Partner profiles" subtitle="Access verified NGO records, documents, and compliance summaries." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Partner portfolio management will land here, aggregating CSR readiness and ongoing engagements.
      </div>
    </section>
  );
}
