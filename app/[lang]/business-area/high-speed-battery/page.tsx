'use client';
import ContentBox from '@/components/ContentBox';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import useMenu from '@/hooks/useMenu';
import { Language } from '@/types/globals.types';
import { useEffect, useState } from 'react';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const [headerDarkMode, setHeaderDarkMode] = useState<boolean>(false);
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });

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
  return (
    <main>
      <div className="sm-screen:pt-[100px]  pt-16 bg-navy-700 w-full sm-screen:h-[1080px] h-[812px] relative ">
        Section1
      </div>
      <div>
        <TabMenu lang={lang} />
        <MobileTabMenu lang={lang} />
      </div>
      <div>
        <ContentBox title={currentMenu.text} label={currentMenu.label}>
          {'hi'}
        </ContentBox>
      </div>
      <Header darkMode={headerDarkMode} lang={lang} />
      <Footer darkMode={true} lang={lang} />
    </main>
  );
};

export default Page;
