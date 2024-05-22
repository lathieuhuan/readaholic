import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(null, {
  variants: {
    variant: {
      primary: 'bg-primary-bg text-primary-fg hover:bg-primary-bg/90',
      // secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      danger: 'bg-danger-bg text-danger-fg hover:bg-danger-bg/90',
      // outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      // ghost: 'hover:bg-accent hover:text-accent-foreground',
      // link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      // sm: 'h-8 rounded-md px-3',
      md: 'h-9 px-4 py-2',
      // lg: 'h-10 rounded-md px-8',
      icon: 'h-9 w-9',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
