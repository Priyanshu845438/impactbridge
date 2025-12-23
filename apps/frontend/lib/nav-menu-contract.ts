import type { NavItem } from "./nav-menu";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileBarChart,
  FolderKanban,
  HandCoins,
  LayoutDashboard,
  LifeBuoy,
  MessageCircle,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  Users2,
  Globe2,
} from "lucide-react";

export type RoleKey = "SUPER_ADMIN" | "NGO" | "COMPANY" | "DONOR";

export interface ServerNavigationResponse {
  version: string;
  generatedAt: string;
  roles: ServerRoleNavigation[];
}

export interface ServerRoleNavigation {
  role: RoleKey;
  modules: ServerNavigationModule[];
}

export interface ServerNavigationModule {
  key: string;
  label: string;
  route: string | null;
  icon?: string | null;
  group?: string | null;
  order?: number | null;
  children?: ServerNavigationModule[];
}

type LucideToken =
  | "layout-dashboard"
  | "hand-coins"
  | "clipboard-list"
  | "sparkles"
  | "globe"
  | "shield-check"
  | "trending-up"
  | "file-bar-chart"
  | "book-open"
  | "users"
  | "users-two"
  | "folder-kanban"
  | "life-buoy"
  | "message-circle"
  | "sliders"
  | "bar-chart"
  | "settings";

type IconLookup = Record<LucideToken, NavItem["icon"]>;

const iconMap: IconLookup = {
  "layout-dashboard": LayoutDashboard,
  "hand-coins": HandCoins,
  "clipboard-list": ClipboardList,
  sparkles: Sparkles,
  globe: Globe2,
  "shield-check": ShieldCheck,
  "trending-up": TrendingUp,
  "file-bar-chart": FileBarChart,
  "book-open": BookOpen,
  users: Users,
  "users-two": Users2,
  "folder-kanban": FolderKanban,
  "life-buoy": LifeBuoy,
  "message-circle": MessageCircle,
  sliders: SlidersHorizontal,
  "bar-chart": BarChart3,
  settings: Settings2,
};

interface AggregatedNode extends Omit<NavItem, "children"> {
  children?: Record<string, AggregatedNode>;
  order: number;
  key: string;
}

const DEFAULT_ORDER = Number.MAX_SAFE_INTEGER;

function translateIcon(token?: string | null): NavItem["icon"] | undefined {
  if (!token) {
    return undefined;
  }

  return iconMap[token as LucideToken];
}

export function mapServerNavigation(response: ServerNavigationResponse): NavItem[] {
  const aggregated: Record<string, AggregatedNode> = {};

  for (const roleEntry of response.roles) {
    mergeModules(aggregated, roleEntry.modules ?? [], roleEntry.role);
  }

  return Object.values(aggregated)
    .sort((a, b) => a.order - b.order)
    .map(flattenNode);
}

function mergeModules(target: Record<string, AggregatedNode>, modules: ServerNavigationModule[], role: RoleKey) {
  for (const moduleEntry of modules) {
    const existing = target[moduleEntry.key];
    const order = moduleEntry.order ?? DEFAULT_ORDER;

    if (!existing) {
      target[moduleEntry.key] = {
        key: moduleEntry.key,
        label: moduleEntry.label,
        href: moduleEntry.route ?? undefined,
        icon: translateIcon(moduleEntry.icon ?? undefined),
        group: moduleEntry.group ?? undefined,
        roles: [role],
        order,
        children: {},
      };
    } else {
      existing.roles = unique([...existing.roles, role]);
      existing.label = moduleEntry.label ?? existing.label;
      existing.href = moduleEntry.route ?? existing.href;
      existing.group = moduleEntry.group ?? existing.group;
      existing.icon = translateIcon(moduleEntry.icon ?? undefined) ?? existing.icon;
      existing.order = Math.min(existing.order, order);
    }

    if (moduleEntry.children && moduleEntry.children.length > 0) {
      mergeModules(target[moduleEntry.key].children ?? {}, moduleEntry.children, role);
    }
  }
}

function flattenNode(node: AggregatedNode): NavItem {
  const children = node.children ? Object.values(node.children).sort((a, b) => a.order - b.order).map(flattenNode) : undefined;

  const result: NavItem = {
    key: node.key,
    label: node.label,
    href: node.href,
    icon: node.icon,
    roles: node.roles,
    group: node.group,
  };

  if (children && children.length > 0) {
    result.children = children;
  }

  return result;
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}
