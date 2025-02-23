import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'py-[6px] px-[14px] rounded-full flex justify-center items-center typo-BodyLargeBold',
      isActive
        ? 'bg-primary text-white'
        : 'text-grayscale-500 hover:bg-grayscale-50',
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  disabled,
  onClick,
  ...props
}: React.ComponentProps<'a'> & {
  disabled?: boolean;
}) => (
  <a
    className={cn(disabled ? '' : 'cursor-pointer', className)}
    onClick={!disabled ? onClick : undefined}
    {...props}>
    <ChevronLeft
      className={cn(
        'h-8 w-8 ',
        disabled ? 'stroke-grayscale-300' : 'stroke-grayscale-400',
      )}
    />
  </a>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  disabled,
  onClick,
  ...props
}: React.ComponentProps<'a'> & {
  disabled?: boolean;
}) => (
  <a
    className={cn(disabled ? '' : 'cursor-pointer', className)}
    onClick={!disabled ? onClick : undefined}
    {...props}>
    <ChevronRight
      className={cn(
        'h-8 w-8 ',
        disabled ? 'stroke-grayscale-300' : 'stroke-grayscale-400',
      )}
    />
  </a>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
