"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function TooltipProvider({ children }: PropsWithChildren) {
  return <TooltipPrimitive.Provider delayDuration={150}>{children}</TooltipPrimitive.Provider>;
}

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  side?: TooltipPrimitive.TooltipContentProps["side"];
}

export function Tooltip({ label, children, side = "top" }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          className={cn(
            "z-50 overflow-hidden rounded-full border border-slate-200 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm",
            "dark:border-slate-700 dark:bg-slate-700/95",
          )}
        >
          {label}
          <TooltipPrimitive.Arrow className="fill-slate-900/90 dark:fill-slate-700/95" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
