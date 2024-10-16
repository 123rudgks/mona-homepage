import { cn } from '@/lib/utils';

type Props = {};

const ProductCard = (props: Props) => {
  return (
    <div
      className={cn(
        'w-[718px] h-[828px]',
        'bg-gradient-to-b from-primary-alpha-50 to-primary-alpha-20',
      )}>
      ProductCard
    </div>
  );
};

export default ProductCard;
