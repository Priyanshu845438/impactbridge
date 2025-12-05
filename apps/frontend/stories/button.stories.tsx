import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Primary Button',
  },
};

export default meta;

export const LightMode: StoryObj<typeof Button> = {
  render: (args) => (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Button {...args} />
      <Button {...args} className="hover:translate-y-0 hover:brightness-105">
        Hover Preview
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const DarkMode: StoryObj<typeof Button> = {
  render: (args) => (
    <div className="dark rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-inner">
      <div className="space-y-3">
        <Button {...args} />
        <Button {...args} className="hover:translate-y-0 hover:brightness-125">
          Hover Preview
        </Button>
        <Button {...args} disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};
