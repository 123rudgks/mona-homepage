import { cn } from '@/lib/utils';

type Props = {
  theme?: 'primary';
};

const ProductCard = ({ theme }: Props) => {
  return (
    <div
      className={cn(
        'embla__slide__number',
        'xl-screen:w-[718px] xl-screen:h-[828px] xl-screen:py-16 xl-screen:px-20',
        'lg-screen:w-[846px] lg-screen:h-[912px] lg-screen:py-[92px] lg-screen:px-20',
        'sm-screen:w-[516px] sm-screen:h-[614px] sm-screen:py-9 sm-screen:px-[60px]',
        'w-full h-fit pt-5 px-6 pb-[133px] border border-whiteAlpha-30 rounded-[80px]',
        theme === 'primary'
          ? 'bg-gradient-to-b from-primary-alpha-50 to-primary-alpha-20'
          : 'bg-whiteAlpha-10',
      )}>
      ProductCard
    </div>
  );
};

export default ProductCard;
