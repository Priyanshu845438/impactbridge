import type { Meta, StoryObj } from '@storybook/react';
import { QuickActionCard } from '@/components/dashboard/quick-action-card';
import { ShieldCheck } from 'lucide-react';

const meta: Meta<typeof QuickActionCard> = {
  title: 'Components/QuickActionCard',
  component: QuickActionCard,
  args: {
    title: 'Verify NGO submissions',
    description: 'Review new filings and approve compliant partners.',
    href: '#',
    ctaLabel: 'Review',
    icon: ShieldCheck,
  },
};

export default meta;

export const LightMode: StoryObj<typeof QuickActionCard> = {
  render: (args) => (
    <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
      <QuickActionCard {...args} />
      <QuickActionCard
        {...args}
        title="Hover preview"
        className="ring-2 ring-brand-100 hover:ring-emerald-200"
      />
      <QuickActionCard
        {...args}
        title="Disabled CTA"
        ctaLabel="Coming soon"
        className="pointer-events-none opacity-60"
      />
    </div>
  ),
};

export const DarkMode: StoryObj<typeof QuickActionCard> = {
  render: (args) => (
    <div className="dark grid gap-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-inner sm:grid-cols-2">
      <QuickActionCard {...args} />
      <QuickActionCard
        {...args}
        title="Hover preview"
        className="ring-2 ring-emerald-300/40 hover:ring-emerald-400/70"
      />
      <QuickActionCard
        {...args}
        title="Disabled CTA"
        ctaLabel="Coming soon"
        className="pointer-events-none opacity-60"
      />
    </div>
  ),
};
