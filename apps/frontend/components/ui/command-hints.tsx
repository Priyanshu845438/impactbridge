"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export type CommandHintConfig = {
  message: string;
};

type CommandHintsProps = {
  hint?: CommandHintConfig | null;
  routeKey?: string;
  className?: string;
  delay?: number;
  storageKeyPrefix?: string;
};

const DEFAULT_DELAY = 5000;

export function CommandHints({
  hint,
  routeKey,
  className,
  delay = DEFAULT_DELAY,
  storageKeyPrefix = "impactbridge:hint:dismissed",
}: CommandHintsProps) {
  const pathname = usePathname() ?? "";
  const resolvedRouteKey = routeKey ?? pathname ?? "root";
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<number>();

  const storageKey = useMemo(
    () => `${storageKeyPrefix}:${resolvedRouteKey}`,
    [resolvedRouteKey, storageKeyPrefix],
  );

  useEffect(() => {
    if (!hint) {
      setVisible(false);
      setDismissed(false);
      window.clearTimeout(timerRef.current);
      return;
    }
    if (typeof window === "undefined") {
      setDismissed(false);
      return;
    }
    const stored = window.localStorage.getItem(storageKey) === "1";
    setDismissed(stored);
    if (stored) {
      setVisible(false);
    }
  }, [hint, storageKey]);

  useEffect(() => {
    if (!hint || dismissed) {
      setVisible(false);
      window.clearTimeout(timerRef.current);
      return;
    }

    const scheduleReveal = () => {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
      }, delay);
    };

    const handleActivity = () => {
      setVisible(false);
      scheduleReveal();
    };

    scheduleReveal();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });

    return () => {
      window.clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, [delay, dismissed, hint]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, "1");
    }
  }, [storageKey]);

  if (!hint || dismissed || !visible) {
    return null;
  }

  return (
    <div
      data-command-hint
      className={cn(
        "pointer-events-auto animate-in fade-in-0 zoom-in-95",
        "fixed bottom-6 right-6 z-30 max-w-[260px] rounded-2xl border border-transparent bg-white/90 p-4 text-xs text-slate-600 shadow-lg backdrop-blur dark:bg-slate-900/80 dark:text-slate-300",
        "sm:right-8 sm:bottom-8",
        "max-sm:bottom-4 max-sm:right-4 max-sm:rounded-xl max-sm:px-3 max-sm:py-3 max-sm:text-[11px]",
        className,
      )}
    >
      <p className="leading-relaxed">
        {hint.message}
        <button
          type="button"
          onClick={dismiss}
          className="ml-2 font-semibold text-emerald-600 underline-offset-2 transition hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200"
        >
          Dismiss
        </button>
      </p>
    </div>
  );
}
