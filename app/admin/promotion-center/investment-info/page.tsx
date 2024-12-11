'use client';
import Logo from '@/app/svgs/company-info/investment-info/Logo.svg';
import Tooltip from '@/app/svgs/company-info/investment-info/Tooltip.svg';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { MobileTabMenu } from '@/components/TabMenu';
import { Button } from '@/components/ui/button';
import dict from '@/dictionaries/company-info/investment-info.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });

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
          <ContentBox title={currentMenu.text} label={currentMenu.label}>
            <div
              className={cn(
                'flex flex-col',
                'border-t border-grayscale-200 pt-3 gap-9',
                'sm-screen:border-none sm-screen:pt-0 sm-screen:gap-11',
              )}>
              <InvestmentBox label={dict['주요정보'][lang]}>
                <div
                  className={cn(
                    'grid',
                    'grid-cols-2 gap-6',
                    'sm-screen:grid-cols-3 sm-screen:gap-9 sm-screen:divide-x ',
                  )}>
                  <InformationCard
                    label={dict['연매출'][lang]}
                    tooltip={dict['연매출_tooltip'][lang]}
                    content={dict['연매출_content'][lang]}
                  />
                  <InformationCard
                    label={dict['투자 진행중'][lang]}
                    content={dict['투자 진행중_content'][lang]}
                  />
                  <InformationCard
                    label={dict['누적 투자유치'][lang]}
                    content={dict['누적 투자유치_content'][lang]}
                  />
                  <InformationCard
                    label={dict['소재지'][lang]}
                    content={dict['소재지_content'][lang]}
                    className="border-none"
                  />
                  <InformationCard
                    label={dict['상태'][lang]}
                    content={dict['상태_content'][lang]}
                  />
                </div>
              </InvestmentBox>
              <InvestmentBox label={dict['제품 및 서비스'][lang]}>
                <div className="flex gap-[22px] sm-screen:gap-[38px]">
                  <div className="sm-screen:w-[73px] w-[58px] aspect-square rounded-xl overflow-hidden">
                    <Logo />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={cn(
                        'typo-TitleBold',
                        'sm-screen:typo-Display1Bold',
                      )}>
                      {dict['제품 및 서비스_content_title'][lang]}
                    </div>
                    <div
                      className={cn(
                        'typo-BodyLargeRegular',
                        'sm-screen:typo-BodyLargeRegular',
                      )}>
                      {dict['제품 및 서비스_content_desc'][lang]}
                    </div>
                  </div>
                </div>
              </InvestmentBox>
              <InvestmentBox label={dict['특허'][lang]} count={8}>
                <div className="h-[314px]"></div>
              </InvestmentBox>
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

const InvestmentBox = ({
  label,
  count,
  children,
}: {
  label: string;
  count?: number;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={'flex gap-1 typo-HeadlineBold sm-screen:typo-Display1Bold'}>
        <div>{label}</div>
        {count !== undefined && (
          <div className={cn('text-primary')}>{count}</div>
        )}
      </div>
      <div className="bg-grayscale-50 rounded-[44px] border border-grayscale-200 p-11">
        {children}
      </div>
    </div>
  );
};

const InformationCard = ({
  label,
  tooltip,
  content,
  className,
}: {
  label: string;
  tooltip?: string;
  content: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-1  sm-screen:items-center sm-screen:py-3',
        className,
      )}>
      <div
        className={cn(
          'flex text-grayscale-700 items-center',
          'typo-BodySmallMedium',
          'sm-screen:typo-TitleMedium',
        )}>
        {label}
        {tooltip && (
          <div className="relative group">
            <Tooltip className="cursor-pointer" />

            <div className="absolute bottom-[-5px] translate-y-full group-hover:block hidden typo-BodySmallMedium text-white py-[6px] px-[11px] bg-blackAlpha-80 w-max max-w-[151px] rounded-[4px]">
              {tooltip}
              <span className="absolute top-0 left-[11px] -translate-y-full   border-[5px] border-transparent border-b-blackAlpha-80" />
            </div>
          </div>
        )}
      </div>
      <div className={cn('typo-TitleBold', 'sm-screen:typo-Display2Bold')}>
        {content}
      </div>
    </div>
  );
};

export default Page;
