import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuickActionCardProps {
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  icon?: LucideIcon;
}

export function QuickActionCard({
  title,
  description,
  href = "#",
  ctaLabel = "Open",
  icon: Icon,
}: QuickActionCardProps) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="space-y-3">
          {Icon ? (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <Icon className="h-5 w-5" />
            </span>
          ) : null}
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </div>
        <Button asChild size="sm" variant="ghost" className="w-fit px-0 text-sm font-semibold text-slate-700 hover:text-slate-900">
          <Link href={href}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
