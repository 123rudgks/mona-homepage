'use client';
import useSectionIntersectDetector from '@/hooks/useSectionIntersectDetector';
import { useEffect, useRef } from 'react';
import dict from '../../dictionaries/header.json';
export default function Page({
  params: { lang },
}: {
  params: { lang: 'ko' | 'en' };
}) {
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const { updateSections } = useSectionIntersectDetector({
    sections: [section1Ref.current, section2Ref.current, section3Ref.current],
  });
  useEffect(() => {
    updateSections([
      section1Ref.current,
      section2Ref.current,
      section3Ref.current,
    ]);
  }, [updateSections]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  ">
      <button>{dict['기업정보'][lang]}</button>
      <div
        ref={section1Ref}
        className="section-toggle bg-primary-light w-full h-[800px] bg-white">
        white
      </div>
      <div
        ref={section2Ref}
        className="section-toggle bg-blackAlpha-30 w-full h-[800px]">
        white alpha
      </div>
      <div
        ref={section3Ref}
        className="section-toggle typo-BodyCaptionBold w-full h-[800px] bg-primary-dark">
        caption bold
      </div>
      <div className="typo-BodyLargeRegular w-full h-[800px] bg-danger">
        caption bold
      </div>
    </main>
  );
}
