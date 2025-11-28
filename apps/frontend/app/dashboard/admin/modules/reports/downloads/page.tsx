import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminReportsDownloadsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Downloads" subtitle="Export compliance-ready reports and curated datasets." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Export packages (Excel, CSV, PDF) will appear here after the analytics service integration.
      </div>
    </section>
  );
}
