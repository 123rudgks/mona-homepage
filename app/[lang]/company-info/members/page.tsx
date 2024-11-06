'use client';
import User from '@/app/svgs/company-info/member/user.svg';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import TabMenu, { MobileTabMenu } from '@/components/TabMenu';
import dict from '@/dictionaries/company-info/member.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { HomeIcon } from 'lucide-react';

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
          <ContentBox title={currentMenu.text} label={currentMenu.label}>
            <div
              className={cn(
                'w-full border-t border-grayscale-200 grid grid-cols-1 gap-4 pt-4',
                'min-[558px]:grid-cols-2 min-[558px]:gap-4',
                'sm-screen:pt-11',
                'md-screen:grid-cols-3 md-screen:gap-6',
                'lg-screen:grid-cols-2 lg-screen:gap-6',
                'xl-screen:grid-cols-3 xl-screen:gap-6',
              )}>
              <MemberCard
                position={dict['장익환_position'][lang]}
                name="장익황"
                engName="Chang Ikwhang"
                desc={[
                  dict['장익환_desc1'][lang],
                  dict['장익환_desc2'][lang],
                  dict['장익환_desc3'][lang],
                  dict['장익환_desc4'][lang],
                ]}
              />

              <MemberCard
                position={dict['송창희_position'][lang]}
                name="송창희"
                engName="Song Changhee"
                desc={[
                  dict['송창희_desc1'][lang],
                  dict['송창희_desc2'][lang],
                  dict['송창희_desc3'][lang],
                ]}
              />
              <MemberCard
                position={dict['김기한_position'][lang]}
                name="김기한"
                engName="Kim Kihan"
                desc={[
                  dict['김기한_desc1'][lang],
                  dict['김기한_desc2'][lang],
                  dict['김기한_desc3'][lang],
                ]}
              />
              <MemberCard
                position={dict['염태균_position'][lang]}
                name="염태균"
                engName="Youm Taegyun"
                desc={[
                  dict['염태균_desc1'][lang],
                  dict['염태균_desc2'][lang],
                  dict['염태균_desc3'][lang],
                ]}
              />
              <MemberCard
                position={dict['김영범_position'][lang]}
                name="김영범"
                engName="Kim Youngbum"
                desc={[
                  dict['김영범_desc1'][lang],
                  dict['김영범_desc2'][lang],
                  dict['김영범_desc3'][lang],
                ]}
              />
              <MemberCard
                position={dict['차석원_position'][lang]}
                name="차석원"
                engName="Cha Sukwon"
                desc={[
                  dict['차석원_desc1'][lang],
                  dict['차석원_desc2'][lang],
                  dict['차석원_desc3'][lang],
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

const MemberCard = ({
  position,
  name,
  engName,
  desc,
}: {
  position: string;
  name: string;
  engName: string;
  desc: string[];
}) => {
  return (
    <div
      className={cn(
        'p-7 bg-[hsl(30_100%_46/3%)] rounded-tr-[100px] relative flex flex-col gap-3 ',
        'min-w-[271px] h-[316px]',
        'sm-screen:h-[410px] sm-screen:gap-4',
        'lg-screen:h-[424px]',
      )}>
      <div
        className={cn(
          'text-primary ',
          'typo-BodyLargeBold',
          'sm-screen:typo-HeadlineBold',
        )}>
        {position}
      </div>
      <div>
        <div className={cn('typo-TitleBold', 'sm-screen:typo-Display1Bold')}>
          {name}
        </div>
        <div
          className={cn('typo-BodyLargeMedium', 'sm-screen:typo-TitleMedium')}>
          {engName}
        </div>
      </div>

      <div>
        {desc.map((d, i) => (
          <div
            key={i}
            className={cn(
              'typo-BodySmallRegular',
              'sm-screen:typo-BodySmallMedium',
            )}>
            {d}
          </div>
        ))}
      </div>
      <User className="absolute right-7 bottom-7" />
    </div>
  );
};

export default Page;
