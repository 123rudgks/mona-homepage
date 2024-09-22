'use client';

import { useEffect, useRef } from 'react';

type Props = {};

const Header = (props: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
        } else {
        }
      });
    };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  return (
    <div ref={ref} id="header" className="w-full md:h-[100px] h-16 fixed top-0">
      <nav>header</nav>
    </div>
  );
};

export default Header;
