import { cva } from 'class-variance-authority';

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
          'card bg-card text-secondary-foreground hover:bg-hover shadow-sm border border-border text-main dark:border-border ring-black/20',
        ghost: 'text-main hover:bg-hover',
        link: 'text-primary underline-offset-4 hover:underline',
        'outline-primary':
          'border border-primary-lighter bg-primary-transparent dark:border-primary-dark card dark:bg-primary-transparent text-highlight font-medium',
      },
      size: {
        default: 'rounded-md h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-sm',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
