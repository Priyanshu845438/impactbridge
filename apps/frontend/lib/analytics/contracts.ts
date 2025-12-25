export interface AdminDonationMetric {
  label: string;
  amount: number;
  delta?: number;
  trend?: number[];
}

export interface AdminProgrammeMetric {
  status: string;
  count: number;
}

export interface AdminApprovalMetric {
  status: string;
  count: number;
}

export interface AdminActivityItem {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
}

export interface AdminAnalyticsPayload {
  donations: {
    totals: AdminDonationMetric[];
    timeline: Array<{ date: string; amount: number }>;
  };
  programmes: {
    counts: AdminProgrammeMetric[];
  };
  approvals: {
    counts: AdminApprovalMetric[];
  };
  recentActivity: AdminActivityItem[];
}

export interface CompanyCsrMetric {
  label: string;
  value: number;
  unit?: string;
  change?: number;
}

export interface CompanyProgrammeSummary {
  programmeId: string;
  title: string;
  status: string;
  budget?: number;
  spend?: number;
}

export interface CompanyAnalyticsPayload {
  summary: CompanyCsrMetric[];
  programmes: CompanyProgrammeSummary[];
  donations: Array<{ month: string; amount: number }>;
  impact: Array<{ metric: string; value: number; unit?: string }>;
}

export interface NgoFinanceMetric {
  label: string;
  value: number;
  unit?: string;
  target?: number;
}

export interface NgoCampaignSnapshot {
  campaignId: string;
  title: string;
  raised: number;
  goal: number;
  startDate: string;
}

export interface NgoAnalyticsPayload {
  finance: NgoFinanceMetric[];
  campaigns: NgoCampaignSnapshot[];
  donors: Array<{ name: string; amount: number }>;
  compliance: Array<{ title: string; status: string }>;
}
