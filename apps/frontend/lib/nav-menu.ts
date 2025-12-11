import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileBarChart,
  FolderKanban,
  HandCoins,
  LayoutDashboard,
  LifeBuoy,
  LucideIcon,
  Settings2,
  ShieldCheck,
  Users,
  Users2,
} from "lucide-react";

export interface NavItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  roles: Array<'SUPER_ADMIN' | 'NGO' | 'COMPANY' | 'DONOR'>;
  children?: NavItem[];
  group?: string;
}

export const navMenu: NavItem[] = [
  {
    label: "Executive",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN"],
    group: "Executive suite",
    children: [
      {
        label: "Overview",
        href: "/dashboard/admin",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Performance",
        href: "/dashboard/admin/performance",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Team activity",
        href: "/dashboard/admin/activity",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    label: "Users",
    icon: Users,
    roles: ["SUPER_ADMIN"],
    group: "People",
    href: "/dashboard/users",
  },
  {
    label: "NGO ops",
    icon: Users2,
    roles: ["SUPER_ADMIN"],
    group: "People",
    children: [
      {
        label: "Workspace",
        href: "/dashboard/admin/modules/ngos",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Review queue",
        href: "/dashboard/admin/modules/ngos/review-queue",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Partner profiles",
        href: "/dashboard/admin/modules/ngos/partner-profiles",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Impact portfolio",
        href: "/dashboard/admin/modules/ngos/impact-portfolio",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    label: "Company ops",
    icon: HandCoins,
    roles: ["SUPER_ADMIN"],
    group: "People",
    children: [
      {
        label: "Workspace",
        href: "/dashboard/admin/companies",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    label: "Company dashboard",
    icon: LayoutDashboard,
    roles: ["COMPANY"],
    group: "Workspace",
    href: "/dashboard/company",
  },
  {
    label: "CSR programmes",
    icon: ClipboardList,
    roles: ["COMPANY"],
    group: "Workspace",
    href: "/dashboard/company/programmes",
  },
  {
    label: "Compliance overview",
    icon: ShieldCheck,
    roles: ["COMPANY"],
    group: "Workspace",
    href: "/dashboard/company/compliance",
  },
  {
    label: "CSR budget planner",
    icon: BarChart3,
    roles: ["COMPANY"],
    group: "Workspace",
    href: "/dashboard/company/budget-planner",
  },
  {
    label: "Partnership insights",
    icon: Users,
    roles: ["COMPANY"],
    group: "Workspace",
    href: "/dashboard/company/partner-insights",
  },
  {
    label: "Vendor directory",
    icon: FolderKanban,
    roles: ["COMPANY"],
    group: "Workspace",
    href: "/dashboard/company/vendors",
  },
  {
    label: "Audit & compliance",
    icon: ShieldCheck,
    roles: ["COMPANY"],
    group: "Workspace",
    href: "/dashboard/company/audit-center",
  },
  {
    label: "Programmes",
    icon: ClipboardList,
    roles: ["SUPER_ADMIN"],
    group: "Programs",
    children: [
      {
        label: "Pipeline",
        href: "/dashboard/admin/modules/programmes/pipeline",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Active initiatives",
        href: "/dashboard/admin/modules/programmes/active-initiatives",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Templates",
        href: "/dashboard/admin/modules/programmes/templates",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    label: "Reports",
    icon: FileBarChart,
    roles: ["SUPER_ADMIN"],
    group: "Programs",
    children: [
      {
        label: "Compliance",
        href: "/dashboard/admin/modules/reports/compliance",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Impact",
        href: "/dashboard/admin/modules/reports/impact",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Downloads",
        href: "/dashboard/admin/modules/reports/downloads",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    label: "Controls",
    icon: Settings2,
    roles: ["SUPER_ADMIN"],
    group: "Platform",
    children: [
      {
        label: "Configuration",
        href: "/dashboard/admin/modules/settings/configuration",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Access control",
        href: "/dashboard/admin/modules/settings/access-control",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Audit trail",
        href: "/dashboard/admin/modules/settings/audit-trail",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    label: "NGO workspace",
    icon: ShieldCheck,
    roles: ["NGO"],
    group: "My workspace",
    children: [
      {
        label: "Overview",
        href: "/dashboard/ngo",
        roles: ["NGO"],
      },
      {
        label: "Campaigns",
        href: "/dashboard/ngo/campaigns",
        roles: ["NGO"],
      },
      {
        label: "Donations",
        href: "/dashboard/ngo/donations",
        roles: ["NGO"],
      },
      {
        label: "Compliance",
        href: "/dashboard/ngo/compliance",
        roles: ["NGO"],
      },
      {
        label: "Donors",
        href: "/dashboard/ngo/donors",
        roles: ["NGO"],
      },
      {
        label: "Team",
        href: "/dashboard/ngo/team",
        roles: ["NGO"],
      },
      {
        label: "Finance",
        href: "/dashboard/ngo/finance",
        roles: ["NGO"],
      },
      {
        label: "Billing",
        href: "/dashboard/ngo/billing",
        roles: ["NGO"],
      },
      {
        label: "Payouts",
        href: "/dashboard/ngo/payouts",
        roles: ["NGO"],
      },
      {
        label: "Impact & reports",
        href: "/dashboard/ngo/impact",
        roles: ["NGO"],
      },
    ],
  },
  {
    label: "Company CSR hub",
    icon: FolderKanban,
    roles: ["COMPANY"],
    group: "My workspace",
    children: [
      {
        label: "Overview",
        href: "/dashboard/company",
        roles: ["COMPANY"],
      },
      {
        label: "Portfolio",
        href: "/dashboard/company/portfolio",
        roles: ["COMPANY"],
      },
      {
        label: "Reporting",
        href: "/dashboard/company/reporting",
        roles: ["COMPANY"],
      },
      {
        label: "Partnered NGOs",
        href: "/dashboard/company/ngos",
        roles: ["COMPANY"],
      },
    ],
  },
  {
    label: "Donor insights",
    icon: HandCoins,
    roles: ["DONOR"],
    group: "My workspace",
    children: [
      {
        label: "Overview",
        href: "/dashboard/donor",
        roles: ["DONOR"],
      },
      {
        label: "Giving history",
        href: "/dashboard/donor/history",
        roles: ["DONOR"],
      },
      {
        label: "Saved causes",
        href: "/dashboard/donor/saved",
        roles: ["DONOR"],
      },
    ],
  },
  {
    label: "Knowledge centre",
    icon: BookOpen,
    roles: ["SUPER_ADMIN", "NGO", "COMPANY", "DONOR"],
    group: "Guides & support",
    children: [
      {
        label: "User manual",
        href: "/dashboard/resources/user-manual",
        roles: ["SUPER_ADMIN", "NGO", "COMPANY", "DONOR"],
      },
      {
        label: "Platform documentation",
        href: "/dashboard/resources/documentation",
        roles: ["SUPER_ADMIN", "NGO", "COMPANY", "DONOR"],
      },
      {
        label: "Platform details",
        href: "/dashboard/resources/platform-details",
        roles: ["SUPER_ADMIN", "NGO", "COMPANY", "DONOR"],
      },
    ],
  },
  {
    label: "Support",
    icon: LifeBuoy,
    roles: ["SUPER_ADMIN", "NGO", "COMPANY", "DONOR"],
    group: "Guides & support",
    children: [
      {
        label: "Help desk",
        href: "/dashboard/resources/support",
        roles: ["SUPER_ADMIN", "NGO", "COMPANY", "DONOR"],
      },
      {
        label: "Release notes",
        href: "/dashboard/resources/release-notes",
        roles: ["SUPER_ADMIN", "NGO", "COMPANY", "DONOR"],
      },
    ],
  },
];
