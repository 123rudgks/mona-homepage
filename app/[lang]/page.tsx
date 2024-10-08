'use client';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { cn } from '@/lib/utils';
import AnimationCircleBg from '@/public/images/AnimationCircleBg.png';
import { Language } from '@/types/globals.types';
import Image from 'next/image';
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
    function preventDefault(e: Event) {
      e.preventDefault();
    }
    const disableScroll = () => {
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('wheel', preventDefault, { passive: false });
    };
    const enableScroll = () => {
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('wheel', preventDefault);
    };
    disableScroll();
    animatedCircle?.addEventListener('transitionend', (e) => {
      enableScroll();
      animatedCircle.classList.remove(
        'transition-all',
        'ease-in',
        'duration-500',
      );
    });
    setTimeout(() => {
      if (animatedCircle) {
        animatedCircle.classList.remove('invisible');
        animatedCircle.classList.remove(
          'md-screen:w-[874px]',
          'md-screen:h-[874px]',
          'sm-screen:w-[600px]',
          'sm-screen:h-[600px]',
          'w-[400px]',
          'h-[400px]',
        );
        animatedCircle.classList.add('-translate-y-[100px]', '-translate-y-16');
        animatedCircle.classList.add('w-full', 'h-full');
        animatedCircle.classList.remove('rounded-full');
        setHeaderDarkMode(true);
      }
    }, 1000);
  }, []);
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-between bg-white ">
      <div
        ref={section2Ref}
        className="transform flex justify-center items-center sm-screen:pt-[100px]   pt-16 bg-white w-full sm-screen:h-[1080px] h-[812px] relative ">
        <div
          id="animated-circle"
          className={cn(
            'fixed invisible transition-all duration-500 ease-in  rounded-full  bg-black overflow-hidden',
            'md-screen:w-[874px] md-screen:h-[874px]',
            'sm-screen:w-[600px] sm-screen:h-[600px]',
            'w-[400px] h-[400px]',
          )}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${AnimationCircleBg.src})`,
            backgroundPosition: 'center',
            backgroundSize: '1920px 1080px',
          }}></div>

        <div className="flex flex-col md-screen:gap-[74px] sm-screen:gap-12 gap-5 items-center">
          {/* Section1 Text Section */}

          <div className="flex-col flex text-primary items-center ">
            <span
              className={cn(
                'typo-Display7Bold  font-semibold  ',
                'md-screen:text-[90px] md-screen:leading-[104px] md-screen:tracking-[-1.8px]',
                'sm-screen:text-[80px] sm-screen:leading-[90px] sm-screen:tracking-[-1.4px]',
                'text-[38px] leading-[50px] tracking-[-1px]',
              )}>
              RAPID & ACCURATE
            </span>
            <span
              className={cn(
                'typo-Display7Bold  font-semibold  ',
                'md-screen:text-[90px] md-screen:leading-[104px] md-screen:tracking-[-1.8px]',
                'sm-screen:text-[80px] sm-screen:leading-[90px] sm-screen:tracking-[-1.4px]',
                'text-[38px] leading-[50px] tracking-[-1px]',
              )}>
              BATTERY DIAGNOSIS
            </span>
            <span
              className={cn(
                'typo-HeadlineMedium  font-medium  flex items-center',
                'md-screen:text-[44px] md-screen:leading-[60px] md-screen:tracking-[-0.6px]',
                'sm-screen:text-[34px] sm-screen:leading-[50px] sm-screen:tracking-[-0.4px]',
              )}>
              Powered by AI <ShineIcon />
            </span>
          </div>
          <div
            className={cn(
              ' bg-black rounded-full',
              'md-screen:w-[360px] md-screen:h-[360px]',
              'sm-screen:w-[300px] sm-screen:h-[300px]',
              'w-[200px] h-[200px]',
            )}
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${AnimationCircleBg.src})`,
              backgroundPosition: 'center',
              backgroundSize: '960px 540px',
            }}></div>
        </div>
      </div>
      <div
        ref={section1Ref}
        className="section-toggle bg-primary-light w-full h-[800px] bg-white">
        white
        <button>{dict['기업정보'][lang]}</button>
      </div>
      <div> 이미지 시작</div>
      <Image
        src={'/images/AnimationCircleBg.png'}
        alt=""
        width={100}
        height={100}
      />
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
