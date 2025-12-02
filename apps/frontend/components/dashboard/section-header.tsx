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
        <h2 className="text-heading-3 text-slate-700 md:text-heading-2" data-focusable="heading">
          {title}
        </h2>
        {subtitle ? <p className="text-small text-slate-500" id={`${title}-subtitle`}>{subtitle}</p> : null}
      </div>
      {action ? action : null}
      {!action && actionLabel ? (
        <button
          onClick={onActionClick}
          type="button"
          aria-label={actionLabel}
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-small font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 sm:w-auto"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export const SectionHeader = memo(SectionHeaderComponent);
