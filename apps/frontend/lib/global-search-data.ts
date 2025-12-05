import type { LucideIcon } from "lucide-react";
import {
  Building2,
  FileText,
  FolderCog,
  Handshake,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Users,
} from "lucide-react";

export type GlobalSearchType = "user" | "ngo" | "company" | "programme" | "document";

export interface GlobalSearchRecord {
  id: string;
  label: string;
  href: string;
  type: GlobalSearchType;
  icon: LucideIcon;
  description?: string;
  keywords?: string[];
  meta?: string;
}

export const GLOBAL_SEARCH_CATEGORIES: Array<{
  type: GlobalSearchType;
  label: string;
}> = [
  { type: "user", label: "Users" },
  { type: "ngo", label: "NGOs" },
  { type: "company", label: "Companies" },
  { type: "programme", label: "Programmes" },
  { type: "document", label: "Documents" },
];

export const GLOBAL_SEARCH_DATA: GlobalSearchRecord[] = [
  {
    id: "user-aarti-desai",
    label: "Aarti Desai",
    href: "/dashboard/users/1",
    type: "user",
    icon: UserCircle2,
    description: "Super Admin · Active",
    keywords: ["admin", "impactbridge", "desai"],
  },
  {
    id: "user-rahul-mehta",
    label: "Rahul Mehta",
    href: "/dashboard/users/3",
    type: "user",
    icon: Users,
    description: "CSR Lead · Asteria Technologies",
    keywords: ["csr", "asteria", "mehta"],
  },
  {
    id: "ngo-greenearth",
    label: "GreenEarth Foundation",
    href: "/dashboard/admin/modules/ngos/partner-profiles",
    type: "ngo",
    icon: MapPinned,
    description: "Environmental sustainability partner",
    keywords: ["environment", "green", "ngo"],
    meta: "Verified",
  },
  {
    id: "ngo-swasthya-seva",
    label: "Swasthya Seva Foundation",
    href: "/dashboard/admin/ngos/swasthya-seva/documents",
    type: "ngo",
    icon: MapPinned,
    description: "Primary healthcare initiatives",
    keywords: ["health", "clinic", "rural"],
    meta: "Pending compliance",
  },
  {
    id: "ngo-future-minds",
    label: "Future Minds Trust",
    href: "/dashboard/admin/modules/ngos/impact-portfolio",
    type: "ngo",
    icon: MapPinned,
    description: "Digital literacy programmes",
    keywords: ["digital", "education", "youth"],
  },
  {
    id: "company-asteria",
    label: "Asteria Technologies Pvt Ltd",
    href: "/dashboard/admin/company/asteria-technologies",
    type: "company",
    icon: Building2,
    description: "Information Technology · Active",
    keywords: ["it", "technology", "csr"],
  },
  {
    id: "company-zdxy",
    label: "Zdxy Pvt Ltd",
    href: "/dashboard/admin/company/zdxy",
    type: "company",
    icon: Building2,
    description: "Energy · Pending onboarding",
    keywords: ["energy", "csr", "zdxy"],
    meta: "Review in progress",
  },
  {
    id: "company-blueorbit",
    label: "BlueOrbit CSR Initiatives",
    href: "/dashboard/admin/companies",
    type: "company",
    icon: Building2,
    description: "Manufacturing · Portfolio overview",
    keywords: ["manufacturing", "portfolio", "reports"],
  },
  {
    id: "programme-med-atlas",
    label: "MedAtlas Rural Clinics",
    href: "/dashboard/admin/company/asteria-technologies/programmes/med-atlas",
    type: "programme",
    icon: Handshake,
    description: "Health programme · In progress",
    keywords: ["health", "rural", "clinics"],
    meta: "68% completion",
  },
  {
    id: "programme-digital-labs",
    label: "Digital Labs for Government Schools",
    href: "/dashboard/admin/company/asteria-technologies/programmes/digitallabs",
    type: "programme",
    icon: Handshake,
    description: "Education initiative · Draft",
    keywords: ["digital", "education", "schools"],
  },
  {
    id: "programme-community-hub",
    label: "Community Learning Hub",
    href: "/dashboard/admin/modules/programmes",
    type: "programme",
    icon: Sparkles,
    description: "Livelihood programme · Active",
    keywords: ["community", "learning", "livelihood"],
    meta: "82% completion",
  },
  {
    id: "document-csr-policy",
    label: "FY25 CSR Policy (Asteria)",
    href: "/dashboard/admin/company/asteria-technologies",
    type: "document",
    icon: FileText,
    description: "Uploaded Jan 2025 · PDF",
    keywords: ["policy", "csr", "asteria"],
  },
  {
    id: "document-swasthya-report",
    label: "Swasthya Seva Quarterly Report",
    href: "/dashboard/admin/ngos/swasthya-seva/documents",
    type: "document",
    icon: FileText,
    description: "Compliance · Q1 FY25",
    keywords: ["report", "health", "ngo"],
  },
  {
    id: "document-governance-checklist",
    label: "Governance Checklist Template",
    href: "/dashboard/resources/documentation",
    type: "document",
    icon: FolderCog,
    description: "Shared resource · Updated Feb 2025",
    keywords: ["governance", "template", "compliance"],
  },
  {
    id: "document-zdxy-strategy",
    label: "Zdxy CSR Strategy Brief",
    href: "/dashboard/admin/company/zdxy",
    type: "document",
    icon: ShieldCheck,
    description: "Strategy note · Pending review",
    keywords: ["strategy", "zdxy", "csr"],
  },
];

