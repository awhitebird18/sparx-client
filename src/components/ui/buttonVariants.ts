import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'whitespace-nowrap text-base font-normal text-main inline-flex items-center justify-center rounded-lg ring-offset-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white active:bg-primary-dark border border-primary-border dark:border-primary-border',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border hover:bg-foreground dark:hover:bg-hover text-main',
        secondary:
          'bg-secondary text-secondary hover:bg-secondary-hover shadow-sm border border-border dark:border-border ring-black/20',
        ghost: 'text-secondary hover:bg-hover',
        link: 'text-primary underline-offset-4 hover:underline',
        'outline-primary':
          'border border-primary-lighter bg-primary-transparent dark:border-primary-dark dark:bg-primary-transparent text-highlight font-medium',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-11 px-5',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
