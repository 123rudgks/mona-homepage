'use client';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Input, { TextFieldWrapper } from '@/components/Input';
import Modal from '@/components/Modal/Modal';
import ModalBackground from '@/components/Modal/ModalBackground';
import ModalPortal from '@/components/Modal/ModalPortal';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import { MobileTabMenu } from '@/components/TabMenu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import HamburgerMenu from '@/components/ui/hamburger_menu';
import dict from '@/dictionaries/company-info/contact-us.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { ContactData, Language } from '@/types/globals.types';
import dayjs from 'dayjs';
import { HomeIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
type Props = {};

type ValidationType =
  | 'name'
  | 'company'
  | 'position'
  | 'email'
  | 'phone'
  | 'content';

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const [isModal, setIsModal] = useState(false);
  const [openPolicyPopup, setOpenPolicyPopup] = useState(false);
  const [contactData, setContactData] = useState<ContactData>({
    name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    content: '',
  });
  const [agreement, setAgreement] = useState(false);
  const [validation, setValidation] = useState<ValidationType[]>([]);
  const checkEmail = useCallback((email: string) => {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegexp.test(email);
  }, []);
  const checkPhone = useCallback((phone: string) => {
    const phoneRegexp = /^\d{2,3}\d{3,4}\d{4}$/;
    return phoneRegexp.test(phone);
  }, []);
  const checkValidation = useCallback(() => {
    const validation: ValidationType[] = [];
    if (!contactData.name) {
      validation.push('name');
    }
    if (!contactData.company) {
      validation.push('company');
    }
    if (!contactData.position) {
      validation.push('position');
    }
    if (!checkEmail(contactData.email)) {
      validation.push('email');
    }
    if (!checkPhone(contactData.phone)) {
      validation.push('phone');
    }
    if (!contactData.content) {
      validation.push('content');
    }
    return validation;
  }, [contactData, checkEmail, checkPhone]);

  const postContact = useCallback(async (contact: ContactData) => {
    const body = {
      ...contact,
      date: dayjs().format('YYYY-MM-DD HH:mm'),
      to: '123rudgks@gmail.com',
    };
    const res = await fetch('/api/mail/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.message === '성공') setIsModal(true);
    // API
  }, []);

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
          <ContentBox title={currentMenu.text} label={currentMenu.label}>
            <div className="flex flex-col gap-9">
              <div>{dict['문의하기_desc'][lang]}</div>
              <div className="w-full flex flex-col gap-11">
                <div className={cn('flex flex-col gap-6')}>
                  <TextBox label={dict['이름'][lang]}>
                    <Input
                      error={
                        validation.includes('name')
                          ? dict['이름_error'][lang]
                          : undefined
                      }
                      inputProps={{
                        placeholder: dict['이름'][lang],
                        value: contactData.name,
                        onChange: (e) => {
                          setValidation(validation.filter((v) => v !== 'name'));
                          setContactData({
                            ...contactData,
                            name: e.target.value,
                          });
                        },
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['업체명'][lang]}>
                    <Input
                      error={
                        validation.includes('company')
                          ? dict['업체명_error'][lang]
                          : undefined
                      }
                      inputProps={{
                        placeholder: dict['업체명'][lang],
                        value: contactData.company,
                        onChange: (e) => {
                          setValidation(
                            validation.filter((v) => v !== 'company'),
                          );
                          setContactData({
                            ...contactData,
                            company: e.target.value,
                          });
                        },
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['직책'][lang]}>
                    <Input
                      error={
                        validation.includes('position')
                          ? dict['직책_error'][lang]
                          : undefined
                      }
                      inputProps={{
                        placeholder: dict['직책_placeholder'][lang],
                        value: contactData.position,
                        onChange: (e) => {
                          setValidation(
                            validation.filter((v) => v !== 'position'),
                          );
                          setContactData({
                            ...contactData,
                            position: e.target.value,
                          });
                        },
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['이메일'][lang]}>
                    <Input
                      error={
                        validation.includes('email')
                          ? dict['이메일_error'][lang]
                          : undefined
                      }
                      inputProps={{
                        placeholder: dict['이메일_placeholder'][lang],
                        value: contactData.email,
                        onChange: (e) => {
                          setValidation(
                            validation.filter((v) => v !== 'email'),
                          );
                          setContactData({
                            ...contactData,
                            email: e.target.value,
                          });
                        },
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['전화번호'][lang]}>
                    <Input
                      error={
                        validation.includes('phone')
                          ? dict['전화번호_error'][lang]
                          : undefined
                      }
                      inputProps={{
                        placeholder: dict['전화번호_placeholder'][lang],
                        value: contactData.phone,
                        onChange: (e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            // 숫자만 허용
                            setValidation(
                              validation.filter((v) => v !== 'phone'),
                            );
                            setContactData({
                              ...contactData,
                              phone: e.target.value,
                            });
                          }
                        },
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['문의 내용'][lang]}>
                    <TextArea
                      error={
                        validation.includes('content')
                          ? dict['문의 내용_error'][lang]
                          : undefined
                      }
                      textareaProps={{
                        placeholder: dict['문의 내용_placeholder'][lang],
                        className: 'min-h-[186px]',
                        value: contactData.content,
                        onChange: (e) => {
                          setValidation(
                            validation.filter((v) => v !== 'content'),
                          );
                          setContactData({
                            ...contactData,
                            content: e.target.value,
                          });
                        },
                      }}
                    />
                  </TextBox>
                </div>
                <div className={cn('flex flex-col gap-6')}>
                  <div className="flex gap-2">
                    <Checkbox
                      id="checkbox"
                      className=""
                      checked={agreement}
                      onCheckedChange={(e) => {
                        typeof e === 'boolean' && setAgreement(e);
                      }}
                    />
                    <span className="typo-BodyLargeRegular">
                      {lang === 'ko' ? (
                        <>
                          <span
                            className="text-primary underline underline-offset-2 cursor-pointer"
                            onClick={() => {
                              setOpenPolicyPopup(true);
                            }}>
                            개인정보 수집 · 이용
                          </span>
                          에 동의합니다
                        </>
                      ) : (
                        <>
                          {'I agree to '}
                          <span
                            className="text-primary underline underline-offset-2 cursor-pointer"
                            onClick={() => {
                              setOpenPolicyPopup(true);
                            }}>
                            the collection and use of personal information
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <Button
                    theme={'white'}
                    variant={'primary'}
                    size={'lg'}
                    className="h-12"
                    disabled={!agreement}
                    onClick={() => {
                      const validation = checkValidation();
                      if (validation.length > 0 || !agreement) {
                        setValidation(validation);
                        return;
                      }
                      postContact(contactData);
                    }}>
                    {dict['문의하기'][lang]}
                  </Button>
                </div>
              </div>
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} />
      <Footer lang={lang} />
      {openPolicyPopup && (
        <PrivacyPolicyPopup
          onClose={() => {
            setOpenPolicyPopup(false);
          }}
          lang={lang}
        />
      )}
      {isModal && (
        <ModalPortal>
          <ModalBackground onClick={() => setIsModal(false)}>
            <Modal
              title="문의 접수 완료"
              desc={[
                '정상적으로 접수 처리 되었습니다.',
                '입력하신 이메일로 곧 연락드리겠습니다.',
              ]}
              buttonText="확인"
              buttonOnClick={() => setIsModal(false)}
            />
          </ModalBackground>
        </ModalPortal>
      )}
    </main>
  );
};

const TextBox = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="typo-BodySmallMedium text-navy-700">{label}</div>
      {children}
    </div>
  );
};

const TextArea = ({
  error,
  textareaProps,
}: {
  error?: string;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}) => {
  return (
    <TextFieldWrapper error={error}>
      <textarea
        {...textareaProps}
        className={cn(
          'outline-none resize-none w-full h-full typo-BodyLargeRegular placeholder:text-grayscale-400',
          textareaProps?.className,
        )}
      />
    </TextFieldWrapper>
  );
};

const PrivacyPolicyPopup = ({
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
          {dict['개인정보 수집 및 이용 동의'][lang]}
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
        {dict['<개인정보 수집 및 이용 동의 >'][lang]}
        <br />
        {dict['모나 주식회사(이하'][lang]}
        <br />
        <br />
        {dict['제1조 (개인정보의 처리목적)'][lang]}
        <br />
        {dict['회사'][lang]}
        <br />
        {dict['1) 제품문의'][lang]}
        <br />
        {dict['제품 문의_desc'][lang]}
        <br />
        {dict['2) 지원서 수신'][lang]}
        <br />
        {dict['지원서 수신_desc'][lang]}
        <br />
        <br />
        {dict['제2조 (개인정보의 처리 및 보유기간)'][lang]}
        <br />
        {dict['1) 개인정보 보유, 이용 기간'][lang]}
        <br />
        {dict['2) 통신비밀보호법'][lang]}
        <br />
        {dict['가입자 전기통신일시'][lang]}
        <br />
        {dict['컴퓨터 통신'][lang]}
        <br />
        <br />
        {dict['제5조(이용자 및 법정대리인의 권리와 그 행사 방법)'][lang]}
        <br />
        {dict['정보주체 권리'][lang]}
        <br />
        {dict['개인정보 열람 요구'][lang]}
        <br />
        {dict['오류 정정 요구'][lang]}
        <br />
        {dict['삭제요구'][lang]}
        <br />
        {dict['처리정지 요구'][lang]}
        <br />
        {dict['권리 행사의 방법'][lang]}
        <br />
        {dict['오류 정정 또는 삭제'][lang]}
        <br />
        {dict['대리인을 통한 권리 행사'][lang]}
        <br />
        {dict['개인정보 보호법 위반 금지'][lang]}
        <br />
        <br />
        {dict['제6조(처리하는 개인정보 항목)'][lang]}
        <br />
        {dict['회사는 다음의 개인정보'][lang]}
        <br />
        {dict['1) 제품문의'][lang]}
        <br />
        {dict['제품문의 필수항목'][lang]}
        <br />
        {dict['2) 지원서 수신'][lang]}
        <br />
        {dict['지원서 수신 필수항목'][lang]}
        <br />
        {dict['인터넷 서비스 이용과정'][lang]}
        <br />
        {dict['IP주소'][lang]}
        <br />
        <br />
        {dict['제7조(개인정보의 파기)'][lang]}
        <br />
        {dict['개인정보 파기'][lang]}
        <br />
        {dict['개인정보 보존 필요시'][lang]}
        <br />
        {dict['개인정보 파기의 절차 및 방법'][lang]}
        <br />
        {dict['1. 파기 절차'][lang]}
        <br />
        {dict['파기 절차'][lang]}
        <br />
        {dict['2. 파기 방법'][lang]}
        <br />
        {dict['파기 방법'][lang]}
        <br />
        <br />
        {dict['제8조(개인정보의 안전성 확보조치)'][lang]}
        <br />
        {dict['회사는 개인정보의 안정성'][lang]}
        <br />
        {dict['관리적 조치'][lang]}
        <br />
        {dict['기술적 조치'][lang]}
        <br />
        {dict['물리적 조치'][lang]}
        <br />
        <br />
        {
          dict[
          '제9조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)'
          ][lang]
        }
        <br />
        {dict['쿠키 사용 목적'][lang]}
        <br />
        {dict['쿠키 설치∙운영 및 거부'][lang]}
        <br />
        {dict['쿠키의 사용 목적'][lang]}
        <br />
        {dict['쿠키의 설치∙운영 및 거부'][lang]}
        <br />
        {dict['쿠키 저장 거부 시'][lang]}
        <br />
        <br />
        {dict['제10조(개인정보 보호책임자)'][lang]}
        <br />
        {dict['개인정보 보호책임자'][lang]}
        <br />
        <br />
        {dict['▶ 개인정보 보호책임자'][lang]}
        <br />
        {dict['개인정보 보호책임자 성명'][lang]}
        <br />
        {dict['개인정보 보호책임자 직책'][lang]}
        <br />
        {dict['개인정보 보호책임자 연락처'][lang]}
        <br />
        <br />
        {dict['▶ 개인정보 보호 담당부서'][lang]}
        <br />
        {dict['개인정보 보호 담당부서 부서명'][lang]}
        <br />
        {dict['개인정보 보호 담당부서 담당자'][lang]}
        <br />
        {dict['개인정보 보호 담당부서 연락처'][lang]}
        <br />
        <br />
        {dict['개인정보 보호 관련 문의'][lang]}
        <br />
        <br />
        {dict['제11조(개인정보 열람청구)'][lang]}
        <br />
        {dict['정보주체는 개인정보'][lang]}
        <br />
        <br />
        {dict['개인정보 열람청구 접수․처리 부서'][lang]}
        <br />
        {dict['개인정보 열람청부 접수.처리 부서명'][lang]}
        <br />
        {dict['개인정보 열람청구 접수.처리 담당자'][lang]}
        <br />
        {dict['개인정보 열람청구 접수.처리 연락처'][lang]}
        <br />
        <br />
        {dict['제12조(권익침해 구제 방법)'][lang]}
        <br />
        {dict['권익침해 구제 방법 설명'][lang]}
        <br />
        <br />
        {dict['▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)'][lang]}
        <br />
        {dict['개인정보 침해신고센터 소관 업무'][lang]}
        <br />
        {dict['개인정보 침해신고센터 홈페이지'][lang]}
        <br />
        {dict['개인정보 침해신고센터 전화'][lang]}
        <br />
        {dict['개인정보 침해신고센터 주소'][lang]}
        <br />
        <br />
        {dict['▶ 개인정보 분쟁조정위원회'][lang]}
        <br />
        {dict['개인정보 분쟁조정위원회 소관 업무'][lang]}
        <br />
        {dict['개인정보 분쟁조정위원회 홈페이지'][lang]}
        <br />
        {dict['개인정보 분쟁조정위원회 전화'][lang]}
        <br />
        {dict['개인정보 분쟁조정위원회 주소'][lang]}
        <br />
        <br />
        <br />
        {dict['대검찰청 사이버범죄수사단'][lang]}
        <br />
        {dict['경찰청 사이버안전국'][lang]}
        <br />
        <br />
        {dict['제13조(개인정보 처리방침 시행 및 변경)'][lang]}
        <br /> {dict['개인정보 처리방침 시행일'][lang]}
      </div>
    </div>
  );
};

export default Page;
