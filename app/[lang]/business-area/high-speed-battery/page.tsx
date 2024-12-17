'use client';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HtmlDiv from '@/components/HtmlDiv';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import useGetInfos from '@/hooks/useGetInfos';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { HomeIcon } from 'lucide-react';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const { content } = useGetInfos({
    infoTag: 'high-speed-battery',
    infoType: 'business',
  });

  return (
    <main>
      <BoardSection
        title={currentCategory?.category}
        desc={['RAPID & ACCURATE BATTERY DIAGNOSIS', 'Powered By AI']}
      />
      <ContentSection mobileTabMenuComp={<MobileTabMenu lang={lang} />}>
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
            'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
          )}>
          <div className={cn('sm-screen:static sm-screen:w-auto ')}>
            <TabMenu lang={lang} />
          </div>
          <ContentBox title={content.title} label={currentMenu.label}>
            <HtmlDiv html={content.content} />
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} />
      <Footer lang={lang} />
    </main>
  );
};

export default Page;
