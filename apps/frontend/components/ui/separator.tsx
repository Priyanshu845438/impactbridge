import * as React from "react";

import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      decorative = true,
      role = decorative ? "none" : "separator",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role={role}
      className={cn("h-px w-full bg-slate-200 dark:bg-slate-800", className)}
      {...props}
    />
  ),
);
Separator.displayName = "Separator";
