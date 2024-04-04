import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/utils';

const badgeVariants = cva(
  'inline-flex justify-center items-center rounded-xl border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2 dark:border-border dark:focus:ring-border',
  {
    variants: {
      variant: {
        default:
          'border-blue-300 dark:border-blue-400/40 bg-blue-100 text-blue-500 shadow hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20',
        success:
          'border-emerald-300 dark:border-emerald-400/40 bg-emerald-100 text-emerald-600 shadow hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20',
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
