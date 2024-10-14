import { cn } from '@/lib/utils';

type Props = {
  theme?: 'primary';
  children?: React.ReactNode;
};

const TopRightRoundedCard = ({ theme, children }: Props) => {
  return (
    <div
      className={cn(
        'rounded-xl rounded-tr-[60px]',
        'lg-screen:max-w-[460px]',
        'sm-screen:min-h-[565px] sm-screen:rounded-3xl sm-screen:rounded-tr-[124px]',
        'min-h-[260px]',
        'p-[1px] overflow-hidden ',
        'bg-gradient-to-br from-whiteAlpha-10 to-transparent',
      )}>
      <div
        className={cn(
          'rounded-xl rounded-tr-[60px]',
          'sm-screen:rounded-3xl sm-screen:rounded-tr-[124px] ',
          'w-full h-full',
          theme === 'primary'
            ? ' bg-gradient-to-b from-primary to-primary-alpha-50 '
            : 'bg-gradient-to-br  from-blackAlpha-50 to-blackAlpha-10',
        )}>
        {children}
      </div>
    </div>
  );
};

export default TopRightRoundedCard;
