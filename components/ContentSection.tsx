import { cn } from '@/lib/utils';
import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  mobileTabMenuComp: React.ReactNode;
}

const ContentSection = ({
  mobileTabMenuComp,
  children,
  className,
  ...divProps
}: Props) => {
  return (
    <div
      className={cn(
        'relative sm-screen:pt-0 pt-[52px] sm-screen:pb-[200px] pb-[100px] border-b border-grayscale-100',
        className,
      )}
      {...divProps}>
      {mobileTabMenuComp}
      <div className="sm-screen:px-11 px-6 flex justify-center">
        <div className=" w-full max-w-[1430px]">{children}</div>
      </div>
    </div>
  );
};

export default ContentSection;
