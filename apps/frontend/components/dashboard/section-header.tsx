import { Button } from "@/components/ui/button";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

export function SectionHeader({ title, subtitle, actionLabel, onActionClick }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      {actionLabel ? (
        <Button onClick={onActionClick} size="sm" variant="outline">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
