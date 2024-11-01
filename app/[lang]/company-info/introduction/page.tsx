'use client';
import HomeIcon from '@/app/svgs/HomeIcon.svg';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const path = usePathname();
  const MEMU = useMenu({ lang });
  const currentCategory = useMemo(() => {
    return MEMU.find((item) => path.includes(item.categoryPath));
  }, [path, MEMU]);
  return (
    <main>
      <div className="h-[545px] bg-navy-700">사업 영역</div>
      <div className={cn('relative sm-screen:pt-0 pt-[52px] h-[1000px]')}>
        <div
          className={cn(
            'lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end',
          )}>
          <MonaBreadCrumb
            items={[
              { href: '/', component: <HomeIcon />, id: 'home' },

              {
                component: currentCategory?.category,
                id: 'category',
              },
            ]}
          />
        </div>
        <div
          className={cn(
            'sm-screen:flex lg-screen:flex-row sm-screen:flex-col',
          )}>
          <div
            className={cn(
              'sm-screen:static sm-screen:w-auto absolute top-0 w-full',
            )}>
            <TabMenu lang={lang} />
            <MobileTabMenu lang={lang} />
          </div>
          <div>메인 컨텐츠</div>
        </div>
      </div>
      <Header lang={lang} />
      <Footer lang={lang} />
    </main>
  );
};

export default Page;
