import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonBaseClasses =
  'px-3 py-1 disabled:bg-grayscale-80 disabled:ring-0  rounded flex justify-center items-center gap-2';
const buttonTypeClass = {
  primaryFill:
    'text-white-off bg-primary-100 hover:bg-primary-110 disabled:text-white-off',
  primaryOutline:
    'text-primary-100 ring-1 ring-primary-100 bg-white-off hover:bg-primary-80  disabled:text-white-off',
  grayscaleFill: 'bg-grayscale-120 hover:bg-grayscale-130 text-white-off',
  whiteFill:
    'bg-white-off text-grayscale-110 hover:bg-white-70% disabled:text-white-off',
  grayscaleOutline:
    'ring-1 ring-grayscale-80 hover:bg-grayscale-background-100 text-grayscale-110 disabled:text-white-off',
  dangerOutline:
    'text-danger-100 ring-1 ring-danger-100 bg-white-off hover:bg-danger-90 disabled:text-white-off',
  primaryText:
    'text-primary-100 disabled:text-grayscale-80 bg-transparent hover:bg-primary-80 disabled:bg-transparent ',
  grayscaleText:
    'text-grayscale-100 bg-transparent disabled:text-grayscale-80 hover:bg-grayscale-background-100 disabled:bg-transparent ',
  dangerText:
    'text-danger-100 bg-transparent disabled:text-grayscale-80 hover:bg-danger-90 disabled:bg-transparent',
};
const buttonSizeClass = {
  large: 'typo-Body-Large-Bold',
  medium: 'typo-Body-Small-Bold ',
  small: 'typo-Body-Small-Bold',
};

export const headerSubmitButtonClasses =
  'h-10 w-[clamp(56px,15vw,100px)] small:w-[clamp(100px,11.7vw,120px)] medium:w-[120px]';

/**
 * buttonType : button's theme
 * buttonSize : define button's text size
 */
export interface ButtonBasicProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: keyof typeof buttonTypeClass;
  buttonSize?: keyof typeof buttonSizeClass;
}

const ButtonBasic = ({
  className,
  children,
  buttonSize,
  buttonType,
  ...rest
}: ButtonBasicProps) => {
  return (
    <button
      className={twMerge(
        ` truncate ${buttonBaseClasses} ${
          buttonSize && buttonSizeClass?.[buttonSize]
        } ${buttonType && buttonTypeClass?.[buttonType]} `,
        className,
      )}
      {...rest}>
      {children}
    </button>
  );
};

export default ButtonBasic;
