'use client';
import dict from '@/dictionaries/footer.json';
import { cn } from '@/lib/utils';

import { FooterNavMenu } from '@/components/Footer/Footer.types';
import HamburgerMenu from '@/components/ui/hamburger_menu';
import { Language } from '@/types/globals.types';
import Link from 'next/link';
import { useState } from 'react';
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
  lang?: Language;
  admin?: boolean;
};

const Footer = ({ darkMode, lang = 'ko', admin }: Props) => {
  const [popUp, setPopUp] = useState<'termOfUse' | 'privacy'>();
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
        {!admin && (
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
        )}
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
              <span
                className="cursor-pointer"
                onClick={() => {
                  setPopUp('privacy');
                }}>
                {dict['개인정보처리방침'][lang]}
              </span>
              <span
                className={cn('w-[2px] h-[12px]', {
                  'bg-blackAlpha-30': !darkMode,
                  'bg-whiteAlpha-30': darkMode,
                })}
              />
              <span
                className="cursor-pointer"
                onClick={() => {
                  setPopUp('termOfUse');
                }}>
                {dict['이용약관'][lang]}
              </span>
            </span>
            {/* icon section */}
            <span className="flex gap-3 ">
              {[
                {
                  key: 'instagram',
                  link: 'https://www.instagram.com/monainc_official/',
                  icon: (
                    <Instagram
                      className={cn(darkMode ? '[&>g>path]:fill-white' : '')}
                    />
                  ),
                },
                {
                  key: 'blog',
                  link: 'https://blog.naver.com/monaelectric',
                  icon: (
                    <Blog
                      className={cn(darkMode ? '[&>path]:fill-white' : '')}
                    />
                  ),
                },
                {
                  key: 'youtube',
                  link: 'https://www.youtube.com/channel/UCs57hD9Wqsu7yhia20_jVEw',
                  icon: (
                    <Youtube
                      className={cn(darkMode ? '[&>path]:fill-white ' : '')}
                    />
                  ),
                },
              ].map((item) => (
                <IconBtn
                  href={item.link}
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
      {popUp === 'termOfUse' ? (
        <TermsOfUsePopUp
          onClose={() => {
            setPopUp(undefined);
          }}
          lang={lang}
        />
      ) : popUp === 'privacy' ? (
        <PrivacyPolicyPopUp
          onClose={() => {
            setPopUp(undefined);
          }}
          lang={lang}
        />
      ) : null}
    </div>
  );
};

const IconBtn = ({
  darkMode,
  icon,
  onClick,
  href = '',
}: {
  darkMode?: boolean;
  icon: JSX.Element;
  onClick?: () => void;
  href?: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      onClick={onClick}
      className={cn(
        'w-11 h-11 rounded-full flex items-center justify-center cursor-pointer',
        darkMode ? 'bg-whiteAlpha-10' : 'bg-blackAlpha-10',
      )}>
      {icon}
    </Link>
  );
};
export const NavMenu = ({ darkMode, title, menu }: FooterNavMenu) => {
  return (
    <div className="flex  flex-1 min-h-[390px]">
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
const TermsOfUsePopUp = ({
  onClose,
  lang,
}: {
  onClose: () => void;
  lang: Language;
}) => {
  return (
    <div className="z-10 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-full max-w-[480px] rounded-[8px] shadow-lg">
      <div className="py-5 px-8 w-full flex justify-between items-center">
        <span className="sm-screen:typo-HeadlineBold typo-TitleBold">
          {dict['이용약관'][lang]}
        </span>
        <HamburgerMenu
          isOpen
          setIsOpen={() => {
            onClose();
          }}
          className="md-screen:flex"
        />
      </div>
      <div className="py-4 px-8 border-t border-grayscale-200 max-h-[516px] overflow-scroll">
        {dict['제 1조 목적'][lang]}
        <br />
        <br />
        {dict['본 이용약관은'][lang]}
        <br />
        <br />
        {dict['제 2조 용어의 정의'][lang]}
        <br />
        <br />
        {dict['본 약관에서 사용되는'][lang]}
        <br />
        <br />
        {dict['회원'][lang]}
        <br />
        {dict['이용계약'][lang]}
        <br />
        {dict['회원 아이디'][lang]}
        <br />
        {dict['비밀번호'][lang]}
        <br />
        {dict['운영자'][lang]}
        <br />
        {dict['해지'][lang]}
        <br />
        <br />
        {dict['제3조 약관 외 준칙'][lang]}
        <br />
        <br />
        {dict['운영자는 필요한'][lang]}
        <br />
        <br />
        {dict['제4조 이용계약 체결'][lang]}
        <br />
        <br />
        {dict['이용계약은 회원으로'][lang]}
        <br />
        {dict['회원으로 등록'][lang]}
        <br />
        <br />
        {dict['제5조 서비스 이용 신청'][lang]}
        <br />
        <br />
        {dict['회원으로 등록하여'][lang]}
        <br />
        {dict['타인의 정보를 도용하거나'][lang]}
        <br />
        <br />
        {dict['제6조 개인정보처리방침'][lang]}
        <br />
        <br />
        {dict['사이트 및 운영자는'][lang]}
        <br />
        {dict['운영자는 관계 법령이'][lang]}
        <br />
        <br />
        {dict['회원의 개인정보보호에 관하여'][lang]}
        <br />
        <br />
        {dict['단, 회원의 귀책 사유로'][lang]}
        <br />
        {dict['운영자는 회원이 미풍양속에'][lang]}
        <br />
        <br />
        {dict['제7조 운영자의 의무'][lang]}
        <br />
        <br />
        {dict['운영자는 이용회원으로부터'][lang]}
        <br />
        {dict['운영자는 계속적이고 안정적인'][lang]}
        <br />
        <br />
        {dict['제8조 회원의 의무'][lang]}
        <br />
        <br />
        {dict['회원은 본 약관에서'][lang]}
        <br />
        {dict['회원은 사이트의 명시적'][lang]}
        <br />
        {dict['이용고객은 아이디 및'][lang]}
        <br />
        {dict['회원은 운영자와 사이트'][lang]}
        <br />
        <br />
        {dict['제9조 서비스 이용 시간'][lang]}
        <br />
        <br />
        {dict['서비스 이용 시간은 업무상'][lang]}
        <br />
        {dict['단 사이트는 다음 경우에'][lang]}
        <br />
        {dict['- 긴급한 시스템 점검, 증설'][lang]}
        <br />
        {dict['- 국가비상사태'][lang]}
        <br />
        {dict['- 전기통신사업법에'][lang]}
        <br />
        {dict['- 서비스 이용의 폭주'][lang]}
        <br />
        {dict['전항에 의한 서비스 중단의'][lang]}
        <br /> <br />
        {dict['제10조 서비스 이용 해지'][lang]}
        <br /> <br />
        {dict['회원이 사이트와의 이용계약을'][lang]}
        <br />
        {dict['해지 신청과 동시에 사이트가'][lang]}
        <br /> <br />
        {dict['제11조 서비스 이용 제한'][lang]}
        <br /> <br />
        {dict['회원은 다음 각호에 해당하는'][lang]}
        <br />
        {dict['① 회원 가입시 혹은 가입 후'][lang]}
        <br />
        {dict['② 타인의 사이트 이용을 방해하거나'][lang]}
        <br />
        {dict['③ 사이트의 운영진 직원 또는'][lang]}
        <br />
        {dict['④ 사이트 기타 제3자의 인격권'][lang]}
        <br />
        {dict['⑤ 다른 회원의 ID를 부정하게'][lang]}
        <br />
        {dict['⑥ 다른 회원에 대한 개인정보를'][lang]}
        <br />
        {dict['⑦ 범죄와 결부된다고 객관적으로'][lang]}
        <br />
        {dict['⑧ 기타 관련 법령에 위배되는'][lang]}
        <br />
        <br />
        {dict['제12조 게시물의 관리'][lang]}
        <br /> <br />
        {dict['① 사이트의 게시물과 자료의 관리'][lang]}
        <br />
        {dict['② 정보통신윤리위원회 등 공공기관의'][lang]}
        <br />
        {dict['③ 불량게시물의 판단기준은 다음과'][lang]}
        <br />
        {dict['- 다른 회원 또는 제3자에게 심한'][lang]}
        <br />
        {dict['- 공공질서 및 미풍양속에 위반되는'][lang]}
        <br />
        {dict['- 불법 복제 또는 해킹을 조장하는'][lang]}
        <br />
        {dict['- 영리를 목적으로 하는 광고일 경우'][lang]}
        <br />
        {dict['- 범죄와 결부된다고 객관적으로 인정되는'][lang]}
        <br />
        {dict['- 다른 이용자 또는 제3자와 저작권'][lang]}
        <br />
        {dict['- 기타 관계 법령에 위배된다고 판단되는'][lang]}
        <br />
        {dict['④ 사이트 및 운영자는 게시물 등에'][lang]}
        <br /> <br />
        {dict['제13조 게시물의 보관'][lang]}
        <br /> <br />
        {dict['사이트 운영자가 불가피한 사정으로'][lang]}
        <br /> <br />
        {dict['제14조 게시물에 대한 저작권'][lang]}
        <br /> <br />
        {dict['① 회원이 사이트 내에 게시한 게시물의 저작권은'][lang]}
        <br />
        {dict['② 회원은 서비스를 이용하여 취득한 정보를'][lang]}
        <br />
        {dict['③ 운영자는 회원이 게시하거나 등록하는 사이트 내의'][lang]}
        <br /> <br />
        {dict['제15조 손해배상'][lang]}
        <br /> <br />
        {dict['① 본 사이트의 발생한 모든 민, 형법상 책임은'][lang]}
        <br />
        {dict['② 본 사이트로부터 회원이 받은 손해가'][lang]}
        <br /> <br />
        {dict['제16조 면책'][lang]}
        <br /> <br />
        {
          dict[
            '① 운영자는 회원이 사이트의 서비스 제공으로부터 기대되는 이익을'
          ][lang]
        }
        <br />
        {
          dict['② 운영자는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는'][
            lang
          ]
        }
        <br />
        {dict['③ 운영자는 회원이 저장, 게시 또는 전송한 자료와 관련하여'][lang]}
        <br />
        {
          dict['④ 운영자는 회원의 귀책 사유로 인하여 서비스 이용의 장애가'][
            lang
          ]
        }
        <br />
        {dict['⑤ 운영자는 회원 상호 간 또는 회원과 제3자 상호 간,'][lang]}
        <br />
        {dict['⑥ 운영자는 회원이 게시 또는 전송한 자료 및 본 사이트로'][lang]}
        <br />
        {dict['⑦ 운영자는 회원 상호 간 또는 회원과 제3자 상호 간에'][lang]}
        <br />
        {
          dict[
            '⑧ 운영자는 운영자의 귀책 사유 없이 회원간 또는 회원과 제3자간에'
          ][lang]
        }
        <br />
        {
          dict['⑨ 운영자는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는'][
            lang
          ]
        }
        <br />
        <br />
        {dict['부칙'][lang]}
        <br /> <br />
        {dict['이 약관은 <2022.10.19>부터 시행합니다.'][lang]}
      </div>
    </div>
  );
};

const PrivacyPolicyPopUp = ({
  onClose,
  lang,
}: {
  onClose: () => void;
  lang: Language;
}) => {
  return (
    <div className="z-10 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-full max-w-[480px] rounded-[8px] shadow-lg">
      <div className="py-5 px-8 w-full flex justify-between items-center">
        <span className="sm-screen:typo-HeadlineBold typo-TitleBold">
          {dict['개인정보처리방침'][lang]}
        </span>
        <HamburgerMenu
          isOpen
          setIsOpen={() => {
            onClose();
          }}
          className="md-screen:flex"
        />
      </div>
      <div className="py-4 px-8 border-t border-grayscale-200 max-h-[516px] overflow-scroll">
        {
          dict[
            '모나 주식회사 (이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라'
          ][lang]
        }
        <br />
        <br />
        {dict['제1조 (개인정보의 처리목적)'][lang]}
        <br />
        {dict['회사는 다음의 목적을 위하여 개인정보를 처리합니다.'][lang]}
        <br />
        <br />
        {dict['1. 문의에 대한 정보 확인을 위해 개인정보를 처리합니다.'][lang]}
        <br />
        <br />
        {dict['2. 지원서 수신'][lang]}
        <br />
        <br />
        {dict['3. 고충 처리'][lang]}
        <br />
        {dict['민원인의 신원 확인'][lang]}
        <br />
        <br />
        {dict['제2조 (개인정보의 처리 및 보유기간)'][lang]}
        <br />
        {dict['① 회사는 법령에 따른 개인정보 보유, 이용 기간 또는'][lang]}
        <br />
        {dict['② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.'][lang]}
        <br />
        {dict['「통신비밀보호법」 제41조에 따른 통신사실확인자료 보관'][lang]}
        <br />
        {
          dict[
            '- 가입자 전기통신일시, 개시․종료 시간, 상대방 가입자 번호, 사용도수, 발신기지국 위치추적자료 : 1년'
          ][lang]
        }
        <br />
        {
          dict['- 컴퓨터 통신, 인터넷 로그 기록자료, 접속지 추적자료 : 3개월'][
            lang
          ]
        }
        <br />
        <br />
        <br />
        {dict['제3조(이용자 및 법정대리인의 권리와 그 행사 방법)'][lang]}
        <br />
        <br />
        {
          dict[
            '① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.'
          ][lang]
        }
        <br />
        {dict['1. 개인정보 열람 요구'][lang]}
        <br />
        {dict['2. 오류 등이 있을 경우 정정 요구'][lang]}
        <br />
        {dict['3. 삭제요구'][lang]}
        <br />
        {dict['4. 처리정지 요구'][lang]}
        <br />
        {
          dict[
            '② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '⑤ 정보주체는 개인정보 보호법 등 관계 법령을 위반하여 회사가 처리하고 있는 정보주체 본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니 됩니다.'
          ][lang]
        }
        <br />
        <br />
        {dict['제4조(처리하는 개인정보 항목)'][lang]}
        <br />
        {dict['회사는 다음의 개인정보 항목을 처리하고 있습니다.'][lang]}
        <br />
        <br />
        {
          dict[
            '1. 인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.'
          ][lang]
        }
        <br />
        {
          dict[
            'IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록 등'
          ][lang]
        }
        <br />
        <br />
        {dict['제5조(개인정보의 파기)'][lang]}
        <br />
        {
          dict[
            '① 회사는 개인정보 보유 기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '② 정보주체로부터 동의받은 개인정보 보유 기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.'
          ][lang]
        }
        <br />
        {dict['③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.'][lang]}
        <br />
        {dict['1. 파기 절차'][lang]}
        <br />
        {
          dict[
            '회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.'
          ][lang]
        }
        <br />
        {dict['2. 파기 방법'][lang]}
        <br />
        {
          dict[
            '회사는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록 로우레밸포멧(Low Level Format) 등의 방법을 이용하여 파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.'
          ][lang]
        }
        <br />
        <br />
        {dict['제6조(개인정보의 안전성 확보조치)'][lang]}
        <br />
        {
          dict[
            '회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 하고 있습니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '1. 관리적 조치 : 내부관리계획 수립 및 시행, 정기적 직원 교육 등'
          ][lang]
        }
        <br />
        {
          dict[
            '2. 기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, 접근통제시스템 설치, 고유 식별정보 등의 암호화, 보안프로그램 설치'
          ][lang]
        }
        <br />
        {dict['3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제'][lang]}
        <br />
        <br />
        {
          dict[
            '제7조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)'
          ][lang]
        }
        <br />
        {
          dict[
            '① 회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며 이용자들의 컴퓨터 내의 하드디스크에 저장되기도 합니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '가. 쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '나. 쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.'
          ][lang]
        }
        <br />
        {
          dict[
            '다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.'
          ][lang]
        }
        <br />
        <br />
        {dict['제8조(개인정보 보호책임자)'][lang]}
        <br />
        {
          dict[
            '① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.'
          ][lang]
        }
        <br />
        <br />
        {dict['▶ 개인정보 보호책임자'][lang]}
        <br />
        {dict['성명 : 장익황'][lang]}
        <br />
        {dict['직책 : 대표이사'][lang]}
        <br />
        {dict['연락처 : 02-6949-1134 , mona@monaelec.com'][lang]}
        <br />
        {dict['※ 개인정보 보호 담당부서로 연결됩니다.'][lang]}
        <br />
        <br />
        {dict['▶ 개인정보 보호 담당부서'][lang]}
        <br />
        {dict['부서명 : 경영지원 팀'][lang]}
        <br />
        {dict['담당자 : 윤혜선'][lang]}
        <br />
        {dict['연락처 : 02-6949-1134 , mona@monaelec.com'][lang]}
        <br />
        <br />
        {
          dict[
            '② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.'
          ][lang]
        }
        <br />
        <br />
        {dict['제9조(개인정보 열람청구)'][lang]}
        <br />
        {
          dict[
            '정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람 청구가 신속하게 처리되도록 노력하겠습니다.'
          ][lang]
        }
        <br />
        <br />
        {dict['▶ 개인정보 열람청구 접수․처리 부서'][lang]}
        <br />
        {dict['부서명 : 경영지원 팀'][lang]}
        <br />
        {dict['담당자 : 윤혜선'][lang]}
        <br />
        {dict['연락처 : 02-6949-1134 , mona@monaelec.com'][lang]}
        <br />
        <br />
        {dict['제10조(권익침해 구제 방법)'][lang]}
        <br />
        {
          dict[
            '정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.'
          ][lang]
        }
        <br />
        <br />
        {dict['▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)'][lang]}
        <br />
        {dict['- 소관 업무 : 개인정보 침해사실 신고, 상담 신청'][lang]}
        <br />
        {dict['- 홈페이지 : privacy.kisa.or.kr'][lang]}
        <br />
        {dict['- 전화 : (국번없이) 118'][lang]}
        <br />
        {
          dict[
            '- 주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터'
          ][lang]
        }
        <br />
        <br />
        {dict['▶ 개인정보 분쟁조정위원회'][lang]}
        <br />
        {
          dict[
            '- 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)'
          ][lang]
        }
        <br />
        {dict['- 홈페이지 : www.kopico.go.kr'][lang]}
        <br />
        {dict['- 전화 : (국번없이) 1833-6972'][lang]}
        <br />
        {
          dict[
            '- 주소 : (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층'
          ][lang]
        }
        <br />
        <br />
        {
          dict['▶ 대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)'][
            lang
          ]
        }
        <br />
        {
          dict['▶ 경찰청 사이버안전국 : 182 (http://cyberbureau.police.go.kr)'][
            lang
          ]
        }
        <br />
        <br />
        {dict['제11조(개인정보 처리방침 시행 및 변경)'][lang]}
        <br />
        {dict['이 개인정보 처리방침은 2022.10.19부터 적용됩니다.'][lang]}
      </div>
    </div>
  );
};
export default Footer;
