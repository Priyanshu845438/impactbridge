import {
  mapAdminAnalyticsToUi,
  mapCompanyAnalyticsToUi,
  mapNgoAnalyticsToUi,
} from "@/lib/analytics/adapters";
import type {
  AdminAnalyticsPayload,
  CompanyAnalyticsPayload,
  NgoAnalyticsPayload,
} from "@/lib/analytics/contracts";

describe("analytics adapters", () => {
  it("maps admin analytics payload to UI model", () => {
    const payload: AdminAnalyticsPayload = {
      donations: {
        totals: [
          { label: "Total", amount: 120000, trend: [10000, 12000, 15000], delta: 12 },
          { label: "Last 7 days", amount: 45000 },
        ],
        timeline: [
          { date: "2024-01-01", amount: 10000 },
          { date: "2024-02-01", amount: 15000 },
        ],
      },
      programmes: {
        counts: [
          { status: "ACTIVE", count: 6 },
          { status: "COMPLETED", count: 3 },
        ],
      },
      approvals: {
        counts: [
          { status: "APPROVED", count: 4 },
          { status: "PENDING", count: 1 },
        ],
      },
      recentActivity: [
        { id: "1", actor: "Priya", action: "approved NGO onboarding", timestamp: "2025-01-05T10:00:00Z" },
      ],
    };

    const ui = mapAdminAnalyticsToUi(payload);

    expect(ui.donationStats).toHaveLength(2);
    expect(ui.donationStats[0]).toMatchObject({ label: "Total", amount: 120000, delta: 12 });
    expect(ui.programmeStatus).toEqual([
      { label: "ACTIVE", value: 6 },
      { label: "COMPLETED", value: 3 },
    ]);
    expect(ui.approvalStatus).toEqual([
      { label: "APPROVED", value: 4 },
      { label: "PENDING", value: 1 },
    ]);
    expect(ui.activity[0]).toMatchObject({ id: "1", title: "Priya approved NGO onboarding" });
  });

  it("maps company analytics payload", () => {
    const payload: CompanyAnalyticsPayload = {
      summary: [
        { label: "CSR budget", value: 5_000_000, unit: "INR", change: 8 },
        { label: "Utilised", value: 2_500_000, unit: "INR", change: 5 },
      ],
      programmes: [
        { programmeId: "p1", title: "STEM Labs", status: "ACTIVE", budget: 2000000, spend: 1200000 },
      ],
      donations: [
        { month: "Jan", amount: 500000 },
      ],
      impact: [
        { metric: "Beneficiaries", value: 1200, unit: "people" },
      ],
    };

    const ui = mapCompanyAnalyticsToUi(payload);

    expect(ui.metrics[0]).toMatchObject({ label: "CSR budget", value: 5_000_000, unit: "INR", change: 8 });
    expect(ui.programmes[0]).toEqual({ programmeId: "p1", title: "STEM Labs", status: "ACTIVE", budget: 2000000, spend: 1200000 });
    expect(ui.donations).toEqual([{ month: "Jan", amount: 500000 }]);
    expect(ui.impact[0]).toEqual({ metric: "Beneficiaries", value: 1200, unit: "people" });
  });

  it("maps NGO analytics payload", () => {
    const payload: NgoAnalyticsPayload = {
      finance: [
        { label: "Monthly burn", value: 350000, unit: "INR", target: 300000 },
      ],
      campaigns: [
        { campaignId: "c1", title: "Clean Water", raised: 450000, goal: 600000, startDate: "2024-09-01" },
      ],
      donors: [
        { name: "Acme Corp", amount: 250000 },
      ],
      compliance: [
        { title: "FCRA renewal", status: "Due soon" },
      ],
    };

    const ui = mapNgoAnalyticsToUi(payload);

    expect(ui.finance).toEqual([{ label: "Monthly burn", value: 350000, unit: "INR", target: 300000 }]);
    expect(ui.campaigns[0]).toEqual({ campaignId: "c1", title: "Clean Water", raised: 450000, goal: 600000, startDate: "2024-09-01" });
    expect(ui.donors[0]).toEqual({ name: "Acme Corp", amount: 250000 });
    expect(ui.compliance[0]).toEqual({ title: "FCRA renewal", status: "Due soon" });
  });
});

