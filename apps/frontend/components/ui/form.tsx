import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Controller, ControllerProps, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

export const Form = ({ children, ...props }: React.ComponentProps<'form'>) => <form {...props}>{children}</form>;

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  render,
}: ControllerProps<TFieldValues, TName>) {
  const methods = useFormContext<TFieldValues>();
  return <Controller control={methods.control} name={name} render={render} />;
}

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
));
FormItem.displayName = 'FormItem';

export const FormLabel = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(({ className, ...props }, ref) => (
  <Slot ref={ref} className={cn('text-sm font-medium leading-none', className)} {...props} />
));
FormLabel.displayName = 'FormLabel';

export const FormMessage = ({ children }: { children?: React.ReactNode }) => {
  return children ? <p className="text-sm text-red-600">{children}</p> : null;
};
