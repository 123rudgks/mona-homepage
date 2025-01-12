'use client';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Button } from '@/components/ui/button';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });

  return (
    <main>
      <div className="border-b border-grayscale-200 w-full sm-screen:pt-[100px] pt-16"></div>

      <ContentSection>
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
        <div className={cn('max-w-[1430px] w-full')}>
          <ContentBox title={currentMenu.text} label={'투자정보'}>
            <div className="">
              {Array.from({ length: 5 }).map((_, idx) => (
                <InvestmentRow key={idx} />
              ))}
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

const InvestmentRow = () => {
  return (
    <div className="flex gap-[30px] py-6 border-b border-blackAlpha-10">
      <span className="typo-BodyLargeRegular">2024</span>
      <span className="typo-BodyLargeBold">
        배터리/연료전지 시스템에 적용을 위한 임피던스 모듈 및 AI를 접목한
        진단모델 개발배터리/연료전지 시스템에 적용을 위한 임피던스 모듈 및 AI를
        접목한 진단모델 개발배터리/연료전지 시스템에 적용을 위한 임피던스 모듈
        및 AI를 접목한 진단모델 개발
      </span>
    </div>
  );
};

export default Page;
