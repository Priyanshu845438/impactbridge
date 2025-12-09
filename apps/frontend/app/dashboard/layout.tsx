"use client";

import {
  PropsWithChildren,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BellRing,
  Building2,
  ChevronRight,
  Clock3,
  Command,
  FilePlus2,
  Menu,
  MessageSquarePlus,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-context";
import { navMenu, NavItem } from "@/lib/nav-menu";
import { Button } from "@/components/ui/button";
import { ProfileDrawer } from "@/components/dashboard/profile-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GlobalSearchSpotlight } from "@/components/overlays/global-search";
import { CommandHints } from "@/components/ui/command-hints";

interface NotificationItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  timestamp: string;
}

function NotificationItem({ icon: Icon, title, timestamp }: NotificationItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 transition hover:border-emerald-200 hover:bg-emerald-50/80">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Icon className="h-4 w-4" />
      </span>
            <div className="space-y-1">
              <p className="text-small font-semibold text-slate-700">{title}</p>
              <p className="text-xs text-slate-400">{timestamp}</p>
            </div>
            <span className="ml-auto flex h-2 w-2 items-center justify-center rounded-full bg-emerald-400" />
          </div>
  );
}

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
      ? "bg-slate-100 text-slate-900 border-slate-300 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/30 dark:hover:text-slate-100",
    indentation,
  );

  return (
    <div>
      <div className={containerClasses}>
        {item.href ? (
          <Link
            prefetch={true}
            href={item.href}
            className="flex flex-1 items-center gap-3"
            onClick={() => {
              if (!hasChildren) {
                onNavigate?.();
              }
            }}
          >
            {Icon ? <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" /> : null}
            <span>{item.label}</span>
          </Link>
        ) : (
          <span className="flex flex-1 items-center gap-3">
            {Icon ? <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" /> : null}
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
  const { token, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileNotificationsOpen, setMobileNotificationsOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [isCommandPending, startCommandTransition] = useTransition();
  const [searchOpen, setSearchOpen] = useState(false);
  const [contentOpacityClass, setContentOpacityClass] = useState("opacity-0");
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      {
        label: "Donor management",
        href: "/dashboard/admin/donors",
        roles: [userRole],
        icon: Users,
        group: "Registry",
      },
      {
        label: "Reports & Analytics",
        href: "/dashboard/admin/reports",
        roles: [userRole],
        icon: FileBarChart,
        group: "Insights",
      },
      {
        label: "Campaign management",
        href: "/dashboard/admin/campaigns",
        roles: [userRole],
        icon: ClipboardList,
        group: "Registry",
      },
      {
        label: "Donation detail",
        href: "/dashboard/admin/donations/cmp-101",
        roles: [userRole],
        icon: TicketCheck,
        group: "Registry",
      },
      {
        label: "Donation history",
        href: "/dashboard/admin/donations",
        roles: [userRole],
        icon: HandCoins,
        group: "Registry",
      },
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

  const commandItems = useMemo<CommandPaletteItem[]>(
    () => [
      {
        label: "Open dashboard overview",
        actionLabel: "Go",
        icon: ShieldCheck,
        keywords: ["home", "overview", "admin"],
      },
      {
        label: "Search NGOs",
        actionLabel: "Open",
        icon: Building2,
        keywords: ["ngo", "organizations", "compliance"],
      },
      {
        label: "Find companies",
        actionLabel: "Open",
        icon: Building2,
        keywords: ["company", "corporate", "csr"],
      },
      {
        label: "View user directory",
        actionLabel: "Go",
        icon: Users,
        keywords: ["users", "directory", "people"],
      },
      {
        label: "Review pending documents",
        actionLabel: "Open",
        icon: FilePlus2,
        keywords: ["documents", "approval", "review"],
      },
      {
        label: "Open notifications",
        actionLabel: "View",
        icon: BellRing,
        keywords: ["alerts", "notifications"],
      },
    ],
    [],
  );

  const contextHint = useMemo(() => {
    const rules: Array<{
      match: (path: string) => boolean;
      message: string;
      key: string;
    }> = [
      {
        match: (path) => path === "/dashboard" || path === "/dashboard/admin",
        message: "Press ⌘K to search anything across ImpactBridge.",
        key: "dashboard-command",
      },
      {
        match: (path) => path.startsWith("/dashboard/admin/companies"),
        message: "Tip: Filter by CSR category for quicker matches.",
        key: "companies-filter",
      },
      {
        match: (path) =>
          path.startsWith("/dashboard/admin/ngos/") && path.endsWith("/documents"),
        message: "Drag & drop files here to upload supporting documents faster.",
        key: "ngo-documents-upload",
      },
    ];

    const matched = rules.find((rule) => rule.match(pathname));
    if (!matched) {
      return { hint: null, routeKey: undefined };
    }

    return {
      hint: { message: matched.message },
      routeKey: matched.key,
    };
  }, [pathname]);

  useEffect(() => {
    if (!token || !userRole) {
      router.replace("/login");
    }
  }, [router, token, userRole]);

  useEffect(() => {
    router.prefetch("/dashboard/admin");
    router.prefetch("/dashboard/users");
    router.prefetch("/dashboard/admin/modules/reports");
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        const target = event.target as HTMLElement | null;
        if (target) {
          const tag = target.tagName.toLowerCase();
          if (tag === "input" || tag === "textarea" || target.isContentEditable) {
            return;
          }
        }

        event.preventDefault();
        setSearchOpen(true);
        setCommandOpen(false);
        return;
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setContentOpacityClass("opacity-100");
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  const triggerContentFade = useCallback(() => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
    }
    setContentOpacityClass("opacity-0");
    fadeTimeoutRef.current = setTimeout(() => {
      setContentOpacityClass("opacity-100");
      fadeTimeoutRef.current = null;
    }, 180);
  }, []);

  if (!token || !userRole || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <span className="text-sm font-medium text-slate-500">Preparing your workspace…</span>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.replace("/login");
    setMobileOpen(false);
  };

  const handleLinkNavigate = () => {
    triggerContentFade();
    setMobileOpen(false);
  };

  const notificationsSheet = mobileNotificationsOpen ? (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/50 backdrop-blur-sm md:hidden">
      <div className="mt-auto rounded-t-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-slate-900">Activity notifications</p>
            <p className="text-xs text-slate-500">Review the latest platform updates.</p>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600"
            onClick={() => setMobileNotificationsOpen(false)}
            aria-label="Close notifications"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5 space-y-3 text-small text-slate-500">
          <NotificationItem icon={FilePlus2} title="New document uploaded by NGO" timestamp="Just now" />
          <NotificationItem icon={MessageSquarePlus} title="Comment added on CSR Form" timestamp="5 minutes ago" />
          <NotificationItem icon={Clock3} title="Review request assigned to you" timestamp="12 minutes ago" />
        </div>
        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
          onClick={() => setMobileNotificationsOpen(false)}
        >
          Mark all as read
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="relative flex h-screen w-full bg-gradient-to-br from-background via-background to-background/90 transition-colors">
      <aside className="hidden h-full w-[260px] flex-shrink-0 bg-white transition-colors dark:bg-slate-950 md:flex" data-onboarding="sidebar-nav">
        <div className="flex h-full w-full flex-col overflow-hidden border-r border-slate-200 dark:border-slate-800">
          <div className="flex h-full w-full flex-col overflow-y-auto px-6 py-8 text-slate-800 dark:text-slate-200">
            <Link
              href="/dashboard/admin"
              prefetch={true}
              className="mb-6 flex items-center gap-3 text-lg font-semibold text-slate-900"
              onClick={handleLinkNavigate}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <ShieldCheck className="h-5 w-5 text-slate-600" />
              </span>
              ImpactBridge
            </Link>
            <nav className="mt-4 flex flex-col gap-6 text-small">
            {groupedLinks.map((group) => (
              <div key={group.name}>
                <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
                  {group.name}
                </p>
                <div className="space-y-1">
                  {group.items.map((link) => (
                    <SidebarLink
                      key={link.label}
                      item={link}
                      pathname={pathname}
                      onNavigate={handleLinkNavigate}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-100">Secure CSR environment</p>
            <p className="mt-1 leading-relaxed">
              Built for compliant collaboration across NGOs, companies, and donors.
            </p>
          </div>
        </div>
      </div>
      </aside>

      <div className="flex w-full flex-1 flex-col overflow-hidden bg-background transition-colors">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/95 px-shell-sm py-4 shadow-sm backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/80 sm:px-shell lg:px-shell-lg">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-1 items-center justify-end gap-4 md:justify-between">
            <div className="hidden flex-col text-foreground md:flex">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500">
                ImpactBridge Dashboard
              </span>
              <span className="text-base font-semibold text-slate-800 dark:text-slate-100">Unified CSR Intelligence</span>
            </div>

            <div className="flex flex-1 items-center justify-center gap-4 md:justify-end">
            <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm transition focus-within:border-slate-300 focus-within:shadow dark:border-slate-700 dark:bg-slate-900" data-onboarding="global-search">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="search"
                placeholder="Search anything…"
                aria-label="Search the dashboard"
                className="w-full cursor-pointer bg-transparent text-small text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500"
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    setSearchOpen(true);
                    setCommandOpen(false);
                  }
                }}
                readOnly
              />
              <button
                type="button"
                onClick={() =>
                  startCommandTransition(() => {
                    setSearchOpen(true);
                    setCommandOpen(false);
                  })
                }
                className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-500 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 sm:flex disabled:opacity-60"
                aria-label="Open global search"
                disabled={isCommandPending}
              >
                <Command className="h-3.5 w-3.5" />
                <span>⌘K</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="relative">
                <button
                  type="button"
                  aria-label="View activity notifications"
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setMobileNotificationsOpen(true);
                    } else {
                      setNotificationsOpen((prev) => !prev);
                    }
                  }}
                >
                  <BellRing className="h-5 w-5" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-semibold text-white shadow-sm">
                    3
                  </span>
                </button>

                {notificationsOpen ? (
                  <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-80 rounded-2xl border border-slate-200 bg-white p-4 text-small shadow-2xl transition-colors dark:border-slate-700 dark:bg-slate-950">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-small font-semibold text-slate-700 dark:text-slate-100">Activity notifications</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Stay on top of compliance updates.</p>
                      </div>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                        onClick={() => setNotificationsOpen(false)}
                        aria-label="Close notifications"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                      <NotificationItem
                        icon={FilePlus2}
                        title="New document uploaded by NGO"
                        timestamp="Just now"
                      />
                      <NotificationItem
                        icon={MessageSquarePlus}
                        title="Comment added on CSR Form"
                        timestamp="5 minutes ago"
                      />
                      <NotificationItem
                        icon={Clock3}
                        title="Review request assigned to you"
                        timestamp="12 minutes ago"
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-200"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Mark all as read
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

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
            <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col gap-6 bg-white p-6 shadow-2xl dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-small font-semibold text-slate-700 dark:text-slate-100">{user?.name}</p>
                  <p className="text-xs text-slate-500 uppercase dark:text-slate-500">{user?.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300"
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
                className="mt-auto border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900/40"
              >
                Sign out
              </Button>
            </div>
          </div>
        ) : null}
        <main className="flex-1 overflow-y-auto px-shell-sm py-4 sm:px-shell sm:py-6 lg:px-shell-lg lg:py-8 min-h-0">
          <Suspense
            fallback={
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8 dark:border-slate-800 dark:bg-slate-950">
                <div className="space-y-6">
                  <Skeleton className="h-9 w-48" />
                  <Skeleton className="h-64 w-full" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                  </div>
                  <Skeleton className="h-56 w-full" />
                </div>
              </section>
            }
          >
            <section
              className={cn(
                "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-opacity duration-200 sm:p-6 lg:p-8 dark:border-slate-800 dark:bg-slate-950",
                contentOpacityClass,
              )}
            >
              <div className="space-y-8">{children}</div>
            </section>
          </Suspense>
        </main>
      </div>

      {notificationsSheet}
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} items={commandItems} />
      <GlobalSearchSpotlight open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CommandHints hint={contextHint.hint} routeKey={contextHint.routeKey} />
    </div>
  );
}

interface CommandPaletteItem {
  label: string;
  actionLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords?: string[];
}

function CommandPalette({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItem[];
}) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return items;
    }
    const term = query.toLowerCase();
    return items.filter((item) => {
      if (item.label.toLowerCase().includes(term)) {
        return true;
      }
      return item.keywords?.some((keyword) => keyword.toLowerCase().includes(term));
    });
  }, [items, query]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/40 px-4 py-10 backdrop-blur-md transition sm:items-center">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl transition dark:border-slate-700 dark:bg-slate-950 sm:mx-auto">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 transition dark:border-slate-800 sm:px-6">
          <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            autoFocus
            value={query}
            onChange={(event) =>
              startTransition(() => {
                setQuery(event.target.value);
              })
            }
            placeholder="Search anywhere…"
            className="flex-1 bg-transparent text-sm text-slate-800 outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[360px] overflow-y-auto px-2 py-4 sm:px-4">
          {filteredItems.length ? (
            <ul className="space-y-2">
              {filteredItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      startTransition(() => {
                        onClose();
                        setQuery("");
                      })
                    }
                    className="flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50 disabled:opacity-70 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10"
                    disabled={isPending}
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">{item.label}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                      {item.actionLabel}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
              No matching results
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:px-6">
          <p className="flex items-center justify-between">
            <span>Navigate faster with search and shortcuts.</span>
            <span className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400 sm:flex">
              <Command className="h-3.5 w-3.5" />
              K
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
