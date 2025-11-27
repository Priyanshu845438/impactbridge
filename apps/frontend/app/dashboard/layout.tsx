"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, LogOut, Menu, ShieldCheck, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-context";
import { Button } from "@/components/ui/button";
import { navMenu, NavItem } from "@/lib/nav-menu";

function SidebarLink({
  item,
  depth = 0,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  depth?: number;
  pathname: string;
  onNavigate?: () => void;
}) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const [open, setOpen] = useState(
    () => hasChildren && item.children?.some((child) => child.href === pathname),
  );
  const isActive = item.href ? pathname === item.href : false;
  const Icon = item.icon;

  return (
    <div>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-2 text-left font-medium transition border-l-4 border-transparent",
          isActive
            ? "bg-slate-900 text-white border-emerald-500"
            : "text-white/75 hover:bg-white/10 hover:text-white",
          depth > 0 && "ml-4", // indent child links
        )}
        onClick={() => {
          if (hasChildren) {
            setOpen((prev) => !prev);
          } else if (item.href) {
            onNavigate?.();
          }
        }}
      >
        <span className="flex items-center gap-3">
          {Icon ? <Icon className="h-4 w-4" /> : null}
          {item.href ? (
            <Link
              href={item.href}
              onClick={(event) => {
                if (hasChildren) {
                  event.preventDefault();
                  setOpen((prev) => !prev);
                } else {
                  onNavigate?.();
                }
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
        {hasChildren ? (
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              open ? "rotate-90" : "rotate-0",
            )}
          />
        ) : null}
      </button>
      {hasChildren && open ? (
        <div className="mt-2 space-y-1">
          {item.children?.map((child) => (
            <SidebarLink
              key={child.href}
              item={child}
              depth={depth + 1}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { token, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  const availableLinks = navMenu.filter((link) =>
    user ? link.roles.includes(user.role) : false,
  );

  if (!token || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.replace("/login");
    setMobileOpen(false);
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-[#F9FAFB] to-[#EFF4F9]">
      <aside className="hidden h-full w-[260px] md:flex">
        <div className="sticky top-0 flex h-full w-full flex-col border-r border-slate-800/30 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 px-6 py-8 text-white">
          <Link href="/dashboard" className="mb-8 flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/90 text-slate-900">
              <ShieldCheck className="h-5 w-5" />
            </span>
            ImpactBridge
          </Link>
          <div className="space-y-6 text-xs uppercase tracking-[0.28em] text-white/60">
            <p>Workspace</p>
          </div>
          <nav className="mt-6 flex flex-col gap-1 text-sm">
            {availableLinks.map((link) => (
              <SidebarLink
                key={link.label}
                item={link}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>

          <div className="mt-auto pt-8 text-xs text-white/60">
            <p>Secured CSR Environment</p>
            <p className="mt-1 text-[11px] text-white/40">Powered by ImpactBridge</p>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-1 items-center justify-end gap-4 md:justify-between">
            <div className="hidden flex-col md:flex">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                ImpactBridge Dashboard
              </span>
              <span className="text-base font-semibold text-slate-800">Unified CSR Intelligence</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                <p className="text-xs uppercase text-slate-500">{user.role.replace("_", " ")}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </header>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm md:hidden">
            <div className="absolute inset-y-0 right-0 flex w-72 flex-col gap-6 bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500 uppercase">{user?.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="grid gap-2">
                {availableLinks.map((link) => (
                  <SidebarLink
                    key={link.label}
                    item={link}
                    pathname={pathname}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
              <Button variant="outline" onClick={handleLogout} className="mt-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        ) : null}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-100 lg:p-8">
            <div className="mb-8 space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">Welcome to ImpactBridge Dashboard</h1>
              <p className="text-sm text-slate-600">
                Access role-specific tools to manage compliance, programmes, and impact delivery.
              </p>
            </div>
            <div className="space-y-8">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
