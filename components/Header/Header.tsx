'use client';
import { Language } from '@/types/globals.types';
import dict from '../../dictionaries/header.json';
import LogoBottomLeft from './icons/LogoBottomLeft.svg';
import LogoBottomRight from './icons/LogoBottomRight.svg';
import LogoText from './icons/LogoText.svg';
import LogoTopLeft from './icons/LogoTopLeft.svg';
import LogoTopRight from './icons/LogoTopRight.svg';

import { cn } from '@/lib/utils';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  darkMode?: boolean;
  lang: Language;
};

const Header = ({ darkMode, lang }: Props) => {
  const router = useRouter();
  const params = useParams();
  const path = usePathname();
  const changeLanguage = useCallback(
    (lang: Language) => {
      if (params.lang !== lang && typeof params.lang === 'string') {
        const newPath = path.replace(params.lang, lang);
        router.replace(newPath);
      }
    },
    [path, params.lang, router],
  );
  return (
    <div
      className={cn(
        'z-20 w-full sm-screen:h-[100px]  h-16  fixed top-0 flex items-center justify-center transition-colors',
        darkMode ? 'bg-transparent' : 'bg-white',
      )}>
      <div className={cn('flex justify-between w-full   ')}>
        <div className="ml-11 flex items-end justify-between gap-2 ">
          <div className="w-[22px] h-[22px]">
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
          <div className="w-[100px] h-[22px]">
            <LogoText
              className={cn(
                darkMode ? '[&>path]:fill-white' : '',
                '[&>path]:transition-colors',
              )}
            />
          </div>
        </div>
        <nav
          className={cn(
            ' items-center typo-TitleBold transition-colors text-black  md-screen:flex hidden ',
            {
              'text-base': lang === 'en',
              'text-white': darkMode,
            },
          )}>
          {[
            dict['기업정보'][lang],
            dict['사업영역'][lang],
            dict['제품정보'][lang],
            dict['홍보센터'][lang],
            dict['인재채용'][lang],
          ].map((item, index) => (
            <span
              key={item}
              className={cn('w-[140px] flex justify-center items-center ')}>
              <span className="hover:text-primary cursor-pointer">{item}</span>
            </span>
          ))}
        </nav>
        <div className="mr-11 w-[98px] typo-TitleBold">
          <div className="flex gap-3 items-center">
            <span
              className={cn('cursor-pointer', {
                'text-grayscale-black': lang === 'ko' && !darkMode,
                'text-blackAlpha-50': lang !== 'ko' && !darkMode,
                'text-grayscale-white': lang === 'ko' && darkMode,
                'text-whiteAlpha-50': lang !== 'ko' && darkMode,
              })}
              onClick={() => {
                changeLanguage('ko');
              }}>
              KOR
            </span>
            <span
              className={cn('w-[2px] h-[15px]', {
                'bg-blackAlpha-10': !darkMode,
                'bg-whiteAlpha-10': darkMode,
              })}
            />
            <span
              className={cn('cursor-pointer', {
                'text-grayscale-black': lang === 'en' && !darkMode,
                'text-blackAlpha-50': lang !== 'en' && !darkMode,
                'text-grayscale-white': lang === 'en' && darkMode,
                'text-whiteAlpha-50': lang !== 'en' && darkMode,
              })}
              onClick={() => {
                changeLanguage('en');
              }}>
              ENG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
