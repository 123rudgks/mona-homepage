'use client';
import History2021 from '@/app/images/company-info/history/History2021.png';
import History2022 from '@/app/images/company-info/history/History2022.png';
import History2023 from '@/app/images/company-info/history/History2023.png';
import History2024 from '@/app/images/company-info/history/History2024.png';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import dict from '@/dictionaries/company-info/history.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { HomeIcon } from 'lucide-react';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });

  const Histories = [
    {
      year: 2024,
      img: History2024,
    },
    {
      year: 2023,
      img: History2023,
    },
    {
      year: 2022,
      img: History2022,
    },
    {
      year: 2021,
      img: History2021,
    },
  ];

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
            <div
              className={cn(
                'flex flex-col gap-[38px]',
                'sm-screen:gap-[66px]',
              )}>
              <HistoryCard
                year="2024"
                months={[
                  {
                    month: '2024.06',
                    desc: dict['2024.06'][lang],
                  },
                  {
                    month: '2024.05',
                    desc: dict['2024.05'][lang],
                  },
                ]}
                img={
                  <div
                    className={cn(
                      `w-full h-full`,
                      'sm-screen:bg-[center_-30px] sm-screen:bg-[length:778px] bg-no-repeat',
                      'md-screen:bg-[center_-55px] md-screen:bg-[length:1024px]',
                      'lg-screen:bg-[center_-25px] lg-screen:bg-[length:918px]',
                      'bg-[center_-25px] bg-[length:700px]',
                    )}
                    style={{
                      backgroundImage: `url(${History2024.src})`,
                    }}
                  />
                }
              />
              <HistoryCard
                year="2023"
                months={[
                  {
                    month: '2023.11',
                    desc: dict['2023.11_3'][lang],
                  },
                  {
                    month: '2023.11',
                    desc: dict['2023.11_2'][lang],
                  },
                  {
                    month: '2023.11',
                    desc: dict['2023.11_1'][lang],
                  },
                  {
                    month: '2023.09',
                    desc: dict['2023.09'][lang],
                  },
                  {
                    month: '2023.08',
                    desc: dict['2023.08'][lang],
                  },
                  {
                    month: '2023.02',
                    desc: dict['2023.02'][lang],
                  },
                ]}
                img={
                  <div
                    className={cn(
                      `w-full h-full`,
                      'sm-screen:bg-[center_1px] sm-screen:bg-[length:778px] bg-no-repeat',
                      'md-screen:bg-[center_-15px] md-screen:bg-[length:1024px]',
                      'lg-screen:bg-[center_-2px] lg-screen:bg-[length:918px]',
                      'bg-[center_-25px] bg-[length:700px]',
                    )}
                    style={{
                      backgroundImage: `url(${History2023.src})`,
                    }}
                  />
                }
              />
              <HistoryCard
                year="2022"
                months={[
                  {
                    month: '2022.12',
                    desc: dict['2022.12_2'][lang],
                  },
                  {
                    month: '2022.12',
                    desc: dict['2022.12_1'][lang],
                  },
                  {
                    month: '2022.10',
                    desc: dict['2022.10'][lang],
                  },
                  {
                    month: '2022.05',
                    desc: dict['2022.05'][lang],
                  },
                  {
                    month: '2022.04',
                    desc: dict['2022.04'][lang],
                  },
                  {
                    month: '2022.03',
                    desc: dict['2022.03'][lang],
                  },
                ]}
                img={
                  <div
                    className={cn(
                      `w-full h-full`,
                      // 'sm-screen:bg-[center_10px] sm-screen:bg-[length:778px] bg-no-repeat',
                      // 'md-screen:bg-[center_-55px] md-screen:bg-[length:1024px]',
                      // 'lg-screen:bg-[center_-25px] lg-screen:bg-[length:918px]',
                      // 'bg-[center_4px] bg-[length:700px]',
                    )}
                    style={{
                      backgroundImage: `url(${History2022.src})`,
                      backgroundSize: 'cover',
                    }}
                  />
                }
              />
              <HistoryCard
                year="2021"
                months={[
                  {
                    month: '2021.12',
                    desc: dict['2021.12'][lang],
                  },
                  {
                    month: '2021.09',
                    desc: dict['2021.09'][lang],
                  },
                  {
                    month: '2021.08',
                    desc: dict['2021.08'][lang],
                  },
                  {
                    month: '2021.06',
                    desc: dict['2021.06'][lang],
                  },
                  {
                    month: '2021.04',
                    desc: dict['2021.04'][lang],
                  },
                ]}
                img={
                  <div
                    className={cn(
                      `w-full h-full`,
                      'sm-screen:bg-[center_-30px] sm-screen:bg-[length:778px] bg-no-repeat',
                      'md-screen:bg-[center_-55px] md-screen:bg-[length:1024px]',
                      'lg-screen:bg-[center_-25px] lg-screen:bg-[length:918px]',
                      'bg-[center_-25px] bg-[length:700px]',
                    )}
                    style={{
                      backgroundImage: `url(${History2021.src})`,
                    }}
                  />
                }
              />
              <HistoryCard
                year="2020"
                months={[
                  {
                    month: '2020.01',
                    desc: dict['2020.01'][lang],
                  },
                ]}
              />
              <HistoryCard
                year="2019"
                months={[
                  {
                    month: '2019.10',
                    desc: dict['2019.10'][lang],
                  },
                ]}
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

const HistoryCard = ({
  year,
  months,
  img,
}: {
  year: string;
  months: { month: string; desc: string }[];
  img?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 pt-3 border-t border-grayscale-200',
        'sm-screen:flex-row sm-screen:gap-[50px] sm-screen:pt-6',
        'lg-screen:flex-col lg-screen:gap-6 lg-screen:pt-6',
        'xl-screen:flex-row xl-screen:gap-[50px]',
      )}>
      <div
        className={cn(
          'typo-Display1Bold text-primary',
          'sm-screen:typo-Display6Bold',
        )}>
        {year}
      </div>
      <div className="sm-screen:flex-1 sm-screen:pt-3">
        <div className="flex flex-col gap-4">
          {months.map(({ month, desc }) => (
            <div className="flex gap-4" key={month}>
              <span className="typo-BodySmallBold ">{month}</span>
              <span className="typo-BodySmallMedium">{desc}</span>
            </div>
          ))}
        </div>
        {img && (
          <div
            className={cn(
              'w-full h-[240px] mt-5 overflow-hidden rounded-tr-[100px] bg-grayscale-300',
              'sm-screen:h-[300px]',
              'lg-screen:mt-9',
            )}>
            {img}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
