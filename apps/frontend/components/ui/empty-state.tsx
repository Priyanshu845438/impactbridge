import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
  actionVariant?: "default" | "outline" | "ghost";
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  href,
  actionVariant = "outline",
  className,
}: EmptyStateProps) {
  const content = (
    <Button
      variant={actionVariant}
      size="sm"
      className="mt-3"
      onClick={onAction}
      asChild={Boolean(href)}
    >
      {href ? <a href={href}>{actionLabel}</a> : <span>{actionLabel}</span>}
    </Button>
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center text-slate-500",
        className,
      )}
    >
      {Icon ? <Icon className="h-10 w-10 text-slate-400" /> : null}
      <p className="mt-4 text-sm font-semibold text-slate-700">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
      {actionLabel ? content : null}
    </div>
  );
}
