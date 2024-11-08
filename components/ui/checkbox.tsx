'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import Check from '@/app/svgs/company-info/contact-us/Check.svg';
import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-6 w-6 shrink-0 rounded border border-grayscale-300 ring-offset-background   ',
      'disabled:cursor-not-allowed disabled:bg-grayscale-50 disabled:border-grayscale-200 disabled:ring-0',
      'data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#97979739] hover:outline-none hover:ring-2 hover:ring-[#97979739]',
      'data-[state=checked]:focus-visible:outline-none data-[state=checked]:focus-visible:ring-2 data-[state=checked]:focus-visible:ring-primary-alpha-30 data-[state=checked]:hover:outline-none data-[state=checked]:hover:ring-2 data-[state=checked]:hover:ring-primary-alpha-30',
      className,
    )}
    {...props}>
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}>
      <Check />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
