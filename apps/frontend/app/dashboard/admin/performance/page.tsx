import { SectionHeader } from "@/components/dashboard/section-header";

export default function AdminPerformancePage() {
  return (
    <section className="space-y-6">
      <SectionHeader title="Platform performance" subtitle="Track programme velocity and engagement health." />
      <hr className="border-slate-200" />
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 text-slate-600 shadow-sm backdrop-blur-sm">
        Impact benchmarks, funding velocity, and NGO fulfilment metrics will be available soon.
      </div>
    </section>
  );
}
