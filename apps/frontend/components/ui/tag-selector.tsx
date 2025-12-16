"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type TagOption = {
  label: string;
  value: string;
};

interface TagSelectorProps {
  options: TagOption[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function TagSelector({ options, value, onChange, className }: TagSelectorProps) {
  const toggle = (tag: string) => {
    onChange(value.includes(tag) ? value.filter((entry) => entry !== tag) : [...value, tag]);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const active = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition",
              active
                ? "border-emerald-400 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-200"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-emerald-200 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300",
            )}
            aria-pressed={active}
          >
            {active ? <Check className="h-3.5 w-3.5" /> : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function resolveTags(values: string[], options: TagOption[]): TagOption[] {
  const optionMap = new Map(options.map((option) => [option.value, option]));
  return values
    .map((value) => optionMap.get(value))
    .filter((entry): entry is TagOption => Boolean(entry));
}
