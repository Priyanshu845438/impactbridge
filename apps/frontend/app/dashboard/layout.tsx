"use client";

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronRight, Menu, Search, ShieldCheck, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-context";
import { navMenu, NavItem } from "@/lib/nav-menu";
import { Button } from "@/components/ui/button";
import { ProfileDrawer } from "@/components/dashboard/profile-drawer";

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
  const childActive = useMemo(
    () =>
      hasChildren &&
      item.children?.some((child) => {
        if (!child.href) return false;
        return pathname.startsWith(child.href);
      }),
    [hasChildren, item.children, pathname],
  );
  const [open, setOpen] = useState(() => childActive);
  useEffect(() => {
    if (childActive && !open) {
      setOpen(true);
    }
  }, [childActive, open]);

  const isActive = item.href ? pathname === item.href : false;
  const isCurrent = isActive || childActive;
  const Icon = item.icon;
  const indentation = depth > 0 ? "pl-8" : "pl-4";

  const containerClasses = cn(
    "group flex items-center justify-between rounded-xl border border-transparent py-2 font-medium transition",
    isCurrent
      ? "bg-slate-100 text-slate-900 border-slate-300"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    indentation,
  );

  return (
    <div>
      <div className={containerClasses}>
        {item.href ? (
          <Link
            prefetch
            href={item.href}
            className="flex flex-1 items-center gap-3"
            onClick={() => {
              if (!hasChildren) {
                onNavigate?.();
              }
            }}
          >
            {Icon ? <Icon className="h-4 w-4 text-slate-500" /> : null}
            <span>{item.label}</span>
          </Link>
        ) : (
          <span className="flex flex-1 items-center gap-3">
            {Icon ? <Icon className="h-4 w-4 text-slate-500" /> : null}
            <span>{item.label}</span>
          </span>
        )}
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Collapse section" : "Expand section"}
            aria-expanded={open}
            className="mr-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-400/10"
          >
            <ChevronRight
              className={cn("h-4 w-4 transition-transform", open ? "rotate-90" : "rotate-0")}
            />
          </button>
        ) : null}
      </div>
      {hasChildren && open ? (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <SidebarLink
              key={child.href ?? child.label}
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
  const { token, user, logout, unreadNotifications, resetNotifications } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userRole = user?.role;
  const availableLinks = useMemo(() => {
    if (!userRole) {
      return [];
    }
    const enhanced = navMenu.filter((link) => link.roles.includes(userRole));
    return [
      {
        label: "My profile",
        href: "/dashboard/profile",
        roles: [userRole],
        icon: ShieldCheck,
        group: "Workspace",
      },
      ...enhanced,
    ];
  }, [userRole]);

  const groupedLinks = useMemo(() => {
    const groups: Array<{ name: string; items: NavItem[] }> = [];
    if (!availableLinks.length) {
      return groups;
    }

    const orderMap = new Map<string, NavItem[]>();
    availableLinks.forEach((link) => {
      const key = link.group ?? "Workspace";
      if (!orderMap.has(key)) {
        orderMap.set(key, []);
      }
      orderMap.get(key)!.push(link);
    });

    orderMap.forEach((items, name) => {
      groups.push({ name, items });
    });

    return groups;
  }, [availableLinks]);

  useEffect(() => {
    if (!token || !userRole) {
      router.replace("/login");
    }
  }, [router, token, userRole]);

  if (!token || !userRole) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.replace("/login");
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <aside className="hidden h-full w-[270px] md:flex">
        <div className="sticky top-0 flex h-full w-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-6 py-8 text-slate-800">
          <Link
            href="/dashboard/admin"
            className="mb-6 flex items-center gap-3 text-lg font-semibold text-slate-900"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
              <ShieldCheck className="h-5 w-5 text-slate-600" />
            </span>
            ImpactBridge
          </Link>
          <nav className="mt-4 flex flex-col gap-6 text-sm">
            {groupedLinks.map((group) => (
              <div key={group.name}>
                <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  {group.name}
                </p>
                <div className="space-y-1">
                  {group.items.map((link) => (
                    <SidebarLink
                      key={link.label}
                      item={link}
                      pathname={pathname}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Secure CSR environment</p>
            <p className="mt-1 leading-relaxed">Built for compliant collaboration across NGOs, companies, and donors.</p>
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

            <div className="flex flex-1 items-center justify-center gap-4 md:justify-end">
              <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm transition focus-within:border-slate-300 focus-within:shadow">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search users…"
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      const value = (event.currentTarget as HTMLInputElement).value.trim();
                      console.log("Search query:", value);
                    }
                  }}
                />
              </div>

              <Link
                href="/dashboard/notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                aria-label="View notifications"
                onClick={() => resetNotifications()}
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 ? (
                  <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[1.25rem] rounded-full bg-emerald-500 px-1 text-center text-[10px] font-semibold text-white shadow-sm">
                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                  </span>
                ) : null}
              </Link>

              <ProfileDrawer onSignOut={handleLogout}>
                <button
                  type="button"
                  className="group hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-left shadow-sm transition md:flex hover:border-transparent hover:bg-[#0B5C4B] hover:text-white"
                  style={{ transitionDuration: "180ms" }}
                >
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800 transition group-hover:text-white">{user.name}</p>
                    <p className="text-xs uppercase text-slate-500 transition group-hover:text-slate-200">
                      {user.role.replace("_", " ")}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/10 text-sm font-semibold text-slate-700 transition group-hover:bg-emerald-600/30 group-hover:text-white">
                    {user.name
                      .split(" ")
                      .map((part) => part.charAt(0))
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </button>
              </ProfileDrawer>
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
              <nav className="grid max-h-[calc(100vh-200px)] gap-4 overflow-y-auto text-sm">
                {groupedLinks.map((group) => (
                  <div key={group.name}>
                    <p className="pb-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                      {group.name}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((link) => (
                        <SidebarLink
                          key={link.label}
                          item={link}
                          pathname={pathname}
                          onNavigate={() => setMobileOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="mt-auto border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Sign out
              </Button>
            </div>
          </div>
        ) : null}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="space-y-8">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
