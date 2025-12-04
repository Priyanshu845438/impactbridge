"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hasAnnounced, setHasAnnounced] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="relative h-11 w-11 rounded-full border-slate-200 bg-white text-slate-500 shadow-sm"
        disabled
        aria-hidden
      />
    );
  }

  const effectiveTheme = theme === "system" ? systemTheme ?? "light" : theme ?? "light";
  const isDark = effectiveTheme === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    if (!hasAnnounced && nextTheme === "dark") {
      toast("Dark mode enabled — you can switch back anytime.");
      setHasAnnounced(true);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative h-11 w-11 rounded-full border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
      onClick={handleToggle}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden />
    </Button>
  );
}
