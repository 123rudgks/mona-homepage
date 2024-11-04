'use client';
import AISolutionBubble from '@/app/images/company-info/introduction/AI_Solution_Bubble.png';
import CheckedElectron from '@/app/images/company-info/introduction/CheckedElectron.png';
import Electron from '@/app/images/company-info/introduction/Electron.png';
import HomeIcon from '@/app/svgs/HomeIcon.svg';
import ShineIcon from '@/app/svgs/Shine.svg';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import dict from '@/dictionaries/company-info/introduction.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import Image from 'next/image';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });

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
          <ContentBox
            title={'RAPID & ACCURATE BATTERY DIAGNOSIS'}
            subTitle={
              <div className="flex items-center gap-1">
                Powered by AI
                <span className="w-[19px] h-[19px]">
                  <ShineIcon className="[&_path]:fill-navy-700" />
                </span>
              </div>
            }>
            <div className="typo-BodyLargeRegular">
              {dict.content_1[lang]}
              <br />
              <br />
              {dict.content_2[lang]}
              <br />
              <br />
              <AISolutionImgCard />
              <div className="sm-screen:typo-Display3Bold typo-Display1Bold">
                {dict.content_3[lang]}
              </div>
              <br />
              <br />
              {dict.content_4[lang]}
              <br />
              <br />
              {dict.content_5[lang]}
              <br />
              <br />
              {dict.content_6[lang]}
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} />
      <Footer lang={lang} />
    </main>
  );
};

const AISolutionImgCard = () => {
  return (
    <div
      className={cn(
        'w-full h-[208px] rounded-[8px] bg-gradient-to-b from-navy-700 to-primary-darker relative overflow-hidden',
        'sm-screen:rounded-2xl sm-screen:h-[446px]',
        'md-screen:h-[506px]',
        'xl-screen:h-[544px]',
      )}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 xl-screen:w-[310px] xl-screen:h-[512px] md-screen:w-[288px] md-screen:h-[477px] sm-screen:w-[255px] sm-screen:h-[420px] w-[97px] h-[160px] ">
        <Image src={AISolutionBubble.src} alt="AI_Solution_Bubble" fill />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 xl-screen:bottom-[66px] md-screen:bottom-[60px] sm-screen:bottom-[52px] bottom-[28px] flex xl-screen:gap-[34px] md-screen:gap-[31px] sm-screen:gap-[28px] gap-[10px]">
        {Array(6)
          .fill(0, 0, 6)
          .map((i, idx) => (
            <span
              key={'left electron ' + idx}
              className="relative xl-screen:w-[116px] xl-screen:h-[172px] md-screen:w-[108px] md-screen:h-[160px] sm-screen:w-[96px] sm-screen:h-[141px] w-[54px] h-[36px]">
              <Image src={Electron.src} alt="Electron" fill />
            </span>
          ))}
        <span className="relative xl-screen:w-[116px] xl-screen:h-[172px] md-screen:w-[108px] md-screen:h-[160px] sm-screen:w-[96px] sm-screen:h-[141px] w-[54px] h-[36px]">
          <Image src={CheckedElectron.src} alt="CheckedElectron" fill />
        </span>
        {Array(2)
          .fill(0, 0, 2)
          .map((i, idx) => (
            <span
              key={'left electron ' + idx}
              className="relative xl-screen:w-[116px] xl-screen:h-[172px] md-screen:w-[108px] md-screen:h-[160px] sm-screen:w-[96px] sm-screen:h-[141px] w-[54px] h-[36px]">
              <Image src={Electron.src} alt="Electron" fill />
            </span>
          ))}
      </div>
      <div className="absolute bottom-0 w-full xl-screen:h-[66px] md-screen:h-[60px] sm-screen:h-[52px] h-[28px] bg-whiteAlpha-10" />
    </div>
  );
};

export default Page;
