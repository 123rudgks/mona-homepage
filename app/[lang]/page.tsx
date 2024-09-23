'use client';
import Header from '@/components/Header/Header';
import { Language } from '@/types/globals.types';
import { useEffect, useRef, useState } from 'react';
import dict from '../../dictionaries/header.json';
export default function Page({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const [headerDarkMode, setHeaderDarkMode] = useState<boolean>(true);

  // 스크롤에 따라 헤더 색상 변경
  useEffect(() => {
    const changeHeaderColor = (e: Event) => {
      if (window.scrollY < 100) {
        setHeaderDarkMode(true);
      } else {
        setHeaderDarkMode(false);
      }
    };
    window.addEventListener('scroll', changeHeaderColor);
    return () => {
      window.removeEventListener('scroll', changeHeaderColor);
    };
  }, []);
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-between bg-white ">
      <Header darkMode={headerDarkMode} lang={lang} />
      <div
        ref={section2Ref}
        className="section-toggle bg-blackAlpha-30 w-full h-[800px]">
        white alpha
      </div>
      <div
        ref={section1Ref}
        className="section-toggle bg-primary-light w-full h-[800px] bg-white">
        white
        <button>{dict['기업정보'][lang]}</button>
      </div>

      <div
        ref={section3Ref}
        className="section-toggle typo-BodyCaptionBold w-full h-[800px] bg-primary-dark">
        caption bold
      </div>
      <div className="section-toggle typo-BodyCaptionBold w-full h-[800px] bg-black">
        caption bold
      </div>
      <div className="typo-BodyLargeRegular w-full h-[800px] bg-primary">
        caption bold
        <div className="w-[100px] h-[100px] ">s</div>
      </div>
    </main>
  );
}
