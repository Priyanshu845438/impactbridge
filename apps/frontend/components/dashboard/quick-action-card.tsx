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
    <div className="group rounded-xl bg-gradient-to-br from-emerald-400/25 via-sky-400/15 to-transparent p-[1px] transition-transform duration-200 hover:scale-[1.01]">
      <div className="flex h-full flex-col justify-between rounded-[11px] bg-white/95 p-5 shadow-sm">
        <div className="space-y-3">
          {Icon ? (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Icon className="h-5 w-5" />
            </span>
          ) : null}
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </div>
        <Button asChild size="sm" variant="outline" className="mt-6 w-fit">
          <Link href={href}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
