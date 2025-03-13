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
            text: [dict2['비전'][lang]],
            path: ['/company-info/vision'],
          },
          {
            text: [dict2['연혁'][lang]],
            path: ['/company-info/history'],
          },
          {
            text: [dict2['오시는 길'][lang]],
            path: ['/company-info/location'],
          },
        ],
      },
      {
        category: dict['사업과 솔루션'][lang],
        categoryPath: '/business-solution',
        menus: [
          {
            label: dict2['배터리 솔루션'][lang],
            text: [
              dict2['EIS+AI기반'][lang],
              dict2['사용 후 배터리 재활용 가능성 평가'][lang],
              dict2['AI기반 배터리 차별화 모델링'][lang],
              dict2['디지털 트윈 기반 배터리 예측 기술'][lang],
            ],
            path: [
              '/business-solution/condition-diagnosis',
              '/business-solution/recyclability-evaluation',
              '/business-solution/battery-modeling',
              '/business-solution/battery-prediction',
            ],
          },
          {
            label: dict2['수소에너지'][lang],
            text: [
              dict2['연료전지 성능평가 솔루션'][lang],
              dict2['수소 생산 기술 연구 개발'][lang],
            ],
            path: [
              '/business-solution/fuel-cell-evaluation',
              '/business-solution/research-development',
            ],
          },
        ],
      },
      {
        category: dict['파트너'][lang],
        categoryPath: '/partner',
        menus: [
          {
            text: [dict2['기술협력'][lang]],
            path: ['/partner/tech-cooperation'],
          },
          {
            text: [dict2['사업제휴'][lang]],
            path: ['/partner/business-partnership'],
          },
          {
            text: [dict2['투자'][lang]],
            path: ['/partner/investment'],
          },
          {
            text: [dict2['인재채용'][lang]],
            path: ['/partner/recruitment'],
          },
        ],
      },

      {
        category: dict['소식과 미디어'][lang],
        categoryPath: '/news-media',
        menus: [
          {
            text: [dict2['IR'][lang]],
            path: ['/news-media/ir'],
          },
          {
            text: [dict2['보도자료'][lang]],
            path: ['/news-media/news-release'],
          },
          {
            text: [dict2['문의'][lang]],
            path: ['/news-media/contact'],
          },
        ],
      },
    ]
      .filter((item) => {
        if (admin) {
          return [
            dict['사업과 솔루션'][lang],
            dict['소식과 미디어'][lang],
            dict['파트너'][lang]
          ].includes(item.category);
        } else {
          return item;
        }
      })
      .map((item) => {
        if (admin) {
          if (item.category === dict['소식과 미디어'][lang]) {
            return {
              ...item,
              menus: item.menus
                .filter((menu) => menu.text[0] !== dict2['문의'][lang])
                .map((menu) => ({
                  ...menu,
                  path: menu.path.map((p) => '/admin' + p),
                })),
            };
          } else if (item.category === dict['파트너'][lang]) {
            return {
              ...item,
              menus: item.menus
                .filter((menu) => (menu.text[0] !== dict2['투자'][lang] && menu.text[0] !== dict2['인재채용'][lang]))
                .map((menu) => ({
                  ...menu,
                  path: menu.path.map(p => '/admin' + p)
                }))
            }
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
