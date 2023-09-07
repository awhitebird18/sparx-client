import * as React from 'react';

import { cn } from '@/utils/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-border focus-visible:ring-offset-5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border dark:bg-background dark:ring-offset-border dark:placeholder:text-slate-400 dark:focus-visible:ring-border',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
