import ViewMore from '@/app/svgs/ViewMore.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  isSelected?: boolean;
};

const ProductCard = ({ children, isSelected }: Props) => {
  return (
    <div
      className={cn(
        'embla__slide__number',
        'xl-screen:w-[718px] xl-screen:py-16 xl-screen:px-20',
        'lg-screen:w-[846px] lg-screen:py-[92px] lg-screen:px-20',
        'sm-screen:w-[516px] sm-screen:py-9 sm-screen:px-[60px]',
        'w-full h-fit pt-5 px-6 pb-[133px] border border-whiteAlpha-30 rounded-[80px] ',
        isSelected
          ? 'bg-gradient-to-b from-primary-alpha-50 to-primary-alpha-20'
          : 'bg-whiteAlpha-10',
      )}>
      {children}
    </div>
  );
};

export const ProductDesc = ({
  desc,
  subDesc,
}: {
  desc: string;
  subDesc: string;
}) => {
  return (
    <div className="flex flex-col gap-[64px]">
      <div className="flex flex-col gap-5 h-[152px]">
        <span className="typo-Display2Bold text-white text-center">{desc}</span>
        <span className="typo-BodyLargeMedium text-whiteAlpha-70 text-center">
          {subDesc}
        </span>
      </div>
      <div className="text-center">
        <Button
          variant={'ghost'}
          theme={'white'}
          size={'lg'}
          className="w-[160px] h-[52px]">
          <div className="flex items-center gap-2">
            View more <ViewMore className="[&>path]:fill-white" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
