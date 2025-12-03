"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileWarning,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  TimerReset,
  UserRound,
} from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

const registrationCategories = ["80G", "FCRA", "12A", "Trust", "Society"] as const;
const complianceStatuses = ["Verified", "Pending", "Rejected", "In Review"] as const;
const regions = ["North", "South", "East", "West", "Central"] as const;

const registrationTypeFilters = ["All", ...registrationCategories] as const;
const complianceStatusFilters = ["All", ...complianceStatuses] as const;
const regionFilters = ["All", ...regions] as const;

const sortOptions = [
  { label: "Name", key: "name" },
  { label: "Compliance status", key: "complianceStatus" },
  { label: "Last updated", key: "updatedAt" },
] as const;

type RegistrationCategory = (typeof registrationCategories)[number];
type ComplianceStatus = (typeof complianceStatuses)[number];
type Region = (typeof regions)[number];
type DocumentStatus = "Submitted" | "Pending" | "Not Required" | "Rejected";

type NgoRecord = {
  name: string;
  registrationId: string;
  city: string;
  region: Region;
  registrationType: string;
  registrationCategory: RegistrationCategory;
  complianceStatus: ComplianceStatus;
  updatedAt: string;
  establishedYear: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  complianceProgress: number;
  documents: { name: string; status: DocumentStatus }[];
  activity: { label: string; timestamp: string; detail: string }[];
};

