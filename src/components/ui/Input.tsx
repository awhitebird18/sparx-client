import * as React from 'react';

import { cn } from '@/utils/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-8 w-full rounded-lg border border-border px-3 py-1 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-border focus-visible:ring-border disabled:cursor-not-allowed disabled:opacity-50 dark:border-border bg-transparent dark:bg-transparent dark:placeholder:text-muted dark:focus-visible:outline-border',
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
