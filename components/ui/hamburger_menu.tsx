import { cn } from '@/lib/utils';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  darkMode?: boolean;
  className?: string;
};

const HamburgerMenu = ({ isOpen, setIsOpen, darkMode, className }: Props) => {
  return (
    <button
      className={cn(
        'w-6 h-6 flex justify-center items-center md-screen:hidden',
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Menu">
      <div className="relative w-[18px] h-[16px] flex flex-col justify-center items-center">
        <span
          className={cn(
            `absolute h-[2px] transform transition-all duration-300 ease-in-out`,
            isOpen ? 'w-[18px] rotate-45' : 'w-[18px] -translate-y-[6px]',
            darkMode ? 'bg-white' : 'bg-black',
          )}
        />
        <span
          className={cn(
            `absolute h-[2px] transform transition-all duration-300 ease-in-out`,
            isOpen ? 'w-0 opacity-0' : 'w-[18px] opacity-100',
            darkMode ? 'bg-white' : 'bg-black',
          )}
        />
        <span
          className={cn(
            `absolute h-[2px] bg-current transform transition-all duration-300 ease-in-out`,
            isOpen ? 'w-[18px] -rotate-45' : 'w-[18px] translate-y-[6px]',
            darkMode ? 'bg-white' : 'bg-black',
          )}
        />
      </div>
    </button>
  );
};

export default HamburgerMenu;
