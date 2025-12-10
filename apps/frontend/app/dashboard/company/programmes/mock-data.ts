export interface Programme {
  id: string;
  name: string;
  summary: string;
  ngo: {
    name: string;
    avatarUrl?: string;
    email?: string;
    phone?: string;
    website?: string;
    mission?: string;
  };
  sdgs: string[];
  category: string;
  region: string;
  status: "Active" | "Completed" | "Upcoming";
  bannerUrl: string;
  budget: string;
  timeline: string;
  impactSummary: string;
  goals: string[];
  description: string;
  milestones: Array<{
    id: string;
    title: string;
    date: string;
    summary: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    size: string;
  }>;
  updates: Array<{
    id: string;
    title: string;
    description: string;
    timestamp: string;
  }>;
  relatedProgrammeIds: string[];
}

export const programmes: Programme[] = [
  {
    id: "programme-1",
    name: "Rural STEM Labs",
    summary: "Equipping government schools with STEM labs and teacher training support.",
    ngo: {
      name: "Project Udaan",
      email: "contact@projectudaan.org",
      phone: "+91 98765 43210",
      website: "https://projectudaan.org",
      mission: "Expanding STEM opportunities for students in underserved districts.",
    },
    sdgs: ["Quality Education", "Reduced Inequalities"],
    category: "Education",
    region: "Maharashtra",
    status: "Active",
    bannerUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    budget: "₹4.2 Cr",
    timeline: "Apr 2025 – Mar 2027",
    impactSummary: "45 labs launched, 18,000 students reached, 320 teachers certified.",
    goals: [
      "Install fully-equipped STEM labs across 60 rural schools",
      "Train 500 teachers on interactive STEM pedagogy",
      "Host 12 community STEM showcase events",
    ],
    description:
      "Rural STEM Labs brings hands-on science, robotics, and digital literacy to government schools across eastern Maharashtra. The programme pairs infrastructure upgrades with teacher coaching and mentorship to sustain outcomes over the long term.",
    milestones: [
      {
        id: "ms-1",
        title: "Phase 1 lab installations",
        date: "Aug 2025",
        summary: "20 labs installed across Wardha and Chandrapur districts with student orientation sessions completed.",
      },
      {
        id: "ms-2",
        title: "Teacher residency cohort",
        date: "Nov 2025",
        summary: "First batch of 150 teachers completed the 6-week STEM pedagogy residency with classroom practicums.",
      },
      {
        id: "ms-3",
        title: "Community expo",
        date: "Feb 2026",
        summary: "Students showcased innovations to local industry partners, unlocking mentorship pledges and equipment donations.",
      },
    ],
    documents: [
      { id: "doc-1", name: "Programme Charter.pdf", size: "1.8 MB" },
      { id: "doc-2", name: "Quarterly Report Q2.pdf", size: "2.4 MB" },
      { id: "doc-3", name: "Budget Allocation.xlsx", size: "540 KB" },
    ],
    updates: [
      {
        id: "upd-1",
        title: "Teacher cohort graduated",
        description: "150 teachers completed immersive training; classroom implementation begins next month.",
        timestamp: "2025-09-12 09:30",
      },
      {
        id: "upd-2",
        title: "STEM kits delivered",
        description: "140 lab kits delivered across five clusters with inventory synced to central dashboard.",
        timestamp: "2025-10-28 15:45",
      },
      {
        id: "upd-3",
        title: "Mentorship circle launched",
        description: "Volunteers from tech partners launched virtual office hours for school innovators.",
        timestamp: "2025-11-22 11:05",
      },
    ],
    relatedProgrammeIds: ["programme-2", "programme-5"],
  },
  {
    id: "programme-2",
    name: "Mobile Health Clinics",
    summary: "Primary healthcare outreach for remote communities using telemedicine vans.",
    ngo: {
      name: "HealTrust",
      email: "hello@healtrust.in",
      phone: "+91 91234 56789",
      website: "https://healtrust.in",
      mission: "Deliver preventive and primary care to remote populations via mobile units.",
    },
    sdgs: ["Good Health", "Sustainable Cities"],
    category: "Healthcare",
    region: "Uttarakhand",
    status: "Active",
    bannerUrl: "https://images.unsplash.com/photo-1587502537088-029c0e1d51eb?auto=format&fit=crop&w=1200&q=80",
    budget: "₹6.0 Cr",
    timeline: "Jan 2025 – Dec 2026",
    impactSummary: "8 districts covered, 42k screenings completed, 3k tele-consults closed.",
    goals: [
      "Run 12 mobile clinics across underserved valleys",
      "Digitise patient records with telehealth follow-ups",
      "Conduct monthly maternal health camps",
    ],
    description:
      "Mobile Health Clinics brings primary care to mountainous terrain using telemedicine-equipped vans staffed by nurses and remote doctors. The programme bridges last-mile care gaps while building referral linkages with district hospitals.",
    milestones: [
      {
        id: "mhc-1",
        title: "Fleet deployment",
        date: "Jul 2025",
        summary: "Four additional vans deployed with solar-powered diagnostic kits.",
      },
      {
        id: "mhc-2",
        title: "Maternal health camp series",
        date: "Oct 2025",
        summary: "Seven camps hosted with 1,800 women screened for anaemia and hypertension.",
      },
    ],
    documents: [
      { id: "mhc-doc-1", name: "Clinic Deployment Plan.pdf", size: "1.2 MB" },
      { id: "mhc-doc-2", name: "Telehealth SOP.pdf", size: "960 KB" },
    ],
    updates: [
      {
        id: "mhc-upd-1",
        title: "Tele-consult milestone reached",
        description: "Crossed 3,000 remote consultations with 92% satisfaction score.",
        timestamp: "2025-09-05 14:20",
      },
    ],
    relatedProgrammeIds: ["programme-1", "programme-3"],
  },
  {
    id: "programme-3",
    name: "Coastal Mangrove Revival",
    summary: "Community-driven mangrove restoration to protect biodiversity and livelihoods.",
    ngo: {
      name: "BlueRoots Collective",
      email: "team@blueroots.org",
      phone: "+91 99887 77665",
      website: "https://blueroots.org",
      mission: "Restore coastal ecosystems while strengthening community resilience.",
    },
    sdgs: ["Life Below Water", "Climate Action"],
    category: "Environment",
    region: "Tamil Nadu",
    status: "Upcoming",
    bannerUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    budget: "₹2.5 Cr",
    timeline: "Planned Jan 2026 – Dec 2027",
    impactSummary: "Targeting 1,200 hectares of mangrove restoration with 40 women's collectives engaged.",
    goals: [
      "Map degraded mangrove stretches and community zones",
      "Train 500 community members in nursery management",
      "Establish carbon credit readiness framework",
    ],
    description:
      "Coastal Mangrove Revival is a planned partnership to regenerate mangrove belts along the Coromandel Coast, combining ecological restoration with women's livelihood cooperatives and climate adaptation planning.",
    milestones: [
      {
        id: "cmr-1",
        title: "Baseline assessment",
        date: "Mar 2026",
        summary: "Environmental baseline and community mapping to be completed with academic partners.",
      },
    ],
    documents: [{ id: "cmr-doc-1", name: "Concept Note.pdf", size: "640 KB" }],
    updates: [],
    relatedProgrammeIds: ["programme-5"],
  },
  {
    id: "programme-4",
    name: "Women Artisan Cooperatives",
    summary: "Skill development and market linkage for rural artisan clusters.",
    ngo: {
      name: "Anandi Foundation",
      email: "hello@anandi.org",
      phone: "+91 98111 44556",
      website: "https://anandi.org",
      mission: "Enable rural women artisans to build financially resilient cooperatives.",
    },
    sdgs: ["Gender Equality", "Decent Work"],
    category: "Livelihood",
    region: "Gujarat",
    status: "Completed",
    bannerUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    budget: "₹3.1 Cr",
    timeline: "Jul 2023 – Jun 2025",
    impactSummary: "110 cooperatives formalised, average artisan income up 2.3×, export orders onboarded.",
    goals: ["Strengthen cooperative governance", "Launch digital catalogue", "Create revolving credit pool"],
    description:
      "Women Artisan Cooperatives supported women-led collectives with design mentorship, digital catalogues, and blended financing to scale rural enterprises.",
    milestones: [
      {
        id: "wac-1",
        title: "Design showcase",
        date: "Dec 2024",
        summary: "Collective showcase hosted in Ahmedabad with 40 buyer sign-ups.",
      },
      {
        id: "wac-2",
        title: "Export readiness",
        date: "Apr 2025",
        summary: "Five cooperatives completed compliance training to access export markets.",
      },
    ],
    documents: [{ id: "wac-doc-1", name: "Impact Report FY25.pdf", size: "3.2 MB" }],
    updates: [
      {
        id: "wac-upd-1",
        title: "Programme closure",
        description: "Final impact report submitted with sustainability roadmap for cooperatives.",
        timestamp: "2025-07-10 10:10",
      },
    ],
    relatedProgrammeIds: ["programme-1"],
  },
  {
    id: "programme-5",
    name: "Solar Micro-Grids",
    summary: "Renewable energy access for settlement clusters dependent on diesel.",
    ngo: {
      name: "BrightFuture Initiative",
      email: "energy@brightfuture.org",
      phone: "+91 96666 44332",
      website: "https://brightfuture.org",
      mission: "Advance clean energy adoption across rural settlements.",
    },
    sdgs: ["Affordable Energy", "Climate Action"],
    category: "Infrastructure",
    region: "Rajasthan",
    status: "Active",
    bannerUrl: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
    budget: "₹5.4 Cr",
    timeline: "Mar 2024 – Sep 2026",
    impactSummary: "32 micro-grids live, diesel reliance reduced by 68%, 4,500 households benefiting.",
    goals: ["Deploy 50 solar micro-grids", "Establish maintenance collectives", "Introduce productive-use financing"],
    description:
      "Solar Micro-Grids finances and deploys modular solar clusters with smart metering, supporting productive use loans for micro enterprises.",
    milestones: [
      {
        id: "smg-1",
        title: "Productive use pilot",
        date: "Jan 2025",
        summary: "Launched low-interest financing for 120 micro-enterprises to adopt electric equipment.",
      },
    ],
    documents: [
      { id: "smg-doc-1", name: "Implementation Manual.pdf", size: "2.1 MB" },
      { id: "smg-doc-2", name: "Site Feasibility Study.pdf", size: "1.6 MB" },
    ],
    updates: [
      {
        id: "smg-upd-1",
        title: "Grid #30 commissioned",
        description: "Commissioned micro-grid in Barmer district with community celebration and training.",
        timestamp: "2025-08-14 17:00",
      },
    ],
    relatedProgrammeIds: ["programme-1", "programme-3"],
  },
  {
    id: "programme-6",
    name: "Agri Advisory Helpline",
    summary: "Real-time agronomy advisory and market linkage for small holder farmers.",
    ngo: {
      name: "Gramin Connect",
      email: "support@graminconnect.in",
      phone: "+91 93030 11223",
      website: "https://graminconnect.in",
      mission: "Empower farmers with timely agronomy insights and market access.",
    },
    sdgs: ["Zero Hunger", "Climate Action"],
    category: "Agriculture",
    region: "Madhya Pradesh",
    status: "Active",
    bannerUrl: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&q=80",
    budget: "₹2.9 Cr",
    timeline: "Jun 2024 – May 2026",
    impactSummary: "1.2 lakh calls handled, 8 value chains digitised, 11 FPOs onboarded.",
    goals: ["Expand advisory coverage to 20 districts", "Integrate weather-based alerts", "Launch market linkage marketplace"],
    description:
      "Agri Advisory Helpline operates a multilingual call centre with agri-scientist network, delivering season-specific advisories and connecting farmers to buyers.",
    milestones: [
      {
        id: "aah-1",
        title: "FPO onboarding",
        date: "Jun 2025",
        summary: "11 farmer producer organisations onboarded onto advisory + market linkage platform.",
      },
    ],
    documents: [{ id: "aah-doc-1", name: "Helpline Playbook.pdf", size: "1.1 MB" }],
    updates: [
      {
        id: "aah-upd-1",
        title: "Marketplace beta live",
        description: "Beta marketplace launched connecting farmers with institutional buyers for pulses and oilseeds.",
        timestamp: "2025-09-30 12:25",
      },
    ],
    relatedProgrammeIds: ["programme-2"],
  },
];
