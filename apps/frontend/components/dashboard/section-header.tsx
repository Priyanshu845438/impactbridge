import { memo } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  action?: React.ReactNode;
};

function SectionHeaderComponent({ title, subtitle, actionLabel, onActionClick, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900 md:text-xl">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      {action ? action : null}
      {!action && actionLabel ? (
        <button
          onClick={onActionClick}
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:w-auto"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export const SectionHeader = memo(SectionHeaderComponent);
