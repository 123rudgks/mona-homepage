'use client';
import LoginBg from '@/app/images/login/LoginBg.png';
import LoginLogo from '@/app/images/login/LoginLogo.png';
import IdIcon from '@/app/svgs/login/IdIcon.svg';
import PwCheckIcon from '@/app/svgs/login/PwCheckIcon.svg';
import PwIcon from '@/app/svgs/login/PwIcon.svg';
import Input from '@/components/Input';
import Modal from '@/components/Modal/Modal';
import ModalBackground from '@/components/Modal/ModalBackground';
import ModalPortal from '@/components/Modal/ModalPortal';
import { Button } from '@/components/ui/button';
import useLogin from '@/hooks/useLogin';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
type Props = {};

const LoginPage = (props: Props) => {
  const {
    id,
    password,
    setId,
    setPassword,
    showPassword,
    setShowPassword,
    isButtonActive,
    postLogin,
    error,
  } = useLogin({});
  const router = useRouter();
  // Redirect to business-area if already logged in
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      router.replace('/admin/business-area/high-speed-battery');
    }
  }, [router]);
  const [forgotPwPopup, setForgotPwPopup] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Image
        src={LoginBg}
        alt="login-background"
        className="absolute min-w-[1920px] min-h-[1080px] w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
      />
      <div
        className={cn(
          'bg-white absolute ',
          ' sm-screen:left-1/2 sm-screen:top-1/2 sm-screen:-translate-x-1/2 sm-screen:-translate-y-1/2 sm-screen:w-[439px] sm-screen:h-[491px] sm-screen:rounded-[20px] sm-screen:drop-shadow-2xl',
          'left-0 top-0 right-0 bottom-0',
        )}>
        <div
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[375px] h-[387px] flex flex-col items-center gap-[52px]',
            'sm-screen:h-full sm-screen:pt-[72px] pt-4',
          )}>
          {/* Top */}
          <div className="flex flex-col gap-4 items-center">
            <div className="w-[190px] h-[33px] relative">
              <Image src={LoginLogo} alt="logo" fill />
            </div>
            <div className="typo-BodyLargeMedium">관리자 로그인</div>
          </div>
          {/* Middle */}
          <div className="flex flex-col gap-[10px] w-full">
            <div className="h-10">
              <Input
                error={
                  error.includes('id')
                    ? '아이디가 올바르지 않습니다.'
                    : undefined
                }
                inputProps={{
                  placeholder: '아이디',
                  value: id,
                  onChange: (e) => setId(e.target.value),
                }}
                Icon={<IdIcon />}
              />
            </div>
            <div className="h-10">
              <Input
                error={
                  error.includes('pw')
                    ? '비밀번호가 올바르지 않습니다.'
                    : undefined
                }
                inputProps={{
                  placeholder: '비밀번호',
                  type: showPassword ? 'text' : 'password',
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                }}
                Icon={<PwIcon />}
              />
            </div>
            <div className="flex justify-end">
              <div
                className={cn(
                  'flex typo-BodyCaptionMedium  items-center cursor-pointer',
                  showPassword ? 'text-black' : 'text-grayscale-400',
                )}
                onClick={() =>
                  setShowPassword((prev) => {
                    return !prev;
                  })
                }>
                <PwCheckIcon
                  className={cn(
                    showPassword
                      ? '[&>path]:fill-primary'
                      : '[&>path]:fill-grayscale-300',
                  )}
                />
                비밀번호 보기
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div className="flex flex-col items-center gap-3 w-full">
            <span
              className="text-grayscale-400 typo-BodySmallBold py-[5px] px-3 rounded-full hover:bg-blackAlpha-10 cursor-pointer"
              onClick={() => {
                setForgotPwPopup(true);
              }}>
              비밀번호가 생각나지 않으시나요?
            </span>
            <Button
              theme={'white'}
              variant={'primary'}
              size={'lg'}
              className="h-12 w-full"
              disabled={!isButtonActive}
              onClick={() => {
                postLogin(id, password);
              }}>
              로그인
            </Button>
          </div>
        </div>
        {forgotPwPopup && (
          <ModalPortal>
            <ModalBackground onClick={() => setForgotPwPopup(false)}>
              <Modal
                title="비밀번호가 생각나지 않으세요?"
                desc={[
                  '아래 관리자 전화번호로 연락 주세요.',
                  '친절히 안내해 드립니다.',
                  '010-7388-7968',
                ]}
                buttonText="확인"
                buttonOnClick={() => setForgotPwPopup(false)}
              />
            </ModalBackground>
          </ModalPortal>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
