import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] active:opacity-90 dark:focus-visible:ring-offset-slate-950',
  {
    variants: {
      variant: {
        default: 'bg-brand text-white hover:bg-brand/90 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400',
        outline: 'border border-slate-200 bg-white hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300',
        ghost: 'hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-emerald-500/10 dark:text-slate-200 dark:hover:text-emerald-300',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';
