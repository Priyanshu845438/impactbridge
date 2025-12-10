export interface Programme {
  id: string;
  name: string;
  summary: string;
  ngo: {
    name: string;
    avatarUrl?: string;
  };
  sdgs: string[];
  category: string;
  region: string;
  status: "Active" | "Completed" | "Upcoming";
  bannerUrl: string;
}

export const programmes: Programme[] = [
  {
    id: "programme-1",
    name: "Rural STEM Labs",
    summary: "Equipping government schools with STEM labs and teacher training support.",
    ngo: { name: "Project Udaan" },
    sdgs: ["Quality Education", "Reduced Inequalities"],
    category: "Education",
    region: "Maharashtra",
    status: "Active",
    bannerUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "programme-2",
    name: "Mobile Health Clinics",
    summary: "Primary healthcare outreach for remote communities using telemedicine vans.",
    ngo: { name: "HealTrust" },
    sdgs: ["Good Health", "Sustainable Cities"],
    category: "Healthcare",
    region: "Uttarakhand",
    status: "Active",
    bannerUrl: "https://images.unsplash.com/photo-1587502537088-029c0e1d51eb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "programme-3",
    name: "Coastal Mangrove Revival",
    summary: "Community-driven mangrove restoration to protect biodiversity and livelihoods.",
    ngo: { name: "BlueRoots Collective" },
    sdgs: ["Life Below Water", "Climate Action"],
    category: "Environment",
    region: "Tamil Nadu",
    status: "Upcoming",
    bannerUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "programme-4",
    name: "Women Artisan Cooperatives",
    summary: "Skill development and market linkage for rural artisan clusters.",
    ngo: { name: "Anandi Foundation" },
    sdgs: ["Gender Equality", "Decent Work"],
    category: "Livelihood",
    region: "Gujarat",
    status: "Completed",
    bannerUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "programme-5",
    name: "Solar Micro-Grids",
    summary: "Renewable energy access for settlement clusters dependent on diesel.",
    ngo: { name: "BrightFuture Initiative" },
    sdgs: ["Affordable Energy", "Climate Action"],
    category: "Infrastructure",
    region: "Rajasthan",
    status: "Active",
    bannerUrl: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "programme-6",
    name: "Agri Advisory Helpline",
    summary: "Real-time agronomy advisory and market linkage for small holder farmers.",
    ngo: { name: "Gramin Connect" },
    sdgs: ["Zero Hunger", "Climate Action"],
    category: "Agriculture",
    region: "Madhya Pradesh",
    status: "Active",
    bannerUrl: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&q=80",
  },
];
