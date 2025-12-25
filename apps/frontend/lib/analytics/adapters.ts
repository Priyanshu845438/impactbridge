import type {
  AdminAnalyticsPayload,
  CompanyAnalyticsPayload,
  NgoAnalyticsPayload,
} from './contracts';

type AdminUiModel = {
  donationStats: Array<{ label: string; amount: number; trend?: number[]; delta?: number }>;
  programmeStatus: Array<{ label: string; value: number }>;
  approvalStatus: Array<{ label: string; value: number }>;
  activity: Array<{ id: string; title: string; description: string; timestamp: string }>;
};

type CompanyUiModel = {
  metrics: Array<{ label: string; value: number; unit?: string; change?: number }>;
  programmes: Array<{ programmeId: string; title: string; status: string; budget?: number; spend?: number }>;
  donations: Array<{ month: string; amount: number }>;
  impact: Array<{ metric: string; value: number; unit?: string }>;
};

type NgoUiModel = {
  finance: Array<{ label: string; value: number; unit?: string; target?: number }>;
  campaigns: Array<{ campaignId: string; title: string; raised: number; goal: number; startDate: string }>;
  donors: Array<{ name: string; amount: number }>;
  compliance: Array<{ title: string; status: string }>;
};

export function mapAdminAnalyticsToUi(payload: AdminAnalyticsPayload): AdminUiModel {
  const summary = payload.donations.summary;

  const donationStatBaselines = summary
    ? [
        { label: 'Total donations', amount: summary.totalAmount },
        { label: 'Donations today', amount: summary.today.amount },
        { label: 'Last 7 days', amount: summary.last7Days.amount },
        { label: 'Last 30 days', amount: summary.last30Days.amount },
      ]
    : [];

  const programmeCounts = payload.programmes.summary
    ? Object.entries(payload.programmes.summary.byStatus).map(([status, count]) => ({
        label: status,
        value: count,
      }))
    : payload.programmes.counts.map((item) => ({
        label: item.status,
        value: item.count,
      }));

  const approvalCounts = payload.approvals.summary
    ? Object.entries(payload.approvals.summary.byStatus).map(([status, count]) => ({
        label: status,
        value: count,
      }))
    : payload.approvals.counts.map((item) => ({
        label: item.status,
        value: item.count,
      }));

  return {
    donationStats: donationStatBaselines.length
      ? donationStatBaselines
      : payload.donations.totals.map((metric) => ({
          label: metric.label,
          amount: metric.amount,
          trend: metric.trend,
          delta: metric.delta,
        })),
    programmeStatus: programmeCounts,
    approvalStatus: approvalCounts,
    activity: payload.recentActivity.map((activity) => ({
      id: activity.id,
      title: `${activity.actor} ${activity.action}`,
      description: activity.action,
      timestamp: activity.timestamp,
    })),
  };
}

export function mapCompanyAnalyticsToUi(payload: CompanyAnalyticsPayload): CompanyUiModel {
  return {
    metrics: payload.summary.map((item) => ({
      label: item.label,
      value: item.value,
      unit: item.unit,
      change: item.change,
    })),
    programmes: payload.programmes.map((programme) => ({
      programmeId: programme.programmeId,
      title: programme.title,
      status: programme.status,
      budget: programme.budget,
      spend: programme.spend,
    })),
    donations: payload.donations.map((donation) => ({
      month: donation.month,
      amount: donation.amount,
    })),
    impact: payload.impact.map((item) => ({
      metric: item.metric,
      value: item.value,
      unit: item.unit,
    })),
  };
}

export function mapNgoAnalyticsToUi(payload: NgoAnalyticsPayload): NgoUiModel {
  return {
    finance: payload.finance.map((metric) => ({
      label: metric.label,
      value: metric.value,
      unit: metric.unit,
      target: metric.target,
    })),
    campaigns: payload.campaigns.map((campaign) => ({
      campaignId: campaign.campaignId,
      title: campaign.title,
      raised: campaign.raised,
      goal: campaign.goal,
      startDate: campaign.startDate,
    })),
    donors: payload.donors.map((donor) => ({
      name: donor.name,
      amount: donor.amount,
    })),
    compliance: payload.compliance.map((item) => ({
      title: item.title,
      status: item.status,
    })),
  };
}

export type {
  AdminUiModel,
  CompanyUiModel,
  NgoUiModel,
};
