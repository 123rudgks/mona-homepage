'use client';
import ViewMore from '@/app/svgs/ViewMore.svg';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Button } from '@/components/ui/button';
import dict from '@/dictionaries/main.json';
import { cn } from '@/lib/utils';
import AnimationCircleBg from '@/public/images/AnimationCircleBg.png';
import MainSection2 from '@/public/images/MainSection2.png';
import MainSection3 from '@/public/images/MainSection3.png';
import { Language } from '@/types/globals.types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ShineIcon from '../svgs/Shine.svg';

export default function Page({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const section1Ref = useRef<HTMLDivElement | null>(null);
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
        animatedCircle.classList.add(
          'sm-screen:-translate-y-[50px]',
          '-translate-y-8',
        );
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
      <div className="transform flex justify-center items-center sm-screen:pt-[100px]   pt-16 bg-white w-full sm-screen:h-[1080px] h-[812px] relative ">
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
        className={cn(
          'section-toggle  w-full',
          'xl-screen:py-[142px] xl-screen:px-[102px] xl-screen:h-[761px]',
          'lg-screen:py-[132px] lg-screen:px-[45px] lg-screen:h-[632px] lg-screen:block',
          'sm-screen:py-[88px] sm-screen:px-[45px] sm-screen:h-[840px] sm-screen:flex sm-screen:items-center',
          'py-[70px] px-6 h-[860px]',
        )}>
        <div
          className={cn(
            'w-full h-full flex items-center  flex-col',
            'lg-screen:flex-row lg-screen:gap-0 lg-screen:h-full',
            'sm-screen:gap-11 sm-screen:h-fit',
            'gap-8',
          )}>
          <div
            className={cn(
              'relative  h-full w-full rounded-2xl overflow-hidden',
              'lg-screen:h-full lg-screen:flex-1 ',
              'sm-screen:h-[313px] sm-screen:w-[614px] sm-screen:flex-none',
            )}>
            <Image src={MainSection2.src} alt="main-section2" layout="fill" />
          </div>
          <div className="flex-1 w-full">
            <div
              className={cn(
                'w-full h-full flex flex-col gap-9 items-center',
                'lg-screen:gap-10',
              )}>
              <div
                className={cn(
                  'flex flex-col gap-4 items-center w-full max-w-[936px]',
                  'lg-screen:w-[500px] lg-screen:gap-5',
                )}>
                <span className="typo-Display1Medium text-primary">
                  Powered by AI
                </span>
                <span
                  className={cn(
                    'text-grayscale-black text-center',
                    lang === 'ko' ? 'typo-Display5Bold' : 'typo-Display2Bold',
                  )}>
                  {dict['신속하고 정확한 배터리 진단'][lang]}
                </span>
                <span
                  className={cn(
                    'h-[63px] w-[1px] bg-blackAlpha-20 hidden',
                    'lg-screen:inline',
                  )}
                />
                <span
                  className={cn(
                    'text-blackAlpha-80 text-center w-full',
                    lang === 'ko'
                      ? 'typo-BodyLargeMedium '
                      : 'typo-BodySmallMedium',
                  )}>
                  {dict['Section2_Desc'][lang]}
                </span>
              </div>
              <div>
                <Button
                  variant={'ghost'}
                  theme={'black'}
                  size={'lg'}
                  className="">
                  <div className="flex items-center gap-2">
                    View more <ViewMore />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={section3Ref}
        className={cn('w-full ')}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${MainSection3.src})`,
          backgroundSize: 'cover',
          backdropFilter: 'blur(10px)',
        }}>
        <div
          className={cn(
            'bg-blackAlpha-70 w-full h-full',
            'lg-screen:pb-[156px]',
            'sm-screen:px-11 pb-[100px]',
            'px-6 pb-[70px]',
            'backdrop-blur-xl',
          )}>
          <div
            className={cn(
              'flex flex-col items-center max-w-[979px] mx-auto',
              'sm-screen:gap-9',
              'gap-7',
            )}>
            <div
              className={cn(
                'flex flex-col items-center',
                'sm-screen:gap-5',
                'gap-4',
              )}>
              <span
                className={cn(
                  'text-primary',
                  'typo-BodyLargeBold',
                  'sm-screen:typo-Display1Medium',
                )}>
                ABOUT MONA
              </span>
              <span
                className={cn(
                  'text-grayscale-white',
                  'typo-Display1Bold',
                  'sm-screen:typo-Display4Bold',
                  'lg-screen:typo-Display5Bold',
                )}>
                {dict['Section3_Desc'][lang]}
              </span>
            </div>
            <span
              className={cn(
                'text-whiteAlpha-70 text-center max-w-[730px]',
                'typo-BodyLargeBold',
              )}>
              {dict['Section3_SubDesc'][lang]}
            </span>
          </div>
        </div>
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
