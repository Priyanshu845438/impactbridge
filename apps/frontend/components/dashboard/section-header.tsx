type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  action?: React.ReactNode;
};

export function SectionHeader({ title, subtitle, actionLabel, onActionClick, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      {action ? action : null}
      {!action && actionLabel ? (
        <button
          onClick={onActionClick}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
