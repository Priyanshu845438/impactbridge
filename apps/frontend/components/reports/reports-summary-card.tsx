import { cn } from "@/lib/utils";

export interface ReportsSummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  helper?: string;
  tone?: "emerald" | "sky" | "violet" | "amber";
}

const toneClasses: Record<NonNullable<ReportsSummaryCardProps["tone"]>, string> = {
  emerald: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200",
  sky: "bg-sky-500/10 text-sky-600 dark:bg-sky-900/40 dark:text-sky-200",
  violet: "bg-violet-500/10 text-violet-600 dark:bg-violet-900/40 dark:text-violet-200",
  amber: "bg-amber-500/10 text-amber-600 dark:bg-amber-900/40 dark:text-amber-100",
};

export function ReportsSummaryCard({ icon, label, value, helper, tone = "emerald" }: ReportsSummaryCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", toneClasses[tone])}>{icon}</span>
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{label}</p>
        <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{value}</p>
        {helper ? <p className="text-sm text-slate-500 dark:text-slate-400">{helper}</p> : null}
      </div>
    </div>
  );
}
