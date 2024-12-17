'use client';
import { HeaderMenu } from '@/components/Header/Header.types';
import dict2 from '@/dictionaries/footer.json';
import dict from '@/dictionaries/header.json';
import { Language } from '@/types/globals.types';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  lang?: Language;
  admin?: boolean;
};

const useMenu = ({ lang = 'ko', admin }: Props) => {
  const MENU: HeaderMenu[] = useMemo(() => {
    return [
      {
        category: dict['기업정보'][lang],
        categoryPath: '/company-info',
        menus: [
          {
            text: [dict2['회사소개'][lang]],
            path: ['/company-info/introduction'],
          },
          {
            text: [dict2['연혁'][lang]],
            path: ['/company-info/history'],
          },
          {
            text: [dict2['구성원'][lang]],
            path: ['/company-info/members'],
          },
          {
            text: [dict2['오시는 길'][lang]],
            path: ['/company-info/location'],
          },
        ],
      },
      {
        category: dict['사업영역'][lang],
        categoryPath: '/business-area',
        menus: [
          {
            label: dict2['제조 솔루션'][lang],
            text: [
              dict2['초고속 배터리 진단 솔루션'][lang],
              dict2['모듈 고장 진단 솔루션'][lang],
            ],
            path: [
              '/business-area/high-speed-battery',
              '/business-area/module-fault',
            ],
          },
          {
            label: dict2['유지 보수 및 SOH 진단'][lang],
            text: [
              dict2['모듈 정비 및 진단'][lang],
              dict2['전기차 SOH 진단'][lang],
            ],
            path: [
              '/business-area/module-maintenance',
              '/business-area/electric-vehicle-soh',
            ],
          },
          {
            text: [dict2['사용 후 배터리'][lang]],
            path: ['/business-area/after-use-battery'],
          },
          {
            text: [dict2['수소'][lang]],
            path: ['/business-area/hydrogen'],
          },
        ],
      },
      {
        category: dict['제품정보'][lang],
        categoryPath: '/product-info',
        menus: [
          {
            text: [dict2['초고속 배터리 진단 솔루션'][lang]],
            path: ['/product-info/high-speed-battery'],
          },
          {
            text: [dict2['배터리 용량 예측 솔루션'][lang]],
            path: ['/product-info/battery-capacity'],
          },
          {
            text: [dict2['수소 시스템 및 진단'][lang]],
            path: ['/product-info/hydrogen-system'],
          },
        ],
      },
      {
        category: dict['홍보센터'][lang],
        categoryPath: '/promotion-center',
        menus: [
          {
            text: ['NEWS'],
            path: ['/promotion-center/news'],
          },
          {
            text: [dict2['투자정보'][lang]],
            path: ['/promotion-center/investment-info'],
          },
          {
            text: [dict2['문의하기'][lang]],
            path: ['/promotion-center/contact-us'],
          },
        ],
      },
      {
        category: dict['인재채용'][lang],
        categoryPath: '/recruitment',
        menus: [
          {
            text: [dict2['채용공고'][lang]],
            path: ['/recruitment/notice'],
          },
        ],
      },
    ]
      .filter((item) => {
        if (admin) {
          return [
            dict['사업영역'][lang],
            dict['제품정보'][lang],
            dict['홍보센터'][lang],
          ].includes(item.category);
        } else {
          return item;
        }
      })
      .map((item) => {
        if (admin) {
          if (item.category === dict['홍보센터'][lang]) {
            return {
              ...item,
              menus: item.menus
                .filter((menu) => menu.text[0] !== dict2['문의하기'][lang])
                .map((menu) => ({
                  ...menu,
                  path: menu.path.map((p) => '/admin' + p),
                })),
            };
          } else {
            return {
              ...item,
              menus: item.menus.map((menu) => ({
                ...menu,
                path: menu.path.map((p) => '/admin' + p),
              })),
            };
          }
        } else {
          return item;
        }
      });
  }, [admin, lang]);

  const path = usePathname();

  const currentMenus = useMemo(() => {
    return MENU.find((item) => path.includes(item.categoryPath));
  }, [path, MENU]);

  const currentCategory = useMemo(() => {
    return MENU.find((item) => path.includes(item.categoryPath));
  }, [path, MENU]);

  const currentMenu = useMemo(() => {
    let currentMenu: {
      label?: string;
      text: string;
      path: string;
    } = { text: '', path: '' };

    currentMenus?.menus.forEach((menu) => {
      const idx = menu.path.findIndex((p) => path.includes(p));
      if (idx > -1) {
        currentMenu = {
          text: menu.text[idx],
          path: menu.path[idx],
          label: menu.label,
        };
      }
    });
    return currentMenu;
  }, [path, currentMenus]);

  return { MENU, currentCategory, currentMenu, currentMenus };
};

export default useMenu;
