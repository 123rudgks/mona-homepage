'use client';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import { Button } from '@/components/ui/button';
import useGetInfos from '@/hooks/useGetInfos';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const { content } = useGetInfos({
    infoTag: 'hydrogen',
    infoType: 'business',
  });

  return (
    <main>
      <div className="border-b border-grayscale-200 w-full sm-screen:pt-[100px] pt-16"></div>

      <ContentSection mobileTabMenuComp={<MobileTabMenu lang={lang} />}>
        <div
          className={cn(
            'lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end',
          )}>
          <Button
            variant={'outline'}
            size={'lg'}
            theme={'primary'}
            className="w-[100px] rounded-full">
            편집
          </Button>
        </div>
        <div
          className={cn(
            'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
          )}>
          <div className={cn('sm-screen:static sm-screen:w-auto ')}>
            <TabMenu lang={lang} />
          </div>
          <ContentBox title={content.title} label={currentMenu.label}>
            <div
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: content.content,
              }}
            />
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

export default Page;
