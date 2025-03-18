'use client';
import Headquarters from '@/app/images/company-info/location/Headquarters.png'
import ResearchInstitute from '@/app/images/company-info/location/ResearchInstitute.png'
import Company from '@/app/images/company-info/location/Company.png'
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import dict from '@/dictionaries/company-info/location.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });

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
          <div className={cn('sm-screen:static sm-screen:w-auto ')}>
            <TabMenu lang={lang} />
          </div>
          <ContentBox title={currentMenu.text} label={currentMenu.label}>
            <div className={cn('flex flex-col ', 'gap-[58px] ')}>
              <LocationBox
                label={dict['본사'][lang]}
                address={dict['본사_addr'][lang]}
                map={<Image src={Headquarters} alt="" />}
              />
              <LocationBox
                label={dict['연구소'][lang]}
                address={dict['연구소_addr'][lang]}
                map={<Image src={ResearchInstitute} alt="" />}
              />
              <LocationBox
                label={dict['자사'][lang]}
                address={dict['자사_addr'][lang]}
                map={<Image src={Company} alt="" />}
              />
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} />
      <Footer lang={lang} />
    </main>
  );
};

const LocationBox = ({
  label,
  address,
  map,
}: {
  label: string;
  address: string;
  map: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 pt-5 border-t border-grayscale-200',
        'sm-screen:gap-8 sm-screen:pt-11',
      )}>
      <div>{map}</div>
      <div className={cn('flex flex-col gap-5')}>
        <span
          className={cn(
            'bg-[#EC770010] text-primary w-fit py-2 px-7 rounded-full',
            'typo-HeadlineBold',
          )}>
          {label}
        </span>
        <div className={cn('typo-Display1Bold')}>{address}</div>
      </div>
    </div>
  );
};
export default Page;
