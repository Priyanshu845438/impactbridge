import Link from "next/link";

import { ChevronRight } from "lucide-react";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

function TruncatedLabel({ children }: PropsWithChildren) {
  return <span className="max-w-[12rem] truncate sm:max-w-[16rem] lg:max-w-[20rem]">{children}</span>;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content = isLast ? (
          <TruncatedLabel>
            <span className="font-semibold text-slate-700 dark:text-slate-100" aria-current="page">
              {item.label}
            </span>
          </TruncatedLabel>
        ) : item.href ? (
          <Link
            href={item.href}
            className="inline-flex items-center text-slate-500 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-400 dark:hover:text-slate-200 dark:focus-visible:ring-offset-slate-900"
          >
            <TruncatedLabel>{item.label}</TruncatedLabel>
          </Link>
        ) : (
          <TruncatedLabel>{item.label}</TruncatedLabel>
        );

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-1">
            {content}
            {!isLast ? <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" /> : null}
          </div>
        );
      })}
    </nav>
  );
}
