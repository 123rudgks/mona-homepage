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
import { Language, PartnerData } from '@/types/globals.types';
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {};
const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const [logos, setLogos] = useState<
    Array<PartnerData>
  >([]);
  useEffect(() => {
    const getLogos = async () => {
      const res = await fetch(`/api/partners/tech`);
      const data = await res?.json();
      if (data) {
        const sortedData: Array<PartnerData> = data.data.sort(
          (a: { seq: number }, b: { seq: number }) => a.seq - b.seq,
        );
        setLogos(
          sortedData
        );
      }
    };
    getLogos();
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
              {
                component: '기술 협력',
                id: 'tech-cooperation',
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
              <InvestmentBox label={'기업 및 대학'}>
                <div
                  className={cn(
                    'grid',
                    'grid-cols-2 gap-6',
                    'sm-screen:grid-cols-3 sm-screen:gap-9 [&>*:not(:nth-child(3n+1))]:sm-screen:border-l [&>*:nth-child(3n+1)]:sm-screen:pl-0',
                  )}>
                  {logos.map(logo => <InformationCard
                    key={logo.id}
                    src={logo.url}
                  />)}
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
      <div className="bg-grayscale-50 rounded-[44px] border border-grayscale-200 lg-screen:p-11 p-8">
        {children}
      </div>
    </div>
  );
};

const InformationCard = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'sm-screen:py-3 w-full h-full pl-6 sm-screen:pl-9 ',
        className,
      )}>
      <div className='w-full h-full py-3 bg-white flex justify-center items-center'>

        <div className='relative  lg-screen:w-[258px] w-[200px] aspect-[2/1] '>
          <Image src={src} alt="logo" fill className='object-contain' />
        </div>
      </div>

    </div>
  );
};

export default Page;
