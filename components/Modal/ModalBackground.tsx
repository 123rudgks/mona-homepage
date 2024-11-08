import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const ModalBackground = ({ className, children, ...rest }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div
      className={twMerge(
        ' flex h-screen w-screen items-center justify-center bg-blackAlpha-30',
        className,
      )}
      {...rest}>
      {children}
    </div>
  );
};

export default ModalBackground;
