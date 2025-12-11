export type ComplianceStatus = "Compliant" | "Pending" | "Action needed";

export interface ComplianceRow {
  id: string;
  ngo: string;
  ngoId: string;
  status: ComplianceStatus;
  lastReviewed: string;
  missingItems: string[];
  deadlines: Array<{ label: string; date: string }>;
  notes: string;
}

export const complianceRows: ComplianceRow[] = [
  {
    id: "comp-1",
    ngo: "Project Udaan",
    ngoId: "ngo-udaan",
    status: "Compliant",
    lastReviewed: "2025-09-25",
    missingItems: [],
    deadlines: [
      { label: "80G Renewal", date: "2026-01-15" },
      { label: "CSR-1 Update", date: "2026-03-31" },
    ],
    notes: "All documents verified; quarterly review completed. Monitor renewal timeline.",
  },
  {
    id: "comp-2",
    ngo: "HealTrust",
    ngoId: "ngo-healtrust",
    status: "Pending",
    lastReviewed: "2025-10-12",
    missingItems: ["Latest Audit Report"],
    deadlines: [{ label: "Audit report submission", date: "2025-12-05" }],
    notes: "Awaiting audited financials for FY25. Reminder sent to programme lead.",
  },
  {
    id: "comp-3",
    ngo: "BrightFuture Initiative",
    ngoId: "ngo-brightfuture",
    status: "Action needed",
    lastReviewed: "2025-08-18",
    missingItems: ["80G Certificate", "CSR Compliance Statement"],
    deadlines: [{ label: "80G re-submission", date: "2025-11-20" }],
    notes: "80G expired. Immediate follow-up required. Escalated to compliance manager.",
  },
  {
    id: "comp-4",
    ngo: "Anandi Foundation",
    ngoId: "ngo-anandi",
    status: "Pending",
    lastReviewed: "2025-09-30",
    missingItems: ["CSR-1 Update"],
    deadlines: [{ label: "CSR-1 update", date: "2025-12-31" }],
    notes: "CSR-1 update in progress. Provide final confirmation next sync.",
  },
];
