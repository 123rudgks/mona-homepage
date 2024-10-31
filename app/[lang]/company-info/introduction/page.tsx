'use client';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  return (
    <main>
      <div className="h-[545px] bg-navy-700">사업 영역</div>
      <div className={cn('relative sm-screen:pt-0 pt-[52px] h-[1000px]')}>
        <div className={cn('lg-screen:h-[100px] sm-screen:h-20 h-[60px] ')}>
          작은 라벨
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
