import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminNGOReviewQueuePage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="NGO review queue" subtitle="Screen and approve new NGO registrations awaiting compliance validation." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        The automated AML/KYC pipeline will populate this section with pending NGO applications.
      </div>
    </section>
  );
}
