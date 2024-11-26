'use client';
import RecruitSection1 from '@/app/images/recruitment/notice/RecruitSection1.png';
// import BackEndIcon from '@/app/svgs/recruitment/notice/BackEndIcon.svg';
import BatteryIcon from '@/app/svgs/recruitment/notice/BatteryIcon.svg';
import BMSIcon from '@/app/svgs/recruitment/notice/BMSIcon.svg';
import ElectricIcon from '@/app/svgs/recruitment/notice/ElectricIcon.svg';
import FrontEndIcon from '@/app/svgs/recruitment/notice/FrontEndIcon.svg';
import HardwareIcon from '@/app/svgs/recruitment/notice/HardwareIcon.svg';
import SalesIcon from '@/app/svgs/recruitment/notice/SalesIcon.svg';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import { MobileTabMenu } from '@/components/TabMenu';
import { Button } from '@/components/ui/button';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { ChevronRight, HomeIcon } from 'lucide-react';
import { FC, SVGProps } from 'react';

type Props = {};

interface RecruitCardProps {
  label: string;
  position: string;
  skill?: string[];
  Icon: FC<SVGProps<SVGElement>>;
}
const RecruitCardsData: RecruitCardProps[] = [
  {
    label: 'R&D',
    position: 'Front End',
    skill: ['웹', 'GUI'],
    Icon: FrontEndIcon,
  },
  {
    label: 'R&D',
    position: 'Back End',
    skill: ['서버', 'AI'],
    Icon: FrontEndIcon,
  },
  {
    label: 'R&D',
    position: '전기 자동차 BMS',
    Icon: BMSIcon,
  },
  {
    label: 'R&D',
    position: '전력전자',
    skill: ['전 분야'],
    Icon: ElectricIcon,
  },

  {
    label: 'R&D',
    position: '하드웨어',
    skill: ['전 분야'],

    Icon: HardwareIcon,
  },
  {
    label: 'R&D',
    position: '배터리',
    skill: ['전 분야'],

    Icon: BatteryIcon,
  },

  {
    label: '기술영업직',
    position: 'Sales',
    skill: ['경력직'],

    Icon: SalesIcon,
  },
];
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
          <ContentBox title={currentMenu.text} label={currentMenu.label}>
            <div className="flex flex-col gap-11 sm-screen:gap-20">
              <div
                className={cn(
                  'w-full h-[436px]  overflow-hidden rounded-xl rounded-tr-[100px] bg-grayscale-300 flex flex-col',
                  'sm-screen:h-[454px] sm-screen:flex-row',
                  'lg-screen:mt-9',
                )}>
                <div
                  className={cn('flex-1 bg-navy-700 relative overflow-hidden')}>
                  <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 aspect-square h-[160%] rounded-full bg-gradient-radial from-transparent to-primary opacity-10" />
                  <div
                    className={cn(
                      'whitespace-pre-line',
                      'typo-TitleBold text-white p-8',
                      'sm-screen:typo-Display1Bold sm-screen:p-11',
                      'lg-screen:p-14 lg-screen:typo-Display2Bold',
                    )}>
                    {`MONA는 전 인류 앞에 
                    파도처럼 닥칠 4차 산업혁명, 
그 파도 위에 함께 올라탈 동료를 찾고 있습니다.`}
                  </div>
                </div>
                <div
                  className={cn(
                    `flex-1`,
                    'sm-screen:bg-[center_-20px] sm-screen:bg-[length:1600px] bg-no-repeat',
                    'md-screen:bg-[center_-80px] md-screen:bg-[length:1800px]',
                    'lg-screen:bg-[center_-130px] lg-screen:bg-[length:2000px]',
                    'bg-[center_-80px] bg-[length:1000px]',
                  )}
                  style={{
                    backgroundImage: `url(${RecruitSection1.src})`,
                  }}
                />
              </div>
              <div className={cn('flex flex-col gap-3')}>
                <div
                  className={cn(
                    'text-primary typo-TitleBold flex justify-center',
                    'sm-screen:typo-Display1Bold',
                    'lg-screen:typo-Display2Bold',
                  )}>
                  최고의 동료들이 지원자님을 기다리고 있습니다
                </div>
                <div
                  className={cn(
                    'typo-BodyLargeMedium whitespace-pre-line text-center flex justify-center',
                  )}>
                  {`서울대학교 공학박사 출신 및 국내 대기업 출신의 우수한 연구원들이 일하고 있습니다. 
                2021년 상반기까지 연료전지 관련 각종 성능평가장비, 수소 생산을 위한 평가장비, 촉매성능 평가장비 등 하드웨어 개발 완료라는 목표를 성공적으로 수행하였습니다.
                이제는 소프트웨어, AI플랫폼으로의 전환이라는 새로운 깃발을 향해 달려가고 있습니다. 지원자님께서 저희와 함께 하실 일들입니다.`}
                </div>
              </div>
              <div
                className={cn(
                  'grid grid-cols-1 gap-3',
                  'sm-screen:grid-cols-2 sm-screen:gap-5',
                  'lg-screen:grid-cols-4',
                )}>
                {RecruitCardsData.map((data, i) => (
                  <RecruitCard key={data.position} {...data} />
                ))}
                <div
                  className={cn(
                    'w-full rounded-3xl border-grayscale-200 border h-[142px] p-5 relative flex flex-col justify-between',
                    'sm-screen:h-[280px] sm-screen:p-7 ',
                    'bg-gradient-to-b from-primary  to-[#EC7700CC] ',
                  )}>
                  <div
                    className={cn(
                      'typo-TitleBold text-white flex justify-center',
                      'sm-screen:typo-Display1Bold sm-screen:flex-col sm-screen:justify-start',
                    )}>
                    <span className="whitespace-pre">{`MONA와 함께 `}</span>
                    <span>{`미래를 만들어가요`}</span>
                  </div>
                  <Button
                    theme={'white'}
                    variant={'ghost'}
                    size={'lg'}
                    className={cn('h-[52px]')}>
                    지원하기
                    <ChevronRight className={cn('h-4 w-4')} />
                  </Button>
                </div>
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

const RecruitCard = ({ label, position, Icon, skill }: RecruitCardProps) => {
  return (
    <div
      className={cn(
        'w-full rounded-3xl border-grayscale-200 border h-[142px] p-5 relative flex flex-col gap-3',
        'sm-screen:h-[280px] sm-screen:p-7 gap-5',
      )}>
      <div>
        <span
          className={cn(
            ' typo-BodyLargeBold text-primary py-1 px-[10px] rounded-full bg-[#EC770010]',
          )}>
          {label}
        </span>
      </div>

      <div className={cn('flex flex-col', 'sm-screen:gap-1')}>
        <span className={cn('typo-HeadlineBold', 'typo-Display1Bold')}>
          {position}
        </span>
        <span className="typo-BodyLargeMedium">
          {skill?.map((data, i) => {
            return skill.length - 1 !== i ? `${data} · ` : data;
          })}
        </span>
      </div>

      <div
        className={cn(
          'absolute right-5 bottom-5 w-[30px] h-[30px]',
          'w-[53px] h-[53px]',
          'sm-screen:right-7 sm-screen:bottom-7',
        )}>
        {<Icon />}
      </div>
    </div>
  );
};

export default Page;
