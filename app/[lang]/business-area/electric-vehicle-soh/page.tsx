'use client';
import { useState } from 'react';

type Props = {};

const Page = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className="relative w-[18px] h-[16px] flex flex-col justify-center items-center"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Menu">
      <span
        className={`
        absolute h-[2px] bg-current transform transition-all duration-300 ease-in-out
        ${isOpen ? 'w-[18px] rotate-45' : 'w-[18px] -translate-y-[6px]'}
      `}
      />
      <span
        className={`
        absolute h-[2px] bg-current transform transition-all duration-300 ease-in-out
        ${isOpen ? 'w-0 opacity-0' : 'w-[18px] opacity-100'}
      `}
      />
      <span
        className={`
        absolute h-[2px] bg-current transform transition-all duration-300 ease-in-out
        ${isOpen ? 'w-[18px] -rotate-45' : 'w-[18px] translate-y-[6px]'}
      `}
      />
    </button>
  );
};

export default Page;
