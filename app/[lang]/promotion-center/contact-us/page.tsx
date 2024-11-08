'use client';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
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
import { Language } from '@/types/globals.types';
import { HomeIcon } from 'lucide-react';
import { useState } from 'react';
type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const [isModal, setIsModal] = useState(true);

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
          <ContentBox title={currentMenu.text} label={currentMenu.label}>
            <div className="flex flex-col gap-9">
              <div>{dict['문의하기_desc'][lang]}</div>
              <div className="w-full flex flex-col gap-11">
                <div className={cn('flex flex-col gap-6')}>
                  <TextBox label={dict['이름'][lang]}>
                    <Input
                      inputProps={{
                        placeholder: dict['이름'][lang],
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['업체명'][lang]}>
                    <Input
                      inputProps={{
                        placeholder: dict['업체명'][lang],
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['직책'][lang]}>
                    <Input
                      inputProps={{
                        placeholder: dict['직책_placeholder'][lang],
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['이메일'][lang]}>
                    <Input
                      error={dict['이메일_error'][lang]}
                      inputProps={{
                        placeholder: dict['이메일_placeholder'][lang],
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['전화번호'][lang]}>
                    <Input
                      error={dict['전화번호_error'][lang]}
                      inputProps={{
                        placeholder: dict['전화번호_placeholder'][lang],
                      }}
                    />
                  </TextBox>
                  <TextBox label={dict['문의 내용'][lang]}>
                    <TextArea
                      textareaProps={{
                        placeholder: dict['문의 내용_placeholder'][lang],
                        className: 'min-h-[186px]',
                      }}
                    />
                  </TextBox>
                </div>
                <div className={cn('flex flex-col gap-6')}>
                  <div className="flex gap-2">
                    <Checkbox id="checkbox" className="" />
                    <span className="typo-BodyLargeRegular">
                      <span className="text-primary underline underline-offset-2 cursor-pointer">
                        개인정보 수집 · 이용
                      </span>
                      에 동의합니다
                    </span>
                  </div>
                  <Button
                    theme={'white'}
                    variant={'primary'}
                    size={'lg'}
                    className="h-12"
                    onClick={() => setIsModal(true)}>
                    문의하기
                  </Button>
                </div>
              </div>
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} />
      <Footer lang={lang} />
      <PrivacyPolicyPopup />
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
const TextFieldWrapper = ({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <div
        className={cn(
          'py-2 px-3 rounded-[4px]',
          error !== undefined
            ? 'ring-[1px] ring-danger'
            : 'ring-[1px] ring-grayscale-200',
        )}>
        {children}
      </div>
      {error && (
        <div className="text-danger typo-BodyCaptionRegular">{error}</div>
      )}
    </div>
  );
};
const Input = ({
  error,
  inputProps,
}: {
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  return (
    <TextFieldWrapper error={error}>
      <input
        {...inputProps}
        className={cn(
          'w-full h-full outline-none typo-BodyLargeRegular placeholder:text-grayscale-400',
          inputProps?.className,
        )}
      />
    </TextFieldWrapper>
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

const PrivacyPolicyPopup = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-[480px] ">
      <div className="py-5 px-8 w-full flex justify-between items-center">
        <span className="typo-HeadlineBold">개인정보 수집 및 이용 동의</span>
        <HamburgerMenu isOpen setIsOpen={() => {}} />
      </div>
      <div className="py-4 px-8 border-t border-grayscale-200 max-h-[516px] overflow-scroll">
        {'<개인정보 수집 및 이용 동의 >'}
        <br />
        모나 주식회사(이하 {"'회사'라 한다"})는 개인정보 보호법 제30조에 따라
        정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게
        처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립,
        공개합니다.
        <br />
        <br />
        제1조 (개인정보의 처리목적)
        <br />
        회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
        개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
        변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등
        필요한 조치를 이행할 예정입니다.
        <br />
        {'1) 제품문의'}
        <br />
        제품문의에 대한 정보확인을 위해 개인정보를 처리합니다.
        <br />
        {'2) 지원서 수신'}
        <br />
        수신 이름, 생년월일, 연락처, 이메일주소, 이력서, 포트폴리오를 통해
        지원자님의 개인정보를 획득하고 취급합니다.
        <br />
        <br />
        제2조 (개인정보의 처리 및 보유기간)
        <br />
        {
          '1) 회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.'
        }
        <br />
        {'2) 「통신비밀보호법」 제41조에 따른 통신사실확인자료 보관'}
        <br />
        - 가입자 전기통신일시, 개시․종료 시간, 상대방 가입자 번호, 사용도수,
        발신기지국 위치추적자료 : 1년
        <br />
        - 컴퓨터 통신, 인터넷 로그 기록자료, 접속지 추적자료 : 3개월
        <br />
        <br />
        제5조(이용자 및 법정대리인의 권리와 그 행사 방법)
        <br />
        1) 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련
        권리를 행사할 수 있습니다.
        <br />
        1. 개인정보 열람 요구
        <br />
        2. 오류 등이 있을 경우 정정 요구
        <br />
        3. 삭제요구
        <br />
        4. 처리정지 요구
        <br />
        2) 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편,
        모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이
        조치하겠습니다.
        <br />
        3) 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는
        회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나
        제공하지 않습니다.
        <br />
        4) 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등
        대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지
        제11호 서식에 따른 위임장을 제출하셔야 합니다.
        <br />
        5) 정보주체는 개인정보 보호법 등 관계 법령을 위반하여 회사가 처리하고
        있는 정보주체 본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니
        됩니다.
        <br />
        <br />
        제6조(처리하는 개인정보 항목)
        <br />
        회사는 다음의 개인정보 항목을 처리하고 있습니다.
        <br />
        1) 제품문의
        <br />
        필수항목 : 업체명, 소속/성함, 연락처, 이메일
        <br />
        2) 지원서 수신
        <br />
        필수항목 : 이름, 생년월일, 연락처, 이메일, 지원분야, 이력서, 포트폴리오
        <br />
        3) 인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어
        수집될 수 있습니다.
        <br />
        IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록 등
        <br />
        <br />
        제7조(개인정보의 파기)
        <br />
        1) 회사는 개인정보 보유 기간의 경과, 처리목적 달성 등 개인정보가
        불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
        <br />
        2) 정보주체로부터 동의받은 개인정보 보유 기간이 경과하거나 처리목적이
        달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는
        경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를
        달리하여 보존합니다.
        <br />
        3) 개인정보 파기의 절차 및 방법은 다음과 같습니다.
        <br />
        1. 파기 절차
        <br />
        회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보
        보호책임자의 승인을 받아 개인정보를 파기합니다.
        <br />
        2. 파기 방법
        <br />
        회사는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록
        로우레밸포멧(Low Level Format) 등의 방법을 이용하여 파기하며, 종이
        문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
        <br />
        <br />
        제8조(개인정보의 안전성 확보조치)
        <br />
        회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 하고 있습니다.
        <br />
        1. 관리적 조치 : 내부관리계획 수립 및 시행, 정기적 직원 교육 등
        <br />
        2. 기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, 접근통제시스템
        설치, 고유 식별정보 등의 암호화, 보안프로그램 설치
        <br />
        3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제
        <br />
        <br />
        제9조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)
        <br />
        1) 회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를
        저장하고 수시로 불러오는 {"'쿠키(cookie)'"}를 사용합니다.
        <br />
        2) 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
        브라우저에 보내는 소량의 정보이며 이용자들의 컴퓨터 내의 하드디스크에
        저장되기도 합니다.
        <br />
        가. 쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한
        방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게
        최적화된 정보 제공을 위해 사용됩니다.
        <br />
        나. 쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의 도구{'>'}인터넷 옵션
        {'>'}개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.
        <br />
        다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수
        있습니다.
        <br />
        <br />
        제10조(개인정보 보호책임자)
        <br />
        1) 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
        관련한 정보주체의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보
        보호책임자를 지정하고 있습니다.
        <br />
        <br />
        {'▶ 개인정보 보호책임자'}
        <br />
        성명 : 김정공
        <br />
        직책 : 부사장
        <br />
        연락처 : 02-6949-1134 / mona@monaelec.com
        <br />
        <br />
        {'▶ 개인정보 보호 담당부서'}
        <br />
        부서명 : 경영지원팀
        <br />
        담당자 : 윤혜선
        <br />
        연락처 : 02-6949-1134 / yhs6593@monaelec.com
        <br />
        <br />
        2) 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든
        개인정보 보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 개인정보
        보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에
        대해 지체없이 답변 및 처리해드릴 것입니다.
        <br />
        <br />
        제11조(개인정보 열람청구)
        <br />
        정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의
        부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람 청구가 신속하게
        처리되도록 노력하겠습니다.
        <br />
        <br />
        {'▶ 개인정보 열람청구 접수․처리 부서'}
        <br />
        부서명 : 경영지원팀
        <br />
        담당자 : 윤혜선
        <br />
        연락처 : 02-6949-1134 / yhs6593@monaelec.com
        <br />
        <br />
        제12조(권익침해 구제 방법)
        <br />
        정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을
        문의하실 수 있습니다.
        <br />
        <br />
        {'▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)'}
        <br />
        - 소관 업무 : 개인정보 침해사실 신고, 상담 신청
        <br />
        - 홈페이지 : privacy.kisa.or.kr
        <br />
        - 전화 : (국번없이) 118
        <br />
        - 주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층
        개인정보침해신고센터
        <br />
        <br />
        {'▶ 개인정보 분쟁조정위원회'}
        <br />
        - 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)
        <br />
        - 홈페이지 : www.kopico.go.kr
        <br />
        - 전화 : (국번없이) 1833-6972
        <br />
        - 주소 : (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층
        <br />
        <br />
        <br />
        {'▶ 대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)'}
        <br />
        {'▶ 경찰청 사이버안전국 : 182 (http://cyberbureau.police.go.kr)'}
        <br />
        <br />
        제13조(개인정보 처리방침 시행 및 변경)
        <br />이 개인정보 처리방침은 2022.10.19부터 적용됩니다.
      </div>
    </div>
  );
};

export default Page;
