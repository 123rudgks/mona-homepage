'use client';
import Logo from '@/app/svgs/company-info/investment-info/Logo.svg';
import Tooltip from '@/app/svgs/company-info/investment-info/Tooltip.svg';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import { MobileTabMenu } from '@/components/TabMenu';
import dict from '@/dictionaries/company-info/investment-info.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { HomeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const [patents, setPatents] = useState<
    Array<{
      seq: number;
      year: string;
      title: string;
    }>
  >([]);
  useEffect(() => {
    const getPatentsList = async () => {
      const res = await fetch(`/api/patents`);
      const data = await res?.json();
      if (data) {
        const sortedData = data.data.sort(
          (a: { seq: number }, b: { seq: number }) => a.seq - b.seq,
        );
        setPatents(
          sortedData.map((item: any) => {
            return {
              id: 'PATENT_ROW_' + item.seq,
              year: item.year,
              title: item.content,
            };
          }),
        );
      }
    };
    getPatentsList();
  }, []);
  return (
    <main>
      <BoardSection
        title={currentCategory?.category}
        desc={['RAPID & ACCURATE ENERGY DIAGNOSIS', 'Powered By AI']}
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
              <InvestmentBox label={dict['특허'][lang]} count={patents.length}>
                <div className="min-h-[314px]">
                  {patents.map((_, idx) => (
                    <div
                      key={_.seq}
                      className="flex gap-[30px] py-6 border-b border-blackAlpha-10">
                      <span className="typo-BodyLargeRegular">{_.year}</span>
                      <span className="typo-BodyLargeBold">{_.title}</span>
                    </div>
                  ))}
                </div>
              </InvestmentBox>
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} />
      <Footer lang={lang} />
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
