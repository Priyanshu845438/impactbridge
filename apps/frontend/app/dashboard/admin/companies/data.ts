export type CompanyStatus = "Active" | "Pending" | "Blocked";
export type IndustryType =
  | "Information Technology"
  | "Manufacturing"
  | "Financial Services"
  | "Healthcare"
  | "Energy"
  | "Retail";

export type NgoRelationshipStatus = "Active" | "Pending Approval" | "Past Partner";

export interface LinkedNgo {
  name: string;
  status: NgoRelationshipStatus;
  focusArea: string;
  lastInteraction: string;
}

export interface CompanyTimelineEntry {
  title: string;
  description: string;
  timestamp: string;
}

export type ProgrammeStatus = "Draft" | "Active" | "Completed" | "Suspended";

export interface ProgrammeMilestone {
  label: string;
  completed: boolean;
}

export interface CompanyProgramme {
  id: string;
  title: string;
  status: ProgrammeStatus;
  budget: string;
  utilisation: string;
  progress: number;
  timeline: { start: string; end: string };
  category: "Education" | "Health" | "Environment" | "Livelihood" | "Community";
  complianceNote: string;
  milestones: ProgrammeMilestone[];
  documents: Array<{ name: string; uploadedAt: string }>;
  ngos: Array<{ name: string; status: NgoRelationshipStatus; focusArea: string }>;
  comments: Array<{ author: string; timestamp: string; message: string }>;
}

export interface CompanyRecord {
  id: string;
  name: string;
  cin: string;
  industry: IndustryType;
  csrBudget: string;
  csrAllocated: string;
  csrRemaining: string;
  status: CompanyStatus;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  ngos: LinkedNgo[];
  timeline: CompanyTimelineEntry[];
  programmes: CompanyProgramme[];
}

export const COMPANY_STATUS: CompanyStatus[] = ["Active", "Pending", "Blocked"];

export const INDUSTRY_TYPES: IndustryType[] = [
  "Information Technology",
  "Manufacturing",
  "Financial Services",
  "Healthcare",
  "Energy",
  "Retail",
];

export const STATUS_TONE: Record<CompanyStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Blocked: "bg-rose-50 text-rose-700 border-rose-200",
};

export const NGO_STATUS_TONE: Record<NgoRelationshipStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Pending Approval": "bg-amber-50 text-amber-700 border-amber-200",
  "Past Partner": "bg-slate-100 text-slate-600 border-slate-200",
};

export const PROGRAMME_STATUS_TONE: Record<ProgrammeStatus, string> = {
  Draft: "bg-slate-100 text-slate-600 border-slate-200",
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Completed: "bg-sky-50 text-sky-700 border-sky-200",
  Suspended: "bg-rose-50 text-rose-700 border-rose-200",
};

