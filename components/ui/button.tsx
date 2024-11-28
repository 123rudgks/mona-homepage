import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        ghost: 'rounded-full',
        primary:
          'rounded-full bg-primary text-white  hover:bg-primary-dark typo-BodySmallBold focus:ring focus:ring-primary-alpha-30 focus-visible:ring focus-visible:ring-primary-alpha-30 focus-visible:ring-offset-0 disabled:bg-grayscale-200 ',
        outline:
          'rounded-s focus:ring focus:ring-grayscale-focused focus-visible:ring focus-visible:ring-grayscale-focused focus-visible:ring-offset-0 ',
      },
      theme: {
        white: '',
        black: '',
        gray: '',
      },
      size: {
        lg: 'py-2 px-8',
        sm: 'py-[5px] px-[18px]',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        theme: 'black',
        className:
          'border border-blackAlpha-50 hover:bg-blackAlpha-10 typo-BodySmallBold text-grayscale-black',
      },
      {
        variant: 'ghost',
        theme: 'white',
        className:
          'border border-whiteAlpha-70 hover:bg-blackAlpha-10 typo-BodyLargeBold text-grayscale-white',
      },
      {
        variant: 'outline',
        theme: 'gray',
        className:
          'border border-grayscale-300 hover:bg-grayscale-100 typo-BodyLargeBold text-grayscale-500 disabled:bg-grayscale-200',
      },
    ],
    defaultVariants: {},
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, theme, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, theme, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
