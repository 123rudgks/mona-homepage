'use client';
import AISolutionBubble from '@/app/images/company-info/introduction/AI_Solution_Bubble.png';
import CheckedElectron from '@/app/images/company-info/introduction/CheckedElectron.png';
import Electron from '@/app/images/company-info/introduction/Electron.png';
import Section3_AI솔루션 from '@/app/images/main/Section3_AI솔루션.png';
import Section3_데이터분석 from '@/app/images/main/Section3_데이터분석.png';
import Section3_빅데이터 from '@/app/images/main/Section3_빅데이터.png';
import Section3_컨버전스 from '@/app/images/main/Section3_컨버전스.png';
import Section3_하드웨어 from '@/app/images/main/Section3_하드웨어.png';
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
import mainDict from '@/dictionaries/main.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import Image from 'next/image';

type Props = {};

const OperationCardTitles: {
  ko: Partial<keyof typeof mainDict>;
  en: string;
}[] = [
  { ko: 'AI 솔루션', en: 'AI Solution' },
  { ko: '데이터 분석', en: 'Data Analysis' },
  { ko: '빅데이터', en: 'Big Data' },
  { ko: '하드웨어 디자인', en: 'Hardware Design' },
  { ko: '컨버전스', en: 'Convergence' },
];
const OperationCardImgs: {
  [str in Partial<keyof typeof mainDict>]?: string;
} = {
  'AI 솔루션': Section3_AI솔루션.src,
  '데이터 분석': Section3_데이터분석.src,
  빅데이터: Section3_빅데이터.src,
  컨버전스: Section3_컨버전스.src,
  '하드웨어 디자인': Section3_하드웨어.src,
};
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
              <div className="flex items-center gap-1 text-navy-700">
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

              <div
                className={cn(
                  'grid',
                  'md-screen:grid-cols-5',
                  'min-[960px]:grid-cols-4',
                  'sm-screen:grid-cols-3 sm-screen:gap-[14px] sm-screen:my-[60px]',
                  'grid-cols-2 gap-2 my-9',
                )}>
                <AISolutionImgCard />
                {OperationCardTitles.map((item, idx) => {
                  const src = OperationCardImgs[item.ko];
                  return (
                    <OperationCard
                      key={'operation card' + item.ko}
                      label={item.en}
                      title={item.ko}
                      desc={mainDict[item.ko][lang]}
                      img={src}
                    />
                  );
                })}
              </div>
              <div className="sm-screen:typo-Display3Bold typo-Display1Bold">
                {dict.content_3[lang]}
              </div>

              <br />
              <br />
              <div className="text-blackAlpha-70">
                {' '}
                ㅇ
                <br />
                <br />
                {dict.content_5[lang]}
                <div className="w-full aspect-[25/14] rounded-2xl overflow-hidden mb-5 mt-9">
                  <iframe
                    src="https://player.vimeo.com/video/761694548?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    title="1920ver"
                    className="w-full h-full"
                  />
                </div>
                <br />
                <br />
                {dict.content_6[lang]}
              </div>
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
        'w-full h-[208px] rounded-[8px] bg-gradient-to-b from-navy-700 to-primary-darker relative overflow-hidden ',
        'sm-screen:rounded-2xl sm-screen:h-[446px] sm-screen:col-span-3',
        'min-[960px]:col-span-4',
        'md-screen:h-[506px] md-screen:col-span-5',
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

const OperationCard = ({
  title,
  label,
  desc,
  img,
}: {
  title: string;
  label: string;
  desc: string;
  img?: string;
}) => {
  return (
    <div
      className={cn(
        'inline-block bg-gradient-to-b from-navy-700 to-primary-darker col-span-1',
        'h-[208px] rounded-[8px] py-5 px-[22px] relative',
        'sm-screen:h-[226px] sm-screen:rounded-2xl',
      )}>
      <div className={cn('flex flex-col gap-1')}>
        <span
          className={cn(
            'text-primary typo-MenuMedium',
            'sm-screen:typo-BodyCaptionMedium',
          )}>
          {label}
        </span>
        <span
          className={cn(
            'text-white typo-BodyLargeBold',
            'sm-screen:typo-HeadlineBold',
          )}>
          {title}
        </span>
        <span
          className={cn(
            'text-whiteAlpha-50 typo-MenuRegular',
            'sm-screen:typo-MenuRegular',
          )}>
          {desc}
        </span>
      </div>
      {img !== undefined && (
        <span
          className={cn(
            'w-[75px] aspect-square absolute opacity-50 bottom-4 right-[20px]',
          )}>
          <Image src={img} alt={title} fill />
        </span>
      )}
    </div>
  );
};

export default Page;
