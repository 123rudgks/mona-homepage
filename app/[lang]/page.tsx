'use client';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { cn } from '@/lib/utils';
import AnimationCircleBg from '@/public/images/AnimationCircleBg.png';
import { Language } from '@/types/globals.types';
import { useEffect, useRef, useState } from 'react';
import dict from '../../dictionaries/header.json';
import ShineIcon from '../svgs/Shine.svg';
export default function Page({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);

  const [headerDarkMode, setHeaderDarkMode] = useState<boolean>(false);

  // 스크롤에 따라 헤더 색상 변경
  useEffect(() => {
    // 처음 로딩된 페이지의 스크롤 위치가 최상단이 아닐 경우
    if (window.scrollY !== 0) {
      setHeaderDarkMode(false);
    }
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

  useEffect(() => {
    const animatedCircle = document.getElementById('animated-circle');

    setTimeout(() => {
      if (animatedCircle) {
        animatedCircle.classList.replace('w-[360px]', 'w-full');
        animatedCircle.classList.replace('h-[360px]', 'h-full');
        animatedCircle.classList.remove('rounded-full', 'bottom-[135px]');
        setHeaderDarkMode(true);
      }
    }, 1500);
  }, []);
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-between bg-white ">
      <div
        ref={section2Ref}
        className="section-toggle bg-white w-full sm-screen:h-[1080px] h-[812px] relative ">
        <div className="absolute w-full h-full flex items-center justify-center">
          <div
            id="animated-circle"
            className={cn(
              'absolute w-[360px] bottom-[135px] h-[360px] transition-all bg-center bg-cover bg-no-repeat  rounded-full duration-500',
            )}
            style={{ backgroundImage: `url(${AnimationCircleBg.src})` }}></div>
        </div>

        <div className="w-full h-full flex justify-center pt-[225px] px-[312px]">
          <div className="flex-col flex text-primary items-center gap-6">
            <span className="typo-Display7Bold text-[90px]">
              RAPID & ACCURATE
            </span>
            <span className="typo-Display7Bold text-[90px]">
              BATTERY DIAGNOSIS
            </span>
            <span className="typo-HeadlineMedium text-[44px] flex items-center">
              Powered by AI <ShineIcon />
            </span>
          </div>
        </div>
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
      <Header darkMode={headerDarkMode} lang={lang} />
      <Footer darkMode={true} lang={lang} />
    </main>
  );
}
