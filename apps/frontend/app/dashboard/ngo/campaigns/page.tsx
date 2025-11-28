import { SectionHeader } from "@/components/dashboard/section-header";

export default function NGOCampaignsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Campaigns" subtitle="Manage fundraising and CSR initiatives under your NGO." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Campaign planning, progress tracking, and donor updates will appear here when APIs are wired.
      </div>
    </section>
  );
}
