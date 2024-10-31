'use client';
import { Language } from '@/types/globals.types';

import LogoBottomLeft from './icons/LogoBottomLeft.svg';
import LogoBottomRight from './icons/LogoBottomRight.svg';
import LogoText from './icons/LogoText.svg';
import LogoTopLeft from './icons/LogoTopLeft.svg';
import LogoTopRight from './icons/LogoTopRight.svg';

import { HeaderMenu, HeaderNavMenu } from '@/components/Header/Header.types';
import HamburgerMenu from '@/components/ui/hamburger_menu';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Fragment, useCallback, useState } from 'react';

type Props = {
  darkMode?: boolean;
  lang: Language;
};

const Header = ({ darkMode, lang }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const MENU = useMenu({ lang });

  return (
    <header className={cn('z-20 fixed top-0 w-full group')}>
      <div
        className={cn(
          'w-full sm-screen:h-[100px]  h-16   flex items-center justify-center transition-colors',
          darkMode ? 'bg-transparent' : 'bg-white',
        )}>
        <div className={cn('flex justify-between w-full')}>
          <Logo darkMode={darkMode} />
          <MdScreenCategory
            lang={lang}
            darkMode={darkMode}
            headerMenu={MENU}
            currentPath={path}
          />
          <div className="flex gap-6 mr-11">
            <EngKor
              lang={lang}
              darkMode={darkMode}
              changeLanguage={changeLanguage}
            />
            <HamburgerMenu
              isOpen={isOpen}
              setIsOpen={(open) => {
                setIsOpen(open);
              }}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
      <MdScreenDropdownMenu lang={lang} darkMode={darkMode} headerMenu={MENU} />
      <div
        className={cn(
          'h-screen md-screen:hidden overflow-hidden transition-all',
          darkMode ? 'bg-transparent' : 'bg-white',
          isOpen ? 'block' : 'h-0',
        )}>
        {MENU.map((item, idx) => (
          <MobileMenu
            key={item.category + 'sm'}
            {...item}
            darkMode={darkMode}
            currentPath={path}
          />
        ))}
      </div>
    </header>
  );
};

const NavItem = ({ menus, darkMode }: HeaderNavMenu) => {
  return (
    <div className="min-w-[140px] h-full items-center text-center flex flex-col gap-7 flex-1 ">
      {menus.map((item, idx) => {
        if (item.label) {
          return (
            <Fragment key={item.label}>
              <div className="flex flex-col gap-2">
                <span className="typo-BodySmallMedium">{item.label}</span>
                {item.text.map((text, idx) => (
                  <Link
                    href={item.path[idx]}
                    key={text}
                    className="cursor-pointer">
                    {text}
                  </Link>
                ))}
              </div>
              {menus.length - 1 !== idx && (
                <div
                  className={cn(
                    'w-[120px] h-[1px]',
                    darkMode ? 'bg-whiteAlpha-10' : 'bg-grayscale-200',
                  )}
                />
              )}
            </Fragment>
          );
        } else {
          return item.text.map((text, idx) => (
            <Link href={item.path[idx]} key={text} className="cursor-pointer">
              {text}
            </Link>
          ));
        }
      })}
    </div>
  );
};

const Logo = ({ darkMode }: { darkMode?: boolean }) => {
  return (
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
  );
};

const MdScreenCategory = ({
  lang,
  darkMode,
  headerMenu,
  currentPath,
}: {
  lang: Language;
  darkMode?: boolean;
  headerMenu: HeaderMenu[];
  currentPath?: string;
}) => {
  return (
    <nav
      className={cn(
        'relative items-center typo-TitleBold text-black transition-colors hidden',
        'md-screen:flex',
        'group-hover:justify-between group-hover:flex-1 max-w-[1368px] group-hover:transition-all',
        {
          'text-base': lang === 'en',
          'text-white': darkMode,
        },
      )}>
      {headerMenu.map((item, index) => (
        <span
          key={item.category}
          className={cn(
            'w-[140px] flex justify-center items-center',
            'md-screen:flex-1',
          )}>
          <span
            className={cn({
              'text-primary': currentPath?.includes(item.categoryPath),
            })}>
            {item.category}
          </span>
        </span>
      ))}
    </nav>
  );
};

