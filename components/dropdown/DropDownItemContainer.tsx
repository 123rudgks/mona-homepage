import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  description?: string;
}

const dropDownBoxClass =
  'p- absolute -bottom-1 z-10 flex w-full translate-y-full flex-col bg-white-off py-1 shadow-[6px_8px_22px_0px_#6C6D7040] overflow-auto';
const dropDownBoxDescClass =
  'typo-Body-Caption-Regular flex h-[82px] w-full items-center justify-center text-grayscale-90';

const DropDownItemContainer = forwardRef<HTMLUListElement, Props>(
  ({ description, children, ...rest }, ref) => {
    return (
      <ul
        ref={ref}
        {...rest}
        className={twMerge(dropDownBoxClass, rest?.className)}>
        {description ? (
          <div className={twMerge(dropDownBoxDescClass)}>{description}</div>
        ) : (
          children
        )}
      </ul>
    );
  },
);

DropDownItemContainer.displayName = 'DropDownItemContainer';
export default DropDownItemContainer;