const ngoData: NgoRecord[] = [
  {
    name: "Swasthya Seva Foundation",
    registrationId: "NGO-IND-2021-0098",
    city: "Bengaluru",
    region: "South",
    registrationType: "Societies Registration Act, 1860",
    registrationCategory: "80G",
    complianceStatus: "Verified",
    updatedAt: "2025-02-11",
    establishedYear: "2011",
    contactPerson: "Ananya Rao",
    contactEmail: "ananya@swasthyaseva.org",
    contactPhone: "+91 99876 54321",
    address: "12 MG Road, Indiranagar, Bengaluru, Karnataka - 560038",
    complianceProgress: 92,
    documents: [
      { name: "80G Certificate", status: "Submitted" },
      { name: "FCRA License", status: "Not Required" },
      { name: "Audit Report 2024", status: "Pending" },
      { name: "Board Resolution", status: "Submitted" },
    ],
    activity: [
      { label: "Profile updated", timestamp: "2 Feb 2025", detail: "Address and contact updated" },
      { label: "Compliance checklist submitted", timestamp: "28 Jan 2025", detail: "CSR policy & audit" },
      { label: "Initial verification", timestamp: "12 Jan 2025", detail: "Documents reviewed" },
    ],
  },
  {
    name: "Prerna Women Collective",
    registrationId: "NGO-IND-2023-0412",
    city: "Lucknow",
    region: "North",
    registrationType: "Section 8 Company",
    registrationCategory: "FCRA",
    complianceStatus: "In Review",
    updatedAt: "2025-02-08",
    establishedYear: "2019",
    contactPerson: "Meera Singh",
    contactEmail: "contact@prernawomen.in",
    contactPhone: "+91 98764 23145",
    address: "44 Gomti Nagar, Lucknow, Uttar Pradesh - 226010",
    complianceProgress: 64,
    documents: [
      { name: "Company Incorporation", status: "Submitted" },
      { name: "FCRA License", status: "Pending" },
      { name: "Board Resolution", status: "Submitted" },
    ],
    activity: [
      { label: "Due diligence started", timestamp: "4 Feb 2025", detail: "Field officer assigned" },
      { label: "Application received", timestamp: "30 Jan 2025", detail: "CSR onboarding request" },
    ],
  },
  {
    name: "Green Earth Alliance",
    registrationId: "NGO-IND-2022-0173",
    city: "Jaipur",
    region: "West",
    registrationType: "Trust Act",
    registrationCategory: "12A",
    complianceStatus: "Verified",
    updatedAt: "2025-02-06",
    establishedYear: "2014",
    contactPerson: "Rohit Sharma",
    contactEmail: "hello@greenearth.in",
    contactPhone: "+91 91234 56789",
    address: "108 C-Scheme, Jaipur, Rajasthan - 302001",
    complianceProgress: 78,
    documents: [
      { name: "12A Certificate", status: "Submitted" },
      { name: "CSR Utilisation Report", status: "Submitted" },
      { name: "Audit Report 2024", status: "Submitted" },
    ],
    activity: [
      { label: "Compliance review", timestamp: "1 Feb 2025", detail: "Approved without remarks" },
      { label: "Impact report uploaded", timestamp: "22 Jan 2025", detail: "CSR initiative impact data" },
    ],
  },
  {
    name: "Future Minds Trust",
    registrationId: "NGO-IND-2020-0027",
    city: "Mumbai",
    region: "West",
    registrationType: "Public Charitable Trust",
    registrationCategory: "Trust",
    complianceStatus: "Rejected",
    updatedAt: "2025-02-02",
    establishedYear: "2009",
    contactPerson: "Riya Kapoor",
    contactEmail: "support@futureminds.org",
    contactPhone: "+91 94567 11223",
    address: "402 Bandra Kurla Complex, Mumbai, Maharashtra - 400051",
    complianceProgress: 35,
    documents: [
      { name: "Trust Deed", status: "Submitted" },
      { name: "Latest Audit Report", status: "Rejected" },
      { name: "Compliance response", status: "Pending" },
    ],
    activity: [
      { label: "Compliance flagged", timestamp: "30 Jan 2025", detail: "Missing audit annexures" },
      { label: "Field review", timestamp: "15 Jan 2025", detail: "Site visit pending" },
    ],
  },
  {
    name: "Jeevan Jyoti Society",
    registrationId: "NGO-IND-2019-0541",
    city: "Pune",
    region: "West",
    registrationType: "Societies Registration Act, 1860",
    registrationCategory: "Society",
    complianceStatus: "Pending",
    updatedAt: "2025-01-30",
    establishedYear: "2016",
    contactPerson: "Nikita Deshmukh",
    contactEmail: "info@jeevanjyoti.org",
    contactPhone: "+91 93456 77889",
    address: "88 FC Road, Shivajinagar, Pune, Maharashtra - 411005",
    complianceProgress: 58,
    documents: [
      { name: "Society Bylaws", status: "Submitted" },
      { name: "CSR Compliance Report", status: "Pending" },
    ],
    activity: [
      { label: "Registration verified", timestamp: "18 Jan 2025", detail: "Approved by registry" },
      { label: "Awaiting documents", timestamp: "10 Jan 2025", detail: "CSR compliance report" },
    ],
  },
  {
    name: "Sahyog Grameen Network",
    registrationId: "NGO-IND-2022-0899",
    city: "Nagpur",
    region: "West",
    registrationType: "Trust Act",
    registrationCategory: "Trust",
    complianceStatus: "Verified",
    updatedAt: "2025-01-18",
    establishedYear: "2012",
    contactPerson: "Ashok Patil",
    contactEmail: "admin@sahyog.org",
    contactPhone: "+91 91345 67890",
    address: "21 Wardha Road, Nagpur, Maharashtra - 440015",
    complianceProgress: 85,
    documents: [
      { name: "Trust Deed", status: "Submitted" },
      { name: "FCRA License", status: "Submitted" },
      { name: "Audit Report 2024", status: "Submitted" },
    ],
    activity: [
      { label: "Due diligence complete", timestamp: "12 Jan 2025", detail: "Ready for CSR partnership" },
      { label: "Capacity assessment", timestamp: "28 Dec 2024", detail: "Scored 85%" },
    ],
  },
  {
    name: "Shakti Rural Upliftment",
    registrationId: "NGO-IND-2023-0775",
    city: "Bhopal",
    region: "Central",
    registrationType: "Section 8 Company",
    registrationCategory: "FCRA",
    complianceStatus: "In Review",
    updatedAt: "2025-01-12",
    establishedYear: "2021",
    contactPerson: "Kavita Yadav",
    contactEmail: "contact@shaktiuplift.org",
    contactPhone: "+91 93210 55678",
    address: "65 Arera Colony, Bhopal, Madhya Pradesh - 462016",
    complianceProgress: 47,
    documents: [
      { name: "Company Incorporation", status: "Submitted" },
      { name: "FCRA License", status: "Submitted" },
      { name: "CSR Utilisation", status: "Pending" },
    ],
    activity: [
      { label: "Application received", timestamp: "5 Jan 2025", detail: "Awaiting internal review" },
    ],
  },
  {
    name: "Nayi Disha Education",
    registrationId: "NGO-IND-2024-0056",
    city: "Delhi",
    region: "North",
    registrationType: "Societies Registration Act, 1860",
    registrationCategory: "80G",
    complianceStatus: "Verified",
    updatedAt: "2025-01-08",
    establishedYear: "2018",
    contactPerson: "Sanya Gupta",
    contactEmail: "team@naydisha.org",
    contactPhone: "+91 90123 45678",
    address: "24 Lodhi Road, New Delhi - 110003",
    complianceProgress: 73,
    documents: [
      { name: "80G Certificate", status: "Submitted" },
      { name: "Audit Report", status: "Submitted" },
      { name: "Impact report", status: "Pending" },
    ],
    activity: [
      { label: "Impact showcase", timestamp: "30 Dec 2024", detail: "Shared digital education pilot" },
    ],
  },
  {
    name: "Samriddhi Livelihood Mission",
    registrationId: "NGO-IND-2021-0221",
    city: "Patna",
    region: "East",
    registrationType: "Trust Act",
    registrationCategory: "Trust",
    complianceStatus: "Rejected",
    updatedAt: "2025-01-05",
    establishedYear: "2015",
    contactPerson: "Arvind Kumar",
    contactEmail: "arvind@samriddhi.org",
    contactPhone: "+91 97654 32109",
    address: "17 Fraser Road, Patna, Bihar - 800001",
    complianceProgress: 29,
    documents: [
      { name: "Trust Deed", status: "Submitted" },
      { name: "Compliance disputes", status: "Rejected" },
    ],
    activity: [
      { label: "Compliance issue", timestamp: "2 Jan 2025", detail: "Pending board clarification" },
    ],
  },
  {
    name: "Udaan Youth Collective",
    registrationId: "NGO-IND-2020-0754",
    city: "Chandigarh",
    region: "North",
    registrationType: "Public Charitable Trust",
    registrationCategory: "12A",
    complianceStatus: "Verified",
    updatedAt: "2024-12-28",
    establishedYear: "2010",
    contactPerson: "Rehaan Oberoi",
    contactEmail: "info@udaan.org",
    contactPhone: "+91 96543 21098",
    address: "9 Sector 22, Chandigarh - 160022",
    complianceProgress: 81,
    documents: [
      { name: "12A Certificate", status: "Submitted" },
      { name: "CSR Utilisation", status: "Submitted" },
      { name: "Audit Report", status: "Submitted" },
    ],
    activity: [
      { label: "CSR partnership renewed", timestamp: "20 Dec 2024", detail: "3-year renewal" },
    ],
  },
];

