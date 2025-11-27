import {
  Building2,
  ClipboardList,
  HandCoins,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Shield,
  ShieldCheck,
} from "lucide-react";

export interface NavItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  roles: Array<'SUPER_ADMIN' | 'NGO' | 'COMPANY' | 'DONOR'>;
  children?: NavItem[];
}

export const navMenu: NavItem[] = [
  {
    label: "Admin Overview",
    href: "/dashboard/admin",
    icon: Shield,
    roles: ["SUPER_ADMIN"],
    children: [
      {
        label: "NGO Management",
        href: "/dashboard/admin/modules/ngos",
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "CSR Programmes",
        href: "/dashboard/admin/modules/programmes",
        icon: ClipboardList,
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Reports & Analytics",
        href: "/dashboard/admin/modules/reports",
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Platform Settings",
        href: "/dashboard/admin/modules/settings",
        icon: Settings,
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    label: "NGO Workspace",
    href: "/dashboard/ngo",
    icon: ShieldCheck,
    roles: ["NGO"],
  },
  {
    label: "Company CSR Hub",
    href: "/dashboard/company",
    icon: Building2,
    roles: ["COMPANY"],
  },
  {
    label: "Donor Insights",
    href: "/dashboard/donor",
    icon: HandCoins,
    roles: ["DONOR"],
  },
];
