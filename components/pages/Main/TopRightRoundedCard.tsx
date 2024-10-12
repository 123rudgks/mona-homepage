import { cn } from '@/lib/utils';

type Props = {
  theme?: 'primary';
};

const TopRightRoundedCard = ({ theme }: Props) => {
  return (
    <div
      className={cn(
        'rounded-xl rounded-tr-[60px]',
        'lg-screen:max-w-[460px]',
        'sm-screen:min-h-[565px] sm-screen:rounded-3xl sm-screen:rounded-tr-[124px]',
        'min-h-[260px]',
        'p-[1px] overflow-hidden',
        'bg-gradient-to-br from-whiteAlpha-70 to-transparent',
      )}>
      <div
        className={cn(
          'rounded-xl rounded-tr-[60px]',
          'sm-screen:rounded-3xl sm-screen:rounded-tr-[124px]',
          'w-full h-full backdrop-blur-[50px] ',
          theme === 'primary'
            ? ' bg-gradient-to-b from-primary to-primary-alpha-50 '
            : 'bg-whiteAlpha-10',
        )}></div>
    </div>
  );
};

export default TopRightRoundedCard;
