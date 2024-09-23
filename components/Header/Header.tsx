'use client';
import { Language } from '@/types/globals.types';
import dict from '../../dictionaries/header.json';
import LogoBottomLeft from './icons/LogoBottomLeft.svg';
import LogoBottomRight from './icons/LogoBottomRight.svg';
import LogoText from './icons/LogoText.svg';
import LogoTopLeft from './icons/LogoTopLeft.svg';
import LogoTopRight from './icons/LogoTopRight.svg';

import { cn } from '@/lib/utils';

type Props = {
  darkMode?: boolean;
  lang: Language;
};

const Header = ({ darkMode, lang }: Props) => {
  return (
    <div
      className={cn(
        ' w-full md:h-[100px]  h-16  fixed top-0 flex items-center justify-center transition-colors',
        darkMode ? 'bg-transparent' : 'bg-white',
      )}>
      <div className={cn('flex justify-between w-full  max-w-[1632px] ')}>
        <div className="ml-11 flex items-end justify-between gap-2 ">
          <div className="w-[23px] h-[23px]">
            <div className="flex justify-between">
              <LogoTopLeft />
              <LogoTopRight
                className={cn(
                  darkMode ? '[&>path]:fill-white' : '',
                  '[&>path]:transition-colors',
                )}
              />
            </div>
            <div className="flex justify-between transition-colors">
              <LogoBottomLeft
                className={cn(
                  darkMode ? '[&>path]:fill-white' : '',
                  '[&>path]:transition-colors',
                )}
              />
              <LogoBottomRight
                className={cn(
                  darkMode ? '[&>path]:fill-white' : '',
                  '[&>path]:transition-colors',
                )}
              />
            </div>
          </div>
          <LogoText
            className={cn(
              darkMode ? '[&>path]:fill-white' : '',
              '[&>path]:transition-colors',
            )}
          />
        </div>
        <nav
          className={cn(
            ' items-center typo-TitleBold transition-colors text-black  xl:flex hidden ',
            {
              'text-sm': lang === 'en',
              'text-white': darkMode,
            },
          )}>
          <span className="w-[140px] flex justify-center items-center">
            {dict['기업정보'][lang]}
          </span>
          <span className="w-[140px] flex justify-center items-center">
            {dict['사업영역'][lang]}
          </span>
          <span className="w-[140px] flex justify-center items-center">
            {dict['제품정보'][lang]}
          </span>
          <span className="w-[140px] flex justify-center items-center">
            {dict['홍보센터'][lang]}
          </span>
          <span className="w-[140px] flex justify-center items-center">
            {dict['인재채용'][lang]}
          </span>
        </nav>
        <div className="mr-11 w-[98px] typo-TitleBold">
          <div className="flex gap-3 items-center">
            <span
              className={cn({
                'text-grayscale-black': lang === 'ko' && !darkMode,
                'text-blackAlpha-50': lang !== 'ko' && !darkMode,
                'text-grayscale-white': lang === 'ko' && darkMode,
                'text-whiteAlpha-50': lang !== 'ko' && darkMode,
              })}>
              KOR
            </span>
            <span
              className={cn('w-[2px] h-[15px]', {
                'bg-blackAlpha-10': !darkMode,
                'bg-whiteAlpha-10': darkMode,
              })}
            />
            <span
              className={cn({
                'text-grayscale-black': lang === 'en' && !darkMode,
                'text-blackAlpha-50': lang !== 'en' && !darkMode,
                'text-grayscale-white': lang === 'en' && darkMode,
                'text-whiteAlpha-50': lang !== 'en' && darkMode,
              })}>
              ENG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
