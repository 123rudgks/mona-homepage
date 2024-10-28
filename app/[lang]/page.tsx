'use client';
import Section3_AI솔루션 from '@/app/images/main/Section3_AI솔루션.png';
import Section3_데이터분석 from '@/app/images/main/Section3_데이터분석.png';
import Section3_빅데이터 from '@/app/images/main/Section3_빅데이터.png';
import Section3_컨버전스 from '@/app/images/main/Section3_컨버전스.png';
import Section3_하드웨어 from '@/app/images/main/Section3_하드웨어.png';
import ViewMore from '@/app/svgs/ViewMore.svg';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import NewsItem, { DUMMY_NEWS } from '@/components/pages/Main/NewsItem';
import ProductCarousel from '@/components/pages/Main/ProductCarousel';
import TopRightRoundedCard from '@/components/pages/Main/TopRightRoundedCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dict from '@/dictionaries/main.json';
import { cn } from '@/lib/utils';
import AnimationCircleBg from '@/public/images/AnimationCircleBg.png';
import MainSection2 from '@/public/images/MainSection2.png';
import MainSection3 from '@/public/images/MainSection3.png';
import { Language } from '@/types/globals.types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ShineIcon from '../svgs/Shine.svg';

const Section3Images: { [str in Partial<keyof typeof dict>]?: string } = {
  'AI 솔루션': Section3_AI솔루션.src,
  '데이터 분석': Section3_데이터분석.src,
  빅데이터: Section3_빅데이터.src,
  컨버전스: Section3_컨버전스.src,
  '하드웨어 디자인': Section3_하드웨어.src,
};
const Section3Titles: { ko: Partial<keyof typeof dict>; en: string }[] = [
  { ko: 'AI 솔루션', en: 'AI Solution' },
  { ko: '데이터 분석', en: 'Data Analysis' },
  { ko: '빅데이터', en: 'Big Data' },
  { ko: '하드웨어 디자인', en: 'Hardware Design' },
  { ko: '컨버전스', en: 'Convergence' },
];
export default function Page({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const [tabValue, setTabValue] = useState<string>('solution');
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
        className={cn(
          'section-toggle  w-full',
          'xl-screen:py-[142px] xl-screen:px-[102px] xl-screen:h-[761px]',
          'lg-screen:py-[132px] lg-screen:px-[45px] lg-screen:h-[632px] lg-screen:block',
          'sm-screen:py-[88px] sm-screen:px-[45px] sm-screen:h-[840px] sm-screen:flex sm-screen:items-center',
          'py-[70px] px-6 h-[860px]',
        )}>
        <div
          className={cn(
            'w-full h-full flex items-center flex-col',
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
        }}>
        <div
          className={cn(
            'bg-blackAlpha-70 w-full h-full',
            'lg-screen:pb-[156px] lg-screen:pt-[140px]',
            'sm-screen:px-11 pb-[100px] pt-[100px]',
            'px-6 py-[70px]',
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

          <div
            className={cn(
              'grid mx-auto w-fit',
              'xl-screen:gap-12',
              'lg-screen:grid-cols-3 lg-screen:mt-[106px]',
              'sm-screen:gap-8 sm-screen:mt-[80px]',
              'grid-cols-2 gap-4 mt-[40px]',
            )}>
            <TopRightRoundedCard theme="primary">
              <div className="flex flex-col gap-5 h-full justify-between sm-screen:p-11 p-5">
                <div className="flex flex-col typo-HeadlineRegular sm-screen:typo-Display5Regular">
                  <span className={'text-whiteAlpha-70'}>RAPID</span>
                  <span className={'text-whiteAlpha-50'}>ACCURATE</span>
                  <span className={'text-whiteAlpha-30'}>SAFE</span>
                </div>
                <Button
                  theme={'white'}
                  variant={'ghost'}
                  size={'lg'}
                  className="sm-screen:w-40 sm-screen:py-3 w-[120px] py-1">
                  View more
                </Button>
              </div>
            </TopRightRoundedCard>
            {Section3Titles.map((item, index) => {
              const src = Section3Images[item.ko];
              return (
                <TopRightRoundedCard key={item.ko}>
                  <div className="flex flex-col gap-5 sm-screen:p-11 p-5">
                    <div
                      className="relative w-full "
                      style={{ aspectRatio: '341 / 312' }}>
                      {src && <Image src={src} alt={item.ko} fill />}
                    </div>

                    <div className={cn('flex flex-col sm-screen:gap-4 gap-1')}>
                      <div
                        className={cn('flex flex-col sm-screen:gap-2 gap-1')}>
                        <span
                          className={cn(
                            'typo-BodyCaptionBold sm-screen:typo-HeadlineBold text-primary',
                          )}>
                          {item.en}
                        </span>
                        <span
                          className={cn(
                            'typo-BodyLargeBold sm-screen:typo-Display4Bold text-white',
                          )}>
                          {item.ko}
                        </span>
                      </div>
                      <span
                        className={cn(
                          'typo-BodyCaptionMedium sm-screen:typo-BodyLargeMedium text-whiteAlpha-70',
                        )}>
                        {dict[item.ko][lang]}
                      </span>
                    </div>
                  </div>
                </TopRightRoundedCard>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'section-toggle typo-BodyCaptionBold w-full',
          'xl-screen:min-h-[1507px] lg-screen:min-h-[1508px] sm-screen:min-h-[1178px] min-h-[942px]',
        )}>
        <div className="h-full flex flex-col sm-screen:gap-20 lg-screen:gap-[90px]  bg-[#0D0D0D] relative overflow-hidden pt-[70px] sm-screen:pt-[100px] xl-screen:pt-[140px]">
          <div className=" opacity-20 w-[909px] h-[909px] bg-primary absolute left-0 bottom-0 rounded-full blur-[250px] -translate-x-1/2 translate-y-1/2" />
          <div
            className={cn(
              'flex flex-col gap-10 mx-auto items-center',
              lang === 'ko'
                ? 'sm-screen:w-[606px] sm-screen:max-w-none'
                : 'sm-screen:max-w-none sm-screen:w-[730px]',
              lang === 'ko' ? 'max-w-[411px] w-full' : 'max-w-[611px] w-full',
            )}>
            <div className="flex  flex-col gap-5 items-center ">
              <span
                className={cn(
                  'text-primary',
                  'typo-BodyLargeBold',
                  'sm-screen:typo-Display1Medium',
                )}>
                PRODUCT
              </span>
              <span
                className={cn(
                  'text-white text-center',
                  lang === 'ko'
                    ? 'lg-screen:typo-Display5Bold'
                    : 'lg-screen:typo-Display3Bold',
                  'sm-screen:typo-Display3Bold',
                  'typo-Display1Bold',
                )}>
                {dict['Section4_Desc'][lang]}
              </span>
            </div>
            <Tabs
              defaultValue="solution"
              onValueChange={(value) => {
                setTabValue(value);
              }}>
              <TabsList
                className={cn(' sm-screen:gap-[10px] xl-screen:gap-3 gap-0')}>
                <TabsTrigger
                  className={cn(
                    'sm-screen:typo-HeadlineBold typo-BodyLargeBold sm-screen:py-3 sm-screen:px-6 py-2 px-4',
                  )}
                  value="solution">
                  {dict['Section4_Tab1'][lang]}
                </TabsTrigger>
                <TabsTrigger
                  className={cn(
                    'sm-screen:typo-HeadlineBold typo-BodyLargeBold sm-screen:py-3 sm-screen:px-6 py-2 px-4',
                  )}
                  value="hardware">
                  {dict['Section4_Tab2'][lang]}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="w-full z-10">
            <ProductCarousel lang={lang} tabValue={tabValue} />
          </div>
        </div>
      </div>
      <div
        className={cn(
          ' w-full bg-white flex flex-col gap-[90px]',
          'xl-screen:py-[140px] xl-screen:px-[245px]',
          'lg-screen:py-[100px] lg-screen:px-[159px]',
          'sm-screen:py-[100px] sm-screen:px-9',
          'py-[70px] px-6',
        )}>
        <div className={cn('flex flex-col gap-10  items-center w-full')}>
          <div
            className={cn(
              'flex  flex-col gap-5 items-center ',
              lang === 'ko'
                ? 'sm-screen:w-[606px] sm-screen:max-w-none'
                : 'sm-screen:max-w-none sm-screen:w-[730px]',
              lang === 'ko' ? 'max-w-[450px] w-full' : 'max-w-[611px] w-full',
            )}>
            <span
              className={cn(
                'text-primary',
                'typo-BodyLargeBold',
                'sm-screen:typo-Display1Medium',
              )}>
              NEWS
            </span>
            <span
              className={cn(
                'text-black text-center',
                lang === 'ko'
                  ? 'lg-screen:typo-Display5Bold'
                  : 'lg-screen:typo-Display3Bold',
                'sm-screen:typo-Display4Bold',
                'typo-Display1Bold',
              )}>
              <span> {dict['Section5_Desc1'][lang]}</span>
              <br className="hidden sm-screen:inline" />
              <span> {dict['Section5_Desc2'][lang]}</span>
            </span>
          </div>
          <div className={cn('w-full flex flex-col sm-screen:gap-10 gap-6')}>
            {DUMMY_NEWS.map((news) => (
              <>
                <NewsItem key={news.id} {...news} />
                <div className="h-[1px] bg-blackAlpha-20" />
              </>
            ))}
          </div>
          <Button
            variant={'ghost'}
            theme={'black'}
            size={'lg'}
            className="w-[200px] h-10 lg-screen:mt-[30px] sm-screen:mt-5">
            <div className="flex items-center gap-2">
              View more <ViewMore />
            </div>
          </Button>
        </div>
      </div>
      <div
        className={cn('w-full sm-screen:h-[142px] h-[94px] relative bg-black')}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="whitespace-nowrap sm-screen:typo-Display6Regular typo-Display2Regular text-primary">
            RAPID & ACCURATE BATTERY DIAGNOSIS RAPID & ACCURATE BATTERY
            DIAGNOSIS RAPID & ACCURATE BATTERY DIAGNOSIS
          </span>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black to-transparent"></div>
          </div>
        </div>
      </div>
      <Header darkMode={headerDarkMode} lang={lang} />
      <Footer darkMode={true} lang={lang} />
    </main>
  );
}
