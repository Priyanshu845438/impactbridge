import type { Meta, StoryObj } from "@storybook/react";

import { StatusBadge, type StoryPublishingStatus } from "@/components/ui/status-badge";

const STATUSES: StoryPublishingStatus[] = ["Draft", "Submitted", "Published"];

const fallbackClasses =
  "inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300";

const DemoStatusBadge = ({ status }: { status: string }) => {
  if ((STATUSES as readonly string[]).includes(status)) {
    return <StatusBadge status={status as StoryPublishingStatus} />;
  }

  return (
    <span className={fallbackClasses}>
      <span className="h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" />
      {status}
    </span>
  );
};

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  args: {
    status: "Draft",
  },
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

const Showcase = () => (
  <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
    <div className="flex flex-wrap items-center gap-3">
      {STATUSES.map((status) => (
        <DemoStatusBadge key={status} status={status} />
      ))}
      <DemoStatusBadge status="Unknown" />
    </div>
  </div>
);

export const LightMode: Story = {
  render: () => <Showcase />,
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <Showcase />
    </div>
  ),
};