const MdScreenDropdownMenu = ({
  lang,
  darkMode,
  headerMenu,
}: {
  lang: Language;
  darkMode?: boolean;
  headerMenu: HeaderMenu[];
}) => {
  return (
    <div
      className={cn(
        'hidden w-full overflow-hidden',
        'md-screen:flex md-screen:items-center md-screen:justify-center group-hover:transition-all md-screen:group-hover:h-[452px] md-screen:h-0',
        darkMode ? 'bg-transparent' : 'bg-white',
      )}>
      <div className={cn(' flex justify-between w-full  h-full ')}>
        <div className="ml-11 flex items-end justify-between gap-2 ">
          <div className="w-[22px] "></div>
          <div className="w-[100px]"></div>
        </div>
        <nav
          className={cn(
            'items-center typo-TitleBold text-black hidden max-w-[1368px] transition-all',
            'md-screen:flex',
            ' group-hover:justify-between group-hover:flex-1',
            {
              'text-base': lang === 'en',
              'text-white': darkMode,
            },
          )}>
          {headerMenu.map((item, idx) => (
            <Fragment key={item.category + 'nav'}>
              <NavItem menus={item.menus} darkMode={darkMode} />
              {headerMenu.length - 1 !== idx && (
                <div
                  className={cn(
                    'w-[1px] h-full ',
                    darkMode ? 'bg-whiteAlpha-10' : 'bg-grayscale-200',
                  )}
                />
              )}
            </Fragment>
          ))}
        </nav>
        <div className="mr-11 w-[98px] "></div>
      </div>
    </div>
  );
};

const EngKor = ({
  lang,
  darkMode,
  changeLanguage,
}: {
  lang: Language;
  darkMode?: boolean;
  changeLanguage: (lang: Language) => void;
}) => {
  return (
    <div className=" w-[98px] typo-TitleBold hidden sm-screen:block">
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
  );
};

const MobileMenu = (
  props: HeaderMenu & { darkMode?: boolean; currentPath?: string },
) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={cn(
        'flex flex-col group-open:px-1',
        props.darkMode ? 'text-white' : 'text-black',
      )}>
      <div
        className={cn(
          'h-[76px] py-6 px-11 typo-HeadlineBold flex justify-between items-center border-b',
          { 'border-grayscale-200': !props.darkMode },
          { 'border-whiteAlpha-10': props.darkMode },
        )}>
        <span
          className={cn({
            'text-primary': props.currentPath?.includes(props.categoryPath),
          })}>
          {props.category}
        </span>
        <span
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          <span className="w-6 h-6 relative flex justify-center items-center">
            <span
              className={cn(
                'h-[2px] w-[21px] absolute',
                props.darkMode ? 'bg-white' : 'bg-black',
                {
                  'bg-primary': props.currentPath?.includes(props.categoryPath),
                },
              )}
            />
            <span
              className={cn(
                'h-[2px] w-[21px] absolute  transition-all duration-300 ease-in-out',
                props.darkMode ? 'bg-white' : 'bg-black',
                {
                  'bg-primary': props.currentPath?.includes(props.categoryPath),
                },
                isOpen ? 'rotate-0' : '-rotate-90',
              )}
            />
          </span>
        </span>
      </div>
      <div
        className={cn(
          'h-0 overflow-hidden    ',
          props.darkMode ? 'bg-transparent' : 'bg-grayscale-50',
          isOpen ? 'border-b  h-fit' : '',
          { 'border-grayscale-200': isOpen && !props.darkMode },
          { 'border-whiteAlpha-10': isOpen && props.darkMode },
        )}>
        <div className="flex flex-col gap-5 py-6 px-11">
          {props.menus.map((menu, idx) =>
            menu.label ? (
              <div key={menu.label + 'sm'} className="flex flex-col gap-1">
                <span className="typo-BodyLargeMedium">{menu.label}</span>
                {menu.text.map((text, idx) => (
                  <Link
                    href={menu.path[idx]}
                    key={text + 'sm'}
                    className="typo-TitleMedium">
                    - {text}
                  </Link>
                ))}
              </div>
            ) : (
              menu.text.map((text, idx) => (
                <Link
                  href={menu.path[idx]}
                  key={text + 'sm'}
                  className="typo-TitleMedium">
                  {text}
                </Link>
              ))
            ),
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
