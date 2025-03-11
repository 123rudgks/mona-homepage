'use client';
import Tooltip from '@/app/svgs/company-info/investment-info/Tooltip.svg';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import { MobileTabMenu } from '@/components/TabMenu';
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
            사업 제휴 페이지
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
