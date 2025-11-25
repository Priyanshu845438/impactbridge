export default function DashboardHome() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Track NGO campaign progress, impact metrics, and CSR compliance from this hub.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Active Campaigns</h2>
          <p className="text-sm text-muted-foreground">View milestones, utilization reports, and outcomes.</p>
        </div>
        <div className="rounded-lg border p-4 shadow-sm">
          <h2 className="text-lg font-semibold">CSR Summary</h2>
          <p className="text-sm text-muted-foreground">Generate annual CSR-2 compliant summaries.</p>
        </div>
      </div>
    </section>
  );
}
