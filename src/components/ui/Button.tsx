import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/utils';

export const buttonVariants = cva(
  'text-base font-normal text-main inline-flex items-center justify-center rounded-lg ring-offset-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white active:bg-primary-dark border border-primary-border dark:border-primary-border',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border hover:bg-foreground dark:hover:bg-hover text-main',
        secondary:
          'card bg-card text-secondary-foreground hover:bg-card-hover shadow-inner shadow-gray-400/5 border border-borderLight text-main dark:border-border ring-black/20 ring-1',
        ghost: 'text-main hover:bg-hover',
        link: 'text-primary underline-offset-4 hover:underline',
        'outline-primary':
          'border border-primary-dark bg-primary-transparent dark:border-darkest card dark:bg-primary-transparent hover:bg-hover text-highlight font-medium',
      },
      size: {
        default: 'rounded-lg h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-sm',
        lg: 'h-12 rounded-lg px-8',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button };