export const COMPANY_RECORDS: CompanyRecord[] = [
  {
    id: "asteria-technologies",
    name: "Asteria Technologies Pvt Ltd",
    cin: "L12345KA2015PLC081234",
    industry: "Information Technology",
    csrBudget: "₹1.5 Cr",
    csrAllocated: "₹1.05 Cr",
    csrRemaining: "₹45 Lakh",
    status: "Active",
    contactPerson: "Rahul Mehta",
    email: "csr@asteria.tech",
    phone: "+91 98877 11223",
    address: "91 Springboard, Koramangala, Bengaluru, Karnataka - 560047",
    ngos: [
      {
        name: "Swasthya Seva Foundation",
        status: "Active",
        focusArea: "Primary healthcare",
        lastInteraction: "12 Feb 2025",
      },
      {
        name: "Future Minds Trust",
        status: "Pending Approval",
        focusArea: "Digital literacy",
        lastInteraction: "2 Feb 2025",
      },
    ],
    timeline: [
      {
        title: "Q4 CSR allocation approved",
        description: "Board sanctioned 35% of annual CSR budget for healthcare initiatives.",
        timestamp: "11 Feb 2025",
      },
      {
        title: "New NGO partnership shortlisted",
        description: "Future Minds Trust moved to due diligence for FY25 programs.",
        timestamp: "28 Jan 2025",
      },
      {
        title: "Annual CSR report submitted",
        description: "FY24 utilisation report uploaded to MCA and ImpactBridge portal.",
        timestamp: "15 Jan 2025",
      },
    ],
    programmes: [
      {
        id: "med-atlas",
        title: "MedAtlas Rural Clinics",
        status: "Active",
        budget: "₹60 Lakh",
        utilisation: "₹42 Lakh utilised",
        progress: 68,
        timeline: { start: "05 Apr 2024", end: "30 Mar 2025" },
        category: "Health",
        complianceNote: "Ensures spending meets Schedule VII (Healthcare) requirements with quarterly medical audits",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: false },
        ],
        documents: [
          { name: "Project charter.pdf", uploadedAt: "10 Jan 2024" },
          { name: "Quarterly report Q1.pdf", uploadedAt: "12 Jul 2024" },
        ],
        ngos: [
          { name: "Swasthya Seva Foundation", status: "Active", focusArea: "Primary healthcare" },
        ],
        comments: [
          {
            author: "Rahul Mehta",
            timestamp: "11 Feb 2025",
            message: "Awaiting updated patient footfall metrics before next disbursement.",
          },
        ],
      },
      {
        id: "digitallabs",
        title: "Digital Labs for Government Schools",
        status: "Draft",
        budget: "₹35 Lakh",
        utilisation: "Not yet allocated",
        progress: 12,
        timeline: { start: "01 Mar 2025", end: "30 Nov 2025" },
        category: "Education",
        complianceNote: "Draft yet to be vetted by compliance team; ensure digital inclusion KPIs are aligned",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: false },
          { label: "Approved", completed: false },
          { label: "Running", completed: false },
        ],
        documents: [],
        ngos: [],
        comments: [],
      },
      {
        id: "women-health",
        title: "Women Health Awareness Drives",
        status: "Completed",
        budget: "₹45 Lakh",
        utilisation: "₹45 Lakh utilised",
        progress: 100,
        timeline: { start: "15 Feb 2023", end: "20 Dec 2023" },
        category: "Health",
        complianceNote: "Compliance closure completed and reported to CSR committee.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: true },
        ],
        documents: [
          { name: "Final impact summary.pdf", uploadedAt: "22 Dec 2023" },
        ],
        ngos: [
          { name: "Swasthya Seva Foundation", status: "Past Partner", focusArea: "Community clinics" },
        ],
        comments: [
          {
            author: "Impact Review Team",
            timestamp: "05 Jan 2024",
            message: "Programme achieved 125% of outreach target across 12 districts.",
          },
        ],
      },
    ],
  },
  {
    id: "greengrid-energy",
    name: "GreenGrid Energy Solutions",
    cin: "U45400MH2012PTC063210",
    industry: "Energy",
    csrBudget: "₹2.1 Cr",
    csrAllocated: "₹1.2 Cr",
    csrRemaining: "₹90 Lakh",
    status: "Pending",
    contactPerson: "Sneha Kulkarni",
    email: "impact@greengrid.in",
    phone: "+91 97654 00321",
    address: "1401, Oberoi Commerz, Goregaon East, Mumbai - 400063",
    ngos: [
      {
        name: "Green Earth Alliance",
        status: "Active",
        focusArea: "Environmental conservation",
        lastInteraction: "6 Feb 2025",
      },
      {
        name: "Jeevan Jyoti Society",
        status: "Past Partner",
        focusArea: "Water sanitation",
        lastInteraction: "18 Nov 2024",
      },
    ],
    timeline: [
      {
        title: "Awaiting quarterly compliance",
        description: "Company scheduled to submit CSR utilisation proof for Q3 spend.",
        timestamp: "8 Feb 2025",
      },
      {
        title: "Renewable energy pilot review",
        description: "Impact assessment uploaded for solar microgrid program.",
        timestamp: "25 Jan 2025",
      },
    ],
    programmes: [
      {
        id: "solar-microgrids",
        title: "Solar Microgrids for Rural Communities",
        status: "Active",
        budget: "₹80 Lakh",
        utilisation: "₹48 Lakh utilised",
        progress: 60,
        timeline: { start: "01 Jun 2024", end: "31 May 2025" },
        category: "Environment",
        complianceNote: "Aligned with renewable energy focus area; quarterly energy output reports required.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: false },
        ],
        documents: [
          { name: "Site assessment.pdf", uploadedAt: "15 Jun 2024" },
          { name: "Quarterly energy output.xlsx", uploadedAt: "05 Oct 2024" },
        ],
        ngos: [
          { name: "Green Earth Alliance", status: "Active", focusArea: "Environmental conservation" },
        ],
        comments: [
          {
            author: "Sneha Kulkarni",
            timestamp: "08 Feb 2025",
            message: "Need updated capex breakdown before additional disbursement.",
          },
        ],
      },
      {
        id: "rainwater-harvesting",
        title: "Rainwater Harvesting Across Schools",
        status: "Suspended",
        budget: "₹25 Lakh",
        utilisation: "₹10 Lakh utilised",
        progress: 40,
        timeline: { start: "15 Jul 2024", end: "15 Feb 2025" },
        category: "Environment",
        complianceNote: "Paused pending compliance clearance for vendor contracts.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: false },
          { label: "Running", completed: false },
        ],
        documents: [
          { name: "Vendor due diligence.xlsx", uploadedAt: "20 Sep 2024" },
        ],
        ngos: [
          { name: "Jeevan Jyoti Society", status: "Past Partner", focusArea: "Water sanitation" },
        ],
        comments: [],
      },
    ],
  },
  {
    id: "unity-manufacturing",
    name: "Unity Manufacturing Corporation",
    cin: "L26999DL2008PLC305698",
    industry: "Manufacturing",
    csrBudget: "₹3.8 Cr",
    csrAllocated: "₹2.6 Cr",
    csrRemaining: "₹1.2 Cr",
    status: "Active",
    contactPerson: "Vikas Sharma",
    email: "csr@unitymfg.com",
    phone: "+91 98123 45678",
    address: "Plot 18, DLF Industrial Area, Faridabad, Haryana - 121003",
    ngos: [
      {
        name: "Prerna Women Collective",
        status: "Active",
        focusArea: "Women employability",
        lastInteraction: "4 Feb 2025",
      },
      {
        name: "Swasthya Seva Foundation",
        status: "Past Partner",
        focusArea: "Community clinics",
        lastInteraction: "20 Dec 2024",
      },
    ],
    timeline: [
      {
        title: "Manufacturing upskilling cohort launched",
        description: "Partnered with Prerna Women Collective for FY25 skilling program.",
        timestamp: "5 Feb 2025",
      },
      {
        title: "CSR policy refreshed",
        description: "Board approved updated CSR policy aligning with MoCA guidelines.",
        timestamp: "18 Jan 2025",
      },
    ],
    programmes: [
      {
        id: "skill-rise",
        title: "SkillRise Manufacturing Apprenticeships",
        status: "Active",
        budget: "₹1.1 Cr",
        utilisation: "₹76 Lakh utilised",
        progress: 72,
        timeline: { start: "10 Apr 2024", end: "31 Mar 2025" },
        category: "Livelihood",
        complianceNote: "Monthly apprentice intake and stipend reporting mandated for CSR disclosures.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: false },
        ],
        documents: [
          { name: "Apprentice intake list.pdf", uploadedAt: "05 Oct 2024" },
        ],
        ngos: [
          { name: "Prerna Women Collective", status: "Active", focusArea: "Women employability" },
        ],
        comments: [],
      },
      {
        id: "safety-first",
        title: "Safety First Infrastructure Upgrade",
        status: "Completed",
        budget: "₹60 Lakh",
        utilisation: "₹60 Lakh utilised",
        progress: 100,
        timeline: { start: "01 Jan 2023", end: "15 Sep 2023" },
        category: "Community",
        complianceNote: "Safety audits verified and lodged with CSR committee archives.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: true },
        ],
        documents: [
          { name: "Safety audit summary.pdf", uploadedAt: "20 Sep 2023" },
        ],
        ngos: [
          { name: "Swasthya Seva Foundation", status: "Past Partner", focusArea: "Community clinics" },
        ],
        comments: [
          {
            author: "Vikas Sharma",
            timestamp: "18 Sep 2023",
            message: "All compliance checks cleared; programme formally closed.",
          },
        ],
      },
    ],
  },
  {
    id: "blueriver-retail",
    name: "BlueRiver Retail Holdings",
    cin: "U52100TN2010PTC112233",
    industry: "Retail",
    csrBudget: "₹90 Lakh",
    csrAllocated: "₹35 Lakh",
    csrRemaining: "₹55 Lakh",
    status: "Blocked",
    contactPerson: "Priya Nair",
    email: "partners@blueriver.in",
    phone: "+91 98450 77654",
    address: "15 Haddows Road, Nungambakkam, Chennai, Tamil Nadu - 600006",
    ngos: [
      {
        name: "Future Minds Trust",
        status: "Pending Approval",
        focusArea: "Digital classrooms",
        lastInteraction: "1 Feb 2025",
      },
    ],
    timeline: [
      {
        title: "Compliance review flagged",
        description: "Awaiting clarification on unspent CSR funds for FY24.",
        timestamp: "30 Jan 2025",
      },
      {
        title: "Partner diligence in progress",
        description: "Risk review initiated for Future Minds Trust collaboration.",
        timestamp: "12 Jan 2025",
      },
    ],
    programmes: [
      {
        id: "retail-sustain",
        title: "Sustainable Retail Outreach",
        status: "Draft",
        budget: "₹18 Lakh",
        utilisation: "Planning phase",
        progress: 8,
        timeline: { start: "01 Apr 2025", end: "31 Dec 2025" },
        category: "Environment",
        complianceNote: "Awaiting ESG committee approval; ensure plastic-neutral offsets documented.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: false },
          { label: "Approved", completed: false },
          { label: "Running", completed: false },
        ],
        documents: [],
        ngos: [],
        comments: [],
      },
    ],
  },
  {
    id: "horizon-wellness",
    name: "Horizon Wellness Group",
    cin: "L85110WB2016PLC095432",
    industry: "Healthcare",
    csrBudget: "₹1.2 Cr",
    csrAllocated: "₹80 Lakh",
    csrRemaining: "₹40 Lakh",
    status: "Pending",
    contactPerson: "Ankit Bose",
    email: "csr@horizonwellness.com",
    phone: "+91 98312 20987",
    address: "Salt Lake Sector V, Kolkata, West Bengal - 700091",
    ngos: [
      {
        name: "Swasthya Seva Foundation",
        status: "Active",
        focusArea: "Mobile health camps",
        lastInteraction: "9 Feb 2025",
      },
      {
        name: "Jeevan Jyoti Society",
        status: "Past Partner",
        focusArea: "Maternal health",
        lastInteraction: "2 Nov 2024",
      },
    ],
    timeline: [
      {
        title: "Telemedicine pilot launched",
        description: "First batch of remote clinics operational in rural Bengal.",
        timestamp: "7 Feb 2025",
      },
      {
        title: "Quarterly CSR review",
        description: "Compliance team requested impact dashboards for ongoing programmes.",
        timestamp: "24 Jan 2025",
      },
    ],
    programmes: [
      {
        id: "telehealth",
        title: "Telehealth for Remote Villages",
        status: "Active",
        budget: "₹55 Lakh",
        utilisation: "₹28 Lakh utilised",
        progress: 50,
        timeline: { start: "12 May 2024", end: "12 May 2025" },
        category: "Health",
        complianceNote: "Telemedicine licences under review; ensure patient consent logs stored securely.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: false },
        ],
        documents: [
          { name: "Clinic deployment schedule.xlsx", uploadedAt: "18 Jul 2024" },
        ],
        ngos: [
          { name: "Swasthya Seva Foundation", status: "Active", focusArea: "Mobile health camps" },
        ],
        comments: [],
      },
      {
        id: "nutrition-drive",
        title: "Nutrition Drives for Expectant Mothers",
        status: "Completed",
        budget: "₹25 Lakh",
        utilisation: "₹25 Lakh utilised",
        progress: 100,
        timeline: { start: "01 Aug 2023", end: "30 Apr 2024" },
        category: "Health",
        complianceNote: "Closed with joint audit between Horizon Wellness and partner NGO.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: true },
        ],
        documents: [
          { name: "Impact dashboard.xlsx", uploadedAt: "05 May 2024" },
        ],
        ngos: [
          { name: "Jeevan Jyoti Society", status: "Past Partner", focusArea: "Maternal health" },
        ],
        comments: [],
      },
    ],
  },
  {
    id: "northstar-financial",
    name: "NorthStar Financial Services",
    cin: "L67190GJ2009PLC098765",
    industry: "Financial Services",
    csrBudget: "₹2.7 Cr",
    csrAllocated: "₹1.9 Cr",
    csrRemaining: "₹80 Lakh",
    status: "Active",
    contactPerson: "Srishti Patel",
    email: "csr@northstarfin.in",
    phone: "+91 97234 55678",
    address: "Shyamal Cross Road, Ahmedabad, Gujarat - 380015",
    ngos: [
      {
        name: "Prerna Women Collective",
        status: "Active",
        focusArea: "Financial literacy",
        lastInteraction: "10 Feb 2025",
      },
    ],
    timeline: [
      {
        title: "Impact dashboard shared",
        description: "Uploaded FY24 loan repayment impact analysis for women SHGs.",
        timestamp: "9 Feb 2025",
      },
      {
        title: "Next cohort planning",
        description: "Discussed expansion to Gujarat tribal belts with Prerna Women Collective.",
        timestamp: "19 Jan 2025",
      },
    ],
    programmes: [
      {
        id: "financial-literacy",
        title: "Financial Literacy for Women SHGs",
        status: "Active",
        budget: "₹95 Lakh",
        utilisation: "₹62 Lakh utilised",
        progress: 65,
        timeline: { start: "20 Mar 2024", end: "28 Feb 2025" },
        category: "Education",
        complianceNote: "Ensure audited statement of community bank linkages each quarter.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: false },
        ],
        documents: [
          { name: "Curriculum outline.pdf", uploadedAt: "12 Apr 2024" },
        ],
        ngos: [
          { name: "Prerna Women Collective", status: "Active", focusArea: "Financial literacy" },
        ],
        comments: [
          {
            author: "Srishti Patel",
            timestamp: "10 Feb 2025",
            message: "Need updated enrolment data before final tranche.",
          },
        ],
      },
      {
        id: "scholarship-fund",
        title: "Scholarship Fund for Rural Students",
        status: "Completed",
        budget: "₹40 Lakh",
        utilisation: "₹40 Lakh utilised",
        progress: 100,
        timeline: { start: "10 Jan 2023", end: "30 Oct 2023" },
        category: "Education",
        complianceNote: "Scholar selection verified by third-party audit; documentation archived.",
        milestones: [
          { label: "Submitted", completed: true },
          { label: "Reviewing", completed: true },
          { label: "Approved", completed: true },
          { label: "Running", completed: true },
        ],
        documents: [
          { name: "Scholarship disbursement report.pdf", uploadedAt: "05 Nov 2023" },
        ],
        ngos: [
          { name: "Prerna Women Collective", status: "Past Partner", focusArea: "Women employability" },
        ],
        comments: [],
      },
    ],
  },
];

export function findCompanyById(id: string) {
  return COMPANY_RECORDS.find((company) => company.id === id || company.cin === id);
}

export function getCompanyProgrammes(id: string) {
  const company = findCompanyById(id);
  return company?.programmes ?? [];
}

export function findCompanyProgramme(companyId: string, programmeId: string) {
  const company = findCompanyById(companyId);
  return company?.programmes.find((programme) => programme.id === programmeId);
}
