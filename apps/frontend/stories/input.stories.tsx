import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Enter text…',
  },
};

export default meta;

export const LightMode: StoryObj<typeof Input> = {
  render: (args) => (
    <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-400">Default</label>
        <Input {...args} />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-400">Focus</label>
        <Input {...args} className="ring-2 ring-brand-400" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-400">Disabled</label>
        <Input {...args} disabled value="Disabled value" />
      </div>
    </div>
  ),
};

export const DarkMode: StoryObj<typeof Input> = {
  render: (args) => (
    <div className="dark grid gap-4 rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-inner">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Default</label>
        <Input {...args} />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Focus</label>
        <Input {...args} className="ring-2 ring-emerald-400" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Disabled</label>
        <Input {...args} disabled value="Disabled value" />
      </div>
    </div>
  ),
};
