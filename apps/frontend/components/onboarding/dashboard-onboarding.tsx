"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  placement?: "top" | "bottom" | "left" | "right";
}

const STORAGE_KEY = "impactbridge:onboarding:admin";

function getInitialSeen(): boolean {
  if (typeof window === "undefined") {
    return true;
  }
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function DashboardOnboarding() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(() => !getInitialSeen());
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const steps = useMemo<OnboardingStep[]>(
    () => [
      {
        id: "sidebar",
        title: "Navigate effortlessly",
        description: "Use the sidebar to jump between NGOs, companies, programmes, and reports.",
        targetSelector: "[data-onboarding=sidebar-nav]",
        placement: "right",
      },
      {
        id: "search",
        title: "Search across the workspace",
        description: "Find NGOs, companies, or users instantly with universal search.",
        targetSelector: "[data-onboarding=global-search]",
        placement: "bottom",
      },
      {
        id: "activity",
        title: "Track real-time activity",
        description: "The activity feed keeps you informed about compliance updates and approvals.",
        targetSelector: "[data-onboarding=activity-feed]",
        placement: "top",
      },
      {
        id: "quick-actions",
        title: "Act on priority tasks",
        description: "Launch critical workflows from quick actions for faster operations.",
        targetSelector: "[data-onboarding=quick-actions]",
        placement: "top",
      },
    ],
    [],
  );

  const highlightRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(steps.length - 1, index + 1));
  }, [steps.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }, []);

  const dismiss = useCallback(
    (persist: boolean) => {
      setOpen(false);
      if (persist || dontShowAgain) {
        window.localStorage.setItem(STORAGE_KEY, "true");
      }
    },
    [dontShowAgain],
  );

  const positionOverlay = useCallback(() => {
    const highlight = highlightRef.current;
    const tooltip = tooltipRef.current;
    if (!highlight || !tooltip) {
      return;
    }

    const step = steps[currentIndex];
    const target = document.querySelector(step.targetSelector) as HTMLElement | null;
    if (!target) {
      highlight.style.opacity = "0";
      tooltip.style.opacity = "0";
      return;
    }

    const targetRect = target.getBoundingClientRect();
    highlight.style.opacity = "1";
    highlight.style.top = `${targetRect.top + window.scrollY - 8}px`;
    highlight.style.left = `${targetRect.left + window.scrollX - 8}px`;
    highlight.style.width = `${targetRect.width + 16}px`;
    highlight.style.height = `${targetRect.height + 16}px`;

    const tooltipRect = tooltip.getBoundingClientRect();
    let top = targetRect.top + window.scrollY;
    let left = targetRect.left + window.scrollX;

    const spacing = 20;
    switch (step.placement) {
      case "top":
        top -= tooltipRect.height + spacing;
        left += targetRect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top += targetRect.height + spacing;
        left += targetRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        left -= tooltipRect.width + spacing;
        top += targetRect.height / 2 - tooltipRect.height / 2;
        break;
      case "right":
      default:
        left += targetRect.width + spacing;
        top += targetRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    tooltip.style.top = `${Math.max(window.scrollY + 16, top)}px`;
    tooltip.style.left = `${Math.max(window.scrollX + 16, left)}px`;
    tooltip.style.opacity = "1";
  }, [currentIndex, steps]);

  useEffect(() => {
    if (!open) {
      if (dontShowAgain) {
        window.localStorage.setItem(STORAGE_KEY, "true");
      }
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss(true);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, dontShowAgain, goNext, goPrev, dismiss]);

  useEffect(() => {
    if (!open) {
      return;
    }
    positionOverlay();
    const handleResize = () => positionOverlay();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
  }, [open, positionOverlay]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const step = steps[currentIndex];
    const target = document.querySelector(step.targetSelector) as HTMLElement | null;
    if (target) {
      target.setAttribute("aria-describedby", `onboarding-step-${step.id}`);
      target.setAttribute("data-onboarding-active", "true");
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    return () => {
      if (target) {
        target.removeAttribute("aria-describedby");
        target.removeAttribute("data-onboarding-active");
      }
    };
  }, [open, currentIndex, steps]);

  const handleDontShowAgain = () => {
    setDontShowAgain((prev) => !prev);
  };

  const handleFinish = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
      <div
        ref={highlightRef}
        className="pointer-events-none absolute rounded-3xl border-2 border-brand-300/80 bg-white/40 shadow-2xl shadow-brand-500/30 transition-all duration-200"
      />

      <div
        ref={tooltipRef}
        className="absolute max-w-xs rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-opacity duration-200"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.28em] text-slate-400">
              Step {currentIndex + 1} of {steps.length}
            </p>
            <h2 id={`onboarding-step-${steps[currentIndex].id}`} className="mt-2 text-base font-semibold text-slate-900">
              {steps[currentIndex].title}
            </h2>
          </div>
          <button
            type="button"
            className="rounded-full border border-transparent p-1 text-slate-400 transition hover:border-slate-200 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Skip onboarding"
            onClick={() => dismiss(true)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-500">{steps[currentIndex].description}</p>

        <div className="mt-4 flex items-center gap-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              aria-label={`Go to step ${index + 1}`}
              className={cn(
                "flex h-2.5 w-2.5 items-center justify-center rounded-full",
                index === currentIndex ? "bg-brand-600" : "bg-slate-200",
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-xs text-slate-500">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={handleDontShowAgain}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
            Don’t show again
          </label>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
              onClick={() => dismiss(false)}
            >
              Skip
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
              onClick={goPrev}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="mr-1 h-3.5 w-3.5" />
              Back
            </Button>
            {currentIndex === steps.length - 1 ? (
              <Button type="button" size="sm" className="bg-brand-600 text-white hover:bg-brand-700" onClick={handleFinish}>
                Done
                <Check className="ml-2 h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button type="button" size="sm" className="bg-brand-600 text-white hover:bg-brand-700" onClick={goNext}>
                Next
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
