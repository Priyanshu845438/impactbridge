import type { Meta, StoryObj } from "@storybook/react";
import { Activity, Gauge, Users } from "lucide-react";

import { ReportsSummaryCard } from "@/components/reports/reports-summary-card";

const meta: Meta<typeof ReportsSummaryCard> = {
  title: "Components/ReportsSummaryCard",
  component: ReportsSummaryCard,
  args: {
    icon: <Gauge className="h-5 w-5" />,
    label: "Projected beneficiaries",
    value: "18,450",
    helper: "Across the upcoming 12 months",
    tone: "emerald",
  },
};

export default meta;

type Story = StoryObj<typeof ReportsSummaryCard>;

export const LightMode: Story = {
  render: (args) => (
    <div className="grid gap-6 sm:grid-cols-3">
      <ReportsSummaryCard {...args} />
      <ReportsSummaryCard
        {...args}
        icon={<Users className="h-5 w-5" />}
        label="Volunteer engagement"
        value="+22% QoQ"
        helper="Based on CSR partner inputs"
        tone="violet"
      />
      <ReportsSummaryCard
        {...args}
        icon={<Activity className="h-5 w-5" />}
        label="Programme efficiency"
        value="78.5%"
        helper="Mock benchmark vs industry"
        tone="sky"
      />
    </div>
  ),
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark grid gap-6 rounded-3xl border border-slate-900 bg-slate-950 p-6 shadow-inner sm:grid-cols-3">
      <ReportsSummaryCard {...args} />
      <ReportsSummaryCard
        {...args}
        icon={<Users className="h-5 w-5" />}
        label="Volunteer engagement"
        value="+22% QoQ"
        helper="Based on CSR partner inputs"
        tone="violet"
      />
      <ReportsSummaryCard
        {...args}
        icon={<Activity className="h-5 w-5" />}
        label="Programme efficiency"
        value="78.5%"
        helper="Mock benchmark vs industry"
        tone="sky"
      />
    </div>
  ),
};

