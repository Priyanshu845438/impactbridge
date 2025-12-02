"use client";

import { cloneElement, isValidElement, memo, useEffect, useMemo, useRef, useState } from "react";
import { LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-context";
import { Button } from "@/components/ui/button";

interface ProfileDrawerProps {
  children: React.ReactElement;
  onSignOut?: () => void;
}

export const ProfileDrawer = memo(function ProfileDrawer({ children, onSignOut }: ProfileDrawerProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const initials = useMemo(() => {
    if (!user?.name) return "IB";
    const parts = user.name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return `${first}${second}`.toUpperCase() || "IB";
  }, [user?.name]);

  const trigger = useMemo(() => {
    if (!isValidElement<{ onClick?: React.MouseEventHandler }>(children)) {
      return children;
    }

    const existingOnClick = children.props.onClick;

    const handleClick: React.MouseEventHandler = (event) => {
      existingOnClick?.(event);
      setOpen((prev) => !prev);
    };

    return cloneElement(children, {
      onClick: handleClick,
    });
  }, [children]);

  return (
    <div className="relative" ref={containerRef}>
      {trigger}
      {open ? (
        <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900/10 text-sm font-semibold text-slate-700">
              {initials}
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">{user?.name ?? "ImpactBridge User"}</p>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{user?.role ?? "Member"}</p>
              <p className="text-xs text-slate-500">{user?.email ?? "hello@impactbridge.org"}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Quick access</p>
              <Button
                variant="outline"
                className="mt-2 flex w-full items-center justify-between text-sm"
                onClick={() => {
                  setOpen(false);
                  router.push("/dashboard/profile");
                }}
              >
                <span className="flex items-center gap-2">
                  <User2 className="h-4 w-4 text-slate-500" />
                  My profile
                </span>
              </Button>
            </div>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-200/70"
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
});
