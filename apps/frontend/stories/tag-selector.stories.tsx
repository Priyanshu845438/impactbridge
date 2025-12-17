import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TagSelector, type TagOption } from "@/components/ui/tag-selector";

const OPTIONS: TagOption[] = [
  { label: "Education", value: "education" },
  { label: "Health", value: "health" },
  { label: "Environment", value: "environment" },
  { label: "Women Empowerment", value: "women" },
  { label: "Rural Livelihoods", value: "livelihoods" },
];

const meta: Meta<typeof TagSelector> = {
  title: "Components/TagSelector",
  component: TagSelector,
  args: {
    options: OPTIONS,
    value: [OPTIONS[0]?.value ?? ""],
  },
};

export default meta;

type Story = StoryObj<typeof TagSelector>;

const Showcase = (args: { className?: string; value?: string[]; options: TagOption[] }) => {
  const initial = args.value ?? [];
  const [lightValue, setLightValue] = useState<string[]>(initial);
  const [darkValue, setDarkValue] = useState<string[]>(initial);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <TagSelector {...args} value={lightValue} onChange={setLightValue} />
      </div>
      <div className="dark rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-inner">
        <TagSelector {...args} value={darkValue} onChange={setDarkValue} />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Showcase {...args} />,
};

export const MultiSelect: Story = {
  args: {
    value: [OPTIONS[0]?.value ?? "", OPTIONS[1]?.value ?? ""],
  },
  render: (args) => <Showcase {...args} />,
};

export const Disabled: Story = {
  args: {
    className: "pointer-events-none opacity-60",
  },
  render: (args) => <Showcase {...args} />,
};
