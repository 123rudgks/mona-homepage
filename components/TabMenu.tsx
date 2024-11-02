'use client';
import ChevronLeft from '@/app/svgs/main/ChevronLeft.svg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useMemo } from 'react';

type Props = {
  lang: Language;
};
const checkCurrentPath = (path: string, menuPath: string) => {
  return path.includes(menuPath);
};
const TabMenu = ({ lang }: Props) => {
  const path = usePathname();
  const { MENU, currentCategory, currentMenu, currentMenus } = useMenu({
    lang,
  });

  return (
    <div
      className={cn(
        'hidden sm-screen:w-full sm-screen:flex',
        'lg-screen:flex-col lg-screen:flex-nowrap lg-screen:w-[310px]',
        'sm-screen:flex-row sm-screen:flex-wrap sm-screen:gap-2',
      )}>
      {currentMenus?.menus.map((item, menusIdx) =>
        item.label ? (
          <Fragment key={item.label + 'tabMenu'}>
            <div
              className={cn(
                'flex gap-2 w-full',
                'lg-screen:flex-col lg-screen:w-auto',
              )}>
              <span
                className={cn(
                  'typo-TitleMedium h-[42px] items-center flex',
                  'lg-screen:basis-auto',
                  'basis-[250px]',
                )}>
                {item.label}
              </span>
              {item.text.map((text, idx) => (
                <Tab
                  text={text}
                  idx={idx}
                  item={item}
                  currentPath={path}
                  key={text + 'tabMenu'}
                />
              ))}
            </div>
            {currentMenus?.menus.length - 1 !== menusIdx && (
              <div className="my-4 w-full h-[1px] bg-grayscale-200 lg-screen:block hidden" />
            )}
          </Fragment>
        ) : (
          item.text.map((text, idx) => (
            <Fragment key={text + 'tabMenu'}>
              {!!currentMenus?.menus.find((item) => item.label !== undefined) &&
                currentMenus?.menus.findIndex(
                  (item) => item.label === undefined,
                ) === menusIdx && (
                  <span
                    className={cn(
                      'typo-TitleMedium h-[42px] items-center flex',
                      'lg-screen:hidden',
                      'basis-[250px]',
                    )}></span>
                )}

              <Tab text={text} idx={idx} item={item} currentPath={path} />
            </Fragment>
          ))
        ),
      )}
    </div>
  );
};

const Tab = ({
  text,
  idx,
  item,
  currentPath,
}: {
  text: string;
  idx: number;
  item: {
    label?: string;
    text: string[];
    path: string[];
  };
  currentPath: string;
}) => {
  return (
    <Link
      key={text + 'tabMenu'}
      href={item.path[idx]}
      className={cn(
        'flex items-center gap-2',
        ' grow-0 basis-[235px] shrink-0 h-11',
        'lg-screen:flex-auto lg-screen:w-full ',
        'sm-screen:rounded-full sm-screen:py-2 sm-screen:px-4',
        checkCurrentPath(currentPath, item.path[idx]) ? 'bg-primary' : '',
      )}>
      <span className="w-[13px] h-[13px]">
        <ChevronLeft
          className={cn(
            ' rotate-180',
            checkCurrentPath(currentPath, item.path[idx])
              ? ''
              : '[&>path]:fill-grayscale-500',
          )}
        />
      </span>
      <span
        className={cn(
          'typo-TitleBold',
          checkCurrentPath(currentPath, item.path[idx]) ? 'text-white' : '',
        )}>
        {text}
      </span>
    </Link>
  );
};

export const MobileTabMenu = ({ lang }: Props) => {
  const path = usePathname();
  const { MENU, currentMenus } = useMenu({ lang });

  const accordionTitle = useMemo(() => {
    let title: string | undefined = '';
    currentMenus?.menus.forEach((menu) => {
      const tempTitle = menu.text.find((text, idx) => {
        return checkCurrentPath(path, menu.path[idx]);
      });
      if (tempTitle !== undefined) title = tempTitle;
    });
    return title;
  }, [path, currentMenus]);
  return (
    <Accordion
      type="multiple"
      className="w-full bg-white sm-screen:hidden absolute top-0 z-10">
      <AccordionItem value="1">
        <AccordionTrigger className="py-[14px] px-6">
          <div className="px-6 typo-BodyLargeBold">{accordionTitle}</div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col px-6 py-[6px]">
            {currentMenus?.menus.map((item, menusIdx) =>
              item.label ? (
                <div key={item.label + 'tabMenu'} className="mb-5">
                  <span
                    className={cn(
                      'typo-BodyCaptionMedium h-[38px] items-center flex',
                    )}>
                    {item.label}
                  </span>
                  {item.text.map((text, idx) => (
                    <div key={text} className={cn('h-12 flex items-center')}>
                      <Link
                        href={item.path[idx]}
                        className={cn('typo-BodyLargeBold', {
                          'text-primary': checkCurrentPath(
                            path,
                            item.path[idx],
                          ),
                        })}>
                        {text}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                item.text.map((text, idx) => (
                  <div key={text} className={cn('h-12 flex items-center')}>
                    <Link
                      href={item.path[idx]}
                      className={cn('typo-BodyLargeBold', {
                        'text-primary': checkCurrentPath(path, item.path[idx]),
                      })}>
                      {text}
                    </Link>
                  </div>
                ))
              ),
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default TabMenu;
