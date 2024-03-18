import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/utils';

const badgeVariants = cva(
  'inline-flex justify-center items-center rounded-xl border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2 dark:border-border dark:focus:ring-border',
  {
    variants: {
      variant: {
        default:
          '!border-primary bg-primary text-highlight shadow hover:bg-background/80 dark:bg-primary-transparent dark:text-primary dark:text-primary-light dark:hover:bg-primary-transparent',
        secondary:
          'border-transparent bg-slate-100 text-main hover:bg-slate-100/80 dark:bg-background dark:text-main dark:hover:bg-background/80',
        destructive:
          'border-transparent bg-red-500 text-background shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/80',
        outline: 'text-main dark:bg-black/10 dark:border-primary-darker text-highlight',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
