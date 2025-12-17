"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, RefreshCcw, Search, Star } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type ServiceType = "Audit" | "Training" | "Compliance" | "Field Ops" | "Strategy";

interface Vendor {
  id: string;
  name: string;
  acronym: string;
  description: string;
  rating: number;
  tags: string[];
  serviceType: ServiceType;
  services: string[];
  pastClients: string[];
  certifications: string[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

const VENDORS: Vendor[] = [
  {
    id: "vendor-auditco",
    name: "AuditCo Compliance Partners",
    acronym: "AC",
    description: "End-to-end CSR audit readiness and statutory filings across PAN India.",
    rating: 4.8,
    tags: ["CSR Audit", "FCRA", "Due diligence"],
    serviceType: "Audit",
    services: ["Annual CSR audit", "Financial compliance review", "FCRA documentation"],
    pastClients: ["BrightFuture Initiative", "HealTrust"],
    certifications: ["ICAI Registered", "CSR Consultancy Council"],
    contact: {
      email: "hello@auditcopartners.in",
      phone: "+91 22 5555 9012",
      website: "https://auditcopartners.in",
    },
  },
  {
    id: "vendor-impactlearn",
    name: "ImpactLearn Advisors",
    acronym: "IL",
    description: "Design immersive NGO training modules for field teams and programme managers.",
    rating: 4.4,
    tags: ["Capacity building", "Training"],
    serviceType: "Training",
    services: ["Onboarding workshops", "Outcome mapping", "Blended learning"],
    pastClients: ["Project Udaan", "Anandi Foundation", "Rural Spark"],
    certifications: ["NABET Accredited"],
    contact: {
      email: "contact@impactlearn.org",
      phone: "+91 80 4400 2200",
      website: "https://impactlearn.org",
    },
  },
  {
    id: "vendor-greenfield",
    name: "Greenfield FieldOps Collective",
    acronym: "GF",
    description: "Field implementation support for livelihoods and climate resilience programmes.",
    rating: 4.1,
    tags: ["Implementation", "Livelihoods", "Monitoring"],
    serviceType: "Field Ops",
    services: ["Baseline surveys", "Monitoring & evaluation", "Field staffing"],
    pastClients: ["BrightFuture Initiative", "Swasthya Trust"],
    certifications: ["ISO 9001:2015"],
    contact: {
      email: "clientdesk@greenfieldcollective.in",
      phone: "+91 96 8800 1100",
      website: "https://greenfieldcollective.in",
    },
  },
  {
    id: "vendor-stratwise",
    name: "StratWise Consulting",
    acronym: "SW",
    description: "Strategy sprints for CSR boards — portfolio planning, ESG alignment, impact measurement.",
    rating: 4.6,
    tags: ["Strategy", "Impact design", "ESG"],
    serviceType: "Strategy",
    services: ["Portfolio strategy", "Impact framework", "Board facilitation"],
    pastClients: ["Northstar CSR", "HealTrust", "Blue Planet CSR"],
    certifications: ["Global Reporting Initiative", "SROI Network"],
    contact: {
      email: "csr@stratwise.co",
      phone: "+91 11 4400 3311",
      website: "https://stratwise.co",
    },
  },
  {
    id: "vendor-compliance360",
    name: "Compliance360",
    acronym: "C3",
    description: "Continuous regulatory monitoring, risk scoring, and automated CSR compliance dashboards.",
    rating: 3.9,
    tags: ["Compliance", "Risk", "Automation"],
    serviceType: "Compliance",
    services: ["Compliance dashboard", "Risk scoring", "Document management"],
    pastClients: ["HealTrust", "Anandi Foundation"],
    certifications: ["ISO 27001", "SOC 2"],
    contact: {
      email: "support@compliance360.in",
      phone: "+91 40 7788 4455",
      website: "https://compliance360.in",
    },
  },
];

const SERVICE_FILTERS: Array<{ value: "all" | ServiceType; label: string }> = [
  { value: "all", label: "All services" },
  { value: "Audit", label: "Audit" },
  { value: "Training", label: "Training" },
  { value: "Compliance", label: "Compliance" },
  { value: "Field Ops", label: "Field Ops" },
  { value: "Strategy", label: "Strategy" },
];

const RATING_FILTERS = [
  { value: "all", label: "All ratings" },
  { value: "4", label: "4★+" },
  { value: "3", label: "3★+" },
];

export default function VendorDirectoryPage() {
  const [query, setQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState<"all" | ServiceType>("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isLoading] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "CSR Partner Directory" },
    ],
    [],
  );

  const filteredVendors = useMemo(() => {
    return VENDORS.filter((vendor) => {
      const matchesService = serviceFilter === "all" || vendor.serviceType === serviceFilter;
      const matchesRating = ratingFilter === "all" || vendor.rating >= Number(ratingFilter);
      const search = query.trim().toLowerCase();
      const matchesSearch =
        search.length === 0 ||
        vendor.name.toLowerCase().includes(search) ||
        vendor.tags.some((tag) => tag.toLowerCase().includes(search)) ||
        vendor.serviceType.toLowerCase().includes(search);
      return matchesService && matchesRating && matchesSearch;
    });
  }, [query, ratingFilter, serviceFilter]);

  const emptyState = !isLoading && filteredVendors.length === 0;

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200">
          Vendor ecosystem
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">CSR Partner Directory</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Explore vetted service providers for audits, training and programme support.
          </p>
        </div>
      </header>

      <FiltersRow
        query={query}
        onQueryChange={setQuery}
        serviceFilter={serviceFilter}
        onServiceChange={setServiceFilter}
        ratingFilter={ratingFilter}
        onRatingChange={setRatingFilter}
        onReset={() => {
          setQuery("");
          setServiceFilter("all");
          setRatingFilter("all");
        }}
      />

      {isLoading ? (
        <GridSkeleton />
      ) : emptyState ? (
        <EmptyState
          onReset={() => {
            setQuery("");
            setServiceFilter("all");
            setRatingFilter("all");
          }}
        />
      ) : (
        <VendorGrid vendors={filteredVendors} onSelect={setSelectedVendor} />
      )}

      <Drawer
        open={Boolean(selectedVendor)}
        onClose={() => setSelectedVendor(null)}
        title={selectedVendor?.name}
        description="Vendor profile overview"
      >
        {selectedVendor ? <VendorDrawer vendor={selectedVendor} /> : null}
      </Drawer>
    </div>
  );
}

function FiltersRow({
  query,
  onQueryChange,
  serviceFilter,
  onServiceChange,
  ratingFilter,
  onRatingChange,
  onReset,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  serviceFilter: "all" | ServiceType;
  onServiceChange: (value: "all" | ServiceType) => void;
  ratingFilter: string;
  onRatingChange: (value: string) => void;
  onReset: () => void;
}) {
  return (
    <Card className="grid gap-4 rounded-4xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:grid-cols-4 md:items-end">
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Search</label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900/60">
          <Search className="h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by name or service type"
            className="border-0 bg-transparent p-0 focus-visible:ring-0"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Service type</label>
        <Select value={serviceFilter} onValueChange={(value) => onServiceChange(value as "all" | ServiceType)}>
          <SelectTrigger className="mt-2 rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_FILTERS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Rating</label>
          <Select value={ratingFilter} onValueChange={onRatingChange}>
            <SelectTrigger className="mt-2 rounded-2xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RATING_FILTERS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="w-full gap-2 rounded-2xl" onClick={onReset}>
          <RefreshCcw className="h-4 w-4" />
          Reset filters
        </Button>
      </div>
    </Card>
  );
}

function VendorGrid({ vendors, onSelect }: { vendors: Vendor[]; onSelect: (vendor: Vendor) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="vendor-card-grid">
      {vendors.map((vendor) => (
        <button
          key={vendor.id}
          type="button"
          onClick={() => onSelect(vendor)}
          className="group text-left"
        >
          <Card className="h-full space-y-4 rounded-4xl border border-slate-200 bg-white/95 p-5 text-sm shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:shadow-emerald-900/30">
            <div className="flex items-center gap-3">
              <LogoPlaceholder acronym={vendor.acronym} />
              <div>
                <h3 className="text-base font-semibold text-slate-900 transition group-hover:text-emerald-600 dark:text-slate-100">{vendor.name}</h3>
                <RatingStars rating={vendor.rating} />
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{vendor.description}</p>
            <div className="flex flex-wrap gap-2">
              {vendor.tags.map((tag) => (
                <Badge key={tag} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
              View profile
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
}

function LogoPlaceholder({ acronym }: { acronym: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-transparent text-sm font-semibold text-emerald-700 dark:from-emerald-900/40 dark:text-emerald-200">
      {acronym}
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 10) / 10;
  return (
    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      {rounded}★
    </div>
  );
}

function VendorDrawer({ vendor }: { vendor: Vendor }) {
  return (
    <div className="space-y-6">
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <header className="flex items-center gap-3">
          <LogoPlaceholder acronym={vendor.acronym} />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{vendor.name}</h2>
            <RatingStars rating={vendor.rating} />
          </div>
        </header>
        <p className="text-sm text-slate-600 dark:text-slate-300">{vendor.description}</p>
        <div className="flex flex-wrap gap-2">
          {vendor.tags.map((tag) => (
            <Badge key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Services</h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {vendor.services.map((service) => (
            <li key={service} className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              {service}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Past clients</h3>
        <div className="flex flex-wrap gap-2">
          {vendor.pastClients.map((client) => (
            <Badge key={client} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:border-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200">
              {client}
            </Badge>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Certifications</h3>
        <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
          {vendor.certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Contact</h3>
        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
          <p>Email: {vendor.contact.email}</p>
          <p>Phone: {vendor.contact.phone}</p>
          <p>Website: {vendor.contact.website}</p>
        </div>
      </section>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center dark:border-slate-800 dark:bg-slate-900/40">
      <Search className="h-10 w-10 text-slate-400" />
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">No vendors match your filters</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting the service type or rating to see more partners.</p>
      </div>
      <Button variant="outline" className="rounded-2xl" onClick={onReset}>
        Reset filters
      </Button>
    </Card>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-56 w-full rounded-4xl" />
      ))}
    </div>
  );
}