type SortKey = (typeof sortOptions)[number]["key"];
type SortDirection = "asc" | "desc";
type RegistrationTypeFilter = (typeof registrationTypeFilters)[number];
type ComplianceStatusFilter = (typeof complianceStatusFilters)[number];
type RegionFilter = (typeof regionFilters)[number];

function getStatusTone(status: ComplianceStatus) {
  switch (status) {
    case "Verified":
      return "bg-success-100 text-success-500 border-emerald-200";
    case "Pending":
      return "bg-warning-100 text-warning-500 border-amber-200";
    case "Rejected":
      return "bg-danger-100 text-danger-500 border-rose-200";
    case "In Review":
      return "bg-sky-100 text-sky-700 border-sky-200";
    default:
      return "bg-slate-100 text-small text-slate-500 border-slate-200";
  }
}

const documentStatusTone: Record<DocumentStatus, string> = {
  Submitted: "text-emerald-600",
  Pending: "text-amber-600",
  "Not Required": "text-slate-400",
  Rejected: "text-rose-600",
};

const documentIcon: Record<DocumentStatus, JSX.Element> = {
  Submitted: <CheckCircle2 className="h-4 w-4" />,
  Pending: <Clock className="h-4 w-4" />,
  "Not Required": <TimerReset className="h-4 w-4" />,
  Rejected: <FileWarning className="h-4 w-4" />,
};

