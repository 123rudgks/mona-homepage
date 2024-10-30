import dict from '@/dictionaries/footer.json';
import { cn } from '@/lib/utils';

import { FooterNavMenu } from '@/components/Footer/Footer.types';
import { Language } from '@/types/globals.types';
import Link from 'next/link';
import LogoBottomLeft from '../Header/icons/LogoBottomLeft.svg';
import LogoBottomRight from '../Header/icons/LogoBottomRight.svg';
import LogoText from '../Header/icons/LogoText.svg';
import LogoTopLeft from '../Header/icons/LogoTopLeft.svg';
import LogoTopRight from '../Header/icons/LogoTopRight.svg';
import Blog from './icons/Blog.svg';
import ChevronUp from './icons/ChevronUp.svg';
import Instagram from './icons/Instagram.svg';
import LogoBottomText from './icons/LogoBottomText.svg';
import Youtube from './icons/Youtube.svg';
type Props = {
  darkMode?: boolean;
  lang: Language;
};

const Footer = ({ darkMode, lang }: Props) => {
  return (
    <div
      className={cn(
        'xl-screen:px-[100px] xl-screen:pt-[100px] xl-screen:pb-[49px]',
        'md-screen:py-[100px] md-screen:px-[44px]',
        'sm-screen:py-[60px] sm-screen:px-[44px] sm-screen:block',
        'py-[60px] w-full flex flex-col items-center relative',
        darkMode ? 'bg-grayscale-black' : 'bg-grayscale-white',
      )}>
      {/* Logo + Nav menu section */}
      <div
        className={cn(
          'flex flex-col gap-20 ',
          'xl-screen:flex-row xl-screen:items-start xl-screen:gap-[100px]',
          'sm-screen:pb-12',
        )}>
        {/* Logo sections */}
        <div
          className={cn(
            'w-[126px] flex items-end justify-between gap-2 ',
            'xl-screen:w-[290px]',
            'md-screen:mb-0 ',
            'sm-screen:w-[200px] sm-screen:mb-5',
            'mb-2',
          )}>
          <div className="w-7 h-7 sm-screen:w-11 sm-screen:h-11 xl-screen:w-16 xl-screen:h-16 ">
            <div className="flex justify-between">
              <LogoTopLeft />
              <LogoTopRight
                className={cn(darkMode ? '[&>path]:fill-white' : '')}
              />
            </div>
            <div className="flex justify-between transition-colors">
              <LogoBottomLeft
                className={cn(darkMode ? '[&>path]:fill-white' : '')}
              />
              <LogoBottomRight
                className={cn(darkMode ? '[&>path]:fill-white' : '')}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between pt-[2px]  h-7  sm-screen:h-11  xl-screen:h-16">
            <div className="w-[90px] h-5 sm-screen:w-[140px] sm-screen:h-[30px] xl-screen:w-52 xl-screen:h-11">
              <LogoText className={cn(darkMode ? '[&>path]:fill-white' : '')} />
            </div>
            <div className="w-[90px] h-1 sm-screen:w-[140px] sm-screen:h-[6px] xl-screen:w-52 xl-screen:h-2">
              <LogoBottomText
                className={cn(darkMode ? '[&>path]:fill-white' : '')}
              />
            </div>
          </div>
        </div>
        {/* Nav menu section */}
        <div className="w-full hidden md-screen:flex">
          {[
            {
              title: dict['기업정보'][lang],
              menu: [
                {
                  text: [dict['회사소개'][lang]],
                  path: ['/company-info/introduction'],
                },
                {
                  text: [dict['연혁'][lang]],
                  path: ['/company-info/history'],
                },
                {
                  text: [dict['구성원'][lang]],
                  path: ['/company-info/members'],
                },
                {
                  text: [dict['오시는 길'][lang]],
                  path: ['/company-info/location'],
                },
              ],
            },
            {
              title: dict['사업영역'][lang],
              menu: [
                {
                  label: dict['제조 솔루션'][lang],
                  text: [
                    dict['초고속 배터리 진단 솔루션'][lang],
                    dict['모듈 고장 진단 솔루션'][lang],
                  ],
                  path: [
                    '/business-area/high-speed-battery',
                    '/business-area/module-fault',
                  ],
                },
                {
                  label: dict['유지 보수 및 SOH 진단'][lang],
                  text: [
                    dict['모듈 정비 및 진단'][lang],
                    dict['전기차 SOH 진단'][lang],
                  ],
                  path: [
                    '/business-area/module-maintenance',
                    '/business-area/electric-vehicle-soh',
                  ],
                },
                {
                  text: [dict['사용 후 배터리'][lang]],
                  path: ['/business-area/after-use-battery'],
                },
                {
                  text: [dict['수소'][lang]],
                  path: ['/business-area/hydrogen'],
                },
              ],
            },
            {
              title: dict['제품정보'][lang],
              menu: [
                {
                  text: [dict['초고속 배터리 진단 솔루션'][lang]],
                  path: ['/product-info/battery-capacity'],
                },
                {
                  text: [dict['배터리 용량 예측 솔루션'][lang]],
                  path: ['/product-info/high-speed-battery'],
                },
                {
                  text: [dict['수소 시스템 및 진단'][lang]],
                  path: ['/product-info/hydrogen-system'],
                },
              ],
            },
            {
              title: dict['홍보센터'][lang],
              menu: [
                {
                  text: ['NEWS'],
                  path: ['/promotion-center/news'],
                },
                {
                  text: [dict['투자정보'][lang]],
                  path: ['/promotion-center/investment-info'],
                },
                {
                  text: [dict['문의하기'][lang]],
                  path: ['/promotion-center/contact-us'],
                },
              ],
            },
            {
              title: dict['인재채용'][lang],
              menu: [
                {
                  text: [dict['채용공고'][lang]],
                  path: ['/recruitment/notice'],
                },
              ],
            },
          ].map((item) => (
            <NavMenu key={item.title} darkMode={darkMode} {...item} />
          ))}
        </div>
      </div>
      {/* Bottom section */}
      <div className="w-[329px] mt-4 sm-screen:w-full sm-screen:mb-0 mb-[72px]">
        <DivisionLine darkMode={darkMode} className="w-full h-[1px]" />
        <div
          className={cn(
            'flex mt-6',
            darkMode ? 'text-grayscale-white' : 'text-grayscale-black',
            'sm-screen:flex-row ',
            'flex-col justify-between items-center gap-2',
          )}>
          <span className="sm-screen:typo-BodyLargeRegular typo-BodySmallRegular">
            Copyright ⓒ 2024 MONA All rights reserved.
          </span>
          {/* policy + icon section */}
          <div className="flex gap-6 flex-col sm-screen:flex-row sm-screen:gap-8 ">
            {/* policy section */}
            <span className="sm-screen:typo-BodyLargeMedium typo-BodySmallRegular flex items-center gap-[11px]">
              <span>개인정보처리방침</span>
              <span
                className={cn('w-[2px] h-[12px]', {
                  'bg-blackAlpha-30': !darkMode,
                  'bg-whiteAlpha-30': darkMode,
                })}
              />
              <span>이용약관</span>
            </span>
            {/* icon section */}
            <span className="flex gap-3 ">
              {[
                {
                  key: 'instagram',
                  icon: (
                    <Instagram
                      className={cn(darkMode ? '[&>g>path]:fill-white' : '')}
                    />
                  ),
                },
                {
                  key: 'blog',
                  icon: (
                    <Blog
                      className={cn(darkMode ? '[&>path]:fill-white' : '')}
                    />
                  ),
                },
                {
                  key: 'youtube',
                  icon: (
                    <Youtube
                      className={cn(darkMode ? '[&>path]:fill-white ' : '')}
                    />
                  ),
                },
              ].map((item) => (
                <IconBtn
                  key={item.key}
                  darkMode={darkMode}
                  icon={item.icon}></IconBtn>
              ))}
            </span>
          </div>
        </div>
      </div>
      <span
        className={cn(
          'absolute',
          'xl-screen:bottom-[145px] xl-screen:right-[100px]',
          'md-screen:bottom-[192px] md-screen:right-11',
          'sm-screen:bottom-[152px] sm-screen:right-11 sm-screen:translate-x-0',
          'bottom-[60px] right-1/2 translate-x-1/2',
        )}>
        <IconBtn
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          darkMode={darkMode}
          icon={
            <ChevronUp className={cn(darkMode ? '[&>path]:fill-white ' : '')} />
          }
        />
      </span>
    </div>
  );
};

