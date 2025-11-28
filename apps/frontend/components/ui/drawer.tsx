"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Drawer({ open, onClose, title, description, children, footer, className }: DrawerProps) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, onClose]);

  return open ? (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity" aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "ml-auto flex h-full w-full flex-col gap-6 border-l border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur",
          "animate-in slide-in-from-right sm:max-w-md lg:max-w-xl",
          "max-sm:rounded-t-3xl max-sm:border-l-0 max-sm:border-t max-sm:border-slate-200 max-sm:p-5",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
            {description ? <p className="text-sm text-slate-500">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 text-sm text-slate-600">{children}</div>

        {footer ? <div className="flex flex-wrap items-center justify-end gap-3">{footer}</div> : null}
      </div>
    </div>
  ) : null;
}
