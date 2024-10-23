import ViewMore from '@/app/svgs/ViewMore.svg';
import { Button } from '@/components/ui/button';
import { CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  isSelected?: boolean;
  cardImg: React.ReactNode;
  desc: string[];
  subDesc: string[];
};

const ProductCarouselItem = ({ isSelected, cardImg, desc, subDesc }: Props) => {
  return (
    <CarouselItem
      className={cn(
        'flex justify-center items-center',
        // 'xl-screen:basis-[718px]',
        // 'lg-screen:basis-[846px]',
        // 'sm-screen:basis-[516px]',
        'sm-screen:basis-[52%]',
        'basis-full',
      )}>
      <div
        className={cn(
          'embla__slide__number shrink-0',
          'xl-screen:w-[718px] xl-screen:pt-9 xl-screen:pb-16 xl-screen:px-20',
          'lg-screen:w-[846px] lg-screen:py-[92px] lg-screen:px-20',
          'sm-screen:w-[516px] sm-screen:py-9 sm-screen:px-[60px]',
          'w-full h-fit pt-5 px-6  sm-screen:ring-1 sm-screen:ring-whiteAlpha-30  rounded-[80px] ',
          isSelected
            ? 'sm-screen:bg-gradient-to-b sm-screen:from-primary-alpha-50 sm-screen:to-primary-alpha-20'
            : 'sm-screen:bg-whiteAlpha-10',
          'bg-transparent',
        )}>
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-center">
            <div
              className={cn(
                'flex items-center justify-center relative',
                'lg-screen:w-[450px] lg-screen:h-[450px]',
                'w-[264px] h-[264px]',
              )}>
              {cardImg}
            </div>
          </div>
          {isSelected && <ProductDesc desc={desc} subDesc={subDesc} />}
        </div>
      </div>
    </CarouselItem>
  );
};

export const ProductDesc = ({
  desc,
  subDesc,
}: {
  desc: string[];
  subDesc: string[];
}) => {
  return (
    <div className="flex flex-col sm-screen:gap-[64px] gap-7">
      <div className="flex flex-col gap-5 sm-screen:min-h-[152px] min-h-[136px]">
        <span className="sm-screen:typo-Display2Bold typo-Display1Bold text-white text-center">
          {desc.map((item, idx) => {
            if (idx === desc.length - 1) {
              return <>{item}</>;
            } else {
              return (
                <>
                  {item}
                  <br />
                </>
              );
            }
          })}
        </span>
        <span className="typo-BodyLargeMedium text-whiteAlpha-70 text-center">
          {subDesc.map((item, idx) => {
            if (idx === subDesc.length - 1) {
              return <>{item}</>;
            } else {
              return (
                <>
                  {item}
                  <br />
                </>
              );
            }
          })}
        </span>
      </div>
      <div className="text-center">
        <Button
          variant={'ghost'}
          theme={'white'}
          size={'lg'}
          className="w-[160px] h-[52px]">
          <div className="flex items-center gap-2">
            View more
            <ViewMore className="[&>path]:fill-white [&>path]:stroke-white" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ProductCarouselItem;
