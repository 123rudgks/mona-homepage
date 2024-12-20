import { LiHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}

const DropdownItemBasic = ({
  className,
  children,
  disabled,
  ...rest
}: Props) => {
  return (
    <li
      className={twMerge(
        `${
          disabled ? 'text-grayscale-90' : 'text-grayscale-120'
        } typo-Body-Small-Regular flex h-8 items-center gap-2 px-3 py-1 hover:bg-grayscale-background-90 z-10`,
        className,
      )}
      {...rest}>
      {children}
    </li>
  );
};

export default DropdownItemBasic;
