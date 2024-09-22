'use client';
import { useCallback, useEffect, useState } from 'react';

type Props = {};

const useSectionIntersectDetector = ({}: Props) => {
  const [sections, setSections] = useState<
    (HTMLElement | HTMLDivElement | null)[]
  >([]);
  const updateSections = useCallback(
    (sections: (HTMLElement | HTMLDivElement | null)[]) => {
      setSections(sections);
    },
    [],
  );
  useEffect(() => {
    const observerCb = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log(entry);
          console.log(entry.target.classList.contains('section-toggle'));
        }
      });
    };
    console.log(document.querySelector('#header'));
    const observer = new IntersectionObserver(observerCb, {
      rootMargin: '0px 0px 90% 0px',
      threshold: 0,
    });
    sections
      .filter((item) => !!item)
      .forEach((section) => observer.observe(section));

    return () => {
      sections
        .filter((item) => !!item)
        .forEach((section) => observer.unobserve(section));
    };
  }, [sections]);

  return {
    updateSections,
  };
};

export default useSectionIntersectDetector;