const IconBtn = ({
  darkMode,
  icon,
  onClick,
}: {
  darkMode?: boolean;
  icon: JSX.Element;
  onClick?: () => void;
}) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        'w-11 h-11 rounded-full flex items-center justify-center cursor-pointer',
        darkMode ? 'bg-whiteAlpha-10' : 'bg-blackAlpha-10',
      )}>
      {icon}
    </span>
  );
};
export const NavMenu = ({ darkMode, title, menu }: FooterNavMenu) => {
  return (
    <div className="flex  flex-1 h-[390px]">
      <DivisionLine darkMode={darkMode} className={cn('w-[1px] h-full')} />
      <div className="flex flex-col gap-6  pl-[30px]">
        <span
          className={cn(
            'typo-Display1Bold',
            darkMode ? 'text-grayscale-white' : 'text-grayscale-black',
          )}>
          {title}
        </span>
        <div className="flex flex-col gap-7">
          {menu.map((item) => (
            <div
              key={item.text[0]}
              className={cn(
                'gap-2 flex flex-col',
                darkMode ? 'text-whiteAlpha-70' : 'text-blackAlpha-50',
              )}>
              {item.label && (
                <label className={cn('typo-BodyLargeMedium')}>
                  {item.label}
                </label>
              )}
              <div className={cn('flex flex-col gap-2 typo-TitleBold')}>
                {item.text.map((text, idx) => (
                  <Link
                    key={text}
                    href={item.path[idx]}
                    className="cursor-pointer hover:text-primary">
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const DivisionLine = ({
  darkMode,
  className,
  ...props
}: { darkMode?: boolean } & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        { 'bg-whiteAlpha-10': darkMode, 'bg-blackAlpha-10': !darkMode },
        className,
      )}
    />
  );
};
export default Footer;
