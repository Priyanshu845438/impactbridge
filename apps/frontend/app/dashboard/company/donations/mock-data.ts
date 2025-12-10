export type DonationStatus = "Completed" | "Pending";

export interface CompanyDonation {
  id: string;
  date: string;
  programme: string;
  programmeId: string;
  ngo: string;
  amount: number;
  status: DonationStatus;
  sdg: string;
  region: string;
  year: number;
}

export const donations: CompanyDonation[] = [
  {
    id: "don-001",
    date: "2025-11-22",
    programme: "Rural STEM Labs",
    programmeId: "programme-1",
    ngo: "Project Udaan",
    amount: 6500000,
    status: "Completed",
    sdg: "Quality Education",
    region: "Maharashtra",
    year: 2025,
  },
  {
    id: "don-002",
    date: "2025-09-14",
    programme: "Mobile Health Clinics",
    programmeId: "programme-2",
    ngo: "HealTrust",
    amount: 8200000,
    status: "Completed",
    sdg: "Good Health",
    region: "Uttarakhand",
    year: 2025,
  },
  {
    id: "don-003",
    date: "2025-07-02",
    programme: "Solar Micro-Grids",
    programmeId: "programme-5",
    ngo: "BrightFuture Initiative",
    amount: 5100000,
    status: "Pending",
    sdg: "Affordable Energy",
    region: "Rajasthan",
    year: 2025,
  },
  {
    id: "don-004",
    date: "2024-12-11",
    programme: "Women Artisan Cooperatives",
    programmeId: "programme-4",
    ngo: "Anandi Foundation",
    amount: 4300000,
    status: "Completed",
    sdg: "Gender Equality",
    region: "Gujarat",
    year: 2024,
  },
  {
    id: "don-005",
    date: "2024-08-19",
    programme: "Agri Advisory Helpline",
    programmeId: "programme-6",
    ngo: "Gramin Connect",
    amount: 2950000,
    status: "Completed",
    sdg: "Zero Hunger",
    region: "Madhya Pradesh",
    year: 2024,
  },
];

export const donationFilters = {
  years: [2025, 2024, 2023],
  sdgs: ["Quality Education", "Good Health", "Affordable Energy", "Gender Equality", "Zero Hunger"],
  regions: ["Maharashtra", "Uttarakhand", "Rajasthan", "Gujarat", "Madhya Pradesh"],
};