const pageSize = 5;

export default function AdminNgosModulePage() {
  const [query, setQuery] = useState("");
  const [registrationType, setRegistrationType] = useState<RegistrationTypeFilter>("All");
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatusFilter>("All");
  const [region, setRegion] = useState<RegionFilter>("All");
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [selectedNgo, setSelectedNgo] = useState<NgoRecord | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    const searchFiltered = ngoData.filter((ngo) => {
      const matchesQuery = lowerQuery
        ? ngo.name.toLowerCase().includes(lowerQuery) ||
          ngo.registrationId.toLowerCase().includes(lowerQuery) ||
          ngo.contactEmail.toLowerCase().includes(lowerQuery)
        : true;
      const matchesRegistrationType =
        registrationType === "All" ? true : ngo.registrationCategory === registrationType;
      const matchesCompliance =
        complianceStatus === "All" ? true : ngo.complianceStatus === complianceStatus;
      const matchesRegion = region === "All" ? true : ngo.region === region;

      return matchesQuery && matchesRegistrationType && matchesCompliance && matchesRegion;
    });

    const sorted = [...searchFiltered].sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1;
      if (sortKey === "name" || sortKey === "complianceStatus") {
        return a[sortKey].localeCompare(b[sortKey]) * direction;
      }
      return a.updatedAt.localeCompare(b.updatedAt) * direction;
    });

    return sorted;
  }, [query, registrationType, complianceStatus, region, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    registrationType !== "All" ||
    complianceStatus !== "All" ||
    region !== "All";

  const clearFilters = () => {
    setQuery("");
    setRegistrationType("All");
    setComplianceStatus("All");
    setRegion("All");
    setPage(1);
    setMobileFiltersOpen(false);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (key: SortKey) => {
    const base = "h-3.5 w-3.5";
    if (sortKey !== key) {
      return <ArrowUpDown className={`${base} text-slate-400`} />;
    }
    return (
      <ArrowUpDown
        className={cn(base, "text-small text-slate-500 transition-transform", sortDirection === "asc" && "rotate-180")}
      />
    );
  };

  const handleRowClick = (ngo: NgoRecord) => {
    setSelectedNgo(ngo);
  };

  const handleDecision = (action: "approve" | "reject") => {
    if (!selectedNgo) return;
    toast.success(
      `${action === "approve" ? "Approved" : "Rejected"} ${selectedNgo.name} (mock action applied)`,
    );
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <section className="space-y-6">
      <SectionHeader
        title="NGO management"
        subtitle="Review verified partners, track pending registrations, and monitor compliance flags."
        action={
          <Button className="hidden gap-2 md:inline-flex" size="sm">
            <Plus className="h-4 w-4" />
            Add NGO
          </Button>
        }
      />
      <hr className="border-slate-200" />

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex w-full max-w-lg items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:shadow">
              <Search className="h-4 w-4 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search NGOs by name, email, or registration"
                className="border-0 bg-transparent p-0 text-small focus-visible:ring-0"
              />
            </div>
            {hasActiveFilters ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="justify-start text-small text-slate-500"
              >
                Clear filters
              </Button>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 lg:hidden"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <Button className="gap-2 md:hidden" size="sm">
              <Plus className="h-4 w-4" />
              Add NGO
            </Button>
          </div>
        </div>

        <div className="hidden flex-col gap-3 lg:flex">
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={registrationType}
              onValueChange={(value) => {
                setRegistrationType(value as RegistrationTypeFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full max-w-xs rounded-full border-slate-200 bg-white text-small shadow-sm">
                <SelectValue placeholder="Registration type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                {registrationTypeFilters.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={complianceStatus}
              onValueChange={(value) => {
                setComplianceStatus(value as ComplianceStatusFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full max-w-xs rounded-full border-slate-200 bg-white text-small shadow-sm">
                <SelectValue placeholder="Compliance status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                {complianceStatusFilters.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={region}
              onValueChange={(value) => {
                setRegion(value as RegionFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full max-w-xs rounded-full border-slate-200 bg-white text-small shadow-sm">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                {regionFilters.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
            <span>
              Showing {filtered.length} NGOs • Sorted by {sortOptions.find((o) => o.key === sortKey)?.label.toLowerCase()} ({
                sortDirection === "asc" ? "asc" : "desc"
              })
            </span>
          </div>
        </div>

        {mobileFiltersOpen ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:hidden">
            <Select
              value={registrationType}
              onValueChange={(value) => {
                setRegistrationType(value as RegistrationTypeFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="rounded-lg border-slate-200 bg-white text-small shadow-sm">
                <SelectValue placeholder="Registration type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                {registrationTypeFilters.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={complianceStatus}
              onValueChange={(value) => {
                setComplianceStatus(value as ComplianceStatusFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="rounded-lg border-slate-200 bg-white text-small shadow-sm">
                <SelectValue placeholder="Compliance status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                {complianceStatusFilters.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={region}
              onValueChange={(value) => {
                setRegion(value as RegionFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="rounded-lg border-slate-200 bg-white text-small shadow-sm">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                {regionFilters.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Select
                value={sortKey}
                onValueChange={(value) => setSortKey(value as SortKey)}
              >
                <SelectTrigger className="flex-1 rounded-lg border-slate-200 bg-white text-small shadow-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
              >
                {sortDirection === "asc" ? "Asc" : "Desc"}
              </Button>
            </div>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <BadgeCheck className="h-8 w-8 text-slate-400" />
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-slate-800">No NGOs match your filters</h4>
              <p className="text-small text-slate-500">Try adjusting filters or clearing the search keyword.</p>
            </div>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Reset filters
            </Button>
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block" role="region" aria-label="NGO table view">
              <Table>
                <TableHeader className="bg-slate-50/70">
                  <TableRow>
                    <TableHead>
                      <button
                        type="button"
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-1 text-left font-medium text-small text-slate-500"
                      >
                        Name
                        {renderSortIcon("name")}
                      </button>
                    </TableHead>
                    <TableHead scope="col">Registration ID</TableHead>
                    <TableHead scope="col">City / Region</TableHead>
                    <TableHead>
                      <button
                        type="button"
                        onClick={() => handleSort("complianceStatus")}
                        className="flex items-center gap-1 text-left font-medium text-small text-slate-500"
                      >
                        Status
                        {renderSortIcon("complianceStatus")}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        type="button"
                        onClick={() => handleSort("updatedAt")}
                        className="flex items-center gap-1 text-left font-medium text-small text-slate-500"
                      >
                        Last updated
                        {renderSortIcon("updatedAt")}
                      </button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((ngo) => (
                    <TableRow
                      key={ngo.registrationId}
                      onClick={() => handleRowClick(ngo)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleRowClick(ngo);
                        }
                      }}
                      className="cursor-pointer transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${ngo.name}`}
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800">{ngo.name}</span>
                          <span className="text-xs text-slate-500">{ngo.registrationCategory}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-small text-slate-500">{ngo.registrationId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-small text-slate-500">
                          <span>{ngo.city}</span>
                          <span className="text-xs text-slate-400">{ngo.region} region</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("border", getStatusTone(ngo.complianceStatus))}>
                          {ngo.complianceStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-small text-slate-500">{new Date(ngo.updatedAt).toLocaleDateString()}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

        <div className="grid gap-4 lg:hidden" role="list" aria-label="NGO cards">
          {paginated.map((ngo) => (
            <button
              type="button"
              key={ngo.registrationId}
              onClick={() => handleRowClick(ngo)}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              aria-label={`Open details for ${ngo.name}`}
            >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{ngo.name}</h3>
                      <p className="text-xs text-slate-500">{ngo.registrationId}</p>
                    </div>
                    <Badge variant="outline" className={cn("border", getStatusTone(ngo.complianceStatus))}>
                      {ngo.complianceStatus}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>{ngo.city}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{ngo.region} region</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>Updated {new Date(ngo.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <UserRound className="h-4 w-4 text-slate-400" />
                    <span>{ngo.contactPerson}</span>
                  </div>
            </button>
          ))}
        </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
              <div className="text-small text-slate-500">
                Showing <strong>{paginated.length}</strong> of <strong>{filtered.length}</strong> NGOs
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {pageNumbers.map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      type="button"
                      size="sm"
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      className={cn(
                        "h-8 w-8 px-0 text-xs",
                        pageNumber === currentPage ? "bg-slate-900 text-white" : ""
                      )}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  ))}
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <Drawer
        open={Boolean(selectedNgo)}
        onClose={() => setSelectedNgo(null)}
        title={selectedNgo?.name}
        description={selectedNgo ? `${selectedNgo.registrationId} · ${selectedNgo.registrationCategory}` : undefined}
        footer={
          selectedNgo ? (
            <>
              <Button variant="outline" className="gap-2" onClick={() => handleDecision("reject")}>
                Reject
              </Button>
              <Button className="gap-2" onClick={() => handleDecision("approve")}>
                Approve
              </Button>
            </>
          ) : null
        }
      >
        {selectedNgo ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-small text-slate-500">
                <Badge variant="outline" className={cn("border", getStatusTone(selectedNgo.complianceStatus))}>
                  {selectedNgo.complianceStatus}
                </Badge>
                <span>• Updated {new Date(selectedNgo.updatedAt).toLocaleDateString()}</span>
                <span>• Established {selectedNgo.establishedYear}</span>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between text-small text-slate-500">
                  <span>Compliance health</span>
                  <span className="font-semibold text-slate-900">{selectedNgo.complianceProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${selectedNgo.complianceProgress}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-3 text-small text-slate-500">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-slate-400" />
                  <span>{selectedNgo.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{selectedNgo.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>{selectedNgo.contactPhone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                  <span>{selectedNgo.address}</span>
                </div>
              </div>
            </div>

            <Tabs key={selectedNgo.registrationId} defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 text-small text-slate-500">
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-slate-400">Registration type</h4>
                  <p className="mt-1 font-medium text-slate-800">{selectedNgo.registrationType}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-slate-400">Region</h4>
                  <p className="mt-1 font-medium text-slate-800">{selectedNgo.region}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-slate-400">Summary</h4>
                  <p className="mt-1 text-small text-slate-500">
                    This NGO was last updated on {new Date(selectedNgo.updatedAt).toLocaleDateString()} and is currently marked
                    as {selectedNgo.complianceStatus.toLowerCase()}. Use the actions below to transition the compliance state as
                    per your review outcome.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-3 text-small text-slate-500">
                {selectedNgo.documents.map((document) => (
                  <div
                    key={document.name}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-slate-100 p-2 text-slate-500">{documentIcon[document.status]}</div>
                      <span className="font-medium text-slate-800">{document.name}</span>
                    </div>
                    <span className={cn("text-xs font-medium", documentStatusTone[document.status])}>{document.status}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 text-small text-slate-500">
                <div className="relative space-y-4 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-slate-200">
                  {selectedNgo.activity.map((item) => (
                    <div key={item.timestamp} className="relative ml-6 space-y-1">
                      <div className="absolute -left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="text-xs uppercase tracking-wide text-slate-400">{item.timestamp}</div>
                      <div className="font-medium text-slate-800">{item.label}</div>
                      <p className="text-small text-slate-500">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : null}
      </Drawer>
    </section>
  );
}
