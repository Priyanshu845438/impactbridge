"use client";

import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.6),transparent)]";

export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("relative overflow-hidden bg-slate-200/60", shimmer, className)} {...props} />;
}

export function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className="h-3 w-full rounded-full" />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/40 bg-white/70 p-6", className)}>
      <div className="mb-4 h-5 w-32">
        <Skeleton className="h-full w-full rounded-full" />
      </div>
      <div className="mb-6 h-10 w-20">
        <Skeleton className="h-full w-full rounded-full" />
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

export function SkeletonStat({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/40 bg-white/70 p-5", className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="w-full space-y-2">
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      <SkeletonText className="mt-4" lines={2} />
    </div>
  );
}

export function SkeletonActivityItem() {
  return (
    <li className="flex items-start gap-4 px-5 py-4">
      <Skeleton className="mt-1 h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-48 rounded-full" />
        <Skeleton className="h-3 w-60 rounded-full" />
        <Skeleton className="h-2.5 w-32 rounded-full" />
      </div>
    </li>
  );
}
