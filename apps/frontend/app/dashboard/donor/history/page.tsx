import { SectionHeader } from "@/components/dashboard/section-header";

export default function DonorHistoryPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Giving history" subtitle="Browse your donations, impact stories, and tax-ready receipts." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Donation history and acknowledgement letters will land here once donor APIs are online.
      </div>
    </section>
  );
}
